"use client"; // Error boundaries must be Client Components

/**
 * Last-resort boundary: catches failures in the root layout itself, and
 * replaces it when active.
 *
 * Two constraints from the framework shape everything below:
 *
 * 1. It must render its own `<html>` and `<body>` — the root layout is gone.
 * 2. Global styles do not reach it, so Tailwind classes and the `--font-*`
 *    variables are unavailable. Every rule here is inlined, and the token
 *    values are hard-copied from globals.css rather than referenced.
 * 3. Being a Client Component, `metadata` exports are unsupported; React's
 *    `<title>` is the documented substitute.
 *
 * If you restyle the brand, these literals will not follow. That is the
 * accepted trade for a page that must render when everything else has failed.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en-AU">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          padding: "2rem 1rem",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          color: "#1a1c1c",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <title>Something went wrong | Flooring Express</title>

        <h1
          style={{
            margin: 0,
            fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#181512",
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: "34rem",
            fontSize: "1.05rem",
            lineHeight: 1.6,
            color: "#4d4540",
          }}
        >
          The site failed to load. Please try again. If it keeps happening,
          call us and we&rsquo;ll help you directly.
        </p>

        <button
          type="button"
          onClick={() => unstable_retry()}
          style={{
            appearance: "none",
            border: "none",
            cursor: "pointer",
            borderRadius: "0.5rem",
            padding: "0.875rem 2rem",
            fontSize: "1rem",
            fontWeight: 600,
            backgroundColor: "#181512",
            color: "#ffffff",
          }}
        >
          Try again
        </button>

        {error.digest && (
          <p style={{ margin: 0, fontSize: "0.8125rem", color: "#4d4540" }}>
            Reference code:{" "}
            <code style={{ fontFamily: "ui-monospace, monospace" }}>
              {error.digest}
            </code>
          </p>
        )}
      </body>
    </html>
  );
}
