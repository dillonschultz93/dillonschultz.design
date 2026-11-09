import { Link } from "./TransitionLink";
import type { NavLinkData } from "../lib/types";

export function PostPager({ previous, next, base, label }: { previous: NavLinkData; next: NavLinkData; base: string; label: string }) {
  if (!previous && !next) return null;
  return (
    <nav className="post-pager" aria-label={label}>
      {previous ? <Link to={`${base}/${previous.slug}`}><span className="meta">Previous</span>{previous.title}</Link> : <span />}
      {next ? <Link className="post-pager-next" to={`${base}/${next.slug}`}><span className="meta">Next</span>{next.title}</Link> : <span />}
    </nav>
  );
}
