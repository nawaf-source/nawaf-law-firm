/* ============================================
   Forms pages: New Case, Consultation, FAQ
   ============================================ */

/* ---------- NEW CASE (Multi-step) ---------- */
function NewCasePage({ setRoute }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    // step 1
    fullName: "", phone: "", email: "", city: "",
    clientType: "فرد",
    caseRole: "مدعي",
    // step 2
    caseType: "", court: "", caseNumber: "", opponent: "",
    hasHearing: "لا", hearingDate: "",
    description: "", demands: "",
    // step 3
    files: [],
    // step 4
    agreePrivacy: false,
    agreeAccuracy: false,
    agreeNonContract: false
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setData({ ...data, [k]: v });
  const upd = (k) => (e) => set(k, e.target.value);

  const validateStep = (s) => {
    const err = {};
    if (s === 1) {
      if (!validators.required(data.fullName)) err.fullName = "مطلوب";
      if (!validators.saPhone(data.phone)) err.phone = "رقم سعودي غير صالح (٠٥xxxxxxxx)";
      if (!validators.email(data.email)) err.email = "بريد غير صالح";
      if (!validators.required(data.city)) err.city = "اختر مدينة";
    }
    if (s === 2) {
      if (!validators.required(data.caseType)) err.caseType = "مطلوب";
      if (!validators.required(data.description)) err.description = "اكتب وصفًا تفصيليًا";
      if (data.hasHearing === "نعم" && !validators.required(data.hearingDate)) err.hearingDate = "حدد تاريخ الجلسة";
    }
    if (s === 4) {
      if (!data.agreePrivacy) err.agreePrivacy = "يجب الموافقة";
      if (!data.agreeAccuracy) err.agreeAccuracy = "يجب الإقرار";
      if (!data.agreeNonContract) err.agreeNonContract = "يجب الإقرار";
    }
    return err;
  };

  const next = () => {
    const err = validateStep(step);
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const back = () => {setStep(step - 1);window.scrollTo({ top: 0, behavior: "smooth" });};

  const onSubmit = (e) => {
    e.preventDefault();
    const err = validateStep(4);
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onFiles = (e) => {
    const list = Array.from(e.target.files || []);
    set("files", [...data.files, ...list]);
  };
  const removeFile = (i) => {
    const arr = data.files.slice();
    arr.splice(i, 1);
    set("files", arr);
  };

  const steps = [
  { num: 1, label: "بيانات العميل", en: "Client" },
  { num: 2, label: "بيانات القضية", en: "Case" },
  { num: 3, label: "المرفقات", en: "Attachments" },
  { num: 4, label: "الإقرارات", en: "Declarations" }];


  return (
    <div className="page">
      <PageHero
        num="03"
        eyebrow="تسجيل قضية جديدة"
        title={<span><span style={{ color: "var(--ivory-100)" }}>سجّل قضيتك</span><br /><span className="serif" style={{ fontStyle: "italic", color: "var(--gold-300)" }}>للمراجعة</span> القانونية.</span>}
        en="Register a New Case"
        lead="ستصلك ردود الفريق خلال ٢٤ ساعة عمل من تاريخ المراجعة. إرسال الطلب لا يعني قبول القضية إلا بعد المراجعة الرسمية." />
      

      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container" style={{ maxWidth: 980 }}>

          {submitted ?
          <CaseSuccess setRoute={setRoute} setSubmitted={setSubmitted} setStep={setStep} setData={setData} /> :

          <>
              {/* Stepper */}
              <StepIndicator steps={steps} current={step} />

              <div style={{
              background: "var(--ivory-50)",
              border: "1px solid var(--line-on-ivory)",
              borderTop: "2px solid var(--gold-500)",
              padding: "48px clamp(24px, 4vw, 56px)",
              marginTop: 48
            }}>
                {step === 1 && <Step1Client data={data} set={set} upd={upd} errors={errors} />}
                {step === 2 && <Step2Case data={data} set={set} upd={upd} errors={errors} />}
                {step === 3 && <Step3Files data={data} onFiles={onFiles} removeFile={removeFile} />}
                {step === 4 && <Step4Declarations data={data} set={set} errors={errors} />}

                <div className="hairline" style={{ margin: "40px 0 28px" }}></div>

                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <div>
                    {step > 1 &&
                  <button type="button" className="btn btn-ghost-navy" onClick={back}>
                        <span style={{ transform: "scaleX(-1)" }} className="arrow"></span>
                        <span>السابق</span>
                      </button>
                  }
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    {step < 4 &&
                  <button type="button" className="btn btn-gold" onClick={next}>
                        <span>التالي</span><span className="arrow"></span>
                      </button>
                  }
                    {step === 4 &&
                  <button type="button" className="btn btn-gold" onClick={onSubmit}>
                        <span>إرسال القضية للمراجعة</span><span className="arrow"></span>
                      </button>
                  }
                  </div>
                </div>
              </div>

              <p style={{ marginTop: 24, fontSize: 12, color: "var(--ink-500)", textAlign: "center" }}>
                جميع البيانات مشفّرة عند النقل ومحميّة بـ <span className="eyebrow-latin">Cloudflare Turnstile</span>.
              </p>
            </>
          }

        </div>
      </section>
    </div>);

}

function StepIndicator({ steps, current }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
      gap: 0,
      borderTop: "1px solid var(--line)"
    }}>
      {steps.map((s, i) => {
        const active = s.num === current;
        const done = s.num < current;
        return (
          <div
            key={s.num}
            style={{
              padding: "24px 20px",
              borderInlineStart: i > 0 ? "1px solid var(--line)" : "none",
              borderBottom: active ? "2px solid var(--gold-500)" : "1px solid var(--line)",
              background: active ? "var(--ivory-50)" : "transparent",
              transition: "all 0.3s var(--ease)",
              position: "relative"
            }}>
            
            <div className="num-marker" style={{
              color: active ? "var(--gold-600)" : done ? "var(--gold-500)" : "var(--ink-500)"
            }}>
              — {String(s.num).padStart(2, "0")}
              {done && <span style={{ marginInlineStart: 6 }}>✓</span>}
            </div>
            <div className="display" style={{
              fontSize: 18,
              marginTop: 6,
              color: active ? "var(--navy-800)" : done ? "var(--ink-700)" : "var(--ink-500)"
            }}>
              {s.label}
            </div>
            <div className="eyebrow-latin" style={{
              fontSize: 11,
              color: active ? "var(--gold-600)" : "var(--ink-500)",
              marginTop: 4
            }}>{s.en}</div>
          </div>);

      })}
    </div>);

}

/* ---------- Step 1: Client ---------- */
function Step1Client({ data, set, upd, errors }) {
  return (
    <div>
      <StepHeader num="01" title="بيانات العميل" en="Client Information" lead="نحتاج بياناتك الأساسية للتواصل ومتابعة الطلب." />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="grid-2">
        <Field label="الاسم الكامل" required>
          <input className="input" value={data.fullName} onChange={upd("fullName")} placeholder="مثال: محمد بن عبدالله" />
          {errors.fullName && <ErrText>{errors.fullName}</ErrText>}
        </Field>
        <Field label="رقم الجوال" required>
          <input className="input" dir="ltr" value={data.phone} onChange={upd("phone")} placeholder="05XXXXXXXX" />
          {errors.phone && <ErrText>{errors.phone}</ErrText>}
        </Field>
        <Field label="البريد الإلكتروني" required>
          <input className="input" dir="ltr" type="email" value={data.email} onChange={upd("email")} placeholder="name@example.com" />
          {errors.email && <ErrText>{errors.email}</ErrText>}
        </Field>
        <Field label="المدينة" required>
          <select className="select" value={data.city} onChange={upd("city")}>
            <option value="">— اختر المدينة —</option>
            {SA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {errors.city && <ErrText>{errors.city}</ErrText>}
        </Field>
      </div>

      <div style={{ marginTop: 28 }}>
        <Field label="نوع العميل" required>
          <PillRadio
            options={["فرد", "شركة", "مؤسسة"]}
            value={data.clientType}
            onChange={(v) => set("clientType", v)} />
          
        </Field>
      </div>

      <div style={{ marginTop: 28 }}>
        <Field label="الصفة في القضية" required>
          <PillRadio
            options={["مدعي", "مدعى عليه", "مشتكي", "متهم", "طرف آخر"]}
            value={data.caseRole}
            onChange={(v) => set("caseRole", v)} />
          
        </Field>
      </div>

      <style>{`
        @media (max-width: 700px) { .grid-2 { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>);

}

/* ---------- Step 2: Case ---------- */
function Step2Case({ data, set, upd, errors }) {
  const caseTypes = [
  "تجاري", "عمالي", "عقاري", "أحوال شخصية", "جزائي", "إداري", "ضريبي / زكوي",
  "تنفيذ", "تحكيم", "إفلاس وإعسار", "مقاولات وإنشاءات", "أخرى"];

  return (
    <div>
      <StepHeader num="02" title="بيانات القضية" en="Case Information" lead="معلومات تفصيلية عن طبيعة القضية ومرحلتها الحالية." />

      <Field label="نوع القضية" required>
        <PillRadio options={caseTypes} value={data.caseType} onChange={(v) => set("caseType", v)} />
        {errors.caseType && <ErrText>{errors.caseType}</ErrText>}
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginTop: 28 }} className="grid-3">
        <Field label="الجهة / المحكمة">
          <input className="input" value={data.court} onChange={upd("court")} placeholder="إن وجدت" />
        </Field>
        <Field label="رقم القضية">
          <input className="input" dir="ltr" value={data.caseNumber} onChange={upd("caseNumber")} placeholder="إن وجد" />
        </Field>
        <Field label="اسم الطرف الآخر">
          <input className="input" value={data.opponent} onChange={upd("opponent")} placeholder="إن وجد" />
        </Field>
      </div>

      <div style={{ marginTop: 28 }}>
        <Field label="هل توجد جلسة قادمة؟" required>
          <PillRadio options={["نعم", "لا"]} value={data.hasHearing} onChange={(v) => set("hasHearing", v)} />
        </Field>
      </div>

      {data.hasHearing === "نعم" &&
      <div style={{ marginTop: 20, maxWidth: 320 }}>
          <Field label="تاريخ الجلسة" required>
            <input className="input" type="date" value={data.hearingDate} onChange={upd("hearingDate")} />
            {errors.hearingDate && <ErrText>{errors.hearingDate}</ErrText>}
          </Field>
        </div>
      }

      <div style={{ marginTop: 28 }}>
        <Field label="وصف القضية بالتفصيل" required>
          <textarea
            className="textarea"
            rows={6}
            value={data.description}
            onChange={upd("description")}
            placeholder="اشرح ملابسات القضية، التواريخ الرئيسية، الأطراف، والإجراءات السابقة…"
            style={{ minHeight: 180 }} />
          
          {errors.description && <ErrText>{errors.description}</ErrText>}
        </Field>
      </div>

      <div style={{ marginTop: 24 }}>
        <Field label="الطلبات المطلوبة من المكتب">
          <textarea
            className="textarea"
            value={data.demands}
            onChange={upd("demands")}
            placeholder="مثال: ترافع، استشارة، صياغة مذكرة، تنفيذ حكم…" />
          
        </Field>
      </div>

      <style>{`
        @media (max-width: 800px) { .grid-3 { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .grid-3 { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>);

}

/* ---------- Step 3: Files ---------- */
function Step3Files({ data, onFiles, removeFile }) {
  const slots = [
  { id: "id", label: "الهوية الوطنية / الإقامة", hint: "صورة واضحة للهوية" },
  { id: "contract", label: "العقد (إن وجد)", hint: "عقد محل النزاع" },
  { id: "docs", label: "المستندات الرسمية", hint: "صكوك، تراخيص، خطابات" },
  { id: "evidence", label: "الصور والأدلة", hint: "صور، رسائل، إثباتات" }];


  const fmt = (size) => {
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / 1024 / 1024).toFixed(1) + " MB";
  };

  return (
    <div>
      <StepHeader num="03" title="المرفقات" en="Attachments" lead="حمّل المستندات المتعلقة بالقضية. يقبل PDF و JPG و PNG و DOCX." />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="grid-2">
        {slots.map((s) =>
        <label
          key={s.id}
          htmlFor="case-files"
          style={{
            border: "1px dashed var(--line-strong)",
            padding: "28px 24px",
            cursor: "pointer",
            background: "#fff",
            transition: "all 0.25s var(--ease)",
            display: "flex",
            flexDirection: "column",
            gap: 6
          }}
          onMouseEnter={(e) => {e.currentTarget.style.borderColor = "var(--gold-500)";e.currentTarget.style.background = "var(--ivory-50)";}}
          onMouseLeave={(e) => {e.currentTarget.style.borderColor = "var(--line-strong)";e.currentTarget.style.background = "#fff";}}>
          
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <UploadIcon />
              <div>
                <div style={{ fontSize: 15, color: "var(--navy-800)", fontWeight: 500 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: "var(--ink-500)", marginTop: 4 }}>{s.hint}</div>
              </div>
            </div>
          </label>
        )}
      </div>

      <input
        id="case-files"
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.docx"
        style={{ display: "none" }}
        onChange={onFiles} />
      

      {data.files.length > 0 &&
      <div style={{ marginTop: 32 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>الملفات المرفوعة — {data.files.length}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.files.map((f, i) =>
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 18px", background: "#fff",
            border: "1px solid var(--line-on-ivory)"
          }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <FileIcon />
                  <div>
                    <div style={{ fontSize: 14, color: "var(--navy-800)" }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-500)" }}>{fmt(f.size)}</div>
                  </div>
                </div>
                <button type="button" onClick={() => removeFile(i)} style={{ fontSize: 13, color: "var(--gold-600)" }}>
                  إزالة
                </button>
              </div>
          )}
          </div>
        </div>
      }

      <p style={{ marginTop: 24, fontSize: 13, color: "var(--ink-500)", lineHeight: 1.7 }}>
        الحد الأقصى لحجم الملف الواحد ١٠ ميجابايت. تُحفظ الملفات بسرّية تامة ولا تُشارك مع أي طرف ثالث.
      </p>

      <style>{`
        @media (max-width: 700px) { .grid-2 { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>);

}

function UploadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 18 V6 M14 6 L9 11 M14 6 L19 11" stroke="var(--gold-600)" strokeWidth="1.2" fill="none" />
      <path d="M4 18 V22 H24 V18" stroke="var(--gold-600)" strokeWidth="1.2" fill="none" />
    </svg>);

}
function FileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M5 2 H13 L18 7 V20 H5 Z" stroke="var(--gold-600)" strokeWidth="1" fill="none" />
      <path d="M13 2 V7 H18" stroke="var(--gold-600)" strokeWidth="1" fill="none" />
    </svg>);

}

/* ---------- Step 4: Declarations ---------- */
function Step4Declarations({ data, set, errors }) {
  return (
    <div>
      <StepHeader num="04" title="الإقرارات" en="Declarations" lead="اقرأ الإقرارات بعناية قبل الإرسال. الموافقة عليها شرط لقبول الطلب للمراجعة." />

      <div style={{ background: "#fff", border: "1px solid var(--line-on-ivory)", padding: "8px 28px" }}>
        <Checkbox
          checked={data.agreePrivacy}
          onChange={(v) => set("agreePrivacy", v)}>
          
          أوافق على <strong style={{ color: "var(--navy-800)" }}>سياسة الخصوصية</strong>، وأنّ بياناتي ستُعامل بسرّية تامة وفقًا للنظام.
        </Checkbox>
        <div className="hairline-strong" style={{ background: "var(--line-on-ivory)" }}></div>
        <Checkbox
          checked={data.agreeAccuracy}
          onChange={(v) => set("agreeAccuracy", v)}>
          
          أُقر بأن جميع البيانات والمستندات المدخلة <strong style={{ color: "var(--navy-800)" }}>صحيحة ومطابقة للواقع</strong>،
          وأتحمل المسؤولية الكاملة عن صحتها.
        </Checkbox>
        <div className="hairline-strong" style={{ background: "var(--line-on-ivory)" }}></div>
        <Checkbox
          checked={data.agreeNonContract}
          onChange={(v) => set("agreeNonContract", v)}>
          
          أفهم أن إرسال الطلب <strong style={{ color: "var(--navy-800)" }}>لا يعني قبول القضية</strong> أو نشوء علاقة تعاقدية
          مع المكتب إلا بعد المراجعة الرسمية والموافقة الكتابية من المكتب.
        </Checkbox>
      </div>

      {(errors.agreePrivacy || errors.agreeAccuracy || errors.agreeNonContract) &&
      <p style={{ marginTop: 12, fontSize: 13, color: "#b94a48" }}>
          يجب الموافقة على جميع الإقرارات قبل الإرسال.
        </p>
      }

      {/* Summary */}
      <div style={{ marginTop: 36 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>— ملخص الطلب</div>
        <div style={{ background: "var(--navy-800)", color: "var(--ivory-100)", padding: "28px 32px" }}>
          <SummaryRow k="العميل" v={`${data.fullName || "—"} · ${data.clientType} · ${data.caseRole}`} />
          <SummaryRow k="التواصل" v={`${data.phone || "—"} · ${data.email || "—"}`} dir="ltr" />
          <SummaryRow k="المدينة" v={data.city || "—"} />
          <SummaryRow k="نوع القضية" v={data.caseType || "—"} />
          <SummaryRow k="الجلسة" v={data.hasHearing === "نعم" ? `نعم — ${data.hearingDate || "—"}` : "لا"} />
          <SummaryRow k="المرفقات" v={`${data.files.length} ملف`} last />
        </div>
      </div>
    </div>);

}
function SummaryRow({ k, v, dir, last }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "120px 1fr",
      gap: 24,
      padding: "12px 0",
      borderBottom: last ? "none" : "1px solid rgba(244,238,227,0.08)"
    }}>
      <div className="eyebrow" style={{ color: "var(--gold-400)", fontSize: 10 }}>{k}</div>
      <div style={{ fontSize: 14, color: "var(--ivory-100)" }} dir={dir}>{v}</div>
    </div>);

}

function StepHeader({ num, title, en, lead }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        <span className="num-marker">— STEP {num}</span>
        <span className="eyebrow-latin" style={{ fontSize: 12 }}>{en}</span>
      </div>
      <h3 className="display" style={{ fontSize: 32, color: "var(--navy-800)", marginBottom: 12 }}>{title}</h3>
      <p style={{ fontSize: 15, color: "var(--ink-700)", lineHeight: 1.8 }}>{lead}</p>
    </div>);

}

function CaseSuccess({ setRoute, setSubmitted, setStep, setData }) {
  return (
    <div style={{
      background: "var(--ivory-50)",
      border: "1px solid var(--line-on-ivory)",
      borderTop: "2px solid var(--gold-500)",
      padding: "80px 32px",
      textAlign: "center"
    }}>
      <div style={{
        width: 88, height: 88, margin: "0 auto 28px",
        border: "1px solid var(--gold-500)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative"
      }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M6 18 L14 26 L30 10" stroke="var(--gold-600)" strokeWidth="1.5" fill="none" />
        </svg>
        <div style={{
          position: "absolute", inset: -8,
          border: "1px solid var(--line-strong)"
        }}></div>
      </div>
      <div className="eyebrow" style={{ marginBottom: 14 }}>— تم الاستلام</div>
      <h2 className="display" style={{ fontSize: 40, color: "var(--navy-800)", lineHeight: 1.2, marginBottom: 20 }}>
        تم استلام طلبك بنجاح
      </h2>
      <p style={{ fontSize: 17, color: "var(--ink-700)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.9 }}>
        سيتم التواصل معك بعد مراجعة البيانات. تذكّر أن إرسال الطلب لا يعني قبول القضية إلا بعد
        المراجعة الرسمية والموافقة الكتابية من المكتب.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn btn-ghost-navy" onClick={() => {setSubmitted(false);setStep(1);setData({
            fullName: "", phone: "", email: "", city: "",
            clientType: "فرد", caseRole: "مدعي",
            caseType: "", court: "", caseNumber: "", opponent: "",
            hasHearing: "لا", hearingDate: "",
            description: "", demands: "",
            files: [],
            agreePrivacy: false, agreeAccuracy: false, agreeNonContract: false
          });}}>
          <span>تسجيل طلب آخر</span><span className="arrow"></span>
        </button>
        <button className="btn btn-gold" onClick={() => {setRoute("home");window.scrollTo(0, 0);}}>
          <span>العودة للرئيسية</span><span className="arrow"></span>
        </button>
      </div>
    </div>);

}

/* ---------- CONSULTATION ---------- */
function ConsultationPage({ setRoute }) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    type: "",
    description: "",
    preferredContact: "اتصال",
    agreePrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const consultTypes = [
  "تجارية", "عمالية", "عقارية", "أحوال شخصية", "ضريبية", "تأسيس كيان", "أخرى"];


  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!validators.required(form.name)) err.name = "مطلوب";
    if (!validators.saPhone(form.phone)) err.phone = "رقم سعودي غير صالح";
    if (!validators.email(form.email)) err.email = "بريد غير صالح";
    if (!validators.required(form.type)) err.type = "اختر نوع الاستشارة";
    if (!validators.required(form.description)) err.description = "اكتب وصفًا مختصرًا";
    if (!form.agreePrivacy) err.agreePrivacy = "يجب الموافقة";
    setErrors(err);
    if (Object.keys(err).length === 0) setSent(true);
  };

  return (
    <div className="page">
      <PageHero
        num="04"
        eyebrow="طلب استشارة قانونية"
        title={<span><span style={{ color: "var(--ivory-100)" }}>استشارة قانونية</span><br /><span className="serif" style={{ fontStyle: "italic", color: "var(--gold-300)" }}>مدروسة</span> في خطوات بسيطة.</span>}
        en="Legal Consultation Request"
        lead="استشارة مكتوبة من فريقنا في المسألة التي تشغلك. يصلك الردّ خلال ٢٤ ساعة عمل من تاريخ التواصل." />
      

      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container" style={{ maxWidth: 820 }}>

          {sent ?
          <SuccessNote
            title="تم استلام طلب الاستشارة"
            body="شكرًا لتواصلك مع مكتب المحامي نواف بن أحمد المالكي. سيراجع الفريق طلبك ويتواصل معك بالطريقة المفضّلة."
            onReset={() => {
              setSent(false);
              setForm({ name: "", phone: "", email: "", type: "", description: "", preferredContact: "اتصال", agreePrivacy: false });
            }} /> :


          <form onSubmit={submit} style={{
            background: "var(--ivory-50)",
            border: "1px solid var(--line-on-ivory)",
            borderTop: "2px solid var(--gold-500)",
            padding: "48px clamp(24px, 4vw, 56px)"
          }}>
              <StepHeader num="01" title="بيانات الطلب" en="Request Details" lead="املأ النموذج التالي، وسيقوم فريقنا بالتواصل معك بالطريقة المفضّلة لديك." />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="grid-2">
                <Field label="الاسم" required>
                  <input className="input" value={form.name} onChange={update("name")} />
                  {errors.name && <ErrText>{errors.name}</ErrText>}
                </Field>
                <Field label="رقم الجوال" required>
                  <input className="input" dir="ltr" value={form.phone} onChange={update("phone")} placeholder="05XXXXXXXX" />
                  {errors.phone && <ErrText>{errors.phone}</ErrText>}
                </Field>
              </div>

              <div style={{ marginTop: 24 }}>
                <Field label="البريد الإلكتروني" required>
                  <input className="input" dir="ltr" type="email" value={form.email} onChange={update("email")} placeholder="name@example.com" />
                  {errors.email && <ErrText>{errors.email}</ErrText>}
                </Field>
              </div>

              <div style={{ marginTop: 28 }}>
                <Field label="نوع الاستشارة" required>
                  <PillRadio
                  options={consultTypes}
                  value={form.type}
                  onChange={(v) => setForm({ ...form, type: v })} />
                
                  {errors.type && <ErrText>{errors.type}</ErrText>}
                </Field>
              </div>

              <div style={{ marginTop: 28 }}>
                <Field label="وصف مختصر للاستشارة" required>
                  <textarea
                  className="textarea"
                  value={form.description}
                  onChange={update("description")}
                  placeholder="اكتب وصفًا مختصرًا للمسألة التي تستشير فيها…"
                  style={{ minHeight: 160 }} />
                
                  {errors.description && <ErrText>{errors.description}</ErrText>}
                </Field>
              </div>

              <div style={{ marginTop: 28 }}>
                <Field label="طريقة التواصل المفضّلة" required>
                  <PillRadio
                  options={["اتصال", "واتساب", "إيميل"]}
                  value={form.preferredContact}
                  onChange={(v) => setForm({ ...form, preferredContact: v })} />
                
                </Field>
              </div>

              <div style={{ marginTop: 28, background: "#fff", border: "1px solid var(--line-on-ivory)", padding: "8px 24px" }}>
                <Checkbox
                checked={form.agreePrivacy}
                onChange={(v) => setForm({ ...form, agreePrivacy: v })}>
                
                  أوافق على <strong style={{ color: "var(--navy-800)" }}>سياسة الخصوصية</strong>،
                  وأفهم أن إرسال الطلب لا ينشئ علاقة تعاقدية مع المكتب.
                </Checkbox>
              </div>
              {errors.agreePrivacy && <ErrText>{errors.agreePrivacy}</ErrText>}

              <div className="hairline" style={{ margin: "32px 0" }}></div>

              <button type="submit" className="btn btn-gold">
                <span>إرسال طلب الاستشارة</span><span className="arrow"></span>
              </button>

              <p style={{ marginTop: 20, fontSize: 12, color: "var(--ink-500)" }}>
                محميّ بـ <span className="eyebrow-latin">Cloudflare Turnstile</span>. ترسل البيانات إلى {CONTACT.email}
              </p>

              <style>{`
                @media (max-width: 700px) { .grid-2 { grid-template-columns: 1fr !important; } }
              `}</style>
            </form>
          }

        </div>
      </section>
    </div>);

}

/* ---------- FAQ ---------- */
function FAQPage({ setRoute }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="page">
      <PageHero
        num="07"
        eyebrow="الأسئلة الشائعة"
        title={<span>أجوبةٌ مباشرة<br /><span className="serif" style={{ fontStyle: "italic", color: "var(--gold-300)", fontFamily: "Tajawal" }}>لأسئلتك</span> القانونية.</span>}
        en="Frequently Asked Questions"
        lead="أبرز الأسئلة التي يطرحها العملاء قبل تسجيل قضية أو طلب استشارة." />
      

      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {FAQS.map((f, i) =>
            <FaqItem
              key={i}
              num={String(i + 1).padStart(2, "0")}
              q={f.q}
              a={f.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)} />

            )}
          </div>
        </div>
      </section>

      <CtaStrip setRoute={setRoute} />
    </div>);

}

function FaqItem({ num, q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "32px 0",
          textAlign: "right",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: 24,
          alignItems: "center",
          cursor: "pointer"
        }}>
        
        <div className="num-marker" style={{ minWidth: 40 }}>— {num}</div>
        <h3 className="display" style={{ fontSize: "clamp(20px, 2.4vw, 26px)", color: "var(--navy-800)", fontWeight: 500 }}>
          {q}
        </h3>
        <div style={{
          width: 36, height: 36,
          border: "1px solid var(--line-strong)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s var(--ease)",
          background: open ? "var(--navy-800)" : "transparent",
          color: open ? "var(--gold-400)" : "var(--navy-800)"
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s var(--ease)" }}>
            <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="1.2" />
            <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>
      </button>
      <div style={{
        maxHeight: open ? 400 : 0,
        overflow: "hidden",
        transition: "max-height 0.5s var(--ease)"
      }}>
        <p style={{
          padding: "0 64px 36px 0",
          fontSize: 16,
          lineHeight: 2,
          color: "var(--ink-700)"
        }}>
          {a}
        </p>
      </div>
    </div>);

}

Object.assign(window, {
  NewCasePage, ConsultationPage, FAQPage,
  StepIndicator, Step1Client, Step2Case, Step3Files, Step4Declarations,
  StepHeader, CaseSuccess, FaqItem, SummaryRow,
  UploadIcon, FileIcon
});