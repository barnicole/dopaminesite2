/* Screen 1: Hero — giant flush-left title. User scrolls to unveil the rest. */
"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  SITE_NAME, ACCENT, MARK_COLOR, LAYOUT_PAD, LAYOUT_TOP,
} from "@/lib/constants";
import { HERO_META_TL, HERO_META_BR } from "@/lib/metadata";
import MetadataBlock from "../semiotic/metadata-block";
import { ScrollChevronDown } from "../scroll-chevron";

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
  const pointerEvents = useTransform(opacity, (v) => (v > 0 ? "auto" : "none"));

  return (
    <motion.section
      aria-label="Hero"
      className="absolute inset-0 z-10 flex items-end will-change-[transform,opacity]"
      style={{ opacity, y, pointerEvents, padding: `${LAYOUT_TOP} ${LAYOUT_PAD} 10% ${LAYOUT_PAD}` }}
    >
      <MetadataBlock data={HERO_META_TL} corner="top-left" />
      <MetadataBlock data={HERO_META_BR} corner="bottom-right" />

      <div className="w-full">
        <h1>
          <span className="sr-only">{SITE_NAME}</span>
          <img
            src="/assets/dopamine-logo.svg"
            alt=""
            aria-hidden="true"
            className="block"
            style={{
              height: "clamp(7rem, 18vw, 16rem)",
              width: "auto",
            }}
          />
        </h1>
        <div className="mt-1 flex items-center justify-between">
          <p
            className="uppercase"
            style={{
              fontFamily: "var(--font-grotesk), system-ui",
              fontWeight: 500,
              fontSize: "24px",
              letterSpacing: "0.08em",
              color: MARK_COLOR,
              textShadow: "0 0 8px rgba(235,235,235,0.9), 0 0 2px rgba(235,235,235,1)",
            }}
          >
            Creative AI Infrastructure
          </p>
          <button
            onClick={() => {
              const el = document.querySelector("[aria-label='Contact']");
              if (el) {
                const container = el.closest(".h-\\[650vh\\]");
                if (container) {
                  const scrollTarget = container.clientHeight * 0.85;
                  window.scrollTo({ top: scrollTarget, behavior: "smooth" });
                }
              }
            }}
            className="font-sans text-[16px] font-normal uppercase tracking-[0.2em] rounded-lg px-4 py-2 text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent-active)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Contact Us
          </button>
        </div>
        <div className="mt-2 h-[3px] w-16" style={{ background: ACCENT }} />
      </div>

      <ScrollChevronDown targetFraction={0.25} />
    </motion.section>
  );
}
