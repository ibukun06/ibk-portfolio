import { useState, useCallback, useEffect, useRef } from "react";
import { useMobile } from "../hooks";

/* ═══════════════════════════════════════════════════════════════════
   Beam Deflection Calculator — IBK Engineering Tool
   Route: /beam-deflector
   
   Formulas verified against:
   - Roark's Formulas for Stress and Strain
   - Beer & Johnston Mechanics of Materials
   - Timoshenko & Gere Theory of Elastic Stability
   ═══════════════════════════════════════════════════════════════════ */

/* ── Engineering Formulas ────────────────────────────────────────── */

/**
 * Simply Supported Beam — Central Point Load
 * δ_max = PL³ / (48EI)  at x = L/2
 * θ_A = PL² / (16EI)
 * R_A = R_B = P/2
 */
function calcSS_PointCenter(P, L, E, I) {
  const EI = E * I;
  const delta_max = (P * Math.pow(L, 3)) / (48 * EI);
  const theta_A = (P * Math.pow(L, 2)) / (16 * EI);
  const R_A = P / 2;
  const R_B = P / 2;

  // Deflection curve: y(x) = (Px)/(48EI) * (3L² - 4x²)  for 0 ≤ x ≤ L/2
  const curvePoints = [];
  const n = 80;
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * L;
    let y;
    if (x <= L / 2) {
      y = (P * x) / (48 * EI) * (3 * Math.pow(L, 2) - 4 * Math.pow(x, 2));
    } else {
      const x2 = L - x;
      y = (P * x2) / (48 * EI) * (3 * Math.pow(L, 2) - 4 * Math.pow(x2, 2));
    }
    curvePoints.push({ x, y });
  }

  return {
    delta_max,
    delta_max_pos: L / 2,
    theta_A,
    theta_B: theta_A,
    R_A, R_B,
    M_max: (P * L) / 4,
    equation: "δ_max = PL³ / (48EI)",
    curvePoints,
    reactions: [{ label: "R_A", value: R_A, pos: 0 }, { label: "R_B", value: R_B, pos: L }],
  };
}

/**
 * Simply Supported Beam — UDL (Uniformly Distributed Load)
 * δ_max = 5wL⁴ / (384EI)  at x = L/2
 * θ_A = θ_B = wL³ / (24EI)
 * R_A = R_B = wL/2
 */
function calcSS_UDL(w, L, E, I) {
  const EI = E * I;
  const delta_max = (5 * w * Math.pow(L, 4)) / (384 * EI);
  const theta = (w * Math.pow(L, 3)) / (24 * EI);
  const R_A = (w * L) / 2;
  const R_B = (w * L) / 2;

  // y(x) = (wx)/(24EI) * (L³ - 2Lx² + x³)
  const curvePoints = [];
  const n = 80;
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * L;
    const y = (w * x) / (24 * EI) * (Math.pow(L, 3) - 2 * L * Math.pow(x, 2) + Math.pow(x, 3));
    curvePoints.push({ x, y });
  }

  return {
    delta_max,
    delta_max_pos: L / 2,
    theta_A: theta,
    theta_B: theta,
    R_A, R_B,
    M_max: (w * Math.pow(L, 2)) / 8,
    equation: "δ_max = 5wL⁴ / (384EI)",
    curvePoints,
    reactions: [{ label: "R_A", value: R_A, pos: 0 }, { label: "R_B", value: R_B, pos: L }],
  };
}

/**
 * Cantilever Beam — End Point Load
 * δ_max = PL³ / (3EI)  at free end (x = L)
 * θ_max = PL² / (2EI)
 * R_A = P,  M_A = -PL (fixed end moment)
 */
function calcCantilever_Point(P, L, E, I) {
  const EI = E * I;
  const delta_max = (P * Math.pow(L, 3)) / (3 * EI);
  const theta_max = (P * Math.pow(L, 2)) / (2 * EI);

  // y(x) = (Px²)/(6EI) * (3L - x)
  const curvePoints = [];
  const n = 80;
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * L;
    const y = (P * Math.pow(x, 2)) / (6 * EI) * (3 * L - x);
    curvePoints.push({ x, y });
  }

  return {
    delta_max,
    delta_max_pos: L,
    theta_A: 0,
    theta_B: theta_max,
    R_A: P, R_B: 0,
    M_fixed: P * L,
    M_max: P * L,
    equation: "δ_max = PL³ / (3EI)",
    curvePoints,
    reactions: [{ label: "R (Fixed)", value: P, pos: 0 }, { label: "M_fixed", value: P * L, pos: 0, isMoment: true }],
  };
}

/**
 * Cantilever Beam — UDL
 * δ_max = wL⁴ / (8EI)  at free end
 * θ_max = wL³ / (6EI)
 */
function calcCantilever_UDL(w, L, E, I) {
  const EI = E * I;
  const delta_max = (w * Math.pow(L, 4)) / (8 * EI);
  const theta_max = (w * Math.pow(L, 3)) / (6 * EI);

  // y(x) = (wx²)/(24EI) * (x² - 4Lx + 6L²)
  const curvePoints = [];
  const n = 80;
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * L;
    const y = (w * Math.pow(x, 2)) / (24 * EI) * (Math.pow(x, 2) - 4 * L * x + 6 * Math.pow(L, 2));
    curvePoints.push({ x, y });
  }

  return {
    delta_max,
    delta_max_pos: L,
    theta_A: 0,
    theta_B: theta_max,
    R_A: w * L, R_B: 0,
    M_fixed: (w * Math.pow(L, 2)) / 2,
    M_max: (w * Math.pow(L, 2)) / 2,
    equation: "δ_max = wL⁴ / (8EI)",
    curvePoints,
    reactions: [{ label: "R (Fixed)", value: w * L, pos: 0 }, { label: "M_fixed", value: (w * Math.pow(L, 2)) / 2, pos: 0, isMoment: true }],
  };
}

function calculate({ loadType, boundaryCondition, load, length, E, I }) {
  const P = parseFloat(load);
  const L = parseFloat(length);
  const Eval = parseFloat(E);
  const Ival = parseFloat(I);

  if ([P, L, Eval, Ival].some(v => isNaN(v) || v <= 0)) return null;

  if (boundaryCondition === "simply_supported") {
    return loadType === "point"
      ? calcSS_PointCenter(P, L, Eval, Ival)
      : calcSS_UDL(P, L, Eval, Ival);
  } else {
    return loadType === "point"
      ? calcCantilever_Point(P, L, Eval, Ival)
      : calcCantilever_UDL(P, L, Eval, Ival);
  }
}

/* ── Beam SVG Diagram ────────────────────────────────────────────── */
function BeamDiagram({ result, inputs, t, dark }) {
  if (!result) return null;
  const { boundaryCondition, loadType, load, length } = inputs;
  const isCantilever = boundaryCondition === "cantilever";

  const W = 560, H = 200;
  const beamY = 80, beamX0 = 60, beamX1 = W - 60;
  const beamW = beamX1 - beamX0;

  // Deflection curve scaled to max 50px
  const pts = result.curvePoints;
  const maxDef = Math.max(...pts.map(p => p.y));
  const scale = maxDef > 0 ? 50 / maxDef : 1;
  const curve = pts.map(p => ({
    sx: beamX0 + (p.x / parseFloat(length)) * beamW,
    sy: beamY + p.y * scale,
  }));
  const pathD = curve.map((p, i) => `${i === 0 ? "M" : "L"}${p.sx.toFixed(1)},${p.sy.toFixed(1)}`).join(" ");

  const accentBlue = dark ? "#63b3ed" : "#2563eb";
  const amber = dark ? "#fbbf24" : "#d97706";
  const green = dark ? "#34d399" : "#059669";
  const textColor = dark ? "#a8a8c0" : "#334155";
  const lineColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W, height: "auto", display: "block" }} aria-label="Beam deflection diagram">
      {/* Grid */}
      {[40, 80, 120, 160].map(y => <line key={y} x1={beamX0} y1={y} x2={beamX1} y2={y} stroke={lineColor} strokeWidth="0.5" />)}

      {/* Fixed wall (cantilever) */}
      {isCantilever && (
        <g>
          <rect x={beamX0 - 14} y={beamY - 28} width={14} height={56} fill={dark ? "#1e293b" : "#e2e8f0"} />
          {[...Array(6)].map((_, i) => (
            <line key={i} x1={beamX0 - 14} y1={beamY - 22 + i * 9} x2={beamX0 - 20} y2={beamY - 15 + i * 9} stroke={textColor} strokeWidth="1" />
          ))}
        </g>
      )}

      {/* Support triangles (simply supported) */}
      {!isCantilever && (
        <>
          <polygon points={`${beamX0},${beamY + 10} ${beamX0 - 12},${beamY + 30} ${beamX0 + 12},${beamY + 30}`} fill="none" stroke={green} strokeWidth="1.5" />
          <polygon points={`${beamX1},${beamY + 10} ${beamX1 - 12},${beamY + 30} ${beamX1 + 12},${beamY + 30}`} fill="none" stroke={green} strokeWidth="1.5" />
          <line x1={beamX0 - 16} y1={beamY + 31} x2={beamX0 + 16} y2={beamY + 31} stroke={green} strokeWidth="1.5" />
          <line x1={beamX1 - 16} y1={beamY + 31} x2={beamX1 + 16} y2={beamY + 31} stroke={green} strokeWidth="1.5" />
          <text x={beamX0} y={beamY + 46} textAnchor="middle" fontSize="9" fill={green}>R_A = {result.R_A.toFixed(1)}N</text>
          <text x={beamX1} y={beamY + 46} textAnchor="middle" fontSize="9" fill={green}>R_B = {result.R_B.toFixed(1)}N</text>
        </>
      )}

      {/* Cantilever reaction label */}
      {isCantilever && (
        <text x={beamX0 - 7} y={beamY + 46} textAnchor="middle" fontSize="9" fill={green}>R={result.R_A.toFixed(1)}N</text>
      )}

      {/* Beam */}
      <rect x={beamX0} y={beamY - 6} width={beamW} height={12} fill={dark ? "#1e3a5f" : "#bfdbfe"} stroke={accentBlue} strokeWidth="1.5" rx="2" />

      {/* Load arrows */}
      {loadType === "point" && (
        <g>
          <line x1={beamX0 + beamW / 2} y1={beamY - 36} x2={beamX0 + beamW / 2} y2={beamY - 8} stroke={amber} strokeWidth="2" markerEnd="url(#arrowDown)" />
          <text x={beamX0 + beamW / 2} y={beamY - 42} textAnchor="middle" fontSize="10" fill={amber} fontWeight="700">P = {load}N</text>
        </g>
      )}
      {loadType === "udl" && (
        <g>
          {[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.0].map((frac, i) => {
            const x = beamX0 + frac * beamW;
            return <line key={i} x1={x} y1={beamY - 26} x2={x} y2={beamY - 8} stroke={amber} strokeWidth="1.5" markerEnd="url(#arrowDown)" />;
          })}
          <line x1={beamX0} y1={beamY - 28} x2={beamX1} y2={beamY - 28} stroke={amber} strokeWidth="1.5" />
          <text x={beamX0 + beamW / 2} y={beamY - 34} textAnchor="middle" fontSize="10" fill={amber} fontWeight="700">w = {load}N/m</text>
        </g>
      )}

      {/* Deflection curve */}
      <path d={pathD} fill="none" stroke={accentBlue} strokeWidth="2" strokeDasharray="5 3" opacity="0.85" />

      {/* Max deflection marker */}
      {curve.length > 0 && (() => {
        const maxPt = curve.reduce((a, b) => b.sy > a.sy ? b : a);
        return (
          <g>
            <line x1={maxPt.sx} y1={maxPt.sy} x2={maxPt.sx} y2={maxPt.sy + 14} stroke={accentBlue} strokeWidth="1" strokeDasharray="2 2" />
            <text x={maxPt.sx} y={maxPt.sy + 24} textAnchor="middle" fontSize="9" fill={accentBlue}>δ_max</text>
          </g>
        );
      })()}

      {/* Dimension line */}
      <line x1={beamX0} y1={H - 18} x2={beamX1} y2={H - 18} stroke={textColor} strokeWidth="0.8" />
      <line x1={beamX0} y1={H - 24} x2={beamX0} y2={H - 12} stroke={textColor} strokeWidth="0.8" />
      <line x1={beamX1} y1={H - 24} x2={beamX1} y2={H - 12} stroke={textColor} strokeWidth="0.8" />
      <text x={(beamX0 + beamX1) / 2} y={H - 6} textAnchor="middle" fontSize="9" fill={textColor}>L = {length} m</text>

      {/* Arrow marker */}
      <defs>
        <marker id="arrowDown" viewBox="0 0 8 8" refX="4" refY="8" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M 0 0 L 4 8 L 8 0" fill={amber} />
        </marker>
      </defs>

      {/* Labels */}
      <text x={beamX0 + 4} y={beamY - 10} fontSize="9" fill={textColor}>{isCantilever ? "Fixed" : "A"}</text>
      <text x={beamX1 - 4} y={beamY - 10} fontSize="9" fill={textColor} textAnchor="end">{isCantilever ? "Free" : "B"}</text>
    </svg>
  );
}

/* ── Result card ─────────────────────────────────────────────────── */
function ResultCard({ label, value, unit, formula, accent, t }) {
  return (
    <div style={{
      background: t.bgAlt,
      border: `1px solid ${accent}28`,
      borderRadius: 12, padding: "14px 16px",
      borderLeft: `3px solid ${accent}`,
    }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: t.text, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.5px" }}>
        {typeof value === "number" ? value.toExponential(3) : value}
        {unit && <span style={{ fontSize: 13, fontWeight: 600, color: t.muted, marginLeft: 4 }}>{unit}</span>}
      </div>
      {formula && <div style={{ fontSize: 11, color: t.muted, marginTop: 4, fontFamily: "'Fira Code', monospace" }}>{formula}</div>}
    </div>
  );
}

/* ── Input Field ─────────────────────────────────────────────────── */
function InputField({ label, id, value, onChange, unit, hint, t }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label htmlFor={id} style={{ fontSize: 12, fontWeight: 700, color: t.textSub, fontFamily: "'DM Sans', sans-serif" }}>
        {label} {unit && <span style={{ color: t.muted, fontWeight: 500 }}>({unit})</span>}
      </label>
      <input
        id={id} type="number" value={value} onChange={e => onChange(e.target.value)}
        step="any" min="0"
        style={{
          background: t.bgAlt, border: `1px solid ${t.border}`,
          borderRadius: 10, padding: "10px 14px",
          fontSize: 15, fontWeight: 600, color: t.text,
          fontFamily: "'DM Sans', sans-serif",
          outline: "none", transition: "border-color 0.2s",
          width: "100%",
        }}
        onFocus={e => e.target.style.borderColor = t.accent}
        onBlur={e => e.target.style.borderColor = t.border}
      />
      {hint && <div style={{ fontSize: 10.5, color: t.muted, fontFamily: "'DM Sans', sans-serif" }}>{hint}</div>}
    </div>
  );
}

function ToggleGroup({ label, options, value, onChange, t }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: t.textSub, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              background: value === opt.value ? t.gradAccent : t.bgAlt,
              color: value === opt.value ? "#fff" : t.textSub,
              border: `1px solid ${value === opt.value ? "transparent" : t.border}`,
              borderRadius: 9, padding: "8px 16px",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══ Main Page Component ═════════════════════════════════════════ */
export default function BeamDeflector({ t, dark }) {
  const mobile = useMobile();
  const [inputs, setInputs] = useState({
    loadType: "point",
    boundaryCondition: "simply_supported",
    load: "10000",
    length: "3",
    E: "200000000000",
    I: "0.00001",
  });
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const set = (key) => (val) => setInputs(prev => ({ ...prev, [key]: val }));

  // Auto-calculate on input change
  useEffect(() => {
    const r = calculate(inputs);
    setResult(r);
  }, [inputs]);

  const fmtSI = (v) => {
    if (v === undefined || v === null || isNaN(v)) return "—";
    const abs = Math.abs(v);
    if (abs >= 1e6) return (v / 1e6).toFixed(3) + " M";
    if (abs >= 1e3) return (v / 1e3).toFixed(3) + " k";
    if (abs < 0.001) return v.toExponential(3);
    return v.toFixed(4);
  };

  const copyResults = async () => {
    if (!result) return;
    const text = [
      "IBK Beam Deflection Calculator — Results",
      `Beam Type: ${inputs.boundaryCondition === "simply_supported" ? "Simply Supported" : "Cantilever"}`,
      `Load Type: ${inputs.loadType === "point" ? "Point Load" : "UDL"}`,
      `Load: ${inputs.load} ${inputs.loadType === "point" ? "N" : "N/m"}`,
      `Length: ${inputs.length} m`,
      `E: ${inputs.E} Pa`,
      `I: ${inputs.I} m⁴`,
      `Formula: ${result.equation}`,
      `Max Deflection: ${result.delta_max.toExponential(4)} m`,
      `Max Deflection Position: ${result.delta_max_pos.toFixed(3)} m`,
      `Max Moment: ${result.M_max?.toFixed(2)} N·m`,
      `Slope at A: ${result.theta_A.toExponential(4)} rad`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  const isValid = result !== null;

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{
        background: dark ? "rgba(5,5,8,0.95)" : "rgba(250,250,250,0.95)",
        borderBottom: `1px solid ${t.border}`,
        backdropFilter: "blur(16px)",
        padding: "0 1.5rem",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="/" aria-label="Back to portfolio"
              style={{
                background: t.bgAlt, border: `1px solid ${t.border}`,
                borderRadius: 9, padding: "6px 12px",
                color: t.muted, fontSize: 12, fontWeight: 700, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 5, transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = t.text; e.currentTarget.style.borderColor = t.accent; }}
              onMouseLeave={e => { e.currentTarget.style.color = t.muted; e.currentTarget.style.borderColor = t.border; }}
            >
              ← Portfolio
            </a>
            <div style={{ width: 1, height: 20, background: t.border }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>📊</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: t.text, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.3px", lineHeight: 1 }}>
                  Beam Deflection Calculator
                </div>
                <div style={{ fontSize: 10.5, color: t.muted, fontFamily: "'DM Sans', sans-serif" }}>
                  IBK Engineering Tools · Double Integration Method
                </div>
              </div>
            </div>
          </div>
          <div style={{
            background: t.aCLight, color: t.accentC,
            padding: "3px 10px", borderRadius: 999,
            fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px",
          }}>
            Live
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: mobile ? "1.5rem 1rem" : "2rem 1.5rem" }}>

        {/* Title */}
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <h1 style={{
            fontSize: mobile ? "1.6rem" : "2.2rem", fontWeight: 800,
            color: t.text, letterSpacing: "-1px", margin: "0 0 8px",
            fontFamily: "'Syne', sans-serif",
          }}>
            Structural Beam{" "}
            <span style={{ background: dark ? "linear-gradient(135deg, #3b82f6, #63b3ed)" : "linear-gradient(135deg, #1d4ed8, #2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Deflection
            </span>{" "}Calculator
          </h1>
          <p style={{ color: t.muted, fontSize: 14, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
            Simply Supported & Cantilever · Point Load & UDL · Real-time results
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "380px 1fr",
          gap: 20, alignItems: "start",
        }}>

          {/* ── LEFT: Inputs ── */}
          <div style={{
            background: t.bgCard, border: `1px solid ${t.border}`,
            borderRadius: 18, padding: "22px 20px",
            display: "flex", flexDirection: "column", gap: 18,
          }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: t.accent, textTransform: "uppercase", letterSpacing: "2px" }}>
              Input Parameters
            </div>

            <ToggleGroup label="Boundary Condition" t={t} value={inputs.boundaryCondition} onChange={set("boundaryCondition")}
              options={[
                { label: "Simply Supported", value: "simply_supported" },
                { label: "Cantilever", value: "cantilever" },
              ]}
            />

            <ToggleGroup label="Load Type" t={t} value={inputs.loadType} onChange={set("loadType")}
              options={[
                { label: "Point Load", value: "point" },
                { label: "UDL", value: "udl" },
              ]}
            />

            <InputField id="load" label={inputs.loadType === "point" ? "Load (P)" : "Distributed Load (w)"}
              unit={inputs.loadType === "point" ? "N" : "N/m"} value={inputs.load} onChange={set("load")} t={t}
              hint={inputs.loadType === "point" ? "Applied at centre (SS) or free end (cantilever)" : "Uniformly distributed along full span"}
            />

            <InputField id="length" label="Beam Length (L)" unit="m" value={inputs.length} onChange={set("length")} t={t}
              hint="Total span between supports (SS) or from fixed to free end (cantilever)"
            />

            <InputField id="E" label="Elastic Modulus (E)" unit="Pa" value={inputs.E} onChange={set("E")} t={t}
              hint="Steel ≈ 200×10⁹ Pa · Aluminium ≈ 70×10⁹ Pa · Concrete ≈ 30×10⁹ Pa"
            />

            <InputField id="I" label="Second Moment of Area (I)" unit="m⁴" value={inputs.I} onChange={set("I")} t={t}
              hint="Rectangle (bh³/12) · I-section: see table. E.g. 50×100mm rect = 4.17×10⁻⁶ m⁴"
            />

            {/* Quick presets */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: t.muted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Quick Presets</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[
                  { label: "Steel W-beam", E: "200000000000", I: "0.000125" },
                  { label: "Al. joist", E: "70000000000", I: "0.0000042" },
                  { label: "Concrete", E: "30000000000", I: "0.000208" },
                ].map(p => (
                  <button key={p.label} onClick={() => setInputs(prev => ({ ...prev, E: p.E, I: p.I }))}
                    style={{
                      background: t.bgAlt, border: `1px solid ${t.border}`,
                      borderRadius: 8, padding: "5px 10px", cursor: "pointer",
                      fontSize: 11, fontWeight: 600, color: t.muted, transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = t.accent + "50"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = t.muted; e.currentTarget.style.borderColor = t.border; }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Results ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Diagram */}
            <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 18, padding: "20px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: t.accent, textTransform: "uppercase", letterSpacing: "2px", marginBottom: 16 }}>
                Beam Diagram
              </div>
              {isValid ? (
                <BeamDiagram result={result} inputs={inputs} t={t} dark={dark} />
              ) : (
                <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center", color: t.muted, fontSize: 13 }}>
                  Enter valid parameters to see diagram
                </div>
              )}
            </div>

            {/* Formula */}
            {isValid && (
              <div style={{ background: t.code || t.bgAlt, border: `1px solid ${t.border}`, borderRadius: 14, padding: "14px 18px" }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: t.muted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Governing Formula</div>
                <div style={{ fontSize: 16, fontFamily: "'Fira Code', monospace", color: t.codeText || t.accent, fontWeight: 600 }}>
                  {result.equation}
                </div>
              </div>
            )}

            {/* Results grid */}
            {isValid ? (
              <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 10 }}>
                <ResultCard label="Max Deflection" value={result.delta_max} unit="m" formula={`at x = ${result.delta_max_pos.toFixed(3)}m`} accent={t.accent} t={t} />
                <ResultCard label="Deflection (mm)" value={result.delta_max * 1000} unit="mm" accent={t.accentB} t={t} />
                <ResultCard label="Max Moment" value={result.M_max} unit="N·m" accent={t.accentD || t.accent} t={t} />
                <ResultCard label="Slope at A" value={result.theta_A} unit="rad" accent={t.accentC} t={t} />
                {result.R_A !== undefined && <ResultCard label="Reaction R_A" value={result.R_A} unit="N" accent={t.accentB} t={t} />}
                {result.R_B !== undefined && result.R_B > 0 && <ResultCard label="Reaction R_B" value={result.R_B} unit="N" accent={t.accentB} t={t} />}
              </div>
            ) : (
              <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 18, padding: "32px", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>📐</div>
                <div style={{ color: t.muted, fontSize: 14 }}>Enter all parameters above to calculate deflection</div>
              </div>
            )}

            {/* Copy & actions */}
            {isValid && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button onClick={copyResults}
                  style={{
                    background: copied ? t.aCLight : t.aLight,
                    border: `1px solid ${copied ? t.accentC + "40" : t.accent + "30"}`,
                    borderRadius: 10, padding: "10px 18px", cursor: "pointer",
                    color: copied ? t.accentC : t.accent, fontSize: 13, fontWeight: 700,
                    transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {copied ? "✓ Copied!" : "📋 Copy Results"}
                </button>
                <button onClick={() => setInputs({ loadType: "point", boundaryCondition: "simply_supported", load: "10000", length: "3", E: "200000000000", I: "0.00001" })}
                  style={{
                    background: t.bgAlt, border: `1px solid ${t.border}`,
                    borderRadius: 10, padding: "10px 18px", cursor: "pointer",
                    color: t.muted, fontSize: 13, fontWeight: 600, transition: "all 0.2s",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Reset
                </button>
              </div>
            )}

            {/* Engineering reference note */}
            <div style={{ background: t.bgAlt, border: `1px solid ${t.border}`, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: t.muted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>
                ⚠️ Engineering Notes
              </div>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  "Point load applied at centre (SS) or free end (cantilever). Off-centre loading uses different formulas.",
                  "All calculations use elastic (small deflection) theory — valid when δ << L.",
                  "Formulas verified against Roark's Formulas for Stress and Strain (8th Ed.) and Beer & Johnston.",
                  "Results are for preliminary design only — always verify with FEM or a licensed engineer before construction.",
                ].map((note, i) => (
                  <li key={i} style={{ fontSize: 11.5, color: t.muted, lineHeight: 1.6, display: "flex", gap: 7 }}>
                    <span style={{ flexShrink: 0, color: t.accentB }}>▸</span>{note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
