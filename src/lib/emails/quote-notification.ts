import { enquiryCopy, type QuoteFormValues } from "@/lib/schemas/quote";

/**
 * The "New Quote Notification" email the owner receives, built from the Stitch
 * mockup of the same name.
 *
 * Written as tables with inline styles rather than the mockup's Tailwind: Gmail
 * strips much of a `<style>` block, Outlook ignores flex and grid entirely, and
 * neither loads a web font. So the structure is translated, not copied — the
 * palette, the card stack and the type hierarchy are the mockup's, the
 * mechanics are what actually survives an inbox.
 *
 * Four blocks from the mockup are deliberately absent, because inventing the
 * data behind them would be worse than omitting them:
 *
 *  - **Lead ID** — nothing in the system issues one, and a number that maps to
 *    no record is a liability the first time someone quotes it on the phone.
 *  - **Urgency** — the form does not ask.
 *  - **View in CRM** — there is no CRM.
 *  - **Room Visualizer** promo — no such feature, and the mockup renders it as
 *    a background image, which most clients block anyway.
 *
 * The footer likewise drops "Unsubscribe": this is transactional mail to the
 * business's own inbox, and offering to unsubscribe from your own enquiries is
 * both wrong and a way to lose leads.
 */

// Straight from the mockup's Tailwind config.
const COLOR = {
  primary: "#181512",
  secondary: "#735a3a",
  surface: "#f9f9f9",
  card: "#ffffff",
  cardMuted: "#f3f3f3",
  footer: "#e8e8e8",
  border: "#cfc4bd",
  label: "#4d4540",
  body: "#1a1c1c",
} as const;

// No web fonts in email — Montserrat and Inter are simply not there, so this
// resolves to whatever the reader's OS uses for UI text.
const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const flooringLabels: Record<QuoteFormValues["flooring"], string> = {
  hybrid: "Hybrid",
  laminate: "Laminate",
  timber: "Timber",
  other: "Other",
};

/** `tel:` needs the digits without the spacing a person types. */
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

function row(label: string, value: string, last = false) {
  return `
    <tr>
      <td style="padding:0 0 10px;${last ? "" : `border-bottom:1px solid ${COLOR.border};`}">
        <span style="font-size:13px;color:${COLOR.label};">${escape(label)}</span>
      </td>
      <td align="right" style="padding:0 0 10px;${last ? "" : `border-bottom:1px solid ${COLOR.border};`}">
        <span style="font-size:15px;font-weight:600;color:${COLOR.primary};">${escape(value)}</span>
      </td>
    </tr>
    ${last ? "" : `<tr><td colspan="2" style="height:14px;line-height:14px;">&nbsp;</td></tr>`}`;
}

function chip(label: string, value: string) {
  return `
    <td width="50%" style="padding:0 6px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
             style="background:${COLOR.cardMuted};border:1px solid ${COLOR.border};border-radius:8px;">
        <tr><td style="padding:14px 16px;">
          <div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${COLOR.secondary};margin-bottom:4px;">${escape(label)}</div>
          <div style="font-size:18px;font-weight:600;color:${COLOR.primary};">${escape(value)}</div>
        </td></tr>
      </table>
    </td>`;
}

export function quoteNotification({
  values,
  businessName,
}: {
  values: QuoteFormValues;
  businessName: string;
}) {
  const copy = enquiryCopy[values.enquiry];
  const flooring = flooringLabels[values.flooring];
  const message = values.message?.trim();
  const address = values.address?.trim() || "Not provided";

  // Stamped in the business's own timezone — the owner reads this, and "10:42
  // AM" meaning UTC would send someone to a site at the wrong hour.
  const received = new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Australia/Hobart",
  }).format(new Date());

  const subject = `${copy.label}: ${values.name} - ${flooring} flooring`;

  const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${COLOR.surface};">
<!-- Shown in the inbox list beside the subject, before the mail is opened. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">
  ${escape([values.name, values.phone, values.address?.trim()].filter(Boolean).join(" · "))}
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLOR.surface};">
<tr><td align="center" style="padding:24px 12px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
       style="width:600px;max-width:100%;background:${COLOR.card};border:1px solid ${COLOR.border};font-family:${FONT};">

  <tr><td style="padding:20px 24px;background:${COLOR.surface};border-bottom:1px solid ${COLOR.border};">
    <div style="font-size:20px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;color:${COLOR.primary};">${escape(businessName)}</div>
    <div style="font-size:12px;letter-spacing:.08em;color:${COLOR.label};margin-top:2px;">INTERNAL NOTIFICATION</div>
  </td></tr>

  <tr><td style="padding:24px 24px 0;">
    <div style="font-size:22px;font-weight:600;color:${COLOR.primary};">New ${escape(copy.label.toLowerCase())} request: ${escape(values.name)}</div>
    <div style="font-size:13px;color:${COLOR.label};padding-top:6px;">Received ${escape(received)} via the website form</div>
  </td></tr>

  <tr><td style="padding:20px 18px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      ${chip("Material", flooring)}
      ${chip("Service", copy.label)}
    </tr></table>
  </td></tr>

  <tr><td style="padding:20px 24px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
           style="background:${COLOR.surface};border:1px solid ${COLOR.border};border-radius:12px;">
      <tr><td style="padding:20px 20px 6px;">
        <div style="font-size:16px;font-weight:600;color:${COLOR.primary};padding-bottom:14px;">Customer information</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${row("Full name", values.name)}
          ${row("Email address", values.email)}
          ${row("Phone number", values.phone)}
        </table>
        <div style="font-size:13px;color:${COLOR.label};padding-top:4px;">Project address</div>
        <div style="font-size:15px;font-weight:600;color:${COLOR.primary};padding:4px 0 14px;">${escape(address)}</div>
      </td></tr>
    </table>
  </td></tr>

  ${
    message
      ? `<tr><td style="padding:16px 24px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
           style="background:${COLOR.cardMuted};border:1px solid ${COLOR.border};border-radius:12px;">
      <tr><td style="padding:20px;">
        <div style="font-size:16px;font-weight:600;color:${COLOR.primary};padding-bottom:10px;">Project details</div>
        <div style="border-left:4px solid ${COLOR.secondary};padding:4px 0 4px 14px;font-size:15px;line-height:1.6;font-style:italic;color:${COLOR.body};">${escape(message).replace(/\n/g, "<br>")}</div>
      </td></tr>
    </table>
  </td></tr>`
      : ""
  }

  <tr><td style="padding:20px 24px 24px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td width="50%" style="padding-right:6px;">
        <a href="${telHref(values.phone)}"
           style="display:block;text-align:center;background:${COLOR.primary};color:#ffffff;text-decoration:none;padding:15px 12px;border-radius:8px;font-size:15px;font-weight:600;">Call client now</a>
      </td>
      <td width="50%" style="padding-left:6px;">
        <a href="mailto:${escape(values.email)}?subject=${encodeURIComponent(`Re: your ${copy.label.toLowerCase()} request`)}"
           style="display:block;text-align:center;border:1px solid ${COLOR.primary};color:${COLOR.primary};text-decoration:none;padding:14px 12px;border-radius:8px;font-size:15px;font-weight:600;">Reply via email</a>
      </td>
    </tr></table>
  </td></tr>

  <tr><td align="center" style="padding:18px 24px;background:${COLOR.footer};border-top:1px solid ${COLOR.border};">
    <div style="font-size:15px;font-weight:600;color:${COLOR.primary};">${escape(businessName)}</div>
    <div style="font-size:12px;color:${COLOR.label};padding-top:4px;">Source: website quote form · Reply to this email to reach the customer</div>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;

  // Every client that refuses HTML still gets the whole enquiry.
  const text = [
    `New ${copy.label.toLowerCase()} request: ${values.name}`,
    `Received ${received} via the website form`,
    "",
    `Material: ${flooring}`,
    `Service:  ${copy.label}`,
    "",
    "Customer information",
    `  Full name:       ${values.name}`,
    `  Email address:   ${values.email}`,
    `  Phone number:    ${values.phone}`,
    `  Project address: ${address}`,
    "",
    "Project details",
    message || "  (none given)",
    "",
    `Reply to this email to reach ${values.name} directly.`,
  ].join("\n");

  return { subject, html, text };
}
