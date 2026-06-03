import { RevealSection, SectionHeader, ClickHint } from "./primitives";
import { EVENTS } from "../data/portfolio";
import { useMobile } from "../hooks";

export default function Events({ open, t, setGallery }) {
  const mobile = useMobile();

  return (
    <section id="events" aria-label="Events" style={{ padding: "88px 1.5rem", background: t.bgAlt, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeader tag="Events & Participation" title="Events" sub="Professional events, summits, and conferences" t={t} />
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {EVENTS.map((ev, i) => (
            <RevealSection key={ev.id} delay={i * 0.07}>
              <EventCard ev={ev} open={open} setGallery={setGallery} t={t} />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ ev, open, setGallery, t }) {
  const isPlaceholder = ev.status === "placeholder";
  const isUpcoming = ev.type === "upcoming";

  return (
    <div
      className={!isPlaceholder ? "card-lift" : ""}
      style={{
        background: t.bgCard, border: `1px solid ${t.border}`,
        borderRadius: 16, overflow: "hidden",
        opacity: isPlaceholder ? 0.45 : 1,
        transition: "all 0.3s ease",
      }}
      onMouseEnter={e => { if (!isPlaceholder) e.currentTarget.style.borderColor = t.borderHov; }}
      onMouseLeave={e => { if (!isPlaceholder) e.currentTarget.style.borderColor = t.border; }}
    >
      {/* Cover image area */}
      <div style={{
        height: 120, background: isUpcoming
          ? `linear-gradient(135deg, ${t.aDLight}, ${t.bgAlt})`
          : `linear-gradient(135deg, ${t.aLight}, ${t.bgAlt})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        borderBottom: `1px solid ${t.border}`,
      }}>
        {ev.image ? (
          <img src={ev.image} alt={ev.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={e => e.target.style.display = "none"} />
        ) : (
          <span style={{ fontSize: 40, opacity: 0.25 }}>{isUpcoming ? "🗓️" : "📸"}</span>
        )}

        {/* Status badge */}
        <div style={{
          position: "absolute", top: 10, right: 10,
          background: isUpcoming ? t.aDLight : t.aLight,
          color: isUpcoming ? t.accentD : t.accent,
          padding: "3px 10px", borderRadius: 999,
          fontSize: 10, fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {isUpcoming ? "Upcoming" : isPlaceholder ? "Add Event" : "Past"}
        </div>

        {/* Gallery button */}
        {ev.images && ev.images.length > 0 && !isPlaceholder && (
          <button
            onClick={() => setGallery({ images: ev.images, title: ev.title })}
            style={{
              position: "absolute", bottom: 10, left: 10,
              background: "rgba(0,0,0,0.55)", border: "none",
              borderRadius: 7, padding: "4px 10px",
              color: "#fff", fontSize: 10.5, fontWeight: 700, cursor: "pointer",
              backdropFilter: "blur(4px)",
            }}
          >
            🖼️ {ev.images.length} photos
          </button>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 14px" }}>
        <div style={{ fontSize: 11, color: t.muted, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
          {ev.date} {ev.loc && ev.loc !== "TBD" && `· ${ev.loc}`}
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 4, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.2px" }}>
          {ev.title}
        </div>
        <div style={{ fontSize: 12.5, color: t.muted, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{ev.org}</div>
        {ev.role && ev.role !== "Your Role" && (
          <div style={{ fontSize: 11.5, color: t.accent, fontWeight: 700, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            Role: {ev.role}
          </div>
        )}
        <p style={{ fontSize: 12.5, color: t.textSub, lineHeight: 1.6, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
          {ev.desc}
        </p>

        {!isPlaceholder && (
          <button onClick={() => open(ev)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <ClickHint t={t} />
          </button>
        )}
        {isPlaceholder && (
          <span style={{ fontSize: 11, color: t.muted, fontFamily: "'DM Sans', sans-serif" }}>
            Edit in EVENTS array in data/portfolio.js
          </span>
        )}
      </div>
    </div>
  );
}
