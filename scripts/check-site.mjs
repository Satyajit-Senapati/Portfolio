import fs from "node:fs";
import path from "node:path";

const html = fs.readFileSync("dist/index.html", "utf8");
const app = fs.readFileSync("src/App.tsx", "utf8");
const ids = new Set(
  [...app.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
);

for (const [, target] of app.matchAll(/\bhref="#([^"]+)"/g)) {
  if (!ids.has(target))
    throw new Error(`Missing navigation target: #${target}`);
}

for (const [, target] of app.matchAll(/\baria-labelledby="([^"]+)"/g)) {
  if (!ids.has(target)) throw new Error(`Missing heading target: ${target}`);
}

for (const asset of [
  "favicon.svg",
  "og.png",
  "Satyajit-Senapati-Resume.pdf",
  "images/satyajit-avatar.webp",
  "images/datarevia-preview.webp",
  "images/nevri-preview.webp",
  "fonts/manrope-latin.woff2",
  "brand/satyajit-mark.svg",
  ".nojekyll",
]) {
  if (!fs.existsSync(path.join("dist", asset)))
    throw new Error(`Missing published asset: ${asset}`);
}

for (const [, reference] of html.matchAll(/(?:src|href)="(\.\/[^\"]+)"/g)) {
  const target = path.resolve("dist", reference.split(/[?#]/, 1)[0]);
  if (!fs.existsSync(target))
    throw new Error(`Broken built asset reference: ${reference}`);
}

const schema = html.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
)?.[1];
if (!schema) throw new Error("Missing Person structured data.");
JSON.parse(schema);

console.log(
  "Checked navigation targets, heading labels, published assets, and structured data.",
);
