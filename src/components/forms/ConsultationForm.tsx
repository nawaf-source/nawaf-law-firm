"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { consultationSchema, type ConsultationInput } from "@/lib/schemas";
import { PillRadio } from "./NewCaseForm";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const consultTypes = ["تجارية","عمالية","عقارية","أحوال شخصية","ضريبية","تأسيس كيان","أخرى"];

export default function ConsultationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "", phone: "", email: "", type: "",
      description: "", preferredContact: "اتصال",
      agreePrivacy: undefined as unknown as true,
      turnstileToken: "",
    } as any,
  });

  const onSubmit = async (data: ConsultationInput) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch("/api/consultation", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "تعذر الإرسال");
      setSubmitted(true);
    } catch (e: any) {
      setServerError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <SuccessBox
    title="تم استلام طلب الاستشارة"
    body="شكرًا لتواصلك مع مكتب المحامي نواف بن أحمد المالكي. سيراجع الفريق طلبك ويتواصل معك بالطريقة المفضّلة."
    onReset={() => { setSubmitted(false); reset(); }}
  />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{
      background: "var(--ivory-50)",
      border: "1px solid var(--line-on-ivory)",
      borderTop: "2px solid var(--gold-500)",
      padding: "48px clamp(24px, 4vw, 56px)",
    }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <span className="num-marker">— STEP 01</span>
          <span className="eyebrow-latin" style={{ fontSize: 12 }}>Request Details</span>
        </div>
        <h3 className="display" style={{ fontSize: 32, color: "var(--navy-800)", marginBottom: 12 }}>بيانات الطلب</h3>
        <p style={{ fontSize: 15, color: "var(--ink-700)", lineHeight: 1.8 }}>
          املأ النموذج التالي، وسيقوم فريقنا بالتواصل معك بالطريقة المفضّلة لديك.
        </p>
      </div>

      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Field label="الاسم" required error={errors.name?.message}>
          <input className="input" {...register("name")} />
        </Field>
        <Field label="رقم الجوال" required error={errors.phone?.message}>
          <input className="input" dir="ltr" {...register("phone")} placeholder="05XXXXXXXX" />
        </Field>
      </div>

      <div style={{ marginTop: 24 }}>
        <Field label="البريد الإلكتروني" required error={errors.email?.message}>
          <input className="input" dir="ltr" type="email" {...register("email")} placeholder="name@example.com" />
        </Field>
      </div>

      <div style={{ marginTop: 28 }}>
        <Field label="نوع الاستشارة" required error={errors.type?.message}>
          <Controller name="type" control={control} render={({ field }) => (
            <PillRadio options={consultTypes} value={field.value} onChange={field.onChange} />
          )}/>
        </Field>
      </div>

      <div style={{ marginTop: 28 }}>
        <Field label="وصف مختصر للاستشارة" required error={errors.description?.message}>
          <textarea className="textarea" {...register("description")} placeholder="اكتب وصفًا مختصرًا للمسألة التي تستشير فيها…" style={{ minHeight: 160 }} />
        </Field>
      </div>

      <div style={{ marginTop: 28 }}>
        <Field label="طريقة التواصل المفضّلة" required>
          <Controller name="preferredContact" control={control} render={({ field }) => (
            <PillRadio options={["اتصال", "واتساب", "إيميل"]} value={field.value} onChange={field.onChange} />
          )}/>
        </Field>
      </div>

      <div style={{ marginTop: 28, background: "#fff", border: "1px solid var(--line-on-ivory)", padding: "8px 24px" }}>
        <label className="check">
          <input type="checkbox" {...register("agreePrivacy")} />
          <span className="box"></span>
          <span className="lbl">
            أوافق على <strong style={{ color: "var(--navy-800)" }}>سياسة الخصوصية</strong>،
            وأفهم أن إرسال الطلب لا ينشئ علاقة تعاقدية مع المكتب.
          </span>
        </label>
      </div>
      {errors.agreePrivacy && <p style={{ fontSize: 12, color: "#b94a48", marginTop: 8 }}>{errors.agreePrivacy.message}</p>}

      {SITE_KEY && (
        <div style={{ marginTop: 28 }}>
          <Controller name="turnstileToken" control={control} render={({ field }) => (
            <Turnstile siteKey={SITE_KEY}
              options={{ language: "ar", theme: "light" }}
              onSuccess={(t) => field.onChange(t)}
              onError={() => field.onChange("")}
              onExpire={() => field.onChange("")}
            />
          )}/>
        </div>
      )}

      <div className="hairline" style={{ margin: "32px 0" }}></div>

      {serverError && (
        <div style={{ padding: "14px 20px", marginBottom: 24, background: "rgba(185, 74, 72, 0.06)", border: "1px solid rgba(185, 74, 72, 0.3)", color: "#b94a48", fontSize: 14 }}>
          {serverError}
        </div>
      )}

      <button type="submit" className="btn btn-gold" disabled={submitting}>
        <span>{submitting ? "...جارٍ الإرسال" : "إرسال طلب الاستشارة"}</span>
        {!submitting && <span className="arrow"></span>}
      </button>

      <p style={{ marginTop: 20, fontSize: 12, color: "var(--ink-500)" }}>
        محميّ بـ <span className="eyebrow-latin">Cloudflare Turnstile</span>.
      </p>

      <style>{`
        @media (max-width: 700px) { .grid-2 { grid-template-columns: 1fr !important; } }
      `}</style>
    </form>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="field">
      <label>{label}{required && <span className="req">*</span>}</label>
      {children}
      {error && <span style={{ fontSize: 12, color: "#b94a48" }}>{error}</span>}
    </div>
  );
}

export function SuccessBox({ title, body, onReset }: { title: string; body: string; onReset: () => void }) {
  return (
    <div style={{ padding: "32px 0", textAlign: "center" }}>
      <div style={{
        width: 64, height: 64, margin: "0 auto 20px",
        border: "1px solid var(--gold-500)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M4 14 L11 21 L24 7" stroke="var(--gold-600)" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
      <h4 className="display" style={{ fontSize: 26, color: "var(--navy-800)", marginBottom: 12 }}>{title}</h4>
      <p style={{ fontSize: 15, color: "var(--ink-700)", lineHeight: 1.8, marginBottom: 28 }}>{body}</p>
      <button type="button" className="btn btn-ghost-navy" onClick={onReset}>
        <span>إرسال طلب آخر</span><span className="arrow"></span>
      </button>
    </div>
  );
}
