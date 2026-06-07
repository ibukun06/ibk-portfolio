import { RevealSection, SectionHeader, Chip, ClickHint } from "./primitives";
import { PROJECTS } from "../data/portfolio";
import { useMobile } from "../hooks";

export default function Projects({ open, t, setGallery }) {
  const mobile = useMobile();
  const featured = PROJECTS.find(p => p.featured);
  const others = PROJECTS.filter(p => !p.featured);

  const openProject = (project) => open({
    ...project,
    modal: project.modal,
    images: project.images,
  });

  return (
    <section id="projects" aria-label="Projects" style={{ padding: "88px 1.5rem", background: t.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <SectionHeader tag="Engineering Work" title="Projects" sub="Engineering case studies — problem → solution → outcome" t={t} />
        </RevealSection>

        {/* Featured project */}
        {featured && (
          <RevealSection delay={0.05}>
            <FeaturedCard project={featured} open={openProject} setGallery={setGallery} t={t} mobile={mobile} />
          </RevealSection>
        )}

        {/* Other projects */}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: 16, marginTop: 20 }}>
          {others.map((p, i) => (
            <RevealSection key={p.id} delay={i * 0.08}>
              <ProjectCard project={p} open={openProject} setGallery={setGallery} t={t} />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Featured Card ──────────────────────────────────────────────── */
function FeaturedCard({ project, open, setGallery, t, mobile }) {
  return (
    <div
      style={{
        background: t.bgCard, border: `1px solid ${t.borderAcc}`,
        borderRadius: 20, overflow: "hidden",
        marginBottom: 20, position: "relative",
        boxShadow: `0 0 0 1px ${t.accent}18, 0 20px 60px rgba(0,0,0,0.18)`,
        transition: "all 0.3s ease",
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = t.borderHov}
      onMouseLeave={e => e.currentTarget.style.borderColor = t.borderAcc}
    >
      {/* Featured badge */}
      <div style={{ position: "absolute", top: 20, right: 20, zIndex: 2, background: t.gradGold, color: "#fff", padding: "4px 14px", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: "0.5px", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 12px rgba(251,191,36,0.4)" }}>
        ⭐ Featured
      </div>

      <div style={{ display: mobile ? "block" : "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        {/* Image panel */}
        <div style={{
          background: `linear-gradient(135deg, ${t.bgAlt}, ${t.bgCard})`,
          minHeight: mobile ? 180 : 280,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 64, position: "relative", overflow: "hidden",
          borderRight: mobile ? "none" : `1px solid ${t.border}`,
          borderBottom: mobile ? `1px solid ${t.border}` : "none",
        }}>
          <span style={{ opacity: 0.15, fontSize: 120 }}>🚀</span>
          {project.images && project.images[0] && (
      <img
        src={project.images[0].src}
        alt={project.images[0].alt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.9,
        }}
        />
    )}
          {project.images && project.images.length > 0 && (
            <button onClick={() => setGallery({ images: project.images, title: project.title })}
              style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: "#fff", fontSize: 11, fontWeight: 700, backdropFilter: "blur(4px)" }}>
              🖼️ {project.images.length} images
            </button>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer"
              style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.6)", borderRadius: 8, padding: "6px 12px", color: t.accent, fontSize: 11, fontWeight: 700, textDecoration: "none", backdropFilter: "blur(4px)" }}>
              Live Site ↗
            </a>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "28px 28px 24px" }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: t.muted, textTransform: "uppercase", letterSpacing: "1px" }}>{project.period}</span>
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 6, letterSpacing: "-0.5px", fontFamily: "'Syne', sans-serif" }}>{project.title}</h3>
          <p style={{ fontSize: 13, color: t.muted, marginBottom: 18, fontWeight: 600 }}>{project.subtitle}</p>

          {/* Case study mini */}
          {project.problem && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
              <CaseStudyChunk label="Problem" value={project.problem} t={t} />
              <CaseStudyChunk label="Outcome" value={project.outcome} t={t} />
            </div>
          )}

          <p style={{ fontSize: 14, color: t.textSub, lineHeight: 1.7, marginBottom: 20 }}>{project.summary}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
            {project.tags.map(tag => <Chip key={tag} label={tag} t={t} />)}
          </div>

          <button onClick={() => open(project)}
            style={{
              background: t.gradAccent, color: "#fff", border: "none",
              borderRadius: 10, padding: "10px 22px", cursor: "pointer",
              fontSize: 13, fontWeight: 700, transition: "all 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Full Case Study ↗
          </button>
        </div>
      </div>
    </div>
  );
}

function CaseStudyChunk({ label, value, t }) {
  return (
    <div style={{ background: t.bgAlt, borderRadius: 10, padding: "10px 12px" }}>
      <div style={{ fontSize: 9.5, fontWeight: 800, color: t.muted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
      <div style={{ fontSize: 12, color: t.textSub, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{value}</div>
    </div>
  );
}

/* ── Project Card ───────────────────────────────────────────────── */
function ProjectCard({ project, open, setGallery, t }) {
  return (
    <div
      className="card-lift"
      style={{
        background: t.bgCard, border: `1px solid ${t.border}`,
        borderRadius: 16, overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "all 0.3s ease", height: "100%",
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = t.borderHov}
      onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
    >
      {/* Color top strip */}
      <div style={{ height: 3, background: t.gradAccent, opacity: 0.5 }} />

      <div style={{ padding: "20px 20px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{project.icon}</div>
          <span style={{ fontSize: 11, fontWeight: 700, color: t.muted, textTransform: "uppercase", letterSpacing: "1px" }}>{project.period}</span>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 5, letterSpacing: "-0.3px", fontFamily: "'Syne', sans-serif" }}>{project.title}</h3>
        <p style={{ fontSize: 12, color: t.muted, marginBottom: 12, fontWeight: 600 }}>{project.subtitle}</p>

        {/* Problem/solution mini */}
        {project.problem && (
          <div style={{ background: t.bgAlt, borderRadius: 10, padding: "10px 12px", marginBottom: 12 }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: t.muted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 3 }}>Challenge</div>
            <div style={{ fontSize: 12, color: t.textSub, lineHeight: 1.5 }}>{project.problem}</div>
          </div>
        )}

        <p style={{ fontSize: 13, color: t.textSub, lineHeight: 1.7, marginBottom: 14, flex: 1 }}>{project.summary}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
          {project.tags.slice(0, 3).map(tag => <Chip key={tag} label={tag} t={t} />)}
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => open(project)}
            style={{
              background: t.aLight, border: `1px solid ${t.accent}28`,
              borderRadius: 8, padding: "8px 16px", cursor: "pointer",
              color: t.accent, fontSize: 12, fontWeight: 700, transition: "all 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={e => e.currentTarget.style.background = t.bgHover}
            onMouseLeave={e => e.currentTarget.style.background = t.aLight}
          >
            Details ↗
          </button>

          {project.images && project.images.length > 0 && (
            <button onClick={() => setGallery({ images: project.images, title: project.title })}
              style={{
                background: "none", border: `1px solid ${t.border}`,
                borderRadius: 8, padding: "8px 12px", cursor: "pointer",
                color: t.muted, fontSize: 12, fontWeight: 600, transition: "all 0.2s",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = t.text; e.currentTarget.style.borderColor = t.borderHov; }}
              onMouseLeave={e => { e.currentTarget.style.color = t.muted; e.currentTarget.style.borderColor = t.border; }}
            >
              🖼️ {project.images.length}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
