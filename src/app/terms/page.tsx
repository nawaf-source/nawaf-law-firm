import LegalLayout from "@/components/LegalLayout";
import { PageHero } from "@/components/Shared";
import { TERMS_SECTIONS } from "@/lib/data";

export const metadata = { title: "الشروط والأحكام — مكتب المالكي" };

export default function TermsPage() {
  return (
    <LegalLayout
      sections={TERMS_SECTIONS}
      hero={
        <PageHero
          num="09"
          eyebrow="الشروط والأحكام"
          title={<>قواعد واضحة<br/><span className="serif" style={{ fontStyle: "italic", color: "var(--gold-300)" }}>لعلاقة</span> مهنية ثابتة.</>}
          en="Terms & Conditions"
          lead="باستخدامك لهذا الموقع وتقديم الطلبات عبره، فإنك توافق على الشروط والأحكام التالية التي تحكم العلاقة بينك وبين المكتب."
        />
      }
    />
  );
}
