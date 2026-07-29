import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shown the instant a link to /gallery is clicked.
 *
 * The route reads `searchParams` for the category filter, so it renders on
 * demand and can't be prefetched whole. This file is what Next.js prefetches
 * instead: navigation commits immediately and this stands in while the Sanity
 * queries run, rather than the browser sitting on the old page with no signal.
 *
 * Deliberately mirrors the real page's geometry — same hero rhythm, same pill
 * row, same masonry columns — so the swap doesn't shift the layout.
 */

/**
 * Widths for the four filter pills. Written out in full because Tailwind scans
 * source text for literal class names — anything assembled at runtime never
 * makes it into the stylesheet.
 */
const PILL_WIDTHS = ["w-24", "w-32", "w-28", "w-36"] as const;

/** Mirrors the varied `project.aspect` values that make the masonry uneven. */
const CARD_HEIGHTS = [
  "h-80",
  "h-[26rem]",
  "h-72",
  "h-[30rem]",
  "h-80",
  "h-96",
] as const;

export default function GalleryLoading() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Loading projects…</span>

      <section className="container-page py-16 text-center md:py-24">
        <Skeleton className="mx-auto h-12 w-3/4 max-w-xl md:h-16" />
        <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>
      </section>

      <section className="container-page pb-section">
        <ul className="flex flex-wrap justify-center gap-3">
          {PILL_WIDTHS.map((width, index) => (
            <li key={index}>
              <Skeleton className={`h-12 rounded-full ${width}`} />
            </li>
          ))}
        </ul>

        <Skeleton className="mx-auto mt-6 h-4 w-56" />

        <div className="mt-12 gap-gutter [column-count:1] md:[column-count:2] lg:[column-count:3]">
          {CARD_HEIGHTS.map((height, index) => (
            <Skeleton
              key={index}
              className={`mb-gutter w-full break-inside-avoid rounded-2xl ${height}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
