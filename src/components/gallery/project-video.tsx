"use client";

import { useEffect, useRef } from "react";

/**
 * A silent, looping clip that sits over a project's photo.
 *
 * Client-side only because of the autoplay decision. A looping video that a
 * visitor cannot stop is exactly what `prefers-reduced-motion` exists to
 * prevent, and there is no declarative way to express "autoplay unless the user
 * opted out" — so the element ships paused and is started from an effect only
 * when motion is welcome. Everyone else keeps the poster frame, which is the
 * photo, so the tile looks no different from a photo-only one.
 *
 * `muted` is not optional: browsers block autoplay for anything with audio.
 * `preload="metadata"` keeps the gallery from pulling every clip in full on
 * first paint.
 */
export function ProjectVideo({
  src,
  type,
  poster,
  className,
}: {
  src: string;
  type?: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      if (motion.matches) {
        video.pause();
        return;
      }
      // Rejects when the browser declines to autoplay — a saved data setting,
      // say. The poster is already showing, so there is nothing to recover.
      void video.play().catch(() => {});
    };

    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      // Decorative: the tile's heading and the photo's alt text already carry
      // the meaning, and the clip has no audio or narrative of its own.
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    >
      <source src={src} type={type ?? undefined} />
    </video>
  );
}
