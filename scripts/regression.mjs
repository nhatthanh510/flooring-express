// Functional regression suite: link integrity, gallery filters + card links,
// quote-form validation/success, plank toggle, mobile nav, footer structure,
// and card-hover compositing. Run the dev server first:
//   pnpm dev  &&  pnpm regression        (override host with BASE=)
import { chromium } from "playwright";
const B = process.env.BASE ?? "http://localhost:3000";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
const fails = [], pass = [];
const ok = (c, m) => (c ? pass : fails).push(m);

// --- 1. Links resolve (no dead 404s) -----------------------------------------
await page.goto(B + "/", { waitUntil: "networkidle" });
const hrefs = new Set();
for (const r of ["/", "/services", "/gallery", "/about", "/contact", "/gallery/classic-tasmanian-timber"]) {
  await page.goto(B + r, { waitUntil: "domcontentloaded" });
  (await page.evaluate(() => [...document.querySelectorAll("a[href^='/']")].map(a => a.getAttribute("href"))))
    .forEach(h => hrefs.add(h.split("#")[0] || "/"));
}
for (const h of [...hrefs].filter(Boolean)) {
  const res = await page.request.get(B + h);
  ok(res.status() < 400, `link ${h} -> ${res.status()}`);
}

// --- 2. Gallery card click reaches the case study -----------------------------
await page.goto(B + "/gallery", { waitUntil: "networkidle" });
const before = page.url();
await page.getByRole("link", { name: /View the Sandy Bay Modern case study/i }).click();
await page.waitForURL("**/gallery/contemporary-hybrid-oak", { timeout: 15000 }).catch(() => {});
ok(page.url().includes("contemporary-hybrid-oak"), `gallery card click ${before} -> ${page.url()}`);
ok(!(await page.getByText("View Case Study").count()), "no leftover 'View Case Study' pill");

// --- 3. Gallery filter deep links --------------------------------------------
for (const [cat, n] of [["hybrid", 2], ["timber", 2], ["laminate", 2]]) {
  await page.goto(`${B}/gallery?category=${cat}`, { waitUntil: "networkidle" });
  const count = await page.locator("figure").count();
  ok(count === n, `filter ?category=${cat} shows ${count} (expected ${n})`);
}

// --- 4. Quote form: validation + success --------------------------------------
await page.goto(B + "/contact", { waitUntil: "networkidle" });
await page.getByRole("button", { name: /Send Quote Request/i }).click();
await page.waitForTimeout(400);
ok(await page.getByText(/Please enter your full name/i).count() > 0, "empty submit shows inline errors");
await page.locator("#contact-quote-name").fill("Jane Smith");
await page.locator("#contact-quote-email").fill("jane@example.com");
await page.locator("#contact-quote-phone").fill("0400 111 222");
await page.getByRole("button", { name: /Send Quote Request/i }).click();
await page.waitForTimeout(1800);
ok(await page.getByText(/your request is in/i).count() > 0, "valid submit shows success panel");

// --- 5. Plank comparison toggle ------------------------------------------------
await page.goto(B + "/services", { waitUntil: "networkidle" });
const firstSpec = await page.locator("#compare dd").first().innerText();
await page.getByRole("radio", { name: /Timber/i }).first().click().catch(async () => {
  await page.locator("#compare [data-slot=toggle-group-item]").nth(2).click();
});
await page.waitForTimeout(400);
const afterSpec = await page.locator("#compare dd").first().innerText();
ok(firstSpec !== afterSpec, `plank toggle swaps specs ("${firstSpec}" -> "${afterSpec}")`);

// --- 6. Mobile nav sheet -------------------------------------------------------
const m = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mp = await m.newPage();
await mp.goto(B + "/", { waitUntil: "networkidle" });
await mp.getByRole("button", { name: /Open navigation menu/i }).click();
await mp.waitForTimeout(500);
ok(await mp.getByRole("dialog").count() > 0, "mobile nav sheet opens");
await mp.keyboard.press("Escape");
await mp.waitForTimeout(500);
ok(await mp.getByRole("dialog").count() === 0, "mobile nav closes on Escape");

// --- 7. Footer matches the Stitch structure ------------------------------------
await page.goto(B + "/", { waitUntil: "networkidle" });
const document_text = await page.evaluate(() => document.querySelector("footer").innerText);
const footer = await page.evaluate(() => {
  const f = document.querySelector("footer");
  return {
    headings: [...f.querySelectorAll("h2")].map(h => h.textContent.trim()),
    socials: f.querySelectorAll("a[target='_blank']").length,
    copyrightCentered: getComputedStyle(f.lastElementChild).textAlign,
    cols: getComputedStyle(f.firstElementChild).gridTemplateColumns.split(" ").length,
  };
});
ok(JSON.stringify(footer.headings) === JSON.stringify(["Flooring Solutions", "Quick Links", "Contact"]),
   `footer headings ${footer.headings.join(" | ")}`);
ok(/6200 0000/.test(document_text) && /flooringexpress\.com\.au/.test(document_text) && /Collins Street/.test(document_text),
   "footer carries phone, email and address");
ok(footer.socials === 2, `footer has ${footer.socials} social icons (expected 2)`);
ok(footer.copyrightCentered === "center", "copyright row centred");
ok(footer.cols === 4, `footer grid has ${footer.cols} columns (expected 4)`);

// --- 8. Card hover animates transform/opacity only -----------------------------
const lift = await page.evaluate(() => {
  const el = document.querySelector(".card-lift");
  if (!el) return null;
  const cs = getComputedStyle(el);
  const after = getComputedStyle(el, "::after");
  return { prop: cs.transitionProperty, afterProp: after.transitionProperty, afterShadow: after.boxShadow !== "none" };
});
ok(lift && !/box-shadow/.test(lift.prop), `card lift transitions: ${lift?.prop}`);
ok(lift?.afterProp === "opacity" && lift?.afterShadow, "lifted shadow animates via ::after opacity");

// --- 9. CTAs carry distinct intents, and the form honours them ---------------
const ctaTargets = await (async () => {
  const seen = {};
  for (const r of ["/", "/services", "/gallery", "/about",
                   "/gallery/contemporary-hybrid-oak", "/gallery/zenith-commercial-laminate"]) {
    await page.goto(B + r, { waitUntil: "domcontentloaded" });
    seen[r] = await page.evaluate(() =>
      [...document.querySelectorAll("main a[href*='/contact']")].map(a => a.getAttribute("href")));
  }
  return seen;
})();
for (const [route, hrefs] of Object.entries(ctaTargets)) {
  const dupes = hrefs.filter((h, i) => hrefs.indexOf(h) !== i);
  ok(dupes.length === 0, `${route}: no two CTAs share a contact destination${dupes.length ? " (" + [...new Set(dupes)].join(", ") + ")" : ""}`);
}

for (const [q, heading] of [["enquiry=samples", /Order Product Samples/i],
                            ["enquiry=consultation", /Book a Free Consultation/i],
                            ["enquiry=commercial", /Commercial Team/i]]) {
  await page.goto(`${B}/contact?${q}`, { waitUntil: "domcontentloaded" });
  const h = await page.locator("main h2").first().innerText();
  ok(heading.test(h), `/contact?${q} -> "${h}"`);
}
await page.goto(B + "/contact?enquiry=samples&flooring=timber", { waitUntil: "networkidle" });
const preset = await page.evaluate(() =>
  [...document.querySelectorAll("[data-slot=toggle-group-item][data-state=on]")].map(e => e.textContent.trim()));
ok(preset.includes("Timber") && preset.includes("Product samples"),
   `deep link preselects [${preset.join(", ")}]`);

// --- 10. Home portfolio tiles are links and match gallery imagery -------------
await page.goto(B + "/", { waitUntil: "networkidle" });
const bento = await page.evaluate(() =>
  [...document.querySelectorAll("#gallery a[href]")].map(a => ({
    href: a.getAttribute("href"),
    img: a.querySelector("img")?.getAttribute("src") ?? "",
  })));
const tiles = bento.filter(b => b.img);
ok(tiles.length === 4, `home portfolio has ${tiles.length} clickable tiles (expected 4)`);
await page.goto(B + "/gallery", { waitUntil: "networkidle" });
const galleryImgs = await page.evaluate(() =>
  [...document.querySelectorAll("figure img")].map(i => decodeURIComponent(i.getAttribute("src"))));
const shared = tiles.filter(t => galleryImgs.some(g => g.includes(
  decodeURIComponent(t.img).replace(/.*url=/, "").split("&")[0])));
ok(shared.length === tiles.length, `${shared.length}/${tiles.length} home tiles reuse the gallery image`);

// --- 11. View Specifications selects the matching product --------------------
await page.goto(B + "/services", { waitUntil: "networkidle" });
await page.getByRole("link", { name: /View Specifications for Timber/i }).click();
await page.waitForTimeout(700);
const shown = await page.locator("#compare h3").first().innerText();
ok(/Timber/i.test(shown), `View Specifications (Timber) -> comparison shows "${shown}"`);

// --- 12. No image ships with baked-in UI chrome (spot check by size) ---------

console.log("PASS (" + pass.length + ")"); pass.forEach(p => console.log("  ✓ " + p));
console.log(fails.length ? "\nFAIL (" + fails.length + ")" : "\nNo failures.");
fails.forEach(f => console.log("  ✗ " + f));
await browser.close();
process.exit(fails.length ? 1 : 0);
