import { Link } from "./TransitionLink";
import { Button } from "./ui/Button";

export function SiteFooter() {
  return (
    <footer className="site-footer gutter">
      <div className="footer-signoff">
        <p className="headline">Thanks for stopping by!</p>
        <p className="subtle">My résumé has the long version, and LinkedIn is the easiest place to say hello.</p>
        <div className="actions">
          <Button href="/resume">My résumé</Button>
          <Button href="https://linkedin.com/in/dillonschultz" variant="secondary">My LinkedIn</Button>
        </div>
      </div>
      <div className="footer-links">
        <nav aria-label="Site">
          <span className="meta">Site</span>
          <Link to="/#work">Work</Link>
          <Link to="/blog">Writing</Link>
          <Link to="/resume">Résumé</Link>
        </nav>
        <nav aria-label="Elsewhere">
          <span className="meta">Elsewhere</span>
          <a href="https://www.instagram.com/dill.schultz/">Instagram</a>
          <a href="https://github.com/dillonschultz93">GitHub</a>
        </nav>
      </div>
      <p className="meta footer-legal">© {new Date().getFullYear()} Dillon Schultz</p>
    </footer>
  );
}
