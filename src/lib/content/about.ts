import { BadgeCheck, History, MapPin, type LucideIcon } from "lucide-react";

export type Stat = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** The middle card is inverted in the mockup */
  inverted?: boolean;
};

export const aboutStats: readonly Stat[] = [
  {
    icon: History,
    title: "15+ Years Experience",
    description: "A legacy of reliability in the Tasmanian flooring industry.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Craftsmanship",
    description:
      "Attention to detail that ensures your floor lasts a lifetime.",
    inverted: true,
  },
  {
    icon: MapPin,
    title: "Local Hobart Team",
    description: "Born and bred Hobartians who understand local conditions.",
  },
];

export type CraftCard = {
  title: string;
  description: string;
  image: { src: string; alt: string };
};

export const craftCards: readonly CraftCard[] = [
  {
    title: "Precision Cut",
    description: "Using laser-guided tools for seamless wall-to-wall finishes.",
    image: {
      src: "/images/about/precision-cut.webp",
      alt: "Installer's hands using a mallet to fit a tongue-and-groove hybrid floor plank.",
    },
  },
  {
    title: "Material Care",
    description:
      "We source only the highest grade sustainable timbers and composites.",
    image: {
      src: "/images/about/material-care.webp",
      alt: "Timber flooring samples displayed in the Hobart showroom, ranging from light ash to dark walnut.",
    },
  },
  {
    title: "Seamless Flow",
    description:
      "Creating open-plan transitions that enhance your home's space.",
    image: {
      src: "/images/about/seamless-flow.webp",
      alt: "Completed Hobart residential project with seamless light oak laminate running through open-plan rooms.",
    },
  },
  {
    title: "Expert Advice",
    description:
      "One-on-one consultations to choose the perfect style for your life.",
    image: {
      src: "/images/about/expert-advice.webp",
      alt: "Flooring expert and customer reviewing flooring options together on a tablet.",
    },
  },
];

export type SpecRow = {
  type: string;
  durability: string;
  idealFor: string;
  warranty: string;
};

export const specRows: readonly SpecRow[] = [
  {
    type: "Hybrid",
    durability: "High (Commercial Grade)",
    idealFor: "Wet areas & High traffic",
    warranty: "25 Years",
  },
  {
    type: "Timber",
    durability: "Variable (Natural Hardness)",
    idealFor: "Living rooms & Bedrooms",
    warranty: "Lifetime (Structural)",
  },
  {
    type: "Laminate",
    durability: "Medium/High (Scratch Resistant)",
    idealFor: "Rental properties & Offices",
    warranty: "15-20 Years",
  },
];
