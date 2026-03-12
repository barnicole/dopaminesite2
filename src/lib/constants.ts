/* Site-wide constants — NU Speculative Corporate design system. */

export const SITE_NAME = "Dopamine";
export const SITE_TAGLINE = "Creative AI Infrastructure";
export const SITE_DESCRIPTION =
  "Privacy-first creative AI tools for agencies and enterprises.";

/** NU accent — hot pink, used for product numbers and brand names only. */
export const ACCENT = "#FF1F6B";

/** Panel bg — light gray, not pure white. */
export const PANEL_BG = "#EBEBEB";

/** Frame bg — near-black. */
export const FRAME_BG = "#0A0A0A";

/** Mark color — registration marks, metadata, fine print. */
export const MARK_COLOR = "#525252";


/* ── Layout ── */

/** Flush-left padding from panel edge. */
export const LAYOUT_PAD = "5%";

/** Primary (left) column width. */
export const LAYOUT_PRIMARY = "62%";

/** Secondary (right) sidebar width. */
export const LAYOUT_SECONDARY = "32%";

/** Gap between primary and secondary columns. */
export const LAYOUT_GAP = "6%";

/** Top padding for content anchored to top of panel. */
export const LAYOUT_TOP = "12%";

/* ── Semiotic Marks ── */

/** Crosshair arm length in px. */
export const CROSSHAIR_SIZE = 24;

/** Metadata block font size. */
export const META_FONT_SIZE = "10px";

/** Metadata block letter spacing. */
export const META_TRACKING = "0.12em";

/* ── Blister Card Embossed Treatment ── */

/** Embossed gradient for blister-pack cards. */
export const EMBOSSED_BG =
  "linear-gradient(145deg, #f0f0f0 0%, #d8d8d8 50%, #c0c0c0 100%)";

/** Multi-layer box-shadow for embossed depth. */
export const EMBOSSED_SHADOW = [
  "4px 4px 8px rgba(0,0,0,0.15)",
  "-2px -2px 6px rgba(255,255,255,0.8)",
  "inset 2px 2px 4px rgba(255,255,255,0.6)",
  "inset -2px -2px 4px rgba(0,0,0,0.08)",
].join(", ");

/* ── Content ── */

export const VALUE_CARDS = [
  {
    index: "01",
    sku: "DPM-178",
    badge: "The Problem",
    title: "Your IP Is Exposed",
    description:
      "Third-party platforms train on your uploads. NDA assets, brand kits, and proprietary creative end up in shared datasets — a legal and competitive nightmare waiting to happen.",
  },
  {
    index: "02",
    sku: "DPM-291",
    badge: "The Solution",
    title: "Local Pipeline, Total Control",
    description:
      "Our local inference pipeline keeps every project fully siloed. Connect to our API, generate materials with natural language, and never worry about data leaking to third-party models.",
  },
  {
    index: "03",
    sku: "DPM-456",
    badge: "About Us",
    title: "Built by Operators",
    description:
      "We are a team of engineers, designers, and creatives who got tired of waiting for tools that respected our workflow. So we built them. Dopamine is the result — fast, private, uncompromising.",
  },
] as const;

