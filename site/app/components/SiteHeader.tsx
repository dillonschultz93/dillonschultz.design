import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link, NavLink } from "./TransitionLink";
import { Blob } from "./Blob";
import { Button } from "./ui/Button";
import { Drawer } from "./ui/Drawer";
import { ThemeToggle } from "./ThemeToggle";

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/dill.schultz/" },
  { label: "GitHub", href: "https://github.com/dillonschultz93" },
  { label: "LinkedIn", href: "https://linkedin.com/in/dillonschultz" },
];

function NavLinks() {
  const { pathname } = useLocation();
  return (
    <>
      <Link to="/#work" aria-current={pathname.startsWith("/projects") ? "page" : undefined}>Work</Link>
      <NavLink to="/blog">Writing</NavLink>
      <NavLink to="/resume">Résumé</NavLink>
    </>
  );
}

// Lives in the root layout, so the logo mark is never unmounted by a client navigation.
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location.key]);
  return (
    <header className="site-header gutter">
      <Link className="brand" to="/">
        <Blob seed={11} className="mark" />
        dillonschultz.design
      </Link>
      <nav className="site-nav" aria-label="Main">
        <NavLinks />
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <Button className="menu-button" variant="secondary" size="sm" aria-haspopup="dialog" onClick={() => setMenuOpen(true)}>Menu</Button>
      </div>
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} heading="Menu">
        <nav className="drawer-nav" aria-label="Main"><NavLinks /></nav>
        <div className="drawer-group drawer-social">
          <span className="meta">Elsewhere</span>
          {SOCIAL.map((s) => <a key={s.href} href={s.href}>{s.label}</a>)}
        </div>
        <Blob seed={13} className="drawer-blob" />
      </Drawer>
    </header>
  );
}
