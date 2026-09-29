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
  "brand/satyajit-tile.svg",
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

const socialImage = fs.readFileSync("dist/og.png");
if (!socialImage.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex")))
  throw new Error("Social preview must be a PNG image.");
for (const [dimension, offset] of [["width", 16], ["height", 20]]) {
  const declared = html.match(
    new RegExp(`property="og:image:${dimension}" content="(\\d+)"`),
  )?.[1];
  if (Number(declared) !== socialImage.readUInt32BE(offset))
    throw new Error(`Social preview ${dimension} does not match its metadata.`);
}

const schema = html.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
)?.[1];
if (!schema) throw new Error("Missing Person structured data.");
JSON.parse(schema);

console.log(
  "Checked navigation targets, heading labels, published assets, social image dimensions, and structured data.",
);
