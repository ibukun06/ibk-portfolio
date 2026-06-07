import { RevealSection, SectionHeader, ClickHint } from "./primitives";
import { AWARDS } from "../data/portfolio";
import { useMobile } from "../hooks";

// Keep your top Awards function mostly as is, but ensure it points to your data
export default function Awards({ open, t }) {
  const mobile = useMobile();
  return (
    <section id="awards" aria-label="Awards and Honors" style={{ padding: "88px 1.5rem", background: t.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeader tag="Recognition" title="Awards & Honors" t={t} />
        </RevealSection>
        {/* Your existing grid logic */}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fill, minmax(350px, 1fr))", gap: 16 }}>
          {AWARDS.map((award, i) => (
            <RevealSection key={award.id} delay={i * 0.08}>
              <AwardCard award={award} open={open} t={t} />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Update this part to match your new styling preferences
function AwardCard({ award, open, t }) {
   const isPlaceholder = award.status === "placeholder";
  return (
    <button
      onClick={() => !isPlaceholder && open(award)}
      className={!isPlaceholder ? "card-lift" : ""}
      aria-label={isPlaceholder ? "Add award placeholder" : `${award.title} — click for details`}
      style={{
        background: isPlaceholder ? t.bgAlt : t.bgCard,
        border: `1px solid ${isPlaceholder ? t.border : t.accentB + "35"}`,
        borderRadius: 18, padding: "22px 20px 18px",
        cursor: isPlaceholder ? "default" : "pointer",
        textAlign: "left", width: "100%",
        position: "relative", overflow: "hidden",
        transition: "all 0.3s ease",
        opacity: isPlaceholder ? 0.45 : 1,
      }}
      onMouseEnter={e => { if (!isPlaceholder) { e.currentTarget.style.borderColor = t.accentB + "60"; e.currentTarget.style.background = t.cardHover; } }}
      onMouseLeave={e => { if (!isPlaceholder) { e.currentTarget.style.borderColor = t.accentB + "35"; e.currentTarget.style.background = t.bgCard; } }}
    >
      {/* Gold top strip */}
      {!isPlaceholder && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: t.gradGold, opacity: 0.7 }} />
      )}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 32 }}>{award.icon}</span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <span style={{ background: t.aBLight, color: t.accentB, padding: "3px 10px", borderRadius: 999, fontSize: 10.5, fontWeight: 800, fontFamily: "'DM Sans', sans-serif" }}>
            {award.category}
          </span>
          <span style={{ fontSize: 11, color: t.muted, fontFamily: "'DM Sans', sans-serif" }}>{award.year}</span>
        </div>
      </div>

      <div style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 5, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.3px" }}>{award.title}</div>
      <div style={{ fontSize: 13, color: t.muted, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>{award.org}</div>
      <p style={{ fontSize: 13, color: t.textSub, lineHeight: 1.65, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>{award.desc}</p>

      {!isPlaceholder && <ClickHint t={t} />}
      {isPlaceholder && (
        <span style={{ fontSize: 11, color: t.muted, fontFamily: "'DM Sans', sans-serif" }}>
          Add award in AWARDS array
        </span>
      )}
    </button>
  );
}
