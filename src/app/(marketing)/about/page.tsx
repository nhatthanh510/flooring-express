import type { Metadata } from "next";
import { CraftsmanshipGrid } from "@/components/about/craftsmanship-grid";
import { MissionStory } from "@/components/about/mission-story";
import { SpecTable } from "@/components/about/spec-table";
import { StatsBento } from "@/components/about/stats-bento";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Locally owned and operated, Flooring Express brings over 15 years of precision craftsmanship to every Hobart home we touch.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Crafting Hobart's Finest Foundations"
        description="Locally owned and operated, we bring over 15 years of precision craftsmanship to every home we touch."
        image={{
          src: "/images/about/hero.webp",
          alt: "Detail of a freshly installed timber floor catching afternoon light.",
        }}
        scrim="left"
        height="min-h-[480px] md:min-h-[614px]"
      />

      <StatsBento />
      <MissionStory />
      <CraftsmanshipGrid />
      <SpecTable />

      <CtaBanner
        title="Ready to start your transformation?"
        description="Book a free on-site consultation with our Hobart team today. We'll bring samples to your door."
        primary={{
          href: "/contact?enquiry=quote",
          label: "Request Free Quote",
        }}
        align="split"
      />
    </>
  );
}
