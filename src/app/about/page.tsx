import Image from "next/image";
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
                <Image src="/logo-mark.jpg" alt="" fill style={{ opacity: 0.85, objectFit: "cover", padding: "10%" }} />
                <div style={{
                  position: "absolute", bottom: 24, right: 24,
                  color: "var(--ivory-100)", fontSize: 12,
                  letterSpacing: "0.2em", textTransform: "uppercase", zIndex: 1,
                }}>
                  ١٤٤٧هـ — مكتب المالكي
                </div>
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
