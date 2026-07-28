import { Clock, Mail, Phone } from "lucide-react";
import { ServiceAreaMap } from "@/components/contact/service-area-map";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function ContactInfoCards() {
  return (
    <div className="flex flex-col gap-gutter">
      <InfoCard
        icon={Phone}
        title="Phone"
        caption="Mon–Fri, 8am–6pm"
        value={siteConfig.contact.phone}
        href={siteConfig.contact.phoneHref}
      />
      <InfoCard
        icon={Mail}
        title="Email"
        caption="24/7 digital enquiries"
        value={siteConfig.contact.email}
        href={`mailto:${siteConfig.contact.email}`}
      />

      <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface-low p-6">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Clock className="size-5" aria-hidden="true" />
        </span>
        <div className="flex w-full flex-col gap-3">
          <h3 className="text-headline-md text-primary">Business Hours</h3>
          <dl className="flex flex-col gap-2">
            {siteConfig.hours.map((entry) => (
              <div
                key={entry.days}
                className="flex items-baseline justify-between gap-4 text-body-md"
              >
                <dt className="text-muted-foreground">{entry.days}</dt>
                <dd
                  className={cn(
                    "font-medium text-primary",
                    "closed" in entry && entry.closed && "text-destructive",
                  )}
                >
                  {entry.time}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <ServiceAreaMap />
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  caption,
  value,
  href,
}: {
  icon: typeof Phone;
  title: string;
  caption: string;
  value: string;
  href: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface-low p-6">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="text-headline-md text-primary">{title}</h3>
        <a
          href={href}
          className="inline-flex min-h-11 items-center break-all text-body-lg text-primary transition-colors hover:text-secondary"
        >
          {value}
        </a>
        <p className="text-label-md text-muted-foreground">{caption}</p>
      </div>
    </div>
  );
}
