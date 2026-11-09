// The blob's shape, shared by the animation in the browser and the social cards at build time.
import { createNoise2D } from "simplex-noise";

const POINTS = 6, RADIUS = 75, DRIFT = 20;
const mulberry = (a) => () => {
  a |= 0; a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export function createBlob(seed) {
  const random = mulberry(seed * 7919);
  return {
    noise: createNoise2D(mulberry(seed * 104729)),
    offsets: Array.from({ length: POINTS }, () => [random() * 1000, random() * 1000]),
  };
}

export function shape(blob, time) {
  const pts = blob.offsets.map((o, i) => {
    const th = ((i + 1) * Math.PI * 2) / POINTS;
    return [
      100 + Math.cos(th) * RADIUS + blob.noise(o[0] + time, o[0] + time) * DRIFT,
      100 + Math.sin(th) * RADIUS + blob.noise(o[1] + time, o[1] + time) * DRIFT,
    ];
  });
  const f = (n) => n.toFixed(2);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < POINTS; i++) {
    const a = pts[(i + POINTS - 1) % POINTS], b = pts[i], c = pts[(i + 1) % POINTS], e = pts[(i + 2) % POINTS];
    d += `C${f(b[0] + (c[0] - a[0]) / 6)} ${f(b[1] + (c[1] - a[1]) / 6)} ${f(c[0] - (e[0] - b[0]) / 6)} ${f(c[1] - (e[1] - b[1]) / 6)} ${f(c[0])} ${f(c[1])}`;
  }
  return d;
}
