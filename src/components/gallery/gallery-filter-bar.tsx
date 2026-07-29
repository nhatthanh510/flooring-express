"use client";

import { Link } from "@/components/shared/link";
import { useSearchParams } from "next/navigation";

import { galleryFilters, isGalleryFilter, type GalleryFilter } from "@/lib/flooring";
import { cn } from "@/lib/utils";

export type FilterCounts = Record<GalleryFilter, number>;

/**
 * Reads the active filter from `?category=`.
 *
 * The page used to take this from its `searchParams` prop and filter the
 * projects on the server. That is a request-time API, so /gallery rendered on
 * demand and could not be prefetched — every click on the Gallery nav item paid
 * a server round trip. Reading it here instead lets the whole route prerender.
 */
export function GalleryFilterBarLive({ counts }: { counts: FilterCounts }) {
  const params = useSearchParams();
  const raw = params.get("category") ?? undefined;
  return <GalleryFilterBar active={isGalleryFilter(raw) ? raw : "all"} counts={counts} />;
}

/**
 * Also rendered directly as the Suspense fallback, where `active` defaults to
 * "all" — search params are not knowable during a prerender.
 *
 * `data-active-filter` is the entire filtering mechanism: the `.project-filter`
 * rules in globals.css use `:has()` to hide the cards that don't match. Doing it
 * in CSS is what lets the cards themselves stay server-rendered and sit outside
 * this Suspense boundary, so every project is still in the static HTML for
 * crawlers — which the previous server-side filtering could not manage, since it
 * emitted only the matching subset.
 */
export function GalleryFilterBar({
  active = "all",
  counts,
}: {
  active?: GalleryFilter;
  counts: FilterCounts;
}) {
  return (
    <>
      <nav aria-label="Filter projects by flooring type" data-active-filter={active}>
        <ul className="flex flex-wrap justify-center gap-3">
          {galleryFilters.map((filter) => {
            const isActive = filter.value === active;
            return (
              <li key={filter.value}>
                <Link
                  href={
                    filter.value === "all"
                      ? "/gallery"
                      : `/gallery?category=${filter.value}`
                  }
                  scroll={false}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "inline-flex h-12 items-center rounded-full px-8 text-body-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-primary hover:bg-surface-high",
                  )}
                >
                  {filter.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="mt-6 text-center text-label-md text-muted-foreground">
        Showing {counts[active]} of {counts.all} projects.
      </p>
    </>
  );
}
