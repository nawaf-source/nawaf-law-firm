import React, { useState, useEffect, useRef, useMemo } from "react";
import { NAV_ITEMS, CONTACT } from "./data.js";
/* ============================================
   Shared components — Header, Footer, Hero bits
   ============================================ */



/* ---------- Brand mark (logo image) ---------- */
function BrandLogo({ size = 52, variant = "mark" }) {
  const src = variant === "full" ? "/assets/logo-full.jpg" : "/assets/logo-mark.jpg";
  return (
    <img
      src={src}
      alt="مكتب المحامي نواف بن أحمد المالكي"
      style={{ ...{ height: size, width: size, objectFit: "none" }, objectFit: "scale-down", width: "76px" }} />);


}

/* ---------- Header ---------- */
function Header({ route, setRoute }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => {setMenuOpen(false);}, [route]);

  const go = (id) => (e) => {
    e.preventDefault();
    setRoute(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className={`header ${scrolled || route !== "home" ? "scrolled" : ""}`}>
        <div className="container header-inner" style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-evenly", borderWidth: "0px", borderStyle: "solid", borderRadius: "0px", margin: "0px 174px", gap: "87px", height: "120px", lineHeight: "1.1", letterSpacing: "0px", padding: "0px 32px 17px" }}>
          <a href="#" className="brand" onClick={go("home")}>
            <img
              src="/assets/logo-full-transparent.png"
              alt="مكتب المحامي نواف بن أحمد المالكي — Law Firm & Legal Consultancy"
              className="brand-wordmark"
              style={{ display: "block", padding: "0px", height: "106px", width: "355px", margin: "6px" }} />
            
          </a>

          <nav className="nav">
            {NAV_ITEMS.filter((n) => !["new-case", "consultation"].includes(n.id)).map((item) =>
            <a
              key={item.id}
              href="#"
              onClick={go(item.id)}
              className={route === item.id ? "active" : ""}>
              
                {item.label}
              </a>
            )}
          </nav>

          <a href="#" className="btn btn-gold" onClick={go("new-case")} style={{ padding: "12px 22px", fontSize: 14 }}>
            <span>سجّل قضيتك</span>
            <span className="arrow"></span>
          </a>

          <button
            className={`menu-btn ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة">
            
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item) =>
        <a
          key={item.id}
          href="#"
          onClick={go(item.id)}
          className={route === item.id ? "active" : ""}>
          
            {item.label}
          </a>
        )}
      </div>
    </>);

}

/* ---------- Footer ---------- */
function Footer({ setRoute }) {
  const go = (id) => (e) => {
    e.preventDefault();
    setRoute(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="pattern-band top" style={{ height: 50, opacity: 0.12 }}></div>
      <div className="container" style={{ position: "relative", zIndex: 1, fontWeight: "500", textAlign: "right", letterSpacing: "2.5px", lineHeight: "1.35", width: "1279px", height: "320px", borderWidth: "0px", borderStyle: "solid", fontFamily: "Tajawal" }}>
        <div className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <img
                src="/assets/logo-full-transparent.png"
                alt="مكتب المحامي نواف بن أحمد المالكي — Law Firm & Legal Consultancy"
                style={{ display: "block", padding: "0px", borderStyle: "solid", borderRadius: "0px", objectFit: "scale-down", borderWidth: "0px", width: "352px", height: "217px", opacity: "1", margin: "-7px" }} />
              
            </div>
            <p style={{ lineHeight: 1.8, color: "var(--ivory-300)", maxWidth: 340, padding: "0px", width: "416px", height: "81px", textAlign: "left", fontSize: "16px" }}>
              مكتب محاماة سعودي يقدّم خدمات قانونية متكاملة للأفراد والشركات، تجمع بين الخبرة القانونية، السرية التامة، والدقة وفق الأنظمة السعودية.
            </p>
          </div>

          <div>
            <h4>روابط سريعة</h4>
            <ul>
              {NAV_ITEMS.slice(0, 5).map((item) =>
              <li key={item.id}>
                  <a href="#" onClick={go(item.id)}>{item.label}</a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4>قانوني</h4>
            <ul>
              <li><a href="#" onClick={go("faq")}>الأسئلة الشائعة</a></li>
              <li><a href="#" onClick={go("privacy")}>سياسة الخصوصية</a></li>
              <li><a href="#" onClick={go("terms")}>الشروط والأحكام</a></li>
            </ul>
          </div>

          <div>
            <h4>تواصل</h4>
            <ul>
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li><a href={`tel:${CONTACT.phoneIntl}`} dir="ltr" style={{ display: "inline-block" }}>{CONTACT.phone}</a></li>
              <li><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener">واتساب مباشر</a></li>
              <li style={{ color: "var(--ivory-300)", fontSize: 14 }}>{CONTACT.address}</li>
            </ul>
          </div>
        </div>

        <div className="copy">
          <span>© ٢٠٢٦ مكتب المحامي نواف بن أحمد المالكي — جميع الحقوق محفوظة</span>
          <span style={{ fontFamily: "var(--f-latin)", fontStyle: "italic" }}>

          </span>
        </div>
      </div>
    </footer>);

}

/* ---------- Section head ---------- */
function TitleAccent({ size = 60, variant = "gold", flip = false, flipY = false, style = {} }) {
  const transforms = [];
  if (flip) transforms.push("scaleX(-1)");
  if (flipY) transforms.push("scaleY(-1)");
  const src = variant === "silver" ? "/assets/title-accent-silver.png" : "/assets/title-accent.png";
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      style={{ ...{
          width: size,
          height: "auto",
          display: "block",
          transform: transforms.join(" ") || "none",
          ...style, margin: "0px"
        }, objectFit: "cover", padding: "0px", borderRadius: "0px", borderWidth: "0px", borderStyle: "solid", height: "55px", width: "79px", opacity: "1", margin: "-8px -14px -11px -26px" }} />);


}

function SectionHead({ num, eyebrow, title, en, accent = "silver", accentSize = 60, accentStyle = {} }) {
  return (
    <div className="section-head">
      <div style={{ display: "flex", gap: 14, justifyContent: "flex-start", alignItems: "flex-start" }}>
        <span className="num-marker" style={{ letterSpacing: "3.1px", textAlign: "center", fontFamily: "Tajawal", fontSize: "25px" }}>— {num}</span>
        <span className="eyebrow" style={{ fontSize: "25px" }}>{eyebrow}</span>
      </div>
      <h2 className="display" style={{ height: "109px", whiteSpace: "nowrap" }}>{title}</h2>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: -4 }}>
        <TitleAccent variant={accent} size={accentSize} style={accentStyle} />
        <div className="eyebrow-latin" style={{ alignSelf: "end", fontSize: "36px", margin: "0px", borderWidth: "0px", borderStyle: "solid", borderRadius: "0px", height: "94px", whiteSpace: "nowrap" }}>{en}</div>
      </div>
    </div>);

}

/* ---------- Reveal-on-scroll wrapper ---------- */
function Reveal({ children, delay = 0, as = "div", className = "", style = {} }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [delay]);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={style}>
      
      {children}
    </Tag>);

}

/* ---------- CTA Strip (reusable) ---------- */
function CtaStrip({ setRoute }) {
  return (
    <section style={{ background: "var(--navy-800)", color: "var(--ivory-100)", padding: "80px 0", position: "relative", overflow: "hidden", fontFamily: "\"IBM Plex Sans Arabic\"" }}>
      <div className="navy-light-sweep"></div>
      <div className="container cta-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center", position: "relative", zIndex: 1 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14, fontSize: "26px", color: "rgb(219, 208, 181)" }}>ابدأ الآن</div>
          <h3 className="display" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "var(--ivory-100)", fontFamily: "Cairo" }}>
            خطوتك الأولى نحو حقّك تبدأ من هنا
          </h3>
          <p style={{ marginTop: 12, color: "var(--ivory-300)", fontSize: 15, maxWidth: 600, lineHeight: 1.8, fontFamily: "Tajawal" }}>
            سجّل قضيتك أو اطلب استشارتك القانونية، وسيتولّى فريقنا المراجعة والرد خلال ٢٤ ساعة عمل.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="#" className="btn btn-gold" onClick={(e) => {e.preventDefault();setRoute("new-case");window.scrollTo(0, 0);}}>
            <span style={{ fontFamily: "Helvetica" }}>سجّل قضيتك</span><span className="arrow"></span>
          </a>
          <a href="#" className="btn btn-ghost-ivory" onClick={(e) => {e.preventDefault();setRoute("consultation");window.scrollTo(0, 0);}}>
            <span>استشارة قانونية</span><span className="arrow"></span>
          </a>
        </div>
      </div>
    </section>);

}

/* ---------- Page hero (reusable for inner pages) ---------- */
function PageHero({ num, eyebrow, title, lead, en }) {
  return (
    <section style={{
      background: "var(--navy-800)",
      color: "var(--ivory-100)",
      padding: "180px 0 100px",
      position: "relative",
      overflow: "hidden"
    }}>
      <div className="pattern-band top" style={{ height: 110, opacity: 0.15 }}></div>
      <div className="pattern-band side-left" style={{ width: "55%", opacity: 0.5, WebkitMaskImage: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)", maskImage: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)" }}></div>
      <div className="navy-light-sweep"></div>
      <DecorPattern />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <span className="num-marker" style={{ color: "var(--gold-400)" }}>— {num}</span>
          <span className="eyebrow" style={{ color: "var(--gold-400)" }}>{eyebrow}</span>
        </div>
        <h1 className="display" style={{ fontSize: "clamp(44px, 7vw, 88px)", color: "var(--ivory-100)", maxWidth: 1000, height: "202px" }}>
          {title}
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 18 }}>
          <TitleAccent />
          {en &&
          <div className="eyebrow-latin" style={{ color: "var(--gold-300)", fontSize: 18, lineHeight: "1.7", letterSpacing: "1px", margin: "0px", borderWidth: "0px", borderStyle: "solid", borderRadius: "0px", fontWeight: "500", width: "332px", height: "30px", padding: "4px" }}>
              {en}
            </div>
          }
        </div>
        {lead &&
        <p style={{ marginTop: 32, color: "var(--ivory-300)", fontSize: 17, maxWidth: 720, lineHeight: 1.9 }}>
            {lead}
          </p>
        }
      </div>
    </section>);

}

/* ---------- Decorative geometric pattern (subtle, hand-built simple shapes only) ---------- */
function DecorPattern() {
  return null;
}

/* ---------- Scales-of-justice glyph (very simple shapes only) ---------- */
function ScalesGlyph({ size = 48, color = "var(--gold-500)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ fill: "rgb(190, 10, 10)", width: "1px" }}>
      <line x1="24" y1="6" x2="24" y2="42" stroke={color} strokeWidth="1.2" />
      <line x1="8" y1="14" x2="40" y2="14" stroke={color} strokeWidth="1.2" />
      <circle cx="24" cy="6" r="2" fill={color} />
      <circle cx="8" cy="14" r="1.6" fill={color} />
      <circle cx="40" cy="14" r="1.6" fill={color} />
      {/* Left pan */}
      <line x1="8" y1="14" x2="3" y2="26" stroke={color} strokeWidth="1" />
      <line x1="8" y1="14" x2="13" y2="26" stroke={color} strokeWidth="1" />
      <line x1="3" y1="26" x2="13" y2="26" stroke={color} strokeWidth="1.2" />
      {/* Right pan */}
      <line x1="40" y1="14" x2="35" y2="26" stroke={color} strokeWidth="1" />
      <line x1="40" y1="14" x2="45" y2="26" stroke={color} strokeWidth="1" />
      <line x1="35" y1="26" x2="45" y2="26" stroke={color} strokeWidth="1.2" />
      {/* Base */}
      <line x1="14" y1="42" x2="34" y2="42" stroke={color} strokeWidth="1.4" />
      <line x1="20" y1="38" x2="28" y2="38" stroke={color} strokeWidth="1" />
    </svg>);

}

/* ---------- Field components ---------- */
function Field({ label, required, children, full }) {
  return (
    <div className="field" style={{ gridColumn: full ? "1 / -1" : undefined }}>
      <label>
        {label}
        {required && <span className="req">*</span>}
      </label>
      {children}
    </div>);

}

function PillRadio({ options, value, onChange }) {
  return (
    <div className="pill-group">
      {options.map((opt) =>
      <button
        key={opt}
        type="button"
        className={`pill ${value === opt ? "active" : ""}`}
        onClick={() => onChange(opt)}>
        
          {opt}
        </button>
      )}
    </div>);

}

function Checkbox({ checked, onChange, children }) {
  return (
    <label className="check">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="box"></span>
      <span className="lbl">{children}</span>
    </label>);

}

/* ---------- Validation helpers ---------- */
const validators = {
  saPhone: (v) => /^(05|5|9665|\+9665|009665)\d{8}$/.test(String(v || "").replace(/\s/g, "")),
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "")),
  required: (v) => String(v || "").trim().length > 0
};

/* ---------- Export to global ---------- */
export {
  BrandLogo, Header, Footer, SectionHead, Reveal, CtaStrip, PageHero,
  DecorPattern, ScalesGlyph, Field, PillRadio, Checkbox, validators, TitleAccent
};