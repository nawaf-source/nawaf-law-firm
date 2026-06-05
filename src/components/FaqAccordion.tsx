"use client";

import { useState } from "react";

export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ borderTop: "1px solid var(--line)" }}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--line)" }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: "100%", padding: "32px 0", textAlign: "right",
                display: "grid", gridTemplateColumns: "auto 1fr auto",
                gap: 24, alignItems: "center", cursor: "pointer",
              }}
            >
              <div className="num-marker" style={{ minWidth: 40 }}>— {String(i + 1).padStart(2, "0")}</div>
              <h3 className="display" style={{ fontSize: "clamp(20px, 2.4vw, 26px)", color: "var(--navy-800)", fontWeight: 500 }}>
                {f.q}
              </h3>
              <div style={{
                width: 36, height: 36, border: "1px solid var(--line-strong)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s var(--ease)",
                background: isOpen ? "var(--navy-800)" : "transparent",
                color: isOpen ? "var(--gold-400)" : "var(--navy-800)",
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s var(--ease)" }}>
                  <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="1.2"/>
                  <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
              </div>
            </button>
            <div style={{
              maxHeight: isOpen ? 400 : 0, overflow: "hidden",
              transition: "max-height 0.5s var(--ease)",
            }}>
              <p style={{ padding: "0 64px 36px 0", fontSize: 16, lineHeight: 2, color: "var(--ink-700)" }}>
                {f.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
