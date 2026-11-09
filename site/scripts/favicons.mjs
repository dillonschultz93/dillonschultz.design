/**
 * Regenerates the icons in public/ from the header's mark: its blob shape and the same token
 * gradient. Run by hand with `npm run favicons` when the mark or the tokens change.
 *
 * The SVG follows the browser's light or dark mode. The PNGs use the light gradient, whose blue
 * and pale ends both stay visible on either tab color. Apple touch icons get an opaque background
 * because iOS shows transparency as black.
 */
import { writeFile } from "node:fs/promises";

import { tokens } from "@quieto/design-tokens";
import { Resvg } from "@resvg/resvg-js";

import { createBlob, shape } from "./blob-shape.js";

const LOGO_SEED = 11;
const OUT = "public";
const token = (name) => tokens.find((t) => t.name === `qds-semantic-color-${name}`).modes;
const start = token("background-primary-rest");
const end = token("background-info");
const background = token("background-default").light;
const d = shape(createBlob(LOGO_SEED), 0);

const gradient = (a, b) => `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop class="a" offset="0" stop-color="${a}"/><stop class="b" offset="1" stop-color="${b}"/></linearGradient>`;

// Cropped to the shape, so the mark isn't lost in empty margin at 16px.
const box = new Resvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="${d}"/></svg>`).getBBox();
const side = Math.max(box.width, box.height);
const x = box.x - (side - box.width) / 2;
const y = box.y - (side - box.height) / 2;
const viewBox = `${x.toFixed(2)} ${y.toFixed(2)} ${side.toFixed(2)} ${side.toFixed(2)}`;

const render = (size, svg) => new Resvg(svg, { fitTo: { mode: "width", value: size }, font: { loadSystemFonts: false } }).render().asPng();

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><defs>${gradient(start.light, end.light)}</defs><path fill="url(#g)" d="${d}"/></svg>`;

// On the home screen the mark sits inside a tile, so it gets breathing room rather than a crop.
const inset = side * 0.2;
const tile = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${(x - inset).toFixed(2)} ${(y - inset).toFixed(2)} ${(side + inset * 2).toFixed(2)} ${(side + inset * 2).toFixed(2)}"><defs>${gradient(start.light, end.light)}</defs><rect x="-100" y="-100" width="400" height="400" fill="${background}"/><path fill="url(#g)" d="${d}"/></svg>`;

await writeFile(`${OUT}/favicon.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><style>@media (prefers-color-scheme: dark){.a{stop-color:${start.dark}}.b{stop-color:${end.dark}}}</style><defs>${gradient(start.light, end.light)}</defs><path fill="url(#g)" d="${d}"/></svg>\n`);

for (const size of [16, 32, 96, 128, 196]) await writeFile(`${OUT}/favicon-${size}x${size}.png`, render(size, icon));
for (const size of [57, 60, 72, 76, 114, 120, 144, 152, 167, 180]) await writeFile(`${OUT}/apple-touch-icon-${size}x${size}.png`, render(size, tile));

// An .ico is a small directory of images, and modern ones can simply hold PNGs.
const images = [16, 32, 48].map((size) => ({ size, png: render(size, icon) }));
const header = Buffer.alloc(6 + images.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach(({ size, png }, i) => {
  const at = 6 + i * 16;
  header.writeUInt8(size, at);
  header.writeUInt8(size, at + 1);
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(png.length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += png.length;
});
await writeFile(`${OUT}/favicon.ico`, Buffer.concat([header, ...images.map((i) => i.png)]));
console.log("[favicons] wrote", viewBox);
