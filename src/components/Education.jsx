import { RevealSection, SectionHeader, ClickHint } from "./primitives";
import { EDUCATION } from "../data/portfolio";
import { useMobile } from "../hooks";

export default function Education({ open, t }) {
  const mobile = useMobile();

  return (
    <section id="education" aria-label="Education" style={{ padding: "88px 1.5rem", background: t.bgAlt, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeader tag="Academic Background" title="Education" t={t} />
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: 16 }}>
          {EDUCATION.map((edu, i) => (
            <RevealSection key={edu.id} delay={i * 0.08}>
              <EduCard edu={edu} open={open} t={t} />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function EduCard({ edu, open, t }) {
  return (
    <button
      onClick={() => open(edu)}
      className="card-lift"
      aria-label={`${edu.title} — click for details`}
      style={{
        background: t.bgCard, border: `1px solid ${t.border}`,
        borderRadius: 18, padding: "24px 22px 20px",
        cursor: "pointer", textAlign: "left",
        display: "flex", flexDirection: "column", gap: 0,
        width: "100%", position: "relative", overflow: "hidden",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderHov; e.currentTarget.style.background = t.cardHover; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.bgCard; }}
    >
      {/* Top gradient strip */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: t.gradAccent, opacity: 0.6 }} />

      {/* Icon + badge */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontSize: 32 }}>{edu.icon}</span>
        <span style={{
          background: t.aBLight, color: t.accentB,
          padding: "4px 12px", borderRadius: 999,
          fontSize: 11, fontWeight: 800, fontFamily: "'DM Sans', sans-serif",
        }}>{edu.badge}</span>
      </div>

      <div style={{ fontSize: 16.5, fontWeight: 800, color: t.text, marginBottom: 5, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.3px" }}>
        {edu.title}
      </div>
      <div style={{ fontSize: 13, color: t.muted, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{edu.org}</div>
      <div style={{ fontSize: 12, color: t.muted, marginBottom: 16, fontFamily: "'DM Sans', sans-serif", opacity: 0.8 }}>{edu.period}</div>

      <ClickHint t={t} />
    </button>
  );
}
