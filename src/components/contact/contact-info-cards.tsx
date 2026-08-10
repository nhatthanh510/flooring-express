import { Clock, Mail, Phone, type LucideIcon } from "lucide-react";
import { ServiceAreaMap } from "@/components/contact/service-area-map";
import type { SiteSettings } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Compact cards, per the mobile mockup: a small round icon, a micro uppercase
 * label, then the value. The earlier version used a 24px heading per card,
 * which made each one roughly twice as tall as it needed to be on a phone.
 */
function CardShell({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface-low p-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="font-sans text-label-sm uppercase tracking-wide text-muted-foreground">
          {label}
        </h3>
        {children}
      </div>
    </div>
  );
}

export function ContactInfoCards({ settings }: { settings: SiteSettings }) {
  const contact = settings.contact;

  return (
    <div className="flex flex-col gap-4">
      <CardShell icon={Phone} label="Call us">
        <a
          href={contact?.phoneHref ?? undefined}
          className="-my-2 inline-block py-2 text-body-lg font-semibold text-primary transition-colors hover:text-secondary"
        >
          {contact?.phone}
        </a>
        {/* From Site settings, like every other business fact here — this was
            the one hardcoded line in the card and drifted from the real hours. */}
        <p className="text-label-md text-muted-foreground">
          {settings.hoursSummary}
        </p>
      </CardShell>

      <CardShell icon={Mail} label="Email us">
        {/* break-words, not break-all — the latter split the address mid-word */}
        <a
          href={`mailto:${contact?.email ?? ""}`}
          className="-my-2 inline-block break-words py-2 text-body-lg font-semibold text-primary transition-colors hover:text-secondary"
        >
          {contact?.email}
        </a>
        <p className="text-label-md text-muted-foreground">
          24/7 digital enquiries
        </p>
      </CardShell>

      <CardShell icon={Clock} label="Showroom hours">
        <dl className="flex flex-col gap-1.5">
          {settings.hours?.map((entry) => (
            <div
              key={entry.days}
              className="flex items-baseline justify-between gap-4 text-body-md"
            >
              <dt className="text-muted-foreground">
                <span className="sm:hidden">{entry.short}</span>
                <span className="hidden sm:inline">{entry.days}</span>
              </dt>
              <dd
                className={cn(
                  "whitespace-nowrap font-semibold text-primary",
                  entry.closed && "text-destructive",
                )}
              >
                {entry.time}
              </dd>
            </div>
          ))}
        </dl>
      </CardShell>

      <ServiceAreaMap settings={settings} />
    </div>
  );
}
