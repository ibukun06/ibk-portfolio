import { useReveal } from "../hooks";

/* ── Chip ──────────────────────────────────────────────────────────
   Small tag/badge component used throughout the portfolio.
   ─────────────────────────────────────────────────────────────────── */
export function Chip({ label, t, variant = "default" }) {
  const colors = {
    default: { bg: t.aLight, color: t.accent },
    amber:   { bg: t.aBLight, color: t.accentB },
    green:   { bg: t.aCLight, color: t.accentC },
    violet:  { bg: t.aDLight, color: t.accentD },
  };
  const c = colors[variant] || colors.default;
  return (
    <span style={{
      background: c.bg, color: c.color,
      padding: "3px 11px", borderRadius: 999,
      fontSize: 11, fontWeight: 700,
      whiteSpace: "nowrap", display: "inline-block",
      letterSpacing: "0.2px", fontFamily: "'DM Sans', sans-serif",
    }}>
      {label}
    </span>
  );
}

/* ── SectionTag ────────────────────────────────────────────────────
   Section identifier pill (e.g. "● SKILLS")
   ─────────────────────────────────────────────────────────────────── */
export function SectionTag({ label, t }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 7,
      background: t.aLight, border: `1px solid ${t.accent}28`,
      borderRadius: 999, padding: "5px 16px", marginBottom: 14,
      fontSize: 10.5, fontWeight: 800, color: t.accent,
      letterSpacing: "1.5px", textTransform: "uppercase",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.accent, display: "inline-block" }} />
      {label}
    </div>
  );
}

/* ── SectionHeader ─────────────────────────────────────────────────
   Standardized section heading with optional subtitle.
   ─────────────────────────────────────────────────────────────────── */
export function SectionHeader({ tag, title, sub, centered = true, t }) {
  return (
    <div style={{ marginBottom: 52, textAlign: centered ? "center" : "left" }}>
      {tag && <SectionTag label={tag} t={t} />}
      <h2 style={{
        fontSize: "clamp(1.65rem, 3.5vw, 2.5rem)", fontWeight: 800,
        color: t.text, margin: "8px 0 10px",
        letterSpacing: "-1.2px", lineHeight: 1.05,
        fontFamily: "'Syne', sans-serif",
      }}>
        {title}
      </h2>
      {sub && (
        <p style={{ color: t.muted, fontSize: 14, margin: 0, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ── Divider ───────────────────────────────────────────────────────
   Decorative horizontal rule with centered accent dot.
   ─────────────────────────────────────────────────────────────────── */
export function Divider({ t }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 1.5rem", maxWidth: 1140, margin: "0 auto" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${t.border})` }} />
      <div style={{ width: 4, height: 4, borderRadius: "50%", background: t.accent, opacity: 0.4 }} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${t.border})` }} />
    </div>
  );
}

/* ── RevealSection ─────────────────────────────────────────────────
   Wrapper that fades + slides up children when scrolled into view.
   ─────────────────────────────────────────────────────────────────── */
export function RevealSection({ children, delay = 0, style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── ClickHint ─────────────────────────────────────────────────────
   Small "Details ↗" label shown inside clickable cards.
   ─────────────────────────────────────────────────────────────────── */
export function ClickHint({ label = "Details", t }) {
  return (
    <span className="click-hint" style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      fontSize: 10, fontWeight: 800, color: t.accent,
      letterSpacing: "0.8px", textTransform: "uppercase",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {label} <span style={{ fontSize: 9 }}>↗</span>
    </span>
  );
}

/* ── StatusBadge ───────────────────────────────────────────────────
   "Active", "Earned", "Upcoming" etc. status indicators.
   ─────────────────────────────────────────────────────────────────── */
export function StatusBadge({ status, t }) {
  const map = {
    earned:      { bg: t.aCLight, color: t.accentC, label: "Earned" },
    awarded:     { bg: t.aBLight, color: t.accentB, label: "Awarded" },
    active:      { bg: t.aLight,  color: t.accent,  label: "Active" },
    upcoming:    { bg: t.aDLight, color: t.accentD, label: "Upcoming" },
    placeholder: { bg: t.border,  color: t.muted,   label: "Placeholder" },
    past:        { bg: t.aLight,  color: t.accent,  label: "Past" },
  };
  const s = map[status] || map.active;
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "2px 9px", borderRadius: 999,
      fontSize: 10, fontWeight: 700, letterSpacing: "0.5px",
      textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
    }}>
      {s.label}
    </span>
  );
}

/* ── GlowButton ────────────────────────────────────────────────────
   Primary CTA button with gradient glow effect.
   ─────────────────────────────────────────────────────────────────── */
export function GlowButton({ children, onClick, href, download, style = {}, t }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: t.gradAccent,
    color: "#fff", padding: "13px 28px",
    borderRadius: 12, fontWeight: 700, fontSize: 14,
    textDecoration: "none", border: "none", cursor: "pointer",
    boxShadow: `0 4px 24px rgba(99,179,237,0.35)`,
    transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
    letterSpacing: "0.2px", fontFamily: "'DM Sans', sans-serif",
    ...style,
  };

  const handlers = {
    onMouseEnter: e => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,179,237,0.55)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow = "0 4px 24px rgba(99,179,237,0.35)";
    },
  };

  if (href) return <a href={href} download={download} style={base} {...handlers}>{children}</a>;
  return <button onClick={onClick} style={base} {...handlers}>{children}</button>;
}

/* ── GhostButton ───────────────────────────────────────────────────
   Secondary bordered CTA button.
   ─────────────────────────────────────────────────────────────────── */
export function GhostButton({ children, onClick, href, style = {}, t }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "none", color: t.textSub,
    padding: "12px 26px", borderRadius: 12,
    fontWeight: 600, fontSize: 14,
    textDecoration: "none", border: `1px solid ${t.border}`,
    cursor: "pointer",
    transition: "all 0.25s ease",
    backdropFilter: "blur(8px)",
    letterSpacing: "0.2px", fontFamily: "'DM Sans', sans-serif",
    ...style,
  };
  const handlers = {
    onMouseEnter: e => { e.currentTarget.style.borderColor = t.borderHov; e.currentTarget.style.color = t.accent; },
    onMouseLeave: e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textSub; },
  };
  if (href) return <a href={href} style={base} {...handlers}>{children}</a>;
  return <button onClick={onClick} style={base} {...handlers}>{children}</button>;
}
