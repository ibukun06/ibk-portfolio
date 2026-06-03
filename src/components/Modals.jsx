import { useState, useEffect } from "react";
import { Chip } from "./primitives";
import { PROFILE as P } from "../data/portfolio";
import { t } from '../styles/tokens';

/* ═══ Detail Modal ═══════════════════════════════════════════════ */
export function Modal({ data, onClose, t, openGallery }) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  const m = data?.modal;
  if (!m) return null;

  return (
    <div
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label={m.title}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.8)", zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem", backdropFilter: "blur(16px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: t.card, color: t.text,
          borderRadius: 20, padding: "2rem",
          maxWidth: 620, width: "100%",
          maxHeight: "90vh", overflowY: "auto",
          boxShadow: `0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px ${t.border}`,
          position: "relative", animation: "popIn 0.24s cubic-bezier(0.34,1.56,0.64,1) both",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose} aria-label="Close"
          style={{
            position: "absolute", top: 16, right: 16,
            background: t.bgAlt, border: "none", borderRadius: "50%",
            width: 34, height: 34, cursor: "pointer", color: t.muted,
            fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = t.bgHover}
          onMouseLeave={e => e.currentTarget.style.background = t.bgAlt}
        >✕</button>

        {/* Header */}
        <div style={{ marginBottom: 20, paddingRight: 44 }}>
          {m.tag && (
            <span style={{
              background: t.aLight, color: t.accent,
              padding: "3px 12px", borderRadius: 999,
              fontSize: 11, fontWeight: 700,
              display: "inline-block", marginBottom: 12, letterSpacing: "0.5px",
            }}>{m.tag}</span>
          )}
          <h2 style={{
            margin: "0 0 6px", fontSize: 22, fontWeight: 700,
            color: t.text, letterSpacing: "-0.5px",
            fontFamily: "'Syne', sans-serif",
          }}>{m.title}</h2>
          {m.subtitle && (
            <p style={{ margin: 0, color: t.muted, fontSize: 13, lineHeight: 1.65 }}>{m.subtitle}</p>
          )}
        </div>

        {/* Description */}
        {m.desc && (
          <p style={{ color: t.textSub, fontSize: 14, lineHeight: 1.85, marginBottom: 20 }}>{m.desc}</p>
        )}

        {/* Points label */}
        {m.ptsLabel && (
          <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: t.text }}>{m.ptsLabel}</p>
        )}

        {/* Bullet points */}
        {m.pts && (
          <ul style={{ margin: "0 0 20px", paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
            {m.pts.map((pt, i) => (
              <li key={i} style={{ color: t.textSub, fontSize: 14, lineHeight: 1.7, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: t.accent, fontSize: 10, marginTop: 5, flexShrink: 0 }}>▸</span>
                {pt}
              </li>
            ))}
          </ul>
        )}

        {/* Specs table */}
        {m.specs && (
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
            <tbody>
              {m.specs.map((s, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${t.border}` }}>
                  <td style={{ padding: "9px 12px 9px 0", fontWeight: 700, fontSize: 13, color: t.text, width: 165, verticalAlign: "top" }}>{s.l}</td>
                  <td style={{ padding: "9px 0", fontSize: 13, color: t.textSub }}>{s.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Code block */}
        {m.code && (
          <pre style={{
            background: t.code, border: `1px solid ${t.border}`,
            borderRadius: 12, padding: "1rem",
            overflowX: "auto", fontSize: 12.5, lineHeight: 1.8,
            color: t.codeText, fontFamily: "'Fira Code','Courier New',monospace",
            margin: "0 0 20px",
          }}>{m.code}</pre>
        )}

        {/* Tags */}
        {m.tags && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {m.tags.map(tag => <Chip key={tag} label={tag} t={t} />)}
          </div>
        )}

        {/* Links */}
        {m.links && (
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", paddingTop: 14, borderTop: `1px solid ${t.border}` }}>
            {m.links.map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noreferrer"
                style={{ color: t.accent, fontSize: 13, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                {l.label} <span style={{ fontSize: 11 }}>↗</span>
              </a>
            ))}
          </div>
        )}

        {/* Gallery trigger */}
        {openGallery && data?.images && data.images.length > 0 && (
          <button
            onClick={openGallery}
            style={{
              marginTop: 16, display: "flex", alignItems: "center", gap: 8,
              background: t.aLight, border: `1px solid ${t.accent}30`,
              borderRadius: 10, padding: "10px 18px", cursor: "pointer",
              color: t.accent, fontSize: 12, fontWeight: 700,
              width: "100%", justifyContent: "center", transition: "all 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = t.bgHover}
            onMouseLeave={e => e.currentTarget.style.background = t.aLight}
          >
            🖼️ View Gallery ({data.images.length} {data.images.length === 1 ? "image" : "images"})
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══ Gallery Lightbox ═══════════════════════════════════════════ */
export function GalleryModal({ images, title, onClose, t }) {
  const [idx, setIdx] = useState(0);
  const [touchX, setTouchX] = useState(null);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIdx(i => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setIdx(i => Math.min(images.length - 1, i + 1));
    };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose, images.length]);

  if (!images || images.length === 0) return null;
  const cur = images[idx];

  return (
    <div
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label={`Gallery: ${title}`}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.96)", zIndex: 10001, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}
        onTouchStart={e => setTouchX(e.changedTouches[0].screenX)}
        onTouchEnd={e => {
          const endX = e.changedTouches[0].screenX;
          if (touchX !== null && endX < touchX - 40 && idx < images.length - 1) setIdx(idx + 1);
          if (touchX !== null && endX > touchX + 40 && idx > 0) setIdx(idx - 1);
          setTouchX(null);
        }}
      >
        <button onClick={onClose} aria-label="Close gallery"
          style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 999, padding: "8px 18px", cursor: "pointer", color: "#fff", fontSize: 14, fontWeight: 600, backdropFilter: "blur(8px)", zIndex: 10 }}>
          ✕ Close
        </button>
        <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(255,255,255,0.08)", color: "#fff", padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, backdropFilter: "blur(8px)", zIndex: 10 }}>
          {idx + 1} / {images.length}
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "60px 20px 20px" }}>
          <img
            src={cur.src} alt={cur.alt || cur.caption || title}
            style={{ maxWidth: "100%", maxHeight: "calc(100vh - 140px)", objectFit: "contain", borderRadius: 10, boxShadow: "0 8px 48px rgba(0,0,0,0.7)", animation: "fadeIn 0.3s ease both" }}
            onError={e => { e.target.style.display = "none"; e.target.nextSibling && (e.target.nextSibling.style.display = "flex"); }}
          />
          <div style={{ display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🖼️</div>
            <div>Add photo: {cur.src}</div>
          </div>
        </div>

        {cur.caption && (
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, padding: "8px 20px", textAlign: "center", maxWidth: 600 }}>
            {cur.caption}
          </div>
        )}

        {images.length > 1 && (
          <>
            <button onClick={() => setIdx(Math.max(0, idx - 1))} aria-label="Previous"
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 999, padding: "12px 18px", cursor: "pointer", color: "#fff", fontSize: 22, opacity: idx > 0 ? 1 : 0.2, transition: "opacity 0.2s" }}>
              ←
            </button>
            <button onClick={() => setIdx(Math.min(images.length - 1, idx + 1))} aria-label="Next"
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 999, padding: "12px 18px", cursor: "pointer", color: "#fff", fontSize: 22, opacity: idx < images.length - 1 ? 1 : 0.2, transition: "opacity 0.2s" }}>
              →
            </button>
            <div style={{ display: "flex", gap: 6, padding: "12px 0 24px" }}>
              {images.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Go to image ${i + 1}`}
                  style={{ width: i === idx ? 22 : 7, height: 7, borderRadius: 999, border: "none", padding: 0, cursor: "pointer", background: i === idx ? t.accent : "rgba(255,255,255,0.25)", transition: "all 0.25s" }} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══ Contact Modal ══════════════════════════════════════════════ */
export function ContactModal({ onClose, t }) {
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  const doCopy = async (text, label) => {
    try { await navigator.clipboard.writeText(text); setCopied(label); setTimeout(() => setCopied(null), 2200); }
    catch (e) { console.error("Clipboard error:", e); }
  };

  const contacts = [
    { icon: "🎓", label: "Academic / Internship", value: P.emailAcademic, href: `mailto:${P.emailAcademic}`, copyable: true },
    { icon: "✉️", label: "Personal Email", value: P.emailPersonal, href: `mailto:${P.emailPersonal}`, copyable: true },
    { icon: "💬", label: "WhatsApp", value: "+234 708 057 2415", href: P.whatsapp, external: true },
    { icon: "🔗", label: "LinkedIn", value: "linkedin.com/in/ibk-co", href: P.linkedin, external: true },
    { icon: "🐙", label: "GitHub", value: "github.com/ibukun06", href: P.github, external: true },
    { icon: "📄", label: "Download Résumé", value: "Resumé.pdf", href: P.resume, download: true },
  ];

  return (
    <div
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Contact IBK"
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backdropFilter: "blur(16px)" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: t.card, color: t.text,
          borderRadius: 24, padding: "2rem",
          maxWidth: 440, width: "100%",
          maxHeight: "90vh", overflowY: "auto",
          boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px ${t.border}`,
          position: "relative", animation: "popIn 0.24s cubic-bezier(0.34,1.56,0.64,1) both",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <button onClick={onClose} aria-label="Close"
          style={{ position: "absolute", top: 16, right: 16, background: t.bgAlt, border: "none", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", color: t.muted, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseEnter={e => e.currentTarget.style.background = t.bgHover}
          onMouseLeave={e => e.currentTarget.style.background = t.bgAlt}
        >✕</button>

        <div style={{ marginBottom: 24, paddingRight: 44 }}>
          <h2 style={{ margin: "0 0 5px", fontSize: 22, fontWeight: 700, color: t.text, fontFamily: "'Syne', sans-serif" }}>Let's connect</h2>
          <p style={{ margin: 0, color: t.muted, fontSize: 13 }}>Available for SIWES · Engineering internships · AI workflow roles</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {contacts.map((c, i) => {
            const isCopied = copied === c.label;
            return (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 10, background: t.bgAlt, border: `1px solid ${t.border}`, borderRadius: 12, padding: "10px 14px", transition: "border-color 0.2s, background 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderHov; e.currentTarget.style.background = t.bgHover; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.bgAlt; }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{c.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: t.muted, textTransform: "uppercase", letterSpacing: "0.6px" }}>{c.label}</div>
                  <a href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noreferrer" : undefined} download={c.download}
                    style={{ color: t.accent, fontSize: 13, fontWeight: 600, textDecoration: "none", wordBreak: "break-all" }}>
                    {c.value}
                  </a>
                </div>
                {c.copyable && (
                  <button onClick={() => doCopy(c.value, c.label)}
                    style={{ background: isCopied ? t.aCLight : t.aLight, border: "none", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700, color: isCopied ? t.accentC : t.accent, flexShrink: 0, transition: "all 0.2s" }}>
                    {isCopied ? "✓ Copied" : "Copy"}
                  </button>
                )}
                {c.external && <span style={{ fontSize: 11, color: t.muted, flexShrink: 0 }}>↗</span>}
                {c.download && <span style={{ fontSize: 11, color: t.muted, flexShrink: 0 }}>↓</span>}
              </div>
            );
          })}
        </div>

        <p style={{ marginTop: 20, fontSize: 12, color: t.muted, textAlign: "center" }}>
          Responds within 24 hours · Open to opportunities from July 2026
        </p>
      </div>
    </div>
  );
}
