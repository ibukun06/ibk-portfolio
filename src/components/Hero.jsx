import { useState, useEffect, useRef } from "react";
import { useMobile, useReveal, useCounter } from "../hooks";
import { GlowButton, GhostButton, RevealSection } from "./primitives";
import { PROFILE as P } from "../data/portfolio";

/* ── Animated title rotator ────────────────────────────────────── */
function TitleRotator({ titles, t }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % titles.length);
        setVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <span style={{
      color: t.accent,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 0.35s ease, transform 0.35s ease",
      display: "inline-block", minWidth: 320,
    }}>
      {titles[idx]}
    </span>
  );
}

/* ── Stat counter card ─────────────────────────────────────────── */
function StatCard({ stat, open, t, isVisible }) {
  const count = useCounter(stat.value, isVisible);

  return (
    <button
      onClick={() => open({ modal: { tag: "Achievement", title: stat.value, subtitle: stat.label, desc: stat.detail } })}
      className="card-lift"
      style={{
        background: t.bgGlass || t.bgCard,
        backdropFilter: "blur(12px)",
        border: `1px solid ${t.border}`,
        borderRadius: 16, padding: "18px 14px 16px",
        cursor: "pointer", textAlign: "center",
        transition: "all 0.3s ease",
        position: "relative", overflow: "hidden",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderAcc; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; }}
    >
      <div style={{ fontSize: "1.85rem", fontWeight: 800, color: t.accent, lineHeight: 1, fontFamily: "'Syne', sans-serif", letterSpacing: "-1px" }}>
        {count}
      </div>
      <div style={{ fontSize: 11.5, color: t.text, fontWeight: 700, marginTop: 5, lineHeight: 1.3, fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</div>
      {stat.sub && <div style={{ fontSize: 10.5, color: t.muted, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{stat.sub}</div>}
      <div className="click-hint" style={{ marginTop: 7, fontSize: 9, fontWeight: 800, color: t.accent, letterSpacing: "0.6px", textTransform: "uppercase" }}>tap ↗</div>
    </button>
  );
}

/* ── Hexagon portrait ──────────────────────────────────────────── */
function HexPortrait({ t }) {
  return (
    <div style={{ position: "relative", width: 280, height: 280, margin: "0 auto", animation: "float 6s ease-in-out infinite", flexShrink: 0 }}>
      {/* Outer glow ring */}
      <div style={{
        position: "absolute", inset: -12,
        borderRadius: "50%",
        background: `conic-gradient(from 0deg, ${t.accent}, ${t.accentB}, ${t.accentD}, ${t.accent})`,
        animation: "spinSlow 12s linear infinite",
        opacity: 0.35,
        filter: "blur(8px)",
      }} />
      {/* Dashed ring */}
      <svg width="280" height="280" style={{ position: "absolute", inset: 0, animation: "spinSlowR 18s linear infinite" }}>
        <circle cx="140" cy="140" r="130" fill="none" stroke={t.accent} strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
      </svg>
      {/* Hexagon clip */}
      <div style={{
        position: "absolute", inset: 18,
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        overflow: "hidden",
        background: t.bgCard,
        border: "none",
        boxShadow: `0 0 0 2px ${t.accent}40`,
      }}>
        <img 
          src={P.photo} 
          alt="Profile"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // 1. Shift the focus to the top portion of the image (pushes the image down)
            objectPosition: "center 15%", 
            // 2. Zoom out slightly to ensure hair clears the top hexagon point
            transform: "scale(0.92)",
          }}
          onError={e => {
            e.target.style.display = "none";
            e.target.parentElement.innerHTML = `
              <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#0f0f17,#1a1a2e);gap:8px">
                <div style="font-size:64px;line-height:1">👷</div>
                <div style="font-size:11px;color:#63b3ed;font-weight:700;letter-spacing:2px;text-transform:uppercase">IBK</div>
              </div>`;
          }}
        />
      </div>
      {/* Engineering badge overlay */}
      <div style={{
        position: "absolute", bottom: 8, right: -8,
        background: t.gradAccent,
        borderRadius: 12, padding: "6px 12px",
        fontSize: 11, fontWeight: 800, color: "#fff",
        letterSpacing: "0.5px", boxShadow: "0 4px 16px rgba(99,179,237,0.4)",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        ⚙️ ME Student
      </div>
      {/* CGPA badge */}
      <div style={{
        position: "absolute", top: 12, left: -8,
        background: t.bgCard, border: `1px solid ${t.border}`,
        borderRadius: 10, padding: "5px 10px",
        fontSize: 11, fontWeight: 700, color: t.accentB,
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
      }}>
        📊 4.32 GPA
      </div>
    </div>
  );
}

export default function Hero({ open, t, dark, openContact }) {
  const mobile = useMobile();
  const [ref, vis] = useReveal(0.01);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        background: t.gradHero,
        paddingTop: 80,
      }}
    >
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `
          linear-gradient(to right, ${t.gridLine} 1px, transparent 1px),
          linear-gradient(to bottom, ${t.gridLine} 1px, transparent 1px)
        `,
        backgroundSize: "44px 44px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
      }} />

      {/* Ambient glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${t.accent}12, transparent 70%)` }} />
        <div style={{ position: "absolute", bottom: "15%", right: "5%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${t.accentB}10, transparent 70%)` }} />
      </div>

      <div
        ref={ref}
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem 60px", position: "relative", zIndex: 1, width: "100%" }}
      >
        {/* Layout: left text + right portrait */}
        <div style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr auto",
          gap: mobile ? 48 : 80,
          alignItems: "center",
        }}>

          {/* ── Left column ── */}
          <div style={{ textAlign: mobile ? "center" : "left" }}>

            {/* Status badge */}
            <div style={{ animation: "fadeUp 0.6s 0.1s ease both", display: "flex", gap: 8, flexWrap: "wrap", justifyContent: mobile ? "center" : "flex-start", marginBottom: 20 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: t.aLight, border: `1px solid ${t.accent}28`,
                borderRadius: 999, padding: "5px 14px",
                fontSize: 11, fontWeight: 700, color: t.accent,
                letterSpacing: "1px", textTransform: "uppercase",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.accentC, display: "inline-block", animation: "pulse 2s infinite" }} />
                Open to Internships · From July 2026
              </span>
            </div>

            {/* Main headline */}
            <h1 style={{
              fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
              fontWeight: 800, lineHeight: 1.08,
              letterSpacing: "-1px", color: t.text,
              margin: "0 0 12px",
              fontFamily: "'Syne', sans-serif",
              animation: "fadeUp 0.7s 0.2s ease both",
            }}>
              Ibukunoluwa Oluwafemi
              <br />
              <TitleRotator titles={P.titles} t={t} />
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize: mobile ? 15 : 16.5,
              color: t.textSub, lineHeight: 1.8,
              maxWidth: 520, marginBottom: 36,
              margin: mobile ? "0 auto 36px" : "0 0 36px",
              fontFamily: "'DM Sans', sans-serif",
              animation: "fadeUp 0.7s 0.35s ease both",
            }}>
              {P.tagline}
            </p>

            {/* CTAs */}
            <div style={{
              display: "flex", gap: 10, flexWrap: "wrap",
              justifyContent: mobile ? "center" : "flex-start",
              marginBottom: 40,
              animation: "fadeUp 0.7s 0.48s ease both",
            }}>
              <GlowButton href={P.resume} download t={t}>
                ↓ Download Résumé
              </GlowButton>
              <GhostButton href="#projects" t={t}>
                View Projects
              </GhostButton>
              <GhostButton onClick={openContact} t={t}>
                Get in Touch
              </GhostButton>
            </div>

            {/* Seeking row */}
            <div style={{
              display: "flex", gap: 8, flexWrap: "wrap",
              justifyContent: mobile ? "center" : "flex-start",
              animation: "fadeUp 0.7s 0.58s ease both",
              marginBottom: 48,
            }}>
              {P.seeking.map(item => (
                <span key={item} style={{
                  background: t.bgAlt, border: `1px solid ${t.border}`,
                  borderRadius: 999, padding: "5px 14px",
                  fontSize: 12, fontWeight: 600, color: t.textSub,
                  fontFamily: "'DM Sans', sans-serif",
                }}>{item}</span>
              ))}
            </div>

            {/* Stats grid */}
            <div
              ref={ref}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 10, animation: "fadeUp 0.7s 0.68s ease both",
                maxWidth: mobile ? 340 : 480,
                margin: mobile ? "0 auto" : 0,
              }}
            >
              {P.stats.map((s, i) => (
                <StatCard key={s.value} stat={s} open={open} t={t} isVisible={vis} />
              ))}
            </div>
          </div>

          {/* ── Right column ── */}
          {!mobile && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              <HexPortrait t={t} />

              {/* Social links */}
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { href: P.linkedin, label: "LinkedIn", icon: "🔗" },
                  { href: P.github, label: "GitHub", icon: "🐙" },
                  { href: `mailto:${P.email}`, label: "Email", icon: "✉️" },
                ].map(link => (
                  <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                    aria-label={link.label}
                    style={{
                      width: 38, height: 38, borderRadius: 10,
                      background: t.bgCard, border: `1px solid ${t.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 17, textDecoration: "none", transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderHov; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "none"; }}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Mobile portrait */}
          {mobile && (
            <div style={{ order: -1, display: "flex", justifyContent: "center" }}>
              <HexPortrait t={t} />
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          marginTop: 48, animation: "fadeIn 1.2s 1.2s ease both", opacity: 0,
          animationFillMode: "forwards",
        }}>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: t.muted, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Scroll</span>
          <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${t.accent}, transparent)` }} />
        </div>
      </div>
    </section>
  );
}
