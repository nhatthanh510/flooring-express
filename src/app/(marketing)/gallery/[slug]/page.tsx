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
import {
  caseStudies,
  getCaseStudy,
  getNextCaseStudy,
} from "@/lib/content/case-studies";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.metaTitle,
    description: study.metaDescription,
    openGraph: {
      title: study.metaTitle,
      description: study.metaDescription,
      images: [study.hero.src],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const next = getNextCaseStudy(slug);

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
