/**
 * The one place a pasted video URL becomes an embeddable player.
 *
 * Same shape as `src/lib/icons.ts`, and for the same reason: Sanity can store
 * the URL an editor copied out of the browser bar, but it cannot store the
 * knowledge that a `youtu.be` link needs rewriting to `/embed/` before an
 * iframe will accept it. That mapping is code.
 *
 * `parseVideoUrl` backs both ends — the Studio validates against it, so a link
 * this file cannot turn into a player is rejected while the editor is still
 * looking at the field, rather than rendering an empty box on the live site.
 */

export type VideoProvider = "youtube" | "vimeo";

export type ParsedVideo = {
  provider: VideoProvider;
  id: string;
  /** Player URL for the iframe. Only ever loaded after a real click. */
  embedUrl: string;
  /** Canonical watch page, for the VideoObject structured data. */
  watchUrl: string;
};

const providers = [
  {
    provider: "youtube" as const,
    label: "YouTube",
    // youtu.be/ID · /watch?v=ID · /embed/ID · /shorts/ID · /live/ID
    pattern:
      /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/,
    /**
     * `youtube-nocookie` and no `autoplay` until the facade swaps the iframe in
     * — nothing reaches Google, and no cookie is set, until a visitor presses
     * play. That is what keeps a case study page free of third-party tracking
     * for the vast majority of readers who never watch.
     */
    embed: (id: string) =>
      `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
    watch: (id: string) => `https://www.youtube.com/watch?v=${id}`,
  },
  {
    provider: "vimeo" as const,
    label: "Vimeo",
    pattern: /vimeo\.com\/(?:video\/)?(\d+)/,
    embed: (id: string) =>
      `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1`,
    watch: (id: string) => `https://vimeo.com/${id}`,
  },
];

/** Every provider name, for the field description in the Studio. */
export const videoProviderLabels = providers.map((p) => p.label);

/** `null` for anything unrecognised — callers treat that as "no video". */
export function parseVideoUrl(url: string | null | undefined): ParsedVideo | null {
  if (!url) return null;
  for (const provider of providers) {
    const id = provider.pattern.exec(url)?.[1];
    if (id) {
      return {
        provider: provider.provider,
        id,
        embedUrl: provider.embed(id),
        watchUrl: provider.watch(id),
      };
    }
  }
  return null;
}
