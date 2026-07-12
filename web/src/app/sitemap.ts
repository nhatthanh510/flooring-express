import type { MetadataRoute } from "next";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { siteUrl } from "@/lib/site";

const SLUGS_QUERY = defineQuery(
  `*[_type == "product" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products: { slug: string | null; _updatedAt: string }[] = [];
  try {
    products = await client.fetch(SLUGS_QUERY);
  } catch {
    // If Sanity is unreachable at build/request time, still emit the home URL.
    products = [];
  }

  const productUrls: MetadataRoute.Sitemap = products
    .filter((p): p is { slug: string; _updatedAt: string } => Boolean(p.slug))
    .map((p) => ({
      url: `${siteUrl}/products/${p.slug}`,
      lastModified: p._updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...productUrls,
  ];
}
