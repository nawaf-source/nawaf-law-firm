import { PageHero, CtaStrip } from "@/components/Shared";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: "من نحن — مكتب المالكي" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        num="01"
        eyebrow="من نحن"
        title={<><span style={{ color: "var(--ivory-100)" }}>مكتبٌ يؤمن بأن</span><br/><span className="serif" style={{ fontStyle: "italic", color: "var(--gold-300)" }}>التخصّص</span> طريق العدالة.</>}
        en="About the Firm"
        lead="نحن في مكتب المحامي نواف بن أحمد المالكي نؤمن بأن التخصص القانوني والمعرفة الدقيقة بالأنظمة السعودية أساسٌ لتقديم حلول قانونية فعّالة لعملائنا."
      />

      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container">
          <div className="about-cols" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 64 }}>
            <Reveal>
              <div className="eyebrow">— مبادئنا</div>
              <div className="hairline-strong" style={{ width: 60, marginTop: 16 }}></div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="display" style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.3, color: "var(--navy-800)" }}>
                نمثّل عملاءنا بكفاءة أمام الجهات المختصة، ونقدّم الاستشارات القانونية، ونصوغ
                العقود، ونعالج النزاعات التجارية والعقارية والعمالية وفق الأنظمة السعودية المعتمدة.
              </h2>
            </Reveal>
          </div>

          <div className="vm-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 96 }}>
            <Reveal>
              <div style={{ background: "var(--ivory-50)", padding: 48, borderTop: "2px solid var(--gold-500)", height: "100%" }}>
                <div className="num-marker">— الرؤية / Vision</div>
                <h3 className="display" style={{ fontSize: 32, marginTop: 14, marginBottom: 20, color: "var(--navy-800)" }}>الرؤية</h3>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: "var(--ink-700)" }}>
                  نسعى إلى تحقيق العدالة بشكل يضمن القيم الأخلاقية والمبادئ الشرعية، من خلال تقديم
                  استشارات قانونية مبنية على التحليل العميق والالتزام الكامل بمعايير المهنة.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ background: "var(--navy-800)", padding: 48, borderTop: "2px solid var(--gold-500)", color: "var(--ivory-100)", height: "100%" }}>
                <div className="num-marker" style={{ color: "var(--gold-400)" }}>— الرسالة / Mission</div>
                <h3 className="display" style={{ fontSize: 32, marginTop: 14, marginBottom: 20 }}>الرسالة</h3>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: "var(--ivory-300)" }}>
                  ترسيخ مبادئ العدالة من خلال حلول قانونية دقيقة، تجمع بين الفهم العميق للشريعة
                  والأنظمة الحديثة، وتقديم خدمات قانونية مبنية على الثقة والشفافية والمسؤولية المهنية.
                </p>
              </div>
            </Reveal>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .about-cols { grid-template-columns: 1fr !important; gap: 24px !important; }
              .vm-grid { grid-template-columns: 1fr !important; gap: 24px !important; margin-top: 56px !important; }
            }
          `}</style>
        </div>
      </section>

      <section className="section" style={{ background: "var(--ivory-50)" }}>
        <div className="container">
          <div className="founder-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "center" }}>
            <Reveal>
              <div style={{
                aspectRatio: "3/4",
                background: "linear-gradient(135deg, var(--navy-700), var(--navy-900))",
                position: "relative", overflow: "hidden",
                border: "1px solid var(--line)",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "url(/logo-pattern-tile.jpg)",
                  backgroundRepeat: "repeat",
                  backgroundSize: "auto 220px",
                  opacity: 0.28,
                  animation: "founderPatternDrift 30s linear infinite, patternGlow 6s ease-in-out infinite",
                }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(115deg, transparent 30%, rgba(232,204,146,0.25) 44%, rgba(255,247,224,0.6) 50%, rgba(232,204,146,0.25) 56%, transparent 70%)",
                  mixBlendMode: "screen",
                  animation: "patternLightSweep 5s ease-in-out infinite",
                  pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, rgba(10,20,40,0.35) 0%, rgba(5,14,28,0.6) 100%)",
                }} />
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: "92%", aspectRatio: "1",
                  transform: "translate(-50%, -50%)",
                  background: "conic-gradient(from 0deg, transparent 0deg, rgba(217,184,114,0.18) 60deg, transparent 120deg, rgba(208,210,215,0.16) 200deg, transparent 280deg, rgba(217,184,114,0.14) 340deg, transparent 360deg)",
                  borderRadius: "50%",
                  filter: "blur(22px)",
                  animation: "haloSpin 18s linear infinite",
                  zIndex: 0,
                }} />
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: "70%", aspectRatio: "1",
                  transform: "translate(-50%, -50%)",
                  background: "radial-gradient(circle, rgba(232,204,146,0.22) 0%, transparent 65%)",
                  borderRadius: "50%",
                  animation: "glowPulse 5s ease-in-out infinite",
                  zIndex: 0,
                }} />
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: "1px", height: "1px",
                  transform: "translate(-50%, -50%)",
                  animation: "orbitSpin 14s linear infinite",
                  zIndex: 1,
                }}>
                  {[0, 72, 144, 216, 288].map((deg, i) => (
                    <span key={i} style={{
                      position: "absolute", top: 0, left: 0,
                      width: 4 + (i % 2) * 2, height: 4 + (i % 2) * 2,
                      borderRadius: "50%",
                      background: i % 2 ? "rgba(232,204,146,0.95)" : "rgba(220,224,232,0.9)",
                      boxShadow: "0 0 10px rgba(232,204,146,0.8)",
                      transform: `rotate(${deg}deg) translateX(140px)`,
                      animation: `sparkTwinkle ${3 + (i % 3)}s ease-in-out ${-i * 0.6}s infinite`,
                    }} />
                  ))}
                </div>
                <div style={{
                  position: "absolute", inset: 0,
                  perspective: "1100px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  zIndex: 2,
                }}>
                  <div style={{
                    position: "relative", width: "78%",
                    transformStyle: "preserve-3d",
                    animation: "logo3DFloat 8s ease-in-out infinite",
                  }}>
                    <img src="/logo-mark-transparent.png" alt="مكتب المحامي نواف بن أحمد المالكي" style={{
                      width: "100%", height: "auto", objectFit: "contain", display: "block",
                      filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.6))",
                    }} />
                  </div>
                </div>
                <div style={{
                  position: "absolute", bottom: 24, right: 24,
                  color: "var(--ivory-100)", fontSize: 12,
                  letterSpacing: "0.2em", textTransform: "uppercase", zIndex: 3,
                }}>
                  ١٤٤٧هـ — مكتب المالكي
                </div>
                <style>{`
                  @keyframes founderPatternDrift {
                    from { background-position: 0 0; }
                    to { background-position: -200px 0; }
                  }
                  @keyframes patternGlow {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 0.36; }
                  }
                  @keyframes patternLightSweep {
                    0% { transform: translateX(-80%); opacity: 0; }
                    30% { opacity: 1; }
                    70% { opacity: 1; }
                    100% { transform: translateX(80%); opacity: 0; }
                  }
                  @keyframes logo3DFloat {
                    0%   { transform: translateY(0) rotateX(0deg) rotateY(-13deg) rotateZ(-1deg); }
                    25%  { transform: translateY(-12px) rotateX(7deg) rotateY(-4deg) rotateZ(0deg); }
                    50%  { transform: translateY(0) rotateX(0deg) rotateY(13deg) rotateZ(1deg); }
                    75%  { transform: translateY(-12px) rotateX(-7deg) rotateY(4deg) rotateZ(0deg); }
                    100% { transform: translateY(0) rotateX(0deg) rotateY(-13deg) rotateZ(-1deg); }
                  }
                  @keyframes haloSpin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                  }
                  @keyframes glowPulse {
                    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.9); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                  }
                  @keyframes orbitSpin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                  }
                  @keyframes sparkTwinkle {
                    0%, 100% { opacity: 0.35; }
                    50% { opacity: 1; }
                  }
                  @media (prefers-reduced-motion: reduce) {
                    [style*="founderPatternDrift"], [style*="logo3DFloat"], [style*="haloSpin"],
                    [style*="glowPulse"], [style*="orbitSpin"], [style*="sparkTwinkle"],
                    [style*="patternGlow"], [style*="patternLightSweep"] { animation: none !important; }
                  }
                `}</style>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="eyebrow">— الكلمة الافتتاحية</div>
              <h2 className="display" style={{ fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1.2, color: "var(--navy-800)", margin: "16px 0 28px" }}>
                «العدالة التزامٌ، لا شعار.»
              </h2>
              <p style={{ fontSize: 17, lineHeight: 2, color: "var(--ink-700)", marginBottom: 24 }}>
                منذ نشأة المكتب وحتى اليوم، آمنّا بأن العمل القانوني ليس مجرد ممارسةٍ مهنية،
                بل أمانةٌ تُمارَس بإتقانٍ ومسؤولية. التزامنا تجاه كل عميل هو نفسه التزامنا تجاه أصل القضية:
                البحث الجاد، الدقة في التحليل، والوضوح في التواصل.
              </p>
              <p style={{ fontSize: 17, lineHeight: 2, color: "var(--ink-700)", marginBottom: 36 }}>
                نعمل في خدمة الفرد والشركة وفق الأنظمة السعودية، ونلتزم بأن نُسهم في رفع مستوى
                الثقافة القانونية لكل من يطرق أبواب المكتب.
              </p>
              <div className="serif" style={{ fontSize: 32, color: "var(--gold-600)", fontStyle: "italic", fontWeight: 400 }}>
                نواف بن أحمد المالكي
              </div>
              <div className="eyebrow-latin" style={{ marginTop: 8, fontSize: 14 }}>
                Managing Partner · Founder
              </div>
            </Reveal>
          </div>
          <style>{`
            @media (max-width: 900px) {
              .founder-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            }
          `}</style>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
