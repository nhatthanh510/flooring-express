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
    let visible = false;

    const sync = () => {
      if (motion.matches || !visible) {
        video.pause();
        return;
      }
      // Rejects when the browser declines to autoplay — a saved data setting,
      // say. The poster is already showing, so there is nothing to recover.
      void video.play().catch(() => {});
    };

    /**
     * Nothing is fetched until the tile is near the viewport.
     *
     * `preload="none"` keeps the element from touching the network on load, and
     * the first `play()` is what starts the download — so a gallery of twenty
     * projects costs one request per clip the visitor actually scrolls to,
     * rather than twenty on first paint. Clips also pause on the way out, which
     * matters on a long grid where several would otherwise loop off-screen.
     */
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: "200px" },
    );
    observer.observe(video);

    motion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
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
