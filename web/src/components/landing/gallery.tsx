import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { sanityFetch } from "@/sanity/lib/live";
import { FEATURED_PROJECTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

/** Sample jobs shown until the client adds real projects in the Studio. */
const sampleProjects = [
  { title: "Wide-plank oak through a Federation home", suburb: "Willoughby", category: "hardwood" },
  { title: "Wool carpet, whole upstairs", suburb: "Cronulla", category: "carpet" },
  { title: "Waterproof hybrid, open-plan living", suburb: "Parramatta", category: "hybrid" },
  { title: "Coastal vinyl plank in a beach unit", suburb: "Manly", category: "vinyl" },
  { title: "Porcelain tile, new bathroom", suburb: "Chatswood", category: "tile" },
];

// A masonry-style span pattern so the grid reads like a real gallery, not a table.
const spans = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
];

export async function Gallery() {
  const { data: projects } = await sanityFetch({
    query: FEATURED_PROJECTS_QUERY,
  });

  const hasReal = projects.length > 0;
  const items = hasReal ? projects : sampleProjects;

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <SectionHeading
        id="work-heading"
        eyebrow="Our recent work"
        title="See the floors we've laid"
        intro="Real homes, real installs across greater Sydney. Every job finished by our own team — this is the standard you can expect."
      />

      <div className="mt-12 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((item, i) => {
          const realCover =
            hasReal && "coverImage" in item && item.coverImage
              ? urlFor(item.coverImage).width(1000).height(1000).fit("crop").url()
              : null;
          const alt =
            hasReal && "coverImage" in item
              ? item.coverImage?.alt || item.title || ""
              : `${item.title}, ${item.suburb}`;

          return (
            <Reveal
              key={("_id" in item && item._id) || item.title}
              delay={i * 60}
              className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-muted ${spans[i % spans.length]}`}
            >
              {realCover ? (
                <Image
                  src={realCover}
                  alt={alt || ""}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                <div
                  aria-hidden
                  className="h-full w-full plank-band opacity-70 transition-transform duration-500 group-hover:scale-[1.04]"
                />
              )}

              {/* caption overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-4">
                {item.category ? (
                  <Badge
                    variant="secondary"
                    className="mb-1.5 capitalize backdrop-blur"
                  >
                    {item.category}
                  </Badge>
                ) : null}
                <p className="text-sm font-medium text-white text-balance">
                  {item.title}
                </p>
                {item.suburb ? (
                  <p className="font-mono text-xs text-white/80">
                    {item.suburb}
                  </p>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </div>

      {!hasReal ? (
        <Reveal className="mt-8">
          <p className="text-center text-sm text-muted-foreground">
            Sample projects shown. Add your own in the Studio under{" "}
            <span className="font-mono text-foreground">Project</span> and they
            appear here automatically.
          </p>
        </Reveal>
      ) : null}
    </section>
  );
}
