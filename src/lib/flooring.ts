import type { SERVICES_QUERY_RESULT } from "@/sanity/types";

export type FlooringService = SERVICES_QUERY_RESULT[number];

/**
 * The three product lines the whole design is built around — the comparison
 * table, the plank toggle and the gallery filters all assume exactly these.
 * Constrained in the Sanity schema too, so the two cannot drift.
 */
export type FlooringSlug = "hybrid" | "laminate" | "timber";

export function isFlooringSlug(value: string | undefined): value is FlooringSlug {
  return value === "hybrid" || value === "laminate" || value === "timber";
}

/**
 * Row labels for the comparison table, in display order.
 *
 * Structural rather than editorial: the keys have to match the fixed-key
 * `specs` object on the flooringService schema, so a label typed into the CMS
 * would have nothing to read from.
 */
export const comparisonRows = [
  { key: "coreMaterial", label: "Core Material" },
  { key: "jankaRating", label: "Janka Rating" },
  { key: "thickness", label: "Thickness" },
  { key: "installation", label: "Installation Type" },
  { key: "waterproof", label: "Waterproof Status" },
] as const satisfies readonly {
  key: keyof NonNullable<FlooringService["specs"]>;
  label: string;
}[];

/** The filter pills above the gallery masonry. */
export const galleryFilters = [
  { value: "all", label: "All Projects" },
  { value: "hybrid", label: "Hybrid" },
  { value: "timber", label: "Timber" },
  { value: "laminate", label: "Laminate" },
] as const;

export type GalleryFilter = (typeof galleryFilters)[number]["value"];

export function isGalleryFilter(
  value: string | undefined,
): value is GalleryFilter {
  return galleryFilters.some((filter) => filter.value === value);
}
