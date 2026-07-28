import type { FlooringSlug } from "./services";

export type GalleryProject = {
  slug: string;
  title: string;
  subtitle: string;
  category: FlooringSlug;
  /** "Residential" or "Commercial" — shown as the overlay eyebrow */
  sector: string;
  /** Tailwind aspect-ratio class driving the masonry rhythm */
  aspect: string;
  image: { src: string; alt: string };
};

export const galleryProjects: readonly GalleryProject[] = [
  {
    slug: "sandy-bay-modern",
    title: "Sandy Bay Modern",
    subtitle: "Hybrid Plank Installation",
    category: "hybrid",
    sector: "Residential",
    aspect: "aspect-[3/4]",
    image: {
      src: "/images/gallery/sandy-bay-modern.webp",
      alt: "Modern Hobart living room with premium light oak hybrid flooring and floor-to-ceiling windows.",
    },
  },
  {
    slug: "macquarie-st-offices",
    title: "Macquarie St Offices",
    subtitle: "Engineered Timber",
    category: "timber",
    sector: "Commercial",
    aspect: "aspect-[4/3]",
    image: {
      src: "/images/gallery/macquarie-st-offices.webp",
      alt: "Luxury commercial office in Hobart CBD with deep walnut polished timber flooring.",
    },
  },
  {
    slug: "kingston-family-home",
    title: "Kingston Family Home",
    subtitle: "Laminate Flooring",
    category: "laminate",
    sector: "Residential",
    aspect: "aspect-square",
    image: {
      src: "/images/gallery/kingston-family-home.webp",
      alt: "Suburban Hobart kitchen finished in high-durability weathered grey oak laminate.",
    },
  },
  {
    slug: "bellerive-coastal-villa",
    title: "Bellerive Coastal Villa",
    subtitle: "Hybrid Waterproof Solutions",
    category: "hybrid",
    sector: "Residential",
    aspect: "aspect-[4/5]",
    image: {
      src: "/images/gallery/bellerive-coastal-villa.webp",
      alt: "Waterproof hybrid flooring running through a sleek modern bathroom corridor.",
    },
  },
  {
    slug: "mount-nelson-estate",
    title: "Mount Nelson Estate",
    subtitle: "Solid Timber Wide Plank",
    category: "timber",
    sector: "Residential",
    aspect: "aspect-[3/2]",
    image: {
      src: "/images/gallery/mount-nelson-estate.webp",
      alt: "Open-plan living area in a luxury Hobart residence with wide-plank French Oak timber flooring.",
    },
  },
  {
    slug: "salamanca-boutique",
    title: "Salamanca Boutique",
    subtitle: "Premium Commercial Laminate",
    category: "laminate",
    sector: "Commercial",
    aspect: "aspect-[4/3]",
    image: {
      src: "/images/gallery/salamanca-boutique.webp",
      alt: "Retail boutique interior in Hobart with high-traffic laminate flooring in a dark ash finish.",
    },
  },
];

export const galleryFilters = [
  { value: "all", label: "All Projects" },
  { value: "hybrid", label: "Hybrid" },
  { value: "timber", label: "Timber" },
  { value: "laminate", label: "Laminate" },
] as const;

export type GalleryFilter = (typeof galleryFilters)[number]["value"];

export function isGalleryFilter(value: string | undefined): value is GalleryFilter {
  return galleryFilters.some((f) => f.value === value);
}

/** The four bento tiles on the home page. `span` drives the grid placement. */
export type BentoTile = {
  caption: string;
  span: string;
  image: { src: string; alt: string };
};

export const bentoTiles: readonly BentoTile[] = [
  {
    caption: "Modern Kitchen - Hybrid Ash",
    span: "md:col-span-2 md:row-span-2",
    image: {
      src: "/images/home/bento-kitchen-hybrid-ash.webp",
      alt: "Open-plan Hobart kitchen with seamless hybrid flooring in a light ash grey tone.",
    },
  },
  {
    caption: "Classic Sunroom - Walnut Timber",
    span: "md:col-span-2",
    image: {
      src: "/images/home/bento-sunroom-walnut.webp",
      alt: "Sun-drenched cottage sunroom with rich warm walnut timber flooring.",
    },
  },
  {
    caption: "Home Office - Oak Laminate",
    span: "",
    image: {
      src: "/images/home/bento-office-oak-laminate.webp",
      alt: "Perfectly aligned oak laminate boards in a sleek home office.",
    },
  },
  {
    caption: "Master Suite - Smoked Oak",
    span: "",
    image: {
      src: "/images/home/bento-master-suite-smoked-oak.webp",
      alt: "Master bedroom with dark smoked oak timber floors and a luxury hotel feel.",
    },
  },
];
