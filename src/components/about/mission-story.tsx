import Link from "next/link";
import { PortableText } from "next-sanity";
import { ArrowRight } from "lucide-react";

import { SanityFillImage } from "@/components/shared/sanity-image";
import { Button } from "@/components/ui/button";
import type { ABOUT_PAGE_QUERY_RESULT } from "@/sanity/types";

type AboutPage = NonNullable<ABOUT_PAGE_QUERY_RESULT>;

/**
 * The only genuinely multi-paragraph prose on the site, so the only place
 * Portable Text is used. The first paragraph is set a step larger than the
 * rest, matching the mockup's lead-in.
 */
export function MissionStory({ story }: { story: AboutPage["missionStory"] }) {
  return (
    <section className="bg-surface-lowest py-section">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          {story?.eyebrow && (
            <span className="rounded-full bg-accent px-4 py-1.5 text-label-sm uppercase text-accent-foreground">
              {story.eyebrow}
            </span>
          )}
          <h2 className="text-balance text-headline-lg-mobile text-primary md:text-display-lg">
            {story?.title}
          </h2>

          {story?.body && (
            <div className="flex flex-col gap-6">
              <PortableText
                value={story.body}
                components={{
                  block: {
                    normal: ({ children, index }) => (
                      <p
                        className={
                          index === 0
                            ? "text-pretty text-body-lg text-muted-foreground"
                            : "text-pretty text-body-md text-muted-foreground"
                        }
                      >
                        {children}
                      </p>
                    ),
                  },
                }}
              />
            </div>
          )}

          {story?.action && (
            <Button asChild size="xl">
              <Link href={story.action.href ?? "#"}>
                {story.action.label}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          )}
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-3xl bg-secondary/10"
          />
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <SanityFillImage
              image={story?.image}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
