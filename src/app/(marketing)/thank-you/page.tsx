import type { Metadata } from "next";
import { CircleCheck, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/shared/link";
import { SanityFillImage } from "@/components/shared/sanity-image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  QUOTE_SUCCESS_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: QUOTE_SUCCESS_PAGE_QUERY,
    stega: false,
  });
  return {
    title: data?.seo?.metaTitle ?? "Request received",
    description: data?.seo?.metaDescription ?? undefined,
    // A post-submit confirmation is a dead end for a searcher — there is
    // nothing here until you have sent the form.
    robots: { index: false },
  };
}

/**
 * Where the quote form lands after a successful send.
 *
 * A real page rather than an inline swap so the confirmation survives a
 * refresh and gives the visitor somewhere to go next. It renders fine visited
 * directly too — it makes no claim about *what* was submitted, so it needs no
 * state handed over from the form.
 *
 * One Sanity content set serves both mockups: the steps render as bento cards
 * with ghost numerals on desktop and as a numbered list on phones, and the
 * phone contact is the urgent-help strip on desktop / an oak Call button in
 * the action stack on mobile. The number itself comes from Site settings, so
 * it cannot drift from the one in the footer.
 */
export default async function ThankYouPage() {
  const [{ data: page }, { data: settings }] = await Promise.all([
    sanityFetch({ query: QUOTE_SUCCESS_PAGE_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ]);

  const steps = page?.steps ?? [];
  const [primary, secondary] = page?.actions ?? [];
  const contact = settings?.contact;

  return (
    <section className="relative overflow-hidden">
      {/* The mockup's decorative rotated planks — layout, so they stay in code. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-1/4 hidden h-64 w-32 rotate-12 rounded-lg bg-secondary opacity-10 md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-20 hidden h-80 w-40 -rotate-12 rounded-lg bg-primary opacity-5 md:block"
      />

      <div className="container-page relative mx-auto max-w-4xl py-10 text-center md:py-6 tall:py-12">
        <div className="mb-3 inline-flex size-12 items-center justify-center rounded-full bg-accent text-secondary tall:mb-8 tall:size-24">
          <CircleCheck className="size-6 tall:size-12" aria-hidden="true" />
        </div>

        <h1 className="text-balance text-headline-lg-mobile text-primary md:text-headline-lg tall:text-display-lg">
          {page?.heading ?? "Thank you! Your request is in."}
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-pretty text-body-md text-muted-foreground md:mt-4 md:text-body-lg">
          {page?.description ??
            "We've received your details and will get back to you within 24 hours."}
        </p>

        {/* Phones get the divider photo from the mobile mockup; desktop goes
            without, per its mockup. */}
        {page?.image && (
          <div className="relative mt-6 aspect-[2/1] w-full overflow-hidden rounded-xl border border-border shadow-sm md:hidden">
            <SanityFillImage image={page.image} sizes="100vw" priority />
          </div>
        )}

        {steps.length > 0 && (
          <div className="mt-6 tall:mt-12">
            {page?.stepsHeading && (
              <h2 className="text-left text-label-md uppercase tracking-widest text-secondary md:text-center md:text-headline-md md:normal-case md:tracking-normal md:text-primary">
                {page.stepsHeading}
              </h2>
            )}
            <ol className="mt-5 flex flex-col gap-5 md:mt-4 md:grid md:grid-cols-3 md:gap-gutter">
              {steps.map((step, index) => (
                <li
                  key={step.title ?? index}
                  className="flex gap-4 text-left md:flex-col md:items-start md:rounded-xl md:border md:border-border md:bg-card md:p-4 md:shadow-sm tall:p-8"
                >
                  {/* One number, two treatments: a bordered circle reading "1"
                      on phones, the ghost "01" numeral of the desktop cards. */}
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-secondary text-sm font-bold text-secondary md:size-auto md:rounded-none md:border-0 md:font-display md:text-headline-lg md:leading-none md:text-secondary/30 tall:text-display-lg"
                  >
                    <span className="md:hidden">{index + 1}</span>
                    <span className="hidden md:inline">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="flex flex-col gap-1 md:mt-2 md:gap-2 tall:mt-4">
                    <span className="text-label-md font-semibold text-primary md:text-headline-md">
                      {step.title}
                    </span>
                    <span className="text-body-md text-muted-foreground">
                      {step.description}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 md:mt-6 md:flex-row md:items-center md:gap-6 tall:mt-12">
          {primary?.label && (
            <Button asChild size="xl" className="md:min-w-50">
              <Link href={primary.href ?? "/"}>{primary.label}</Link>
            </Button>
          )}
          {/* The mobile mockup swaps the second link for a Call button. */}
          {contact?.phoneHref && (
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="md:hidden"
            >
              <a href={contact.phoneHref}>
                <Phone className="size-4" aria-hidden="true" />
                Call Now
              </a>
            </Button>
          )}
          {secondary?.label && (
            <Button
              asChild
              size="xl"
              variant="outline"
              className="hidden md:inline-flex md:min-w-50"
            >
              <Link href={secondary.href ?? "/"}>{secondary.label}</Link>
            </Button>
          )}
        </div>

        {page?.urgentText && contact?.phone && (
          <div className="mt-5 hidden items-center gap-4 rounded-xl bg-surface-high/60 px-6 py-3 md:inline-flex tall:mt-10 tall:py-4">
            <Phone className="size-5 text-secondary" aria-hidden="true" />
            <p className="text-body-md text-foreground">
              {page.urgentText}{" "}
              <a
                href={contact.phoneHref ?? undefined}
                className="font-bold text-primary hover:underline"
              >
                Call us at {contact.phone}
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
