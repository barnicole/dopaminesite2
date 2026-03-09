/* Subtle film grain noise texture overlay for depth and texture */
"use client";

import { useEffect, useRef } from "react";

const GRAIN_OPACITY = 0.03;
const GRAIN_SIZE = 128;

/**
 * Canvas-based noise overlay that generates a new random grain pattern
 * every few frames. Creates the subtle film/CRT grain texture that
 * adds analog depth to the digital aesthetic.
 */
export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const tickRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = GRAIN_SIZE;
    canvas.height = GRAIN_SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.createImageData(GRAIN_SIZE, GRAIN_SIZE);

    const draw = () => {
      tickRef.current++;
      /* Update grain every 4 frames to avoid burning GPU on noise */
      if (tickRef.current % 4 === 0) {
        generateGrain(imageData);
        ctx.putImageData(imageData, 0, 0);
      }
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        width: "100%",
        height: "100%",
        opacity: GRAIN_OPACITY,
        mixBlendMode: "screen",
      }}
      aria-hidden="true"
    />
  );
}

/** Fill ImageData buffer with random white noise pixels */
function generateGrain(imageData: ImageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const val = Math.random() * 255;
    data[i] = val;
    data[i + 1] = val;
    data[i + 2] = val;
    data[i + 3] = 255;
  }
}
