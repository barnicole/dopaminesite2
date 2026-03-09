/* Floating HUD-style data readouts positioned around the viewport edges */
"use client";

import { useEffect, useState } from "react";

const FRAGMENT_STYLE = {
  fontFamily: "var(--font-mono)",
  fontSize: "8px",
  letterSpacing: "0.15em",
} as const;

/** Generates a random hex string of given length */
function randomHex(len: number): string {
  return Array.from({ length: len }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join("").toUpperCase();
}

/** Returns current timestamp in HH:MM:SS.ms format */
function timestamp(): string {
  const d = new Date();
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  return `${h}:${m}:${s}.${ms}`;
}

/**
 * Ambient floating data readouts at viewport edges — coordinate pairs,
 * hex sequences, timestamps. Updates every 2s to simulate live telemetry.
 * Positioned fixed so they don't scroll with content.
 */
export default function DataFragments() {
  const [data, setData] = useState({ hex1: "", hex2: "", ts: "", coord: "" });

  useEffect(() => {
    const update = () => {
      setData({
        hex1: `0x${randomHex(8)}`,
        hex2: `0x${randomHex(6)}`,
        ts: timestamp(),
        coord: `${(Math.random() * 180 - 90).toFixed(4)}°N ${(Math.random() * 360 - 180).toFixed(4)}°E`,
      });
    };
    update();
    const id = setInterval(update, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30" aria-hidden="true">
      {/* Top-left cluster */}
      <div className="absolute top-6 left-6 text-muted-text/30" style={FRAGMENT_STYLE}>
        <div>{data.ts}</div>
        <div className="mt-0.5">{data.hex1}</div>
      </div>

      {/* Bottom-left */}
      <div className="absolute bottom-6 left-6 text-muted-text/30" style={FRAGMENT_STYLE}>
        <div>SYS.NOMINAL</div>
        <div className="mt-0.5">{data.coord}</div>
      </div>

      {/* Bottom-right */}
      <div className="absolute bottom-6 right-6 text-muted-text/30 text-right" style={FRAGMENT_STYLE}>
        <div>DOPAMINE.v2.1.0</div>
        <div className="mt-0.5">{data.hex2}</div>
      </div>
    </div>
  );
}
