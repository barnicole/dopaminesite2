/* Dopamine molecule wireframe — catechol ring + ethylamine chain as SVG */
"use client";

/**
 * Renders the dopamine (3,4-dihydroxyphenethylamine) molecular structure
 * as a clean wireframe SVG. Atoms at vertices, bonds as lines.
 * Matches the classic skeletal formula: benzene ring, two -OH groups, side chain ending in -NH₂.
 */
export default function DopamineMolecule({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Dopamine molecular structure"
    >
      {/* Benzene ring — hexagonal arrangement */}
      {/* C1 (top-right) */}
      {/* C2 (right) */}
      {/* C3 (bottom-right) */}
      {/* C4 (bottom-left) */}
      {/* C5 (left) */}
      {/* C6 (top-left) */}

      {/* Ring bonds */}
      <line x1="160" y1="60" x2="200" y2="83" stroke="white" strokeWidth="2" />
      <line x1="200" y1="83" x2="200" y2="130" stroke="white" strokeWidth="2" />
      <line x1="200" y1="130" x2="160" y2="153" stroke="white" strokeWidth="2" />
      <line x1="160" y1="153" x2="120" y2="130" stroke="white" strokeWidth="2" />
      <line x1="120" y1="130" x2="120" y2="83" stroke="white" strokeWidth="2" />
      <line x1="120" y1="83" x2="160" y2="60" stroke="white" strokeWidth="2" />

      {/* Double bonds (inner) — C1=C2, C3=C4, C5=C6 */}
      <line x1="163" y1="68" x2="195" y2="87" stroke="white" strokeWidth="1.2" opacity="0.5" />
      <line x1="195" y1="126" x2="163" y2="145" stroke="white" strokeWidth="1.2" opacity="0.5" />
      <line x1="125" y1="126" x2="125" y2="87" stroke="white" strokeWidth="1.2" opacity="0.5" />

      {/* OH group on C5 (left, upper) — meta position */}
      <line x1="120" y1="83" x2="80" y2="60" stroke="white" strokeWidth="2" />
      <text x="52" y="56" fill="white" fontSize="18" fontFamily="var(--font-mono)">HO</text>

      {/* OH group on C4 (bottom-left) — para position */}
      <line x1="120" y1="130" x2="80" y2="153" stroke="white" strokeWidth="2" />
      <text x="52" y="160" fill="white" fontSize="18" fontFamily="var(--font-mono)">HO</text>

      {/* Ethylamine side chain from C1 (top-right) */}
      {/* C1 → Cα */}
      <line x1="200" y1="83" x2="240" y2="60" stroke="white" strokeWidth="2" />
      {/* Cα → Cβ */}
      <line x1="240" y1="60" x2="280" y2="83" stroke="white" strokeWidth="2" />
      {/* Cβ → NH₂ */}
      <line x1="280" y1="83" x2="280" y2="110" stroke="white" strokeWidth="2" />

      {/* NH₂ label */}
      <text x="268" y="130" fill="white" fontSize="18" fontFamily="var(--font-mono)">NH</text>
      <text x="296" y="136" fill="white" fontSize="12" fontFamily="var(--font-mono)">2</text>
    </svg>
  );
}
