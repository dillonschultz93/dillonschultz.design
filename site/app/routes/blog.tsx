import { useSearchParams } from "react-router";
import type { Route } from "./+types/blog";
import { ArticleRow } from "../components/ArticleRow";
import { Blob } from "../components/Blob";
import { FilterChip } from "../components/ui/Chip";
import { Pagination } from "../components/ui/Pagination";
import { getArticles } from "../lib/sanity.server";
import { pageMeta } from "../lib/seo";

const PER_PAGE = 10;
const DESCRIPTION = "Short notes and longer essays on design systems, design tokens and building with AI.";

export async function loader() {
  return { articles: await getArticles() };
}

export const meta: Route.MetaFunction = () => pageMeta({ title: "Writing", description: DESCRIPTION, path: "/blog" });

const FILTERS = [
  { value: "all", label: "All" },
  { value: "note", label: "Notes" },
  { value: "essay", label: "Essays" },
];

export default function Blog({ loaderData }: Route.ComponentProps) {
  const [params, setParams] = useSearchParams();
  const format = params.get("format") ?? "all";
  const filtered = loaderData.articles.filter((a) => format === "all" || a.format === format);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(Math.max(1, Number(params.get("page")) || 1), pages);
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const query = format === "all" ? "" : `format=${format}&`;
  return (
    <>
      <section className="blog-intro gutter">
        <Blob seed={2} className="blog-blob" />
        <h1 className="display">Writing</h1>
        <p className="title">{DESCRIPTION}</p>
      </section>
      <section className="section section--tight gutter">
        {loaderData.articles.length ? (
          <>
            <div className="tags" role="group" aria-label="Filter by format">
              {FILTERS.map((f) => (
                <FilterChip key={f.value} selected={format === f.value} onClick={() => setParams(f.value === "all" ? {} : { format: f.value }, { preventScrollReset: true })}>{f.label}</FilterChip>
              ))}
            </div>
            <div className="article-list">{shown.map((a) => <ArticleRow key={a.slug} article={a} />)}</div>
            {pages > 1 ? <Pagination total={pages} current={page} href={`/blog?${query}page={page}`} /> : null}
          </>
        ) : (
          <p className="subtle empty-state">The first posts are on their way.</p>
        )}
      </section>
    </>
  );
}
