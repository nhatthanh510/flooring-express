import type { SiteSettings } from "@/lib/site";
import type { SERVICES_QUERY_RESULT } from "@/sanity/types";
import { PRODUCTION_URL } from "@/lib/site-url";

/**
 * LocalBusiness structured data, built from the same documents the pages render
 * so the schema can never drift from what a visitor actually sees.
 *
 * `url` is the production domain rather than the resolved site URL — a preview
 * deployment must not claim to be the canonical business listing.
 */
export function LocalBusinessJsonLd({
  settings,
  services,
}: {
  settings: SiteSettings;
  services: SERVICES_QUERY_RESULT;
}) {
  const { contact } = settings;

  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: settings.legalName,
    description: settings.description,
    url: PRODUCTION_URL,
    telephone: contact?.phone,
    email: contact?.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact?.street,
      addressLocality: contact?.locality,
      addressRegion: contact?.region,
      postalCode: contact?.postcode,
      addressCountry: contact?.country,
    },
    openingHours: settings.openingHoursSpec ?? [],
    areaServed: (settings.serviceAreas ?? []).map((area) => ({
      "@type": "Place",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Flooring installation services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.servicesBlurb,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from typed, first-party data only — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
