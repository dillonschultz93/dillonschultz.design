import { useId } from "react";

/** qds-segmented-control: native radio inputs, so arrow keys and forms work without script. */
export function SegmentedControl({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (value: string) => void }) {
  const name = useId();
  return (
    <div className="qds-segmented" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <label key={o.value} className="qds-segment">
          <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  );
}
