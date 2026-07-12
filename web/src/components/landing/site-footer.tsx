import { Mail, Phone, Clock } from "lucide-react";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div>
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold tracking-tight">{site.name}</p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Carpet, timber, hybrid, laminate, vinyl and tile — supplied and
              installed across greater {site.region}.
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              ABN {site.abn}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium">Get in touch</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Phone className="size-4" aria-hidden />
                  <span className="font-mono">{site.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="size-4" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4" aria-hidden />
                {site.hours}
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium">Service areas</p>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
              {site.serviceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-5 py-6 text-xs text-muted-foreground sm:px-8">
          © {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
