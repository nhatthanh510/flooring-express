import type { Metadata } from "next";

import { CtaBanner } from "@/components/shared/cta-banner";
import { ProjectMasonry } from "@/components/gallery/project-masonry";
import { isGalleryFilter } from "@/lib/flooring";
import { sanityFetch } from "@/sanity/lib/live";
import { GALLERY_PAGE_QUERY, GALLERY_PROJECTS_QUERY } from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: GALLERY_PAGE_QUERY,
    stega: false,
  });
  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: { canonical: "/gallery" },
  };
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ category }, { data: page }, { data: projects }] = await Promise.all([
    searchParams,
    sanityFetch({ query: GALLERY_PAGE_QUERY }),
    sanityFetch({ query: GALLERY_PROJECTS_QUERY }),
  ]);
  const active = isGalleryFilter(category) ? category : "all";

  return (
    <>
      <section className="container-page py-16 text-center md:py-24">
        <h1 className="text-headline-lg text-primary md:text-display-lg">
          {page?.hero?.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-body-lg text-muted-foreground">
          {page?.hero?.description}
        </p>
      </section>

      <ProjectMasonry active={active} projects={projects} />

      <CtaBanner cta={page?.cta ?? null} texture="dots" align="split" />
    </>
  );
}
