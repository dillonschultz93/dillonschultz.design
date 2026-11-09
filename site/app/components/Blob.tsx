import type { CSSProperties } from "react";

// Used when script is off. The runtime in public/blob.js takes over before first paint,
// and finds blobs by their data-seed, including ones added by a client navigation.
const RESTING_SHAPE = "M137 165C118 178 80 182 58 165C36 148 28 118 34 92C40 66 62 32 92 28C122 24 158 40 168 72C178 104 156 152 137 165Z";

export function Blob({ seed, className, style }: { seed: number; className?: string; style?: CSSProperties }) {
  return (
    <svg className={`blob ${className ?? ""}`} style={style} data-seed={seed} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`blob-${seed}`} gradientTransform="rotate(90)">
          <stop offset="0" stopColor="var(--qds-semantic-color-background-primary-rest)" />
          <stop offset="1" stopColor="var(--qds-semantic-color-background-info)" />
        </linearGradient>
      </defs>
      <path fill={`url(#blob-${seed})`} d={RESTING_SHAPE} suppressHydrationWarning />
    </svg>
  );
}
