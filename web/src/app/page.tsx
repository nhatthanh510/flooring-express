import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { TrustBar } from "@/components/landing/trust-bar";
import { Services } from "@/components/landing/services";
import { Gallery } from "@/components/landing/gallery";
import { Ranges } from "@/components/landing/ranges";
import { Process } from "@/components/landing/process";
import { QuoteCta } from "@/components/landing/quote-cta";
import { Faq } from "@/components/landing/faq";
import { SiteFooter } from "@/components/landing/site-footer";
import { site, siteUrl, faqs } from "@/lib/site";

function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    description: site.description,
    url: siteUrl,
    telephone: site.phone,
    email: site.email,
    priceRange: "$$",
    areaServed: site.serviceAreas.map((name) => ({
      "@type": "City",
      name,
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Services />
        <Gallery />
        <Ranges />
        <Process />
        <QuoteCta />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
