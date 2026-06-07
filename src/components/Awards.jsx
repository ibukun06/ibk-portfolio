import { RevealSection, SectionHeader, ClickHint } from "./primitives";
import { AWARDS } from "../data/portfolio";
import { useMobile } from "../hooks";

export default function Awards({ open, t }) {
  const mobile = useMobile();

  return (
    <section id="awards" aria-label="Awards and Honors" style={{ padding: "88px 1.5rem", background: t.bgAlt, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeader tag="Recognition" title="Awards & Honors" t={t} />
        </RevealSection>

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

function AwardCard({ award, open, t }) {
  const isPlaceholder = award.status === "placeholder";

  return (
    <button
      onClick={() => !isPlaceholder && open(award)}
      aria-label={isPlaceholder ? "Add award placeholder" : `${award.title} — click for details`}
      className={`relative w-full text-left rounded-[18px] p-6 transition-all duration-300 overflow-hidden ${
        !isPlaceholder 
          ? "card-lift bg-[#111113] border border-gray-800 hover:border-amber-500/50 hover:bg-[#1a1a1f]" 
          : "bg-transparent border border-dashed border-gray-700 opacity-45"
      }`}
    >
      {/* Gold top strip for real awards */}
      {!isPlaceholder && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: t.gradGold, opacity: 0.7 }} />
      )}

      {/* Header: Icon & Meta */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12, width: "100%" }}>
        <span style={{ fontSize: 32 }}>{award.icon}</span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <span style={{ background: t.aBLight, color: t.accentB, padding: "3px 10px", borderRadius: 999, fontSize: 10.5, fontWeight: 800, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {award.category}
          </span>
          <span style={{ fontSize: 11, color: t.muted, fontFamily: "'DM Sans', sans-serif" }}>{award.year}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ fontSize: 18, fontWeight: 800, color: t.text, marginBottom: 5, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.3px" }}>
        {award.title}
      </div>
      <div style={{ fontSize: 13, color: t.muted, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
        {award.issuer || award.org}
      </div>
      <p style={{ fontSize: 13, color: t.textSub, lineHeight: 1.65, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
        {award.description || award.desc}
      </p>

      {/* Interaction Hints */}
      {!isPlaceholder && <ClickHint t={t} />}
      {isPlaceholder && (
        <span style={{ fontSize: 11, color: t.muted, fontFamily: "'DM Sans', sans-serif", marginTop: "auto" }}>
          Add award in AWARDS array
        </span>
      )}
    </button>
  );
}
