import { SERVICES } from "@/lib/data";
import { PageHero, CtaStrip, ServiceCell } from "@/components/Shared";

export const metadata = { title: "خدماتنا — مكتب المالكي" };

export default function ServicesPage() {
  return (
    <>
      <PageHero
        num="02"
        eyebrow="خدماتنا القانونية"
        title={<><span style={{ color: "var(--ivory-100)" }}>أحد عشر مجالاً</span><br/><span className="serif" style={{ fontStyle: "italic", color: "var(--gold-300)" }}>لممارسة قانونية</span> متخصصة.</>}
        en="Eleven Areas of Practice"
        lead="نقدّم خدماتنا في مجالات متخصصة تشمل التقاضي والاستشارات والصياغة وإدارة النزاعات، بما يفي باحتياجات الأفراد والشركات والمؤسسات."
      />

      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container">
          <div className="all-svc-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
            borderTop: "1px solid var(--line)", borderInlineStart: "1px solid var(--line)",
          }}>
            {SERVICES.map((s) => <ServiceCell key={s.id} s={s} />)}
          </div>
          <style>{`
            @media (max-width: 900px) { .all-svc-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px) { .all-svc-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
