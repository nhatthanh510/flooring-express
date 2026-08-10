import type { MetadataRoute } from "next";

import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { data: settings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    stega: false,
  });

  return {
    name: `${settings?.legalName ?? ""} | ${settings?.tagline ?? ""}`,
    short_name: settings?.name ?? "",
    description: settings?.description ?? "",
    start_url: "/",
    display: "standalone",
    background_color: "#f9f9f9",
    theme_color: "#f9f9f9",
    lang: "en-AU",
    categories: ["business", "shopping", "lifestyle"],
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
