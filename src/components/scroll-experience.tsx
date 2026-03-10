/* Scroll experience — NU Speculative Corporate: dark frame, #EBEBEB panels, registration marks. */
"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import {
  SITE_NAME, VALUE_CARDS, ACCENT, PANEL_BG, FRAME_BG, MARK_COLOR,
} from "@/lib/constants";

const BG_VIDEO_SRC = "/assets/hand-1.mp4";
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;
const SUBMIT_COOLDOWN_MS = 5000;

/*
 * Scroll timeline (0–1 over 650vh):
 *   0.00–0.17  Screen 1: Hero
 *   0.17–0.37  Screen 2: Value Cards
 *   0.37–0.57  Screen 3: Agency
 *   0.57–0.77  Screen 4: Serotonin
 *   0.77–1.00  Screen 5: Contact form
 * Hold phases are minimal — scroll keeps flowing.
 */

type ScrollProp = { scrollProgress: MotionValue<number> };

/**
 * 650vh scroll container with sticky dark-framed viewport.
 * Content panel (#EBEBEB) sits inside the frame with registration marks.
 */
export default function ScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /** Smooth raw scroll into physically-based spring for 60fps glide. */
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0005,
  });

  return (
    <div ref={containerRef} className="h-[650vh]">
      <div
        className="sticky top-0 flex h-screen flex-col px-3 py-3"
        style={{ background: FRAME_BG }}
      >
        <div className="relative min-h-0 flex-1">
          <div
            className="h-full w-full overflow-hidden rounded-[16px]"
            style={{ background: PANEL_BG }}
          >
            <BackgroundVideo scrollProgress={scrollYProgress} />
            <ScreenHero scrollProgress={scrollYProgress} />
            <ScreenValueCards scrollProgress={scrollYProgress} />
            <ScreenAgency scrollProgress={scrollYProgress} />
            <ScreenSerotonin scrollProgress={scrollYProgress} />
            <ScreenContact scrollProgress={scrollYProgress} />
          </div>
          <RegistrationMarks />
          <FrameTabs />
        </div>
      </div>
    </div>
  );
}

/** Background video — persistent texture across all screens. */
function BackgroundVideo({ scrollProgress }: ScrollProp) {
  const opacity = useTransform(
    scrollProgress,
    [0, 0.17, 0.37, 0.57, 0.77, 1],
    [0.75, 0.65, 0.55, 0.55, 0.65, 0.75]
  );
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.15]);

  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden will-change-transform"
        style={{ opacity, scale }}
      >
        <video
          src={BG_VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          className="h-auto w-[160%] max-w-none"
          style={{ filter: "brightness(1.05) saturate(0.35)" }}
        />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(55% 55% at 50% 50%, transparent 0%, ${PANEL_BG}66 70%, ${PANEL_BG}AA 100%)`,
        }}
      />
    </>
  );
}

/* ─── Screen 1: Hero — massive condensed type ─── */
function ScreenHero({ scrollProgress }: ScrollProp) {
  const opacity = useTransform(scrollProgress, [0, 0.06, 0.17], [1, 1, 0]);
  const y = useTransform(scrollProgress, [0.06, 0.17], [0, -60]);

  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-10 will-change-[transform,opacity]"
      style={{ opacity, y }}
    >
      <h1
        className="text-center uppercase tracking-[-0.02em] text-[var(--text-primary)]"
        style={{
          fontFamily: "var(--font-bebas), var(--font-anton), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(7rem, 22vw, 20rem)",
          lineHeight: 0.85,
        }}
      >
        {SITE_NAME}
      </h1>
      <p
        className="mt-5 uppercase"
        style={{
          fontFamily: "var(--font-grotesk), system-ui",
          fontWeight: 500,
          fontSize: "24px",
          letterSpacing: "0.08em",
          color: MARK_COLOR,
        }}
      >
        Creative AI Infrastructure
      </p>
      <div className="mt-8 h-[3px] w-16" style={{ background: ACCENT }} />
    </motion.div>
  );
}

/* ─── Screen 2: Value Cards — dark panels with large SKU numbers ─── */

function ScreenValueCards({ scrollProgress }: ScrollProp) {
  const opacity = useTransform(scrollProgress, [0.17, 0.22, 0.28, 0.37], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.17, 0.22, 0.28, 0.37], [60, 0, 0, -60]);

  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center justify-center px-10 will-change-[transform,opacity]"
      style={{ opacity, y }}
    >
      <div className="w-full max-w-[1200px]">
        <Tier2Label text="Why Dopamine" />
        <h2 className="mt-3 text-center font-display text-5xl font-bold tracking-tight text-[var(--text-primary)] sm:text-7xl">
          Privacy-First AI Creative Tools
        </h2>
        <p className="mt-4 text-center text-xl" style={{ color: MARK_COLOR }}>
          Your data stays yours. No exceptions.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUE_CARDS.map((card) => (
            <ValueCard key={card.badge} card={card} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/** Glass card — centered text, SKU bottom-right. Static bg for scroll perf. */
function ValueCard({ card }: { card: (typeof VALUE_CARDS)[number] }) {
  return (
    <div
      className="group relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-2xl p-12 text-center"
      style={{
        background: "rgba(235, 235, 235, 0.82)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
      }}
    >
      <h3
        className="text-3xl font-bold uppercase tracking-tight sm:text-4xl"
        style={{
          fontFamily: "var(--font-grotesk), system-ui",
          color: "var(--text-primary)",
        }}
      >
        {card.badge}
      </h3>
      <p
        className="mt-3 text-xl font-medium"
        style={{
          fontFamily: "var(--font-grotesk), system-ui",
          color: MARK_COLOR,
        }}
      >
        {card.title}
      </p>
      <div
        className="mx-auto mt-5 h-[2px] w-14"
        style={{ background: "var(--border-rule)" }}
      />
      <p
        className="mt-5 max-w-[340px] text-lg leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {card.description}
      </p>
      <span
        className="absolute bottom-5 right-6 font-mono text-[18px] tracking-wide"
        style={{ color: ACCENT }}
      >
        {card.sku}
      </span>
    </div>
  );
}

/* ─── Screen 3: Agency — massive pink brand name ─── */
function ScreenAgency({ scrollProgress }: ScrollProp) {
  const opacity = useTransform(scrollProgress, [0.37, 0.42, 0.48, 0.57], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.37, 0.42, 0.48, 0.57], [60, 0, 0, -60]);

  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center justify-center px-10 will-change-[transform,opacity]"
      style={{ opacity, y }}
    >
      <div className="flex max-w-[680px] flex-col items-center text-center">
        <IndexMarker index="01" />
        <Tier2Label text="The Agency" />
        <h2
          className="mt-4 uppercase tracking-[-0.02em]"
          style={{
            fontFamily: "var(--font-bebas), var(--font-anton), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(5rem, 18vw, 14rem)",
            lineHeight: 0.9,
            color: ACCENT,
          }}
        >
          {SITE_NAME}
        </h2>
        <div className="mt-6 h-[2px] w-16" style={{ background: "var(--border-rule)" }} />
        <p className="mt-6 max-w-[560px] text-xl leading-[1.8] text-[var(--text-secondary)]">
          Dopamine is our agency arm — rapid prototyping and final deliverables
          using generative AI integrated into our traditional creative pipeline.
          From brand campaigns to full video productions, we use AI as an
          accelerant — not a replacement — for the craft our clients expect.
        </p>
        <Fineprint text="DPM-AG Rev.2 — For commercial licensing inquiries contact ops@dopamine.ai" />
      </div>
    </motion.div>
  );
}

/* ─── Screen 4: Serotonin — massive pink product name ─── */
function ScreenSerotonin({ scrollProgress }: ScrollProp) {
  const opacity = useTransform(scrollProgress, [0.57, 0.62, 0.68, 0.77], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.57, 0.62, 0.68, 0.77], [60, 0, 0, -60]);

  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center justify-center px-10 will-change-[transform,opacity]"
      style={{ opacity, y }}
    >
      <div className="flex max-w-[680px] flex-col items-center text-center">
        <IndexMarker index="02" />
        <Tier2Label text="The Software" />
        <h2
          className="mt-4 uppercase tracking-[-0.02em]"
          style={{
            fontFamily: "var(--font-bebas), var(--font-anton), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(5rem, 18vw, 14rem)",
            lineHeight: 0.9,
            color: ACCENT,
          }}
        >
          Serotonin
        </h2>
        <div className="mt-6 h-[2px] w-16" style={{ background: "var(--border-rule)" }} />
        <p className="mt-6 max-w-[560px] text-xl leading-[1.8] text-[var(--text-secondary)]">
          Seats-based access to the same AI pipeline we use internally,
          purpose-built so clients can create their own marketing material
          in-house. Every workspace is fully siloed — your brand kits, assets,
          and data never leak. An AI creative team on demand, with the
          guardrails an enterprise actually needs.
        </p>
        <Fineprint text="SRT-SW Rev.4 — Enterprise licensing available. All workspaces E2E encrypted." />
      </div>
    </motion.div>
  );
}

/* ─── Screen 5: Contact Form ─── */
function ScreenContact({ scrollProgress }: ScrollProp) {
  const opacity = useTransform(scrollProgress, [0.77, 0.85], [0, 1]);
  const y = useTransform(scrollProgress, [0.77, 0.85], [60, 0]);

  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center justify-center px-10 will-change-[transform,opacity]"
      style={{ opacity, y }}
    >
      <div className="w-full max-w-[640px]">
        <Tier2Label text="Contact" />
        <h2 className="mt-3 text-center font-display text-5xl font-bold tracking-tight text-[var(--text-primary)] sm:text-7xl">
          Get in Touch
        </h2>
        <p className="mt-4 text-center text-xl" style={{ color: MARK_COLOR }}>
          Tell us about your project. We&apos;ll respond within 24 hours.
        </p>
        <div className="mt-10">
          <ContactFormCard />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Contact Form ─── */

/** Form card with honeypot + timing anti-bot measures. */
function ContactFormCard() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const loadedAt = useRef(Date.now());

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("website")) return;
    if (Date.now() - loadedAt.current < SUBMIT_COOLDOWN_MS) return;

    const name = sanitizeInput(((data.get("name") as string) || "").trim().slice(0, MAX_NAME_LENGTH));
    const email = sanitizeInput(((data.get("email") as string) || "").trim().slice(0, MAX_EMAIL_LENGTH));
    const message = sanitizeInput(((data.get("message") as string) || "").trim().slice(0, MAX_MESSAGE_LENGTH));

    if (!name || !email || !message) return;
    if (!isValidEmail(email)) { setStatus("error"); return; }

    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    form.reset();
  }

  if (status === "sent") return <SuccessMessage />;

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        padding: "48px 40px",
        background: "rgba(235, 235, 235, 0.82)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
      }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        <FormField label="Name" name="name" type="text" placeholder="Your name" max={MAX_NAME_LENGTH} />
        <FormField label="Email" name="email" type="email" placeholder="you@company.com" max={MAX_EMAIL_LENGTH} />
        <FormTextarea />
        {status === "error" && (
          <p className="font-mono text-base" style={{ color: ACCENT }}>
            Please enter a valid email address.
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-3 rounded-lg px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-40"
          style={{ background: ACCENT }}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

/** Post-submit success state. */
function SuccessMessage() {
  return (
    <div
      className="overflow-hidden rounded-2xl p-12 text-center"
      style={{
        background: "rgba(235, 235, 235, 0.82)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="mx-auto mb-4 h-[2px] w-10" style={{ background: ACCENT }} />
      <p className="font-display text-2xl font-bold text-[var(--text-primary)]">Message sent.</p>
      <p className="mt-3 text-lg" style={{ color: MARK_COLOR }}>
        We&apos;ll be in touch within 24 hours.
      </p>
    </div>
  );
}

/** Form input with Tier 2 monospace label. */
function FormField({ label, name, type, placeholder, max }: {
  label: string; name: string; type: string; placeholder: string; max: number;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <Tier3Label text={label} />
      <input
        id={name} name={name} type={type} placeholder={placeholder} maxLength={max} required
        className="rounded-lg border border-[var(--border-hairline)] bg-[var(--panel-bg)] px-5 py-4 text-lg text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent)]"
        style={{ color: "var(--text-primary)" }}
      />
    </div>
  );
}

/** Form textarea with Tier 3 monospace label. */
function FormTextarea() {
  return (
    <div className="flex flex-col gap-2.5">
      <Tier3Label text="Message" />
      <textarea
        id="message" name="message" placeholder="Tell us about your project..." maxLength={MAX_MESSAGE_LENGTH} required rows={4}
        className="resize-none rounded-lg border border-[var(--border-hairline)] bg-[var(--panel-bg)] px-5 py-4 text-lg text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent)]"
      />
    </div>
  );
}

/* ─── Typography Primitives (NU Tiers) ─── */

/** Tier 2 — geometric sans, uppercase, wide tracking, centered. */
function Tier2Label({ text }: { text: string }) {
  return (
    <span
      className="block text-center uppercase"
      style={{
        fontFamily: "var(--font-grotesk), system-ui",
        fontWeight: 600,
        fontSize: "22px",
        letterSpacing: "0.08em",
        color: ACCENT,
      }}
    >
      {text}
    </span>
  );
}

/** Tier 3 — monospace, 10-11px, #666. */
function Tier3Label({ text }: { text: string }) {
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

/** Monospace index marker with accent dash. */
function IndexMarker({ index }: { index: string }) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <div className="h-[3px] w-10" style={{ background: ACCENT }} />
      <span className="font-mono text-[20px] font-medium tracking-widest" style={{ color: MARK_COLOR }}>
        {index}
      </span>
    </div>
  );
}

/** Regulatory-style fine print below section content. */
function Fineprint({ text }: { text: string }) {
  return (
    <p className="mt-8 font-mono text-[15px] leading-relaxed tracking-wide" style={{ color: MARK_COLOR }}>
      {text}
    </p>
  );
}

/* ─── Frame Decorations ─── */

/** L-bracket + crosshair registration marks at all four panel corners. */
function RegistrationMarks() {
  return (
    <>
      <Corner position="top-left" />
      <Corner position="top-right" />
      <Corner position="bottom-left" />
      <Corner position="bottom-right" />
    </>
  );
}

/** Single corner: crosshair + L-bracket, 8-12px offset from panel edge. */
function Corner({ position }: { position: string }) {
  const isTop = position.includes("top");
  const isLeft = position.includes("left");

  const crossOffset = -10;
  const bracketLen = 24;
  const bracketOffset = -4;

  const posStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 20,
    pointerEvents: "none",
    ...(isTop ? { top: crossOffset } : { bottom: crossOffset }),
    ...(isLeft ? { left: crossOffset } : { right: crossOffset }),
  };

  return (
    <div style={{ ...posStyle, width: 40, height: 40 }}>
      {/* Crosshair */}
      <div
        className="absolute left-1/2 top-0 h-full -translate-x-1/2"
        style={{ width: 1, background: MARK_COLOR }}
      />
      <div
        className="absolute left-0 top-1/2 w-full -translate-y-1/2"
        style={{ height: 1, background: MARK_COLOR }}
      />
      {/* L-bracket — two lines meeting at the inner corner */}
      <div
        className="absolute"
        style={{
          [isTop ? "bottom" : "top"]: bracketOffset,
          [isLeft ? "right" : "left"]: bracketOffset,
          width: bracketLen,
          height: 1,
          background: MARK_COLOR,
        }}
      />
      <div
        className="absolute"
        style={{
          [isTop ? "bottom" : "top"]: bracketOffset,
          [isLeft ? "right" : "left"]: bracketOffset,
          width: 1,
          height: bracketLen,
          background: MARK_COLOR,
        }}
      />
    </div>
  );
}

/** Dark clip tabs at the mid-point of each panel edge. */
function FrameTabs() {
  return (
    <>
      <div className="pointer-events-none absolute left-1/2 top-0 z-20 h-5 w-20 -translate-x-1/2 rounded-b-lg" style={{ background: FRAME_BG }} />
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-5 w-20 -translate-x-1/2 rounded-t-lg" style={{ background: FRAME_BG }} />
      <div className="pointer-events-none absolute left-0 top-1/2 z-20 h-20 w-5 -translate-y-1/2 rounded-r-lg" style={{ background: FRAME_BG }} />
      <div className="pointer-events-none absolute right-0 top-1/2 z-20 h-20 w-5 -translate-y-1/2 rounded-l-lg" style={{ background: FRAME_BG }} />
    </>
  );
}

/* ─── Utilities ─── */

/** Escape HTML entities to prevent injection. */
function sanitizeInput(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Basic email format validation. */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
