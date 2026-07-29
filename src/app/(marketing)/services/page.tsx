import type { Metadata } from "next";
import { Link } from "@/components/shared/link";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PlankComparison } from "@/components/services/plank-comparison";
import { ProcessSteps } from "@/components/services/process-steps";
import { ServiceDetailGrid } from "@/components/services/service-detail-grid";
import { SpecSelectionProvider } from "@/components/services/spec-selection";
import { sanityFetch } from "@/sanity/lib/live";
import {
  PROCESS_STEPS_QUERY,
  SERVICES_PAGE_QUERY,
  SERVICES_QUERY,
} from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: SERVICES_PAGE_QUERY,
    stega: false,
  });
  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage() {
  const [{ data: page }, { data: services }, { data: steps }] =
    await Promise.all([
      sanityFetch({ query: SERVICES_PAGE_QUERY }),
      sanityFetch({ query: SERVICES_QUERY }),
      sanityFetch({ query: PROCESS_STEPS_QUERY }),
    ]);

  if (!page) return null;
  const [primaryAction, secondaryAction] = page.hero?.actions ?? [];

  return (
    <>
      <PageHero
        eyebrow={page.hero?.eyebrow ?? undefined}
        title={page.hero?.title ?? ""}
        description={page.hero?.description ?? undefined}
        image={page.hero?.image}
        scrim="left"
        height="min-h-[520px] md:min-h-[614px]"
      >
        {primaryAction && (
          <Button asChild size="xl" variant="secondary">
            <Link href={primaryAction.href ?? "#"}>{primaryAction.label}</Link>
          </Button>
        )}
        {secondaryAction && (
          <Button
            asChild
            size="xl"
            variant="outline"
            className="border-2 border-white bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
          >
            <Link href={secondaryAction.href ?? "#"}>
              {secondaryAction.label}
            </Link>
          </Button>
        )}
      </PageHero>

      {/* Both sections share one selection, so "View Specifications" opens the
          comparison already showing that product. */}
      <SpecSelectionProvider>
        <ServiceDetailGrid services={services} />
        <PlankComparison heading={page.comparisonHeading} services={services} />
      </SpecSelectionProvider>
      <ProcessSteps
        heading={page.processHeading}
        footnote={page.processFootnote}
        steps={steps}
      />

      <CtaBanner cta={page.cta} pattern={page.cta?.image} />
    </>
  );
}
