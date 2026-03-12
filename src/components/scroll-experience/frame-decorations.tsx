/* Frame decorations — crosshair registration marks and edge clip tabs. */

import { MARK_COLOR, FRAME_BG } from "@/lib/constants";

/** Inset from viewport edge to crosshair center. */
const CROSS_INSET = 28;

/** Crosshair arm length in px. */
const CROSS_ARM = 16;

/** Crosshair registration marks at all four panel corners. */
export function RegistrationMarks() {
  return (
    <div aria-hidden="true" className="contents">
      <Corner isTop isLeft />
      <Corner isTop isLeft={false} />
      <Corner isTop={false} isLeft />
      <Corner isTop={false} isLeft={false} />
    </div>
  );
}

/**
 * Single corner crosshair — clean + mark, no L-bracket.
 * @param isTop - Anchor to top edge.
 * @param isLeft - Anchor to left edge.
 */
function Corner({ isTop, isLeft }: { isTop: boolean; isLeft: boolean }) {
  const style: React.CSSProperties = {
    position: "absolute",
    zIndex: 20,
    pointerEvents: "none",
    ...(isTop ? { top: CROSS_INSET } : { bottom: CROSS_INSET }),
    ...(isLeft ? { left: CROSS_INSET } : { right: CROSS_INSET }),
  };

  return (
    <div style={style}>
      <div style={{ position: "absolute", top: -CROSS_ARM, left: 0, width: 1, height: CROSS_ARM * 2, background: MARK_COLOR }} />
      <div style={{ position: "absolute", left: -CROSS_ARM, top: 0, height: 1, width: CROSS_ARM * 2, background: MARK_COLOR }} />
    </div>
  );
}

/** Dark clip tabs at the mid-point of each panel edge. */
export function FrameTabs() {
  return (
    <div aria-hidden="true" className="contents">
      <Tab side="top" />
      <Tab side="bottom" />
      <Tab side="left" />
      <Tab side="right" />
    </div>
  );
}

/**
 * Single clip tab — dark pill anchored to viewport edge, peeking onto the panel.
 * @param side - Which edge to render on.
 */
function Tab({ side }: { side: "top" | "bottom" | "left" | "right" }) {
  const isVertical = side === "left" || side === "right";
  const tabWidth = isVertical ? 20 : 72;
  const tabHeight = isVertical ? 72 : 20;

  const style: React.CSSProperties = {
    position: "absolute",
    zIndex: 20,
    pointerEvents: "none",
    width: tabWidth,
    height: tabHeight,
    background: FRAME_BG,
  };

  const positionStyle: React.CSSProperties = getTabPosition(side, isVertical);
  const radiusStyle = getTabRadius(side);

  return <div style={{ ...style, ...positionStyle, ...radiusStyle }} />;
}

/** Compute position so tab is flush against the viewport edge. */
function getTabPosition(side: string, isVertical: boolean): React.CSSProperties {
  if (side === "top") return { top: 0, left: "50%", transform: "translateX(-50%)" };
  if (side === "bottom") return { bottom: 0, left: "50%", transform: "translateX(-50%)" };
  if (side === "left") return { left: 0, top: "50%", transform: "translateY(-50%)" };
  return { right: 0, top: "50%", transform: "translateY(-50%)" };
}

/** Round only the interior corners so the tab "clips" onto the edge. */
function getTabRadius(side: string): React.CSSProperties {
  const r = 6;
  if (side === "top") return { borderRadius: `0 0 ${r}px ${r}px` };
  if (side === "bottom") return { borderRadius: `${r}px ${r}px 0 0` };
  if (side === "left") return { borderRadius: `0 ${r}px ${r}px 0` };
  return { borderRadius: `${r}px 0 0 ${r}px` };
}
