import type { Metadata } from "next";

import { CraftsmanshipGrid } from "@/components/about/craftsmanship-grid";
import { MissionStory } from "@/components/about/mission-story";
import { SpecTable } from "@/components/about/spec-table";
import { StatsBento } from "@/components/about/stats-bento";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY, stega: false });
  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const { data: page } = await sanityFetch({ query: ABOUT_PAGE_QUERY });
  if (!page) return null;

  return (
    <>
      <PageHero
        title={page.hero?.title ?? ""}
        description={page.hero?.description ?? undefined}
        image={page.hero?.image}
        scrim="left"
        height="min-h-[480px] md:min-h-[614px]"
      />

      <StatsBento stats={page.stats} />
      <MissionStory story={page.missionStory} />
      <CraftsmanshipGrid cards={page.craftCards} />
      <SpecTable table={page.specTable} />

      <CtaBanner cta={page.cta} align="split" />
    </>
  );
}
