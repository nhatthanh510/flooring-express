import Link from "next/link";
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
  className?: string;
};

export function CtaBanner({
  cta,
  pattern,
  texture,
  align = "center",
  className,
}: CtaBannerProps) {
  if (!cta) return null;
  const { title, description, primary, secondary } = cta;

  return (
    <section className={cn("container-page py-section", className)}>
      <div className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-16">
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
              : "lg:flex-row lg:items-center lg:justify-between",
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-4",
              align === "center" && "items-center",
            )}
          >
            <h2 className="max-w-2xl text-balance text-headline-lg-mobile text-primary-foreground md:text-display-lg">
              {title}
            </h2>
            <p className="max-w-xl text-pretty text-body-lg text-ink-muted">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {primary && (
              <Button asChild size="xl" variant="secondary">
                <Link href={primary.href ?? "#"}>{primary.label}</Link>
              </Button>
            )}
            {secondary && (
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
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
