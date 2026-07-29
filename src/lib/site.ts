import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity/types";

/**
 * Business details as they arrive from Sanity.
 *
 * Everything downstream takes this as a prop rather than importing it, so the
 * two client components in the header can stay client components without
 * dragging a data fetch into the browser bundle.
 */
export type SiteSettings = NonNullable<SITE_SETTINGS_QUERY_RESULT>;

export type SiteContact = NonNullable<SiteSettings["contact"]>;

/** Was a module-scope template string in site-config.ts; now derived per render. */
export function formatAddress(contact: SiteContact | null | undefined): string {
  if (!contact) return "";
  const { street, locality, region, postcode } = contact;
  return [street, [locality, region, postcode].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
}
