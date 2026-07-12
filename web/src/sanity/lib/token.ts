import "server-only";

export const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  // Not fatal at import time — Draft Mode / Visual Editing simply won't work
  // until SANITY_API_READ_TOKEN is set. Regular published reads don't need it.
  console.warn(
    "Missing SANITY_API_READ_TOKEN — Draft Mode and Visual Editing are disabled.",
  );
}
