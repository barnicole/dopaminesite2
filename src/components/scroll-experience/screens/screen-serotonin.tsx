/* Screen 4: Serotonin — flush-left giant pink title with feature spec sidebar. */
"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  ACCENT, MARK_COLOR,
  LAYOUT_PAD, LAYOUT_PRIMARY, LAYOUT_SECONDARY, LAYOUT_GAP, LAYOUT_TOP,
} from "@/lib/constants";
import { SEROTONIN_META_TL, SEROTONIN_META_TR } from "@/lib/metadata";
import { Tier2Label, IndexMarker, Fineprint } from "../typography";
import MetadataBlock from "../semiotic/metadata-block";

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

  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-end will-change-[transform,opacity]"
      style={{ opacity, y, padding: `${LAYOUT_TOP} ${LAYOUT_PAD} 10% ${LAYOUT_PAD}` }}
    >
      <MetadataBlock data={SEROTONIN_META_TL} corner="top-left" />
      <MetadataBlock data={SEROTONIN_META_TR} corner="top-right" />
      <div className="flex w-full items-end">
        <SerotoninPrimary />
        <div style={{ width: LAYOUT_GAP }} />
        <FeatureSidebar />
      </div>
    </motion.div>
  );
}

/** Left column: index marker, label, giant title, description. */
function SerotoninPrimary() {
  return (
    <div style={{ width: LAYOUT_PRIMARY }}>
      <IndexMarker index="02" />
      <Tier2Label text="The Software" />
      <h2
        className="mt-4 uppercase tracking-[-0.02em]"
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
      <div className="mt-6 h-[2px] w-16" style={{ background: "var(--border-rule)" }} />
      <p className="mt-6 max-w-[560px] text-xl leading-[1.8] text-[var(--text-secondary)]">
        Seats-based access to the same AI pipeline we use internally,
        purpose-built so clients can create their own marketing material
        in-house. Every workspace is fully siloed — your brand kits, assets,
        and data never leak. An AI creative team on demand, with the
        guardrails an enterprise actually needs.
      </p>
      <Fineprint text="SRT-SW Rev.4 — Enterprise licensing available. All workspaces E2E encrypted." />
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
        className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em]"
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
