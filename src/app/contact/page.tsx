import { PageHero } from "@/components/Shared";
import { Reveal } from "@/components/Reveal";
import { CONTACT } from "@/lib/data";
import ContactForm from "@/components/forms/ContactForm";

export const metadata = { title: "تواصل معنا — مكتب المالكي" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        num="06"
        eyebrow="تواصل معنا"
        title={<>نسمعك<br/><span className="serif" style={{ fontStyle: "italic", color: "var(--gold-300)" }}>قبل أن نتحدث.</span></>}
        en="Get in Touch"
        lead="استخدم القنوات التالية للتواصل المباشر مع المكتب. سيتولّى فريقنا الرد خلال ٢٤ ساعة عمل."
      />

      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container">
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64 }}>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 20 }}>— القنوات</div>
              <h2 className="display" style={{ fontSize: 36, marginBottom: 36, color: "var(--navy-800)" }}>قنوات التواصل</h2>

              <ContactRow label="البريد الإلكتروني" value={CONTACT.email} href={`mailto:${CONTACT.email}`} latin="Email" />
              <ContactRow label="الجوال" value={CONTACT.phone} href={`tel:${CONTACT.phoneIntl}`} latin="Mobile" dir="ltr" />
              <ContactRow label="واتساب" value="محادثة فورية" href={`https://wa.me/${CONTACT.whatsapp}`} latin="WhatsApp" external />
              <ContactRow label="العنوان" value={CONTACT.address} latin="Address" noLink />

              <div style={{
                marginTop: 40, aspectRatio: "16/9",
                background: "linear-gradient(135deg, var(--navy-800), var(--navy-700))",
                position: "relative", overflow: "hidden",
                border: "1px solid var(--line)",
              }}>
                <svg width="100%" height="100%" viewBox="0 0 400 225" style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--gold-500)" strokeWidth="0.3" opacity="0.4"/>
                    </pattern>
                  </defs>
                  <rect width="400" height="225" fill="url(#grid)"/>
                  <circle cx="240" cy="115" r="5" fill="var(--gold-400)"/>
                  <circle cx="240" cy="115" r="14" fill="none" stroke="var(--gold-400)" strokeWidth="1" opacity="0.6">
                    <animate attributeName="r" from="6" to="28" dur="2.5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.7" to="0" dur="2.5s" repeatCount="indefinite"/>
                  </circle>
                </svg>
                <div style={{
                  position: "absolute", inset: 0, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: 8, color: "var(--ivory-100)",
                }}>
                  <div className="eyebrow-latin" style={{ color: "var(--gold-300)" }}>Riyadh · KSA</div>
                  <div style={{ fontFamily: "var(--f-display)", fontSize: 22 }}>الرياض — المملكة العربية السعودية</div>
                  <div style={{ fontSize: 11, color: "var(--ivory-300)", marginTop: 4 }}>
                    أضف رابط Google Maps Embed لاحقًا
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div style={{
                background: "var(--ivory-50)", padding: 48,
                border: "1px solid var(--line-on-ivory)",
                borderTop: "2px solid var(--gold-500)",
              }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>— نموذج سريع</div>
                <h3 className="display" style={{ fontSize: 28, color: "var(--navy-800)", marginBottom: 32 }}>أرسل رسالة</h3>
                <ContactForm />
              </div>
            </Reveal>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            }
          `}</style>
        </div>
      </section>
    </>
  );
}

function ContactRow({ label, value, href, latin, external, noLink, dir }: {
  label: string; value: string; href?: string; latin: string;
  external?: boolean; noLink?: boolean; dir?: string;
}) {
  const inner = (
    <div style={{
      display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24,
      alignItems: "center", padding: "26px 0",
      borderBottom: "1px solid var(--line)",
    }}>
      <div className="eyebrow" style={{ fontSize: 10, minWidth: 90 }}>{label}</div>
      <div className="display" style={{ fontSize: 22, color: "var(--navy-800)" }} dir={dir}>{value}</div>
      <div className="eyebrow-latin" style={{ color: "var(--gold-600)", fontSize: 13 }}>{latin} ↗</div>
    </div>
  );
  if (noLink) return inner;
  return (
    <a href={href} target={external ? "_blank" : undefined} rel="noopener noreferrer" style={{ display: "block" }}>
      {inner}
    </a>
  );
}
