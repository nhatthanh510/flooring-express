import { Mail, MapPin, Phone } from "lucide-react";

import { QuoteForm } from "@/components/forms/quote-form";
import { SanityFillImage } from "@/components/shared/sanity-image";
import { formatAddress, type SiteSettings } from "@/lib/site";
import type { HOME_PAGE_QUERY_RESULT } from "@/sanity/types";

export function HomeContact({
  section,
  settings,
}: {
  section: NonNullable<HOME_PAGE_QUERY_RESULT>["contactSection"];
  settings: SiteSettings;
}) {
  const contact = settings.contact;
  const labels = section?.channelLabels;

  const channels = [
    {
      icon: Phone,
      label: labels?.phone,
      value: contact?.phone,
      href: contact?.phoneHref ?? undefined,
    },
    {
      icon: Mail,
      label: labels?.email,
      value: contact?.email,
      href: contact?.email ? `mailto:${contact.email}` : undefined,
    },
    {
      icon: MapPin,
      label: labels?.address,
      value: formatAddress(contact),
      href: undefined,
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-surface-highest/40 py-section"
    >
      <div className="container-page grid items-start gap-16 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-ambient md:p-10">
          <h2 className="text-headline-md text-primary">
            {section?.formTitle}
          </h2>
          <p className="mt-2 text-body-md text-muted-foreground">
            {section?.formDescription}
          </p>
          {/* The home form is the shorter variant in the mockup: three flooring
              options and a "Submit Request" button. */}
          <QuoteForm
            idPrefix="home-quote"
            submitLabel="Submit Request"
            interests={["hybrid", "timber", "laminate"]}
            showAddress={false}
            className="mt-8"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-headline-md text-primary">{section?.title}</h2>
            <p className="text-body-lg text-muted-foreground">
              {section?.description}
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
                        className="inline-flex min-h-11 items-center text-body-lg font-semibold text-primary transition-colors hover:text-secondary"
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
            <SanityFillImage
              image={section?.mapImage}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
