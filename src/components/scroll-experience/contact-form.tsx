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
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const loadedAt = useRef(Date.now());

  if (status === "sent") return <SuccessMessage />;

  return (
    <div
      className="overflow-hidden"
      style={{
        padding: "48px 40px",
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
  status: "idle" | "sending" | "error";
  setStatus: (s: "idle" | "sending" | "sent" | "error") => void;
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

    if (!name || !email || !message) return;
    if (!isValidEmail(email)) { setStatus("error"); return; }

    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    form.reset();
  }

  return (
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
  );
}

/** Form input with Tier 3 monospace label. */
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
        We&apos;ll be in touch within 24 hours.
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
