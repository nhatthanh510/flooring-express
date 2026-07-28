import { Droplets, Layers, TreePine, type LucideIcon } from "lucide-react";

export type FlooringSlug = "hybrid" | "laminate" | "timber";

export type FlooringService = {
  slug: FlooringSlug;
  name: string;
  /** Short label used by filters and toggles, e.g. "Hybrid" */
  shortName: string;
  /** Descriptor shown beside the plank chip on the comparison toggle */
  descriptor: string;
  icon: LucideIcon;
  /** Chip colour for the "plank" toggle */
  plankColor: string;
  /** Copy used on the home page service cards */
  homeBlurb: string;
  homeFeatures: readonly string[];
  /** Longer copy used on the services page */
  servicesBlurb: string;
  servicesFeatures: readonly string[];
  image: { src: string; alt: string };
  /** Technical comparison rows, keyed by the labels used in the mockup table */
  specs: {
    coreMaterial: string;
    jankaRating: string;
    thickness: string;
    installation: string;
    waterproof: string;
  };
};

export const services: readonly FlooringService[] = [
  {
    slug: "hybrid",
    name: "Hybrid Flooring",
    shortName: "Hybrid",
    descriptor: "Waterproof",
    icon: Droplets,
    plankColor: "#735a3a",
    homeBlurb:
      "Combines the durability of laminate with the waterproof properties of vinyl. Perfect for busy Hobart households and moisture-prone areas.",
    homeFeatures: ["100% Waterproof", "Scratch Resistant", "Acoustic Underlay"],
    servicesBlurb:
      "The ultimate all-rounder. 100% waterproof and incredibly durable, hybrid flooring combines the best of laminate and vinyl.",
    servicesFeatures: [
      "100% Waterproof",
      "Scratch & Stain Resistant",
      "Rigid Core Technology",
    ],
    image: {
      src: "/images/services/hybrid.webp",
      alt: "Close-up of a hybrid flooring plank showing its multi-layered rigid core and textured wood-look surface.",
    },
    specs: {
      coreMaterial: "Hybrid Core",
      jankaRating: "N/A (Rigid)",
      thickness: "6.5mm - 8mm",
      installation: "5G Click Lock",
      waterproof: "100% Guaranteed",
    },
  },
  {
    slug: "laminate",
    name: "Laminate Flooring",
    shortName: "Laminate",
    descriptor: "Durable",
    icon: Layers,
    plankColor: "#a68966",
    homeBlurb:
      "High-performance style at an affordable price point. Mimics the look of real timber with superior wear resistance and easy maintenance.",
    homeFeatures: [
      "Affordable Luxury",
      "Impact Resistant",
      "High UV Stability",
    ],
    servicesBlurb:
      "Affordable style meets everyday performance. Our laminate ranges offer authentic wood looks with superior impact resistance.",
    servicesFeatures: [
      "Budget-Friendly",
      "Realistic Timber Grain",
      "High Impact Resistance",
    ],
    image: {
      src: "/images/services/laminate.webp",
      alt: "Sun-drenched bedroom with light ash laminate flooring laid in long, even planks.",
    },
    specs: {
      coreMaterial: "HDF Laminate",
      jankaRating: "AC4 / AC5",
      thickness: "8mm - 12mm",
      installation: "Uniclic System",
      waterproof: "72-Hour Surface",
    },
  },
  {
    slug: "timber",
    name: "Timber Flooring",
    shortName: "Timber",
    descriptor: "Premium",
    icon: TreePine,
    plankColor: "#2d2926",
    homeBlurb:
      "Authentic, timeless, and natural. Our engineered timber floors bring warmth and enduring value to Hobart's most prestigious residences.",
    homeFeatures: [
      "Authentic Hardwood",
      "Structural Integrity",
      "Can be Refinished",
    ],
    servicesBlurb:
      "The gold standard. Real timber flooring provides unmatched warmth, character, and long-term value to any Hobart home.",
    servicesFeatures: [
      "Genuine Natural Hardwood",
      "Resandable & Refinishable",
      "Premium Resale Value",
    ],
    image: {
      src: "/images/services/timber.webp",
      alt: "Executive library with dark engineered timber flooring in deep, rich oak tones.",
    },
    specs: {
      coreMaterial: "Engineered Oak",
      jankaRating: "5.5kN - 7.0kN",
      thickness: "14mm - 15mm",
      installation: "Tongue & Groove",
      waterproof: "Moisture Wiping",
    },
  },
];

/** Row labels for the comparison table, in display order. */
export const comparisonRows = [
  { key: "coreMaterial", label: "Core Material" },
  { key: "jankaRating", label: "Janka Rating" },
  { key: "thickness", label: "Thickness" },
  { key: "installation", label: "Installation Type" },
  { key: "waterproof", label: "Waterproof Status" },
] as const satisfies readonly {
  key: keyof FlooringService["specs"];
  label: string;
}[];

export function getService(slug: FlooringSlug): FlooringService {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown flooring service: ${slug}`);
  return service;
}
