import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { siteConfig } from "@/lib/site-config";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PlankComparison } from "@/components/services/plank-comparison";
import { ProcessSteps } from "@/components/services/process-steps";
import { ServiceDetailGrid } from "@/components/services/service-detail-grid";
import { SpecSelectionProvider } from "@/components/services/spec-selection";

export const metadata: Metadata = {
  title: "Professional Flooring Services",
  description:
    "Expert flooring installation in Hobart. Specializing in Hybrid, Laminate, and Timber flooring solutions for premium homes.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Expert Hobart Installers"
        title="Premium Flooring for Modern Living."
        description="Transform your space with our curated selection of high-performance surfaces, installed by Tasmania's leading specialists."
        image={{
          src: "/images/services/hero.webp",
          alt: "Wide-plank timber flooring running through a bright, contemporary Hobart interior.",
        }}
        scrim="left"
        height="min-h-[520px] md:min-h-[614px]"
      >
        <Button asChild size="xl" variant="secondary">
          <Link href="#services">Explore Collections</Link>
        </Button>
        <Button
          asChild
          size="xl"
          variant="outline"
          className="border-2 border-white bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
        >
          <Link href="#process">How We Work</Link>
        </Button>
      </PageHero>

      {/* Both sections share one selection, so "View Specifications" opens the
          comparison already showing that product. */}
      <SpecSelectionProvider>
        <ServiceDetailGrid />
        <PlankComparison />
      </SpecSelectionProvider>
      <ProcessSteps />

      <CtaBanner
        title="Ready to Step onto Something Better?"
        description="Schedule your free, no-obligation consultation with a Hobart flooring expert today. We bring the showroom to you."
        primary={{
          href: "/contact?enquiry=consultation",
          label: "Book Free Consultation",
        }}
        secondary={{
          href: siteConfig.contact.phoneHref,
          label: `Call ${siteConfig.contact.phone}`,
        }}
        pattern="/images/services/cta-pattern.webp"
      />
    </>
  );
}
