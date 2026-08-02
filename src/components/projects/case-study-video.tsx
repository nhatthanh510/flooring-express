"use client";

import { Play } from "lucide-react";
import { useState } from "react";

import { SanityFillImage } from "@/components/shared/sanity-image";
import { parseVideoUrl } from "@/lib/video";
import type { CASE_STUDY_QUERY_RESULT } from "@/sanity/types";

type CaseStudy = NonNullable<CASE_STUDY_QUERY_RESULT>;

/**
 * A click-to-play video, rendered as a facade.
 *
 * Nothing from YouTube or Vimeo is requested until the button is pressed —
 * until then this is a poster image and an overlay, and the page carries no
 * third-party JavaScript or cookies at all. An eagerly embedded player is
 * roughly a megabyte, paid by every reader whether or not they watch, which on
 * a case study page is most of them.
 *
 * The uploaded-file branch does the same thing for the same reason, minus the
 * privacy argument: `preload` never runs, because the `<video>` element does
 * not exist until it is wanted.
 *
 * Client-side only for the one piece of state that has to be: whether the
 * visitor has pressed play. Everything above that is static.
 */
export function CaseStudyVideo({
  video,
  fallbackPoster,
}: {
  video: CaseStudy["video"];
  /** The project hero, used when an editor leaves the cover image empty. */
  fallbackPoster: CaseStudy["hero"];
}) {
  const [playing, setPlaying] = useState(false);

  const embed = parseVideoUrl(video?.url);
  const fileUrl = video?.file?.asset?.url;
  // An unparseable link is treated as no video rather than as an error: the
  // Studio already rejects those, so reaching here means the content changed
  // under a deployed build, and a collapsed section beats a broken frame.
  if (!video || (!embed && !fileUrl)) return null;

  const poster = video.poster ?? fallbackPoster;
  const label = video.heading
    ? `Play the video: ${video.heading}`
    : "Play the project video";

  return (
    <section className="container-page py-section">
      {(video.heading || video.description) && (
        <div className="mx-auto mb-12 max-w-2xl text-center">
          {video.heading && (
            <h2 className="text-headline-lg-mobile text-primary md:text-display-lg">
              {video.heading}
            </h2>
          )}
          {video.description && (
            <p className="mt-6 text-pretty text-body-lg text-muted-foreground">
              {video.description}
            </p>
          )}
        </div>
      )}

      <div className="relative aspect-video overflow-hidden rounded-2xl bg-primary">
        {!playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={label}
            className="group absolute inset-0 size-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <SanityFillImage
              image={poster}
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-primary shadow-ambient transition-transform duration-300 group-hover:scale-110"
            >
              <Play className="ml-1 size-8 fill-current" />
            </span>
          </button>
        ) : embed ? (
          <iframe
            src={embed.embedUrl}
            title={video.heading ?? "Project video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : fileUrl ? (
          <video
            src={fileUrl}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 size-full bg-black object-contain"
          />
        ) : null}
      </div>
    </section>
  );
}
