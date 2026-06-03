import { useState, useEffect, useRef, useCallback } from "react";
import { DARK, LIGHT } from "../styles/tokens";

/* ── useTheme ──────────────────────────────────────────────────────
   Dark/light mode with system preference detection and localStorage
   persistence. Injects a blocking script to prevent FOUC.
   ─────────────────────────────────────────────────────────────────── */
export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("ibk-theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("ibk-theme", dark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const toggle = useCallback(() => setDark(d => !d), []);
  const t = dark ? DARK : LIGHT;

  return { dark, toggle, t };
}

/* ── useReveal ─────────────────────────────────────────────────────
   Intersection observer-based scroll reveal.
   ─────────────────────────────────────────────────────────────────── */
export function useReveal(threshold = 0.07) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, vis];
}

/* ── useCounter ────────────────────────────────────────────────────
   Animates a numeric value from 0 to target when visible.
   ─────────────────────────────────────────────────────────────────── */
export function useCounter(target, isVisible, duration = 1400) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isVisible || hasRun.current) return;
    hasRun.current = true;
    const isFloat = String(target).includes(".");
    const numericTarget = parseFloat(target);
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = numericTarget * ease;
      setCount(isFloat ? parseFloat(current.toFixed(2)) : Math.floor(current));
      if (step >= steps) { clearInterval(timer); setCount(numericTarget); }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return count;
}

/* ── useMobile ─────────────────────────────────────────────────────
   Responsive breakpoint detector.
   ─────────────────────────────────────────────────────────────────── */
export function useMobile(breakpoint = 860) {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < breakpoint);
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return mobile;
}

/* ── useScrollProgress ─────────────────────────────────────────────
   Returns 0–1 scroll progress for the entire page.
   ─────────────────────────────────────────────────────────────────── */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      setProgress(el.scrollTop / (el.scrollHeight - el.clientHeight));
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return progress;
}

/* ── useActiveSection ──────────────────────────────────────────────
   Tracks which nav section is currently in viewport.
   ─────────────────────────────────────────────────────────────────── */
export function useActiveSection(ids) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handler = () => {
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);

  return active;
}
