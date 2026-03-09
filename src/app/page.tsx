/* Single centered page — logo, typewriter intro, molecule cards, contact form */
"use client";

import { useState, type FormEvent } from "react";
import DopamineMolecule from "@/components/DopamineMolecule";
import SerotoninMolecule from "@/components/SerotoninMolecule";
import DnaHelix from "@/components/DnaHelix";
import LatticeCanvas from "@/components/LatticeCanvas";
import StaggeredEntrance from "@/components/StaggeredEntrance";
import Typewriter from "@/components/Typewriter";
import ScanLine from "@/components/ScanLine";
import DataFragments from "@/components/DataFragments";
import HudFrame from "@/components/HudFrame";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ApiStatus from "@/components/ApiStatus";

const INQUIRY_TYPES = [
  { value: "agency", label: "Agency Services" },
  { value: "serotonin", label: "Serotonin API" },
  { value: "other", label: "Other" },
] as const;

const INTRO_TEXT =
  "Dopamine is a full-service creative production studio and technology " +
  "company. We combine traditional craft — cinematography, 3D, motion " +
  "design — with proprietary AI tooling to deliver production-grade " +
  "marketing materials at speed and scale. Two products, one ecosystem.";

/* Entrance timing constants (ms) */
const LOGO_DELAY = 200;
const INTRO_DELAY = 800;
const CARDS_DELAY = 1800;
const CONTACT_DELAY = 2400;
const FOOTER_DELAY = 2800;

/**
 * One-page centered layout with interactive lattice background,
 * staggered entrance animations, and canvas-based molecule particles.
 */
export default function Home() {
  return (
    <div className="relative min-h-screen">
      <LatticeCanvas />
      <ScanLine />
      <HudFrame />
      <DataFragments />
      <ApiStatus />

      <div className="relative z-10 flex flex-col items-center px-6 py-12 md:py-20">
        <div className="w-full max-w-4xl">
          <LogoSection />
          <IntroSection />
          <ProductCards />
          <ContactConnector />
          <ContactSection />
          <FooterLine />
        </div>
      </div>
    </div>
  );
}

/** Centered logo — fades in first */
function LogoSection() {
  return (
    <StaggeredEntrance delay={LOGO_DELAY} direction="none">
      <div className="text-center mb-6">
        <h1
          className="text-2xl md:text-4xl tracking-[0.25em] font-normal"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          DOPAMINE
        </h1>
      </div>
    </StaggeredEntrance>
  );
}

/** Intro paragraph with typewriter reveal */
function IntroSection() {
  return (
    <StaggeredEntrance delay={INTRO_DELAY - 200} direction="none">
      <div className="max-w-xl mx-auto text-center mb-10">
        <p
          className="text-xs md:text-sm leading-relaxed text-muted-text"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <Typewriter text={INTRO_TEXT} delay={INTRO_DELAY} />
        </p>
      </div>
    </StaggeredEntrance>
  );
}

/** Vertical connector line from cards to contact section */
function ContactConnector() {
  return (
    <StaggeredEntrance delay={CONTACT_DELAY - 200} direction="none">
      <div className="contact-connector my-8 md:my-12" />
    </StaggeredEntrance>
  );
}

/** Two molecule cards + DNA helix bridge — slides up with blur-to-sharp */
function ProductCards() {
  return (
    <StaggeredEntrance delay={CARDS_DELAY}>
      <div className="product-table-glitch flex flex-col md:flex-row items-stretch gap-0">
        <DopamineCard />

        {/* Desktop DNA helix bridge */}
        <div className="hidden md:flex items-center justify-center w-14">
          <DnaHelix className="w-full h-full" />
        </div>

        {/* Mobile DNA helix bridge */}
        <div className="md:hidden flex justify-center h-16">
          <DnaHelix className="h-full w-12 rotate-90" />
        </div>

        <SerotoninCard />
      </div>
    </StaggeredEntrance>
  );
}

/** Dopamine agency card — blue accent, glitch text, click opens modal */
function DopamineCard() {
  return (
    <Dialog>
      <DialogTrigger className="group relative flex-1 cursor-pointer text-left">
        <div className="relative glow-blue accent-blue card-emboss border border-border-line p-8 md:p-10 flex flex-col h-full bg-bg">
          <div className="absolute inset-0 bg-gradient-to-b from-dopamine-blue/5 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <h2
              className="glitch-text text-xl md:text-2xl tracking-[0.15em] font-normal mb-1"
              data-text="DOPAMINE"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              DOPAMINE
            </h2>
            <p
              className="text-[10px] tracking-[0.3em] text-muted-text uppercase mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              The Agency
            </p>

            <div className="flex items-center justify-center py-2">
              <DopamineMolecule className="w-full max-w-[240px] h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <p
              className="mt-6 text-[10px] tracking-[0.2em] uppercase text-muted-text group-hover:text-fg transition-colors duration-500"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Click to learn more about our process →
            </p>
          </div>
        </div>
      </DialogTrigger>

      <DopamineModal />
    </Dialog>
  );
}

/** Dopamine modal content — extracted for readability */
function DopamineModal() {
  return (
    <DialogContent
      className="sm:max-w-lg bg-bg border-border-line text-fg"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <DialogHeader>
        <DialogTitle
          className="text-xl tracking-[0.15em] text-fg"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          DOPAMINE — THE AGENCY
        </DialogTitle>
        <DialogDescription className="text-muted-text text-xs leading-relaxed pt-4 space-y-4">
          <span className="block">
            Brand and product agency with rapid prototyping and delivery of
            finals. Generative AI used as a toolkit alongside traditional
            software — After Effects, Cinema 4D, DaVinci Resolve, Photoshop.
            Human creative direction drives every deliverable.
          </span>
          <span className="block">
            Revenue model: Monthly retainers, project-based contracts, and
            campaign packages. Current clients include HYTE and iBUYPOWER.
          </span>
          <span className="block">
            Traditional agencies charge $500K+ annually for campaign
            production. We deliver comparable or better output at a fraction
            of that cost, with same-day turnaround and infinite iteration
            cycles.
          </span>
        </DialogDescription>
      </DialogHeader>
      <div className="pt-4 border-t border-border-line mt-2">
        <a
          href="#contact"
          className="text-[10px] tracking-[0.2em] uppercase text-fg border-b border-fg pb-1 hover:text-muted-text hover:border-muted-text transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Start a project →
        </a>
      </div>
    </DialogContent>
  );
}

/** Serotonin software card — orange accent, glitch text, click opens modal */
function SerotoninCard() {
  return (
    <Dialog>
      <DialogTrigger className="group relative flex-1 cursor-pointer text-left">
        <div className="relative glow-orange accent-orange card-emboss border border-border-line p-8 md:p-10 flex flex-col h-full bg-bg">
          <div className="absolute inset-0 bg-gradient-to-b from-serotonin-orange/5 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <h2
              className="glitch-text text-xl md:text-2xl tracking-[0.15em] font-normal mb-1"
              data-text="SEROTONIN"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              SEROTONIN
            </h2>
            <p
              className="text-[10px] tracking-[0.3em] text-muted-text uppercase mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              The Software
            </p>

            <div className="flex items-center justify-center py-2">
              <SerotoninMolecule className="w-full max-w-[240px] h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <p
              className="mt-6 text-[10px] tracking-[0.2em] uppercase text-muted-text group-hover:text-fg transition-colors duration-500"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Click to learn more about our software →
            </p>
          </div>
        </div>
      </DialogTrigger>

      <SerotoninModal />
    </Dialog>
  );
}

/** Serotonin modal content — extracted for readability */
function SerotoninModal() {
  return (
    <DialogContent
      className="sm:max-w-lg bg-bg border-border-line text-fg"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <DialogHeader>
        <DialogTitle
          className="text-xl tracking-[0.15em] text-fg"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          SEROTONIN — THE SOFTWARE
        </DialogTitle>
        <DialogDescription className="text-muted-text text-xs leading-relaxed pt-4 space-y-4">
          <span className="block">
            A licensable generative AI pipeline sold as API seats. Companies
            upload brand kits, product photography, and NDA-protected campaign
            briefs into a siloed environment. Nothing leaks into shared
            databases or third-party training sets.
          </span>
          <span className="block">
            Per-client isolation ensures your data stays yours. Upload a PDF
            brand guide, logos, color palettes, and product photography. The
            system extracts rules and enforces consistency across all generated
            assets.
          </span>
          <span className="block">
            Enterprise tiers include custom model training on your specific
            products. Marketing teams integrate via API — generate assets
            programmatically, batch process campaigns, export for any platform.
          </span>
        </DialogDescription>
      </DialogHeader>
      <div className="pt-4 border-t border-border-line mt-2">
        <a
          href="#contact"
          className="text-[10px] tracking-[0.2em] uppercase text-fg border-b border-fg pb-1 hover:text-muted-text hover:border-muted-text transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Request API access →
        </a>
      </div>
    </DialogContent>
  );
}

/** Contact form with heading glow and staggered entrance */
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

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
          className="text-sm tracking-[0.2em] uppercase text-muted-text"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Message received. We will be in touch.
        </p>
      </div>
    );
  }

  return (
    <StaggeredEntrance delay={CONTACT_DELAY}>
      <div id="contact" className="max-w-lg mx-auto">
        <h2
          className="contact-heading-glow text-xl md:text-2xl tracking-[0.15em] font-normal text-center mb-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          CONTACT
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p
              className="text-xs text-muted-text border border-border-line p-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Please fill in all required fields.
            </p>
          )}

          <div className="flex gap-3 flex-wrap">
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
                  className="block border border-border-line px-4 py-2 text-[10px] tracking-[0.15em] uppercase text-muted-text peer-checked:border-fg peer-checked:text-fg transition-colors"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {type.label}
                </span>
              </label>
            ))}
          </div>

          <FormField label="Name *" name="name" type="text" required />
          <FormField label="Company" name="company" type="text" />
          <FormField label="Email *" name="email" type="email" required />

          <div>
            <label
              className="block text-[10px] tracking-[0.2em] uppercase text-muted-text mb-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Message
            </label>
            <textarea
              name="message"
              rows={3}
              className="w-full bg-transparent border border-border-line px-4 py-3 text-xs text-fg placeholder:text-muted-text/30 resize-none transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>

          <button
            type="submit"
            className="hud-submit w-full border border-fg py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-fg hover:text-bg transition-colors duration-200"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Transmit
          </button>
        </form>
      </div>
    </StaggeredEntrance>
  );
}

/** Reusable form input with consistent styling */
function FormField({
  label,
  name,
  type,
  required = false,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        className="block text-[10px] tracking-[0.2em] uppercase text-muted-text mb-2"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-transparent border border-border-line px-4 py-3 text-xs text-fg placeholder:text-muted-text/30 transition-colors"
        style={{ fontFamily: "var(--font-body)" }}
      />
    </div>
  );
}

/** Minimal copyright line */
function FooterLine() {
  return (
    <StaggeredEntrance delay={FOOTER_DELAY}>
      <div className="mt-16 pt-6 border-t border-border-line text-center">
        <p
          className="text-[9px] tracking-[0.3em] uppercase text-muted-text"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          © 2026 Dopamine, LLC — hello@makedopamine.com
        </p>
      </div>
    </StaggeredEntrance>
  );
}
