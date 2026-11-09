import { copyFile, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "build/client";

// Static hosts look for /404.html, while React Router writes /404/index.html.
await copyFile(`${OUT}/404/index.html`, `${OUT}/404.html`);

// The sitemap lists what was actually prerendered: anything with a canonical URL and not marked noindex.
const urls = [];
for (const file of (await readdir(OUT, { recursive: true })).filter((f) => f.endsWith("index.html"))) {
  const html = await readFile(join(OUT, file), "utf8");
  const loc = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!loc || html.includes('name="robots" content="noindex"')) continue;
  urls.push({ loc, lastmod: html.match(/<meta property="article:modified_time" content="([^"]+)"/)?.[1] });
}
urls.sort((a, b) => a.loc.localeCompare(b.loc));
const entries = urls.map(({ loc, lastmod }) => `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`);
await writeFile(`${OUT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`);
console.log(`[sitemap] ${urls.length} pages`);
