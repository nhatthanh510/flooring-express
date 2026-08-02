# Editing the website

A guide for whoever keeps the Flooring Express site up to date. No technical
knowledge needed — if you can use Gmail, you can use this.

---

## 1. Getting in

1. Go to **https://your-site-address/studio** (bookmark it).
2. Sign in with the Google account you were invited with.

That's the Studio — the control panel for everything on the website. Text,
photos, phone number, opening hours, FAQs. All of it lives here, none of it is
"in the code".

**Nothing you do here goes live until you press Publish.** Type freely.

---

## 2. The two ways to edit

At the top of the Studio there are tabs. Two matter:

### Presentation — the easy one, start here

Shows the real website side by side with the editor. Click any bit of text or
any photo on the page, and its edit box opens on the right. You never have to
know which page or which field something lives in — you point at it.

Use this for anything you can *see* on the site.

### Content — the list

The left-hand menu, organised like this:

| Menu item | What's in it |
| --- | --- |
| **Site settings** | Phone, email, address, opening hours, service areas, the menu, the footer |
| **Pages** | One entry per page: Home, Services, Gallery, About, FAQ, Contact, plus the 404 and thank-you pages |
| **Flooring services** | The three products — Hybrid, Laminate, Timber |
| **Gallery projects** | The photo tiles on the gallery page |
| **Case studies** | The long write-up pages behind some gallery tiles |
| **FAQ categories** / **FAQs** | Questions and the groups they sit in |
| **Process steps** | The numbered "how we work" steps on the Services page |

Use this when you're adding something new, or when you know exactly what you
want and don't need to hunt for it.

---

## 3. Saving and publishing

- Typing saves a **draft** automatically. There is no Save button and you cannot
  lose work by closing the tab.
- A draft is invisible to the public. **Press Publish (bottom right) to put it
  live.** It appears on the site within a few seconds.
- Changed your mind before publishing? The **⋮** menu next to Publish has
  **Discard changes** — throws the draft away and leaves the live version alone.
- Made a mistake *after* publishing? Same **⋮** menu → the version history lets
  you look at any earlier version and restore it. Nothing is ever really lost.

The seven pages can't be deleted or duplicated — there is exactly one Home page,
always. That's deliberate.

---

## 4. Recipes for the things you'll actually do

### Change the phone number, email, or address
**Site settings → Contact & hours.**

Two phone fields, and you need both:
- **Phone** — how it looks on the page: `(03) 6200 0000`
- **Phone href** — what happens when someone taps it on a mobile:
  `tel:+61362000000` (no spaces, no brackets, `+61` and drop the leading 0)

Change one without the other and the site shows one number but dials another.

### Change opening hours
**Site settings → Contact & hours.** Three fields, all three must agree:
- **Hours** — the table shown on the contact page
- **Hours summary** — the one-liner in the footer, e.g. `Mon - Fri: 8am - 6pm`
- **Opening hours (structured data)** — the version Google reads, in its own
  format: `Mo-Fr 08:00-18:00`, one line per block

If they disagree, Google may show the wrong hours in search results.

### Change where quote enquiries are emailed
**Site settings → Contact & hours → "Where quote enquiries are sent."**

This one is private — it never appears on the website. A Gmail address is fine.
Leave it empty and enquiries go to the public Email address instead, which is
the one printed on the contact page and in the footer.

### Change a page's headline or intro
Presentation tab → click the headline. Or **Pages → [the page] → Hero**.

Every page's hero has the same parts: **eyebrow** (the small line above),
**title**, **description**, **image**, and up to two **buttons**.

### Add a project to the gallery
1. **Gallery projects → + Create**
2. Fill in title, subtitle, category (Hybrid/Laminate/Timber), sector
   (Residential/Commercial), and a photo.
3. **Tile shape** controls how tall the tile is. Vary these across projects —
   if they're all the same the gallery looks like a spreadsheet.
4. **Sort order** — a number, lowest appears first. Leave gaps (10, 20, 30) so
   you can slot something in later without renumbering everything.
5. Publish.

Optional: attach a short silent **video** that loops in place of the photo. Keep
it under about 10 MB and a few seconds — it downloads for every visitor. The
photo is still required either way; it's what shows while the video loads.

### Feature a project on the home page
**Pages → Home page → Featured work grid.** Add a tile, pick an existing gallery
project, choose a tile size.

You're pointing at the project, not re-typing it — so editing the project once
updates both the gallery and the home page. They can't drift apart.

### Add a FAQ
**FAQs → + Create.** Question, answer, and a **category** (which group it
appears under on the FAQ page).

- Tick **Show on home page** to also surface it in the home page FAQ section.
- Leave **category** empty to show it *only* on the home page.

### Reorder anything
Everything with a list has a **Sort order** number. Lowest first. It's never the
order you created things in — always this number.

### Change the menu or a footer link
**Site settings → Navigation.** Every link is a **label** (what people see) and
an **href** (where it goes).

For hrefs, use a path like `/services` or `/services#hybrid` — starting with a
slash, no domain. Only use a full `https://...` address for links to other
websites.

Clearing the **Header button** removes the "Free Quote" button from the header
and the mobile menu entirely.

---

## 5. Photos

Upload the **original** photo, straight from the camera or the photographer.
Never a screenshot of a photo, never one saved off Facebook — those look fine in
the Studio and soft on the real site.

- **1400px wide or more.** The Studio warns you below that.
- Under **600×400px it will refuse to publish.** That's the guardrail working.
- **JPG, WebP or HEIC** for photos. PNG makes photo files 5–10× larger for no
  visible gain — you'll get a warning.
- Over 5 MB gets a warning. Visitors always get an optimised copy, but huge
  originals make the Studio sluggish.

**Alt text** — every photo has one. Write what's in the picture in a short
sentence: *"Hybrid plank flooring in an open-plan Hobart living room."* It's read
aloud to blind visitors and read by Google. Don't write "image" or "photo".

**Cropping** — click the crop icon on an uploaded photo and drag the circle to
the important part. The site crops differently on phones and desktops; that
circle is what it keeps.

---

## 6. The Search & social tab

Every page has one. Two fields matter:

- **Meta title** — the blue clickable line in Google. Keep it under ~60
  characters or it gets cut off. You'll see a warning.
- **Meta description** — the grey text under it. Under ~160 characters.

Write these for a person deciding whether to click, not for a robot.

---

## 7. When something looks wrong

**A red dot on the Publish button** — a required field is empty. Scroll up; the
field is outlined in red with the reason. You can't publish until it's filled.

**An orange warning** — advice, not a blocker. Read it, decide, publish anyway
if it doesn't apply.

**Published but the site hasn't changed** — give it 30 seconds and hard-refresh
(`Cmd+Shift+R` on Mac, `Ctrl+Shift+R` on Windows). If it's still wrong after a
minute, check you pressed Publish and not just typed.

**A section is missing from the site** — it's almost always empty content, not a
bug. Sections with nothing in them hide themselves rather than showing an empty
heading. Fill it in and it comes back.

**Anything else** — take a screenshot and send it to your developer. Don't
delete things to try to fix it.

---

## 8. The short version

1. Edit in **Presentation** when you can see the thing. Use the **Content** list
   when you can't.
2. Nothing is live until you press **Publish**.
3. Nothing is ever lost — version history goes back.
4. Upload big photos. Always write alt text.
5. **Sort order** controls order, everywhere.
