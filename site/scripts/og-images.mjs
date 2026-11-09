/**
 * Social cards: a 1200×630 PNG for each page that asks for one, so a shared link previews that
 * page rather than the site. Runs after the build and reads the prerendered HTML, so a new
 * project or post gets a card with nothing to configure.
 *
 * Satori lays the card out and returns SVG, and resvg renders that to PNG. Neither needs a
 * browser. Colors are the tokens' dark-mode values, and a project's main image sits inside the
 * blob, as it does on the homepage. The blob's shape is seeded from the page's path, so each
 * card keeps its own shape from one build to the next.
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

import { tokens } from "@quieto/design-tokens";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

import { createBlob, shape } from "./blob-shape.js";

const OUT = "build/client";
const WIDTH = 1200;
const HEIGHT = 630;
const PADDING = 72;
const TEXT_WIDTH = 600;
const BLOB_SIZE = 720;
const LOGO_SEED = 11; // The header's mark.

const require = createRequire(import.meta.url);
const font = (pkg, file) => readFile(join(dirname(require.resolve(`${pkg}/package.json`)), "files", file));
const fonts = [
  { name: "Inter", data: await font("@fontsource/inter", "inter-latin-400-normal.woff"), weight: 400 },
  { name: "Inter", data: await font("@fontsource/inter", "inter-latin-600-normal.woff"), weight: 600 },
  { name: "Inter", data: await font("@fontsource/inter", "inter-latin-700-normal.woff"), weight: 700 },
  { name: "JetBrains Mono", data: await font("@fontsource/jetbrains-mono", "jetbrains-mono-latin-400-normal.woff"), weight: 400 },
];

const dark = (name) => {
  const token = tokens.find((t) => t.name === `qds-semantic-color-${name}`);
  if (!token) throw new Error(`og-images: no token qds-semantic-color-${name}`);
  return token.modes.dark;
};
const color = {
  background: dark("background-default"),
  text: dark("content-default"),
  subtle: dark("content-subtle"),
  primary: dark("content-primary-rest"),
  blobStart: dark("background-primary-rest"),
  blobEnd: dark("background-info"),
};

const NAMED = { amp: "&", quot: '"', lt: "<", gt: ">", apos: "'", nbsp: " " };
const decode = (text) =>
  text.replace(/&(?:#x([0-9a-f]+)|#(\d+)|(\w+));/gi, (match, hex, dec, name) =>
    hex ? String.fromCodePoint(parseInt(hex, 16)) : dec ? String.fromCodePoint(Number(dec)) : (NAMED[name] ?? match));
const metaContent = (html, attr) => html.match(new RegExp(`<meta ${attr} content="([^"]*)"`))?.[1];

/** A satori element. */
const h = (type, style, ...children) => ({ type, props: { style, children: children.length === 1 ? children[0] : children } });
const svgImage = (svg, style, size) => ({
  type: "img",
  props: { src: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`, width: size, height: size, style },
});

/** The same fill as the site's blob. */
const blobSvg = (d) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs>
  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color.blobStart}"/><stop offset="1" stop-color="${color.blobEnd}"/></linearGradient></defs>
  <path fill="url(#g)" d="${d}"/>
</svg>`;

/** The blob's gradient as an outline, drawn over a clipped image so its edge holds against a dark card. */
const RIM = 8; // px on the card
const rimSvg = (d) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" overflow="visible"><defs>
  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color.blobStart}"/><stop offset="1" stop-color="${color.blobEnd}"/></linearGradient></defs>
  <path fill="none" stroke="url(#g)" stroke-width="${(RIM * 200) / BLOB_SIZE}" stroke-linejoin="round" d="${d}"/>
</svg>`;

/** The page's image clipped to the shape. Clipped here because resvg won't load a raster nested inside an SVG image. */
const scalePath = (d, factor) => d.replace(/-?\d+(\.\d+)?/g, (n) => (Number(n) * factor).toFixed(1));
const blobImage = (d, src, style) => ({
  type: "img",
  props: { src, width: BLOB_SIZE, height: BLOB_SIZE, style: { ...style, objectFit: "cover", clipPath: `path("${scalePath(d, BLOB_SIZE / 200)}")` } },
});

/** Fetched as JPEG at card size, so the PNG stays small and resvg can read it whatever the source format. */
async function fetchImage(src) {
  const url = new URL(decode(src));
  url.searchParams.delete("auto");
  url.searchParams.set("fm", "jpg");
  url.searchParams.set("w", "1000");
  const response = await fetch(url);
  if (!response.ok) throw new Error(`og-images: ${response.status} for ${url}`);
  return `data:image/jpeg;base64,${Buffer.from(await response.arrayBuffer()).toString("base64")}`;
}

const seedFor = (path) => [...path].reduce((sum, c) => (sum * 31 + c.charCodeAt(0)) % 9973, 7);

async function renderCard({ path, title, description, eyebrow, image }) {
  const d = shape(createBlob(seedFor(path)), 0);
  const blobStyle = { position: "absolute", left: WIDTH - BLOB_SIZE + 110, top: (HEIGHT - BLOB_SIZE) / 2 };
  const card = h("div", {
    width: WIDTH, height: HEIGHT, display: "flex", flexDirection: "column", gap: 72,
    padding: PADDING, backgroundColor: color.background, color: color.text, fontFamily: "Inter",
  },
    ...(image ? [blobImage(d, image, blobStyle), svgImage(rimSvg(d), blobStyle, BLOB_SIZE)] : [svgImage(blobSvg(d), blobStyle, BLOB_SIZE)]),
    h("div", { display: "flex", alignItems: "center", gap: 16 },
      svgImage(blobSvg(shape(createBlob(LOGO_SEED), 0)), {}, 56),
      h("div", { fontSize: 28, fontWeight: 600 }, "dillonschultz.design"),
    ),
    h("div", { display: "flex", flexDirection: "column", gap: 20, width: TEXT_WIDTH },
      ...(eyebrow ? [h("div", { fontFamily: "JetBrains Mono", fontSize: 24, color: color.primary }, eyebrow)] : []),
      h("div", { width: TEXT_WIDTH, fontSize: title.length > 22 ? 60 : 76, fontWeight: 700, lineHeight: 1.1 }, title),
      ...(description ? [h("div", { display: "block", lineClamp: 3, width: TEXT_WIDTH, fontSize: 28, lineHeight: 1.4, color: color.subtle }, description)] : []),
    ),
  );
  const svg = await satori(card, { width: WIDTH, height: HEIGHT, fonts });
  // Satori draws text as paths, so resvg doesn't need to load the system's fonts.
  return new Resvg(svg, { fitTo: { mode: "width", value: WIDTH }, font: { loadSystemFonts: false } }).render().asPng();
}

const started = performance.now();
const files = (await readdir(OUT, { recursive: true })).filter((f) => f.endsWith("index.html"));
let count = 0;
for (const file of files) {
  const html = await readFile(join(OUT, file), "utf8");
  const target = metaContent(html, 'property="og:image"')?.match(/\/og\/.+\.png$/)?.[0];
  if (!target) continue; // A designed card, or a page that isn't shared, like the 404.

  const path = `/${dirname(file)}`.replace(/\/\.$/, "/");
  const lead = html.match(/<img class="lead-image"[^>]* src="([^"]+)"/)?.[1];
  const png = await renderCard({
    path,
    title: path === "/" ? "Hey, I'm Dillon!" : decode(metaContent(html, 'property="og:title"') ?? ""),
    description: decode(metaContent(html, 'name="description"') ?? ""),
    eyebrow: path === "/" ? "Design Engineer" : path.startsWith("/projects/") ? "Case study" : path.startsWith("/blog/") ? "Writing" : "",
    image: lead ? await fetchImage(lead) : null,
  });
  const out = join(OUT, target);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, png);
  count++;
}
console.log(`[og] ${count} social cards in ${Math.round(performance.now() - started)}ms`);
