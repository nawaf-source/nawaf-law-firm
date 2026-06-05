"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isHome = pathname === "/";
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      <header className={`header ${scrolled || !isHome ? "scrolled" : ""}`}>
        <div className="container header-inner">
          <Link href="/" className="brand">
            <img
              src="/logo-full-transparent.png"
              alt="مكتب المحامي نواف بن أحمد المالكي — Law Firm & Legal Consultancy"
              className="brand-wordmark"
              style={{ height: 56, width: "auto", display: "block" }}
            />
          </Link>

          <nav className="nav">
            {NAV_ITEMS.filter((n) => !["new-case","consultation"].includes(n.id)).map((item) => (
              <Link key={item.id} href={item.href} className={isActive(item.href) ? "active" : ""}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/new-case" className="btn btn-gold" style={{ padding: "12px 22px", fontSize: 14 }}>
            <span>سجّل قضيتك</span><span className="arrow"></span>
          </Link>

          <button
            className={`menu-btn ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <Link key={item.id} href={item.href} className={isActive(item.href) ? "active" : ""}>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
