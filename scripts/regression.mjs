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
  // All six figures stay in the DOM so crawlers see every project; the active
  // filter hides non-matches with CSS. Visibility is the contract, not count.
  const visible = await page.locator("figure:visible").count();
  const inDom = await page.locator("figure").count();
  ok(visible === n, `filter ?category=${cat} shows ${visible} visible (expected ${n})`);
  ok(inDom === 6, `filter ?category=${cat} keeps all ${inDom}/6 in the DOM for crawlers`);
}

// --- 4. Quote form: validation + success --------------------------------------
await page.goto(B + "/contact", { waitUntil: "networkidle" });
await page.route("**/api/quote", (r) =>
  r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }),
);
await page.getByRole("button", { name: /Send Quote Request/i }).click();
await page.waitForTimeout(400);
ok(await page.getByText(/Please enter your full name/i).count() > 0, "empty submit shows inline errors");
await page.locator("#contact-quote-name").fill("Jane Smith");
await page.locator("#contact-quote-email").fill("jane@example.com");
await page.locator("#contact-quote-phone").fill("0400 111 222");
await page.getByRole("button", { name: /Send Quote Request/i }).click();
// Delivery is stubbed above: the suite must pass without Resend credentials
// and must never send real mail. What it verifies is ours — validation, the
// payload reaching the API, and the redirect to the confirmation page.
await page.waitForURL("**/thank-you", { timeout: 10000 }).catch(() => {});
ok(page.url().includes("/thank-you"), `valid submit lands on /thank-you (${page.url()})`);
await page.unroute("**/api/quote");


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
ok(footer.socials === 1, `footer has ${footer.socials} social icon (expected 1)`);
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
  // the form's own heading, not the sr-only "Contact details" group label
  const h = await page.locator("main form").locator("xpath=../h2").first().innerText()
    .catch(async () => (await page.locator("main h2:not(.sr-only)").first().innerText()));
  ok(heading.test(h), `/contact?${q} -> "${h}"`);
}
await page.goto(B + "/contact?enquiry=samples&flooring=timber", { waitUntil: "networkidle" });
const preset = await page.evaluate(() =>
  [...document.querySelectorAll("[data-slot=toggle-group-item][data-state=on]")].map(e => e.textContent.trim()));
ok(preset.includes("Timber") && preset.includes("Samples"),
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

// --- 13. Contact form controls never overflow their group -------------------
for (const w of [390, 768, 1024, 1440]) {
  const vp = await browser.newContext({ viewport: { width: w, height: 1000 } });
  const vpp = await vp.newPage();
  await vpp.goto(B + "/contact?enquiry=consultation", { waitUntil: "networkidle", timeout: 120000 });
  const spill = await vpp.evaluate(() => {
    const out = [];
    document.querySelectorAll("[data-slot=toggle-group]").forEach((g) => {
      const gr = g.getBoundingClientRect();
      g.querySelectorAll("[data-slot=toggle-group-item]").forEach((i) => {
        const r = i.getBoundingClientRect();
        if (r.right > gr.right + 1 || i.scrollWidth > i.clientWidth + 1) out.push(i.textContent.trim());
      });
    });
    return out;
  });
  ok(spill.length === 0, `@${w}px no toggle option overflows${spill.length ? ": " + spill.join(", ") : ""}`);
  await vp.close();
}

// --- 14. Contact page shows a live map ---------------------------------------
await page.goto(B + "/contact", { waitUntil: "networkidle" });
const mapFrame = await page.evaluate(() => {
  const f = document.querySelector("iframe[title*='Map']");
  return f ? { src: f.getAttribute("src"), title: f.getAttribute("title"), lazy: f.getAttribute("loading") } : null;
});
ok(!!mapFrame && /maps\.google\.com/.test(mapFrame.src), `contact map is a live embed (${mapFrame?.src?.slice(0, 42)}…)`);
ok(mapFrame?.lazy === "lazy" && !!mapFrame?.title, "map iframe is lazy-loaded and titled");

// Nothing may sit on top of the map — Google's attribution and place card
// both live inside the frame and must stay unobstructed.
const overlays = await page.evaluate(() => {
  const f = document.querySelector("iframe[title*='Map']");
  if (!f) return [];
  const box = f.getBoundingClientRect();
  return [...document.querySelectorAll("main a, main button")].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width && r.top < box.bottom - 2 && r.bottom > box.top + 2 &&
           r.left < box.right - 2 && r.right > box.left + 2;
  }).map((el) => el.textContent.trim().slice(0, 30));
});
ok(overlays.length === 0, `nothing overlays the map${overlays.length ? ": " + overlays.join(", ") : ""}`);

const fb = await page.evaluate(() =>
  [...document.querySelectorAll("footer a[href*='facebook']")].map((a) => a.getAttribute("href")));
ok(fb.length === 1 && fb[0].includes("61562958221994"), `footer links the real Facebook profile (${fb[0] ?? "none"})`);
ok((await page.evaluate(() => document.querySelectorAll("footer a[href*='instagram']").length)) === 0,
   "no Instagram link");

// --- 14b. Footer contact column stays on one line and aligned -----------------
const contactCol = await page.evaluate(() => {
  const a = document.querySelector("footer address");
  const ul = a.closest("ul");
  const lefts = [...ul.querySelectorAll("address, a, span")].map((e) => Math.round(e.getBoundingClientRect().left));
  return { addrH: Math.round(a.getBoundingClientRect().height),
           rows: [...ul.children].map((li) => Math.round(li.getBoundingClientRect().height)),
           distinctLefts: [...new Set(lefts)].length };
});
ok(contactCol.addrH <= 26, `footer address fits one line (${contactCol.addrH}px)`);
ok(contactCol.rows.every((h) => h === contactCol.rows[0]), `footer contact rows are even (${contactCol.rows.join("/")})`);
ok(contactCol.distinctLefts === 1, "footer contact values share one left edge");

// --- 14c. Quote form controls -------------------------------------------------
const ta = await page.evaluate(() => {
  const t = document.querySelector("textarea");
  return { h: Math.round(t.getBoundingClientRect().height), rows: t.rows };
});
ok(ta.h >= 120, `message textarea is ${ta.h}px tall for ${ta.rows} rows`);
const optionHeights = await page.evaluate(() =>
  [...document.querySelectorAll("[data-slot=toggle-group-item]")].map((e) => Math.round(e.getBoundingClientRect().height)));
ok(new Set(optionHeights).size === 1, `form options are one line each (${[...new Set(optionHeights)].join("/")}px)`);

// --- 15. FAQ ------------------------------------------------------------------
await page.goto(B + "/faq", { waitUntil: "networkidle" });
ok((await page.locator("[data-slot=accordion-item]").count()) === 5, "/faq lists all 5 questions");
await page.locator("#faq-search").fill("steam mop");
await page.waitForTimeout(300);
ok((await page.locator("[data-slot=accordion-item]").count()) === 1, "FAQ search filters to the matching question");
await page.locator("#faq-search").fill("zzzz");
await page.waitForTimeout(300);
ok((await page.getByText(/No questions match/i).count()) === 1, "FAQ search shows an empty state");
ok(/FAQPage/.test(await page.content()), "/faq emits FAQPage structured data");
await page.goto(B + "/", { waitUntil: "networkidle" });
ok((await page.locator("#faq [data-slot=accordion-item]").count()) === 4, "home page has the 4-question FAQ section");
await page.goto(B + "/contact", { waitUntil: "networkidle" });
const faqCta = await page.getByRole("link", { name: /^View FAQ$/ }).getAttribute("href");
ok(faqCta === "/faq", `contact "View FAQ" -> ${faqCta}`);

// --- 16. Mobile menu matches the design --------------------------------------
{
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await mctx.newPage();
  await mp.goto(B + "/", { waitUntil: "networkidle" });
  await mp.getByRole("button", { name: /Open navigation menu/i }).click();
  await mp.waitForTimeout(500);
  const nav = await mp.evaluate(() => {
    const a = document.querySelector("[data-slot=sheet-content] nav a");
    const panel = document.querySelector("[data-slot=sheet-content]").getBoundingClientRect();
    const cs = getComputedStyle(a);
    return { size: cs.fontSize, family: cs.fontFamily.split(",")[0].replace(/"/g, ""),
             align: getComputedStyle(a.parentElement).textAlign,
             fullWidth: Math.round(panel.width) === window.innerWidth };
  });
  ok(nav.size === "16px", `mobile menu links are ${nav.size} (design: 16px)`);
  ok(nav.family === "Montserrat", `mobile menu links use ${nav.family}`);
  ok(nav.align === "center", "mobile menu links are centred");
  ok(nav.fullWidth, "mobile menu covers the full width");
  await mctx.close();
}

console.log("PASS (" + pass.length + ")"); pass.forEach(p => console.log("  ✓ " + p));
console.log(fails.length ? "\nFAIL (" + fails.length + ")" : "\nNo failures.");
fails.forEach(f => console.log("  ✗ " + f));
await browser.close();
process.exit(fails.length ? 1 : 0);
