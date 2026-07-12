"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { site, services } from "@/lib/site";

type Status = "idle" | "submitting" | "done";

export function QuoteCta() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("submitting");
    // TODO: wire to backend / email service (e.g. a route handler that emails
    // the sales inbox or creates a lead). For now this is a UI stub.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  }

  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="grid gap-10 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* Pitch */}
        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-3 w-10 rounded-sm plank-band" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Free measure &amp; quote
            </span>
          </div>
          <h2
            id="quote-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Tell us about your rooms
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            Send a few details and we&rsquo;ll call within one business day to
            book
            your free in-home measure. No obligation, no pressure.
          </p>

          <a
            href={site.phoneHref}
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-foreground transition-colors hover:text-primary"
          >
            <PhoneCall className="size-4 text-primary" aria-hidden />
            Prefer to talk? {site.phone}
          </a>
        </div>

        {/* Form */}
        {status === "done" ? (
          <div className="flex flex-col items-start justify-center gap-3 rounded-2xl bg-secondary/60 p-8">
            <CheckCircle2 className="size-8 text-primary" aria-hidden />
            <h3 className="text-xl font-medium">Thanks — request received</h3>
            <p className="text-muted-foreground">
              We&rsquo;ll be in touch within one business day to book your free
              measure. If it&rsquo;s urgent, call us on{" "}
              <a
                href={site.phoneHref}
                className="font-mono text-foreground underline underline-offset-4"
              >
                {site.phone}
              </a>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="q-name">Name</Label>
                <Input
                  id="q-name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Jane Citizen"
                  className="h-11"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="q-phone">Phone</Label>
                <Input
                  id="q-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="04XX XXX XXX"
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="q-suburb">Suburb &amp; postcode</Label>
                <Input
                  id="q-suburb"
                  name="suburb"
                  autoComplete="address-level2"
                  placeholder="Manly 2095"
                  className="h-11"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="q-type">Flooring type</Label>
                <select
                  id="q-type"
                  name="type"
                  defaultValue=""
                  className="h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
                >
                  <option value="" disabled>
                    Choose one…
                  </option>
                  {services.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.title}
                    </option>
                  ))}
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="q-message">Anything else? (optional)</Label>
              <Textarea
                id="q-message"
                name="message"
                rows={3}
                placeholder="Rooms, rough sizes, timeframe…"
              />
            </div>

            <Button
              type="submit"
              disabled={status === "submitting"}
              className="mt-1 h-12 px-6 text-base"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                "Request my free quote"
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              By submitting you agree we can contact you about your enquiry. We
              never share your details.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
