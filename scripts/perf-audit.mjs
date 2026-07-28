// Core Web Vitals per route against a production build:
//   pnpm build && pnpm start --port 3222
//   BASE=http://localhost:3222 pnpm perf-audit
import { chromium } from "playwright";
const B = process.env.BASE ?? "http://localhost:3222";
const ROUTES = ["/", "/services", "/gallery", "/faq", "/about", "/contact"];
const br = await chromium.launch();
for (const r of ROUTES) {
  const ctx = await br.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const bytes = { js: 0, css: 0, img: 0, font: 0, other: 0 };
  const reqs = [];
  page.on("response", async (res) => {
    const t = res.request().resourceType();
    const len = Number(res.headers()["content-length"] ?? 0);
    reqs.push({ url: res.url(), type: t, len, status: res.status() });
    if (t === "script") bytes.js += len;
    else if (t === "stylesheet") bytes.css += len;
    else if (t === "image") bytes.img += len;
    else if (t === "font") bytes.font += len;
    else bytes.other += len;
  });
  await page.goto(B + r, { waitUntil: "networkidle", timeout: 120000 });
  const m = await page.evaluate(() => new Promise((resolve) => {
    const out = { lcp: 0, cls: 0, lcpEl: "" };
    new PerformanceObserver((l) => {
      const e = l.getEntries().at(-1);
      out.lcp = Math.round(e.startTime);
      out.lcpEl = (e.element?.tagName || "") + " " + (e.url || e.element?.getAttribute?.("src") || "").split("/").pop()?.slice(0, 40);
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) out.cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
    const nav = performance.getEntriesByType("navigation")[0];
    setTimeout(() => resolve({ ...out, cls: +out.cls.toFixed(4),
      ttfb: Math.round(nav?.responseStart ?? 0),
      dcl: Math.round(nav?.domContentLoadedEventEnd ?? 0) }), 1200);
  }));
  const k = (n) => (n / 1024).toFixed(0).padStart(4) + "kB";
  console.log(`${r.padEnd(11)} LCP ${String(m.lcp).padStart(5)}ms  CLS ${String(m.cls).padEnd(7)} TTFB ${String(m.ttfb).padStart(4)}ms  js${k(bytes.js)} css${k(bytes.css)} img${k(bytes.img)} font${k(bytes.font)}`);
  console.log(`            LCP element: ${m.lcpEl.trim() || "—"}`);
  const heavy = reqs.filter(x => x.len > 120_000).sort((a,b)=>b.len-a.len).slice(0,3);
  heavy.forEach(h => console.log(`            heavy: ${(h.len/1024).toFixed(0)}kB ${h.url.split("/").pop().slice(0,60)}`));
  await ctx.close();
}
await br.close();
