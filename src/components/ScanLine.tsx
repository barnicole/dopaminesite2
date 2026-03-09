/* Ambient horizontal scan line that sweeps down the viewport on loop */
"use client";

/**
 * Full-viewport fixed scan line — a thin horizontal bar that
 * slowly descends the screen like a CRT refresh or radar sweep.
 * Pure CSS animation, no JS overhead.
 */
export default function ScanLine() {
  return (
    <div
      className="fixed inset-x-0 top-0 h-[2px] z-40 pointer-events-none scan-line-sweep"
      aria-hidden="true"
    />
  );
}
