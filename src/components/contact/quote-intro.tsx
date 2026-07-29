"use client";

import { useSearchParams } from "next/navigation";

import { QuoteForm } from "@/components/forms/quote-form";
import {
  enquiryCopy,
  isEnquiryType,
  isFlooringInterest,
  type EnquiryType,
  type FlooringInterest,
} from "@/lib/schemas/quote";

/**
 * The heading, blurb and form defaults that vary with `?enquiry=` / `?flooring=`
 * — the deep links every CTA on the site arrives through.
 *
 * This used to be read from the page's `searchParams` prop. That is a
 * request-time API, so it opted /contact into dynamic rendering, which meant
 * Next.js could not prefetch the route and every CTA click paid a server round
 * trip before anything appeared. Reading the same values on the client instead
 * lets the whole page prerender.
 *
 * Nothing else on the page depends on the query string, so the static shell is
 * the entire page bar these few strings.
 */
export function QuoteIntro() {
  const params = useSearchParams();

  const enquiry = params.get("enquiry") ?? undefined;
  const flooring = params.get("flooring") ?? undefined;
  const enquiryType: EnquiryType = isEnquiryType(enquiry) ? enquiry : "quote";
  const flooringType: FlooringInterest = isFlooringInterest(flooring)
    ? flooring
    : "hybrid";

  return <QuoteIntroBody enquiry={enquiryType} flooring={flooringType} />;
}

/**
 * Rendered directly as the Suspense fallback as well as by `QuoteIntro`.
 *
 * On a prerender `useSearchParams` suspends — search params are not knowable at
 * build time — so this stands in, with the default "quote" wording. On a
 * client-side navigation the router already holds the params and the hook
 * resolves synchronously, so a CTA click goes straight to the right copy with
 * no intermediate state. Only a cold load of a deep link briefly shows the
 * default wording before hydration corrects it.
 */
export function QuoteIntroBody({
  enquiry = "quote",
  flooring = "hybrid",
}: {
  enquiry?: EnquiryType;
  flooring?: FlooringInterest;
}) {
  const copy = enquiryCopy[enquiry];

  return (
    <>
      <h2 className="text-headline-lg text-primary">{copy.heading}</h2>
      <p className="mt-3 text-body-md text-muted-foreground">
        {copy.description}
      </p>

      <QuoteForm
        idPrefix="contact-quote"
        defaultEnquiry={enquiry}
        defaultFlooring={flooring}
        showEnquiryType
        className="mt-8"
      />
    </>
  );
}
