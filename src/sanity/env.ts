/**
 * Sanity connection details, asserted once at module load.
 *
 * These are read in three different contexts — the Next server, the browser
 * bundle, and the `sanity` CLI during typegen — so they fail loudly rather than
 * letting an undefined project id surface as a confusing 404 from the API.
 */

function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

export const projectId = required(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const dataset = required(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET",
);

/**
 * Pinned, never `"v1"` or a floating date — a deployed build must keep getting
 * the API semantics it was written against.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-29";

/** Where the embedded Studio is mounted. Drives stega links and Presentation. */
export const studioUrl = "/studio";
