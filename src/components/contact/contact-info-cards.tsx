import Image from "next/image";
import { Clock, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fullAddress, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${fullAddress}, Australia`,
)}`;

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

      <div className="relative h-[350px] overflow-hidden rounded-2xl border border-border">
        <Image
          src="/images/contact/service-area-map.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
        <div className="glass-panel absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-xl p-4">
          <div className="flex flex-col">
            <span className="text-body-md font-semibold text-primary">
              Serving All Greater Hobart
            </span>
            <span className="text-label-md text-muted-foreground">
              Residential &amp; Commercial
            </span>
          </div>
          <Button asChild size="lg" variant="default">
            <a href={directionsHref} target="_blank" rel="noopener noreferrer">
              Directions
              <span className="sr-only"> to our Hobart showroom</span>
            </a>
          </Button>
        </div>
      </div>
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
          className="break-all text-body-lg text-primary transition-colors hover:text-secondary"
        >
          {value}
        </a>
        <p className="text-label-md text-muted-foreground">{caption}</p>
      </div>
    </div>
  );
}
