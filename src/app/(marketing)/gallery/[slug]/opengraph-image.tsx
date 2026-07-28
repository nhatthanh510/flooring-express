import { OgImage, ogSize } from "@/app/og";
import { caseStudies, getCaseStudy } from "@/lib/content/case-studies";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Flooring Express Hobart case study";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  return OgImage({
    title: study?.title ?? "Case Study",
    eyebrow: study?.eyebrow ?? "Portfolio",
    description: study?.summary,
  });
}
