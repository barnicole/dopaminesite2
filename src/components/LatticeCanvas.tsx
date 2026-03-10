/* Full-page lattice grid with mouse-reactive radial glow — flashlight effect */
"use client";

import { useEffect, useRef, useCallback } from "react";

const GRID_SIZE = 40;
const DOT_RADIUS = 1.2;
const LINE_ALPHA = 0.08;
const DOT_ALPHA = 0.2;
const GLOW_RADIUS = 260;
const GLOW_BOOST_DOT = 0.8;
const GLOW_BOOST_LINE = 0.3;

/**
 * Canvas-based lattice replacing the CSS background.
 * Draws the same 40px grid with dots at intersections,
 * but adds a radial glow around the mouse cursor that
 * brightens nearby dots and lines — like a flashlight.
 */
export default function LatticeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef<number>(0);
  const dimRef = useRef({ w: 0, h: 0 });

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    dimRef.current = { w: w * dpr, h: h * dpr };
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      drawLines(ctx, w, h, mx, my);
      drawDots(ctx, w, h, mx, my);
      drawGlow(ctx, mx, my);

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

/** Draw grid lines with proximity-based brightness */
function drawLines(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  mx: number, my: number,
) {
  /* Vertical lines */
  for (let x = 0; x <= w; x += GRID_SIZE) {
    const dist = Math.abs(x - mx);
    const boost = dist < GLOW_RADIUS
      ? GLOW_BOOST_LINE * (1 - dist / GLOW_RADIUS)
      : 0;
    ctx.strokeStyle = `rgba(255,255,255,${LINE_ALPHA + boost})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  /* Horizontal lines */
  for (let y = 0; y <= h; y += GRID_SIZE) {
    const dist = Math.abs(y - my);
    const boost = dist < GLOW_RADIUS
      ? GLOW_BOOST_LINE * (1 - dist / GLOW_RADIUS)
      : 0;
    ctx.strokeStyle = `rgba(255,255,255,${LINE_ALPHA + boost})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

/** Draw dots at intersections with proximity-based brightness */
function drawDots(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  mx: number, my: number,
) {
  for (let x = 0; x <= w; x += GRID_SIZE) {
    for (let y = 0; y <= h; y += GRID_SIZE) {
      const dx = x - mx;
      const dy = y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const boost = dist < GLOW_RADIUS
        ? GLOW_BOOST_DOT * (1 - dist / GLOW_RADIUS)
        : 0;
      ctx.fillStyle = `rgba(255,255,255,${DOT_ALPHA + boost})`;
      ctx.beginPath();
      ctx.arc(x, y, DOT_RADIUS + (boost > 0.1 ? 0.5 : 0), 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/** Soft radial glow centered on the mouse */
function drawGlow(ctx: CanvasRenderingContext2D, mx: number, my: number) {
  if (mx < -500) return;
  const grad = ctx.createRadialGradient(mx, my, 0, mx, my, GLOW_RADIUS);
  grad.addColorStop(0, "rgba(255,255,255,0.07)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(mx, my, GLOW_RADIUS, 0, Math.PI * 2);
  ctx.fill();
}
