/* Blister card — embossed specimen card with bottom-right metadata. */

import {
  MARK_COLOR, EMBOSSED_BG, EMBOSSED_SHADOW, VALUE_CARDS,
} from "@/lib/constants";
import type { MetaEntry } from "@/lib/metadata";
import MetadataBlock from "./semiotic/metadata-block";

const CARD_BORDER = `1px solid ${MARK_COLOR}`;

/**
 * Industrial specimen card with embossed background and bottom-right metadata.
 * Panel-level crosshairs handle the semiotic mark system — cards stay clean.
 * @param card - Card content from VALUE_CARDS.
 * @param meta - Bottom-right corner metadata (INDEX + REV).
 */
export default function BlisterCard({
  card,
  meta,
}: {
  card: (typeof VALUE_CARDS)[number];
  meta: MetaEntry;
}) {
  return (
    <div
      className="relative flex min-h-[300px] flex-col justify-between"
      style={{
        background: EMBOSSED_BG,
        boxShadow: EMBOSSED_SHADOW,
        border: CARD_BORDER,
        padding: 32,
      }}
    >
      <CardContent card={card} />
      <MetadataBlock data={meta} corner="bottom-right" />
    </div>
  );
}

/** Card text content — left-aligned badge, title, description. */
function CardContent({ card }: { card: (typeof VALUE_CARDS)[number] }) {
  return (
    <div className="relative z-10">
      <h3
        className="text-2xl font-bold uppercase tracking-tight sm:text-3xl"
        style={{
          fontFamily: "var(--font-grotesk), system-ui",
          color: "var(--text-primary)",
        }}
      >
        {card.badge}
      </h3>
      <p
        className="mt-2 text-lg font-medium"
        style={{ fontFamily: "var(--font-grotesk), system-ui", color: MARK_COLOR }}
      >
        {card.title}
      </p>
      <div
        className="mt-4 h-[2px] w-14"
        style={{ background: "var(--border-rule)" }}
      />
      <p
        className="mt-4 max-w-[320px] text-base leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {card.description}
      </p>
    </div>
  );
}
