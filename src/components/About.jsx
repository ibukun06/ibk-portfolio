import { RevealSection, SectionHeader } from "./primitives";
import { PROFILE as P } from "../data/portfolio";
import { useMobile } from "../hooks";
import { t } from '../styles/tokens';

export default function About({ t }) {
  const mobile = useMobile();

  return (
    <section id="about" aria-label="About IBK" style={{ padding: "88px 1.5rem", background: t.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Summary ── */}
        <RevealSection>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", marginBottom: 72 }}>
            <SectionHeader tag="About Me" title="Who I Am" t={t} />
            <p style={{ fontSize: mobile ? 15 : 16, color: t.textSub, lineHeight: 1.9, marginBottom: 32, fontFamily: "'DM Sans', sans-serif" }}>
              {P.summary}
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {P.seeking.map(item => (
                <span key={item} style={{
                  background: t.aLight, color: t.accent,
                  padding: "7px 18px", borderRadius: 999, fontSize: 12.5, fontWeight: 700,
                  border: `1px solid ${t.accent}20`, fontFamily: "'DM Sans', sans-serif",
                }}>{item}</span>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* ── Why Work With Me ── */}
        <RevealSection delay={0.1}>
          <SectionHeader tag="Recruiter Section" title="Why Work With Me?" sub="Proof-backed. Every claim backed by a result." t={t} />
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
            gap: 16,
          }}>
            {P.whyMe.map((card, i) => (
              <WhyCard key={i} card={card} t={t} delay={i * 0.07} />
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function WhyCard({ card, t, delay }) {
  return (
    <div
      className="card-lift"
      style={{
        background: t.bgCard,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        padding: "22px 20px",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        animation: `fadeUp 0.6s ${0.1 + delay}s ease both`,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderAcc; e.currentTarget.style.background = t.cardHover; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.bgCard; }}
    >
      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: t.gradAccent, opacity: 0.5 }} />

      <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 8, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.3px" }}>
        {card.title}
      </h3>
      <p style={{ fontSize: 13.5, color: t.muted, lineHeight: 1.75, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
        {card.body}
      </p>
    </div>
  );
}
