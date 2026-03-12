/* Blister card — embossed specimen card with bottom-right metadata. */

import {
  MARK_COLOR, EMBOSSED_BG, EMBOSSED_SHADOW, VALUE_CARDS,
} from "@/lib/constants";

const CARD_BORDER = `1px solid ${MARK_COLOR}`;

/**
 * Industrial specimen card with embossed background and bottom-right metadata.
 * Panel-level crosshairs handle the semiotic mark system — cards stay clean.
 * @param card - Card content from VALUE_CARDS.
 */
export default function BlisterCard({
  card,
}: {
  card: (typeof VALUE_CARDS)[number];
}) {
  return (
    <div
      className="relative flex min-h-[220px] flex-col justify-between p-5 sm:min-h-[300px] sm:p-8"
      style={{
        background: EMBOSSED_BG,
        boxShadow: EMBOSSED_SHADOW,
        border: CARD_BORDER,
      }}
    >
      <CardContent card={card} />
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
        className="mt-1 text-lg font-medium"
        style={{ fontFamily: "var(--font-grotesk), system-ui", color: MARK_COLOR }}
      >
        {card.title}
      </p>
      <div
        className="mt-2 h-[2px] w-14"
        style={{ background: "var(--border-rule)" }}
      />
      <p
        className="mt-2 max-w-[320px] text-base leading-[1.4]"
        style={{ color: "var(--text-secondary)" }}
      >
        {card.description}
      </p>
    </div>
  );
}
