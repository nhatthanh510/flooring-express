import { BentoGallery } from "@/components/home/bento-gallery";
import { HomeContact } from "@/components/home/home-contact";
import { HomeFaq } from "@/components/home/home-faq";
import { HomeHero } from "@/components/home/home-hero";
import { QualityBand } from "@/components/home/quality-band";
import { ServiceCards } from "@/components/home/service-cards";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServiceCards />
      <QualityBand />
      <BentoGallery />
      <HomeFaq />
      <HomeContact />
    </>
  );
}
