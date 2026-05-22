/**
 * Shared UI primitives (server-safe — no client hooks).
 * For interactive bits, use the *.client.tsx variants.
 */
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

/* ---------- Brand mark ---------- */
export function BrandLogo({ size = 52 }: { size?: number }) {
  return (
    <Image
      src="/logo-mark.jpg"
      alt="مكتب المحامي نواف بن أحمد المالكي"
      width={size}
      height={size}
      priority
      style={{ height: size, width: size, objectFit: "cover" }}
    />
  );
}

/* ---------- Section heading ---------- */
export function SectionHead({
  num, eyebrow, title, en,
}: { num: string; eyebrow: string; title: ReactNode; en: string }) {
  return (
    <div className="section-head">
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span className="num-marker">— {num}</span>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="display">{title}</h2>
      <div className="eyebrow-latin" style={{ alignSelf: "end" }}>{en}</div>
    </div>
  );
}

/* ---------- Decorative pattern ---------- */
export function DecorPattern() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: 480, height: 480,
        opacity: 0.22,
        pointerEvents: "none",
      }}
      viewBox="0 0 480 480"
      fill="none"
    >
      <circle cx="120" cy="120" r="180" stroke="var(--gold-400)" strokeWidth="0.6" />
      <circle cx="120" cy="120" r="220" stroke="var(--gold-400)" strokeWidth="0.4" />
      <circle cx="120" cy="120" r="280" stroke="var(--gold-400)" strokeWidth="0.3" />
      <circle cx="120" cy="120" r="60" stroke="var(--gold-400)" strokeWidth="0.8" />
      <line x1="0" y1="120" x2="480" y2="120" stroke="var(--gold-400)" strokeWidth="0.4" strokeDasharray="2 6" />
      <line x1="120" y1="0" x2="120" y2="480" stroke="var(--gold-400)" strokeWidth="0.4" strokeDasharray="2 6" />
    </svg>
  );
}

export function ScalesGlyph({ size = 48, color = "var(--gold-500)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <line x1="24" y1="6" x2="24" y2="42" stroke={color} strokeWidth="1.2"/>
      <line x1="8" y1="14" x2="40" y2="14" stroke={color} strokeWidth="1.2"/>
      <circle cx="24" cy="6" r="2" fill={color}/>
      <circle cx="8" cy="14" r="1.6" fill={color}/>
      <circle cx="40" cy="14" r="1.6" fill={color}/>
      <line x1="8" y1="14" x2="3" y2="26" stroke={color} strokeWidth="1"/>
      <line x1="8" y1="14" x2="13" y2="26" stroke={color} strokeWidth="1"/>
      <line x1="3" y1="26" x2="13" y2="26" stroke={color} strokeWidth="1.2"/>
      <line x1="40" y1="14" x2="35" y2="26" stroke={color} strokeWidth="1"/>
      <line x1="40" y1="14" x2="45" y2="26" stroke={color} strokeWidth="1"/>
      <line x1="35" y1="26" x2="45" y2="26" stroke={color} strokeWidth="1.2"/>
      <line x1="14" y1="42" x2="34" y2="42" stroke={color} strokeWidth="1.4"/>
      <line x1="20" y1="38" x2="28" y2="38" stroke={color} strokeWidth="1"/>
    </svg>
  );
}

/* ---------- Page hero (used by all inner pages) ---------- */
export function PageHero({
  num, eyebrow, title, lead, en,
}: { num: string; eyebrow: string; title: ReactNode; lead?: string; en?: string }) {
  return (
    <section style={{
      background: "var(--navy-800)",
      color: "var(--ivory-100)",
      padding: "180px 0 100px",
      position: "relative",
      overflow: "hidden",
    }}>
      <DecorPattern />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <span className="num-marker" style={{ color: "var(--gold-400)" }}>— {num}</span>
          <span className="eyebrow" style={{ color: "var(--gold-400)" }}>{eyebrow}</span>
        </div>
        <h1 className="display" style={{ fontSize: "clamp(44px, 7vw, 88px)", color: "var(--ivory-100)", maxWidth: 1000 }}>
          {title}
        </h1>
        {en && (
          <div className="eyebrow-latin" style={{ color: "var(--gold-300)", marginTop: 16, fontSize: 18 }}>
            {en}
          </div>
        )}
        {lead && (
          <p style={{ marginTop: 32, color: "var(--ivory-300)", fontSize: 17, maxWidth: 720, lineHeight: 1.9 }}>
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------- CTA Strip ---------- */
export function CtaStrip() {
  return (
    <section style={{ background: "var(--navy-800)", color: "var(--ivory-100)", padding: "80px 0", position: "relative", overflow: "hidden" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
        <div>
          <div className="eyebrow" style={{ color: "var(--gold-400)", marginBottom: 14 }}>ابدأ الآن</div>
          <h3 className="display" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "var(--ivory-100)" }}>
            خطوتك الأولى نحو حقّك تبدأ من هنا
          </h3>
          <p style={{ marginTop: 12, color: "var(--ivory-300)", fontSize: 15, maxWidth: 600, lineHeight: 1.8 }}>
            سجّل قضيتك أو اطلب استشارتك القانونية، وسيتولّى فريقنا المراجعة والرد خلال ٢٤ ساعة عمل.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/new-case" className="btn btn-gold">
            <span>سجّل قضيتك</span><span className="arrow"></span>
          </Link>
          <Link href="/consultation" className="btn btn-ghost-ivory">
            <span>استشارة قانونية</span><span className="arrow"></span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Service cell ---------- */
export function ServiceCell({ s }: { s: { num: string; title: string; en: string; desc: string } }) {
  return (
    <Link href="/services" className="service-cell">
      <div className="num-marker">— {s.num}</div>
      <h3 className="display" style={{ fontSize: 26, margin: "16px 0 12px" }}>{s.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.75 }}>{s.desc}</p>
      <div className="eyebrow-latin sc-en" style={{ marginTop: 20, fontSize: 12 }}>{s.en} ↗</div>
    </Link>
  );
}
