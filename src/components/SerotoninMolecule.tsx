/* Serotonin molecule wireframe with animated electron particles flowing along bonds */
"use client";

import { useEffect, useRef } from "react";

/** Bond segment defined by start and end coordinates */
interface Bond {
  x1: number; y1: number;
  x2: number; y2: number;
}

const BONDS: Bond[] = [
  /* Benzene ring (6-membered) */
  { x1: 80, y1: 80, x2: 120, y2: 60 },
  { x1: 120, y1: 60, x2: 160, y2: 80 },
  { x1: 160, y1: 80, x2: 160, y2: 126 },
  { x1: 160, y1: 126, x2: 120, y2: 146 },
  { x1: 120, y1: 146, x2: 80, y2: 126 },
  { x1: 80, y1: 126, x2: 80, y2: 80 },
  /* Pyrrole ring (5-membered, fused) */
  { x1: 160, y1: 80, x2: 206, y2: 70 },
  { x1: 206, y1: 70, x2: 224, y2: 103 },
  { x1: 224, y1: 103, x2: 194, y2: 130 },
  { x1: 194, y1: 130, x2: 160, y2: 126 },
  /* OH group */
  { x1: 80, y1: 80, x2: 44, y2: 60 },
  /* Ethylamine chain */
  { x1: 206, y1: 70, x2: 240, y2: 42 },
  { x1: 240, y1: 42, x2: 278, y2: 56 },
  { x1: 278, y1: 56, x2: 290, y2: 30 },
];

const PARTICLE_COUNT = 8;
const PARTICLE_SPEED = 0.004;
const VIEW_WIDTH = 320;
const VIEW_HEIGHT = 280;

/**
 * Serotonin (5-hydroxytryptamine) skeletal formula with
 * animated particles traveling along bonds like electron flow.
 */
export default function SerotoninMolecule({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      bondIdx: Math.floor(Math.random() * BONDS.length),
      t: Math.random(),
      speed: PARTICLE_SPEED + Math.random() * 0.003,
    }));

    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);

      drawBonds(ctx);
      drawDoubleBonds(ctx);
      drawVertexGlow(ctx, tick);
      drawLabels(ctx);
      drawParticles(ctx, particles);
      advanceParticles(particles);
      tick++;

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={VIEW_WIDTH}
      height={VIEW_HEIGHT}
      className={className}
      aria-label="Serotonin molecular structure"
    />
  );
}

/** Unique vertex positions extracted from bond endpoints */
const VERTICES = Array.from(
  new Set(BONDS.flatMap((b) => [`${b.x1},${b.y1}`, `${b.x2},${b.y2}`])),
).map((s) => {
  const [x, y] = s.split(",").map(Number);
  return { x, y };
});

/** Subtle pulsing glow at each bond vertex — breathing effect */
function drawVertexGlow(ctx: CanvasRenderingContext2D, tick: number) {
  for (let i = 0; i < VERTICES.length; i++) {
    const v = VERTICES[i];
    const pulse = 0.3 + 0.7 * Math.sin(tick * 0.02 + i * 1.2) ** 2;
    const radius = 3 + pulse * 2;
    const grad = ctx.createRadialGradient(v.x, v.y, 0, v.x, v.y, radius);
    grad.addColorStop(0, `rgba(234,88,12,${0.25 * pulse})`);
    grad.addColorStop(1, "rgba(234,88,12,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(v.x, v.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Render all bond lines */
function drawBonds(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (const b of BONDS) {
    ctx.moveTo(b.x1, b.y1);
    ctx.lineTo(b.x2, b.y2);
  }
  ctx.stroke();
}

/** Render inner double-bond lines for aromaticity */
function drawDoubleBonds(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(123, 67);  ctx.lineTo(155, 83);
  ctx.moveTo(155, 122); ctx.lineTo(123, 139);
  ctx.moveTo(85, 122);  ctx.lineTo(85, 84);
  ctx.moveTo(165, 85);  ctx.lineTo(203, 76);
  ctx.stroke();
}

/** Render atom labels (HO, NH, NH₂) */
function drawLabels(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "500 14px system-ui, -apple-system, sans-serif";
  ctx.fillText("HO", 22, 56);
  ctx.font = "500 12px system-ui, -apple-system, sans-serif";
  ctx.fillText("N", 214, 118);
  ctx.fillText("H", 214, 136);
  ctx.font = "500 14px system-ui, -apple-system, sans-serif";
  ctx.fillText("NH", 280, 24);
  ctx.font = "500 10px system-ui, -apple-system, sans-serif";
  ctx.fillText("₂", 304, 28);
}

/** Render glowing particles at their current positions */
function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: { bondIdx: number; t: number }[],
) {
  for (const p of particles) {
    const bond = BONDS[p.bondIdx];
    const x = bond.x1 + (bond.x2 - bond.x1) * p.t;
    const y = bond.y1 + (bond.y2 - bond.y1) * p.t;

    const grad = ctx.createRadialGradient(x, y, 0, x, y, 6);
    grad.addColorStop(0, "rgba(234,88,12,0.9)");
    grad.addColorStop(1, "rgba(234,88,12,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(234,88,12,0.95)";
    ctx.beginPath();
    ctx.arc(x, y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Move particles forward, wrapping to a new random bond at the end */
function advanceParticles(
  particles: { bondIdx: number; t: number; speed: number }[],
) {
  for (const p of particles) {
    p.t += p.speed;
    if (p.t >= 1) {
      p.t = 0;
      p.bondIdx = Math.floor(Math.random() * BONDS.length);
    }
  }
}
