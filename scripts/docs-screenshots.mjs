// Captures the authenticated Studio screenshots embedded in the /docs editor
// guide. Re-run whenever the Studio UI or desk structure changes. Run the dev
// server first:
//   pnpm dev  &&  pnpm docs-screenshots
// Override with BASE=…
//
// Auth: the Studio reads its session from localStorage under
// __studio_auth_token_<projectId>, so injecting the API token from .env before
// the app boots logs the headless browser in — no interactive login.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = "src/app/docs/img";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token =
  process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN;
if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or a SANITY_API_*_TOKEN — run via `pnpm docs-screenshots` so .env is loaded.",
  );
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const viewport = { width: 1440, height: 900 };

// --- 0. The sign-in screen, from a context with no token ------------------
{
  const context = await browser.newContext({ viewport, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto(`${BASE}/studio`, { waitUntil: "domcontentloaded" });
  try {
    await page
      .getByText(/sign in|google/i)
      .first()
      .waitFor({ timeout: 60000 });
    await page.waitForTimeout(2000);
    // The login screen is a small centered card in a sea of white — clip to
    // the card (plus the Sanity wordmark) so the figure isn't mostly margin.
    await page.screenshot({
      path: path.join(OUT, "studio-login.png"),
      clip: { x: 460, y: 240, width: 520, height: 420 },
    });
    console.log("captured studio-login");
  } catch {
    console.warn("login screen not captured — skipping");
  }
  await context.close();
}

// --- Authenticated context for everything else ----------------------------
const context = await browser.newContext({ viewport, deviceScaleFactor: 2 });
await context.addInitScript(
  ([key, value]) => {
    window.localStorage.setItem(key, value);
  },
  [
    `__studio_auth_token_${projectId}`,
    JSON.stringify({ token, time: new Date().toISOString() }),
  ],
);
const page = await context.newPage();

// Sanity floats upsell and announcement cards over the UI; they render into
// body-level portals, so strip exactly those before every shot.
const shot = async (name, options = {}) => {
  await page
    .getByRole("button", { name: "Got it" })
    .click({ timeout: 3000 })
    .catch(() => {});
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("body > div[data-portal]")) {
      const t = el.textContent?.toLowerCase() ?? "";
      if (t.includes("free upgrade") || t.includes("dev conference"))
        el.remove();
    }
  });
  await page.screenshot({ path: path.join(OUT, `${name}.png`), ...options });
  console.log("captured", name);
};

// --- 1. Content list (structure tool) -------------------------------------
await page.goto(`${BASE}/studio/structure`, { waitUntil: "domcontentloaded" });
try {
  await page
    .getByText("Site settings", { exact: false })
    .first()
    .waitFor({ timeout: 60000 });
} catch {
  console.error("Structure did not load — auth may have failed. Page text:");
  console.error((await page.textContent("body"))?.slice(0, 400));
  await shot("debug-structure");
  await browser.close();
  process.exit(1);
}
await page.waitForTimeout(2500);
// The structure view is mostly empty canvas until a document is opened —
// clip to the Content pane so the figure is just the folder list.
await shot("studio-content-list", {
  clip: { x: 0, y: 56, width: 446, height: 272 },
});

// --- 2. A document open, Publish button visible ----------------------------
await page.getByText("Pages", { exact: true }).first().click();
await page.waitForTimeout(1500);
await page.getByText("Home", { exact: false }).first().click();
await page.waitForTimeout(4000);
await shot("studio-editor");

// --- 3. Presentation (site + editor side by side) --------------------------
await page.goto(`${BASE}/studio/presentation`, {
  waitUntil: "domcontentloaded",
});
// The iframe boots the site in draft mode — give it time to paint.
await page.waitForTimeout(12000);
await shot("studio-presentation");

await browser.close();
console.log("done ->", OUT);
