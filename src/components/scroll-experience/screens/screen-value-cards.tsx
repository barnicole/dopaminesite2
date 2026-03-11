/* Screen 2: Value Cards — blister-pack specimen cards with left-aligned title. */
"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { VALUE_CARDS, MARK_COLOR, LAYOUT_PAD, LAYOUT_TOP } from "@/lib/constants";
import { CARD_META } from "@/lib/metadata";
import { Tier2Label } from "../typography";
import BlisterCard from "../blister-card";

/**
 * Value cards screen with left-aligned header and blister-pack card grid.
 * @param scrollProgress - 0-1 spring-smoothed scroll progress.
 */
export default function ScreenValueCards({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(
    scrollProgress,
    [0.17, 0.22, 0.28, 0.37],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    scrollProgress,
    [0.17, 0.22, 0.28, 0.37],
    [60, 0, 0, -60],
  );

  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col justify-center will-change-[transform,opacity]"
      style={{ opacity, y, padding: `0 ${LAYOUT_PAD}` }}
    >
      <div className="w-full max-w-[1200px]">
        <Tier2Label text="Why Dopamine" />
        <h2
          className="mt-3 font-display text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl"
        >
          Privacy-First AI Creative Tools
        </h2>
        <p className="mt-3 text-lg" style={{ color: MARK_COLOR }}>
          Your data stays yours. No exceptions.
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3" style={{ marginTop: 48 }}>
          {VALUE_CARDS.map((card, i) => (
            <BlisterCard key={card.sku} card={card} meta={CARD_META[i]} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
