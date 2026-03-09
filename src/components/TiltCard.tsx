/* Wrapper that adds subtle 3D parallax tilt on mouse move */
"use client";

import { useRef, useCallback, type ReactNode } from "react";

const MAX_TILT_DEG = 3;
const TRANSITION_MS = 150;

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps children in a perspective container that tilts toward
 * the mouse cursor. Creates a subtle 3D parallax depth effect
 * on the product cards. Resets smoothly on mouse leave.
 */
export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * MAX_TILT_DEG}deg) rotateX(${-y * MAX_TILT_DEG}deg)`;
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transition: `transform ${TRANSITION_MS}ms ease-out`,
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}
