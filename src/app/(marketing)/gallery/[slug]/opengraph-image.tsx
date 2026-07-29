import { OgImage, ogSize } from "@/app/og";
import { sanityFetch } from "@/sanity/lib/live";
import { CASE_STUDY_OG_QUERY, CASE_STUDY_SLUGS_QUERY } from "@/sanity/queries";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Flooring Express Hobart case study";

/** Duplicated from the page — Next requires it per image file. */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: CASE_STUDY_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  return (data ?? []).flatMap((study) => (study.slug ? [{ slug: study.slug }] : []));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: study } = await sanityFetch({
    query: CASE_STUDY_OG_QUERY,
    params: { slug },
    stega: false,
  });

  return OgImage({
    title: study?.title ?? "Case Study",
    eyebrow: study?.eyebrow ?? "Portfolio",
    description: study?.summary ?? undefined,
  });
}
