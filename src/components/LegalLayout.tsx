import Link from "next/link";
import { PageHero, CtaStrip } from "@/components/Shared";
import { Reveal } from "@/components/Reveal";

export default function LegalLayout({
  hero, sections,
}: { hero: React.ReactNode; sections: { num: string; title: string; body: string }[] }) {
  return (
    <>
      {hero}
      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container" style={{ maxWidth: 980 }}>
          <Reveal>
            <div className="legal-toc" style={{
              display: "grid", gridTemplateColumns: "240px 1fr", gap: 48,
              paddingBottom: 56, borderBottom: "1px solid var(--line)", marginBottom: 80,
            }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 14 }}>— الفهرس</div>
                <div className="hairline-strong" style={{ width: 60 }}></div>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {sections.map((s) => (
                  <li key={s.num}>
                    <Link href={`#sec-${s.num}`} style={{
                      display: "grid", gridTemplateColumns: "auto 1fr",
                      gap: 16, padding: "10px 0",
                      borderBottom: "1px dashed var(--line)",
                      color: "var(--navy-800)",
                    }}>
                      <span className="num-marker">— {s.num}</span>
                      <span style={{ fontSize: 15 }}>{s.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {sections.map((s, i) => (
            <Reveal key={s.num} delay={Math.min(i * 60, 240)}>
              <div id={`sec-${s.num}`} className="legal-sec" style={{
                display: "grid", gridTemplateColumns: "240px 1fr", gap: 48,
                padding: "48px 0", borderBottom: "1px solid var(--line)",
              }}>
                <div>
                  <div className="num-marker" style={{ fontSize: 16 }}>— {s.num}</div>
                  <h3 className="display" style={{ fontSize: 28, color: "var(--navy-800)", marginTop: 12, lineHeight: 1.2 }}>
                    {s.title}
                  </h3>
                </div>
                <p style={{ fontSize: 16, lineHeight: 2, color: "var(--ink-700)" }}>{s.body}</p>
              </div>
            </Reveal>
          ))}

          <div style={{ marginTop: 56, textAlign: "center" }}>
            <div className="eyebrow-latin">Last updated · آخر تحديث</div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 18, color: "var(--navy-800)", marginTop: 6 }}>
              ٢٢ مايو ٢٠٢٦ — Riyadh
            </div>
          </div>

          <style>{`
            @media (max-width: 800px) {
              .legal-toc, .legal-sec { grid-template-columns: 1fr !important; gap: 16px !important; }
            }
          `}</style>
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
