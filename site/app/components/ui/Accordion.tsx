import type { ReactNode } from "react";
import { Icon } from "./Icon";

/** qds-accordion-item on native details, so it works without script and find-in-page opens it. */
export function AccordionItem({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <details className="qds-accordion-item">
      <summary>
        <span>{heading}</span>
        <Icon name="chevron-down" />
      </summary>
      <div className="qds-accordion-panel">{children}</div>
    </details>
  );
}
