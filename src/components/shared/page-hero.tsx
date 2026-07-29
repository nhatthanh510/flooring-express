import { SanityFillImage } from "@/components/shared/sanity-image";
import { cn } from "@/lib/utils";
import type { SanityImage } from "@/sanity/lib/image";

type PageHeroProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  image: SanityImage | null | undefined;
  /** Dark scrim over the photo. "left" fades to the right for left-aligned copy. */
  scrim?: "left" | "even";
  height?: string;
  children?: React.ReactNode;
};

export function PageHero({
  title,
  description,
  eyebrow,
  image,
  scrim = "even",
  height = "min-h-[420px] md:min-h-[520px]",
  children,
}: PageHeroProps) {
  return (
    <section className={cn("relative flex items-center", height)}>
      <SanityFillImage image={image} priority sizes="100vw" />
      {/* Even scrim on mobile (copy is centred over the whole frame); the
          directional gradient only kicks in from md, where copy is left-aligned. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-black/55",
          scrim === "left" &&
            "md:bg-gradient-to-r md:from-black/75 md:via-black/45 md:to-black/10",
        )}
      />

      {/* Centred on mobile, left-aligned from md — matches the mobile screens */}
      <div className="container-page relative py-16 text-center md:py-24 md:text-left">
        <div className="flex max-w-2xl flex-col items-center gap-6 md:items-start">
          {eyebrow && (
            <span className="rounded-full bg-secondary px-4 py-1.5 text-label-sm uppercase text-secondary-foreground">
              {eyebrow}
            </span>
          )}
          <h1 className="text-balance text-headline-lg-mobile text-white md:text-display-lg">
            {title}
          </h1>
          <p className="text-pretty text-body-lg text-white/90">
            {description}
          </p>
          {children && (
            <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
