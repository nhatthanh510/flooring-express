import { fullAddress, siteConfig } from "@/lib/site-config";

const query = encodeURIComponent(`${fullAddress}, Australia`);

/**
 * Google's keyless embed endpoint — no API key or billing account needed, which
 * suits a site with no backend. Swap to the Maps Embed API
 * (`/maps/embed/v1/place?key=…`) if you later want custom styling or markers.
 *
 * Note: the embed pulls roughly 1.6 MB of third-party JavaScript, which is more
 * than the rest of the site combined. It is lazy-loaded so it only downloads
 * once the map scrolls into view. Google's own controls inside the frame cover
 * directions, so there is no separate button here.
 */
const embedSrc = `https://maps.google.com/maps?q=${query}&z=14&output=embed`;

export function ServiceAreaMap() {
  return (
    <div className="h-[350px] overflow-hidden rounded-2xl border border-border">
      <iframe
        title={`Map showing ${siteConfig.legalName} at ${fullAddress}`}
        src={embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0"
      />
    </div>
  );
}
