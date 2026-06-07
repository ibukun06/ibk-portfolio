import { useState } from "react";
import { RevealSection, SectionHeader, Chip, ClickHint } from "./primitives";
import { PROJECTS } from "../data/portfolio";
import { useMobile } from "../hooks";

/* ── Engineering Placeholder SVGs ─────────────────────────────────
   Rendered inline as SVG for gallery items that have no photo yet.
   placeholderType: "drawing" | "cad" | "airflow" | "crosssection" | "sensor"
   ─────────────────────────────────────────────────────────────────── */
function EngineeringPlaceholder({ type, caption, t }) {
  const configs = {
    drawing: {
      icon: "📐",
      label: "Engineering Drawing",
      status: "To Be Added",
      color: t.accentB,
      bg: t.aBLight,
      lines: [
        { x1: 60, y1: 80, x2: 220, y2: 80 },
        { x1: 60, y1: 110, x2: 180, y2: 110 },
        { x1: 60, y1: 140, x2: 200, y2: 140 },
        { x1: 60, y1: 80, x2: 60, y2: 140 },
        { x1: 220, y1: 80, x2: 220, y2: 95 },
      ],
    },
    cad: {
      icon: "🖥️",
      label: "CAD Assembly",
      status: "Documentation Pending",
      color: t.accent,
      bg: t.aLight,
      lines: [
        { x1: 80, y1: 70, x2: 200, y2: 70 },
        { x1: 80, y1: 70, x2: 60, y2: 100 },
        { x1: 200, y1: 70, x2: 220, y2: 100 },
        { x1: 60, y1: 100, x2: 80, y2: 130 },
        { x1: 220, y1: 100, x2: 200, y2: 130 },
        { x1: 80, y1: 130, x2: 200, y2: 130 },
      ],
    },
    airflow: {
      icon: "💨",
      label: "Airflow Schematic",
      status: "Technical Drawing Pending",
      color: t.accentC,
      bg: t.aCLight,
      lines: [
        { x1: 50, y1: 100, x2: 130, y2: 100 },
        { x1: 50, y1: 80, x2: 130, y2: 80 },
        { x1: 50, y1: 120, x2: 130, y2: 120 },
        { x1: 130, y1: 70, x2: 220, y2: 90 },
        { x1: 130, y1: 130, x2: 220, y2: 110 },
        { x1: 220, y1: 90, x2: 260, y2: 95 },
        { x1: 220, y1: 110, x2: 260, y2: 105 },
      ],
    },
    crosssection: {
      icon: "✂️",
      label: "Cross-Section Drawing",
      status: "Technical Drawing Pending",
      color: t.accentD,
      bg: t.aDLight,
      lines: [
        { x1: 100, y1: 60, x2: 200, y2: 60 },
        { x1: 100, y1: 140, x2: 200, y2: 140 },
        { x1: 100, y1: 60, x2: 100, y2: 140 },
        { x1: 200, y1: 60, x2: 200, y2: 140 },
        { x1: 120, y1: 80, x2: 180, y2: 80 },
        { x1: 120, y1: 120, x2: 180, y2: 120 },
        { x1: 120, y1: 80, x2: 120, y2: 120 },
        { x1: 180, y1: 80, x2: 180, y2: 120 },
      ],
    },
    sensor: {
      icon: "📡",
      label: "Sensor Placement Diagram",
      status: "Technical Drawing Pending",
      color: t.accentB,
      bg: t.aBLight,
      lines: [
        { x1: 60, y1: 100, x2: 240, y2: 100 },
        { x1: 60, y1: 85, x2: 60, y2: 115 },
        { x1: 240, y1: 85, x2: 240, y2: 115 },
      ],
    },
  };

  const cfg = configs[type] || configs.drawing;

  return (
    <div style={{
      width: "100%", height: "100%", minHeight: 200,
      background: cfg.bg,
      border: `1px dashed ${cfg.color}50`,
      borderRadius: 10,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 12, padding: "24px 20px",
      position: "relative",
    }}>
      {/* SVG technical drawing hint */}
      <svg width="280" height="160" viewBox="0 0 280 160" style={{ opacity: 0.18, position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {/* Graph paper grid */}
        {[20, 40, 60, 80, 100, 120, 140].map(y => <line key={`h${y}`} x1="0" y1={y} x2="280" y2={y} stroke={cfg.color} strokeWidth="0.5" />)}
        {[28, 56, 84, 112, 140, 168, 196, 224, 252].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="160" stroke={cfg.color} strokeWidth="0.5" />)}
        {/* Drawing lines */}
        {cfg.lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={cfg.color} strokeWidth="2" />
        ))}
      </svg>

      {/* Content */}
      <div style={{ fontSize: 32, position: "relative", zIndex: 1 }}>{cfg.icon}</div>
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: cfg.color, marginBottom: 4, fontFamily: "'Syne', sans-serif" }}>
          {cfg.label}
        </div>
        <div style={{
          fontSize: 11, fontWeight: 700, color: cfg.color,
          background: cfg.bg, border: `1px solid ${cfg.color}40`,
          borderRadius: 999, padding: "3px 12px", display: "inline-block",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {cfg.status}
        </div>
        {caption && (
          <div style={{ fontSize: 11, color: cfg.color, opacity: 0.7, marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Smart image component — handles real + placeholder ─────────── */
function ProjectImage({ img, t, style = {} }) {
  const [failed, setFailed] = useState(false);

  if (img.placeholder) {
    return (
      <div style={{ width: "100%", height: "100%", ...style }}>
        <EngineeringPlaceholder type={img.placeholderType} caption={img.caption} t={t} />
      </div>
    );
  }

  if (failed) {
    return (
      <div style={{
        width: "100%", height: "100%", minHeight: 180,
        background: t.bgAlt,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 8, color: t.muted, fontSize: 12,
        fontFamily: "'DM Sans', sans-serif",
        ...style,
      }}>
        <span style={{ fontSize: 28, opacity: 0.3 }}>🖼️</span>
        <span style={{ opacity: 0.5 }}>Image pending</span>
        <span style={{ fontSize: 10, opacity: 0.35, maxWidth: 160, textAlign: "center" }}>{img.src}</span>
      </div>
    );
  }

  return (
    <img
      src={img.src}
      alt={img.alt || img.caption || "Project image"}
      onError={() => setFailed(true)}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }}
    />
  );
}

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
  const [imgFailed, setImgFailed] = useState(false);
  const firstRealImage = project.images?.find(img => !img.placeholder);

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
          minHeight: mobile ? 180 : 280,
          position: "relative", overflow: "hidden",
          borderRight: mobile ? "none" : `1px solid ${t.border}`,
          borderBottom: mobile ? `1px solid ${t.border}` : "none",
          background: t.bgAlt,
        }}>
          {firstRealImage && !imgFailed ? (
            <img
              src={firstRealImage.src}
              alt={firstRealImage.alt || project.title}
              onError={() => setImgFailed(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, opacity: 0.08 }}>
              🚀
            </div>
          )}

          {/* Gallery button */}
          {project.images && project.images.length > 0 && (
            <button
              onClick={() => setGallery({ images: project.images, title: project.title })}
              style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(0,0,0,0.65)", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: "#fff", fontSize: 11, fontWeight: 700, backdropFilter: "blur(4px)", zIndex: 2 }}
            >
              🖼️ {project.images.length} images
            </button>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer"
              style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.65)", borderRadius: 8, padding: "6px 12px", color: t.accent, fontSize: 11, fontWeight: 700, textDecoration: "none", backdropFilter: "blur(4px)", zIndex: 2 }}>
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
  const hasInteractiveTool = !!project.interactiveTool;
  const firstRealImage = project.images?.find(img => !img.placeholder);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className="card-lift"
      style={{
        background: t.bgCard, border: `1px solid ${t.border}`,
        borderRadius: 16, overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "all 0.3s ease", height: "100%",
        ...(hasInteractiveTool ? { borderColor: t.accentD ? t.accentD + "30" : t.accent + "30" } : {}),
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = t.borderHov}
      onMouseLeave={e => e.currentTarget.style.borderColor = hasInteractiveTool ? (t.accentD ? t.accentD + "30" : t.accent + "30") : t.border}
    >
      {/* Color top strip — violet for interactive tool, blue otherwise */}
      <div style={{
        height: 3,
        background: hasInteractiveTool ? (t.accentD || t.accent) : t.gradAccent,
        opacity: 0.6,
      }} />

      {/* Thumbnail image strip (if available) */}
      {firstRealImage && !imgFailed && (
        <div style={{ height: 130, overflow: "hidden", position: "relative", borderBottom: `1px solid ${t.border}` }}>
          <img
            src={firstRealImage.src}
            alt={firstRealImage.alt || project.title}
            onError={() => setImgFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.35))" }} />
        </div>
      )}

      <div style={{ padding: "20px 20px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{project.icon}</div>
          <span style={{ fontSize: 11, fontWeight: 700, color: t.muted, textTransform: "uppercase", letterSpacing: "1px" }}>{project.period}</span>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 5, letterSpacing: "-0.3px", fontFamily: "'Syne', sans-serif" }}>{project.title}</h3>
        <p style={{ fontSize: 12, color: t.muted, marginBottom: 12, fontWeight: 600 }}>{project.subtitle}</p>

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

        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
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

          {/* Interactive Tool Launch Button — Phase 5 */}
          {hasInteractiveTool && (
            <a
              href={project.interactiveTool}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                background: t.gradAccent,
                color: "#fff", borderRadius: 8, padding: "8px 14px",
                fontSize: 12, fontWeight: 700, textDecoration: "none",
                boxShadow: `0 3px 12px rgba(99,179,237,0.35)`,
                transition: "all 0.25s ease",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,179,237,0.55)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 3px 12px rgba(99,179,237,0.35)"; e.currentTarget.style.transform = "none"; }}
            >
              🚀 Launch Tool
            </a>
          )}

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
