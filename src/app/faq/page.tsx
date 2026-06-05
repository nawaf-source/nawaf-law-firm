import { PageHero, CtaStrip } from "@/components/Shared";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQS } from "@/lib/data";

export const metadata = { title: "الأسئلة الشائعة — مكتب المالكي" };

export default function FAQPage() {
  return (
    <>
      <PageHero
        num="07"
        eyebrow="الأسئلة الشائعة"
        title={<>أجوبةٌ مباشرة<br/><span className="serif" style={{ fontStyle: "italic", color: "var(--gold-300)" }}>لأسئلتك</span> القانونية.</>}
        en="Frequently Asked Questions"
        lead="أبرز الأسئلة التي يطرحها العملاء قبل تسجيل قضية أو طلب استشارة."
      />
      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <FaqAccordion items={FAQS} />
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
