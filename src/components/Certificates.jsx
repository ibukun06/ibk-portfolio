import { RevealSection, SectionHeader, StatusBadge, ClickHint } from "./primitives";
import { CERTIFICATES } from "../data/portfolio";
import { useMobile } from "../hooks";

export default function Certificates({ open, t }) {
  const mobile = useMobile();
  const earned = CERTIFICATES.filter(c => c.status === "earned");
  const placeholder = CERTIFICATES.filter(c => c.status === "placeholder");

  return (
    <section id="certificates" aria-label="Certifications" style={{ padding: "88px 1.5rem", background: t.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeader
            tag="Certifications"
            title="Certificates & Credentials"
            sub={`${earned.length} earned certifications — HP LIFE · Faith Leads University · Programming Hero`}
            t={t}
          />
        </RevealSection>

        {/* Earned */}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 14 }}>
          {earned.map((cert, i) => (
            <RevealSection key={cert.id} delay={i * 0.04}>
              <CertCard cert={cert} open={open} t={t} />
            </RevealSection>
          ))}
        </div>

        {/* Add more placeholders */}
        {placeholder.length > 0 && (
          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(4,1fr)", gap: 14, opacity: 0.4 }}>
            {placeholder.map(cert => (
              <AddCertSlot key={cert.id} t={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CertCard({ cert, open, t }) {
  return (
    <button
      onClick={() => open(cert)}
      className="card-lift"
      aria-label={`${cert.title} by ${cert.issuer} — click for details`}
      style={{
        background: t.bgCard, 
        border: `1px solid ${t.border}`,
        borderRadius: 16, 
        padding: "18px 16px 14px",
        cursor: "pointer", 
        textAlign: "left", 
        width: "100%",
        display: "flex", 
        flexDirection: "column", 
        position: "relative", 
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderHov; e.currentTarget.style.background = t.cardHover; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.bgCard; }}
    >
      {/* Top Emerald Accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#10b981", opacity: 0.8 }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 24 }}>{cert.icon}</span>
        {/* Using your existing StatusBadge logic */}
        <StatusBadge status={cert.status} t={t} />
      </div>

      <div style={{ fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 4, lineHeight: 1.35, fontFamily: "'Syne', sans-serif" }}>
        {cert.title}
      </div>
      <div style={{ fontSize: 12, color: t.muted, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>{cert.issuer}</div>

      {/* Topics Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 'auto' }}>
        {(cert.topics || []).slice(0, 2).map(topic => (
          <span key={topic} style={{ background: t.aCLight, color: t.accentC, padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700 }}>
            {topic}
          </span>
        ))}
      </div>
    </button>
  );
}

function AddCertSlot({ t }) {
  return (
    <div style={{
      border: `1px dashed ${t.border}`,
      borderRadius: 16, padding: "18px 16px",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 6, minHeight: 140,
    }}>
      <span style={{ fontSize: 24, opacity: 0.4 }}>➕</span>
      <span style={{ fontSize: 11, color: t.muted, fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>
        Add cert in CERTIFICATES array
      </span>
    </div>
  );
}
