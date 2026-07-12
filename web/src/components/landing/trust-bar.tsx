import { MapPin, ShieldCheck, BadgeCheck, Ruler } from "lucide-react";
import { trustPoints } from "@/lib/site";

const icons = [MapPin, ShieldCheck, BadgeCheck, Ruler];

export function TrustBar() {
  return (
    <section aria-label="Why choose us" className="border-y border-border bg-secondary/50">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-6 px-5 py-8 sm:px-8 lg:grid-cols-4">
        {trustPoints.map((point, i) => {
          const Icon = icons[i];
          return (
            <div key={point.title} className="flex items-start gap-3">
              <Icon
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden
              />
              <div>
                <p className="text-sm font-medium leading-tight">
                  {point.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {point.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
