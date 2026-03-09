/* Fixed API status label + dot — top-right corner with hover tooltip */
"use client";

import { useState } from "react";

const STATUS_ONLINE = true;

/**
 * "API STATUS:" label with green/red dot fixed in the top-right corner.
 * Hover reveals a tooltip with system state. Dot pulses when online.
 */
export default function ApiStatus() {
  const [hovered, setHovered] = useState(false);
  const isOnline = STATUS_ONLINE;
  const dotColor = isOnline ? "#22c55e" : "#ef4444";

  return (
    <div
      className="fixed top-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip — slides in from right on hover */}
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxWidth: hovered ? "180px" : "0px",
          opacity: hovered ? 1 : 0,
        }}
      >
        <div className="mr-1 border border-border-line bg-bg px-3 py-1.5 whitespace-nowrap">
          <p
            className="text-[9px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: dotColor }}
          >
            {isOnline ? "Systems Online" : "Systems Offline"}
          </p>
        </div>
      </div>

      {/* Static label */}
      <p
        className="text-[9px] tracking-[0.2em] uppercase text-muted-text whitespace-nowrap"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        API Status
      </p>

      {/* Status dot */}
      <div className="relative cursor-default">
        {isOnline && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              backgroundColor: dotColor,
              opacity: 0.3,
              animationDuration: "2s",
            }}
          />
        )}
        <span
          className="relative block w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
      </div>
    </div>
  );
}
