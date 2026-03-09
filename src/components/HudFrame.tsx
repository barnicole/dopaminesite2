/* HUD corner brackets and vignette overlay for cyberpunk framing */
"use client";

const BRACKET_SIZE = 24;
const BRACKET_THICKNESS = 1;
const BRACKET_COLOR = "rgba(255,255,255,0.08)";

/**
 * Fixed viewport overlay with corner brackets (like a targeting reticle)
 * and a subtle dark vignette around the edges. No interactivity —
 * purely decorative framing that sells the defense-tech aesthetic.
 */
export default function HudFrame() {
  const bracketStyle = {
    position: "absolute" as const,
    width: `${BRACKET_SIZE}px`,
    height: `${BRACKET_SIZE}px`,
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20" aria-hidden="true">
      {/* Dark vignette — radial gradient from transparent center to dark edges */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Corner brackets */}
      <div
        style={{
          ...bracketStyle,
          top: 16,
          left: 16,
          borderTop: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
          borderLeft: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
        }}
      />
      <div
        style={{
          ...bracketStyle,
          top: 16,
          right: 16,
          borderTop: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
          borderRight: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
        }}
      />
      <div
        style={{
          ...bracketStyle,
          bottom: 16,
          left: 16,
          borderBottom: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
          borderLeft: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
        }}
      />
      <div
        style={{
          ...bracketStyle,
          bottom: 16,
          right: 16,
          borderBottom: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
          borderRight: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
        }}
      />
    </div>
  );
}
