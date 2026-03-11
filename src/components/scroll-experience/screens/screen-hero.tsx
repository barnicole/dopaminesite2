/* Screen 1: Hero — giant flush-left title. User scrolls to unveil the rest. */
"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  SITE_NAME, ACCENT, MARK_COLOR, LAYOUT_PAD, LAYOUT_TOP,
} from "@/lib/constants";
import { HERO_META_TL, HERO_META_BR } from "@/lib/metadata";
import MetadataBlock from "../semiotic/metadata-block";

/**
 * Hero screen with flush-left DOPAMINE title and subtitle.
 * @param scrollProgress - 0-1 spring-smoothed scroll progress.
 */
export default function ScreenHero({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollProgress, [0, 0.06, 0.17], [1, 1, 0]);
  const y = useTransform(scrollProgress, [0.06, 0.17], [0, -60]);

  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-end will-change-[transform,opacity]"
      style={{ opacity, y, padding: `${LAYOUT_TOP} ${LAYOUT_PAD} 10% ${LAYOUT_PAD}` }}
    >
      <MetadataBlock data={HERO_META_TL} corner="top-left" />
      <MetadataBlock data={HERO_META_BR} corner="bottom-right" />
      <div className="w-full">
        <h1
          className="uppercase tracking-[-0.02em] text-[var(--text-primary)]"
          style={{
            fontFamily: "var(--font-bebas), var(--font-anton), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(7rem, 22vw, 20rem)",
            lineHeight: 0.85,
          }}
        >
          {SITE_NAME}
        </h1>
        <p
          className="mt-5 uppercase"
          style={{
            fontFamily: "var(--font-grotesk), system-ui",
            fontWeight: 500,
            fontSize: "24px",
            letterSpacing: "0.08em",
            color: MARK_COLOR,
          }}
        >
          Creative AI Infrastructure
        </p>
        <div className="mt-8 h-[3px] w-16" style={{ background: ACCENT }} />
      </div>
    </motion.div>
  );
}
