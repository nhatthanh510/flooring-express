import type { QuoteFormValues } from "./schemas/quote";

export type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * Phase 1 has no backend. This resolves after a short delay so the form can
 * exercise its pending and success states.
 *
 * To go live, replace the body with the real call — a route handler, a server
 * action, or a direct CRM request. Nothing else in the app needs to change:
 * this is the only place the app talks to the outside world about a quote.
 */
export async function submitQuote(
  values: QuoteFormValues,
): Promise<SubmitResult> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (process.env.NODE_ENV === "development") {
    console.info("[submitQuote] captured enquiry", values);
  }

  return { ok: true };
}
