import { Link } from "@/components/shared/link";
import { ArrowRight, CircleCheck, Quote, TriangleAlert } from "lucide-react";
import { CaseStudyGalleryGrid } from "@/components/projects/case-study-gallery-grid";
import { Reveal } from "@/components/shared/reveal";
import { SanityFillImage } from "@/components/shared/sanity-image";
import { resolveIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  CASE_STUDY_QUERY_RESULT,
  NEXT_CASE_STUDY_QUERY_RESULT,
} from "@/sanity/types";

type CaseStudy = NonNullable<CASE_STUDY_QUERY_RESULT>;

export function CaseStudyHero({ study }: { study: CaseStudy }) {
  return (
    <section className="container-page pt-8">
      <div className="relative flex min-h-[420px] items-end overflow-hidden rounded-2xl md:min-h-[620px]">
        <SanityFillImage image={study.hero} priority sizes="100vw" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        />
        <div className="relative flex max-w-3xl flex-col items-start gap-4 p-6 sm:p-8 md:p-12">
          {study.eyebrow && (
            <span className="rounded-full bg-accent px-4 py-1.5 text-label-sm uppercase text-accent-foreground">
              {study.eyebrow}
            </span>
          )}
          <h1 className="text-balance text-headline-lg-mobile text-white md:text-display-lg">
            {study.title}
          </h1>
          {study.summary && (
            <p className="max-w-2xl text-pretty text-body-lg text-white/85">
              {study.summary}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function CaseStudyMeta({ items }: { items: CaseStudy["meta"] }) {
  if (!items?.length) return null;
  return (
    <section className="container-page pt-12">
      <dl className="grid gap-gutter rounded-2xl border border-border bg-card p-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <dt className="text-label-sm uppercase text-secondary">
              {item.label}
            </dt>
            <dd className="text-body-lg font-semibold text-primary">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/**
 * Challenge (and, when present, Solution) as an interlocking pair of cards and
 * photos — the 2×2 arrangement from the timber mockup. With no solution block
 * it collapses to a single text/image row.
 */
export function CaseStudyNarrative({ study }: { study: CaseStudy }) {
  const { challenge, solution } = study;
  if (!challenge) return null;
  return (
    <section className="container-page py-section">
      <div className="grid items-stretch gap-gutter lg:grid-cols-2">
        <Reveal className="h-full">
          <div className="flex h-full flex-col gap-5 rounded-2xl bg-surface-low p-8 md:p-12">
            <h2 className="flex items-center gap-3 text-headline-lg text-primary">
              <TriangleAlert
                className="size-6 shrink-0 text-secondary"
                aria-hidden="true"
              />
              {challenge.heading}
            </h2>
            <p className="text-pretty text-body-lg text-muted-foreground">
              {challenge.body}
            </p>
          </div>
        </Reveal>

        {challenge.image && (
          <Reveal className="h-full">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl">
              <SanityFillImage
                image={challenge.image}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>
        )}

        {solution?.image && (
          <Reveal className="h-full">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl">
              <SanityFillImage
                image={solution.image}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>
        )}

        {solution && (
          <Reveal className="h-full">
            <div className="flex h-full flex-col gap-5 rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
              <h2 className="flex items-center gap-3 text-headline-lg text-primary-foreground">
                <CircleCheck
                  className="size-6 shrink-0 text-cream"
                  aria-hidden="true"
                />
                {solution.heading}
              </h2>
              <p className="text-pretty text-body-lg text-ink-muted">
                {solution.body}
              </p>
              {solution.stats && (
                <dl className="mt-auto flex flex-wrap gap-4 pt-4">
                  {solution.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col gap-1 rounded-xl border border-white/15 bg-white/5 px-6 py-4"
                    >
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="text-headline-md text-cream">
                        {stat.value}
                      </dd>
                      <dd className="text-label-sm uppercase text-ink-muted">
                        {stat.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function CaseStudyFeatures({
  features,
}: {
  features: CaseStudy["features"];
}) {
  if (!features?.items?.length) return null;
  const cols =
    features.items.length >= 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-2";

  return (
    <section className="bg-surface-low py-section">
      <div className="container-page">
        {features.heading && (
          <h2 className="mb-12 text-center text-headline-lg-mobile text-primary md:text-display-lg">
            {features.heading}
          </h2>
        )}
        <ul className={`grid gap-gutter ${cols}`}>
          {features.items.map((item, index) => {
            const Icon = resolveIcon(item.icon);
            return (
              <li key={item.title} className="h-full">
                <Reveal delay={index * 80} className="h-full">
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-8 shadow-ambient">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-cream text-secondary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-headline-md text-primary">
                      {item.title}
                    </h3>
                    <p className="text-body-md text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function CaseStudySpecs({ specs }: { specs: CaseStudy["specs"] }) {
  if (!specs?.rows?.length) return null;
  return (
    <section className="bg-surface-highest/30 py-section">
      <div className="container-page">
        <div className="mb-12 flex flex-col items-center gap-2 text-center">
          <h2 className="text-headline-lg-mobile text-primary md:text-headline-lg">
            {specs.heading}
          </h2>
          {specs.description && (
            <p className="text-body-md text-muted-foreground">
              {specs.description}
            </p>
          )}
        </div>

        {/* Row borders rather than zebra striping, per the case-study mockup */}
        <div className="glass-panel mx-auto max-w-3xl overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b-0 bg-primary hover:bg-primary">
                  <TableHead className="h-auto p-6 text-label-md font-medium text-primary-foreground">
                    Attribute
                  </TableHead>
                  <TableHead className="h-auto p-6 text-label-md font-medium text-primary-foreground">
                    Value / Standard
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specs.rows.map((row) => (
                  <TableRow
                    key={row.attribute}
                    className="border-border/30 last:border-b-0 hover:bg-transparent"
                  >
                    <TableCell className="p-6 text-body-md font-bold text-muted-foreground">
                      {row.attribute}
                    </TableCell>
                    <TableCell className="p-6 text-body-md text-muted-foreground">
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CaseStudyDetails({
  details,
}: {
  details: CaseStudy["details"];
}) {
  if (!details?.rows?.length) return null;
  return (
    <section className="container-page py-section">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-ambient md:p-12">
        <h2 className="text-headline-md text-primary">{details.heading}</h2>
        <dl className="mt-6 flex flex-col">
          {details.rows.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-6 border-b border-border/60 py-4 last:border-b-0"
            >
              <dt className="text-body-md text-muted-foreground">
                {row.label}
              </dt>
              <dd className="text-body-md font-semibold text-primary">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function CaseStudyRoadmap({
  roadmap,
}: {
  roadmap: CaseStudy["roadmap"];
}) {
  if (!roadmap?.steps?.length) return null;
  return (
    <section className="bg-surface-low py-section">
      <div className="container-page">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-headline-lg-mobile text-primary md:text-display-lg">
            {roadmap.heading}
          </h2>
          <p className="max-w-2xl text-pretty text-body-lg text-muted-foreground">
            {roadmap.description}
          </p>
        </div>

        <ol className="mt-12 grid gap-gutter sm:grid-cols-2 lg:grid-cols-4">
          {roadmap.steps.map((step, index) => {
            const Icon = resolveIcon(step.icon);
            return (
              <li key={step.title} className="h-full">
                <Reveal delay={index * 80} className="h-full">
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-8">
                    <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-headline-md text-primary">
                      {step.title}
                    </h3>
                    <p className="text-body-md text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function CaseStudyGallery({
  gallery,
}: {
  gallery: CaseStudy["gallery"];
}) {
  if (!gallery?.images?.length) return null;
  return (
    <section className="container-page py-section">
      {gallery.heading && (
        <h2 className="mb-12 text-center text-headline-lg-mobile text-primary md:text-display-lg">
          {gallery.heading}
        </h2>
      )}
      <CaseStudyGalleryGrid images={gallery.images} />
    </section>
  );
}

export function CaseStudyTestimonial({
  testimonial,
}: {
  testimonial: CaseStudy["testimonial"];
}) {
  if (!testimonial) return null;
  return (
    <section className="container-page py-section">
      <figure className="grid items-center gap-12 rounded-2xl bg-primary p-8 text-primary-foreground md:p-16 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Quote className="size-10 text-cream" aria-hidden="true" />
          <blockquote className="text-pretty text-headline-md font-normal text-primary-foreground">
            {testimonial.quote}
          </blockquote>
          <figcaption className="flex flex-col gap-1">
            <span className="text-body-lg font-semibold text-cream">
              {testimonial.name}
            </span>
            <span className="text-body-md text-ink-muted">
              {testimonial.role}
            </span>
          </figcaption>
        </div>
        {testimonial.image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <SanityFillImage
              image={testimonial.image}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        )}
      </figure>
    </section>
  );
}

export function CaseStudyNext({
  next,
}: {
  next: NEXT_CASE_STUDY_QUERY_RESULT;
}) {
  if (!next?.slug) return null;
  return (
    <section className="container-page border-t border-border py-section">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-label-sm uppercase text-muted-foreground">
          View Next Project
        </p>
        <Link
          href={`/gallery/${next.slug}`}
          className="group inline-flex items-center gap-4 text-headline-lg-mobile text-primary transition-colors hover:text-secondary md:text-display-lg"
        >
          {next.shortTitle}
          <ArrowRight
            className="size-8 text-secondary transition-transform group-hover:translate-x-2"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}

export function CaseStudyCta({ cta }: { cta: CaseStudy["cta"] }) {
  if (!cta) return null;
  return (
    <section className="container-page pb-section">
      <div className="flex flex-col items-center gap-6 rounded-3xl bg-ink-soft p-10 text-center md:p-16">
        <h2 className="max-w-2xl text-balance text-headline-lg-mobile text-primary-foreground md:text-display-lg">
          {cta.heading}
        </h2>
        <p className="max-w-2xl text-pretty text-body-lg text-ink-muted">
          {cta.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="xl" variant="secondary">
            <Link href={cta.primary?.href ?? "#"}>{cta.primary?.label}</Link>
          </Button>
          {cta.secondary && (
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            >
              <Link href={cta.secondary?.href ?? "#"}>{cta.secondary?.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
