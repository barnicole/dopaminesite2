/* Metadata block — monospace key-value pairs positioned in a panel corner. */

import { MARK_COLOR, META_FONT_SIZE, META_TRACKING, LAYOUT_PAD, LAYOUT_TOP } from "@/lib/constants";
import type { MetaEntry } from "@/lib/metadata";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

/**
 * Renders a monospace metadata block absolutely positioned in a corner.
 * Parent must be `position: relative`.
 * @param data - Key-value pairs to display.
 * @param corner - Which corner to anchor to.
 * @param color - Text color.
 */
export default function MetadataBlock({
  data,
  corner,
  color = MARK_COLOR,
}: {
  data: MetaEntry;
  corner: Corner;
  color?: string;
}) {
  const isTop = corner.includes("top");
  const isLeft = corner.includes("left");

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-0"
      style={{
        [isTop ? "top" : "bottom"]: "2%",
        [isLeft ? "left" : "right"]: LAYOUT_PAD,
        textAlign: isLeft ? "left" : "right",
        fontFamily: "var(--font-spacemono), monospace",
        fontSize: META_FONT_SIZE,
        letterSpacing: META_TRACKING,
        lineHeight: 1.6,
        color,
        textTransform: "uppercase",
        textShadow: "0 0 8px rgba(235,235,235,0.9), 0 0 2px rgba(235,235,235,1)",
      }}
    >
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
    </div>
  );
}
