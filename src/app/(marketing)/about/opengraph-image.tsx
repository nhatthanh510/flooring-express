import { OgImage, ogSize } from "@/app/og";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Crafting Hobart's Finest Foundations | Flooring Express Hobart";

export default async function Image() {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY, stega: false });

  return OgImage({
    title: data?.hero?.title ?? "",
    eyebrow: data?.seo?.ogEyebrow ?? undefined,
    description: data?.seo?.ogDescription ?? undefined,
  });
}
