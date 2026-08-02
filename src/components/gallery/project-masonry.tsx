import { Suspense } from "react";
import { Link } from "@/components/shared/link";
import { SanityFillImage } from "@/components/shared/sanity-image";
import { ProjectVideo } from "@/components/gallery/project-video";
import {
  ProjectVideoLightboxProvider,
  ProjectVideoTrigger,
  type ProjectVideoItem,
} from "@/components/gallery/project-video-lightbox";
import {
  GalleryFilterBar,
  GalleryFilterBarLive,
  type FilterCounts,
} from "@/components/gallery/gallery-filter-bar";
import { galleryFilters } from "@/lib/flooring";
import { cn } from "@/lib/utils";
import type { GALLERY_PROJECTS_QUERY_RESULT } from "@/sanity/types";

/**
 * Every project is rendered, always. Which ones are *visible* is decided by CSS
 * from the `data-active-filter` the filter bar sets — see the `.project-filter`
 * rules in globals.css.
 *
 * This preserves what the previous server-filtered version was built for — each
 * pill is still a real link, so filtered views stay shareable and Cmd/middle-
 * click still works — and improves on it for crawlers, which now see all of the
 * projects rather than whichever subset matched the requested filter. The cost
 * is the small client component that reads the query string; in exchange the
 * route prerenders, so reaching the gallery no longer waits on the server, and
 * changing filter no longer round-trips at all.
 */
export function ProjectMasonry({
  projects,
}: {
  projects: GALLERY_PROJECTS_QUERY_RESULT;
}) {
  const counts = galleryFilters.reduce<FilterCounts>(
    (acc, filter) => ({
      ...acc,
      [filter.value]:
        filter.value === "all"
          ? projects.length
          : projects.filter((project) => project.category === filter.value)
              .length,
    }),
    {} as FilterCounts,
  );

  // Built here rather than in the client component so the viewer receives only
  // the projects that actually have a clip, not all twenty.
  const videos = projects.flatMap<ProjectVideoItem>((project) =>
    project.video?.asset?.url
      ? [
          {
            slug: project.slug ?? "",
            title: project.title ?? "Project",
            subtitle: project.subtitle,
            src: project.video.asset.url,
            type: project.video.asset.mimeType ?? null,
            caseStudy: project.caseStudy ?? null,
          },
        ]
      : [],
  );

  return (
    <section className="project-filter container-page pb-section">
      {/* The bar suspends on a prerender because it reads search params; the
          fallback is the same bar defaulted to "all". The grid below sits
          outside the boundary, so it is in the static HTML either way. */}
      <Suspense fallback={<GalleryFilterBar counts={counts} />}>
        <GalleryFilterBarLive counts={counts} />
      </Suspense>

      <ProjectVideoLightboxProvider videos={videos}>
        <div className="mt-12 gap-gutter [column-count:1] md:[column-count:2] lg:[column-count:3]">
          {projects.map((project, index) => (
            <figure
              key={project.slug}
              data-category={project.category}
              className="group relative mb-gutter break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card card-lift"
            >
              <div className={cn("relative w-full", project.aspect)}>
                <SanityFillImage
                  image={project.image}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  priority={index === 0}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                {/* Layered over the photo rather than replacing it: the image
                    stays in the HTML for crawlers and covers the gap while the
                    clip loads, fails, or is suppressed by reduced-motion. */}
                {project.video?.asset?.url && (
                  <ProjectVideo
                    src={project.video.asset.url}
                    type={project.video.asset.mimeType ?? undefined}
                    poster={project.image?.asset?.url ?? undefined}
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 hidden bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
                />
                <figcaption className="absolute inset-x-0 bottom-0 hidden flex-col gap-1 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
                  <span className="text-label-sm uppercase text-cream">
                    {project.sector}
                  </span>
                  <span className="text-headline-md text-white">
                    {project.title}
                  </span>
                  <span className="text-body-md text-white/80">
                    {project.subtitle}
                  </span>
                </figcaption>
              </div>

              {/* Below the image on small screens, where there is no hover state */}
              <div className="flex flex-col gap-1 p-6 md:hidden">
                <span className="text-label-sm uppercase text-secondary">
                  {project.sector}
                </span>
                <span className="text-headline-md text-primary">
                  {project.title}
                </span>
                <span className="text-body-md text-muted-foreground">
                  {project.subtitle}
                </span>
              </div>

              {/* A video tile plays in place; everything else navigates.
                  Never both — two stretched hit targets over one card means the
                  visitor cannot predict which they will get. The case study for a
                  video tile is reachable from inside the viewer instead. */}
              {project.video?.asset?.url ? (
                <ProjectVideoTrigger
                  slug={project.slug ?? ""}
                  title={project.title ?? "project"}
                />
              ) : (
                project.caseStudy && (
                  /* Stretched link: the whole card is the hit target, so no
                     separate "view" button is needed. The accessible name still
                     lives on a single real anchor. */
                  <Link
                    href={`/gallery/${project.caseStudy}`}
                    className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <span className="sr-only">
                      View the {project.title} case study
                    </span>
                  </Link>
                )
              )}
            </figure>
          ))}
        </div>
      </ProjectVideoLightboxProvider>
    </section>
  );
}
