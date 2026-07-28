// Full-page screenshots of every route at desktop and mobile widths, plus a
// horizontal-overflow and console-error check. Run the dev server first:
//   pnpm dev  &&  pnpm screenshots
// Override with BASE=… ROUTES=/a,/b OUT=dir
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = process.env.OUT ?? "screenshots";

const routes = (process.env.ROUTES ??
  "/,/services,/gallery,/about,/contact,/gallery/classic-tasmanian-timber,/gallery/contemporary-hybrid-oak,/gallery/zenith-commercial-laminate"
).split(",");
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const errors = [];

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") errors.push(`[${vp.name}] ${m.type()}: ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`[${vp.name}] pageerror: ${e.message}`));
  page.on("requestfailed", (r) => errors.push(`[${vp.name}] requestfailed: ${r.url()} ${r.failure()?.errorText}`));

  for (const route of routes) {
    await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 120000 });
    await page.waitForLoadState("networkidle", { timeout: 120000 }).catch(() => {});
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(700);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/[\/?=&]/g, "-");
    await page.screenshot({ path: path.join(OUT, `${slug}.${vp.name}.png`), fullPage: true });

    // horizontal overflow check
    const overflow = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    if (overflow.scrollW > overflow.clientW + 1) {
      errors.push(`[${vp.name}] ${route} horizontal overflow: ${overflow.scrollW} > ${overflow.clientW}`);
    }
  }
  await ctx.close();
}

await browser.close();
fs.writeFileSync(path.join(OUT, "issues.txt"), errors.join("\n") || "none");
console.log(errors.length ? errors.join("\n") : "no console/network issues");
console.log("shots in", OUT);
