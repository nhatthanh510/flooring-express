import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bentoTiles } from "@/lib/content/projects";
import { cn } from "@/lib/utils";

export function BentoGallery() {
  return (
    <section id="gallery" className="container-page scroll-mt-24 py-section">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex flex-col gap-3">
          <p className="text-label-sm uppercase text-secondary">Portfolio</p>
          <h2 className="text-headline-lg text-primary md:text-display-lg">
            Our Recent Work
          </h2>
        </div>
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-label-md font-semibold text-primary transition-[gap] hover:gap-3"
        >
          View More Projects
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:h-[800px] md:grid-cols-4 md:grid-rows-2">
        {bentoTiles.map((tile) => (
          <figure
            key={tile.caption}
            className={cn(
              "group relative overflow-hidden rounded-2xl",
              "aspect-[4/3] md:aspect-auto",
              tile.span,
            )}
          >
            <Image
              src={tile.image.src}
              alt={tile.image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 text-body-md font-medium text-white">
              {tile.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
