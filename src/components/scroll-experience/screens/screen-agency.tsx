/* Screen 3: Agency — flush-left giant pink title with service sidebar. */
"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  SITE_NAME, ACCENT, MARK_COLOR,
  LAYOUT_PAD, LAYOUT_PRIMARY, LAYOUT_SECONDARY, LAYOUT_GAP, LAYOUT_TOP,
} from "@/lib/constants";
import { AGENCY_META_TR } from "@/lib/metadata";
import { Tier2Label, IndexMarker, Fineprint } from "../typography";
import MetadataBlock from "../semiotic/metadata-block";
import { ScrollChevronDown } from "../scroll-chevron";

const SERVICES = [
  "Brand Campaigns",
  "Video Production",
  "Rapid Prototyping",
  "AI Integration",
] as const;

/**
 * Agency screen with flush-left giant DOPAMINE and right service index.
 * @param scrollProgress - 0-1 spring-smoothed scroll progress.
 */
export default function ScreenAgency({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollProgress, [0.37, 0.42, 0.48, 0.57], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.37, 0.42, 0.48, 0.57], [60, 0, 0, -60]);
  const pointerEvents = useTransform(opacity, (v) => (v > 0 ? "auto" : "none"));

  return (
    <motion.section
      aria-label="The Agency"
      className="absolute inset-0 z-10 flex items-center will-change-[transform,opacity]"
      style={{ opacity, y, pointerEvents, padding: `0 ${LAYOUT_PAD}` }}
    >
      <MetadataBlock data={AGENCY_META_TR} corner="top-right" />
      <div className="flex w-full items-end">
        <AgencyPrimary />
        <div style={{ width: LAYOUT_GAP }} />
        <ServiceSidebar />
      </div>
      <ScrollChevronDown targetFraction={0.65} />
    </motion.section>
  );
}

/** Left column: index marker, label, giant title, description. */
function AgencyPrimary() {
  return (
    <div style={{ width: LAYOUT_PRIMARY }}>
      <IndexMarker index="01" />
      <Tier2Label text="The Agency" />
      <h2
        aria-label="Dopamine Agency"
        className="mt-2 uppercase tracking-[-0.02em]"
        style={{
          fontFamily: "var(--font-bebas), var(--font-anton), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(5rem, 18vw, 14rem)",
          lineHeight: 0.9,
          color: ACCENT,
        }}
      >
        {SITE_NAME}
      </h2>
      <div className="mt-1 h-[2px] w-16" style={{ background: "#000" }} />
      <p className="mt-3 max-w-[560px] text-xl leading-[1.4] text-[var(--text-secondary)]">
        Dopamine is our agency arm — rapid prototyping and final deliverables
        using generative AI integrated into our traditional creative pipeline.
        From brand campaigns to full video productions, we use AI as an
        accelerant — not a replacement — for the craft our clients expect.
      </p>
      <Fineprint text="DPM-AG Rev.2 — For commercial licensing inquiries" />
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

/** Right column: monospace service index. */
function ServiceSidebar() {
  return (
    <div
      className="hidden md:flex md:flex-col md:items-end md:gap-3"
      style={{ width: LAYOUT_SECONDARY }}
    >
      <span
        className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em]"
        style={{ color: MARK_COLOR }}
      >
        Services
      </span>
      {SERVICES.map((svc, i) => (
        <span
          key={svc}
          className="font-mono text-[13px] uppercase tracking-[0.15em]"
          style={{ color: i === 0 ? ACCENT : MARK_COLOR }}
        >
          {svc}
        </span>
      ))}
    </div>
  );
}
