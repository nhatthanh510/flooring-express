import { Star, ShieldCheck, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8">
        {/* Copy */}
        <div className="animate-rise">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="h-3.5 w-14 rounded-sm plank-band"
            />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Supplied &amp; installed · {site.region}
            </span>
          </div>

          <h1
            id="hero-heading"
            className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Beautiful floors,
            <br />
            fitted by people who care.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Carpet, timber, hybrid, laminate and vinyl — supplied and
            professionally installed across greater {site.region}. Free in-home
            measure, fixed quotes, and a {site.warrantyYears}-year workmanship
            guarantee.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 px-6 text-base">
              <a href="#quote">Get a free quote</a>
            </Button>
            <Button asChild variant="outline" className="h-12 px-6 text-base">
              <a href="#ranges">Browse ranges</a>
            </Button>
          </div>

          <dl className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2">
              <Star
                className="size-4 fill-primary text-primary"
                aria-hidden
              />
              <dt className="sr-only">Customer rating</dt>
              <dd className="text-sm text-muted-foreground">
                <span className="font-mono font-medium text-foreground">
                  {site.rating}
                </span>{" "}
                from {site.reviewCount} reviews
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" aria-hidden />
              <dt className="sr-only">Insurance</dt>
              <dd className="text-sm text-muted-foreground">Fully insured</dd>
            </div>
            <div className="flex items-center gap-2">
              <Ruler className="size-4 text-primary" aria-hidden />
              <dt className="sr-only">Measure</dt>
              <dd className="text-sm text-muted-foreground">Free measure</dd>
            </div>
          </dl>
        </div>

        {/* Signature composition: gradient panel + floating quote card */}
        <div className="animate-rise [animation-delay:120ms]">
          <div className="relative">
            <div
              aria-hidden
              className="aspect-4/5 w-full overflow-hidden rounded-3xl border border-border/60 bg-linear-to-br from-primary/90 via-primary to-[color-mix(in_oklch,var(--primary),black_18%)] shadow-xl sm:aspect-square"
            >
              {/* subtle plank texture over the gradient */}
              <div className="h-full w-full opacity-[0.14] plank-band mix-blend-overlay" />
            </div>

            <div className="absolute -bottom-5 -left-4 w-[min(20rem,80%)] rounded-2xl border border-border bg-card p-5 shadow-lg sm:-left-8">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Your fixed quote
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">
                No surprises, ever.
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                The price we measure is the price you pay. We&rsquo;ll call
                within one business day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
