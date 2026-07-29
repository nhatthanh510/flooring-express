import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shown the instant a link to /contact is clicked.
 *
 * Like /gallery this route reads `searchParams` — the `?enquiry=`/`?flooring=`
 * deep links every CTA on the site uses — so it renders on demand. Without this
 * file the "Free Quote" button appears dead until the server responds.
 *
 * Column order matches the page: details first in the DOM, `lg:order-*` swaps
 * them on desktop.
 */
export default function ContactLoading() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Loading the contact page…</span>

      {/* Stands in for <PageHero>, whose height override this repeats. */}
      <section className="relative flex min-h-[260px] items-center bg-surface-high md:min-h-[409px]">
        <div className="container-page relative py-16 text-center md:py-24 md:text-left">
          <div className="flex max-w-2xl flex-col items-center gap-6 md:items-start">
            <Skeleton className="h-10 w-80 max-w-full bg-surface-dim md:h-14" />
            <Skeleton className="h-5 w-full max-w-lg bg-surface-dim" />
          </div>
        </div>
      </section>

      <section className="container-page py-12 md:py-section">
        <div className="grid items-start gap-gutter lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:order-1 lg:col-span-5">
            {[0, 1, 2].map((index) => (
              <Skeleton key={index} className="h-24 w-full rounded-2xl" />
            ))}
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>

          <div className="lg:order-2 lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
              <Skeleton className="h-9 w-2/3" />
              <Skeleton className="mt-3 h-5 w-full" />

              {/* The quote form: five fields, then the submit button. */}
              <div className="mt-8 flex flex-col gap-6">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-11 w-full" />
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-28 w-full" />
                </div>
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>

              <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <div className="flex -space-x-3">
                  {[0, 1, 2].map((index) => (
                    <Skeleton
                      key={index}
                      className="size-10 rounded-full border-2 border-card"
                    />
                  ))}
                </div>
                <Skeleton className="h-5 flex-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-soft py-section">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <Skeleton className="h-10 w-2/3 max-w-2xl bg-white/10 md:h-14" />
          <Skeleton className="h-5 w-full max-w-2xl bg-white/10" />
          <div className="flex flex-wrap justify-center gap-4">
            <Skeleton className="h-14 w-44 rounded-lg bg-white/10" />
            <Skeleton className="h-14 w-44 rounded-lg bg-white/10" />
          </div>
        </div>
      </section>
    </div>
  );
}
