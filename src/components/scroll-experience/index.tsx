/* Scroll experience orchestrator — sticky full-bleed viewport with 5 screens. */
"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { PANEL_BG } from "@/lib/constants";
import BackgroundVideo from "./background-video";
import { RegistrationMarks, FrameTabs } from "./frame-decorations";
import ScreenHero from "./screens/screen-hero";
import ScreenValueCards from "./screens/screen-value-cards";
import ScreenAgency from "./screens/screen-agency";
import ScreenSerotonin from "./screens/screen-serotonin";
import ScreenContact from "./screens/screen-contact";

/**
 * 650vh scroll container with sticky full-bleed viewport.
 * No black border — panel fills the screen edge-to-edge.
 * Raw scroll piped through useSpring for physically-based 60fps smoothing.
 */
export default function ScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0005,
  });

  return (
    <div ref={containerRef} data-scroll-container className="h-[650vh]">
      <div className="sticky top-0 h-screen">
        <div className="relative h-full w-full overflow-clip" style={{ background: PANEL_BG }}>
          <BackgroundVideo scrollProgress={scrollYProgress} />
          <ScreenHero scrollProgress={scrollYProgress} />
          <ScreenValueCards scrollProgress={scrollYProgress} />
          <ScreenAgency scrollProgress={scrollYProgress} />
          <ScreenSerotonin scrollProgress={scrollYProgress} />
          <ScreenContact scrollProgress={scrollYProgress} />
          <RegistrationMarks />
          <FrameTabs />
        </div>
      </div>
    </div>
  );
}
