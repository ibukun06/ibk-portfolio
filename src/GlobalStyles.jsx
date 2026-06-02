export default function GlobalStyles({ dark }) {
  return (
    <style>{`
      /* ── Reset & Base ─────────────────────────────────── */
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      html {
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }

      body {
        overflow-x: hidden;
        background: ${dark ? "#050508" : "#fafafa"};
        transition: background 0.3s ease;
      }

      /* ── Scrollbar ─────────────────────────────────────── */
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb {
        background: ${dark ? "rgba(99,179,237,0.25)" : "rgba(37,99,235,0.25)"};
        border-radius: 999px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${dark ? "rgba(99,179,237,0.45)" : "rgba(37,99,235,0.45)"};
      }

      /* ── Selection ─────────────────────────────────────── */
      ::selection {
        background: ${dark ? "rgba(99,179,237,0.25)" : "rgba(37,99,235,0.15)"};
        color: ${dark ? "#f0f0f8" : "#0f172a"};
      }

      /* ── Focus visible ─────────────────────────────────── */
      :focus-visible {
        outline: 2px solid ${dark ? "#63b3ed" : "#2563eb"};
        outline-offset: 3px;
        border-radius: 4px;
      }

      /* ── Typography — Syne + DM Sans ──────────────────── */
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

      /* ── Keyframes ─────────────────────────────────────── */
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes popIn {
        from { opacity: 0; transform: scale(0.93) translateY(8px); }
        to   { opacity: 1; transform: scale(1) translateY(0); }
      }
      @keyframes slideRight {
        from { opacity: 0; transform: translateX(-20px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-10px); }
      }
      @keyframes spinSlow {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      @keyframes spinSlowR {
        from { transform: rotate(0deg); }
        to   { transform: rotate(-360deg); }
      }
      @keyframes shimmer {
        0%   { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.5; }
      }
      @keyframes countUp {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 0 0 0 currentColor; }
        50%       { box-shadow: 0 0 0 6px transparent; }
      }
      @keyframes borderSpin {
        from { --angle: 0deg; }
        to   { --angle: 360deg; }
      }
      @keyframes scanLine {
        0%   { top: 0%; opacity: 0.4; }
        100% { top: 100%; opacity: 0; }
      }

      /* ── Card hover lift ───────────────────────────────── */
      .card-lift {
        transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                    box-shadow 0.25s ease,
                    border-color 0.25s ease !important;
        will-change: transform;
      }
      .card-lift:hover {
        transform: translateY(-4px) !important;
      }

      /* ── Click hint ────────────────────────────────────── */
      .click-hint { opacity: 0.65; transition: opacity 0.2s; }
      button:hover .click-hint,
      [role="button"]:hover .click-hint { opacity: 1; }

      /* ── Shimmer skeleton ──────────────────────────────── */
      .shimmer {
        background: linear-gradient(
          90deg,
          transparent 25%,
          ${dark ? "rgba(99,179,237,0.06)" : "rgba(37,99,235,0.04)"} 50%,
          transparent 75%
        );
        background-size: 200% 100%;
        animation: shimmer 2.2s infinite;
      }

      /* ── Mobile nav animation ──────────────────────────── */
      .mobile-menu { animation: popIn 0.22s cubic-bezier(0.34,1.56,0.64,1) both; }

      /* ── Timeline connector animation ──────────────────── */
      .timeline-dot {
        transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
      }
      .timeline-card:hover .timeline-dot {
        transform: scale(1.35);
      }

      /* ── Reduced motion ────────────────────────────────── */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        html { scroll-behavior: auto; }
      }

      /* ── Print ─────────────────────────────────────────── */
      @media print {
        nav, footer, .no-print { display: none !important; }
      }
    `}</style>
  );
}
