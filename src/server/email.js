import { Resend } from "resend";

/* ---------------------------------------------------------------
   Resend client + email templates.
   Only RESEND_API_KEY is required. RESEND_FROM and CONTACT_EMAIL
   have safe defaults so the project works out of the box.
---------------------------------------------------------------- */

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.warn("[resend] RESEND_API_KEY not set — emails will fail until it is configured.");
}

export const resend = new Resend(apiKey);
export const EMAIL_FROM = process.env.RESEND_FROM || "مكتب المالكي <noreply@law-2030.com>";
export const EMAIL_TO = process.env.CONTACT_EMAIL || "nawaf@law-2030.com";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const val = (v) => (v === undefined || v === null || v === "" ? "—" : esc(v));

const baseStyle = `
  body { margin:0; padding:0; background:#f4eee3; font-family:'Tajawal','Segoe UI',Tahoma,Arial,sans-serif; color:#1a1e26; direction:rtl; }
  .wrap { max-width:640px; margin:0 auto; background:#faf6ec; }
  .header { background:#0a1424; color:#f4eee3; padding:32px; border-bottom:2px solid #b8924a; }
  .brand { font-size:18px; margin:0; color:#f4eee3; }
  .brand-en { font-size:12px; color:#cba767; margin-top:4px; font-style:italic; }
  .title { background:#0e1b30; color:#f4eee3; padding:24px 32px; }
  .title h1 { margin:0; font-size:22px; }
  .title .eyebrow { color:#cba767; font-size:11px; letter-spacing:2px; text-transform:uppercase; margin-bottom:6px; }
  .section { padding:24px 32px; border-bottom:1px solid rgba(184,146,74,0.25); }
  .section h2 { font-size:14px; color:#b8924a; margin:0 0 14px; text-transform:uppercase; letter-spacing:2px; }
  .row { display:table; width:100%; padding:8px 0; }
  .key { display:table-cell; width:150px; color:#6b7280; font-size:13px; vertical-align:top; padding-left:16px; }
  .v { display:table-cell; color:#1a1e26; font-size:14px; line-height:1.7; vertical-align:top; }
  .desc { background:#fff; border-right:3px solid #b8924a; padding:14px 18px; margin-top:8px; line-height:1.9; font-size:14px; }
  .footer { background:#0a1424; color:#ddd1b8; padding:20px 32px; font-size:12px; text-align:center; }
  .badge { display:inline-block; padding:4px 10px; background:#b8924a; color:#0a1424; font-size:12px; }
`;

const wrap = (titleAr, eyebrow, body) => `<!DOCTYPE html>
<html lang="ar" dir="rtl"><head><meta charset="UTF-8"><style>${baseStyle}</style></head>
<body><div class="wrap">
  <div class="header"><h2 class="brand">مكتب المحامي نواف بن أحمد المالكي</h2><div class="brand-en">Law Firm &amp; Legal Consultancy</div></div>
  <div class="title"><div class="eyebrow">${eyebrow}</div><h1>${titleAr}</h1></div>
  ${body}
  <div class="footer">تم الإرسال تلقائيًا من موقع المكتب — ${new Date().toLocaleString("ar-SA", { timeZone: "Asia/Riyadh" })}</div>
</div></body></html>`;

const row = (k, v) => `<div class="row"><div class="key">${k}</div><div class="v">${val(v)}</div></div>`;

export function contactEmail(d) {
  const body = `
    <div class="section"><h2>بيانات المُرسِل</h2>
      ${row("الاسم", d.name)}
      ${row("رقم الجوال", d.phone)}
      ${row("البريد الإلكتروني", d.email)}
    </div>
    <div class="section"><h2>نص الرسالة</h2>
      <div class="desc">${esc(d.message).replace(/\n/g, "<br>")}</div>
    </div>`;
  return wrap("رسالة تواصل من الموقع", "Contact Form", body);
}

export function consultationEmail(d) {
  const body = `
    <div class="section"><h2>بيانات الطلب</h2>
      ${row("الاسم", d.name)}
      ${row("رقم الجوال", d.phone)}
      ${row("البريد الإلكتروني", d.email)}
      ${row("نوع الاستشارة", d.type)}
      ${row("طريقة التواصل المفضّلة", d.preferredContact)}
    </div>
    <div class="section"><h2>وصف الاستشارة</h2>
      <div class="desc">${esc(d.description).replace(/\n/g, "<br>")}</div>
    </div>`;
  return wrap("طلب استشارة قانونية", "Legal Consultation Request", body);
}

export function newCaseEmail(d) {
  const files = Array.isArray(d.files) ? d.files : [];
  const filesHtml =
    files.length === 0
      ? '<div class="v">لا توجد مرفقات.</div>'
      : `<ul style="margin:0;padding-right:18px;color:#1a1e26;font-size:14px;line-height:2;">${files
          .map((f) => `<li>${esc(f.name)}${f.size ? ` — ${(f.size / 1024 / 1024).toFixed(2)} MB` : ""}</li>`)
          .join("")}</ul>`;
  const body = `
    <div class="section"><h2>بيانات العميل</h2>
      ${row("الاسم الكامل", d.fullName)}
      ${row("رقم الجوال", d.phone)}
      ${row("البريد الإلكتروني", d.email)}
      ${row("المدينة", d.city)}
      ${row("نوع العميل", d.clientType)}
      ${row("الصفة في القضية", d.caseRole)}
    </div>
    <div class="section"><h2>بيانات القضية</h2>
      ${row("نوع القضية", d.caseType)}
      ${row("الجهة / المحكمة", d.court)}
      ${row("رقم القضية", d.caseNumber)}
      ${row("اسم الطرف الآخر", d.opponent)}
      ${row("جلسة قادمة", d.hasHearing === "نعم" ? `نعم — ${val(d.hearingDate)}` : "لا")}
      <div style="margin-top:12px;"><div class="key" style="display:block;margin-bottom:6px;">وصف القضية</div>
        <div class="desc">${esc(d.description).replace(/\n/g, "<br>")}</div></div>
      ${
        d.demands
          ? `<div style="margin-top:16px;"><div class="key" style="display:block;margin-bottom:6px;">الطلبات المطلوبة</div><div class="desc">${esc(
              d.demands
            ).replace(/\n/g, "<br>")}</div></div>`
          : ""
      }
    </div>
    <div class="section"><h2>المرفقات</h2>${filesHtml}</div>
    <div class="section"><h2>الإقرارات</h2>
      ${row("سياسة الخصوصية", d.agreePrivacy ? '<span class="badge">موافق</span>' : "—")}
      ${row("صحة البيانات", d.agreeAccuracy ? '<span class="badge">مُقر</span>' : "—")}
      ${row("عدم نشوء علاقة تعاقدية", d.agreeNonContract ? '<span class="badge">مفهوم</span>' : "—")}
    </div>`;
  return wrap("طلب تسجيل قضية جديدة", "New Case Submission", body);
}
