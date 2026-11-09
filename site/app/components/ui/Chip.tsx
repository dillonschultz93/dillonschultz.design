import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function Chip({ variant = "neutral", children }: { variant?: "neutral" | "info" | "success" | "warning" | "error"; children: ReactNode }) {
  return <span className={`qds-chip qds-chip--${variant}`}>{children}</span>;
}

/** qds-chip selectable: a toggle button announced as pressed or not. */
export function FilterChip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className="qds-chip qds-chip--selectable" aria-pressed={selected} onClick={onClick}>
      {selected ? <Icon name="check" size={12} /> : null}
      {children}
    </button>
  );
}
