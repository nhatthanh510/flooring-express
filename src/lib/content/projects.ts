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
  /** Slug of the full case study, where one exists */
  caseStudy?: string;
};

export const galleryProjects: readonly GalleryProject[] = [
  {
    slug: "sandy-bay-modern",
    caseStudy: "contemporary-hybrid-oak",
    title: "Sandy Bay Modern",
    subtitle: "Hybrid Plank Installation",
    category: "hybrid",
    sector: "Residential",
    aspect: "aspect-[3/4]",
    image: {
      src: "/images/gallery/sandy-bay-modern.webp",
      alt: "Sandy Bay living room with light oak hybrid flooring and floor-to-ceiling windows over the marina.",
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
    caseStudy: "classic-tasmanian-timber",
    title: "Mount Nelson Estate",
    subtitle: "Solid Timber Wide Plank",
    category: "timber",
    sector: "Residential",
    aspect: "aspect-[3/2]",
    image: {
      src: "/images/gallery/mount-nelson-estate.webp",
      alt: "Mount Nelson living room with wide-plank French Oak timber flooring framing a mountain view.",
    },
  },
  {
    slug: "salamanca-boutique",
    caseStudy: "zenith-commercial-laminate",
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

export function isGalleryFilter(
  value: string | undefined,
): value is GalleryFilter {
  return galleryFilters.some((f) => f.value === value);
}

/**
 * The home page bento grid. Tiles reference gallery projects by slug rather
 * than carrying their own copy and imagery — that way the thumbnail a visitor
 * clicks on the home page is the same one they land on in the gallery, and the
 * two can never drift apart.
 */
const bentoLayout = [
  { slug: "sandy-bay-modern", span: "md:col-span-2 md:row-span-2" },
  { slug: "mount-nelson-estate", span: "md:col-span-2" },
  { slug: "kingston-family-home", span: "" },
  { slug: "macquarie-st-offices", span: "" },
] as const;

export type BentoTile = {
  caption: string;
  span: string;
  href: string;
  image: { src: string; alt: string };
};

export const bentoTiles: readonly BentoTile[] = bentoLayout.map(
  ({ slug, span }) => {
    const project = galleryProjects.find((p) => p.slug === slug);
    if (!project)
      throw new Error(`Bento tile references unknown project: ${slug}`);
    return {
      caption: `${project.title} - ${project.subtitle}`,
      span,
      // Deep-link to the full case study where one exists, otherwise to the
      // gallery filtered to that flooring type.
      href: project.caseStudy
        ? `/gallery/${project.caseStudy}`
        : `/gallery?category=${project.category}`,
      image: project.image,
    };
  },
);
