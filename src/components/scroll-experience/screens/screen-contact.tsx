/* Screen 5: Contact — shifted-left form with corner metadata. */
"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { MARK_COLOR, LAYOUT_PAD, LAYOUT_TOP } from "@/lib/constants";
import { CONTACT_META_TL, CONTACT_META_BR } from "@/lib/metadata";
import { Tier2Label } from "../typography";
import MetadataBlock from "../semiotic/metadata-block";
import ContactFormCard from "../contact-form";

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

  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center will-change-[transform,opacity]"
      style={{ opacity, y, padding: `${LAYOUT_TOP} ${LAYOUT_PAD} 8% ${LAYOUT_PAD}` }}
    >
      <MetadataBlock data={CONTACT_META_TL} corner="top-left" />
      <MetadataBlock data={CONTACT_META_BR} corner="bottom-right" />
      <div className="w-full max-w-[640px]">
        <Tier2Label text="Contact" />
        <h2
          className="mt-3 font-display text-5xl font-bold tracking-tight text-[var(--text-primary)] sm:text-7xl"
        >
          Get in Touch
        </h2>
        <p className="mt-4 text-xl" style={{ color: MARK_COLOR }}>
          Tell us about your project. We&apos;ll respond within 24 hours.
        </p>
        <div className="mt-10">
          <ContactFormCard />
        </div>
      </div>
    </motion.div>
  );
}
