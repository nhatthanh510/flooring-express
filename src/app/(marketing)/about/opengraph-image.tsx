import { OgImage, ogSize } from "@/app/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt =
  "Crafting Hobart's Finest Foundations — Flooring Express Hobart";

export default function Image() {
  return OgImage({
    title: "Crafting Hobart's Finest Foundations",
    eyebrow: "About Us",
    description:
      "Locally owned, with over 15 years of precision craftsmanship.",
  });
}
