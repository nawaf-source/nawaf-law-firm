import React, { useState, useEffect, useRef } from "react";
import { SERVICES, WHY_US, PROCESS, CONTACT, NAV_ITEMS, FAQS, SA_REGIONS } from "./data.js";
import { BrandLogo, Header, Footer, SectionHead, Reveal, CtaStrip, PageHero, DecorPattern, ScalesGlyph, Field, PillRadio, Checkbox, validators, TitleAccent } from "./components.jsx";
import { ParallaxLayer, subscribe, reduceMotion, isMobile } from "./motion.jsx";
/* ============================================
   Main pages: Home, About, Services, Contact
   ============================================ */

/* ---------- HOME ---------- */
function HomePage({ setRoute }) {
  return (
    <div className="page">

      {/* HERO ---------------------------------------- */}
      <section className="hero-section" style={{
        background: "var(--navy-800)",
        color: "var(--ivory-100)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        paddingTop: 140,
        paddingBottom: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", opacity: "1", padding: "140px 0px 80px", margin: "0px", borderWidth: "0px", borderStyle: "solid", borderRadius: "0px"
      }}>
        {/* === brand DNA: logo calligraphy pattern (from official profile) === */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none"
        }}>
          {/* Large pattern panel — spans hero, fades toward the text side */}
          <div style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundImage: "url(/assets/pattern-tile-new.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "1000px 1000px",
            opacity: 0.15,
            animation: "patternDrift 50s linear infinite, patternShimmer 8s ease-in-out infinite",
            animation: "patternDrift 50s linear infinite",
            // fade toward the right so the headline stays clean
            maskImage: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0.2) 100%)",
            WebkitMaskImage: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0.2) 100%)"
          }} />

          {/* very light navy veil — keeps texture readable without hiding it */}
          <div style={{
            position: "absolute",
            top: 0, bottom: 0, left: 0,
            width: "100%",
            background: "linear-gradient(180deg, rgba(10,20,40,0.18) 0%, rgba(10,20,40,0.28) 100%)",
            pointerEvents: "none"
          }} />



          {/* warm mustard glow accent — anchors the right (text) side */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(700px 500px at 85% 35%, rgba(217,184,114,0.12), transparent 60%), radial-gradient(500px 400px at 25% 85%, rgba(217,184,114,0.05), transparent 60%)",
            animation: "warmPulse 11s ease-in-out infinite"
          }} />

          {/* floating mustard sparks */}
          {Array.from({ length: 10 }).map((_, i) => {
            const top = (i * 19 + 11) % 100;
            const left = 55 + i * 7 % 40;
            const size = 1.5 + i % 3 * 0.6;
            const delay = -(i * 1.1);
            const dur = 22 + i % 5 * 4;
            return (
              <span key={i} style={{
                position: "absolute",
                top: `${top}%`,
                left: `${left}%`,
                width: size,
                height: size,
                borderRadius: "50%",
                background: "rgba(241,221,176,0.85)",
                boxShadow: "0 0 10px rgba(217,184,114,0.7)",
                animation: `sparkDrift ${dur}s ease-in-out ${delay}s infinite`,
                opacity: 0.55
              }} />);

          })}
        </div>

        {/* deep navy wash — right side stronger to ensure text legibility */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, rgba(5,14,28,0.2) 0%, rgba(5,14,28,0.45) 35%, rgba(5,14,28,0.75) 60%, rgba(5,14,28,0.92) 100%)",
          pointerEvents: "none",
          zIndex: 1
        }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <DecorPattern />
        </div>

        <style>{`
          @keyframes patternDrift {
            from { background-position: 0 0; }
            to { background-position: -335px 0; }
          }
          @keyframes warmPulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          @keyframes sparkDrift {
            0%, 100% { transform: translate(0, 0); opacity: 0.4; }
            33% { transform: translate(30px, -20px); opacity: 0.85; }
            66% { transform: translate(-20px, -40px); opacity: 0.5; }
          }

          @media (max-width: 900px) {
            section [style*="patternDrift"] { width: 100% !important; opacity: 0.5 !important; }
          }
          @media (prefers-reduced-motion: reduce) {
            section [style*="patternDrift"],
            section [style*="warmPulse"],
            section [style*="heroLightSweep"],
            section [style*="sparkDrift"] { animation: none !important; }
          }
        `}</style>
        

        <div className="container" style={{ position: "relative", zIndex: 3 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 320px",
            gap: 48,
            alignItems: "end"
          }} className="hero-grid">

            {/* left: headline */}
            <div className="hero-left">
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <span className="num-marker" style={{ color: "var(--gold-300)" }}></span>
                <span className="eyebrow" style={{ color: "var(--gold-300)" }}></span>
              </div>

              <h1 className="display fade-in" style={{
                fontSize: "clamp(48px, 8vw, 112px)",
                lineHeight: 1.05,
                marginBottom: 28, fontFamily: "Tajawal", height: "358px", width: "859px",
                animationDelay: "0.1s"
              }}>
                <span className="silver-grad" style={{ fontFamily: "Cairo", fontSize: "64px" }}>نحمل عنك</span>
                <br />
                <span style={{ color: "var(--ivory-100)", fontFamily: "Cairo", fontSize: "64px" }}>عبء القضية...</span>
                <span style={{ color: "var(--gold-200)", fontFamily: "var(--f-serif)" }}></span>
                <br />
                <span className="serif" style={{ color: "var(--gold-200)", textShadow: "0 2px 24px rgba(241,221,176,0.35)", fontFamily: "Tajawal", padding: "0px", margin: "0px", borderRadius: "0px", lineHeight: "0", textAlign: "center", letterSpacing: "-0.2px", fontWeight: "400", fontSize: "67px" }}>ونسير معك في كل خطوة

                </span>
              </h1>

              <p className="fade-in" style={{
                color: "var(--ivory-300)",
                fontSize: 18,
                lineHeight: 1.9,
                maxWidth: 620,
                marginBottom: 40,
                animationDelay: "0.3s"
              }}>
                نقدم خدمات قانونية متكاملة للأفراد والشركات، تجمع بين الخبرة القانونية،
                السرية التامة، والدقة في التعامل مع القضايا وفق الأنظمة السعودية.
              </p>

              <div className="fade-in" style={{ display: "flex", gap: 14, flexWrap: "wrap", animationDelay: "0.5s" }}>
                <a href="#" className="btn btn-gold" onClick={(e) => {e.preventDefault();setRoute("new-case");window.scrollTo(0, 0);}}>
                  <span>سجّل قضيتك الآن</span><span className="arrow"></span>
                </a>
                <a href="#" className="btn btn-ghost-ivory" onClick={(e) => {e.preventDefault();setRoute("consultation");window.scrollTo(0, 0);}}>
                  <span>اطلب استشارة قانونية</span><span className="arrow"></span>
                </a>
              </div>
            </div>

            {/* right: stats / quote card */}
            <div className="fade-in" style={{
              borderInlineStart: "1px solid rgba(144,146,152,0.4)",
              paddingInlineStart: 32,
              animationDelay: "0.65s"
            }}>
              <div style={{ marginBottom: 36 }}>
                <div className="eyebrow-latin" style={{ color: "var(--gold-200)" }}>— Mandate</div>
                <p className="serif" style={{
                  fontSize: 20,
                  lineHeight: 1.7,
                  color: "var(--ivory-100)",
                  marginTop: 12,
                  fontFamily: "Tajawal"
                }}>
                  «ترسيخ مبادئ العدالة من خلال حلول قانونية دقيقة، تجمع بين الفهم العميق للشريعة والأنظمة الحديثة.»
                </p>
              </div>

              <div className="hairline" style={{ background: "rgba(144,146,152,0.3)", marginBottom: 28 }}></div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <Stat num="11" label="مجال تخصص" />
                <Stat num="24h" label="مدة الردّ" />
                <Stat num="100%" label="سرّية مهنية" />
                <Stat num="KSA" label="نطاق العمل" />
              </div>
            </div>
          </div>
        </div>

        {/* bottom strip */}
        <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, zIndex: 3 }}>
          <div className="container" style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontSize: 11, letterSpacing: "0.2em", color: "var(--ivory-300)", textTransform: "uppercase"
          }}>
            <span style={{ fontFamily: "var(--f-latin)", fontStyle: "italic", textTransform: "none", fontSize: 13 }}>

            </span>
            <span style={{ letterSpacing: "normal" }}>جدة — المملكة العربية السعودية</span>
          </div>
        </div>

      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
          .hero-grid > div:last-child {
            border-inline-start: none !important;
            padding-inline-start: 0 !important;
            border-top: 1px solid rgba(144,146,152,0.3);
            padding-top: 40px;
          }
        }
      `}</style>

      {/* ABOUT BRIEF ---------------------------------------- */}
      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="about-grid">
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 20, fontSize: "25px", letterSpacing: "10.3px", height: "0px", width: "569px" }}>— 01 نبذة عن المكتب</div>
              <h2 className="display" style={{ color: "var(--navy-800)", fontFamily: "Cairo", fontSize: "64px", textAlign: "right", fontWeight: "500", width: "587px", padding: "0px", margin: "-2px", borderWidth: "0px", borderStyle: "solid", borderRadius: "0px", height: "285px", letterSpacing: "0.3px", lineHeight: "1.8" }}>
                التخصّص القانوني<br />
                <span className="serif" style={{ color: "var(--gold-600)", fontFamily: "Tajawal", fontWeight: "500" }}>أساسٌ</span>{" "}
                لقرارات سليمة.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p style={{ fontSize: 17, lineHeight: 2, color: "var(--ink-700)" }}>
                نحن في مكتب المحامي <strong style={{ color: "var(--navy-800)" }}>نواف بن أحمد المالكي</strong> نؤمن بأن
                التخصص القانوني والمعرفة الدقيقة بالأنظمة السعودية أساسٌ لتقديم حلول قانونية فعّالة. نمثّل عملاءنا بكفاءة أمام
                الجهات المختصة، ونقدم الاستشارات القانونية، ونصوغ العقود، ونعالج النزاعات التجارية والعقارية والعمالية وغيرها.
              </p>

              <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 10, fontSize: "25px" }}>الرؤية</div>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--ink-700)" }}>
                    تحقيق العدالة بشكل يضمن القيم الأخلاقية والمبادئ الشرعية، عبر استشارات قانونية مبنية على التحليل العميق والالتزام بالمهنة.
                  </p>
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 10, fontSize: "25px" }}>الرسالة</div>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--ink-700)" }}>
                    ترسيخ مبادئ العدالة بحلول قانونية دقيقة تجمع بين الشريعة والأنظمة الحديثة، بالثقة والشفافية والمسؤولية المهنية.
                  </p>
                </div>
              </div>

              <a href="#" className="btn btn-ghost-navy" onClick={(e) => {e.preventDefault();setRoute("about");window.scrollTo(0, 0);}} style={{ marginTop: 36 }}>
                <span>تعرّف على المكتب</span><span className="arrow"></span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>

      {/* SERVICES PREVIEW ---------------------------------------- */}
      <section className="section" style={{ background: "var(--ivory-50)" }}>
        <div className="container">
          <SectionHead num="02" eyebrow="خدماتنا القانونية" title="مجالات الممارسة" en="Practice Areas" />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            borderTop: "1px solid var(--line)",
            borderInlineStart: "1px solid var(--line)"
          }} className="svc-grid">
            {SERVICES.slice(0, 6).map((s, i) =>
            <ServiceCellRow key={s.id} s={s} setRoute={setRoute} index={i} />
            )}
          </div>

          <style>{`
            @media (max-width: 900px) { .svc-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px) { .svc-grid { grid-template-columns: 1fr !important; } }
          `}</style>

          <div style={{ marginTop: 56, textAlign: "center" }}>
            <a href="#" className="btn btn-ghost-navy" onClick={(e) => {e.preventDefault();setRoute("services");window.scrollTo(0, 0);}}>
              <span>عرض كل المجالات (١١ مجالاً)</span><span className="arrow"></span>
            </a>
          </div>
        </div>
      </section>

      {/* WHY US ---------------------------------------- */}
      <section className="section" style={{
        background: "var(--navy-800)",
        color: "var(--ivory-100)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="pattern-band top" style={{ height: 80, opacity: 0.12 }}></div>
        <div className="navy-light-sweep"></div>
        <DecorPattern />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <SectionHead num="03" eyebrow="لماذا تختارنا" title={<span style={{ color: "var(--ivory-100)" }}>أربعة أعمدة <span className="serif" style={{ color: "var(--gold-400)", lineHeight: "1.2", textAlign: "left", fontFamily: "Tajawal", fontWeight: "400", fontSize: "1.18em", letterSpacing: "0px", padding: "0px", margin: "0" }}>للثقة</span></span>} en="Why Us" />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0
          }} className="why-grid">
            {WHY_US.map((w, i) =>
            <Reveal key={w.num} delay={i * 80}>
                <div style={{
                padding: "0 28px",
                borderInlineEnd: i < WHY_US.length - 1 ? "1px solid rgba(144,146,152,0.25)" : "none",
                minHeight: 260
              }}>
                  <div className="serif" style={{ fontSize: 56, color: "var(--gold-200)", lineHeight: 1, marginBottom: 24, textShadow: "0 2px 18px rgba(241,221,176,0.25)" }}>
                    {w.num}
                  </div>
                  <h3 className="display" style={{ fontSize: 24, marginBottom: 14, color: "var(--ivory-100)" }}>{w.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--ivory-300)" }}>{w.desc}</p>
                </div>
              </Reveal>
            )}
          </div>

          <style>{`
            @media (max-width: 900px) {
              .why-grid { grid-template-columns: 1fr 1fr !important; gap: 40px 0 !important; }
              .why-grid > div > div { border-inline-end: none !important; }
            }
            @media (max-width: 560px) {
              .why-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* PROCESS — pinned scroll storytelling ---------------------------------------- */}
      <ProcessPinned />

      {/* CONFIDENTIALITY ---------------------------------------- */}
      <section style={{
        background: "linear-gradient(135deg, var(--navy-700) 0%, var(--navy-900) 100%)",
        color: "var(--ivory-100)",
        padding: "140px 0",
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="pattern-band top" style={{ height: 90, opacity: 0.10 }}></div>
        <div className="navy-light-sweep"></div>

        {/* animated 3D logo emblem — left side (effects woven WITH the mark) */}
        <div
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            const stage = e.currentTarget.querySelector(".emblem-stage");
            if (stage) {
              stage.style.transform = `rotateX(${-py * 22}deg) rotateY(${px * 32}deg) scale(1.04)`;
            }
          }}
          onMouseLeave={(e) => {
            const stage = e.currentTarget.querySelector(".emblem-stage");
            if (stage) {stage.style.transform = "";}
          }}
          className="conf-emblem"
          onClick={() => { setRoute("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{
            position: "absolute",
            left: "7%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "min(42%, 540px)",
            aspectRatio: "1",
            zIndex: 2,
            pointerEvents: "auto",
            cursor: "pointer",
            perspective: "1200px", opacity: "1"
          }}>
          {/* the whole cluster tilts together as one 3D body */}
          <div className="emblem-stage" style={{
            position: "absolute", inset: 0,
            transformStyle: "preserve-3d",
            transition: "transform 0.2s ease-out", opacity: "1"
          }}>

            {/* the mark itself — idle float + integrated aura glow */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex",
              transformStyle: "preserve-3d", zIndex: 2, fontFamily: "Cairo", fontWeight: "500", height: "535px", gap: "0px", flexDirection: "row", alignItems: "stretch", justifyContent: "center", padding: "0px", margin: "0px", borderWidth: "0px", borderStyle: "solid", borderRadius: "0px", color: "rgb(255, 241, 195)", opacity: "1"
            }}>
              {/* soft aura behind the mark */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                width: "72%", aspectRatio: "1",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(200,210,230,0.18) 0%, rgba(217,184,114,0.08) 45%, transparent 70%)",
                borderRadius: "50%",
                animation: "logoAura 7s ease-in-out infinite",
                pointerEvents: "none"
              }} />
              <img src="/assets/logo-mark-transparent.png" alt="" aria-hidden="true" className="emblem-img" style={{
                width: "90%", height: "auto",
                transformStyle: "preserve-3d",
                animation: "logo3DFloat 8s ease-in-out infinite, logoGlow 7s ease-in-out infinite",
                opacity: "1", objectFit: "contain"
              }} />
            </div>

          </div>
        </div>

        <style>{`
          @keyframes logoAura {
            0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.92); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.12); }
          }
          @keyframes logoGlow {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(195,205,220,0.25)) drop-shadow(0 16px 28px rgba(0,0,0,0.55)); }
            50% { filter: drop-shadow(0 0 22px rgba(195,205,220,0.7)) drop-shadow(0 0 8px rgba(217,184,114,0.2)) drop-shadow(0 16px 28px rgba(0,0,0,0.4)); }
          }
          @keyframes logo3DFloat {
            0% { transform: translateY(0) rotateX(0deg) rotateY(-13deg) rotateZ(-1deg);}
            25% { transform: translateY(-12px) rotateX(7deg) rotateY(-4deg) rotateZ(0deg);}
            50% { transform: translateY(0) rotateX(0deg) rotateY(13deg) rotateZ(1deg);}
            75% { transform: translateY(-12px) rotateX(-7deg) rotateY(4deg) rotateZ(0deg);}
            100% { transform: translateY(0) rotateX(0deg) rotateY(-13deg) rotateZ(-1deg);}
          }
          @media (max-width: 900px) {
            section [style*="logo3DFloat"] { display: none; }
          }
          @media (prefers-reduced-motion: reduce) {
            section [style*="haloSpin"], section [style*="glowPulse"], section [style*="orbitSpin"],
            section [style*="sparkTwinkle"], section [style*="logo3DFloat"] { animation: none !important; }
          }
        `}</style>

        <div className="container" style={{ position: "relative", zIndex: 1, fontFamily: "Tajawal" }}>
          <div style={{ maxWidth: 720 }}>
            <div className="eyebrow" style={{ color: "var(--gold-300)", marginBottom: 24, fontSize: "25px" }}>— 05  سرّية وخصوصية</div>
            <h2 className="display" style={{ fontSize: "clamp(36px, 5.5vw, 64px)", lineHeight: 1.1, fontFamily: "Cairo", height: "135px", width: "740px" }}>
              ما يُؤتمن عليه المكتب
              <br />
              <span className="serif" style={{ color: "var(--gold-200)", fontWeight: 400, padding: "0px 20px 0px 0px", textShadow: "0 2px 24px rgba(241,221,176,0.3)", fontFamily: "Cairo", letterSpacing: "0px" }}>
                يبقى داخل جدرانه.
              </span>
            </h2>
            <p style={{ marginTop: 32, fontSize: 17, lineHeight: 1.9, color: "var(--ivory-300)", maxWidth: 620 }}>
              نلتزم بأعلى معايير السرّية المهنية. جميع البيانات والمستندات تُعامل بسرّية تامة وفق
              نظام المحاماة السعودي ولا يتم الإفصاح عنها إلا بناءً على متطلب نظامي صريح.
            </p>

            <div style={{ display: "flex", gap: 40, marginTop: 48, flexWrap: "wrap" }}>
              <ConfBadge label="حماية الملفات" sub="تشفير عند النقل" />
              <ConfBadge label="السرّية المهنية" sub="بموجب نظام المحاماة" />
              <ConfBadge label="عدم الإفصاح" sub="إلا بأمر مختص" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP ---------------------------------------- */}
      <CtaStrip setRoute={setRoute} />
    </div>);

}

function Stat({ num, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(num);

  useEffect(() => {
    const m = String(num).match(/^(\d+)(.*)$/);
    if (!m) {setDisplay(num);return;}
    const target = parseInt(m[1], 10);
    const suffix = m[2] || "";
    const pad = m[1].length;
    const node = ref.current;
    if (!node) return;
    let started = false;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const dur = 1300;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = Math.round(eased * target);
          setDisplay(String(val).padStart(pad, "0") + suffix);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(node);
    return () => obs.disconnect();
  }, [num]);

  return (
    <div ref={ref}>
      <div className="display" style={{ fontSize: 32, color: "var(--gold-200)", fontWeight: 500, textShadow: "0 2px 18px rgba(241,221,176,0.3)" }}>{display}</div>
      <div style={{ fontSize: 12, color: "var(--ivory-300)", letterSpacing: "0.1em", marginTop: 6 }}>{label}</div>
    </div>);

}

function ServiceCellRow({ s, setRoute, index = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(
    () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setShown(true), (index % 3) * 90);
        obs.disconnect();
      }
    }, { threshold: 0.12 });
    obs.observe(node);
    return () => obs.disconnect();
  }, [index, shown]);
  return (
    <div
      ref={ref}
      onClick={() => {setRoute("services");window.scrollTo(0, 0);}}
      style={{
        padding: "44px 32px",
        borderInlineEnd: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        background: "transparent",
        cursor: "pointer",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s var(--ease), transform 0.6s var(--ease), background 0.3s var(--ease)",
        position: "relative"
      }}
      onMouseEnter={(e) => {e.currentTarget.style.background = "var(--navy-800)";}}
      onMouseLeave={(e) => {e.currentTarget.style.background = "transparent";}}>
      
      <ServiceCellInner s={s} />
    </div>);

}

function ServiceCellInner({ s }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ color: hover ? "var(--ivory-100)" : "var(--navy-800)", transition: "color 0.3s var(--ease)" }}>
      
      <div className="num-marker" style={{ color: hover ? "var(--gold-400)" : "var(--gold-600)" }}>— {s.num}</div>
      <h3 className="display" style={{ fontSize: 26, margin: "16px 0 12px" }}>{s.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: hover ? "var(--ivory-300)" : "var(--ink-700)" }}>
        {s.desc}
      </p>
      <div className="eyebrow-latin" style={{ marginTop: 20, fontSize: 12, color: hover ? "var(--gold-400)" : "var(--gold-600)" }}>
        {s.en} ↗
      </div>
    </div>);

}

function ProcessStep({ p, shown }) {
  return (
    <div style={{
      position: "relative", paddingInlineEnd: 24,
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : "translateY(26px)",
      transition: "opacity 0.55s var(--ease), transform 0.55s var(--ease)"
    }}>
      <div style={{
        width: 60, height: 60, borderRadius: 0,
        border: "1px solid var(--gold-500)",
        background: "var(--ivory-100)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--f-latin)", fontStyle: "italic", fontSize: 22,
        color: "var(--gold-600)",
        position: "relative", zIndex: 1,
        marginBottom: 28
      }}>
        {p.num}
      </div>
      <h3 className="display" style={{ fontSize: 22, marginBottom: 12, color: "var(--navy-800)" }}>{p.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--ink-700)" }}>{p.desc}</p>
    </div>);

}

/* PROCESS — pins while you scroll; steps reveal one-by-one. Falls back to a
   normal stacked reveal on mobile or when reduced-motion is requested. */
function ProcessPinned() {
  const wrapRef = useRef(null);
  const [pin] = useState(() => typeof window !== "undefined" && !isMobile() && !reduceMotion());
  const [active, setActive] = useState(pin ? 0 : PROCESS.length - 1);

  useEffect(() => {
    if (!pin) return;
    const node = wrapRef.current;
    if (!node) return;
    const update = () => {
      const r = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = r.height - vh;
      const scrolled = Math.min(Math.max(-r.top, 0), Math.max(total, 1));
      const prog = total > 0 ? scrolled / total : 0;
      const idx = Math.max(0, Math.min(PROCESS.length - 1, Math.floor(prog * PROCESS.length + 0.0001)));
      setActive(idx);
    };
    return subscribe(update);
  }, [pin]);

  const grid = (
    <div className="container">
      <SectionHead num="04" eyebrow="خطوات العمل" title="من الطلب إلى الحكم" en="Our Process    " accent="gold" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, position: "relative" }} className="proc-grid">
        <div style={{ position: "absolute", top: 30, right: 40, left: 40, height: 1, background: "var(--line)", zIndex: 0 }}></div>
        <div className="proc-progress" style={{
          position: "absolute", top: 30, right: 40, height: 1, background: "var(--gold-500)", zIndex: 0,
          width: `calc((100% - 80px) * ${PROCESS.length > 1 ? active / (PROCESS.length - 1) : 1})`,
          transition: "width 0.5s var(--ease)"
        }}></div>

        {PROCESS.map((p, i) =>
        <ProcessStep key={p.num} p={p} shown={pin ? i <= active : true} />
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .proc-grid { grid-template-columns: 1fr 1fr !important; gap: 40px 24px !important; }
          .proc-grid > div + div::before { display: none; }
          .proc-progress { display: none; }
        }
        @media (max-width: 560px) { .proc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>);


  if (!pin) {
    return (
      <section className="section" style={{ background: "var(--ivory-100)" }}>
        {grid}
      </section>);

  }
  return (
    <section ref={wrapRef} style={{ background: "var(--ivory-100)", position: "relative", height: `${(PROCESS.length + 1) * 55}vh` }}>
      <div style={{ position: "sticky", top: 0, minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div className="section" style={{ width: "100%", paddingTop: 0, paddingBottom: 0 }}>
          {grid}
        </div>
      </div>
    </section>);

}

function ConfBadge({ label, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{
        width: 8, height: 8,
        background: "var(--gold-400)",
        transform: "rotate(45deg)"
      }} />
      <div>
        <div style={{ fontSize: 15, color: "var(--ivory-100)", fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 12, color: "var(--ivory-300)", marginTop: 2 }}>{sub}</div>
      </div>
    </div>);

}

/* ---------- ABOUT ---------- */
function AboutPage({ setRoute }) {
  return (
    <div className="page">
      <PageHero
        num="01"
        eyebrow="من نحن"
        title={<span><span style={{ color: "var(--ivory-100)" }}>مكتبٌ يؤمن بأن</span><br /><span className="serif" style={{ color: "var(--gold-300)", fontFamily: "Tajawal" }}>التخصّص</span> طريق العدالة.</span>}
        en="About the Firm"
        lead="نحن في مكتب المحامي نواف بن أحمد المالكي نؤمن بأن التخصص القانوني والمعرفة الدقيقة بالأنظمة السعودية أساسٌ لتقديم حلول قانونية فعّالة لعملائنا." />
      

      {/* Manifesto */}
      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 64 }} className="about-cols">
            <Reveal>
              <div className="eyebrow">— مبادئنا</div>
              <div className="hairline-strong" style={{ width: 60, marginTop: 16 }}></div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="display" style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.3, color: "var(--navy-800)" }}>
                نمثّل عملاءنا بكفاءة أمام الجهات المختصة، ونقدّم الاستشارات القانونية، ونصوغ
                العقود، ونعالج النزاعات التجارية والعقارية والعمالية وفق الأنظمة السعودية المعتمدة.
              </h2>
            </Reveal>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 96 }} className="vm-grid">
            <Reveal delay={0}>
              <div style={{
                background: "var(--ivory-50)",
                padding: 48,
                borderTop: "2px solid var(--gold-500)",
                height: "100%"
              }}>
                <div className="num-marker">— الرؤية / Vision</div>
                <h3 className="display" style={{ fontSize: 32, marginTop: 14, marginBottom: 20, color: "var(--navy-800)" }}>الرؤية</h3>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: "var(--ink-700)" }}>
                  نسعى إلى تحقيق العدالة بشكل يضمن القيم الأخلاقية والمبادئ الشرعية، من خلال تقديم
                  استشارات قانونية مبنية على التحليل العميق والالتزام الكامل بمعايير المهنة.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{
                background: "var(--navy-800)",
                padding: 48,
                borderTop: "2px solid var(--gold-500)",
                color: "var(--ivory-100)",
                height: "100%"
              }}>
                <div className="num-marker" style={{ color: "var(--gold-400)" }}>— الرسالة / Mission</div>
                <h3 className="display" style={{ fontSize: 32, marginTop: 14, marginBottom: 20 }}>الرسالة</h3>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: "var(--ivory-300)" }}>
                  ترسيخ مبادئ العدالة من خلال حلول قانونية دقيقة، تجمع بين الفهم العميق للشريعة
                  والأنظمة الحديثة، وتقديم خدمات قانونية مبنية على الثقة والشفافية والمسؤولية المهنية.
                </p>
              </div>
            </Reveal>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .about-cols { grid-template-columns: 1fr !important; gap: 24px !important; }
              .vm-grid { grid-template-columns: 1fr !important; gap: 24px !important; margin-top: 56px !important; }
            }
          `}</style>
        </div>
      </section>

      {/* Founder / signature */}
      <section className="section" style={{ background: "var(--ivory-50)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "center" }} className="founder-grid">
            <Reveal>
              <div style={{
                aspectRatio: "3/4",
                background: "linear-gradient(135deg, var(--navy-700), var(--navy-900))",
                position: "relative",
                overflow: "hidden",
                border: "1px solid var(--line)"
              }}>
                {/* animated brand pattern behind the logo */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "url(/assets/pattern-tile-new.png)",
                  backgroundRepeat: "repeat",
                  backgroundSize: "700px 700px",
                  opacity: 0.45,
                  animation: "founderPatternDrift 30s linear infinite, patternGlow 6s ease-in-out infinite"
                }} />

                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(10,20,40,0.35) 0%, rgba(5,14,28,0.6) 100%)",
                  pointerEvents: "none"
                }} />


                <div style={{
                  position: "absolute",
                  inset: 0,
                  perspective: "1100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2
                }}>
                  {/* soft aura glow behind founder logo */}
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: "68%", aspectRatio: "1",
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(circle, rgba(200,210,230,0.2) 0%, rgba(217,184,114,0.07) 50%, transparent 72%)",
                    borderRadius: "50%",
                    animation: "logoAura 8s ease-in-out infinite",
                    pointerEvents: "none"
                  }} />
                  <div
                    onClick={() => { setRoute("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    title="العودة للصفحة الرئيسية"
                    style={{
                      position: "relative",
                      width: "78%",
                      transformStyle: "preserve-3d",
                      animation: "logo3DFloat 8s ease-in-out infinite",
                      cursor: "pointer"
                    }}>
                    <img src="/assets/logo-mark-transparent.png" alt="مكتب المحامي نواف بن أحمد المالكي" style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      display: "block",
                      animation: "logoGlow 8s ease-in-out infinite"
                    }} />
                  </div>
                </div>
                <div style={{
                  position: "absolute",
                  bottom: 24, right: 24,
                  color: "var(--ivory-100)",
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  zIndex: 2
                }}>

                </div>
                <style>{`
                  @keyframes founderPatternDrift {
                    from { background-position: 0 0; }
                    to { background-position: -200px 0; }
                  }
                  @keyframes patternGlow {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 0.36; }
                  }
                  @keyframes logoAura {
                    0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.9); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                  }
                  @keyframes logoGlow {
                    0%, 100% { filter: drop-shadow(0 0 5px rgba(195,205,220,0.2)) drop-shadow(0 18px 30px rgba(0,0,0,0.6)); }
                    50% { filter: drop-shadow(0 0 20px rgba(195,205,220,0.65)) drop-shadow(0 0 7px rgba(217,184,114,0.18)) drop-shadow(0 18px 30px rgba(0,0,0,0.45)); }
                  }
                  @keyframes logo3DFloat {
                    0%   { transform: translateY(0) rotateX(0deg) rotateY(-13deg) rotateZ(-1deg); }
                    25%  { transform: translateY(-12px) rotateX(7deg) rotateY(-4deg) rotateZ(0deg); }
                    50%  { transform: translateY(0) rotateX(0deg) rotateY(13deg) rotateZ(1deg); }
                    75%  { transform: translateY(-12px) rotateX(-7deg) rotateY(4deg) rotateZ(0deg); }
                    100% { transform: translateY(0) rotateX(0deg) rotateY(-13deg) rotateZ(-1deg); }
                  }
                  @keyframes sheenSweep {
                    0% { background-position: 250% 0; }
                    55%, 100% { background-position: -120% 0; }
                  }
                  @media (prefers-reduced-motion: reduce) {
                    [style*="founderPatternDrift"], [style*="logo3DFloat"],
                    [style*="logoGlow"], [style*="logoAura"],
                    [style*="sheenSweep"], [style*="patternGlow"] { animation: none !important; }
                  }
                `}</style>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="eyebrow">— الكلمة الافتتاحية</div>
              <h2 className="display" style={{ fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1.2, color: "var(--navy-800)", margin: "16px 0 28px" }}>
                «العدالة التزامٌ، لا شعار.»
              </h2>
              <p style={{ fontSize: 17, lineHeight: 2, color: "var(--ink-700)", marginBottom: 24 }}>
                منذ نشأة المكتب وحتى اليوم، آمنّا بأن العمل القانوني ليس مجرد ممارسةٍ مهنية،
                بل أمانةٌ تُمارَس بإتقانٍ ومسؤولية. التزامنا تجاه كل عميل هو نفسه التزامنا تجاه أصل القضية:
                البحث الجاد، الدقة في التحليل، والوضوح في التواصل.
              </p>
              <p style={{ fontSize: 17, lineHeight: 2, color: "var(--ink-700)", marginBottom: 36 }}>
                نعمل في خدمة الفرد والشركة وفق الأنظمة السعودية، ونلتزم بأن نُسهم في رفع مستوى
                الثقافة القانونية لكل من يطرق أبواب المكتب.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div className="serif" style={{ fontSize: 32, color: "var(--gold-600)", fontWeight: 400 }}>
                  نواف بن أحمد المالكي
                </div>
              </div>
              <div className="eyebrow-latin" style={{ marginTop: 8, fontSize: 14 }}>
                Managing Partner · Founder
              </div>
            </Reveal>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .founder-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            }
          `}</style>
        </div>
      </section>

      <CtaStrip setRoute={setRoute} />
    </div>);

}

/* ---------- SERVICES ---------- */
function ServicesPage({ setRoute }) {
  return (
    <div className="page">
      <PageHero
        num="02"
        eyebrow="خدماتنا القانونية"
        title={<span><span style={{ color: "var(--ivory-100)" }}>أحد عشر مجالاً</span><br /><span className="serif" style={{ color: "var(--gold-300)", fontFamily: "Tajawal", letterSpacing: "2.3px", lineHeight: "1.15" }}>لممارسة قانونية</span> متخصصة.</span>}
        en=" Eleven Areas of Practice   "
        lead="نقدّم خدماتنا في مجالات متخصصة تشمل التقاضي والاستشارات والصياغة وإدارة النزاعات، بما يفي باحتياجات الأفراد والشركات والمؤسسات." />
      

      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            borderTop: "1px solid var(--line)",
            borderInlineStart: "1px solid var(--line)"
          }} className="all-svc-grid">
            {SERVICES.map((s, i) => <ServiceCellRow key={s.id} s={s} setRoute={setRoute} index={i} />)}
          </div>
          <style>{`
            @media (max-width: 900px) { .all-svc-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px) { .all-svc-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </div>
      </section>

      <CtaStrip setRoute={setRoute} />
    </div>);

}

/* ---------- CONTACT ---------- */
function ContactPage({ setRoute }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!validators.required(form.name)) err.name = "مطلوب";
    if (!validators.saPhone(form.phone)) err.phone = "رقم سعودي غير صالح";
    if (!validators.email(form.email)) err.email = "بريد غير صالح";
    if (!validators.required(form.message)) err.message = "مطلوب";
    setErrors(err);
    if (Object.keys(err).length !== 0) return;
    setSending(true);
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "تعذر إرسال الرسالة");
      setSent(true);
    } catch (ex) {
      setServerError(ex.message || "تعذر إرسال الرسالة");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page">
      <PageHero
        num="06"
        eyebrow="تواصل معنا"
        title={<span>نسمعك<br /><span className="serif" style={{ color: "var(--gold-300)", fontFamily: "Tajawal" }}>قبل أن نتحدث.</span></span>}
        en="Get in Touch"
        lead="استخدم القنوات التالية للتواصل المباشر مع المكتب. سيتولّى فريقنا الرد خلال ٢٤ ساعة عمل." />
      

      <section className="section" style={{ background: "var(--ivory-100)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64 }} className="contact-grid">

            {/* Channels */}
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 20 }}>— القنوات</div>
              <h2 className="display" style={{ fontSize: 36, marginBottom: 36, color: "var(--navy-800)" }}>قنوات التواصل</h2>

              <ContactRow
                label="البريد الإلكتروني"
                value={CONTACT.email}
                href={`mailto:${CONTACT.email}`}
                latin="Email" />
              
              <ContactRow
                label="الجوال"
                value={CONTACT.phone}
                href={`tel:${CONTACT.phoneIntl}`}
                latin="Mobile"
                dir="ltr" />
              
              <ContactRow
                label="واتساب"
                value="محادثة فورية"
                href={`https://wa.me/${CONTACT.whatsapp}`}
                latin="WhatsApp"
                external />
              
              <ContactRow
                label="العنوان"
                value={CONTACT.address}
                latin="Address"
                noLink />
              

              {/* Google Map — Jeddah */}
              <div style={{
                marginTop: 40,
                aspectRatio: "16/9",
                position: "relative",
                overflow: "hidden",
                border: "1px solid var(--line)"
              }}>
                <iframe
                  title="موقع المكتب — جدة"
                  src="https://www.google.com/maps?q=%D9%85%D9%83%D8%AA%D8%A8+%D8%A7%D9%84%D9%85%D8%AD%D8%A7%D9%85%D9%8A+%D9%86%D9%88%D8%A7%D9%81+%D8%A8%D9%86+%D8%A3%D8%AD%D9%85%D8%AF+%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%83%D9%8A&hl=ar&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block", filter: "grayscale(0.3) contrast(1.05)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen />
                
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={120}>
              <div style={{
                background: "var(--ivory-50)",
                padding: 48,
                border: "1px solid var(--line-on-ivory)",
                borderTop: "2px solid var(--gold-500)"
              }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>— نموذج سريع</div>
                <h3 className="display" style={{ fontSize: 28, color: "var(--navy-800)", marginBottom: 32 }}>أرسل رسالة</h3>

                {sent ?
                <SuccessNote
                  title="تم استلام رسالتك"
                  body="شكرًا لتواصلك مع مكتب المحامي نواف بن أحمد المالكي. سنعاود الاتصال بك قريبًا."
                  onReset={() => {setSent(false);setForm({ name: "", phone: "", email: "", message: "" });}} /> :


                <form onSubmit={submit} style={{ display: "grid", gap: 20 }}>
                    <Field label="الاسم" required>
                      <input className="input" value={form.name} onChange={update("name")} />
                      {errors.name && <ErrText>{errors.name}</ErrText>}
                    </Field>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      <Field label="الجوال" required>
                        <input className="input" dir="ltr" placeholder="05XXXXXXXX" value={form.phone} onChange={update("phone")} />
                        {errors.phone && <ErrText>{errors.phone}</ErrText>}
                      </Field>
                      <Field label="البريد الإلكتروني" required>
                        <input className="input" dir="ltr" type="email" value={form.email} onChange={update("email")} />
                        {errors.email && <ErrText>{errors.email}</ErrText>}
                      </Field>
                    </div>
                    <Field label="رسالتك" required>
                      <textarea className="textarea" value={form.message} onChange={update("message")} placeholder="اكتب رسالتك هنا…"></textarea>
                      {errors.message && <ErrText>{errors.message}</ErrText>}
                    </Field>
                    {serverError &&
                    <div style={{ padding: "12px 18px", background: "rgba(185,74,72,0.06)", border: "1px solid rgba(185,74,72,0.3)", color: "#b94a48", fontSize: 14 }}>
                      {serverError}
                    </div>
                    }
                    <button type="submit" className="btn btn-gold" style={{ justifySelf: "start" }} disabled={sending}>
                      <span>{sending ? "...جارٍ الإرسال" : "إرسال الرسالة"}</span><span className="arrow"></span>
                    </button>
                    <p style={{ fontSize: 12, color: "var(--ink-500)", marginTop: 8 }}>
                       <span className="eyebrow-latin"></span> 
                    </p>
                  </form>
                }
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
    </div>);

}

function ContactRow({ label, value, href, latin, external, noLink, dir }) {
  const inner =
  <div style={{
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    gap: 24,
    alignItems: "center",
    padding: "26px 0",
    borderBottom: "1px solid var(--line)"
  }}>
      <div className="eyebrow" style={{ fontSize: 10, minWidth: 90 }}>{label}</div>
      <div className="display" style={{ color: "var(--navy-800)", borderWidth: "0px", borderStyle: "solid", borderRadius: "0px", fontFamily: "Tajawal", margin: "-17px", letterSpacing: "3.2px", fontWeight: "200", width: "323px", height: "49px", lineHeight: "1.25", fontSize: "13px", padding: "10px" }} dir={dir}>{value}</div>
      <div className="eyebrow-latin" style={{ color: "var(--gold-600)", fontSize: 13 }}>{latin} ↗</div>
    </div>;

  if (noLink) return inner;
  return (
    <a href={href} target={external ? "_blank" : undefined} rel="noopener" style={{ display: "block" }}>
      {inner}
    </a>);

}

function ErrText({ children }) {
  return <span style={{ fontSize: 12, color: "#b94a48" }}>{children}</span>;
}

function SuccessNote({ title, body, onReset }) {
  return (
    <div style={{
      padding: "32px 0",
      textAlign: "center"
    }}>
      <div style={{
        width: 64, height: 64,
        margin: "0 auto 20px",
        border: "1px solid var(--gold-500)",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M4 14 L11 21 L24 7" stroke="var(--gold-600)" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <h4 className="display" style={{ fontSize: 26, color: "var(--navy-800)", marginBottom: 12 }}>{title}</h4>
      <p style={{ fontSize: 15, color: "var(--ink-700)", lineHeight: 1.8, marginBottom: 28 }}>{body}</p>
      {onReset &&
      <button type="button" className="btn btn-ghost-navy" onClick={onReset}>
          <span>إرسال طلب آخر</span><span className="arrow"></span>
        </button>
      }
    </div>);

}

export {
  HomePage, AboutPage, ServicesPage, ContactPage,
  Stat, ServiceCellRow, ConfBadge, ContactRow, ErrText, SuccessNote
};