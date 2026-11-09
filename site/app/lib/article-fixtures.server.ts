// Sample posts for checking the blog before real ones exist. Only used when a build sets
// ARTICLE_FIXTURES=1; production builds read articles from Sanity.
export const useArticleFixtures = process.env.ARTICLE_FIXTURES === "1";

const span = (text: string) => ({ _type: "span", _key: text.slice(0, 8), text, marks: [] });
const block = (style: string, text: string) => ({ _type: "block", _key: `${style}-${text.slice(0, 12)}`, style, markDefs: [], children: [span(text)] });
const words = (n: number, text: string) => Array.from({ length: n }, (_, i) => block("normal", `${text} (${i + 1})`));
const P = "Sample paragraph for checking the reading width and rhythm of body text. Real copy will come from Sanity, and this column stays about 75 characters wide so longer pieces remain comfortable to read.";

export const articleFixtures = [
  { slug: "sample-note", title: "A sample note", excerpt: "A short note: one idea, a few paragraphs, read in a couple of minutes.", format: "note", tags: ["Design tokens"], publishedAt: "2026-11-01T00:00:00Z", body: words(3, P) },
  { slug: "sample-essay", title: "A sample essay", excerpt: "A longer essay with sections and a pull quote, for when an idea needs more room.", format: "essay", tags: ["Design systems"], publishedAt: "2026-10-01T00:00:00Z", body: [block("h2", "First section"), ...words(14, P), block("blockquote", "A pull quote for the line a reader should remember."), block("h2", "Second section"), ...words(14, P), block("h3", "A nested heading"), ...words(8, P),
    { _type: "block", _key: "inline-code", style: "normal", markDefs: [{ _type: "link", _key: "lnk", href: "/projects/quieto-tokens" }], children: [
      { _type: "span", _key: "a", text: "Inline code like ", marks: [] },
      { _type: "span", _key: "b", text: "--qds-spacing-400", marks: ["code"] },
      { _type: "span", _key: "c", text: " sits in the line, and ", marks: [] },
      { _type: "span", _key: "d", text: "a link to another page", marks: ["lnk"] },
      { _type: "span", _key: "e", text: " navigates without a reload.", marks: [] },
    ] },
    { _type: "code", _key: "code-sample", language: "tsx", filename: "Button.tsx", code: `export function Button({ variant = "primary", children }: ButtonProps) {\n  // Tokens, not literals: the theme swaps the semantic tier.\n  return <button className={\`qds-button qds-button--\${variant}\`}>{children}</button>;\n}` },
    { _type: "code", _key: "code-css", language: "css", code: `.card {\n  padding: var(--qds-spacing-400);\n  background: var(--qds-semantic-color-background-subtle);\n}` }, block("h2", "Closing thoughts"), ...words(6, P)] },
  { slug: "another-sample-note", title: "Another sample note", excerpt: "A second note, so the list shows more than one of each.", format: "note", tags: [], publishedAt: "2026-09-01T00:00:00Z", body: words(4, P) },
];
