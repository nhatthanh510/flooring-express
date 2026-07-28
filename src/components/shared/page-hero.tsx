import Image from "next/image";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description: string;
  eyebrow?: string;
  image: { src: string; alt: string };
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
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          scrim === "left"
            ? "bg-gradient-to-r from-black/75 via-black/45 to-black/10"
            : "bg-black/50",
        )}
      />

      <div className="container-page relative py-16 md:py-24">
        <div className="flex max-w-2xl flex-col items-start gap-6">
          {eyebrow && (
            <span className="rounded-full bg-accent px-4 py-1.5 text-label-sm uppercase text-accent-foreground">
              {eyebrow}
            </span>
          )}
          <h1 className="text-balance text-headline-lg text-white md:text-display-lg">
            {title}
          </h1>
          <p className="text-pretty text-body-lg text-white/85">{description}</p>
          {children && (
            <div className="flex flex-wrap items-center gap-4">{children}</div>
          )}
        </div>
      </div>
    </section>
  );
}
