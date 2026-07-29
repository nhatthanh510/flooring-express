import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-url";
import { sanityFetch } from "@/sanity/lib/live";
import { SITEMAP_QUERY } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await sanityFetch({ query: SITEMAP_QUERY, stega: false });
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...(data?.navItems ?? []).flatMap((item) =>
      item.href
        ? [
            {
              url: `${siteUrl}${item.href}`,
              lastModified,
              changeFrequency: "monthly" as const,
              priority: 0.8,
            },
          ]
        : [],
    ),
    ...(data?.caseStudies ?? []).flatMap((study) =>
      study.slug
        ? [
            {
              url: `${siteUrl}/gallery/${study.slug}`,
              lastModified,
              changeFrequency: "yearly" as const,
              priority: 0.6,
            },
          ]
        : [],
    ),
  ];
}
