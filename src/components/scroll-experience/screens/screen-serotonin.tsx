/* Screen 4: Serotonin — flush-left giant pink title with feature spec sidebar. */
"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  ACCENT, MARK_COLOR,
  LAYOUT_PAD, LAYOUT_PRIMARY, LAYOUT_SECONDARY, LAYOUT_GAP, LAYOUT_TOP,
} from "@/lib/constants";
import { SEROTONIN_META_TR } from "@/lib/metadata";
import { Tier2Label, IndexMarker, Fineprint } from "../typography";
import MetadataBlock from "../semiotic/metadata-block";
import { ScrollChevronDown } from "../scroll-chevron";

const FEATURES = [
  "Siloed Workspaces",
  "E2E Encryption",
  "Brand Kit Mgmt",
  "Seat-Based Access",
] as const;

/**
 * Serotonin screen with flush-left giant product name and feature spec sidebar.
 * @param scrollProgress - 0-1 spring-smoothed scroll progress.
 */
export default function ScreenSerotonin({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollProgress, [0.57, 0.62, 0.68, 0.77], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.57, 0.62, 0.68, 0.77], [60, 0, 0, -60]);
  const pointerEvents = useTransform(opacity, (v) => (v > 0 ? "auto" : "none"));

  return (
    <motion.section
      aria-label="Serotonin Software"
      className="absolute inset-0 z-10 flex items-center will-change-[transform,opacity]"
      style={{ opacity, y, pointerEvents, padding: `0 max(${LAYOUT_PAD}, 24px)` }}
    >
      <MetadataBlock data={SEROTONIN_META_TR} corner="top-right" />
      <div className="flex w-full items-end">
        <SerotoninPrimary />
        <div className="hidden md:block" style={{ width: LAYOUT_GAP }} />
        <FeatureSidebar />
      </div>
      <ScrollChevronDown targetFraction={0.90} />
    </motion.section>
  );
}

/** Left column: index marker, label, giant title, description. */
function SerotoninPrimary() {
  return (
    <div className="w-full md:w-[62%]">
      <IndexMarker index="02" />
      <Tier2Label text="The Software" />
      <h2
        className="mt-2 uppercase tracking-[-0.02em]"
        style={{
          fontFamily: "var(--font-bebas), var(--font-anton), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(5rem, 18vw, 14rem)",
          lineHeight: 0.9,
          color: ACCENT,
        }}
      >
        Serotonin
      </h2>
      <div className="mt-1 h-[2px] w-16" style={{ background: "#000" }} />
      <p className="mt-3 max-w-[560px] text-base leading-[1.4] text-[var(--text-secondary)] sm:text-xl">
        Seats-based access to the same AI pipeline we use internally,
        purpose-built so clients can create their own marketing material
        in-house. Every workspace is fully siloed — your brand kits, assets,
        and data never leak. An AI creative team on demand, with the
        guardrails an enterprise actually needs.
      </p>
      <Fineprint text="SRT-SW Rev.4 — Enterprise licensing available. All workspaces E2E encrypted." />
      {/* Mobile: inline features list */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 md:hidden">
        {FEATURES.map((feat, i) => (
          <span
            key={feat}
            className="font-mono text-[11px] uppercase tracking-[0.15em]"
            style={{ color: i === 0 ? ACCENT : MARK_COLOR }}
          >
            {feat}
          </span>
        ))}
      </div>
      <button
        onClick={() => {
          const container = document.querySelector("[data-scroll-container]");
          if (container) {
            const maxScroll = container.clientHeight - window.innerHeight;
            window.scrollTo({ top: 0.9 * maxScroll, behavior: "smooth" });
          }
        }}
        className="mt-3 font-sans text-[16px] font-normal uppercase tracking-[0.2em] rounded-lg px-4 py-2 text-white bg-[#525252] hover:bg-[#3a3a3a] active:bg-[#2a2a2a] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Contact Us
      </button>
    </div>
  );
}

/** Right column: monospace feature specification list. */
function FeatureSidebar() {
  return (
    <div
      className="hidden md:flex md:flex-col md:items-end md:gap-3"
      style={{ width: LAYOUT_SECONDARY }}
    >
      <span
        className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em]"
        style={{ color: MARK_COLOR }}
      >
        Platform
      </span>
      {FEATURES.map((feat, i) => (
        <span
          key={feat}
          className="font-mono text-[13px] uppercase tracking-[0.15em]"
          style={{ color: i === 0 ? ACCENT : MARK_COLOR }}
        >
          {feat}
        </span>
      ))}
    </div>
  );
}
