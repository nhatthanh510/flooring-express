import type { QuoteFormValues } from "./schemas/quote";

export type SubmitResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR =
  "Sorry, we couldn't send that. Please try again, or call us directly.";

/**
 * Hands a quote enquiry to `/api/quote`, which emails it through Resend.
 *
 * Still the only place the app talks to the outside world about a quote — the
 * form knows nothing about transport, so swapping email for a CRM means editing
 * the route handler, not this file or the form.
 */
export async function submitQuote(
  values: QuoteFormValues,
): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    // The route answers with JSON on every path, but a proxy or platform error
    // can still return HTML — a failed parse must not throw past the caller and
    // leave the form stuck showing its spinner.
    const data = (await response.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (!response.ok || !data?.ok) {
      return { ok: false, error: data?.error ?? GENERIC_ERROR };
    }

    return { ok: true };
  } catch {
    // Offline, DNS failure, or the request was blocked.
    return { ok: false, error: GENERIC_ERROR };
  }
}
