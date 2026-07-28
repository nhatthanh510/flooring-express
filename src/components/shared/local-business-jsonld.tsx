import { services } from "@/lib/content/services";
import { siteConfig } from "@/lib/site-config";

/**
 * LocalBusiness structured data, built from site-config so the schema can never
 * drift from what the pages actually display.
 */
export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.street,
      addressLocality: siteConfig.contact.locality,
      addressRegion: siteConfig.contact.region,
      postalCode: siteConfig.contact.postcode,
      addressCountry: siteConfig.contact.country,
    },
    openingHours: siteConfig.openingHoursSpec,
    areaServed: siteConfig.serviceAreas.map((area) => ({
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
