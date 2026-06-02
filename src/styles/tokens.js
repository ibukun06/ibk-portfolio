/* ═══════════════════════════════════════════════════════════════════
   IBK Portfolio v3.0 — Design Token System
   Single source of truth for all visual design decisions.
   ═══════════════════════════════════════════════════════════════════ */

export const DARK = {
  // Backgrounds
  bg:         "#050508",
  bgAlt:      "#0a0a0f",
  bgCard:     "#0f0f17",
  bgGlass:    "rgba(15,15,23,0.72)",
  bgHover:    "#141420",

  // Surfaces
  card:       "#0f0f17",
  cardHover:  "#14141f",
  code:       "#080810",

  // Borders
  border:     "rgba(255,255,255,0.07)",
  borderHov:  "rgba(99,179,237,0.35)",
  borderAcc:  "rgba(99,179,237,0.2)",

  // Text
  text:       "#f0f0f8",
  textSub:    "#a8a8c0",
  muted:      "#6b6b88",
  codeText:   "#93c5fd",

  // Accents — Engineering Blue
  accent:     "#63b3ed",       // primary — cool engineering blue
  accentDark: "#3b82f6",       // deeper blue
  accentB:    "#fbbf24",       // amber — fabrication/warm
  accentC:    "#34d399",       // emerald — success/growth
  accentD:    "#a78bfa",       // violet — AI/digital

  // Tinted backgrounds
  aLight:     "rgba(99,179,237,0.09)",
  aBLight:    "rgba(251,191,36,0.09)",
  aCLight:    "rgba(52,211,153,0.09)",
  aDLight:    "rgba(167,139,250,0.09)",

  // Gradients
  gradHero:   "linear-gradient(135deg, #050508 0%, #080814 50%, #050508 100%)",
  gradAccent: "linear-gradient(135deg, #3b82f6 0%, #63b3ed 100%)",
  gradGold:   "linear-gradient(135deg, #d97706 0%, #fbbf24 100%)",

  // Grid overlay
  gridLine:   "rgba(99,179,237,0.04)",
};

export const LIGHT = {
  // Backgrounds
  bg:         "#fafafa",
  bgAlt:      "#f3f4f8",
  bgCard:     "#ffffff",
  bgGlass:    "rgba(255,255,255,0.82)",
  bgHover:    "#eef0f8",

  // Surfaces
  card:       "#ffffff",
  cardHover:  "#f8f9ff",
  code:       "#f1f5f9",

  // Borders
  border:     "rgba(0,0,0,0.08)",
  borderHov:  "rgba(37,99,235,0.3)",
  borderAcc:  "rgba(37,99,235,0.15)",

  // Text
  text:       "#0f172a",
  textSub:    "#334155",
  muted:      "#64748b",
  codeText:   "#1d4ed8",

  // Accents — Engineering Blue
  accent:     "#2563eb",
  accentDark: "#1d4ed8",
  accentB:    "#d97706",
  accentC:    "#059669",
  accentD:    "#7c3aed",

  // Tinted backgrounds
  aLight:     "rgba(37,99,235,0.06)",
  aBLight:    "rgba(217,119,6,0.07)",
  aCLight:    "rgba(5,150,105,0.07)",
  aDLight:    "rgba(124,58,237,0.07)",

  // Gradients
  gradHero:   "linear-gradient(135deg, #fafafa 0%, #eef0f8 50%, #fafafa 100%)",
  gradAccent: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
  gradGold:   "linear-gradient(135deg, #b45309 0%, #d97706 100%)",

  // Grid overlay
  gridLine:   "rgba(37,99,235,0.035)",
};

/* Category color map — used across Skills, Experience tags, etc. */
export const CAT_COLORS = {
  dark: {
    "Manufacturing & Fabrication": { bg: "rgba(251,191,36,0.09)", text: "#fbbf24", border: "rgba(251,191,36,0.22)" },
    "Engineering Software":        { bg: "rgba(99,179,237,0.09)", text: "#63b3ed", border: "rgba(99,179,237,0.22)" },
    "AI & Productivity":           { bg: "rgba(167,139,250,0.09)", text: "#a78bfa", border: "rgba(167,139,250,0.22)" },
    "Web Development":             { bg: "rgba(52,211,153,0.09)", text: "#34d399", border: "rgba(52,211,153,0.22)" },
    "Technical":                   { bg: "rgba(99,179,237,0.07)", text: "#63b3ed", border: "rgba(99,179,237,0.18)" },
    "Leadership":                  { bg: "rgba(248,113,113,0.08)", text: "#f87171", border: "rgba(248,113,113,0.2)" },
    "Professional Competencies":   { bg: "rgba(192,132,252,0.08)", text: "#c084fc", border: "rgba(192,132,252,0.2)" },
  },
  light: {
    "Manufacturing & Fabrication": { bg: "rgba(217,119,6,0.07)", text: "#b45309", border: "rgba(217,119,6,0.2)" },
    "Engineering Software":        { bg: "rgba(37,99,235,0.06)", text: "#1d4ed8", border: "rgba(37,99,235,0.18)" },
    "AI & Productivity":           { bg: "rgba(124,58,237,0.06)", text: "#6d28d9", border: "rgba(124,58,237,0.18)" },
    "Web Development":             { bg: "rgba(5,150,105,0.06)", text: "#047857", border: "rgba(5,150,105,0.18)" },
    "Technical":                   { bg: "rgba(37,99,235,0.05)", text: "#2563eb", border: "rgba(37,99,235,0.15)" },
    "Leadership":                  { bg: "rgba(220,38,38,0.05)", text: "#dc2626", border: "rgba(220,38,38,0.18)" },
    "Professional Competencies":   { bg: "rgba(109,40,217,0.05)", text: "#7c3aed", border: "rgba(109,40,217,0.18)" },
  },
};

export const TAG_COLORS = {
  dark: {
    "Engineering":  { bg: "rgba(251,191,36,0.1)", text: "#fbbf24" },
    "Student Govt": { bg: "rgba(52,211,153,0.1)", text: "#34d399" },
    "Fintech":      { bg: "rgba(52,211,153,0.1)", text: "#34d399" },
    "SPE":          { bg: "rgba(99,179,237,0.1)", text: "#63b3ed" },
    "Operations":   { bg: "rgba(167,139,250,0.1)", text: "#a78bfa" },
    "Outreach":     { bg: "rgba(248,113,113,0.09)", text: "#f87171" },
    "Business":     { bg: "rgba(251,191,36,0.09)", text: "#fbbf24" },
  },
  light: {
    "Engineering":  { bg: "rgba(217,119,6,0.08)", text: "#b45309" },
    "Student Govt": { bg: "rgba(5,150,105,0.07)", text: "#047857" },
    "Fintech":      { bg: "rgba(5,150,105,0.07)", text: "#047857" },
    "SPE":          { bg: "rgba(37,99,235,0.07)", text: "#1d4ed8" },
    "Operations":   { bg: "rgba(124,58,237,0.07)", text: "#6d28d9" },
    "Outreach":     { bg: "rgba(220,38,38,0.06)", text: "#dc2626" },
    "Business":     { bg: "rgba(217,119,6,0.07)", text: "#b45309" },
  },
};
