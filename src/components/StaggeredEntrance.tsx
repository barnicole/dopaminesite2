/* Staggered entrance wrapper — children fade/slide in with configurable delay */
"use client";

import { useEffect, useState, type ReactNode } from "react";

const BASE_DURATION_MS = 600;
const SLIDE_DISTANCE_PX = 20;

interface StaggeredEntranceProps {
  children: ReactNode;
  /** Delay in milliseconds before this element starts its entrance */
  delay?: number;
  /** Direction the element slides from */
  direction?: "up" | "down" | "none";
  className?: string;
}

/**
 * Wraps a child in a fade + slide entrance triggered on mount.
 * Uses CSS transitions for 60fps GPU-composited animation.
 * No intersection observer — fires once on page load with staggered timing.
 */
export default function StaggeredEntrance({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: StaggeredEntranceProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const translateY = direction === "up"
    ? SLIDE_DISTANCE_PX
    : direction === "down"
      ? -SLIDE_DISTANCE_PX
      : 0;

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${translateY}px)`,
        filter: visible ? "blur(0px)" : "blur(4px)",
        transition: `opacity ${BASE_DURATION_MS}ms ease, transform ${BASE_DURATION_MS}ms ease, filter ${BASE_DURATION_MS}ms ease`,
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
}
