import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SanityFillImage } from "@/components/shared/sanity-image";
import { cn } from "@/lib/utils";
import type { HOME_PAGE_QUERY_RESULT } from "@/sanity/types";

type Page = NonNullable<HOME_PAGE_QUERY_RESULT>;

export function BentoGallery({
  heading,
  tiles,
}: {
  heading: Page["galleryHeading"];
  tiles: Page["bentoTiles"];
}) {
  if (!tiles?.length) return null;

  return (
    <section id="gallery" className="container-page scroll-mt-24 py-section">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex flex-col gap-3">
          <p className="text-label-sm uppercase text-secondary">
            {heading?.eyebrow}
          </p>
          <h2 className="text-headline-lg-mobile text-primary md:text-display-lg">
            {heading?.title}
          </h2>
        </div>
        {heading?.link && (
          <Link
            href={heading.link.href ?? "/gallery"}
            className="inline-flex min-h-11 items-center gap-2 text-label-md font-semibold text-primary transition-[gap] hover:gap-3"
          >
            {heading.link.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:h-[800px] md:grid-cols-4 md:grid-rows-2">
        {tiles.map((tile, index) => {
          const project = tile.project;
          if (!project) return null;

          // Deep-link to the full case study where one exists, otherwise to the
          // gallery filtered to that flooring type.
          const href = project.caseStudy
            ? `/gallery/${project.caseStudy}`
            : `/gallery?category=${project.category}`;
          const caption = `${project.title} - ${project.subtitle}`;

          return (
            <Link
              key={project.slug ?? index}
              href={href}
              className={cn(
                "group relative block overflow-hidden rounded-2xl",
                "aspect-[4/3] md:aspect-auto",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                tile.span,
              )}
            >
              <SanityFillImage
                image={project.image}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-6 text-body-md font-medium text-white">
                {caption}
                <ArrowRight
                  className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
