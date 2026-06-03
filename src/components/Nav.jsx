import { useState, useEffect } from "react";
import { useMobile, useActiveSection, useScrollProgress } from "../hooks";
import { PROFILE as P } from "../data/portfolio";
import { t } from '../styles/tokens';

const NAV_LINKS = [
  { id: "about",        label: "About" },
  { id: "skills",       label: "Skills" },
  { id: "projects",     label: "Projects" },
  { id: "experience",   label: "Experience" },
  { id: "education",    label: "Education" },
  { id: "certificates", label: "Certs" },
  { id: "awards",       label: "Awards" },
  { id: "events",       label: "Events" },
];

export default function Nav({ dark, toggle, t, openContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobile = useMobile(900);
  const active = useActiveSection(NAV_LINKS.map(l => l.id));
  const progress = useScrollProgress();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => { if (!mobile) setMenuOpen(false); }, [mobile]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999,
        height: 2, width: `${progress * 100}%`,
        background: t.gradAccent,
        transition: "width 0.1s linear",
        pointerEvents: "none",
      }} />

      <header
        role="banner"
        style={{
          position: "fixed", top: 2, left: 0, right: 0, zIndex: 9000,
          padding: "0 1.25rem",
          fontFamily: "'DM Sans', sans-serif",
          transition: "all 0.3s ease",
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{
            maxWidth: 1100, margin: "0 auto",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: scrolled ? 56 : 68,
            background: scrolled
              ? (dark ? "rgba(5,5,8,0.92)" : "rgba(250,250,250,0.92)")
              : "transparent",
            backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
            borderRadius: scrolled ? 16 : 0,
            border: scrolled ? `1px solid ${t.border}` : "none",
            boxShadow: scrolled
              ? (dark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.08)")
              : "none",
            padding: "0 20px",
            transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 9,
              padding: 0, flexShrink: 0,
            }}
          >
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: t.gradAccent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontWeight: 800, color: "#fff",
              boxShadow: `0 4px 16px rgba(99,179,237,0.4)`,
              fontFamily: "'Syne', sans-serif",
              flexShrink: 0,
            }}>I</div>
            <span style={{
              fontWeight: 800, fontSize: 15,
              color: t.text, letterSpacing: "-0.3px",
              fontFamily: "'Syne', sans-serif",
            }}>
              IBK
              <span style={{ color: t.muted, fontWeight: 500 }}>.co</span>
            </span>
          </button>

          {/* Desktop nav links */}
          {!mobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  aria-current={active === link.id ? "page" : undefined}
                  style={{
                    background: active === link.id ? t.aLight : "none",
                    border: "none", cursor: "pointer",
                    padding: "6px 13px", borderRadius: 8,
                    fontSize: 13, fontWeight: active === link.id ? 700 : 500,
                    color: active === link.id ? t.accent : t.muted,
                    transition: "all 0.2s ease",
                    letterSpacing: "0.1px",
                  }}
                  onMouseEnter={e => { if (active !== link.id) { e.currentTarget.style.color = t.text; e.currentTarget.style.background = t.bgAlt; } }}
                  onMouseLeave={e => { if (active !== link.id) { e.currentTarget.style.color = t.muted; e.currentTarget.style.background = "none"; } }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Theme toggle */}
            <button
              onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
              style={{
                background: t.bgAlt, border: `1px solid ${t.border}`,
                borderRadius: 10, width: 36, height: 36,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: 16, transition: "all 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = t.borderHov}
              onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
            >
              {dark ? "☀️" : "🌙"}
            </button>

            {/* Contact CTA */}
            {!mobile && (
              <button
                onClick={openContact}
                style={{
                  background: t.gradAccent, color: "#fff",
                  border: "none", borderRadius: 10, padding: "8px 18px",
                  fontSize: 13, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 2px 12px rgba(99,179,237,0.3)",
                  transition: "all 0.25s ease", letterSpacing: "0.1px",
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,179,237,0.5)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(99,179,237,0.3)"; e.currentTarget.style.transform = "none"; }}
              >
                Hire Me
              </button>
            )}

            {/* Hamburger */}
            {mobile && (
              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                style={{
                  background: t.bgAlt, border: `1px solid ${t.border}`,
                  borderRadius: 10, width: 36, height: 36,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", gap: 4, transition: "all 0.2s", padding: 0,
                }}
              >
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    display: "block", width: 16, height: 1.5,
                    background: t.text, borderRadius: 1,
                    transition: "all 0.25s",
                    transform: menuOpen
                      ? i === 0 ? "rotate(45deg) translateY(5px)" : i === 2 ? "rotate(-45deg) translateY(-5px)" : "scaleX(0)"
                      : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }} />
                ))}
              </button>
            )}
          </div>
        </nav>

        {/* Mobile dropdown menu */}
        {mobile && menuOpen && (
          <div
            className="mobile-menu"
            style={{
              maxWidth: 1100, margin: "8px auto 0",
              background: dark ? "rgba(10,10,15,0.97)" : "rgba(250,250,250,0.97)",
              backdropFilter: "blur(24px) saturate(180%)",
              border: `1px solid ${t.border}`,
              borderRadius: 16, padding: "12px 8px",
              boxShadow: dark ? "0 16px 48px rgba(0,0,0,0.5)" : "0 16px 48px rgba(0,0,0,0.12)",
            }}
          >
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  display: "block", width: "100%",
                  background: active === link.id ? t.aLight : "none",
                  border: "none", cursor: "pointer",
                  padding: "11px 16px", borderRadius: 10,
                  fontSize: 15, fontWeight: active === link.id ? 700 : 500,
                  color: active === link.id ? t.accent : t.text,
                  textAlign: "left", transition: "all 0.2s",
                }}
              >
                {link.label}
              </button>
            ))}
            <div style={{ height: 1, background: t.border, margin: "8px 10px" }} />
            <button
              onClick={() => { openContact(); setMenuOpen(false); }}
              style={{
                display: "block", width: "100%",
                background: t.gradAccent, color: "#fff",
                border: "none", borderRadius: 10, padding: "12px 16px",
                fontSize: 15, fontWeight: 700, cursor: "pointer", textAlign: "center",
              }}
            >
              Contact Me
            </button>
          </div>
        )}
      </header>
    </>
  );
}
