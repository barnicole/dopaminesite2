/* Screen 2: Value Cards — blister-pack specimen cards with left-aligned title. */
"use client";

import { useState } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  VALUE_CARDS, MARK_COLOR, LAYOUT_PAD, LAYOUT_TOP,
  EMBOSSED_BG, EMBOSSED_SHADOW,
} from "@/lib/constants";
import { Tier2Label } from "../typography";
import BlisterCard from "../blister-card";
import { ScrollChevronDown } from "../scroll-chevron";

/**
 * Value cards screen with left-aligned header and blister-pack card grid.
 * @param scrollProgress - 0-1 spring-smoothed scroll progress.
 */
export default function ScreenValueCards({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
  const pointerEvents = useTransform(opacity, (v) => (v > 0 ? "auto" : "none"));

  return (
    <motion.section
      aria-label="Why Dopamine"
      className="absolute inset-0 z-10 flex flex-col justify-center will-change-[transform,opacity]"
      style={{ opacity, y, pointerEvents, padding: `0 ${LAYOUT_PAD}` }}
    >
      <div className="w-full max-w-[1200px]">
        <Tier2Label text="Why Dopamine" />
        <h2
          className="mt-1.5 font-display text-4xl font-bold tracking-wide text-[var(--text-primary)] sm:text-5xl"
        >
          Privacy-First AI Creative Tools
        </h2>
        <p className="mt-1.5 text-lg" style={{ color: MARK_COLOR }}>
          Your data stays yours. No exceptions.
        </p>
        {/* Desktop: full card grid */}
        <div className="hidden gap-5 md:grid md:grid-cols-3" style={{ marginTop: 24 }}>
          {VALUE_CARDS.map((card) => (
            <BlisterCard key={card.sku} card={card} />
          ))}
        </div>
        {/* Mobile: accordion */}
        <div className="flex flex-col gap-3 md:hidden" style={{ marginTop: 20 }}>
          {VALUE_CARDS.map((card, i) => (
            <AccordionCard
              key={card.sku}
              card={card}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
      <ScrollChevronDown targetFraction={0.45} />
    </motion.section>
  );
}

const ACCORDION_BORDER = `1px solid ${MARK_COLOR}`;

/** Mobile accordion card with collapsible description. */
function AccordionCard({
  card,
  isOpen,
  onToggle,
}: {
  card: (typeof VALUE_CARDS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        background: EMBOSSED_BG,
        boxShadow: EMBOSSED_SHADOW,
        border: ACCORDION_BORDER,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div>
          <h3
            className="text-lg font-bold uppercase tracking-tight"
            style={{ fontFamily: "var(--font-grotesk), system-ui", color: "var(--text-primary)" }}
          >
            {card.badge}
          </h3>
          <p
            className="mt-0.5 text-sm font-medium"
            style={{ fontFamily: "var(--font-grotesk), system-ui", color: MARK_COLOR }}
          >
            {card.title}
          </p>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className="ml-4 flex-shrink-0 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path
            d="M4 8L10 14L16 8"
            stroke={MARK_COLOR}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className="grid transition-all duration-200 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4">
            <div className="mb-2 h-[2px] w-14" style={{ background: "var(--border-rule)" }} />
            <p
              className="text-sm leading-[1.5]"
              style={{ color: "var(--text-secondary)" }}
            >
              {card.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
