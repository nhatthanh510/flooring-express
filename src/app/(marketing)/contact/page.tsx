import { Suspense } from "react";
import type { Metadata } from "next";
import { Link } from "@/components/shared/link";

import { Button } from "@/components/ui/button";
import { ContactInfoCards } from "@/components/contact/contact-info-cards";
import { QuoteIntro, QuoteIntroBody } from "@/components/contact/quote-intro";
import { PageHero } from "@/components/shared/page-hero";
import { SanityFillImage } from "@/components/shared/sanity-image";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: CONTACT_PAGE_QUERY,
    stega: false,
  });
  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: { canonical: "/contact" },
  };
}

/**
 * Deliberately takes no `searchParams`.
 *
 * The `?enquiry=` / `?flooring=` deep links every CTA uses are read on the
 * client by `<QuoteIntro>` instead. Touching `searchParams` here would make the
 * whole route render on demand, which stops Next.js prefetching it — and since
 * most CTAs on the site point here, that turned every one of them into a visible
 * wait. Read from the client, the page prerenders and those clicks are instant.
 */
export default async function ContactPage() {
  const [{ data: page }, { data: settings }] = await Promise.all([
    sanityFetch({ query: CONTACT_PAGE_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ]);

  if (!page || !settings) return null;
  const [primary, secondary] = page.closingBand?.actions ?? [];

  return (
    <>
      <PageHero
        title={page.hero?.title ?? ""}
        description={page.hero?.description ?? undefined}
        image={page.hero?.image}
        scrim="left"
        height="min-h-[260px] md:min-h-[409px]"
      />

      <section className="container-page py-12 md:py-section">
        {/* Contact details lead in the DOM so they come first on mobile, as in
            the mockup; `lg:order-*` swaps the columns on desktop. The group's
            sr-only h2 keeps the heading order valid (h1 → h2 → h3 → h2). */}
        <div className="grid items-start gap-gutter lg:grid-cols-12">
          <div className="lg:order-1 lg:col-span-5">
            <h2 className="sr-only">Contact details</h2>
            <ContactInfoCards settings={settings} />
          </div>
          <div className="lg:order-2 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-ambient md:p-12">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 size-48 rounded-full bg-secondary/5"
              />
              <div className="relative">
                {/* The fallback is the same markup with the default "quote"
                    wording, so the prerendered HTML carries a complete, usable
                    form rather than a placeholder. */}
                <Suspense fallback={<QuoteIntroBody />}>
                  <QuoteIntro />
                </Suspense>

                <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <div className="flex -space-x-3">
                    {page.avatars?.map((avatar) => (
                      <span
                        key={avatar.asset?._id}
                        className="relative size-10 overflow-hidden rounded-full border-2 border-card"
                      >
                        <SanityFillImage image={avatar} sizes="40px" />
                      </span>
                    ))}
                  </div>
                  <p className="text-body-md text-muted-foreground">
                    {page.socialProof?.prefix}{" "}
                    <strong className="font-semibold text-primary">
                      {settings.stats?.familiesServed}{" "}
                      {page.socialProof?.highlightSuffix}
                    </strong>{" "}
                    {page.socialProof?.suffix}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* primary-container, not primary — this sits directly above the footer
          and needs a tonal step or the two dark blocks merge. */}
      <section className="bg-ink-soft py-section">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="text-headline-lg-mobile text-primary-foreground md:text-display-lg">
            {page.closingBand?.title}
          </h2>
          <p className="max-w-2xl text-pretty text-body-lg text-ink-muted">
            {page.closingBand?.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {primary && (
              <Button asChild size="xl" variant="secondary">
                <Link href={primary.href ?? "#"}>{primary.label}</Link>
              </Button>
            )}
            {secondary && (
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              >
                <a href={secondary.href ?? "#"}>{secondary.label}</a>
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
