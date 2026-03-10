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
export const MARK_COLOR = "#666666";


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

