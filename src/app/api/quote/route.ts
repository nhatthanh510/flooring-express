import { Resend } from "resend";

import { enquiryCopy, quoteSchema } from "@/lib/schemas/quote";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";

/**
 * Delivers a quote enquiry by email.
 *
 * The form already validates with `quoteSchema` in the browser, and this parses
 * with the very same schema again — client validation is a convenience for the
 * visitor, not a control. Anything can POST here.
 *
 * The recipient comes from Sanity (`siteSettings.contact.email`) rather than an
 * env var, so the owner can change where enquiries land without a redeploy —
 * it is the same address already published on the contact page. The *sender*
 * has to stay in env: it must be an address on a domain verified with Resend,
 * and a value typed into a CMS would silently stop delivery.
 */
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    // Loud on the server, vague to the client: a misconfigured deploy is an
    // operator problem, and the visitor can still phone.
    console.error(
      "[quote] RESEND_API_KEY or RESEND_FROM is not set — enquiry not delivered.",
    );
    return Response.json(
      { ok: false, error: "Sorry, we couldn't send that just now." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const values = parsed.data;

  const { data: settings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    stega: false,
  });
  const to = settings?.contact?.email;

  if (!to) {
    console.error("[quote] siteSettings.contact.email is empty — nowhere to send.");
    return Response.json(
      { ok: false, error: "Sorry, we couldn't send that just now." },
      { status: 500 },
    );
  }

  const label = enquiryCopy[values.enquiry].label;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      // So hitting reply in the inbox answers the customer directly rather than
      // the no-reply sending address.
      replyTo: values.email,
      subject: `${label}: ${values.name} — ${values.flooring} flooring`,
      text: [
        `Enquiry type: ${label}`,
        `Flooring interest: ${values.flooring}`,
        "",
        `Name:  ${values.name}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone}`,
        "",
        "Message:",
        values.message?.trim() || "(none)",
      ].join("\n"),
    });

    if (error) {
      console.error("[quote] Resend rejected the message:", error);
      return Response.json(
        { ok: false, error: "Sorry, we couldn't send that just now." },
        { status: 502 },
      );
    }
  } catch (cause) {
    console.error("[quote] Failed to reach Resend:", cause);
    return Response.json(
      { ok: false, error: "Sorry, we couldn't send that just now." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
