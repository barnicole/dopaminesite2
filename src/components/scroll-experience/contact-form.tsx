/* Contact form — honeypot + timing anti-bot measures, frosted card. */
"use client";

import { useRef, useState, type FormEvent } from "react";
import { ACCENT, MARK_COLOR, EMBOSSED_BG, EMBOSSED_SHADOW } from "@/lib/constants";
import { Tier3Label } from "./typography";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;
const SUBMIT_COOLDOWN_MS = 5000;

/** Form card with honeypot + timing anti-bot measures. */
export default function ContactFormCard() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "missing">("idle");
  const loadedAt = useRef(Date.now());

  if (status === "sent") return <SuccessMessage />;

  return (
    <div
      className="overflow-hidden"
      style={{
        padding: "32px 32px",
        background: EMBOSSED_BG,
        boxShadow: EMBOSSED_SHADOW,
        border: `1px solid ${MARK_COLOR}`,
      }}
    >
      <FormBody status={status} setStatus={setStatus} loadedAt={loadedAt} />
    </div>
  );
}

/** Inner form element with fields and submit. */
function FormBody({
  status,
  setStatus,
  loadedAt,
}: {
  status: "idle" | "sending" | "error" | "missing";
  setStatus: (s: "idle" | "sending" | "sent" | "error" | "missing") => void;
  loadedAt: React.RefObject<number>;
}) {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("website")) return;
    if (Date.now() - (loadedAt.current ?? 0) < SUBMIT_COOLDOWN_MS) return;

    const name = sanitize(str(data, "name"), MAX_NAME_LENGTH);
    const email = sanitize(str(data, "email"), MAX_EMAIL_LENGTH);
    const message = sanitize(str(data, "message"), MAX_MESSAGE_LENGTH);

    if (!name || !email || !message) { setStatus("missing"); return; }
    if (!isValidEmail(email)) { setStatus("error"); return; }

    const subject = `Inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:hello@makedopamine.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus("sending");
    window.location.href = mailto;
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Left column: Name, Email */}
        <div className="flex flex-col gap-4">
          <FormField label="Name" name="name" type="text" placeholder="Your name" max={MAX_NAME_LENGTH} />
          <FormField label="Email" name="email" type="email" placeholder="you@company.com" max={MAX_EMAIL_LENGTH} />
        </div>
        {/* Right column: Message */}
        <FormTextarea />
      </div>
      <div aria-live="polite" aria-atomic="true">
        {status === "missing" && (
          <p className="font-mono text-base" role="alert" style={{ color: ACCENT }}>
            Please fill in all fields.
          </p>
        )}
        {status === "error" && (
          <p className="font-mono text-base" role="alert" style={{ color: ACCENT }}>
            Please enter a valid email address.
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg px-8 py-3 font-sans text-base font-normal uppercase tracking-[0.2em] text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent-active)] transition-colors disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

/** Form input with Tier 3 monospace label. */
function FormField({ label, name, type, placeholder, max }: {
  label: string; name: string; type: string; placeholder: string; max: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Tier3Label text={label} />
      <input
        id={name} name={name} type={type} placeholder={placeholder} maxLength={max} required
        className="rounded-lg border border-[var(--border-hairline)] bg-[var(--panel-bg)] px-4 py-3 text-base text-[var(--text-primary)] transition-colors focus:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        style={{ color: "var(--text-primary)" }}
      />
    </div>
  );
}

/** Form textarea with Tier 3 monospace label. */
function FormTextarea() {
  return (
    <div className="flex flex-col gap-1.5 h-full">
      <Tier3Label text="Message" />
      <textarea
        id="message" name="message" placeholder="Tell us about your project..." maxLength={MAX_MESSAGE_LENGTH} required
        className="flex-1 resize-none rounded-lg border border-[var(--border-hairline)] bg-[var(--panel-bg)] px-4 py-3 text-base text-[var(--text-primary)] transition-colors focus:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      />
    </div>
  );
}

/** Post-submit success state. */
function SuccessMessage() {
  return (
    <div
      className="overflow-hidden p-12 text-center"
      style={{
        background: EMBOSSED_BG,
        boxShadow: EMBOSSED_SHADOW,
        border: `1px solid ${MARK_COLOR}`,
      }}
    >
      <div className="mx-auto mb-4 h-[2px] w-10" style={{ background: ACCENT }} />
      <p className="font-display text-2xl font-bold text-[var(--text-primary)]">Message sent.</p>
      <p className="mt-3 text-lg" style={{ color: MARK_COLOR }}>
        We&apos;ll be in touch within 1 business day.
      </p>
    </div>
  );
}

/* ── Utilities ── */

/** Extract trimmed string from FormData. */
function str(data: FormData, key: string): string {
  return ((data.get(key) as string) || "").trim();
}

/** Truncate and escape HTML entities. */
function sanitize(raw: string, max: number): string {
  return raw
    .slice(0, max)
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
