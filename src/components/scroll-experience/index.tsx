/* Scroll experience orchestrator — sticky full-bleed viewport with 5 screens. */
"use client";

import { useRef, useEffect } from "react";
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
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  });

  /* Snap to nearest section when user stops scrolling. */
  useEffect(() => {
    const SNAP_POINTS = [0, 0.25, 0.45, 0.65, 0.90];
    let debounceId: ReturnType<typeof setTimeout>;
    let snapTimeoutId: ReturnType<typeof setTimeout>;
    let isSnapping = false;

    const snap = () => {
      const el = containerRef.current;
      if (!el) return;
      const max = el.clientHeight - window.innerHeight;
      if (max <= 0) return;
      const frac = window.scrollY / max;

      let nearest = SNAP_POINTS[0];
      for (const p of SNAP_POINTS) {
        if (Math.abs(frac - p) < Math.abs(frac - nearest)) nearest = p;
      }
      if (Math.abs(frac - nearest) < 0.01) return;

      isSnapping = true;
      window.scrollTo({ top: nearest * max, behavior: "smooth" });
      snapTimeoutId = setTimeout(() => { isSnapping = false; }, 800);
    };

    const onScroll = () => {
      if (isSnapping) return;
      clearTimeout(debounceId);
      debounceId = setTimeout(snap, 80);
    };

    const cancelSnap = () => {
      if (isSnapping) {
        isSnapping = false;
        clearTimeout(snapTimeoutId);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", cancelSnap, { passive: true });
    window.addEventListener("touchstart", cancelSnap, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", cancelSnap);
      window.removeEventListener("touchstart", cancelSnap);
      clearTimeout(debounceId);
      clearTimeout(snapTimeoutId);
    };
  }, []);

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
