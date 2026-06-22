"use client";

/**
 * ArcConnector — the brand's signature motif.
 *
 * A single load-bearing curve (the "arc") sweeps across the frame, threading
 * three nodes: People → Systems → Solutions. A faint Himalayan ridgeline sits
 * beneath it. A pulse of light travels the arc on a loop, so the curve reads as
 * an active connection rather than a static line. Drawn on a 2D canvas, DPR-aware.
 *
 * Self-contained: no props required. Colors are read from CSS custom properties
 * so it always tracks the theme.
 */

import { useEffect, useRef } from "react";

interface ArcConnectorProps {
  /** 0..1 — vertical placement of the arc's apex within the canvas */
  apex?: number;
  /** label nodes, left → right */
  nodes?: string[];
  className?: string;
}

const DEFAULT_NODES = ["People", "Systems", "Solutions"];

export default function ArcConnector({
  apex = 0.42,
  nodes = DEFAULT_NODES,
  className,
}: ArcConnectorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Resolve theme colors once per resize.
    let accent = "#FF7849";
    let ice = "#6CA8C7";
    let iceBright = "#8FCBE3";
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      accent = cs.getPropertyValue("--accent").trim() || accent;
      ice = cs.getPropertyValue("--accent-ice").trim() || ice;
      iceBright = cs.getPropertyValue("--accent-ice-bright").trim() || iceBright;
    };

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readColors();
    };

    // Quadratic-ish arc sampled as points so we can place pulses + nodes on it.
    const arcPoint = (t: number) => {
      // t: 0..1 across the width
      const x = t * w;
      // a gentle catenary-like dip: apex at center, rising to the sides
      const sag = Math.sin(t * Math.PI); // 0 at ends, 1 at center
      const baseY = h * apex;
      const y = baseY + sag * h * 0.16 - (h * 0.16);
      return { x, y: y + h * 0.16 };
    };

    // Ridgeline — a few layered jagged silhouettes for depth.
    const ridge = (offset: number, amp: number, seed: number) => {
      ctx.beginPath();
      ctx.moveTo(0, h);
      const steps = 14;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = t * w;
        const n =
          Math.sin(t * 9 + seed) * 0.5 +
          Math.sin(t * 21 + seed * 2) * 0.28 +
          Math.sin(t * 4 + seed) * 0.22;
        const y = h * offset - n * amp;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
    };

    const toRGBA = (hex: string, a: number) => {
      const m = hex.replace("#", "");
      const r = parseInt(m.substring(0, 2), 16);
      const g = parseInt(m.substring(2, 4), 16);
      const b = parseInt(m.substring(4, 6), 16);
      return `rgba(${r},${g},${b},${a})`;
    };

    let raf = 0;
    let t0 = 0;

    const draw = (now: number) => {
      if (!t0) t0 = now;
      const elapsed = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);

      // ── Ridgelines (back to front, fading in) ──
      ridge(0.82, h * 0.1, 1.3);
      ctx.fillStyle = toRGBA(ice, 0.05);
      ctx.fill();
      ridge(0.9, h * 0.14, 4.1);
      ctx.fillStyle = toRGBA(ice, 0.07);
      ctx.fill();

      // ── The arc ──
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const t = i / 120;
        const p = arcPoint(t);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, toRGBA(iceBright, 0.55));
      grad.addColorStop(0.5, toRGBA(iceBright, 0.85));
      grad.addColorStop(1, toRGBA(accent, 0.85));
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = toRGBA(accent, 0.4);
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // ── Traveling pulse(s) of light along the arc ──
      const pulseCount = reduced ? 0 : 2;
      for (let k = 0; k < pulseCount; k++) {
        const phase = (elapsed * 0.18 + k * 0.5) % 1;
        const p = arcPoint(phase);
        const r = 3.2;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 26);
        glow.addColorStop(0, toRGBA(iceBright, 0.9));
        glow.addColorStop(1, toRGBA(iceBright, 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = toRGBA("#FFFFFF", 0.95);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Anchor nodes (evenly spaced along the arc) ──
      const positions = nodes.map((_, i) =>
        nodes.length === 1 ? 0.5 : i / (nodes.length - 1)
      );
      positions.forEach((t, i) => {
        const p = arcPoint(t);
        const breathe = reduced ? 0 : Math.sin(elapsed * 1.6 + i * 1.1) * 0.5 + 0.5;
        const ring = 7 + breathe * 2.5;
        const isEnd = i === positions.length - 1;
        const col = isEnd ? accent : ice;

        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, ring * 3);
        halo.addColorStop(0, toRGBA(col, 0.5));
        halo.addColorStop(1, toRGBA(col, 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(p.x, p.y, ring * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = toRGBA(col, 0.9);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, ring, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = toRGBA(col, 0.95);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // label
        ctx.font = "500 11px var(--font-inter), system-ui, sans-serif";
        ctx.fillStyle = toRGBA("#EAEEF2", 0.62);
        ctx.textAlign = i === 0 ? "left" : isEnd ? "right" : "center";
        ctx.fillText(nodes[i].toUpperCase(), p.x, p.y - ring - 12);
      });

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    window.addEventListener("resize", resize);

    if (reduced) {
      // one static frame
      draw(0);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [apex, nodes]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
