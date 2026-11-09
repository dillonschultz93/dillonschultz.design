const SITE = "https://dillonschultz.design";
const SITE_NAME = "Dillon Schultz";

/**
 * Pages with a card designed by hand, in public/. Every other page gets one from
 * scripts/og-images.mjs, which reads the og:image below to know which pages those are.
 * Delete an entry here to switch that page to a generated card.
 */
const DESIGNED_CARDS: Record<string, { src: string; width: number; height: number; alt: string }> = {
  "/projects/pasta-design-system": { src: "/og-image-pasta-design-system.jpg", width: 1200, height: 630, alt: "Pasta Design System: recipe cards, a meal planner and color palettes from the Yummly app." },
};

/** Where a page's generated card is written: /projects/foo becomes /og/projects/foo.png. */
const generatedCard = (path: string) => ({ src: `/og${path === "/" ? "/index" : path}.png`, width: 1200, height: 630 });
const cardImage = (path: string) => SITE + (DESIGNED_CARDS[path]?.src ?? generatedCard(path).src);

type PageMeta = { title: string; description: string; path: string; type?: string; published?: string; modified?: string };

/** `title` is the page's own name. The site name follows it, except on the homepage, which leads with it. */
export function pageMeta({ title, description, path, type = "website", published, modified }: PageMeta) {
  const card = DESIGNED_CARDS[path] ?? { ...generatedCard(path), alt: `${title}: ${description}` };
  const image = cardImage(path);
  return [
    { title: path === "/" ? title : `${title} | ${SITE_NAME}` },
    { name: "description", content: description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: SITE + path },
    { property: "og:image", content: image },
    { property: "og:image:width", content: String(card.width) },
    { property: "og:image:height", content: String(card.height) },
    { property: "og:image:alt", content: card.alt },
    ...(published ? [{ property: "article:published_time", content: published }] : []),
    ...(modified ? [{ property: "article:modified_time", content: modified }] : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: card.alt },
    { tagName: "link", rel: "canonical", href: SITE + path },
  ];
}

const CONTEXT = "https://schema.org";
const jsonLd = (data: Record<string, unknown>) => ({ "script:ld+json": { "@context": CONTEXT, ...data } });

const PERSON = {
  "@type": "Person",
  name: SITE_NAME,
  url: SITE,
  jobTitle: "Design Engineer",
  sameAs: ["https://linkedin.com/in/dillonschultz", "https://github.com/dillonschultz93", "https://www.instagram.com/dill.schultz/"],
};

export const personSchema = () => jsonLd(PERSON);

/** Names the site, which is what search engines show above a result. */
export const websiteSchema = () => jsonLd({ "@type": "WebSite", name: SITE_NAME, url: SITE });

/** A case study or a post, plus the trail that leads to it. */
export function articleSchema({ type, title, description, path, published, modified, section }: Required<Pick<PageMeta, "title" | "description" | "path" | "published" | "modified">> & { type: "Article" | "BlogPosting"; section: { name: string; path: string } }) {
  return [
    jsonLd({
      "@type": type,
      headline: title,
      description,
      url: SITE + path,
      mainEntityOfPage: SITE + path,
      image: cardImage(path),
      datePublished: published,
      dateModified: modified,
      author: PERSON,
    }),
    jsonLd({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: section.name, item: SITE + section.path },
        { "@type": "ListItem", position: 2, name: title, item: SITE + path },
      ],
    }),
  ];
}
