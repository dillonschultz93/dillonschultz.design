// The shape comes from the wall clock rather than a frame counter, so a blob looks continuous
// across a client navigation or a full page load. Registering is idempotent, and blobs removed
// from the DOM are dropped on the next frame.
import { createBlob, shape } from "./blob-shape.js";

const SPEED = 0.000048;
let blobs = [];
const still = matchMedia("(prefers-reduced-motion: reduce)");

const now = () => (still.matches ? 0 : Date.now() * SPEED);
let running = false;
function frame() {
  blobs = blobs.filter((b) => b.el.isConnected);
  const t = now();
  for (const b of blobs) b.el.setAttribute("d", shape(b, t));
  if (still.matches || !blobs.length) { running = false; return; }
  requestAnimationFrame(frame);
}
function start() {
  if (!running) { running = true; requestAnimationFrame(frame); }
}
still.addEventListener("change", start);
function register(el) {
  if (blobs.some((b) => b.el === el)) return;
  const blob = { el, ...createBlob(Number(el.closest("svg").dataset.seed ?? 1)) };
  blobs.push(blob);
  el.setAttribute("d", shape(blob, now()));
  start();
}
// Runs in <head>, so this sees blobs as the parser or React adds them, before they paint.
new MutationObserver((records) => {
  for (const record of records) {
    for (const node of record.addedNodes) {
      if (node.nodeType !== 1) continue;
      if (node.matches("svg[data-seed] path")) register(node);
      else node.querySelectorAll("svg[data-seed] path").forEach(register);
    }
  }
}).observe(document.documentElement, { childList: true, subtree: true });
