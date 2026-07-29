"use client";

import { useState } from "react";
import { Expand } from "lucide-react";

import { GalleryLightbox } from "@/components/projects/gallery-lightbox";
import { Reveal } from "@/components/shared/reveal";
import { SanityFillImage } from "@/components/shared/sanity-image";
import type { SanityImage } from "@/sanity/lib/image";

/**
 * The case-study gallery grid, with each tile opening a full-size viewer.
 *
 * A Client Component, but still server-rendered into the initial HTML like any
 * other — so the photos remain in the markup for crawlers. What the client half
 * adds is only the click handling and the lightbox state.
 *
 * Each tile is a real `<button>` rather than a click handler on the figure:
 * this is an interactive control, so it needs to be reachable by keyboard and
 * announce itself as something that opens a dialog.
 */
export function CaseStudyGalleryGrid({ images }: { images: SanityImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <Reveal key={image.asset?._id ?? index} delay={index * 60}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={
                image.alt
                  ? `View "${image.alt}" full size`
                  : `View project photo ${index + 1} full size`
              }
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <SanityFillImage
                image={image}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover affordance — without it nothing signals the tile is
                  clickable. Hidden from assistive tech; the button's own label
                  already says what it does. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <Expand className="size-8 text-white" />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <GalleryLightbox
        images={images}
        index={openIndex}
        onChange={setOpenIndex}
      />
    </>
  );
}
