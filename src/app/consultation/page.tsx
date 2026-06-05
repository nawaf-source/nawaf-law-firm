import { PageHero } from "@/components/Shared";
import ConsultationForm from "@/components/forms/ConsultationForm";

export const metadata = { title: "طلب استشارة — مكتب المالكي" };

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        num="04"
        eyebrow="طلب استشارة قانونية"
        title={<><span style={{ color: "var(--ivory-100)" }}>استشارة قانونية</span><br/><span className="serif" style={{ fontStyle: "italic", color: "var(--gold-300)" }}>مدروسة</span> في خطوات بسيطة.</>}
        en="Legal Consultation Request"
        lead="استشارة مكتوبة من فريقنا في المسألة التي تشغلك. يصلك الردّ خلال ٢٤ ساعة عمل من تاريخ التواصل."
      />
      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <ConsultationForm />
        </div>
      </section>
    </>
  );
}
