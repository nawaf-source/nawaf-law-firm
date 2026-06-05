import { PageHero } from "@/components/Shared";
import NewCaseForm from "@/components/forms/NewCaseForm";

export const metadata = { title: "تسجيل قضية — مكتب المالكي" };

export default function NewCasePage() {
  return (
    <>
      <PageHero
        num="03"
        eyebrow="تسجيل قضية جديدة"
        title={<><span style={{ color: "var(--ivory-100)" }}>سجّل قضيتك</span><br/><span className="serif" style={{ fontStyle: "italic", color: "var(--gold-300)" }}>للمراجعة</span> القانونية.</>}
        en="Register a New Case"
        lead="ستصلك ردود الفريق خلال ٢٤ ساعة عمل من تاريخ المراجعة. إرسال الطلب لا يعني قبول القضية إلا بعد المراجعة الرسمية."
      />
      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container" style={{ maxWidth: 980 }}>
          <NewCaseForm />
        </div>
      </section>
    </>
  );
}
