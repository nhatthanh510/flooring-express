import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fullAddress, siteConfig } from "@/lib/site-config";

const query = encodeURIComponent(`${fullAddress}, Australia`);

/**
 * Google's keyless embed endpoint — no API key or billing account needed, which
 * suits a site with no backend. Swap to the Maps Embed API
 * (`/maps/embed/v1/place?key=…`) if you later want custom styling or markers.
 *
 * Note this is the one third-party resource on the site; it loads lazily and
 * only on the contact page.
 */
const embedSrc = `https://maps.google.com/maps?q=${query}&z=14&output=embed`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

export function ServiceAreaMap() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-[350px] overflow-hidden rounded-2xl border border-border">
        <iframe
          title={`Map showing ${siteConfig.legalName} at ${fullAddress}`}
          src={embedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full border-0"
        />
      </div>

      {/*
        Deliberately below the map rather than floating on it. An overlay would
        cover Google's attribution strip (against the Maps terms), collide with
        the place card Google renders top-left, and swallow map drags in that
        corner.
      */}
      <Button asChild size="xl" variant="outline" className="w-full">
        <a href={directionsHref} target="_blank" rel="noopener noreferrer">
          <MapPin aria-hidden="true" />
          Get Directions
          <span className="sr-only"> to our Hobart showroom</span>
        </a>
      </Button>
    </div>
  );
}
