"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { SuccessBox } from "./ConsultationForm";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", message: "", turnstileToken: "" },
  });

  const onSubmit = async (data: ContactInput) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
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
    title="تم استلام رسالتك"
    body="شكرًا لتواصلك مع مكتب المحامي نواف بن أحمد المالكي. سنعاود الاتصال بك قريبًا."
    onReset={() => { setSubmitted(false); reset(); }}
  />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 20 }}>
      <div className="field">
        <label>الاسم <span className="req">*</span></label>
        <input className="input" {...register("name")} />
        {errors.name && <span style={{ fontSize: 12, color: "#b94a48" }}>{errors.name.message}</span>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="ct-grid">
        <div className="field">
          <label>الجوال <span className="req">*</span></label>
          <input className="input" dir="ltr" {...register("phone")} placeholder="05XXXXXXXX" />
          {errors.phone && <span style={{ fontSize: 12, color: "#b94a48" }}>{errors.phone.message}</span>}
        </div>
        <div className="field">
          <label>البريد الإلكتروني <span className="req">*</span></label>
          <input className="input" dir="ltr" type="email" {...register("email")} />
          {errors.email && <span style={{ fontSize: 12, color: "#b94a48" }}>{errors.email.message}</span>}
        </div>
      </div>
      <div className="field">
        <label>رسالتك <span className="req">*</span></label>
        <textarea className="textarea" {...register("message")} placeholder="اكتب رسالتك هنا…"></textarea>
        {errors.message && <span style={{ fontSize: 12, color: "#b94a48" }}>{errors.message.message}</span>}
      </div>

      {SITE_KEY && (
        <Controller name="turnstileToken" control={control} render={({ field }) => (
          <Turnstile siteKey={SITE_KEY}
            options={{ language: "ar", theme: "light" }}
            onSuccess={(t) => field.onChange(t)}
            onError={() => field.onChange("")}
            onExpire={() => field.onChange("")}
          />
        )}/>
      )}

      {serverError && (
        <div style={{ padding: "14px 20px", background: "rgba(185, 74, 72, 0.06)", border: "1px solid rgba(185, 74, 72, 0.3)", color: "#b94a48", fontSize: 14 }}>
          {serverError}
        </div>
      )}

      <button type="submit" className="btn btn-gold" style={{ justifySelf: "start" }} disabled={submitting}>
        <span>{submitting ? "...جارٍ الإرسال" : "إرسال الرسالة"}</span>
        {!submitting && <span className="arrow"></span>}
      </button>
      <p style={{ fontSize: 12, color: "var(--ink-500)" }}>
        محميّ بـ <span className="eyebrow-latin">Cloudflare Turnstile</span> ضد الإرسال الآلي.
      </p>

      <style>{`
        @media (max-width: 560px) { .ct-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </form>
  );
}
