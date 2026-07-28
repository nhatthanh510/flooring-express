import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PlankComparison } from "@/components/services/plank-comparison";
import { ProcessSteps } from "@/components/services/process-steps";
import { ServiceDetailGrid } from "@/components/services/service-detail-grid";

export const metadata: Metadata = {
  title: "Professional Flooring Services",
  description:
    "Expert flooring installation in Hobart. Specializing in Hybrid, Laminate, and Timber flooring solutions for premium homes.",
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
      />

      <ServiceDetailGrid />
      <PlankComparison />
      <ProcessSteps />

      <CtaBanner
        title="Ready to Step onto Something Better?"
        description="Schedule your free, no-obligation consultation with a Hobart flooring expert today. We bring the showroom to you."
        primary={{ href: "/contact", label: "Book Free Consultation" }}
        secondary={{ href: "/contact", label: "Talk to a Specialist" }}
        pattern="/images/services/cta-pattern.webp"
      />
    </>
  );
}
