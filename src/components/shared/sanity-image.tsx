import Image from "next/image";

import { cn } from "@/lib/utils";
import { hotspotPosition, imageProps, type SanityImage } from "@/sanity/lib/image";

type SanityFillImageProps = {
  image: SanityImage | null | undefined;
  /** Required — an un-sized `fill` image downloads the largest candidate. */
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * The `fill` + `object-cover` pattern every image in this design uses, wired to
 * a Sanity asset.
 *
 * Renders nothing when the asset is missing, which is a normal state while an
 * editor is midway through creating a document in draft mode — better an empty
 * frame than a broken image icon.
 *
 * `objectPosition` carries the hotspot through, so dragging the crop handle in
 * the Studio actually moves the framing here even though the browser, not
 * Sanity, is doing the cropping.
 */
export function SanityFillImage({
  image,
  sizes,
  className,
  priority,
}: SanityFillImageProps) {
  const props = imageProps(image);
  if (!props) return null;

  // `fill` is mutually exclusive with intrinsic width/height.
  const { width, height, ...rest } = props;
  void width;
  void height;
  const decorative = image?.decorative === true || rest.alt === "";

  return (
    <Image
      {...rest}
      alt={decorative ? "" : rest.alt}
      aria-hidden={decorative || undefined}
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectPosition: hotspotPosition(image) }}
      className={cn("object-cover", className)}
    />
  );
}
