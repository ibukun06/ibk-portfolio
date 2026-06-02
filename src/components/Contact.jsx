import { useState, useEffect } from "react";
import { RevealSection } from "./primitives";
import { PROFILE as P } from "../data/portfolio";
import { useMobile } from "../hooks";

/* ── Main Contact Section ──────────────────────────────────────── */
export function Contact({ t, openContact }) {
  const mobile = useMobile();

  return (
    <section id="contact" aria-label="Contact" style={{ padding: "96px 1.5rem 80px", background: t.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <RevealSection>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          {/* Label */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: t.aLight, border: `1px solid ${t.accent}28`,
            borderRadius: 999, padding: "5px 16px", marginBottom: 20,
            fontSize: 10.5, fontWeight: 800, color: t.accent,
            letterSpacing: "1.5px", textTransform: "uppercase",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.accentC, display: "inline-block", animation: "pulse 2s infinite" }} />
            Available from July 2026
          </div>

          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800,
            letterSpacing: "-1.5px", lineHeight: 1.1,
            margin: "0 0 16px", fontFamily: "'Syne', sans-serif",
            color: t.text,
          }}>
            Open to{" "}
            <span style={{ background: t.gradAccent, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Engineering
            </span>
            {" &"}<br />
            <span style={{ color: t.accentB }}>AI Workflow</span>{" "}Roles.
          </h2>

          <p style={{ fontSize: 16, color: t.textSub, lineHeight: 1.8, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
            SIWES internships · Manufacturing & fabrication · AI workflow optimization · Nigeria & abroad. Let's build something.
          </p>

          {/* Contact grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)",
            gap: 12, marginBottom: 40,
          }}>
            {[
              { icon: "✉️", label: "Academic Email", value: P.emailAcademic, href: `mailto:${P.emailAcademic}` },
              { icon: "💬", label: "WhatsApp", value: "+234 708 057 2415", href: P.whatsapp },
              { icon: "🔗", label: "LinkedIn", value: "ibk-co", href: P.linkedin },
            ].map((c, i) => (
              <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                style={{
                  background: t.bgCard, border: `1px solid ${t.border}`,
                  borderRadius: 14, padding: "16px 16px",
                  textDecoration: "none",
                  display: "flex", flexDirection: "column", gap: 4, alignItems: "center",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderHov; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "none"; }}
              >
                <span style={{ fontSize: 22 }}>{c.icon}</span>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: t.muted, textTransform: "uppercase", letterSpacing: "1px" }}>{c.label}</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: t.accent }}>{c.value}</span>
              </a>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={openContact}
              style={{
                background: t.gradAccent, color: "#fff",
                border: "none", borderRadius: 12, padding: "14px 32px",
                fontSize: 15, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 4px 24px rgba(99,179,237,0.35)",
                transition: "all 0.25s ease", letterSpacing: "0.2px",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,179,237,0.55)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 24px rgba(99,179,237,0.35)"; e.currentTarget.style.transform = "none"; }}
            >
              📬 All Contact Options
            </button>
            <a href={P.resume} download
              style={{
                background: t.bgCard, color: t.text, border: `1px solid ${t.border}`,
                borderRadius: 12, padding: "13px 28px",
                fontSize: 14, fontWeight: 700, textDecoration: "none",
                transition: "all 0.25s ease", letterSpacing: "0.2px",
                display: "inline-flex", alignItems: "center", gap: 6,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderHov; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "none"; }}
            >
              ↓ Download Résumé
            </a>
          </div>
        </div>
      </RevealSection>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 64, paddingTop: 32, borderTop: `1px solid ${t.border}` }}>
        <div style={{ fontSize: 12.5, color: t.muted, fontFamily: "'DM Sans', sans-serif" }}>
          <span style={{ fontWeight: 700, color: t.textSub }}>IBK</span> · Ibukunoluwa Oluwafemi · Lagos, Nigeria
          <br />
          <span style={{ marginTop: 4, display: "block", opacity: 0.6 }}>
            Redeemer's University · B.Eng. Mechanical Engineering · Open to opportunities from July 2026
          </span>
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
          {[
            { href: P.linkedin, label: "LinkedIn" },
            { href: P.github, label: "GitHub" },
            { href: `mailto:${P.email}`, label: "Email" },
            { href: P.resume, label: "Résumé", download: true },
          ].map(link => (
            <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" download={link.download}
              style={{ fontSize: 12, color: t.muted, textDecoration: "none", transition: "color 0.2s", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
              onMouseEnter={e => e.currentTarget.style.color = t.accent}
              onMouseLeave={e => e.currentTarget.style.color = t.muted}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Floating contact button ───────────────────────────────────── */
export function FloatingContact({ openContact, t }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={openContact}
      aria-label="Open contact options"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed", bottom: 28, right: 24, zIndex: 8000,
        background: t.gradAccent, color: "#fff",
        border: "none", borderRadius: hovered ? 16 : "50%",
        width: hovered ? "auto" : 52, height: 52,
        padding: hovered ? "0 22px" : 0,
        cursor: "pointer",
        boxShadow: "0 8px 28px rgba(99,179,237,0.5)",
        fontSize: hovered ? 14 : 20,
        fontWeight: 700, letterSpacing: "0.2px",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
        animation: "fadeIn 0.3s ease both",
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      {hovered ? "Let's Talk 💬" : "💬"}
    </button>
  );
}
