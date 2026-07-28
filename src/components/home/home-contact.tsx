import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { QuoteForm } from "@/components/forms/quote-form";
import { fullAddress, siteConfig } from "@/lib/site-config";

const channels = [
  {
    icon: Phone,
    label: "Call Us",
    value: siteConfig.contact.phone,
    href: siteConfig.contact.phoneHref,
  },
  {
    icon: Mail,
    label: "Email Us",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MapPin,
    label: "Service Center",
    value: fullAddress,
    href: undefined,
  },
];

export function HomeContact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-surface-highest/40 py-section"
    >
      <div className="container-page grid items-start gap-16 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-ambient md:p-10">
          <h2 className="text-headline-md text-primary">
            Request Your Free Quote
          </h2>
          <p className="mt-2 text-body-md text-muted-foreground">
            Tell us about your space and we’ll come back within 24 hours with a
            detailed estimate.
          </p>
          {/* The home form is the shorter variant in the mockup: three flooring
              options and a "Submit Request" button. */}
          <QuoteForm
            idPrefix="home-quote"
            submitLabel="Submit Request"
            interests={["hybrid", "timber", "laminate"]}
            className="mt-8"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-headline-md text-primary">
              Service Area &amp; Contact
            </h2>
            <p className="text-body-lg text-muted-foreground">
              We proudly serve Greater Hobart, from Kingston up to Glenorchy and
              across the Eastern Shore. Visit our showroom or have us bring the
              samples to you.
            </p>
          </div>

          <ul className="flex flex-col gap-5">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <li key={channel.label} className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-label-md text-muted-foreground">
                      {channel.label}
                    </span>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="text-body-lg font-semibold text-primary transition-colors hover:text-secondary"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <span className="text-body-lg font-semibold text-primary">
                        {channel.value}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="relative h-64 overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/home/service-area-map.webp"
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
