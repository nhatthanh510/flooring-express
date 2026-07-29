import { VisualEditing } from "next-sanity/visual-editing";

/**
 * Shown only while draft mode is on. Mounts the visual-editing overlays that
 * turn stega-tagged strings into click-to-edit targets in the Presentation
 * tool, and offers a way out.
 *
 * Exiting is a POST from a real <form> rather than a link: Next prefetches
 * links, and a prefetch of a GET route would clear the cookie for an editor who
 * only hovered the button.
 */
export function DraftModeBanner() {
  return (
    <>
      <aside
        role="status"
        className="fixed bottom-4 left-1/2 z-100 flex -translate-x-1/2 items-center gap-3 rounded-full bg-primary px-5 py-2.5 text-body-md text-primary-foreground shadow-ambient-lifted"
      >
        Viewing drafts
        <form method="POST" action="/api/draft-mode/disable">
          <button
            type="submit"
            className="min-h-11 font-semibold text-cream underline underline-offset-4 transition-colors hover:text-white"
          >
            Exit preview
          </button>
        </form>
      </aside>
      <VisualEditing />
    </>
  );
}
