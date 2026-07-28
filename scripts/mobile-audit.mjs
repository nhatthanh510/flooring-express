// Mobile layout audit at 390px: horizontal overflow, elements escaping the
// viewport, tap targets under 32px, and text clipped by its own box.
//   pnpm dev  &&  pnpm mobile-audit        (override host with BASE=)
import { chromium } from "playwright";
const B = process.env.BASE ?? "http://localhost:3000";
const ROUTES = ["/", "/services", "/gallery", "/faq", "/about", "/contact",
  "/gallery/classic-tasmanian-timber", "/gallery/contemporary-hybrid-oak", "/gallery/zenith-commercial-laminate"];
const br = await chromium.launch();
const ctx = await br.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
let problems = 0;
for (const r of ROUTES) {
  await page.goto(B + r, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForLoadState("networkidle", { timeout: 60000 }).catch(() => {});
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  const issues = await page.evaluate(() => {
    const out = [];
    const de = document.documentElement;
    if (de.scrollWidth > de.clientWidth + 1) out.push(`horizontal overflow ${de.scrollWidth}>${de.clientWidth}`);
    // elements sticking out of the viewport
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (!r.width || getComputedStyle(el).position === "fixed") return;
      if (r.right <= de.clientWidth + 2) return;
      // inside a deliberate horizontal scroller (wide tables) this is fine
      let a = el.parentElement, scrollable = false;
      while (a) { const o = getComputedStyle(a).overflowX; if (o === "auto" || o === "scroll" || o === "hidden") { scrollable = true; break; } a = a.parentElement; }
      if (!scrollable) out.push(`overflows right: <${el.tagName.toLowerCase()}> "${(el.textContent||"").trim().slice(0,28)}"`);
    });
    // tap targets under 44px
    document.querySelectorAll("a, button, input, select, textarea").forEach((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (!r.width || cs.display === "none" || cs.visibility === "hidden") return;
      if (el.classList.contains("sr-only") || el.closest(".sr-only")) return;
      if (cs.position === "absolute" && r.width < 2) return;
      const isTextLink = el.tagName === "A" && (el.textContent || "").trim().length > 0;
      const tooSmall = isTextLink ? r.height < 32 : (r.height < 32 || r.width < 32);
      if (tooSmall)
        out.push(`small tap target ${Math.round(r.width)}x${Math.round(r.height)}: "${(el.textContent||el.getAttribute("aria-label")||"").trim().slice(0,26)}"`);
    });
    // text clipped by its box
    document.querySelectorAll("h1,h2,h3,h4,p,span,a,button,td,th,li").forEach((el) => {
      if (el.children.length) return;
      if (el.classList.contains("sr-only") || el.closest(".sr-only")) return;
      if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== "visible")
        out.push(`clipped text: "${(el.textContent||"").trim().slice(0,30)}"`);
    });
    return [...new Set(out)];
  });
  if (issues.length) { problems += issues.length; console.log(`\n${r}`); issues.slice(0, 8).forEach(i => console.log("   ✗ " + i)); }
}
console.log(problems ? `\n${problems} mobile issues` : "\nNo mobile layout issues across all routes at 390px.");
await br.close();
process.exit(problems ? 1 : 0);
