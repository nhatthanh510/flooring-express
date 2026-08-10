/**
 * Image-quality guardrails for the Studio.
 *
 * The generated launch content is uniformly sharp; the risk is what comes
 * after — a phone screenshot dropped into a hero slot, or a 20 MB PNG scan.
 * These checks run as Sanity validation on `imageWithAlt`, so every image
 * field in the app gets them for free.
 *
 * Dimensions and format come from the asset `_ref` itself, which Sanity mints
 * as `image-<hash>-<width>x<height>-<format>` — no API round-trip needed. Only
 * the file-size check has to fetch the asset document.
 *
 * Thresholds:
 *  - ERROR  (blocks publish) below 600×400 — nothing in the layout renders
 *    that small except avatars at 40px, and an editor can still see the photo
 *    is unusably soft everywhere else.
 *  - WARNING under 1400px wide — full-width sections serve ~1400–1920px
 *    candidates, so anything under this renders soft on a large screen. It
 *    stays a warning because some slots (avatars, small tiles) genuinely never
 *    render large; the message says when it can be ignored.
 *  - WARNING for PNG — right for graphics, 5–10× the bytes for photos.
 *  - WARNING above 5 MB — the optimizer re-encodes what browsers receive, but
 *    originals this size make the Studio and builds sluggish for no gain.
 */

export const MIN_WIDTH = 600;
export const MIN_HEIGHT = 400;
export const SOFT_MIN_WIDTH = 1400;
export const SOFT_MAX_BYTES = 5 * 1024 * 1024;

export type ImageRefInfo = { width: number; height: number; format: string };

export function parseImageRef(
  ref: string | null | undefined,
): ImageRefInfo | null {
  const match = /^image-[0-9a-f]+-(\d+)x(\d+)-(\w+)$/.exec(ref ?? "");
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]), format: match[3] };
}

/** Hard failure — small enough that no placement in the layout survives it. */
export function imageQualityError(info: ImageRefInfo): string | null {
  if (info.width < MIN_WIDTH || info.height < MIN_HEIGHT) {
    return (
      `This image is ${info.width}×${info.height}px, which is too small to display sharply. ` +
      `Please upload the original photo at ${MIN_WIDTH}×${MIN_HEIGHT}px or larger ` +
      `(not a thumbnail or a screenshot of it).`
    );
  }
  return null;
}

/** Advisory — legitimate for small placements, wrong for full-width ones. */
export function imageQualityWarning(info: ImageRefInfo): string | null {
  if (info.width < SOFT_MIN_WIDTH) {
    return (
      `${info.width}px wide may look soft in full-width sections; aim for ` +
      `${SOFT_MIN_WIDTH}px+ from the original photo. Fine to ignore if this ` +
      `image only ever appears small (an avatar, a little tile).`
    );
  }
  if (info.format === "png") {
    return (
      "PNG is meant for graphics and makes photo files 5 to 10 times larger than " +
      "needed. For photos, upload the JPG (or WebP/HEIC) straight from the " +
      "camera instead."
    );
  }
  return null;
}

export function fileSizeWarning(bytes: number | null | undefined): string | null {
  if (typeof bytes === "number" && bytes > SOFT_MAX_BYTES) {
    return (
      `This file is ${(bytes / (1024 * 1024)).toFixed(1)} MB. Visitors get an ` +
      "optimized copy either way, but originals this large slow the Studio " +
      "down; export at high JPG quality instead of maximum."
    );
  }
  return null;
}
