import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/env";

/**
 * The shape every image projection in queries.ts returns.
 *
 * Deliberately mirrors what `sanity typegen` emits for `IMAGE_PROJECTION`,
 * nullability included — GROQ can't promise any of these fields exist, so the
 * helpers below have to cope with every one of them being null.
 */
export type SanityImage = {
  alt: string | null;
  decorative: boolean | null;
  hotspot: { x: number | null; y: number | null } | null;
  crop: {
    top: number | null;
    bottom: number | null;
    left: number | null;
    right: number | null;
  } | null;
  asset: {
    _id: string;
    url: string | null;
    metadata: {
      lqip: string | null;
      dimensions: { width: number | null; height: number | null } | null;
    } | null;
  } | null;
};

/** The GROQ projection that produces a `SanityImage`. Keep the two in step. */
export const IMAGE_PROJECTION = /* groq */ `{
  alt,
  decorative,
  hotspot { x, y },
  crop { top, bottom, left, right },
  asset->{
    _id,
    url,
    metadata { lqip, dimensions { width, height } }
  }
}`;

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * A hotspot- and crop-aware URL builder, for the places `next/image` can't
 * reach — chiefly the `ImageResponse` OG cards, which need a plain sized URL.
 * Everything rendered in the page itself should go through `imageProps` and let
 * the Next optimizer do the work.
 */
export function urlFor(image: SanityImage) {
  if (!image.asset?._id) return null;
  return builder.image({
    _type: "image",
    asset: { _type: "reference", _ref: image.asset._id },
    ...(image.hotspot
      ? { hotspot: { _type: "sanity.imageHotspot" as const, ...image.hotspot } }
      : {}),
    ...(image.crop
      ? { crop: { _type: "sanity.imageCrop" as const, ...image.crop } }
      : {}),
  });
}

/**
 * `object-position` derived from the asset's hotspot.
 *
 * Every image in this design is laid out with `fill` + `object-cover`, where
 * the browser — not Sanity — does the cropping. Feeding the hotspot through as
 * `object-position` is what makes an editor dragging the crop handle in the
 * Studio actually move the visible framing on the site.
 */
export function hotspotPosition(image: SanityImage | null | undefined): string {
  const x = image?.hotspot?.x;
  const y = image?.hotspot?.y;
  if (typeof x !== "number" || typeof y !== "number") return "50% 50%";
  return `${(x * 100).toFixed(2)}% ${(y * 100).toFixed(2)}%`;
}

/**
 * Props to spread onto `next/image`. Returns `null` when the asset is missing so
 * callers can skip rendering rather than emit a broken `<img>` — an unpublished
 * or deleted asset is a normal state in draft mode.
 */
export function imageProps(image: SanityImage | null | undefined) {
  const url = image?.asset?.url;
  if (!url) return null;

  const { width, height } = image.asset?.metadata?.dimensions ?? {};
  const lqip = image.asset?.metadata?.lqip;

  return {
    src: url,
    alt: image.alt ?? "",
    ...(typeof width === "number" && typeof height === "number"
      ? { width, height }
      : {}),
    ...(lqip ? { placeholder: "blur" as const, blurDataURL: lqip } : {}),
  };
}
