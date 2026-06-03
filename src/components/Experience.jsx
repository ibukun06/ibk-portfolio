import { RevealSection, SectionHeader, ClickHint } from "./primitives";
import { EXPERIENCE } from "../data/portfolio";
import { TAG_COLORS } from "../styles/tokens";
import { useMobile } from "../hooks";
import { t } from '../styles/tokens';

export default function Experience({ open, t, dark }) {
  const mobile = useMobile(640);
  const tagColors = TAG_COLORS[dark ? "dark" : "light"];

  return (
    <section id="experience" aria-label="Experience" style={{ padding: "88px 1.5rem", background: t.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeader tag="Journey" title="Experience & Timeline" sub="From workshop floor to student government — a record of building, leading, and growing" t={t} />
        </RevealSection>

        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          {!mobile && (
            <div style={{
              position: "absolute", left: 22, top: 0, bottom: 0, width: 1,
              background: `linear-gradient(to bottom, ${t.accent}40, ${t.accent}10, transparent)`,
            }} />
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {EXPERIENCE.map((exp, i) => (
              <RevealSection key={exp.id} delay={i * 0.04}>
                <TimelineEntry exp={exp} open={open} t={t} dark={dark} tagColors={tagColors} mobile={mobile} isLast={i === EXPERIENCE.length - 1} />
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({ exp, open, t, dark, tagColors, mobile, isLast }) {
  const tc = tagColors[exp.tag] || { bg: t.aLight, text: t.accent };

  return (
    <button
      onClick={() => open(exp)}
      className="timeline-card card-lift"
      aria-label={`${exp.title} at ${exp.org} — click for details`}
      style={{
        display: "flex", gap: mobile ? 12 : 22, alignItems: "flex-start",
        background: "none", border: "none", cursor: "pointer",
        padding: "0 0 0 0", textAlign: "left",
        width: "100%", marginBottom: isLast ? 0 : 4,
      }}
    >
      {/* Left: dot + line */}
      {!mobile && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, marginTop: 20, position: "relative", zIndex: 1 }}>
          <div
            className="timeline-dot"
            style={{
              width: 14, height: 14, borderRadius: "50%",
              background: tc.text, border: `2px solid ${t.bg}`,
              boxShadow: `0 0 0 3px ${tc.bg}, 0 0 12px ${tc.text}40`,
              flexShrink: 0, position: "relative", zIndex: 2,
            }}
          />
        </div>
      )}

      {/* Content card */}
      <div
        style={{
          flex: 1, background: t.bgCard, border: `1px solid ${t.border}`,
          borderRadius: 14, padding: "16px 18px 14px",
          marginBottom: 10,
          transition: "all 0.25s ease",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = tc.text + "50"; e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = `0 8px 28px ${tc.bg}`; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>{exp.icon}</span>
            <span style={{
              background: tc.bg, color: tc.text,
              padding: "2px 9px", borderRadius: 999,
              fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.8px",
              fontFamily: "'DM Sans', sans-serif",
            }}>{exp.tag}</span>
          </div>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: t.muted, flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>{exp.period}</span>
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 2, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.2px" }}>
          {exp.title}
        </div>
        <div style={{ fontSize: 13, color: t.muted, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
          {exp.org} {exp.loc && `· ${exp.loc}`}
        </div>

        <ClickHint t={t} />
      </div>
    </button>
  );
}
