import Image from "next/image";
import Link from "next/link";
import {
  galleryFilters,
  galleryProjects,
  type GalleryFilter,
} from "@/lib/content/projects";
import { cn } from "@/lib/utils";

/**
 * Server-rendered: the URL is the only source of truth for the active filter
 * and each pill is a real link. That keeps every project in the HTML for
 * crawlers, makes filtered views shareable, supports Cmd/middle-click, and
 * needs no client JavaScript at all.
 */
export function ProjectMasonry({ active }: { active: GalleryFilter }) {
  const visible =
    active === "all"
      ? galleryProjects
      : galleryProjects.filter((project) => project.category === active);

  return (
    <section className="container-page pb-section">
      <nav aria-label="Filter projects by flooring type">
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
        Showing {visible.length} of {galleryProjects.length} projects.
      </p>

      <div className="mt-12 gap-gutter [column-count:1] md:[column-count:2] lg:[column-count:3]">
        {visible.map((project) => (
          <figure
            key={project.slug}
            className="group relative mb-gutter break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card card-lift"
          >
            <div className={cn("relative w-full", project.aspect)}>
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
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

            {project.caseStudy && (
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
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
