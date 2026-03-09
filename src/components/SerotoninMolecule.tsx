/* Serotonin molecule wireframe — indole ring + hydroxyl + ethylamine as SVG */
"use client";

/**
 * Renders the serotonin (5-hydroxytryptamine) molecular structure
 * as a clean wireframe SVG. Indole ring system (benzene fused with pyrrole),
 * -OH at position 5, and ethylamine side chain at position 3.
 */
export default function SerotoninMolecule({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Serotonin molecular structure"
    >
      {/* === Benzene ring (left, 6-membered) === */}
      <line x1="80" y1="80" x2="120" y2="60" stroke="white" strokeWidth="2" />
      <line x1="120" y1="60" x2="160" y2="80" stroke="white" strokeWidth="2" />
      <line x1="160" y1="80" x2="160" y2="126" stroke="white" strokeWidth="2" />
      <line x1="160" y1="126" x2="120" y2="146" stroke="white" strokeWidth="2" />
      <line x1="120" y1="146" x2="80" y2="126" stroke="white" strokeWidth="2" />
      <line x1="80" y1="126" x2="80" y2="80" stroke="white" strokeWidth="2" />

      {/* Double bonds (inner) */}
      <line x1="123" y1="67" x2="155" y2="83" stroke="white" strokeWidth="1.2" opacity="0.5" />
      <line x1="155" y1="122" x2="123" y2="139" stroke="white" strokeWidth="1.2" opacity="0.5" />
      <line x1="85" y1="122" x2="85" y2="84" stroke="white" strokeWidth="1.2" opacity="0.5" />

      {/* === Pyrrole ring (right, 5-membered, fused) === */}
      {/* Shares C3a-C7a bond with benzene (the 160,80 → 160,126 edge) */}
      <line x1="160" y1="80" x2="206" y2="70" stroke="white" strokeWidth="2" />
      <line x1="206" y1="70" x2="224" y2="103" stroke="white" strokeWidth="2" />
      <line x1="224" y1="103" x2="194" y2="130" stroke="white" strokeWidth="2" />
      <line x1="194" y1="130" x2="160" y2="126" stroke="white" strokeWidth="2" />

      {/* Pyrrole double bond (inner) */}
      <line x1="165" y1="85" x2="203" y2="76" stroke="white" strokeWidth="1.2" opacity="0.5" />

      {/* NH inside pyrrole ring */}
      <text x="214" y="118" fill="white" fontSize="16" fontFamily="var(--font-mono)">N</text>
      <text x="214" y="138" fill="white" fontSize="16" fontFamily="var(--font-mono)">H</text>

      {/* === OH group at position 5 (on benzene, left side) === */}
      <line x1="80" y1="80" x2="44" y2="60" stroke="white" strokeWidth="2" />
      <text x="22" y="56" fill="white" fontSize="18" fontFamily="var(--font-mono)">HO</text>

      {/* === Ethylamine side chain from C3 of pyrrole === */}
      {/* C3 is approximately at (206, 70) */}
      {/* C3 → Cα */}
      <line x1="206" y1="70" x2="240" y2="42" stroke="white" strokeWidth="2" />
      {/* Cα → Cβ */}
      <line x1="240" y1="42" x2="278" y2="56" stroke="white" strokeWidth="2" />
      {/* Cβ → NH₂ */}
      <line x1="278" y1="56" x2="290" y2="30" stroke="white" strokeWidth="2" />

      {/* NH₂ label */}
      <text x="280" y="24" fill="white" fontSize="18" fontFamily="var(--font-mono)">NH</text>
      <text x="308" y="30" fill="white" fontSize="12" fontFamily="var(--font-mono)">2</text>
    </svg>
  );
}
