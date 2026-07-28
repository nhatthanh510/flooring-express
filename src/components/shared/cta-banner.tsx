import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaLink = { href: string; label: string };

type CtaBannerProps = {
  title: string;
  description: string;
  primary: CtaLink;
  secondary?: CtaLink;
  /** Decorative background photo, rendered at low opacity behind the copy */
  pattern?: string;
  /** "dots" uses the radial-dot texture from the gallery mockup */
  texture?: "dots";
  align?: "center" | "split";
  className?: string;
};

export function CtaBanner({
  title,
  description,
  primary,
  secondary,
  pattern,
  texture,
  align = "center",
  className,
}: CtaBannerProps) {
  return (
    <section className={cn("container-page py-section", className)}>
      <div className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-16">
        {pattern && (
          <Image
            src={pattern}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover opacity-10"
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
            <h2 className="max-w-2xl text-balance text-headline-lg text-primary-foreground md:text-display-lg">
              {title}
            </h2>
            <p className="max-w-xl text-pretty text-body-lg text-ink-muted">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="xl" variant="secondary">
              <Link href={primary.href}>{primary.label}</Link>
            </Button>
            {secondary && (
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              >
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
