/* ============================================
   Lightweight scroll-motion layer (no dependencies).
   Provides: shared rAF scroll bus, reduced-motion guard,
   and a single-node Parallax layer. Used to add cinematic
   motion on top of the existing markup without touching
   content, fonts, colors, or the forms/API.
   ============================================ */

import React, { useRef, useEffect } from "react";

const subs = new Set();
let ticking = false;

function flush() {
  ticking = false;
  subs.forEach((fn) => {
    try { fn(); } catch (e) {}
  });
}
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(flush);
}

/** Subscribe a callback to the shared scroll/resize loop. Returns an unsubscribe fn. */
export function subscribe(fn) {
  if (typeof window === "undefined") return () => {};
  if (subs.size === 0) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }
  subs.add(fn);
  fn(); // prime initial state
  return () => {
    subs.delete(fn);
    if (subs.size === 0) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
  };
}

export function reduceMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function isMobile() {
  return typeof window !== "undefined" && window.innerWidth <= 900;
}

/**
 * Single-DOM-node parallax layer. Renders a <div> with the given
 * className/style and translates it as it passes through the viewport.
 * `speed` ~ fraction of viewport height to drift across full travel.
 */
export function ParallaxLayer({ speed = 0.12, axis = "y", className = "", style = {}, children = null }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion() || isMobile()) return;
    const base = style.transform ? style.transform + " " : "";
    const update = () => {
      const r = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = r.top + r.height / 2;
      const prog = (center - vh / 2) / (vh / 2 + r.height / 2); // -1..1
      const move = -prog * speed * 100;
      node.style.transform =
        base + (axis === "x" ? `translate3d(${move}px,0,0)` : `translate3d(0,${move}px,0)`);
    };
    return subscribe(update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, axis]);
  return (
    <div ref={ref} className={className} style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}
