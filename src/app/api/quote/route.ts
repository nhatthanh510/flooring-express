import { Resend } from "resend";

import { quoteNotification } from "@/lib/emails/quote-notification";
import { quoteSchema } from "@/lib/schemas/quote";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";

/**
 * Delivers a quote enquiry by email.
 *
 * The form already validates with `quoteSchema` in the browser, and this parses
 * with the very same schema again — client validation is a convenience for the
 * visitor, not a control. Anything can POST here.
 *
 * The recipient comes from Sanity, so the owner can redirect enquiries without
 * a redeploy. `notificationEmail` wins when set — it is private, and can be a
 * Gmail address — otherwise it falls back to the public `contact.email`, which
 * is also printed on the contact page, in the footer and in the LocalBusiness
 * structured data. That split exists so "send enquiries to my Gmail" does not
 * mean "publish my Gmail on the website".
 *
 * The *sender* has to stay in env. It must be an address on a domain verified
 * with Resend — notably it cannot be an @gmail.com address, because Gmail
 * publishes a strict DMARC policy and mail claiming to come from gmail.com but
 * sent through Resend is rejected or filed as spam.
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
  const to = settings?.notificationEmail || settings?.contact?.email;

  if (!to) {
    console.error(
      "[quote] Neither siteSettings.notificationEmail nor contact.email is set — nowhere to send.",
    );
    return Response.json(
      { ok: false, error: "Sorry, we couldn't send that just now." },
      { status: 500 },
    );
  }

  const { subject, html, text } = quoteNotification({
    values,
    businessName: settings?.name ?? "Flooring Express",
  });

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      // So hitting reply in the inbox answers the customer directly rather than
      // the no-reply sending address.
      replyTo: values.email,
      subject,
      html,
      // Sent alongside the HTML, not instead of it: clients that refuse HTML
      // still get the whole enquiry rather than an empty message.
      text,
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
