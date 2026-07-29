import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  CaseStudyCta,
  CaseStudyDetails,
  CaseStudyFeatures,
  CaseStudyGallery,
  CaseStudyHero,
  CaseStudyMeta,
  CaseStudyNarrative,
  CaseStudyNext,
  CaseStudyRoadmap,
  CaseStudySpecs,
  CaseStudyTestimonial,
} from "@/components/projects/case-study-sections";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CASE_STUDY_QUERY,
  CASE_STUDY_SLUGS_QUERY,
  NEXT_CASE_STUDY_QUERY,
} from "@/sanity/queries";

/**
 * `perspective: "published"` — build-time prerendering must never bake a draft
 * into a static page, whatever the ambient draft-mode state happens to be.
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: CASE_STUDY_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  return (data ?? []).flatMap((study) => (study.slug ? [{ slug: study.slug }] : []));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: study } = await sanityFetch({
    query: CASE_STUDY_QUERY,
    params: { slug },
    stega: false,
  });
  // An unknown slug streams the 404 through not-found.tsx, which cannot set
  // metadata of its own — without this the tab keeps the default site title.
  if (!study) return { title: "Page not found" };

  return {
    title: study.seo?.metaTitle,
    description: study.seo?.metaDescription,
    alternates: { canonical: `/gallery/${study.slug}` },
    openGraph: {
      type: "article",
      title: study.seo?.metaTitle ?? undefined,
      description: study.seo?.metaDescription ?? undefined,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: study } = await sanityFetch({
    query: CASE_STUDY_QUERY,
    params: { slug },
  });
  if (!study) notFound();

  // The "next project" link wraps to the first study, which is what the old
  // modulo-the-array helper did — now expressed against the `order` field.
  const { data: next } = await sanityFetch({
    query: NEXT_CASE_STUDY_QUERY,
    params: { order: study.order ?? 0 },
  });

  return (
    <>
      <CaseStudyHero study={study} />
      <CaseStudyMeta items={study.meta} />
      <CaseStudyNarrative study={study} />
      <CaseStudyFeatures features={study.features} />
      <CaseStudySpecs specs={study.specs} />
      <CaseStudyDetails details={study.details} />
      <CaseStudyGallery gallery={study.gallery} />
      <CaseStudyRoadmap roadmap={study.roadmap} />
      <CaseStudyTestimonial testimonial={study.testimonial} />
      <CaseStudyNext next={next} />
      <CaseStudyCta cta={study.cta} />
    </>
  );
}
