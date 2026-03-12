/* Bouncing chevron button — scrolls to next section or back to top. */
"use client";

import { motion } from "framer-motion";
import { MARK_COLOR } from "@/lib/constants";

/**
 * Scroll to a fraction of the total scroll range (matches scrollProgress values).
 * fraction=0 scrolls to top, fraction=0.9 scrolls near bottom.
 */
function scrollToFraction(fraction: number) {
  const container = document.querySelector("[data-scroll-container]");
  if (!container) return;
  const maxScroll = container.clientHeight - window.innerHeight;
  window.scrollTo({ top: fraction * maxScroll, behavior: "smooth" });
}

/** Down chevron — scrolls to next section. */
export function ScrollChevronDown({ targetFraction }: { targetFraction: number }) {
  return (
    <motion.button
      type="button"
      aria-label="Scroll to next section"
      onClick={() => scrollToFraction(targetFraction)}
      className="absolute bottom-[6%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M4 8L10 14L16 8"
          stroke={MARK_COLOR}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

/** Up chevron with label — scrolls back to top. */
export function ScrollChevronUp() {
  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="absolute bottom-[3%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <span
        className="font-mono text-[10px] uppercase tracking-[0.15em]"
        style={{ color: MARK_COLOR }}
      >
        Back to Top
      </span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M4 12L10 6L16 12"
          stroke={MARK_COLOR}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}
