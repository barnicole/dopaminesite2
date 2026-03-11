# Dopamine Site - Session Notes (March 10, 2026)

## What This Is

Landing site for **Dopamine** — a creative AI agency + software company. Built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion. The site is a single scroll-driven experience with 5 sticky screens.

## Live URLs

- **Production:** https://dopaminesite.pages.dev (also mapped to dopaminesite.outerheaven.ink)
- **GitHub:** https://github.com/outerheaven199X/dopaminesite2 (branch: main)
- **Cloudflare account:** webmaster@antimeme.io

## Architecture

Single-page scroll experience. One 650vh container with a sticky viewport inside. All animations driven by `useScroll` + `useSpring` + `useTransform` from Framer Motion. No routing, no API calls, fully static export.

### File Structure (lean — 6 source files total)

```
src/
  app/
    globals.css        - CSS variables, Tailwind v4 theme, reset
    layout.tsx         - Root layout, 4 Google Fonts (Bebas Neue, Anton, Space Grotesk, Space Mono)
    page.tsx           - Just renders <ScrollExperience />
  components/
    scroll-experience.tsx  - THE file. All 5 screens, form, frame decorations, utilities
  lib/
    constants.ts       - Design tokens (ACCENT, PANEL_BG, FRAME_BG, MARK_COLOR, VALUE_CARDS)
public/
  assets/
    hand-1.mp4         - Background video (~8MB, looping abstract hand/liquid)
```

### Design System ("NU Speculative Corporate")

- **Frame:** #0A0A0A (near-black) with 12px padding, rounded-[16px] content panel
- **Panel:** #EBEBEB (light gray, not white)
- **Accent:** #FF1F6B (hot pink) — used for brand names, SKU numbers, labels
- **Mark color:** #666666 — registration marks, metadata, fine print
- **Registration marks:** L-bracket + crosshair at all 4 corners
- **Frame tabs:** Dark clip tabs at midpoints of each edge

### The 5 Screens (scroll timeline 0-1 over 650vh)

| Range | Screen | Content |
|-------|--------|---------|
| 0.00-0.17 | Hero | Giant "DOPAMINE" in Bebas Neue, subtitle, accent bar |
| 0.17-0.37 | Value Cards | 3 frosted cards: The Problem / The Solution / About Us |
| 0.37-0.57 | Agency | Giant pink "DOPAMINE", agency description |
| 0.57-0.77 | Serotonin | Giant pink "SEROTONIN", software description |
| 0.77-1.00 | Contact | "Get in Touch" form with honeypot + timing anti-bot |

### Scroll Performance Optimizations

- `useSpring(rawProgress, { stiffness: 80, damping: 30 })` wraps raw scroll for physically-based smoothing
- Removed `scroll-behavior: smooth` from CSS (conflicts with Framer Motion)
- Replaced `backdrop-filter: blur(20px)` with static `rgba(235, 235, 235, 0.82)` backgrounds (blur is GPU-expensive during scroll)
- `will-change-[transform,opacity]` on all 5 animated screen layers
- `will-change-transform` on background video container
- Video has `filter: brightness(1.05) saturate(0.35)` for desaturated texture

## Deployment

- **Static export:** `output: "export"` in next.config.ts produces `out/` directory
- **Build:** `npx next build` (generates `out/`)
- **Deploy:** `npx wrangler pages deploy out --project-name=dopaminesite --commit-dirty=true`
- **Dev server:** `npm run dev` (port 3000, Turbopack)

## Known Issues / Quirks

- **Tailwind v4 padding bug:** `px-10 py-12` classes don't apply on the contact form card. Workaround: inline `padding: "48px 40px"` style.
- **Contact form is mock:** `handleSubmit` just waits 1.2s then shows success. No actual API endpoint yet.
- **Git LFS warning:** The old 73MB bg.mp4 was committed to git history. Current hand-1.mp4 is only 8MB. The large file is still in git history but not in HEAD.
- **HMR can get stale:** If dev server acts weird after many rapid edits, stop server, `rm -rf .next`, restart.

## What Was Done This Session

1. Removed footer from the page
2. Fixed contact form spacing (NAME label was cut off)
3. Tried geometric glitch-in animation for cards — user didn't like it, removed entirely
4. Tuned scroll speed iteratively (600vh -> 1000vh -> 750vh -> 650vh with tighter keyframes)
5. Added `useSpring` for 60fps scroll smoothing
6. Replaced backdrop-filter blur with static backgrounds for GPU performance
7. Removed unused Japanese fonts (Noto Sans JP, Noto Serif JP)
8. Deleted unused component files (footer.tsx, nav.tsx, and 12 other unused components)
9. Removed unused constants (NAV_LINKS, FOOTER_LINKS)
10. Swapped background video from placeholder to hand-1.mp4
11. Configured static export for Cloudflare Pages
12. Pushed to GitHub and deployed to Cloudflare Pages

## Next Steps / Ideas

- Wire up the contact form to an actual API (Cloudflare Workers endpoint, Resend, etc.)
- User may want to continue tuning scroll feel after testing on real devices
- Consider mobile responsiveness pass (cards stack 1-col on mobile already via grid, but text sizes may need tuning)
- The 73MB bg.mp4 is still in git history — could clean with `git filter-branch` or BFG if repo size matters
- Could add page transitions or micro-interactions later
- SEO: add Open Graph meta tags, structured data
