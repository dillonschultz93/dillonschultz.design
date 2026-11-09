import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "./Icon";

/** qds-modal with placement="end", on native dialog: the browser handles the inert page, focus and Escape. */
export function Drawer({ open, onClose, heading, children }: { open: boolean; onClose: () => void; heading: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="qds-drawer"
      aria-labelledby="drawer-heading"
      onClose={onClose}
      onClick={(event) => {
        // A click on the dialog element itself is a click on the backdrop.
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="qds-drawer-surface">
        <header className="qds-drawer-header">
          <h2 id="drawer-heading">{heading}</h2>
          <button type="button" autoFocus className="qds-drawer-close" aria-label="Close" onClick={onClose}><Icon name="x" /></button>
        </header>
        <div className="qds-drawer-body">{children}</div>
      </div>
    </dialog>
  );
}
