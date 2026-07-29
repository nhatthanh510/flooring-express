import { Link } from "@/components/shared/link";
import { SanityFillImage } from "@/components/shared/sanity-image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SanityImage } from "@/sanity/lib/image";

type CtaLink = { href?: string | null; label?: string | null } | null;

type CtaBannerProps = {
  cta: {
    title?: string | null;
    description?: string | null;
    primary?: CtaLink;
    secondary?: CtaLink;
  } | null;
  /** Decorative background photo, rendered at low opacity behind the copy */
  pattern?: SanityImage | null;
  /** "dots" uses the radial-dot texture from the gallery mockup */
  texture?: "dots";
  align?: "center" | "split";
  /**
   * How the band is framed. The mockups genuinely differ: the gallery CTA runs
   * edge to edge, the about one is a rounded card inset in the page grid.
   */
  frame?: "card" | "bleed";
  className?: string;
};

export function CtaBanner({
  cta,
  pattern,
  texture,
  align = "center",
  frame = "card",
  className,
}: CtaBannerProps) {
  if (!cta) return null;
  const { title, description, primary, secondary } = cta;

  const bleed = frame === "bleed";

  return (
    <section
      className={cn(
        bleed ? "bg-ink-soft py-section" : "container-page py-section",
        className,
      )}
    >
      {/* `ink-soft` (#2d2926), not `primary` (#181512) — the mockups' CTA band
          is the softer charcoal, which is what separates it from the near-black
          footer directly below it. */}
      <div
        className={cn(
          "relative overflow-hidden",
          bleed
            ? "container-page"
            : "rounded-2xl bg-ink-soft p-10 md:p-12",
        )}
      >
        {pattern && (
          <SanityFillImage
            image={pattern}
            sizes="100vw"
            className="opacity-10"
          />
        )}
        {texture === "dots" && (
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-10 [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
          />
        )}

        <div
          className={cn(
            "relative flex flex-col gap-8",
            align === "center"
              ? "items-center text-center"
              : "md:flex-row md:items-center md:justify-between md:gap-12",
          )}
        >
          <div
            className={cn(
              "flex max-w-xl flex-col gap-4",
              align === "center" && "items-center",
            )}
          >
            {/* headline-lg (32px), not display-lg (48px) — the mockups keep the
                CTA heading a step below the page h1, which is also what leaves
                room for the buttons to sit alongside rather than wrap. */}
            <h2 className="text-balance text-headline-lg-mobile text-primary-foreground md:text-headline-lg">
              {title}
            </h2>
            <p className="text-pretty text-body-lg text-ink-muted">
              {description}
            </p>
          </div>

          {/* Stacked on the narrowest screens, side by side from sm, as drawn. */}
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
            {primary && (
              <Button
                asChild
                size="xl"
                variant="secondary"
                className="px-10 font-bold shadow-lg"
              >
                <Link href={primary.href ?? "#"}>{primary.label}</Link>
              </Button>
            )}
            {secondary && (
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-white/40 bg-transparent px-10 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              >
                <Link href={secondary.href ?? "#"}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
