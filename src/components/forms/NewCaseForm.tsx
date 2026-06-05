"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { newCaseSchema, type NewCaseInput } from "@/lib/schemas";
import { SA_REGIONS } from "@/lib/data";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type StepDef = { num: number; label: string; en: string };

const steps: StepDef[] = [
  { num: 1, label: "بيانات العميل", en: "Client" },
  { num: 2, label: "بيانات القضية", en: "Case" },
  { num: 3, label: "المرفقات",       en: "Attachments" },
  { num: 4, label: "الإقرارات",       en: "Declarations" },
];

export default function NewCaseForm() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, watch, control, trigger, formState: { errors }, getValues, reset } = useForm<NewCaseInput>({
    resolver: zodResolver(newCaseSchema),
    defaultValues: {
      fullName: "", phone: "", email: "", city: "",
      clientType: "فرد", caseRole: "مدعي",
      caseType: "", court: "", caseNumber: "", opponent: "",
      hasHearing: "لا", hearingDate: "",
      description: "", demands: "",
      agreePrivacy: undefined as unknown as true,
      agreeAccuracy: undefined as unknown as true,
      agreeNonContract: undefined as unknown as true,
      turnstileToken: "",
    } as any,
    mode: "onBlur",
  });

  const hasHearing = watch("hasHearing");
  const clientType = watch("clientType");
  const caseRole = watch("caseRole");
  const caseType = watch("caseType");

  const stepFields: Record<number, (keyof NewCaseInput)[]> = {
    1: ["fullName", "phone", "email", "city", "clientType", "caseRole"],
    2: ["caseType", "hasHearing", "hearingDate", "description"],
    3: [],
    4: ["agreePrivacy", "agreeAccuracy", "agreeNonContract"],
  };

  const next = async () => {
    const ok = await trigger(stepFields[step], { shouldFocus: true });
    if (ok) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const back = () => { setStep(step - 1); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const onSubmit = async (data: NewCaseInput) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const formData = new FormData();
      formData.append("payload", JSON.stringify(data));
      files.forEach((f) => formData.append("files", f));

      const res = await fetch("/api/new-case", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "تعذر الإرسال");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      setServerError(e.message || "خطأ غير متوقع");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <CaseSuccess onReset={() => { setSubmitted(false); setStep(1); setFiles([]); reset(); }} />;

  return (
    <>
      <StepIndicator steps={steps} current={step} />

      <form onSubmit={handleSubmit(onSubmit)} style={{
        background: "var(--ivory-50)",
        border: "1px solid var(--line-on-ivory)",
        borderTop: "2px solid var(--gold-500)",
        padding: "48px clamp(24px, 4vw, 56px)",
        marginTop: 48,
      }}>
        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <StepHeader num="01" title="بيانات العميل" en="Client Information" lead="نحتاج بياناتك الأساسية للتواصل ومتابعة الطلب." />
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <FieldWrap label="الاسم الكامل" required error={errors.fullName?.message}>
                <input className="input" {...register("fullName")} placeholder="مثال: محمد بن عبدالله" />
              </FieldWrap>
              <FieldWrap label="رقم الجوال" required error={errors.phone?.message}>
                <input className="input" dir="ltr" {...register("phone")} placeholder="05XXXXXXXX" />
              </FieldWrap>
              <FieldWrap label="البريد الإلكتروني" required error={errors.email?.message}>
                <input className="input" dir="ltr" type="email" {...register("email")} placeholder="name@example.com" />
              </FieldWrap>
              <FieldWrap label="المدينة" required error={errors.city?.message}>
                <select className="select" {...register("city")}>
                  <option value="">— اختر المدينة —</option>
                  {SA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </FieldWrap>
            </div>
            <div style={{ marginTop: 28 }}>
              <FieldWrap label="نوع العميل" required>
                <Controller name="clientType" control={control} render={({ field }) => (
                  <PillRadio options={["فرد", "شركة", "مؤسسة"]} value={field.value} onChange={field.onChange} />
                )}/>
              </FieldWrap>
            </div>
            <div style={{ marginTop: 28 }}>
              <FieldWrap label="الصفة في القضية" required>
                <Controller name="caseRole" control={control} render={({ field }) => (
                  <PillRadio options={["مدعي", "مدعى عليه"]} value={field.value} onChange={field.onChange} />
                )}/>
              </FieldWrap>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <StepHeader num="02" title="بيانات القضية" en="Case Information" lead="معلومات تفصيلية عن طبيعة القضية ومرحلتها الحالية." />
            <FieldWrap label="نوع القضية" required error={errors.caseType?.message}>
              <Controller name="caseType" control={control} render={({ field }) => (
                <PillRadio
                  options={["تجاري","عمالي","عقاري","أحوال شخصية","جزائي","إداري","ضريبي / زكوي","تنفيذ","إعسار وإفلاس","إنشاءات ومقاولات","أخرى"]}
                  value={field.value} onChange={field.onChange}
                />
              )}/>
            </FieldWrap>
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginTop: 28 }}>
              <FieldWrap label="الجهة / المحكمة"><input className="input" {...register("court")} placeholder="إن وجدت" /></FieldWrap>
              <FieldWrap label="رقم القضية"><input className="input" dir="ltr" {...register("caseNumber")} placeholder="إن وجد" /></FieldWrap>
              <FieldWrap label="اسم الطرف الآخر"><input className="input" {...register("opponent")} placeholder="إن وجد" /></FieldWrap>
            </div>
            <div style={{ marginTop: 28 }}>
              <FieldWrap label="هل توجد جلسة قادمة؟" required>
                <Controller name="hasHearing" control={control} render={({ field }) => (
                  <PillRadio options={["نعم", "لا"]} value={field.value} onChange={field.onChange} />
                )}/>
              </FieldWrap>
            </div>
            {hasHearing === "نعم" && (
              <div style={{ marginTop: 20, maxWidth: 320 }}>
                <FieldWrap label="تاريخ الجلسة" required error={errors.hearingDate?.message}>
                  <input className="input" type="date" {...register("hearingDate")} />
                </FieldWrap>
              </div>
            )}
            <div style={{ marginTop: 28 }}>
              <FieldWrap label="وصف القضية بالتفصيل" required error={errors.description?.message}>
                <textarea className="textarea" {...register("description")} placeholder="اشرح ملابسات القضية، التواريخ الرئيسية، الأطراف، والإجراءات السابقة…" style={{ minHeight: 180 }} />
              </FieldWrap>
            </div>
            <div style={{ marginTop: 24 }}>
              <FieldWrap label="الطلبات المطلوبة من المكتب">
                <textarea className="textarea" {...register("demands")} placeholder="مثال: ترافع، استشارة، صياغة مذكرة، تنفيذ حكم…" />
              </FieldWrap>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && <FileUploader files={files} setFiles={setFiles} />}

        {/* STEP 4 */}
        {step === 4 && (
          <Step4 register={register} control={control} errors={errors} values={{ ...getValues(), files }} />
        )}

        <div className="hairline" style={{ margin: "40px 0 28px" }}></div>

        {/* Turnstile on final step */}
        {step === 4 && SITE_KEY && (
          <div style={{ marginBottom: 24 }}>
            <Controller
              name="turnstileToken"
              control={control}
              render={({ field }) => (
                <Turnstile
                  siteKey={SITE_KEY}
                  options={{ language: "ar", theme: "light" }}
                  onSuccess={(token) => field.onChange(token)}
                  onError={() => field.onChange("")}
                  onExpire={() => field.onChange("")}
                />
              )}
            />
          </div>
        )}

        {serverError && <ErrBanner>{serverError}</ErrBanner>}

        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            {step > 1 && (
              <button type="button" className="btn btn-ghost-navy" onClick={back}>
                <span className="arrow" style={{ transform: "scaleX(-1)" }}></span>
                <span>السابق</span>
              </button>
            )}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {step < 4 && (
              <button type="button" className="btn btn-gold" onClick={next}>
                <span>التالي</span><span className="arrow"></span>
              </button>
            )}
            {step === 4 && (
              <button type="submit" className="btn btn-gold" disabled={submitting}>
                <span>{submitting ? "...جارٍ الإرسال" : "إرسال القضية للمراجعة"}</span>
                {!submitting && <span className="arrow"></span>}
              </button>
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 700px) { .grid-2 { grid-template-columns: 1fr !important; } }
          @media (max-width: 800px) { .grid-3 { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 560px) { .grid-3 { grid-template-columns: 1fr !important; } }
        `}</style>
      </form>

      <p style={{ marginTop: 24, fontSize: 12, color: "var(--ink-500)", textAlign: "center" }}>
        جميع البيانات مشفّرة عند النقل ومحميّة بـ <span className="eyebrow-latin">Cloudflare Turnstile</span>.
      </p>
    </>
  );
}

/* ---------- subcomponents ---------- */
function StepIndicator({ steps, current }: { steps: StepDef[]; current: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 0, borderTop: "1px solid var(--line)" }}>
      {steps.map((s, i) => {
        const active = s.num === current;
        const done = s.num < current;
        return (
          <div key={s.num} style={{
            padding: "24px 20px",
            borderInlineStart: i > 0 ? "1px solid var(--line)" : "none",
            borderBottom: active ? "2px solid var(--gold-500)" : "1px solid var(--line)",
            background: active ? "var(--ivory-50)" : "transparent",
            transition: "all 0.3s var(--ease)",
          }}>
            <div className="num-marker" style={{ color: active ? "var(--gold-600)" : done ? "var(--gold-500)" : "var(--ink-500)" }}>
              — {String(s.num).padStart(2, "0")}{done && <span style={{ marginInlineStart: 6 }}>✓</span>}
            </div>
            <div className="display" style={{ fontSize: 18, marginTop: 6, color: active ? "var(--navy-800)" : done ? "var(--ink-700)" : "var(--ink-500)" }}>{s.label}</div>
            <div className="eyebrow-latin" style={{ fontSize: 11, color: active ? "var(--gold-600)" : "var(--ink-500)", marginTop: 4 }}>{s.en}</div>
          </div>
        );
      })}
    </div>
  );
}

function StepHeader({ num, title, en, lead }: { num: string; title: string; en: string; lead: string }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        <span className="num-marker">— STEP {num}</span>
        <span className="eyebrow-latin" style={{ fontSize: 12 }}>{en}</span>
      </div>
      <h3 className="display" style={{ fontSize: 32, color: "var(--navy-800)", marginBottom: 12 }}>{title}</h3>
      <p style={{ fontSize: 15, color: "var(--ink-700)", lineHeight: 1.8 }}>{lead}</p>
    </div>
  );
}

function FieldWrap({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="field">
      <label>
        {label}
        {required && <span className="req">*</span>}
      </label>
      {children}
      {error && <span style={{ fontSize: 12, color: "#b94a48" }}>{error}</span>}
    </div>
  );
}

export function PillRadio({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="pill-group">
      {options.map((opt) => (
        <button key={opt} type="button"
          className={`pill ${value === opt ? "active" : ""}`}
          onClick={() => onChange(opt)}
        >{opt}</button>
      ))}
    </div>
  );
}

function FileUploader({ files, setFiles }: { files: File[]; setFiles: (f: File[]) => void }) {
  const slots = [
    { id: "id", label: "الهوية الوطنية / الإقامة", hint: "صورة واضحة للهوية" },
    { id: "contract", label: "العقد (إن وجد)", hint: "عقد محل النزاع" },
    { id: "docs", label: "المستندات الرسمية", hint: "صكوك، تراخيص، خطابات" },
    { id: "evidence", label: "الصور والأدلة", hint: "صور، رسائل، إثباتات" },
  ];
  const fmt = (size: number) => size < 1024 ? size + " B" : size < 1024 * 1024 ? (size / 1024).toFixed(1) + " KB" : (size / 1024 / 1024).toFixed(1) + " MB";
  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files || []);
    setFiles([...files, ...list]);
  };
  const removeFile = (i: number) => { const a = files.slice(); a.splice(i, 1); setFiles(a); };

  return (
    <div>
      <StepHeader num="03" title="المرفقات" en="Attachments" lead="حمّل المستندات المتعلقة بالقضية. يقبل PDF و JPG و PNG و DOCX." />
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {slots.map((s) => (
          <label key={s.id} htmlFor="case-files" style={{
            border: "1px dashed var(--line-strong)", padding: "28px 24px",
            cursor: "pointer", background: "#fff", transition: "all 0.25s var(--ease)",
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 18 V6 M14 6 L9 11 M14 6 L19 11" stroke="var(--gold-600)" strokeWidth="1.2" fill="none"/>
                <path d="M4 18 V22 H24 V18" stroke="var(--gold-600)" strokeWidth="1.2" fill="none"/>
              </svg>
              <div>
                <div style={{ fontSize: 15, color: "var(--navy-800)", fontWeight: 500 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: "var(--ink-500)", marginTop: 4 }}>{s.hint}</div>
              </div>
            </div>
          </label>
        ))}
      </div>
      <input id="case-files" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.docx" style={{ display: "none" }} onChange={onFiles} />

      {files.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>الملفات المرفوعة — {files.length}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {files.map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 18px", background: "#fff", border: "1px solid var(--line-on-ivory)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M5 2 H13 L18 7 V20 H5 Z" stroke="var(--gold-600)" strokeWidth="1" fill="none"/>
                    <path d="M13 2 V7 H18" stroke="var(--gold-600)" strokeWidth="1" fill="none"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: 14, color: "var(--navy-800)" }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-500)" }}>{fmt(f.size)}</div>
                  </div>
                </div>
                <button type="button" onClick={() => removeFile(i)} style={{ fontSize: 13, color: "var(--gold-600)" }}>إزالة</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <p style={{ marginTop: 24, fontSize: 13, color: "var(--ink-500)", lineHeight: 1.7 }}>
        الحد الأقصى لحجم الملف الواحد ١٠ ميجابايت. تُحفظ الملفات بسرّية تامة ولا تُشارك مع أي طرف ثالث.
      </p>
    </div>
  );
}

function Step4({ register, errors, values }: any) {
  return (
    <div>
      <StepHeader num="04" title="الإقرارات" en="Declarations" lead="اقرأ الإقرارات بعناية قبل الإرسال. الموافقة عليها شرط لقبول الطلب للمراجعة." />

      <div style={{ background: "#fff", border: "1px solid var(--line-on-ivory)", padding: "8px 28px" }}>
        <CheckRow {...register("agreePrivacy")}>
          أوافق على <strong style={{ color: "var(--navy-800)" }}>سياسة الخصوصية</strong>، وأنّ بياناتي ستُعامل بسرّية تامة وفقًا للنظام.
        </CheckRow>
        <div className="hairline-strong" style={{ background: "var(--line-on-ivory)" }}></div>
        <CheckRow {...register("agreeAccuracy")}>
          أُقر بأن جميع البيانات والمستندات المدخلة <strong style={{ color: "var(--navy-800)" }}>صحيحة ومطابقة للواقع</strong>،
          وأتحمل المسؤولية الكاملة عن صحتها.
        </CheckRow>
        <div className="hairline-strong" style={{ background: "var(--line-on-ivory)" }}></div>
        <CheckRow {...register("agreeNonContract")}>
          أفهم أن إرسال الطلب <strong style={{ color: "var(--navy-800)" }}>لا يعني قبول القضية</strong> أو نشوء علاقة تعاقدية
          مع المكتب إلا بعد المراجعة الرسمية والموافقة الكتابية من المكتب.
        </CheckRow>
      </div>

      {(errors.agreePrivacy || errors.agreeAccuracy || errors.agreeNonContract) && (
        <p style={{ marginTop: 12, fontSize: 13, color: "#b94a48" }}>
          يجب الموافقة على جميع الإقرارات قبل الإرسال.
        </p>
      )}

      <div style={{ marginTop: 36 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>— ملخص الطلب</div>
        <div style={{ background: "var(--navy-800)", color: "var(--ivory-100)", padding: "28px 32px" }}>
          <SummaryRow k="العميل" v={`${values.fullName || "—"} · ${values.clientType} · ${values.caseRole}`} />
          <SummaryRow k="التواصل" v={`${values.phone || "—"} · ${values.email || "—"}`} dir="ltr" />
          <SummaryRow k="المدينة" v={values.city || "—"} />
          <SummaryRow k="نوع القضية" v={values.caseType || "—"} />
          <SummaryRow k="الجلسة" v={values.hasHearing === "نعم" ? `نعم — ${values.hearingDate || "—"}` : "لا"} />
          <SummaryRow k="المرفقات" v={`${values.files?.length || 0} ملف`} last />
        </div>
      </div>
    </div>
  );
}

function CheckRow({ children, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { children: React.ReactNode }) {
  return (
    <label className="check">
      <input type="checkbox" {...rest} />
      <span className="box"></span>
      <span className="lbl">{children}</span>
    </label>
  );
}

function SummaryRow({ k, v, dir, last }: { k: string; v: string; dir?: string; last?: boolean }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "120px 1fr", gap: 24,
      padding: "12px 0", borderBottom: last ? "none" : "1px solid rgba(244,238,227,0.08)",
    }}>
      <div className="eyebrow" style={{ color: "var(--gold-400)", fontSize: 10 }}>{k}</div>
      <div style={{ fontSize: 14, color: "var(--ivory-100)" }} dir={dir}>{v}</div>
    </div>
  );
}

function ErrBanner({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      padding: "14px 20px", marginBottom: 24,
      background: "rgba(185, 74, 72, 0.06)", border: "1px solid rgba(185, 74, 72, 0.3)",
      color: "#b94a48", fontSize: 14,
    }}>{children}</div>
  );
}

function CaseSuccess({ onReset }: { onReset: () => void }) {
  return (
    <div style={{
      background: "var(--ivory-50)", border: "1px solid var(--line-on-ivory)",
      borderTop: "2px solid var(--gold-500)", padding: "80px 32px", textAlign: "center",
    }}>
      <div style={{
        width: 88, height: 88, margin: "0 auto 28px",
        border: "1px solid var(--gold-500)",
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
      }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M6 18 L14 26 L30 10" stroke="var(--gold-600)" strokeWidth="1.5" fill="none"/>
        </svg>
        <div style={{ position: "absolute", inset: -8, border: "1px solid var(--line-strong)" }}></div>
      </div>
      <div className="eyebrow" style={{ marginBottom: 14 }}>— تم الاستلام</div>
      <h2 className="display" style={{ fontSize: 40, color: "var(--navy-800)", lineHeight: 1.2, marginBottom: 20 }}>
        تم استلام طلبك بنجاح
      </h2>
      <p style={{ fontSize: 17, color: "var(--ink-700)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.9 }}>
        سيتم التواصل معك بعد مراجعة البيانات. تذكّر أن إرسال الطلب لا يعني قبول القضية إلا بعد
        المراجعة الرسمية والموافقة الكتابية من المكتب.
      </p>
      <button className="btn btn-ghost-navy" onClick={onReset}>
        <span>تسجيل طلب آخر</span><span className="arrow"></span>
      </button>
    </div>
  );
}
