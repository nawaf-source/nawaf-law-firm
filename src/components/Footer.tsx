import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS, CONTACT } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <Image src="/logo-mark.jpg" alt="" width={56} height={56} style={{ height: 56, width: 56, objectFit: "cover" }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "var(--f-display)", fontSize: 18, color: "var(--ivory-100)" }}>
                  نواف بن أحمد المالكي
                </span>
                <span style={{ fontFamily: "var(--f-latin)", fontStyle: "italic", fontSize: 12, color: "var(--gold-400)", marginTop: 4 }}>
                  Law Firm &amp; Legal Consultancy
                </span>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--ivory-300)", maxWidth: 340 }}>
              مكتب محاماة سعودي يقدّم خدمات قانونية متكاملة للأفراد والشركات، تجمع بين الخبرة القانونية، السرية التامة، والدقة وفق الأنظمة السعودية.
            </p>
          </div>

          <div>
            <h4>روابط سريعة</h4>
            <ul>
              {NAV_ITEMS.slice(0, 5).map((item) => (
                <li key={item.id}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>قانوني</h4>
            <ul>
              <li><Link href="/faq">الأسئلة الشائعة</Link></li>
              <li><Link href="/privacy">سياسة الخصوصية</Link></li>
              <li><Link href="/terms">الشروط والأحكام</Link></li>
            </ul>
          </div>

          <div>
            <h4>تواصل</h4>
            <ul>
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li><a href={`tel:${CONTACT.phoneIntl}`} dir="ltr" style={{ display: "inline-block" }}>{CONTACT.phone}</a></li>
              <li><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">واتساب مباشر</a></li>
              <li style={{ color: "var(--ivory-300)", fontSize: 14 }}>{CONTACT.address}</li>
            </ul>
          </div>
        </div>

        <div className="copy">
          <span>© ٢٠٢٦ مكتب المحامي نواف بن أحمد المالكي — جميع الحقوق محفوظة</span>
          <span style={{ fontFamily: "var(--f-latin)", fontStyle: "italic" }}>
            Veritas · Diligentia · Fides
          </span>
        </div>
      </div>
    </footer>
  );
}
