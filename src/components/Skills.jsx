import { RevealSection, SectionHeader, ClickHint } from "./primitives";
import { SKILLS } from "../data/portfolio";
import { CAT_COLORS } from "../styles/tokens";
import { useMobile } from "../hooks";

export default function Skills({ open, t, dark }) {
  const cats = [...new Set(SKILLS.map(s => s.cat))];
  const mobile = useMobile();
  const catColors = CAT_COLORS[dark ? "dark" : "light"];

  return (
    <section id="skills" aria-label="Skills" style={{ padding: "88px 1.5rem", background: t.bgAlt, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeader tag="Technical Arsenal" title="Skills & Capabilities" sub="Click any card for full details — Manufacturing · Engineering Software · AI & Productivity · Leadership" t={t} />
        </RevealSection>

        {cats.map((cat, ci) => {
          const cc = catColors[cat] || { bg: t.aLight, text: t.accent, border: t.accent + "28" };
          const catSkills = SKILLS.filter(s => s.cat === cat);

          return (
            <RevealSection key={cat} delay={ci * 0.05}>
              <div style={{ marginBottom: 36 }}>
                {/* Category header */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span style={{
                    fontSize: 10.5, fontWeight: 800, color: cc.text,
                    textTransform: "uppercase", letterSpacing: "2px",
                    fontFamily: "'DM Sans', sans-serif",
                    flexShrink: 0,
                  }}>{cat}</span>
                  <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${cc.border}, transparent)` }} />
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: cc.text,
                    background: cc.bg, borderRadius: 999, padding: "2px 9px",
                    border: `1px solid ${cc.border}`,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{catSkills.length}</span>
                </div>

                {/* Skill cards */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: mobile ? "repeat(2,1fr)" : "repeat(auto-fill, minmax(195px, 1fr))",
                  gap: 10,
                }}>
                  {catSkills.map(skill => (
                    <SkillCard key={skill.id} skill={skill} cc={cc} open={open} t={t} />
                  ))}
                </div>
              </div>
            </RevealSection>
          );
        })}
      </div>
    </section>
  );
}

function SkillCard({ skill, cc, open, t }) {
  return (
    <button
      onClick={() => open(skill)}
      className="card-lift"
      aria-label={`${skill.title} — click for details`}
      style={{
        background: t.bgCard,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: "18px 16px 14px",
        cursor: "pointer",
        textAlign: "left",
        display: "flex", flexDirection: "column", gap: 4,
        position: "relative", overflow: "hidden",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = cc.border;
        e.currentTarget.style.background = t.cardHover;
        e.currentTarget.style.boxShadow = `0 8px 24px ${cc.bg}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = t.border;
        e.currentTarget.style.background = t.bgCard;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Color top strip */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: cc.text, opacity: 0.6 }} />

      <div style={{ fontSize: 22, marginBottom: 2 }}>{skill.icon}</div>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: t.text, lineHeight: 1.3, fontFamily: "'Syne', sans-serif" }}>
        {skill.title}
      </div>
      <div style={{
        fontSize: 10.5, fontWeight: 700, color: cc.text,
        background: cc.bg, borderRadius: 999, padding: "2px 8px",
        display: "inline-block", alignSelf: "flex-start",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {skill.level}
      </div>
      <div style={{ marginTop: 6 }}>
        <ClickHint t={t} />
      </div>
    </button>
  );
}
