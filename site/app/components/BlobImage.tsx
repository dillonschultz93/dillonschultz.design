import { useEffect, useId, useRef, type ImgHTMLAttributes } from "react";

const RESTING_SHAPE = "M137 165C118 178 80 182 58 165C36 148 28 118 34 92C40 66 62 32 92 28C122 24 158 40 168 72C178 104 156 152 137 165Z";
const IDLE = 1.12; // Fills most of the frame while still reading as a blob.
const OPEN = 2.8; // Large enough that even the blob's narrowest edge clears the corners.
// Opening is unhurried so the image has time to read as growing out of the blob; closing is a little quicker.
const OPEN_DURATION = 800;
const CLOSE_DURATION = 600;
/** Ease-in-out: starts gently, unlike an ease-out, which does most of the move in the first frames. */
const ease = (p: number) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2);

/** The shape is in 200-unit space, scaled into the image's 0 to 1 box around its center. */
const transformFor = (scale: number) => {
  const s = scale * 0.005;
  const shift = 0.5 - 100 * s;
  return `translate(${shift} ${shift}) scale(${s})`;
};

/**
 * A project preview inside a drifting blob (public/blob.js moves the shape). With a pointer it
 * opens when the project is hovered or focused. On touch, where there's no hover, it opens once
 * as it scrolls into view and stays open. With reduced motion or no script it just shows in full.
 */
export function BlobImage({ seed, ...props }: ImgHTMLAttributes<HTMLImageElement> & { seed: number }) {
  const id = `blob-image-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const frame = useRef<HTMLDivElement>(null);
  const shape = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = frame.current;
    const path = shape.current;
    if (!el || !path || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let scale = IDLE;
    let raf = 0;
    const animateTo = (target: number, done?: () => void) => {
      cancelAnimationFrame(raf);
      const from = scale;
      // Scaled by the distance left, so reversing partway through doesn't take the full duration.
      const duration = (target === OPEN ? OPEN_DURATION : CLOSE_DURATION) * (Math.abs(target - from) / (OPEN - IDLE));
      const started = performance.now();
      const tick = (now: number) => {
        const p = duration ? Math.min((now - started) / duration, 1) : 1;
        scale = from + (target - from) * ease(p);
        path.setAttribute("transform", transformFor(scale));
        if (p < 1) raf = requestAnimationFrame(tick);
        else done?.();
      };
      raf = requestAnimationFrame(tick);
    };

    if (matchMedia("(hover: hover)").matches) {
      const link = el.closest("a") ?? el;
      const open = () => {
        el.dataset.open = "";
        animateTo(OPEN);
      };
      const close = () => {
        delete el.dataset.open;
        animateTo(IDLE);
      };
      link.addEventListener("mouseenter", open);
      link.addEventListener("mouseleave", close);
      link.addEventListener("focusin", open);
      link.addEventListener("focusout", close);
      return () => {
        cancelAnimationFrame(raf);
        link.removeEventListener("mouseenter", open);
        link.removeEventListener("mouseleave", close);
        link.removeEventListener("focusin", open);
        link.removeEventListener("focusout", close);
      };
    }

    // Touch: images already on screen stay in full, and the rest open as they arrive.
    if (el.getBoundingClientRect().top < innerHeight) return;
    el.classList.add("is-waiting");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        animateTo(OPEN, () => el.classList.remove("is-waiting"));
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={frame} className="blob-image" style={{ "--blob-clip": `url(#${id})` } as React.CSSProperties}>
      <svg className="blob-image-defs" data-seed={seed} aria-hidden="true" focusable="false" width="0" height="0">
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path ref={shape} d={RESTING_SHAPE} transform={transformFor(IDLE)} suppressHydrationWarning />
        </clipPath>
      </svg>
      <img {...props} alt={props.alt ?? ""} />
    </div>
  );
}
