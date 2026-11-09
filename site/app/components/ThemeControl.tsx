import { useEffect, useState } from "react";
import { SegmentedControl } from "./ui/SegmentedControl";

const OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

/** Starts on System to match the static HTML, then reads the stored choice once hydrated. */
export function ThemeControl() {
  const [theme, setTheme] = useState("system");
  useEffect(() => {
    try {
      setTheme(localStorage.getItem("theme") ?? "system");
    } catch {
      // Storage can be blocked. The control still works for this page.
    }
    const sync = (event: Event) => setTheme((event as CustomEvent<string>).detail);
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);
  const choose = (value: string) => {
    if (value === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", value);
    try {
      if (value === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", value);
    } catch {
      // Same as above: not remembered, but applied.
    }
    window.dispatchEvent(new CustomEvent("themechange", { detail: value }));
  };
  return <SegmentedControl label="Theme" value={theme} options={OPTIONS} onChange={choose} />;
}
