/* ============================================
   Legal pages: Privacy, Terms
   ============================================ */

const PRIVACY_SECTIONS = [
  {
    num: "01",
    title: "سرّية بيانات العملاء",
    body: "يلتزم مكتب المحامي نواف بن أحمد المالكي بحماية البيانات الشخصية لعملائه وضمان سرّيتها وفق نظام المحاماة السعودي ولوائحه التنفيذية، ووفق المبادئ المهنية المعتمدة في ممارسة المحاماة. لن تُكشف أي معلومة عن العميل أو قضيته إلا في الحالات المنصوص عليها نظامًا.",
  },
  {
    num: "02",
    title: "نطاق استخدام البيانات",
    body: "تُجمع البيانات المقدّمة عبر نماذج الموقع (تسجيل القضية، طلب الاستشارة، التواصل) لغرض واحد فقط هو مراجعة الطلب وتقدير قابلية قبول القضية والتواصل مع مقدم الطلب. لا تُستخدم البيانات في أي أغراض تسويقية أو إعلانية أو تحليلية تتجاوز هذا الغرض.",
  },
  {
    num: "03",
    title: "عدم مشاركة البيانات",
    body: "لا يُشارك المكتب بيانات العملاء مع أي طرف ثالث، ما لم يكن ذلك مطلوبًا بموجب حكم قضائي أو طلب رسمي من جهة مختصة بصلاحية نظامية. عند ذلك يُلتزم بتقديم الحد الأدنى من البيانات اللازمة فقط.",
  },
  {
    num: "04",
    title: "حماية الملفات والمرفقات",
    body: "تُحفظ المرفقات والمستندات في بيئة آمنة، وتُشفّر أثناء النقل عبر بروتوكولات الأمان القياسية. يقتصر الوصول إليها على الفريق المعني بمراجعة الطلب فقط، ولا يُتاح الوصول إليها لأي طرف خارج المكتب.",
  },
  {
    num: "05",
    title: "علاقة المحامي بالعميل",
    body: "لا ينشأ بمجرد إرسال نموذج التسجيل أو الاستشارة أي علاقة محامٍ-عميل بين الطرفين. تنشأ هذه العلاقة فقط بعد مراجعة المكتب للطلب وقبوله رسميًا وتوقيع وكالة عمل مكتوبة تنظم حدود التمثيل القانوني.",
  },
  {
    num: "06",
    title: "ملفات تعريف الارتباط",
    body: "قد يستخدم الموقع ملفات تعريف ارتباط (Cookies) لتحسين تجربة التصفّح. هذه الملفات لا تجمع بيانات شخصية يمكن من خلالها التعرف على هويّتك. يمكنك تعطيلها من خلال إعدادات المتصفّح دون أن يؤثر ذلك على وظائف الموقع الأساسية.",
  },
  {
    num: "07",
    title: "حق الوصول والحذف",
    body: "يحق لكل عميل طلب الاطلاع على بياناته المحفوظة لدى المكتب، وطلب تحديثها أو حذفها بشرط ألا يتعارض ذلك مع الالتزامات النظامية أو متطلبات حفظ المعلومات وفق نظام المحاماة.",
  },
];

const TERMS_SECTIONS = [
  {
    num: "01",
    title: "طبيعة المعلومات المنشورة",
    body: "جميع المعلومات المنشورة في هذا الموقع تُقدَّم لأغراض إعلامية وتعريفية بطبيعة عمل المكتب وخدماته. لا تُعتبر هذه المعلومات استشارة قانونية نهائية في أي مسألة بعينها، ولا يجوز الاستناد إليها بمعزل عن استشارة قانونية مكتوبة من المكتب.",
  },
  {
    num: "02",
    title: "إرسال النماذج",
    body: "إرسال نموذج تسجيل القضية أو طلب الاستشارة أو نموذج التواصل لا ينشئ بحد ذاته أي علاقة تعاقدية بين المرسل والمكتب. تنشأ العلاقة التعاقدية فقط بعد المراجعة الرسمية للطلب، وموافقة المكتب الكتابية، وتوقيع وكالة عمل ودفع الأتعاب المتفق عليها.",
  },
  {
    num: "03",
    title: "حق القبول أو الرفض",
    body: "يحتفظ المكتب بكامل الحق في قبول أو رفض أي طلب يصله، دون الحاجة إلى إبداء الأسباب. كما يحتفظ بحق إنهاء التمثيل القانوني وفق ما يقضي به نظام المحاماة ولوائحه التنفيذية ووثيقة الاتفاق الموقّعة مع العميل.",
  },
  {
    num: "04",
    title: "مسؤولية صحة البيانات",
    body: "العميل مسؤول مسؤولية كاملة عن صحة جميع البيانات والمستندات التي يقدّمها للمكتب. أي خطأ أو تضليل أو إخفاء معلومات قد يؤثر على مسار القضية يقع على عاتق العميل وحده، ولا يتحمل المكتب أي تبعات ناتجة عن ذلك.",
  },
  {
    num: "05",
    title: "السرّية المتبادلة",
    body: "تُعامل جميع البيانات والمستندات المتبادلة بين العميل والمكتب بسرّية مهنية تامة وفق نظام المحاماة. يلتزم العميل بدوره بعدم نشر أو الإفصاح عن مذكرات المكتب أو آرائه القانونية لأي طرف ثالث دون إذن كتابي مسبق.",
  },
  {
    num: "06",
    title: "تحديث الشروط",
    body: "يحتفظ المكتب بحقّ تعديل هذه الشروط والأحكام في أي وقت دون إشعار مسبق. يُعتبر استخدام الموقع بعد التعديل قبولًا ضمنيًا للشروط المعدّلة. ننصح بمراجعة هذه الصفحة بشكل دوري للاطلاع على أحدث تحديثاتها.",
  },
  {
    num: "07",
    title: "الاختصاص القضائي",
    body: "تخضع هذه الشروط لأحكام الأنظمة المعمول بها في المملكة العربية السعودية. وفي حال نشوء أي نزاع متعلق بتفسيرها أو تنفيذها، يكون الاختصاص للمحاكم المختصة في المملكة العربية السعودية حصرًا.",
  },
];

function LegalPage({ setRoute, hero, sections, kind }) {
  return (
    <div className="page">
      {hero}

      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container" style={{ maxWidth: 980 }}>

          {/* TOC */}
          <Reveal>
            <div style={{
              display: "grid",
              gridTemplateColumns: "240px 1fr",
              gap: 48,
              paddingBottom: 56,
              borderBottom: "1px solid var(--line)",
              marginBottom: 80,
            }} className="legal-toc">
              <div>
                <div className="eyebrow" style={{ marginBottom: 14 }}>— الفهرس</div>
                <div className="hairline-strong" style={{ width: 60 }}></div>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {sections.map(s => (
                  <li key={s.num}>
                    <a href={`#sec-${s.num}`} style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: 16,
                      padding: "10px 0",
                      borderBottom: "1px dashed var(--line)",
                      color: "var(--navy-800)",
                      transition: "color 0.2s var(--ease)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold-600)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--navy-800)"; }}
                    >
                      <span className="num-marker">— {s.num}</span>
                      <span style={{ fontSize: 15 }}>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Sections */}
          {sections.map((s, i) => (
            <Reveal key={s.num} delay={Math.min(i * 60, 240)}>
              <div id={`sec-${s.num}`} style={{
                display: "grid",
                gridTemplateColumns: "240px 1fr",
                gap: 48,
                padding: "48px 0",
                borderBottom: "1px solid var(--line)",
              }} className="legal-sec">
                <div>
                  <div className="num-marker" style={{ fontSize: 16 }}>— {s.num}</div>
                  <h3 className="display" style={{ fontSize: 28, color: "var(--navy-800)", marginTop: 12, lineHeight: 1.2 }}>
                    {s.title}
                  </h3>
                </div>
                <p style={{ fontSize: 16, lineHeight: 2, color: "var(--ink-700)" }}>
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}

          {/* Updated date */}
          <div style={{ marginTop: 56, textAlign: "center" }}>
            <div className="eyebrow-latin">Last updated · آخر تحديث</div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 18, color: "var(--navy-800)", marginTop: 6 }}>
              ٢٢ مايو ٢٠٢٦ — Riyadh
            </div>
          </div>

          <style>{`
            @media (max-width: 800px) {
              .legal-toc, .legal-sec { grid-template-columns: 1fr !important; gap: 16px !important; }
            }
          `}</style>
        </div>
      </section>

      <CtaStrip setRoute={setRoute} />
    </div>
  );
}

function PrivacyPage({ setRoute }) {
  return (
    <LegalPage
      setRoute={setRoute}
      kind="privacy"
      sections={PRIVACY_SECTIONS}
      hero={
        <PageHero
          num="08"
          eyebrow="سياسة الخصوصية"
          title={<span>الثقة التزامٌ<br/><span className="serif" style={{ fontStyle: "italic", color: "var(--gold-300)" }}>قبل</span> أن تكون اتفاقًا.</span>}
          en="Privacy Policy"
          lead="نوضّح في هذه السياسة كيف نتعامل مع بياناتك الشخصية ومستنداتك بسرّية مهنية مطلقة وفق نظام المحاماة السعودي."
        />
      }
    />
  );
}

function TermsPage({ setRoute }) {
  return (
    <LegalPage
      setRoute={setRoute}
      kind="terms"
      sections={TERMS_SECTIONS}
      hero={
        <PageHero
          num="09"
          eyebrow="الشروط والأحكام"
          title={<span>قواعد واضحة<br/><span className="serif" style={{ fontStyle: "italic", color: "var(--gold-300)" }}>لعلاقة</span> مهنية ثابتة.</span>}
          en="Terms & Conditions"
          lead="باستخدامك لهذا الموقع وتقديم الطلبات عبره، فإنك توافق على الشروط والأحكام التالية التي تحكم العلاقة بينك وبين المكتب."
        />
      }
    />
  );
}

Object.assign(window, { PrivacyPage, TermsPage, LegalPage });
