/* Background video — persistent texture layer across all scroll screens. */
"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { PANEL_BG } from "@/lib/constants";

const BG_VIDEO_SRC = "/assets/hand-1.mp4";

/**
 * Looping background video with scroll-driven opacity and subtle zoom.
 * @param scrollProgress - 0-1 spring-smoothed scroll progress.
 */
export default function BackgroundVideo({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(
    scrollProgress,
    [0, 0.17, 0.37, 0.57, 0.77, 1],
    [0.75, 0.65, 0.55, 0.55, 0.65, 0.75],
  );
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.15]);

  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden will-change-transform"
        style={{ opacity, scale }}
      >
        <video
          src={BG_VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          className="h-auto w-[160%] max-w-none"
          style={{ filter: "brightness(1.05) saturate(0.35)" }}
        />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(55% 55% at 50% 50%, transparent 0%, ${PANEL_BG}66 70%, ${PANEL_BG}AA 100%)`,
        }}
      />
    </>
  );
}
