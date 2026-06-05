import { z } from "zod";

/** A Saudi mobile number: 05XXXXXXXX or international form */
const saPhone = z
  .string()
  .trim()
  .regex(/^(05|5|9665|\+9665|009665)\d{8}$/, "رقم جوال سعودي غير صالح");

const trimmedRequired = (msg = "هذا الحقل مطلوب") =>
  z.string().trim().min(1, msg);

/* -------- New Case (full form, all four steps merged) -------- */
export const newCaseSchema = z.object({
  // step 1
  fullName: trimmedRequired("الاسم مطلوب").min(3, "الاسم قصير جدًا"),
  phone: saPhone,
  email: z.string().email("بريد إلكتروني غير صالح"),
  city: trimmedRequired("اختر المدينة"),
  clientType: z.enum(["فرد", "شركة", "مؤسسة"]),
  caseRole: z.enum(["مدعي", "مدعى عليه"]),
  // step 2
  caseType: trimmedRequired("اختر نوع القضية"),
  court: z.string().optional().default(""),
  caseNumber: z.string().optional().default(""),
  opponent: z.string().optional().default(""),
  hasHearing: z.enum(["نعم", "لا"]),
  hearingDate: z.string().optional().default(""),
  description: trimmedRequired("اكتب وصفًا تفصيليًا للقضية").min(20, "الوصف قصير جدًا"),
  demands: z.string().optional().default(""),
  // step 4
  agreePrivacy: z.literal(true, { errorMap: () => ({ message: "الموافقة على سياسة الخصوصية مطلوبة" }) }),
  agreeAccuracy: z.literal(true, { errorMap: () => ({ message: "الإقرار بصحة البيانات مطلوب" }) }),
  agreeNonContract: z.literal(true, { errorMap: () => ({ message: "الإقرار مطلوب" }) }),
  // turnstile token (optional in dev)
  turnstileToken: z.string().optional(),
}).refine(
  (v) => v.hasHearing === "لا" || (v.hearingDate && v.hearingDate.length > 0),
  { path: ["hearingDate"], message: "حدد تاريخ الجلسة" }
);
export type NewCaseInput = z.infer<typeof newCaseSchema>;

/* -------- Consultation -------- */
export const consultationSchema = z.object({
  name: trimmedRequired("الاسم مطلوب"),
  phone: saPhone,
  email: z.string().email("بريد إلكتروني غير صالح"),
  type: trimmedRequired("اختر نوع الاستشارة"),
  description: trimmedRequired("اكتب وصفًا للاستشارة").min(15, "الوصف قصير جدًا"),
  preferredContact: z.enum(["اتصال", "واتساب", "إيميل"]),
  agreePrivacy: z.literal(true, { errorMap: () => ({ message: "الموافقة مطلوبة" }) }),
  turnstileToken: z.string().optional(),
});
export type ConsultationInput = z.infer<typeof consultationSchema>;

/* -------- Contact -------- */
export const contactSchema = z.object({
  name: trimmedRequired("الاسم مطلوب"),
  phone: saPhone,
  email: z.string().email("بريد إلكتروني غير صالح"),
  message: trimmedRequired("الرسالة مطلوبة").min(10, "الرسالة قصيرة جدًا"),
  turnstileToken: z.string().optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;
