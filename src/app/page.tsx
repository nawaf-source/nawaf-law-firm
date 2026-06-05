import Link from "next/link";
import Image from "next/image";
import { SERVICES, WHY_US, PROCESS } from "@/lib/data";
import { CtaStrip, DecorPattern, ScalesGlyph, SectionHead, ServiceCell } from "@/components/Shared";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        background: "var(--navy-800)",
        color: "var(--ivory-100)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        paddingTop: 140,
        paddingBottom: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(900px 600px at 10% 20%, rgba(184,146,74,0.10), transparent 60%), radial-gradient(700px 500px at 90% 90%, rgba(28,50,88,0.6), transparent 60%)",
          pointerEvents: "none",
        }} />
        <DecorPattern />

        <Image
          src="/logo-mark.jpg"
          alt=""
          aria-hidden="true"
          width={760}
          height={760}
          style={{
            position: "absolute",
            left: "-8%",
            top: "50%",
            transform: "translateY(-50%)",
            width: 760,
            height: 760,
            opacity: 0.08,
            mixBlendMode: "screen",
            pointerEvents: "none",
            filter: "saturate(0)",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-grid" style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 320px",
            gap: 48,
            alignItems: "end",
          }}>
            <div className="fade-in">
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <span className="num-marker" style={{ color: "var(--gold-400)" }}>— 2026 / RYD</span>
                <span className="eyebrow" style={{ color: "var(--gold-400)" }}>Saudi Law Firm</span>
              </div>

              <h1 className="display" style={{ fontSize: "clamp(48px, 8vw, 112px)", lineHeight: 1.05, marginBottom: 28 }}>
                <span className="silver-grad">نحمل عنك</span>
                <br />
                <span style={{ color: "var(--ivory-100)" }}>عبء القضية</span>
                <span style={{ color: "var(--gold-400)", fontFamily: "var(--f-serif)" }}>…</span>
                <br />
                <span className="serif" style={{ fontStyle: "italic", color: "var(--gold-300)", fontWeight: 400 }}>
                  ونسير بك في كل خطوة
                </span>
              </h1>

              <p style={{ color: "var(--ivory-300)", fontSize: 18, lineHeight: 1.9, maxWidth: 620, marginBottom: 40 }}>
                نقدم خدمات قانونية متكاملة للأفراد والشركات، تجمع بين الخبرة القانونية،
                السرية التامة، والدقة في التعامل مع القضايا وفق الأنظمة السعودية.
              </p>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/new-case" className="btn btn-gold">
                  <span>سجّل قضيتك الآن</span><span className="arrow"></span>
                </Link>
                <Link href="/consultation" className="btn btn-ghost-ivory">
                  <span>اطلب استشارة قانونية</span><span className="arrow"></span>
                </Link>
              </div>
            </div>

            <div className="fade-in fade-in-delay-2" style={{
              borderInlineStart: "1px solid rgba(184,146,74,0.4)",
              paddingInlineStart: 32,
            }}>
              <div style={{ marginBottom: 36 }}>
                <div className="eyebrow-latin" style={{ color: "var(--gold-300)" }}>— Mandate</div>
                <p className="serif" style={{
                  fontSize: 20, lineHeight: 1.7, color: "var(--ivory-100)",
                  marginTop: 12, fontStyle: "italic",
                }}>
                  «ترسيخ مبادئ العدالة من خلال حلول قانونية دقيقة، تجمع بين الفهم العميق للشريعة والأنظمة الحديثة.»
                </p>
              </div>

              <div className="hairline" style={{ background: "rgba(184,146,74,0.3)", marginBottom: 28 }}></div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <Stat num="09" label="مجال تخصص" />
                <Stat num="24h" label="مدة الردّ" />
                <Stat num="100%" label="سرّية مهنية" />
                <Stat num="KSA" label="نطاق العمل" />
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, zIndex: 2 }}>
          <div className="container" style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontSize: 11, letterSpacing: "0.2em", color: "var(--ivory-300)", textTransform: "uppercase",
          }}>
            <span style={{ fontFamily: "var(--f-latin)", fontStyle: "italic", textTransform: "none", fontSize: 13 }}>
              Veritas · Diligentia · Fides
            </span>
            <span>الرياض — المملكة العربية السعودية</span>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .hero-grid > div:last-child {
            border-inline-start: none !important;
            padding-inline-start: 0 !important;
            border-top: 1px solid rgba(184,146,74,0.3);
            padding-top: 40px;
          }
        }
      `}</style>

      {/* ABOUT BRIEF */}
      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container">
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 20 }}>— 01 / نبذة عن المكتب</div>
              <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.1, color: "var(--navy-800)" }}>
                التخصّص القانوني<br/>
                <span className="serif" style={{ fontStyle: "italic", color: "var(--gold-600)" }}>أساسٌ</span>{" "}
                لقرارات سليمة.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ fontSize: 17, lineHeight: 2, color: "var(--ink-700)" }}>
                نحن في مكتب المحامي <strong style={{ color: "var(--navy-800)" }}>نواف بن أحمد المالكي</strong> نؤمن بأن
                التخصص القانوني والمعرفة الدقيقة بالأنظمة السعودية أساسٌ لتقديم حلول قانونية فعّالة. نمثّل عملاءنا بكفاءة أمام
                الجهات المختصة، ونقدم الاستشارات القانونية، ونصوغ العقود، ونعالج النزاعات التجارية والعقارية والعمالية وغيرها.
              </p>
              <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 10 }}>الرؤية</div>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--ink-700)" }}>
                    تحقيق العدالة بشكل يضمن القيم الأخلاقية والمبادئ الشرعية، عبر استشارات قانونية مبنية على التحليل العميق والالتزام بالمهنة.
                  </p>
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 10 }}>الرسالة</div>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--ink-700)" }}>
                    ترسيخ مبادئ العدالة بحلول قانونية دقيقة تجمع بين الشريعة والأنظمة الحديثة، بالثقة والشفافية والمسؤولية المهنية.
                  </p>
                </div>
              </div>
              <Link href="/about" className="btn btn-ghost-navy" style={{ marginTop: 36 }}>
                <span>تعرّف على المكتب</span><span className="arrow"></span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>

      {/* SERVICES */}
      <section className="section" style={{ background: "var(--ivory-50)" }}>
        <div className="container">
          <SectionHead num="02" eyebrow="خدماتنا القانونية" title="مجالات الممارسة" en="Practice Areas" />
          <div className="svc-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
            borderTop: "1px solid var(--line)", borderInlineStart: "1px solid var(--line)",
          }}>
            {SERVICES.slice(0, 6).map((s) => <ServiceCell key={s.id} s={s} />)}
          </div>
          <style>{`
            @media (max-width: 900px) { .svc-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px) { .svc-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          <div style={{ marginTop: 56, textAlign: "center" }}>
            <Link href="/services" className="btn btn-ghost-navy">
              <span>عرض كل المجالات (١١ مجالاً)</span><span className="arrow"></span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section" style={{ background: "var(--navy-800)", color: "var(--ivory-100)", position: "relative", overflow: "hidden" }}>
        <DecorPattern />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <SectionHead num="03" eyebrow="لماذا تختارنا" title={<span style={{ color: "var(--ivory-100)" }}>أربعة أعمدة <span className="serif" style={{ fontStyle: "italic", color: "var(--gold-400)" }}>للثقة</span></span>} en="Why Us" />
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
            {WHY_US.map((w, i) => (
              <Reveal key={w.num} delay={i * 80}>
                <div style={{
                  padding: "0 28px",
                  borderInlineEnd: i < WHY_US.length - 1 ? "1px solid rgba(184,146,74,0.25)" : "none",
                  minHeight: 260,
                }}>
                  <div className="serif" style={{ fontSize: 56, color: "var(--gold-400)", fontStyle: "italic", lineHeight: 1, marginBottom: 24 }}>
                    {w.num}
                  </div>
                  <h3 className="display" style={{ fontSize: 24, marginBottom: 14, color: "var(--ivory-100)" }}>{w.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--ivory-300)" }}>{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <style>{`
            @media (max-width: 900px) {
              .why-grid { grid-template-columns: 1fr 1fr !important; gap: 40px 0 !important; }
              .why-grid > div > div { border-inline-end: none !important; }
            }
            @media (max-width: 560px) { .why-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container">
          <SectionHead num="04" eyebrow="خطوات العمل" title="من الطلب إلى الحكم" en="Our Process" accent="gold" accentSize={113} accentStyle={{ margin: "18px -100px -11px 228px" }} />
          <div className="proc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, position: "relative" }}>
            <div style={{ position: "absolute", top: 30, right: 40, left: 40, height: 1, background: "var(--line)", zIndex: 0 }}></div>
            {PROCESS.map((p, i) => (
              <Reveal key={p.num} delay={i * 100}>
                <div style={{ position: "relative", paddingInlineEnd: 24 }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 0,
                    border: "1px solid var(--gold-500)", background: "var(--ivory-100)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--f-latin)", fontStyle: "italic", fontSize: 22,
                    color: "var(--gold-600)", position: "relative", zIndex: 1, marginBottom: 28,
                  }}>{p.num}</div>
                  <h3 className="display" style={{ fontSize: 22, marginBottom: 12, color: "var(--navy-800)" }}>{p.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--ink-700)" }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <style>{`
            @media (max-width: 900px) { .proc-grid { grid-template-columns: 1fr 1fr !important; gap: 40px 24px !important; } }
            @media (max-width: 560px) { .proc-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </div>
      </section>

      {/* CONFIDENTIALITY */}
      <section style={{
        background: "linear-gradient(135deg, var(--navy-700) 0%, var(--navy-900) 100%)",
        color: "var(--ivory-100)", padding: "140px 0", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -200, top: "50%", transform: "translateY(-50%)", opacity: 0.06 }}>
          <ScalesGlyph size={520} color="var(--gold-300)" />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 720 }}>
            <div className="eyebrow" style={{ color: "var(--gold-400)", marginBottom: 24 }}>— 05 / سرّية وخصوصية</div>
            <h2 className="display" style={{ fontSize: "clamp(36px, 5.5vw, 64px)", lineHeight: 1.1 }}>
              ما يُؤتمن عليه المكتب<br/>
              <span className="serif" style={{ fontStyle: "italic", color: "var(--gold-400)", fontWeight: 400 }}>يبقى داخل جدرانه.</span>
            </h2>
            <p style={{ marginTop: 32, fontSize: 17, lineHeight: 1.9, color: "var(--ivory-300)", maxWidth: 620 }}>
              نلتزم بأعلى معايير السرّية المهنية. جميع البيانات والمستندات تُعامل بسرّية تامة وفق نظام المحاماة السعودي ولا يتم الإفصاح عنها إلا بناءً على متطلب نظامي صريح.
            </p>
            <div style={{ display: "flex", gap: 40, marginTop: 48, flexWrap: "wrap" }}>
              <ConfBadge label="حماية الملفات" sub="تشفير عند النقل" />
              <ConfBadge label="السرّية المهنية" sub="بموجب نظام المحاماة" />
              <ConfBadge label="عدم الإفصاح" sub="إلا بأمر مختص" />
            </div>
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="display" style={{ fontSize: 32, color: "var(--gold-400)", fontWeight: 500 }}>{num}</div>
      <div style={{ fontSize: 12, color: "var(--ivory-300)", letterSpacing: "0.1em", marginTop: 6 }}>{label}</div>
    </div>
  );
}

function ConfBadge({ label, sub }: { label: string; sub: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 8, height: 8, background: "var(--gold-400)", transform: "rotate(45deg)" }} />
      <div>
        <div style={{ fontSize: 15, color: "var(--ivory-100)", fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 12, color: "var(--ivory-300)", marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}
