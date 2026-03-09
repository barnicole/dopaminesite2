/* Single centered page — logo, intro, molecule table, contact form */
"use client";

import { useState, type FormEvent } from "react";
import DopamineMolecule from "@/components/DopamineMolecule";
import SerotoninMolecule from "@/components/SerotoninMolecule";

const INQUIRY_TYPES = [
  { value: "agency", label: "Agency Services" },
  { value: "serotonin", label: "Serotonin API" },
  { value: "other", label: "Other" },
] as const;

/**
 * One-page centered layout: logo → paragraph → product table → contact form.
 * Palantir/Anduril-inspired: black, monospaced, brutally minimal.
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-20 md:py-32">
      <div className="w-full max-w-4xl">
        <LogoSection />
        <Divider />
        <IntroSection />
        <Divider />
        <ProductTable />
        <Divider />
        <ContactSection />
        <FooterLine />
      </div>
    </div>
  );
}

/** Centered logo placeholder — user will provide the actual asset */
function LogoSection() {
  return (
    <div className="text-center mb-16">
      <h1
        className="text-4xl md:text-6xl tracking-[0.2em] font-normal"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        DOPAMINE
      </h1>
    </div>
  );
}

/** One-paragraph explanation of what Dopamine does */
function IntroSection() {
  return (
    <div className="max-w-2xl mx-auto text-center mb-0">
      <p
        className="text-sm md:text-base leading-relaxed text-muted"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Dopamine is a full-service creative production studio and technology
        company. We combine traditional craft — cinematography, 3D, motion
        design — with proprietary AI tooling to deliver production-grade
        marketing materials at speed and scale. Two products, one ecosystem.
      </p>
    </div>
  );
}

/** Thin horizontal rule between sections */
function Divider() {
  return <hr className="border-border my-16 md:my-20" />;
}

/** Two-column product table: Dopamine (agency) | Serotonin (software) */
function ProductTable() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
      {/* Dopamine column */}
      <div className="border-b md:border-b-0 md:border-r border-border p-8 md:p-12 flex flex-col">
        <h2
          className="text-2xl md:text-3xl tracking-[0.15em] font-normal mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          DOPAMINE
        </h2>
        <p
          className="text-xs tracking-[0.3em] text-muted uppercase mb-8"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          The Agency
        </p>

        {/* Molecule wireframe */}
        <div className="flex-1 flex items-center justify-center py-4">
          <DopamineMolecule className="w-full max-w-[280px] h-auto" />
        </div>

        {/* Description */}
        <p
          className="text-xs leading-relaxed text-muted mt-8"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Brand and product agency with rapid prototyping and delivery of
          finals. Generative AI used as a toolkit alongside traditional
          software. Human creative direction drives every deliverable.
        </p>

        {/* CTA */}
        <a
          href="#contact"
          className="inline-block mt-6 text-xs tracking-[0.2em] uppercase border-b border-fg pb-1 hover:text-muted hover:border-muted transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Learn More About Our Process →
        </a>
      </div>

      {/* Serotonin column */}
      <div className="p-8 md:p-12 flex flex-col">
        <h2
          className="text-2xl md:text-3xl tracking-[0.15em] font-normal mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          SEROTONIN
        </h2>
        <p
          className="text-xs tracking-[0.3em] text-muted uppercase mb-8"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          The Software
        </p>

        {/* Molecule wireframe */}
        <div className="flex-1 flex items-center justify-center py-4">
          <SerotoninMolecule className="w-full max-w-[280px] h-auto" />
        </div>

        {/* Description */}
        <p
          className="text-xs leading-relaxed text-muted mt-8"
          style={{ fontFamily: "var(--font-body)" }}
        >
          A licensable generative AI pipeline sold as API seats. Upload brand
          kits, product photography, and NDA-protected campaign briefs into a
          siloed environment. Your data stays yours.
        </p>

        {/* CTA */}
        <a
          href="#contact"
          className="inline-block mt-6 text-xs tracking-[0.2em] uppercase border-b border-fg pb-1 hover:text-muted hover:border-muted transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Learn More About Our Software →
        </a>
      </div>
    </div>
  );
}

/** Contact form — minimal, centered, OCR-typed */
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  /** Client-side form handler — swap for API endpoint in production */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;

    if (!name?.trim() || !email?.trim()) {
      setError(true);
      return;
    }

    setSubmitted(true);
    setError(false);
  };

  if (submitted) {
    return (
      <div id="contact" className="text-center py-16">
        <p
          className="text-sm tracking-[0.2em] uppercase text-muted"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Message received. We will be in touch.
        </p>
      </div>
    );
  }

  return (
    <div id="contact" className="max-w-lg mx-auto">
      <h2
        className="text-2xl md:text-3xl tracking-[0.15em] font-normal text-center mb-12"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        CONTACT
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <p
            className="text-xs text-muted border border-border p-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ⚠ Please fill in all required fields.
          </p>
        )}

        {/* Inquiry type */}
        <div className="flex gap-4 flex-wrap">
          {INQUIRY_TYPES.map((type) => (
            <label key={type.value} className="cursor-pointer">
              <input
                type="radio"
                name="inquiry"
                value={type.value}
                defaultChecked={type.value === "agency"}
                className="sr-only peer"
              />
              <span
                className="block border border-border px-4 py-2 text-xs tracking-[0.15em] uppercase text-muted peer-checked:border-fg peer-checked:text-fg transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {type.label}
              </span>
            </label>
          ))}
        </div>

        <FormField label="Name *" name="name" type="text" placeholder="—" required />
        <FormField label="Company" name="company" type="text" placeholder="—" />
        <FormField label="Email *" name="email" type="email" placeholder="—" required />

        {/* Message */}
        <div>
          <label
            className="block text-xs tracking-[0.2em] uppercase text-muted mb-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="—"
            className="w-full bg-transparent border border-border px-4 py-3 text-sm text-fg placeholder:text-muted/30 resize-none transition-colors"
            style={{ fontFamily: "var(--font-body)" }}
          />
        </div>

        <button
          type="submit"
          className="w-full border border-fg py-3 text-xs tracking-[0.3em] uppercase hover:bg-fg hover:text-bg transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

/** Reusable form input field with consistent styling */
function FormField({
  label,
  name,
  type,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        className="block text-xs tracking-[0.2em] uppercase text-muted mb-2"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border border-border px-4 py-3 text-sm text-fg placeholder:text-muted/30 transition-colors"
        style={{ fontFamily: "var(--font-body)" }}
      />
    </div>
  );
}

/** Minimal copyright line */
function FooterLine() {
  return (
    <div className="mt-20 pt-8 border-t border-border text-center">
      <p
        className="text-[10px] tracking-[0.3em] uppercase text-muted"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        © 2026 Dopamine, LLC — hello@makedopamine.com
      </p>
    </div>
  );
}
