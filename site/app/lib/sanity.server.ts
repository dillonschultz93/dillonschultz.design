import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { Article, BodyBlock, Project, ProjectSummary, ArticleSummary, Resume } from "./types";
import { articleFixtures, useArticleFixtures } from "./article-fixtures.server";

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "ug0pbu4c",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  perspective: "published",
});
const builder = createImageUrlBuilder(client);
type ImageSource = Parameters<typeof builder.image>[0];
const imageUrl = (source: ImageSource, width: number) => builder.image(source).width(width).auto("format").quality(82).url();

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const textOf = (b: RawBlock) => (b.children ?? []).map((c) => c.text ?? "").join("");

type RawBlock = {
  _type: string;
  _key: string;
  style?: string;
  children?: { text?: string }[];
  alt?: string;
  decorative?: boolean;
  caption?: string;
  asset?: { metadata?: { dimensions?: { width: number; height: number } } };
  [key: string]: unknown;
};

const CODE_LANGUAGES = new Set(["tsx", "typescript", "javascript", "css", "html", "json", "sh"]);

/** Highlighted here, at build time, so no highlighter ships. Both themes' colors are inlined as CSS variables. */
async function highlight(code: string, language?: string) {
  const { codeToHtml } = await import("shiki");
  const lang = language && CODE_LANGUAGES.has(language) ? language : "text";
  return codeToHtml(code, { lang, themes: { light: "github-light", dark: "github-dark" }, defaultColor: false });
}

/**
 * Prepares Portable Text for the page: drops blank spacer blocks, resolves image URLs and
 * highlights code here so no Sanity or Shiki code ships to the browser. The Studio offers
 * H2–H4, but as a safety net any heading levels a document uses are still mapped onto h2 and
 * below in order (the page title is the only h1).
 */
async function prepareBody(raw: RawBlock[] | null) {
  const blocks = (raw ?? []).filter((b) => b._type !== "block" || textOf(b).trim());
  const levels = [...new Set(blocks.map((b) => b.style ?? "").filter((s) => /^h[1-6]$/.test(s)))].sort();
  const tag = (style: string) => `h${Math.min(levels.indexOf(style) + 2, 4)}`;
  const headings: { id: string; text: string }[] = [];
  const body = blocks.map((b): BodyBlock | Promise<BodyBlock> => {
    if (b._type === "code") {
      const { code = "", language, filename } = b as RawBlock & { code?: string; language?: string; filename?: string };
      return highlight(code, language).then((html) => ({ _type: "code", _key: b._key, html, language: language ?? "text", filename: filename ?? "" }));
    }
    if (b._type === "image") {
      const { width = 1600, height = 900 } = b.asset?.metadata?.dimensions ?? {};
      const source = b as unknown as ImageSource;
      return {
        _type: "image",
        _key: b._key,
        width,
        height,
        alt: b.decorative ? "" : (b.alt ?? ""),
        caption: b.caption ?? "",
        src: imageUrl(source, 1280),
        srcSet: [640, 960, 1280, 1824].map((w) => `${imageUrl(source, w)} ${w}w`).join(", "),
      };
    }
    if (b.style && levels.includes(b.style)) {
      const style = tag(b.style);
      if (style !== "h2") return { ...b, style } as BodyBlock;
      const id = slugify(textOf(b));
      headings.push({ id, text: textOf(b) });
      return { ...b, style, id } as BodyBlock;
    }
    return b as BodyBlock;
  });
  return { body: await Promise.all(body), headings };
}

const BODY = `body[]{ ..., _type == "image" => { ..., asset->{ _id, url, metadata{ dimensions } } } }`;
const SUMMARY = `title, description, tags, publishedAt, "updatedAt": _updatedAt, "slug": slug.current, mainImage`;

const toSummary = (p: { title: string; description?: string; tags?: string[] | null; publishedAt: string; updatedAt: string; slug: string; mainImage?: ImageSource | null }, index: number): ProjectSummary => ({
  title: p.title,
  description: p.description ?? "",
  tags: p.tags ?? [],
  publishedAt: p.publishedAt,
  updatedAt: p.updatedAt,
  slug: p.slug,
  index: index + 1,
  image: p.mainImage ? imageUrl(p.mainImage, 1600) : null,
});

export async function listSlugs() {
  const data = await client.fetch<{ projects: string[]; articles: string[] }>(`{
    "projects": *[_type == "post" && defined(slug.current)].slug.current,
    "articles": *[_type == "article" && defined(slug.current)].slug.current
  }`);
  return { projects: data.projects, articles: useArticleFixtures ? articleFixtures.map((a) => a.slug) : data.articles };
}

export async function getProjects() {
  const rows = await client.fetch<Parameters<typeof toSummary>[0][]>(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){ ${SUMMARY} }`);
  return rows.map(toSummary);
}

export async function getProject(slug: string): Promise<Project | null> {
  const rows = await client.fetch<(Parameters<typeof toSummary>[0] & { body: RawBlock[] | null })[]>(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){ ${SUMMARY}, ${BODY} }`);
  const i = rows.findIndex((r) => r.slug === slug);
  if (i < 0) return null;
  const nav = (r?: { title: string; slug: string }) => (r ? { title: r.title, slug: r.slug } : null);
  return { ...toSummary(rows[i], i), ...(await prepareBody(rows[i].body)), previous: nav(rows[i + 1]), next: nav(rows[i - 1]) };
}

const WORDS_PER_MINUTE = 220;
const readingMinutes = (blocks: RawBlock[] | null) => {
  const words = (blocks ?? []).filter((b) => b._type === "block").map(textOf).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

type RawArticle = { title: string; excerpt?: string; format?: "note" | "essay"; tags?: string[] | null; publishedAt: string; updatedAt?: string; slug: string; body: RawBlock[] | null };
const ARTICLE = `title, excerpt, format, tags, publishedAt, "updatedAt": _updatedAt, "slug": slug.current, ${BODY}`;

async function allArticles(): Promise<RawArticle[]> {
  if (useArticleFixtures) return articleFixtures as unknown as RawArticle[];
  return client.fetch<RawArticle[]>(`*[_type == "article" && defined(slug.current)] | order(publishedAt desc){ ${ARTICLE} }`);
}

const toArticleSummary = (a: RawArticle): ArticleSummary => ({
  title: a.title,
  excerpt: a.excerpt ?? "",
  format: a.format ?? "note",
  tags: a.tags ?? [],
  publishedAt: a.publishedAt,
  updatedAt: a.updatedAt ?? a.publishedAt,
  slug: a.slug,
  minutes: readingMinutes(a.body),
});

export async function getArticles() {
  return (await allArticles()).map(toArticleSummary);
}

export async function getArticle(slug: string): Promise<Article | null> {
  const rows = await allArticles();
  const i = rows.findIndex((r) => r.slug === slug);
  if (i < 0) return null;
  const nav = (r?: RawArticle) => (r ? { title: r.title, slug: r.slug } : null);
  return { ...toArticleSummary(rows[i]), ...(await prepareBody(rows[i].body)), previous: nav(rows[i + 1]), next: nav(rows[i - 1]) };
}

export async function getResume() {
  return client.fetch<Resume | null>(`*[_id == "resume"][0]{
    name, headline, location, email, summary,
    links[]{ _key, label, url },
    experience[]{ _key, title, organization, startDate, endDate, highlights },
    volunteer[]{ _key, title, organization, startDate, endDate, highlights },
    education[]{ _key, credential, institution, period },
    projects[]{ _key, name, meta, url, description },
    skills[]{ _key, category, items },
    "pdfUrl": pdf.asset->url
  }`);
}
