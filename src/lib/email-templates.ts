/**
 * Email HTML templates for outgoing messages to the office.
 * Designed in the firm's brand palette (navy + ivory + gold) and RTL.
 */

import type { NewCaseInput, ConsultationInput, ContactInput } from "./schemas";

const baseStyle = `
  body { margin: 0; padding: 0; background: #f4eee3; font-family: 'Tajawal', 'Segoe UI', Tahoma, Arial, sans-serif; color: #1a1e26; direction: rtl; }
  .wrap { max-width: 640px; margin: 0 auto; background: #faf6ec; }
  .header { background: #0a1424; color: #f4eee3; padding: 32px; border-bottom: 2px solid #b8924a; }
  .brand { font-size: 18px; margin: 0; color: #f4eee3; }
  .brand-en { font-size: 12px; color: #cba767; margin-top: 4px; font-style: italic; }
  .title { background: #0e1b30; color: #f4eee3; padding: 24px 32px; }
  .title h1 { margin: 0; font-size: 22px; }
  .title .eyebrow { color: #cba767; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; }
  .section { padding: 24px 32px; border-bottom: 1px solid rgba(184,146,74,0.25); }
  .section h2 { font-size: 14px; color: #b8924a; margin: 0 0 14px; text-transform: uppercase; letter-spacing: 2px; }
  .row { display: table; width: 100%; padding: 8px 0; }
  .key { display: table-cell; width: 140px; color: #6b7280; font-size: 13px; vertical-align: top; padding-left: 16px; }
  .val { display: table-cell; color: #1a1e26; font-size: 14px; line-height: 1.7; vertical-align: top; }
  .desc { background: #fff; border-right: 3px solid #b8924a; padding: 14px 18px; margin-top: 8px; line-height: 1.9; font-size: 14px; }
  .footer { background: #0a1424; color: #ddd1b8; padding: 20px 32px; font-size: 12px; text-align: center; }
  .badge { display: inline-block; padding: 4px 10px; background: #b8924a; color: #0a1424; font-size: 12px; font-weight: 500; }
`;

const wrap = (titleAr: string, eyebrow: string, body: string) => `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<style>${baseStyle}</style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h2 class="brand">مكتب المحامي نواف بن أحمد المالكي</h2>
      <div class="brand-en">Law Firm &amp; Legal Consultancy</div>
    </div>
    <div class="title">
      <div class="eyebrow">${eyebrow}</div>
      <h1>${titleAr}</h1>
    </div>
    ${body}
    <div class="footer">
      تم الإرسال تلقائيًا من موقع المكتب — ${new Date().toLocaleString("ar-SA", { timeZone: "Asia/Riyadh" })}
    </div>
  </div>
</body>
</html>`;

const row = (k: string, v: string | number | undefined | null) =>
  `<div class="row"><div class="key">${k}</div><div class="val">${
    v === undefined || v === null || v === "" ? "—" : String(v)
  }</div></div>`;

/* ---------- New Case Email ---------- */
export function newCaseEmail(data: NewCaseInput, fileSummaries: string[]) {
  const body = `
    <div class="section">
      <h2>بيانات العميل</h2>
      ${row("الاسم الكامل", data.fullName)}
      ${row("رقم الجوال", data.phone)}
      ${row("البريد الإلكتروني", data.email)}
      ${row("المدينة", data.city)}
      ${row("نوع العميل", data.clientType)}
      ${row("الصفة في القضية", data.caseRole)}
    </div>
    <div class="section">
      <h2>بيانات القضية</h2>
      ${row("نوع القضية", data.caseType)}
      ${row("الجهة / المحكمة", data.court)}
      ${row("رقم القضية", data.caseNumber)}
      ${row("اسم الطرف الآخر", data.opponent)}
      ${row("جلسة قادمة", data.hasHearing === "نعم" ? `نعم — ${data.hearingDate || "—"}` : "لا")}
      <div style="margin-top: 12px;">
        <div class="key" style="display:block; margin-bottom: 6px;">وصف القضية</div>
        <div class="desc">${escapeHtml(data.description).replace(/\n/g, "<br>")}</div>
      </div>
      ${data.demands ? `
        <div style="margin-top: 16px;">
          <div class="key" style="display:block; margin-bottom: 6px;">الطلبات المطلوبة</div>
          <div class="desc">${escapeHtml(data.demands).replace(/\n/g, "<br>")}</div>
        </div>
      ` : ""}
    </div>
    <div class="section">
      <h2>المرفقات</h2>
      ${
        fileSummaries.length === 0
          ? '<div class="val">لا توجد مرفقات.</div>'
          : `<ul style="margin: 0; padding-right: 18px; color: #1a1e26; font-size: 14px; line-height: 2;">
              ${fileSummaries.map((f) => `<li>${escapeHtml(f)}</li>`).join("")}
            </ul>`
      }
    </div>
    <div class="section">
      <h2>الإقرارات</h2>
      ${row("سياسة الخصوصية", '<span class="badge">موافق</span>')}
      ${row("صحة البيانات", '<span class="badge">مُقر</span>')}
      ${row("عدم نشوء علاقة تعاقدية", '<span class="badge">مفهوم</span>')}
    </div>
  `;
  return wrap("طلب تسجيل قضية جديدة", "New Case Submission", body);
}

/* ---------- Consultation Email ---------- */
export function consultationEmail(data: ConsultationInput) {
  const body = `
    <div class="section">
      <h2>بيانات الطلب</h2>
      ${row("الاسم", data.name)}
      ${row("رقم الجوال", data.phone)}
      ${row("البريد الإلكتروني", data.email)}
      ${row("نوع الاستشارة", data.type)}
      ${row("طريقة التواصل المفضّلة", data.preferredContact)}
    </div>
    <div class="section">
      <h2>وصف الاستشارة</h2>
      <div class="desc">${escapeHtml(data.description).replace(/\n/g, "<br>")}</div>
    </div>
  `;
  return wrap("طلب استشارة قانونية", "Legal Consultation Request", body);
}

/* ---------- Contact Email ---------- */
export function contactEmail(data: ContactInput) {
  const body = `
    <div class="section">
      <h2>بيانات المُرسل</h2>
      ${row("الاسم", data.name)}
      ${row("رقم الجوال", data.phone)}
      ${row("البريد الإلكتروني", data.email)}
    </div>
    <div class="section">
      <h2>نص الرسالة</h2>
      <div class="desc">${escapeHtml(data.message).replace(/\n/g, "<br>")}</div>
    </div>
  `;
  return wrap("رسالة تواصل من الموقع", "Contact Form", body);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
