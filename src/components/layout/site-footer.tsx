import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { socialIcons } from "@/components/layout/social-icons";
import {
  footerColumns,
  fullAddress,
  siteConfig,
  socialLinks,
} from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="bg-primary pb-10 pt-section text-primary-foreground">
      <div className="container-page grid grid-cols-1 gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.05fr_0.85fr_0.85fr_1.35fr] lg:gap-gutter">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <p className="text-headline-md text-primary-foreground">
              {siteConfig.name}
            </p>
            <p className="max-w-xs text-body-md leading-relaxed text-primary-foreground/70">
              {siteConfig.blurb}
            </p>
          </div>

          {socialLinks.length > 0 && (
            <ul className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-secondary"
                    >
                      <Icon className="size-4" />
                      <span className="sr-only">{social.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="mb-6 font-sans text-body-md font-bold text-primary-foreground">
              {column.title}
            </h2>
            <ul className="flex flex-col gap-1">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-body-md text-primary-foreground/80 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="mb-6 font-sans text-body-md font-bold text-primary-foreground">
            Contact
          </h2>
          {/* Every row is the same 44px tall with a top-aligned icon, so the
              column keeps one rhythm whether a value wraps or not. */}
          <ul className="flex flex-col text-body-md text-primary-foreground/80">
            <li className="flex min-h-11 items-start gap-3 py-2">
              <MapPin
                className="mt-1 size-4 shrink-0 text-cream-dim"
                aria-hidden="true"
              />
              <address className="not-italic">{fullAddress}</address>
            </li>
            <li className="flex min-h-11 items-start gap-3 py-2">
              <Phone
                className="mt-1 size-4 shrink-0 text-cream-dim"
                aria-hidden="true"
              />
              <a
                href={siteConfig.contact.phoneHref}
                className="transition-colors hover:text-cream"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex min-h-11 items-start gap-3 py-2">
              <Mail
                className="mt-1 size-4 shrink-0 text-cream-dim"
                aria-hidden="true"
              />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="break-all transition-colors hover:text-cream"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex min-h-11 items-start gap-3 py-2">
              <Clock
                className="mt-1 size-4 shrink-0 text-cream-dim"
                aria-hidden="true"
              />
              <span>{siteConfig.hoursSummary}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page pt-10 text-center text-body-md text-primary-foreground/50">
        © {new Date().getFullYear()} {siteConfig.legalName}. All rights
        reserved.
      </div>
    </footer>
  );
}
