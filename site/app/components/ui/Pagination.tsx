import { Link } from "react-router";
import { Icon } from "./Icon";

/** qds-pagination in link mode: href is a template, with {page} replaced by the number. */
export function Pagination({ total, current, href, label = "Pages" }: { total: number; current: number; href: string; label?: string }) {
  const to = (page: number) => href.replaceAll("{page}", String(page));
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav className="qds-pagination" aria-label={label}>
      {current > 1 ? <Link to={to(current - 1)} aria-label="Previous page"><Icon name="chevron-left" /></Link> : <span className="is-disabled" aria-hidden="true"><Icon name="chevron-left" /></span>}
      {pages.map((p) => (
        <Link key={p} to={to(p)} aria-current={p === current ? "page" : undefined}>{p}</Link>
      ))}
      {current < total ? <Link to={to(current + 1)} aria-label="Next page"><Icon name="chevron-right" /></Link> : <span className="is-disabled" aria-hidden="true"><Icon name="chevron-right" /></span>}
    </nav>
  );
}
