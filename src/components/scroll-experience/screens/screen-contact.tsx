/* Screen 5: Contact — shifted-left form with corner metadata. */
"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { ACCENT, MARK_COLOR, LAYOUT_PAD, LAYOUT_TOP } from "@/lib/constants";
import { CONTACT_META_BR } from "@/lib/metadata";
import MetadataBlock from "../semiotic/metadata-block";
import ContactFormCard from "../contact-form";
import { ScrollChevronUp } from "../scroll-chevron";

/**
 * Contact screen with left-aligned heading and shifted-left form card.
 * @param scrollProgress - 0-1 spring-smoothed scroll progress.
 */
export default function ScreenContact({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollProgress, [0.77, 0.85], [0, 1]);
  const y = useTransform(scrollProgress, [0.77, 0.85], [60, 0]);
  const pointerEvents = useTransform(opacity, (v) => (v > 0 ? "auto" : "none"));

  return (
    <motion.section
      aria-label="Contact"
      className="absolute inset-0 z-10 flex items-center will-change-[transform,opacity]"
      style={{ opacity, y, pointerEvents, padding: `0 ${LAYOUT_PAD}` }}
    >
      <MetadataBlock data={CONTACT_META_BR} corner="bottom-right" />
      <div className="w-full max-w-full sm:max-w-[80%]">
        <h2
          className="font-display text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl"
        >
          Get in Touch
        </h2>
        <div className="mt-1.5 h-[3px] w-16" style={{ background: ACCENT }} />
        <p className="mt-1.5 text-lg" style={{ color: MARK_COLOR, textShadow: "0 0 8px rgba(235,235,235,0.9), 0 0 2px rgba(235,235,235,1)" }}>
          Tell us about your project. We&apos;ll respond within 1 business day.
        </p>
        <div className="mt-2">
          <ContactFormCard />
        </div>
      </div>
      <ScrollChevronUp />
    </motion.section>
  );
}
