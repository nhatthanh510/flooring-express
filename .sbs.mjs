import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
const [refPath, oursPath, outDir, label, chunkH = "1250"] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const b64 = (p) => fs.readFileSync(p).toString("base64");
const browser = await chromium.launch();
const page = await browser.newPage();
const slices = await page.evaluate(async ({ a, b, chunkH }) => {
  const load = async (d) => { const i = new Image(); i.src = "data:image/png;base64," + d; await i.decode(); return i; };
  const [ia, ib] = await Promise.all([load(a), load(b)]);
  const W = 400, sa = W / ia.width, sb = W / ib.width;
  const total = Math.max(ia.height * sa, ib.height * sb);
  const out = [];
  for (let y = 0; y < total; y += chunkH) {
    const h = Math.min(chunkH, total - y);
    const c = document.createElement("canvas");
    c.width = W * 2 + 30; c.height = h + 26;
    const x = c.getContext("2d");
    x.fillStyle = "#111"; x.fillRect(0, 0, c.width, c.height);
    x.fillStyle = "#fff"; x.font = "13px monospace";
    x.fillText("MOCKUP", 8, 17); x.fillText("OURS", W + 38, 17);
    x.drawImage(ia, 0, y / sa, ia.width, h / sa, 0, 26, W, h);
    x.drawImage(ib, 0, y / sb, ib.width, h / sb, W + 30, 26, W, h);
    out.push(c.toDataURL("image/png").split(",")[1]);
  }
  return out;
}, { a: b64(refPath), b: b64(oursPath), chunkH: Number(chunkH) });
slices.forEach((s, i) => fs.writeFileSync(path.join(outDir, `${label}.${String(i + 1).padStart(2, "0")}.png`), Buffer.from(s, "base64")));
console.log(`${label}: ${slices.length} slices`);
await browser.close();
