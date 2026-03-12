/* Typography primitives — NU Speculative Corporate tier system. */

import { ACCENT, MARK_COLOR } from "@/lib/constants";

/**
 * Tier 2 label — geometric sans, uppercase, wide tracking.
 * @param text - Label content.
 * @param align - Text alignment (default "left" for asymmetric layout).
 */
export function Tier2Label({
  text,
  align = "left",
}: {
  text: string;
  align?: "left" | "center";
}) {
  return (
    <span
      className={`block uppercase ${align === "center" ? "text-center" : "text-left"}`}
      style={{
        fontFamily: "var(--font-grotesk), system-ui",
        fontWeight: 600,
        fontSize: "clamp(16px, 4vw, 22px)",
        letterSpacing: "0.08em",
        color: ACCENT,
      }}
    >
      {text}
    </span>
  );
}

/** Tier 3 label — monospace, uppercase, #666 for form labels and metadata. */
export function Tier3Label({ text }: { text: string }) {
  return (
    <label
      htmlFor={text.toLowerCase()}
      className="font-mono text-[16px] uppercase tracking-[0.15em]"
      style={{ color: MARK_COLOR }}
    >
      {text}
    </label>
  );
}

/** Monospace index marker with accent dash (e.g. "— 01"). */
export function IndexMarker({ index }: { index: string }) {
  return (
    <div className="mb-2.5 flex items-center gap-4">
      <div className="h-[3px] w-10" style={{ background: ACCENT }} />
      <span
        className="font-mono text-[20px] font-medium tracking-widest"
        style={{ color: MARK_COLOR }}
      >
        {index}
      </span>
    </div>
  );
}

/** Regulatory-style fine print below section content. */
export function Fineprint({ text, children }: { text?: string; children?: React.ReactNode }) {
  return (
    <p
      className="mt-4 font-mono text-[13px] leading-relaxed tracking-wide sm:text-[15px]"
      style={{ color: MARK_COLOR }}
    >
      {children ?? text}
    </p>
  );
}
