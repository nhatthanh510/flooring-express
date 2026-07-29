"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { imageProps, type SanityImage } from "@/sanity/lib/image";

/**
 * Full-size viewer for a case study's gallery.
 *
 * The grid stays server-rendered — this only takes over once something is
 * clicked, so the photos are still plain markup for crawlers and the page costs
 * nothing extra until a visitor wants a closer look.
 *
 * Deliberately holds no state of its own. `index` is the caller's, and moving
 * between images calls back up. Mirroring it into local state here would mean
 * syncing the copy in an effect, which is both a `setState`-in-effect and a
 * second source of truth for the same number.
 */
export function GalleryLightbox({
  images,
  index,
  onChange,
}: {
  images: SanityImage[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const count = images.length;
  const open = index !== null;

  // Wraps at both ends, so "next" on the last image returns to the first.
  const step = (delta: number) => {
    if (index === null) return;
    onChange((index + delta + count) % count);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const current = index !== null ? images[index] : null;
  const props = current ? imageProps(current) : null;

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onChange(null)}>
      <DialogContent
        showCloseButton
        className="max-w-none border-0 bg-transparent p-0 shadow-none sm:max-w-[min(92vw,1400px)]"
      >
        <DialogTitle className="sr-only">
          {current?.alt || `Project photo ${(index ?? 0) + 1} of ${count}`}
        </DialogTitle>

        <div className="relative flex items-center justify-center">
          {props && (
            // Not `fill`: the point of a lightbox is to see the photo at its own
            // proportions, so it is sized by its intrinsic ratio and bounded by
            // the viewport rather than cropped into a box.
            <Image
              src={props.src}
              alt={current?.decorative ? "" : (current?.alt ?? "")}
              width={props.width ?? 1600}
              height={props.height ?? 1200}
              sizes="92vw"
              className="h-auto max-h-[85vh] w-auto rounded-lg object-contain"
              placeholder={props.placeholder}
              blurDataURL={props.blurDataURL}
              fetchPriority="high"
            />
          )}

          {count > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Previous image"
                onClick={() => step(-1)}
                className="absolute left-2 bg-black/50 text-white hover:bg-black/70 hover:text-white"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Next image"
                onClick={() => step(1)}
                className="absolute right-2 bg-black/50 text-white hover:bg-black/70 hover:text-white"
              >
                <ChevronRight />
              </Button>
            </>
          )}
        </div>

        {count > 1 && (
          <p className="mt-3 text-center text-label-md text-white/80">
            {(index ?? 0) + 1} / {count}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
