import LegalLayout from "@/components/LegalLayout";
import { PageHero } from "@/components/Shared";
import { PRIVACY_SECTIONS } from "@/lib/data";

export const metadata = { title: "سياسة الخصوصية — مكتب المالكي" };

export default function PrivacyPage() {
  return (
    <LegalLayout
      sections={PRIVACY_SECTIONS}
      hero={
        <PageHero
          num="08"
          eyebrow="سياسة الخصوصية"
          title={<>الثقة التزامٌ<br/><span className="serif" style={{ fontStyle: "italic", color: "var(--gold-300)" }}>قبل</span> أن تكون اتفاقًا.</>}
          en="Privacy Policy"
          lead="نوضّح في هذه السياسة كيف نتعامل مع بياناتك الشخصية ومستنداتك بسرّية مهنية مطلقة وفق نظام المحاماة السعودي."
        />
      }
    />
  );
}
