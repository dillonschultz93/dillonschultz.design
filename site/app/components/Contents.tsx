import { useEffect, useState } from "react";
import type { Heading } from "../lib/types";
import { AccordionItem } from "./ui/Accordion";

const List = ({ headings, current }: { headings: Heading[]; current?: string }) => (
  <ul className="contents-list">
    {headings.map((h) => <li key={h.id}><a href={`#${h.id}`} aria-current={h.id === current ? "location" : undefined}>{h.text}</a></li>)}
  </ul>
);

/** Marks the section being read: the last heading that has passed the upper part of the screen. */
function useCurrentHeading(headings: Heading[]) {
  const [current, setCurrent] = useState(headings[0]?.id);
  useEffect(() => {
    const update = () => {
      let active = headings[0]?.id;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.3) active = h.id;
      }
      setCurrent(active);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, [headings]);
  return current;
}

export function ContentsRail({ headings }: { headings: Heading[] }) {
  const current = useCurrentHeading(headings);
  return (
    <nav className="contents-rail" aria-label="On this page">
      <span className="meta">On this page</span>
      <List headings={headings} current={current} />
    </nav>
  );
}

export const ContentsAccordion = ({ headings }: { headings: Heading[] }) => (
  <div className="contents-accordion"><AccordionItem heading="On this page"><List headings={headings} /></AccordionItem></div>
);
