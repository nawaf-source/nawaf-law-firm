"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

/** Scroll-reveal wrapper. Fades children in when they enter the viewport. */
export function Reveal({
  children, delay = 0, className = "", style,
}: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}
