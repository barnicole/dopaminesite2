/* Ambient horizontal scrolling data ticker — defense-tech telemetry feel */
"use client";

const TICKER_ITEMS = [
  "SYS.ACTIVE",
  "SEROTONIN.API.v2.1",
  "PIPELINE.NOMINAL",
  "LATENCY.12ms",
  "NODES.ONLINE.4/4",
  "BRAND.ISOLATION.ENABLED",
  "GPU.CLUSTER.READY",
  "QUEUE.DEPTH.0",
  "UPTIME.99.97%",
  "ENCRYPTION.AES-256",
  "DOPAMINE.STUDIO.ACTIVE",
  "RENDER.FARM.IDLE",
];

const SEPARATOR = " ── ";

/**
 * Thin horizontal ticker bar that scrolls continuously left-to-right.
 * Sits between the cards and contact section as ambient data telemetry.
 * Pure CSS animation — duplicated content for seamless loop.
 */
export default function DataTicker() {
  const text = TICKER_ITEMS.join(SEPARATOR) + SEPARATOR;

  return (
    <div
      className="overflow-hidden py-3 border-y border-border-line/50"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap ticker-scroll">
        <TickerText text={text} />
        <TickerText text={text} />
      </div>
    </div>
  );
}

/** Single copy of the ticker content — duplicated for seamless loop */
function TickerText({ text }: { text: string }) {
  return (
    <span
      className="text-[8px] tracking-[0.25em] uppercase text-muted-text/25 inline-block"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {text}
    </span>
  );
}
