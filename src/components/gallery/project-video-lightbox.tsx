"use client";

import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";

import { Link } from "@/components/shared/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export type ProjectVideoItem = {
  slug: string;
  title: string;
  subtitle: string | null;
  src: string;
  type: string | null;
  /** Present when the project also has a case study to read afterwards. */
  caseStudy: string | null;
};

/**
 * Shared open-state for the gallery's video tiles.
 *
 * Context rather than state per tile, because the viewer steps between videos —
 * a modal owned by one tile could not advance to the next project's clip. The
 * grid itself stays a server component; only the triggers and this viewer are
 * client-side, so twenty tiles still arrive as plain HTML.
 */
const LightboxContext = createContext<{
  videos: ProjectVideoItem[];
  open: (slug: string) => void;
} | null>(null);

export function ProjectVideoLightboxProvider({
  videos,
  children,
}: {
  videos: ProjectVideoItem[];
  children: React.ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const count = videos.length;
  const isOpen = index !== null;

  // Wraps at both ends, matching the case study lightbox.
  const step = (delta: number) => {
    if (index === null) return;
    setIndex((index + delta + count) % count);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const current = index !== null ? videos[index] : null;

  return (
    <LightboxContext.Provider
      value={{
        videos,
        open: (slug) => {
          const next = videos.findIndex((video) => video.slug === slug);
          if (next !== -1) setIndex(next);
        },
      }}
    >
      {children}

      <Dialog open={isOpen} onOpenChange={(next) => !next && setIndex(null)}>
        {/**
         * A full-viewport stage rather than the default centred box.
         *
         * Two reasons, both structural. The base content is centred with a
         * `translate`, and a transformed ancestor becomes the containing block
         * for `position: fixed` — so a "fixed to the top-right of the screen"
         * close button lands on the corner of the box instead. And a box that
         * shrink-wraps its content gives the video no width to fill, which is
         * how a 1400px-capped dialog ends up rendering a thumbnail.
         */}
        <DialogContent
          // The default close button is an `icon-sm` ghost, sized for a form
          // dialog and near-invisible against a dark scrim. This one is its own.
          showCloseButton={false}
          overlayClassName="bg-black/90 supports-backdrop-filter:backdrop-blur-sm"
          className="inset-0 left-0 top-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col items-center justify-center gap-4 rounded-none border-0 bg-transparent p-4 shadow-none ring-0 sm:max-w-none"
        >
          <DialogTitle className="sr-only">
            {current ? `${current.title} project video` : "Project video"}
          </DialogTitle>

          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label="Close video"
              className="absolute right-4 top-4 z-50 size-12 rounded-full bg-white/10 text-white hover:bg-white/25 hover:text-white"
            >
              <X className="size-6" />
            </Button>
          </DialogClose>

          {/* `flex-1 min-h-0` rather than a `max-h-[80vh]` guess: the caption
              below is a sibling in the column, so the video yields whatever
              height it needs instead of pushing it off a short viewport. */}
          <div className="relative flex w-full min-h-0 max-w-[min(92vw,1200px)] flex-1 items-center justify-center">
            {current && (
              /**
               * Keyed on the slug so stepping to the next project mounts a
               * fresh element. Swapping `src` on a live <video> keeps the old
               * frame on screen until the new one decodes, which reads as the
               * arrow having done nothing.
               */
              <video
                key={current.slug}
                src={current.src}
                controls
                autoPlay
                // These are the tile loops, which the schema defines as silent.
                // Muted is therefore honest, and it is also what lets autoplay
                // survive: browsers block an unmuted autoplay outside a direct
                // gesture, and the click landed on the tile, not on this
                // element. Controls are present either way.
                muted
                loop
                playsInline
                preload="auto"
                className="size-full max-h-full rounded-lg bg-black object-contain"
              >
                {current.type && <source src={current.src} type={current.type} />}
              </video>
            )}

            {count > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon-lg"
                  aria-label="Previous video"
                  onClick={() => step(-1)}
                  className="absolute left-2 bg-black/50 text-white hover:bg-black/70 hover:text-white"
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-lg"
                  aria-label="Next video"
                  onClick={() => step(1)}
                  className="absolute right-2 bg-black/50 text-white hover:bg-black/70 hover:text-white"
                >
                  <ChevronRight />
                </Button>
              </>
            )}
          </div>

          {current && (
            <div className="mt-4 flex flex-col items-center gap-2 text-center">
              <p className="text-headline-md text-white">{current.title}</p>
              {current.subtitle && (
                <p className="text-body-md text-white/70">{current.subtitle}</p>
              )}
              {/* A video tile with a case study would otherwise have no route
                  to it — the tile's click now opens this instead of navigating. */}
              {current.caseStudy && (
                <Link
                  href={`/gallery/${current.caseStudy}`}
                  className="text-label-md text-cream underline underline-offset-4 hover:text-white"
                >
                  View the full case study
                </Link>
              )}
              {count > 1 && (
                <p className="text-label-md text-white/60">
                  {(index ?? 0) + 1} of {count}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </LightboxContext.Provider>
  );
}

/**
 * The whole tile as a play button, plus the badge that says so.
 *
 * Stretched over the tile the same way the case-study link is, so the hit
 * target and focus ring are identical whichever kind of tile it is.
 */
export function ProjectVideoTrigger({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const context = useContext(LightboxContext);
  if (!context) return null;

  return (
    <>
      <span
        aria-hidden="true"
        className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm"
      >
        <Play className="ml-0.5 size-3.5 fill-current" />
      </span>
      <button
        type="button"
        onClick={() => context.open(slug)}
        className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span className="sr-only">Play the {title} video</span>
      </button>
    </>
  );
}
