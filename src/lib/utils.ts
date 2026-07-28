import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The Timber & Slate type scale (see DESIGN.md) adds custom `text-*` sizes.
 * tailwind-merge can't tell `text-body-md` (a size) from `text-secondary`
 * (a colour), so without this it treats them as the same group and silently
 * drops whichever comes first — which quietly strips text colours from any
 * element that also sets a size. Registering the scale keeps the two apart.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-lg",
            "headline-lg",
            "headline-lg-mobile",
            "headline-md",
            "body-lg",
            "body-md",
            "label-md",
            "label-sm",
          ],
        },
      ],
      "font-family": [{ font: ["display", "sans", "heading", "mono"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
