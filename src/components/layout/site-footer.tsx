import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { NewsletterInput } from "@/components/forms/newsletter-input";
import {
  footerColumns,
  fullAddress,
  siteConfig,
} from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-page py-section">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-gutter">
          <div className="flex flex-col gap-4">
            <p className="font-display text-headline-md font-bold">
              {siteConfig.name}
            </p>
            <p className="max-w-xs text-body-md text-ink-muted">
              {siteConfig.blurb}
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-5 text-label-sm uppercase text-cream-dim">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-md text-ink-muted transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col gap-5">
            <h2 className="text-label-sm uppercase text-cream-dim">Connect</h2>
            <ul className="flex flex-col gap-3 text-body-md text-ink-muted">
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-1 size-4 shrink-0 text-secondary-foreground/70"
                  aria-hidden="true"
                />
                <span>{fullAddress}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-1 size-4 shrink-0 text-secondary-foreground/70"
                  aria-hidden="true"
                />
                <a
                  href={siteConfig.contact.phoneHref}
                  className="transition-colors hover:text-primary-foreground"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-1 size-4 shrink-0 text-secondary-foreground/70"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="break-all transition-colors hover:text-primary-foreground"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock
                  className="mt-1 size-4 shrink-0 text-secondary-foreground/70"
                  aria-hidden="true"
                />
                <span>{siteConfig.hours[0].days}: {siteConfig.hours[0].time}</span>
              </li>
            </ul>

            <div className="flex flex-col gap-2">
              <p className="text-body-md text-ink-muted">
                Subscribe for flooring tips and local Hobart offers.
              </p>
              <NewsletterInput />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-label-md text-ink-muted">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <p className="text-label-sm uppercase text-ink-muted">
            Tasmanian owned &amp; operated
          </p>
        </div>
      </div>
    </footer>
  );
}
