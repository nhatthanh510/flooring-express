import type { Metadata } from "next";
import { CtaBanner } from "@/components/shared/cta-banner";
import { ProjectMasonry } from "@/components/gallery/project-masonry";
import { isGalleryFilter } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Recently completed residential and commercial flooring installations across Hobart — timber, laminate and hybrid.",
};

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = isGalleryFilter(category) ? category : "all";

  return (
    <>
      <section className="container-page py-16 text-center md:py-24">
        <h1 className="text-headline-lg text-primary md:text-display-lg">
          Our Portfolio
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-body-lg text-muted-foreground">
          Explore our recently completed residential and commercial flooring
          installations across Hobart. From timeless timber to modern hybrid
          solutions.
        </p>
      </section>

      <ProjectMasonry active={active} />

      <CtaBanner
        title="Ready to transform your floors?"
        description="Get a free, no-obligation quote from Hobart's flooring specialists today."
        primary={{
          href: "/contact?enquiry=quote",
          label: "Start Your Project",
        }}
        secondary={{
          href: "/contact?enquiry=commercial",
          label: "Contact Sales",
        }}
        texture="dots"
        align="split"
      />
    </>
  );
}
