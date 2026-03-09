/* Animated DNA double-helix bridge with slow phase rotation */
"use client";

import { useEffect, useRef } from "react";

const RUNG_COUNT = 14;
const RUNG_SPACING = 18;
const AMPLITUDE = 18;
const HELIX_WIDTH = 56;
const HELIX_HEIGHT = (RUNG_COUNT - 1) * RUNG_SPACING + 40;
const PADDING = 20;
const PHASE_SPEED = 0.008;

/**
 * Canvas-based animated DNA helix with rotating phase.
 * Blue strand (Dopamine) and orange strand (Serotonin) twist
 * around each other with pulsing rungs between them.
 */
export default function DnaHelix({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const phaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, HELIX_WIDTH, HELIX_HEIGHT);
      phaseRef.current += PHASE_SPEED;

      const phase = phaseRef.current;
      const rungs = buildRungs(phase);

      drawRungs(ctx, rungs, phase);
      drawStrand(ctx, rungs, "x1", "rgba(37,99,235,0.35)");
      drawStrand(ctx, rungs, "x2", "rgba(234,88,12,0.35)");
      drawNodes(ctx, rungs);

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={HELIX_WIDTH}
      height={HELIX_HEIGHT}
      className={className}
      style={{ imageRendering: "auto" }}
      aria-hidden="true"
    />
  );
}

interface Rung { y: number; x1: number; x2: number; depth1: number; depth2: number }

/** Compute rung positions with current phase offset for rotation */
function buildRungs(phase: number): Rung[] {
  const center = HELIX_WIDTH / 2;
  return Array.from({ length: RUNG_COUNT }, (_, i) => {
    const y = PADDING + i * RUNG_SPACING;
    const angle = (y / HELIX_HEIGHT) * Math.PI * 3 + phase;
    const x1 = center + AMPLITUDE * Math.sin(angle);
    const x2 = center + AMPLITUDE * Math.sin(angle + Math.PI);
    const depth1 = Math.cos(angle);
    const depth2 = Math.cos(angle + Math.PI);
    return { y, x1, x2, depth1, depth2 };
  });
}

/** Draw horizontal base-pair rungs with depth-based opacity */
function drawRungs(ctx: CanvasRenderingContext2D, rungs: Rung[], phase: number) {
  for (let i = 0; i < rungs.length; i++) {
    const r = rungs[i];
    const pulse = 0.5 + 0.5 * Math.sin(phase * 2 + i * 0.5);
    const alpha = 0.04 + 0.06 * pulse;
    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(r.x1, r.y);
    ctx.lineTo(r.x2, r.y);
    ctx.stroke();
  }
}

/** Draw one backbone strand as a smooth polyline */
function drawStrand(
  ctx: CanvasRenderingContext2D,
  rungs: Rung[],
  key: "x1" | "x2",
  color: string,
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  for (let i = 0; i < rungs.length; i++) {
    const r = rungs[i];
    if (i === 0) ctx.moveTo(r[key], r.y);
    else ctx.lineTo(r[key], r.y);
  }
  ctx.stroke();
}

/** Draw small glowing dots at rung endpoints — depth determines size */
function drawNodes(ctx: CanvasRenderingContext2D, rungs: Rung[]) {
  for (const r of rungs) {
    const r1 = 1 + Math.max(0, r.depth1) * 1.5;
    const r2 = 1 + Math.max(0, r.depth2) * 1.5;
    const a1 = 0.2 + Math.max(0, r.depth1) * 0.4;
    const a2 = 0.2 + Math.max(0, r.depth2) * 0.4;

    ctx.fillStyle = `rgba(37,99,235,${a1})`;
    ctx.beginPath();
    ctx.arc(r.x1, r.y, r1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(234,88,12,${a2})`;
    ctx.beginPath();
    ctx.arc(r.x2, r.y, r2, 0, Math.PI * 2);
    ctx.fill();
  }
}
