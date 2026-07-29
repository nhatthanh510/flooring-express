import { BentoGallery } from "@/components/home/bento-gallery";
import { HomeContact } from "@/components/home/home-contact";
import { HomeFaq } from "@/components/home/home-faq";
import { HomeHero } from "@/components/home/home-hero";
import { QualityBand } from "@/components/home/quality-band";
import { ServiceCards } from "@/components/home/service-cards";
import { sanityFetch } from "@/sanity/lib/live";
import {
  HOME_FAQS_QUERY,
  HOME_PAGE_QUERY,
  SERVICES_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/queries";

export default async function HomePage() {
  const [{ data: page }, { data: services }, { data: faqs }, { data: settings }] =
    await Promise.all([
      sanityFetch({ query: HOME_PAGE_QUERY }),
      sanityFetch({ query: SERVICES_QUERY }),
      sanityFetch({ query: HOME_FAQS_QUERY }),
      sanityFetch({ query: SITE_SETTINGS_QUERY }),
    ]);

  if (!page || !settings) return null;

  return (
    <>
      <HomeHero hero={page.hero} />
      <ServiceCards heading={page.servicesHeading} services={services} />
      <QualityBand
        band={page.qualityBand}
        yearsExperience={settings.stats?.yearsExperience ?? ""}
      />
      <BentoGallery heading={page.galleryHeading} tiles={page.bentoTiles} />
      <HomeFaq section={page.faqSection} faqs={faqs} />
      <HomeContact section={page.contactSection} settings={settings} />
    </>
  );
}
