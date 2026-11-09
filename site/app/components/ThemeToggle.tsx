import { useEffect, useState } from "react";
import { Icon } from "./ui/Icon";

export const THEME_KEY = "theme";

/**
 * Light or dark, light by default, after the QDS docs. The page always carries data-theme
 * (light in the markup, dark applied before first paint when stored), so the OS setting
 * never decides. The icon and tooltip name the theme a press switches to. Both versions are
 * rendered and CSS shows the one matching data-theme, so the static HTML is right before
 * hydration; the accessible name follows once hydrated.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.dataset.theme === "dark"), []);
  const toggle = () => {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      if (next) localStorage.setItem(THEME_KEY, "dark");
      else localStorage.removeItem(THEME_KEY);
    } catch {
      // Storage can be blocked. The theme still applies for this page view.
    }
    setDark(next);
  };
  const label = dark ? "Switch to light theme" : "Switch to dark theme";
  return (
    <button type="button" className="theme-toggle" aria-label={label} onClick={toggle}>
      <span className="theme-toggle-icon when-light"><Icon name="moon" size={20} /></span>
      <span className="theme-toggle-icon when-dark"><Icon name="sun" size={20} /></span>
      <span className="tooltip when-light" aria-hidden="true">Switch to dark theme</span>
      <span className="tooltip when-dark" aria-hidden="true">Switch to light theme</span>
    </button>
  );
}
