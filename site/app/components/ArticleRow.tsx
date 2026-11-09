import { Link } from "./TransitionLink";
import { monthYear } from "../lib/format";
import type { ArticleSummary } from "../lib/types";
import { Chip } from "./ui/Chip";

export function ArticleRow({ article }: { article: ArticleSummary }) {
  return (
    <Link className="article-row" to={`/blog/${article.slug}`}>
      <span className="data article-date">{monthYear(article.publishedAt)}</span>
      <span className="article-text">
        <h3 className="title">{article.title}</h3>
        <span className="subtle">{article.excerpt}</span>
      </span>
      <span className="article-meta">
        <Chip>{article.format === "essay" ? "Essay" : "Note"}</Chip>
        <span className="meta">{article.minutes} min read</span>
      </span>
    </Link>
  );
}
