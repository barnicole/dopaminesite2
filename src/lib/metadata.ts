/* Dopamine-flavored metadata for semiotic corner blocks across all screens. */

/** Structured key-value pair for a metadata block. */
export type MetaEntry = Record<string, string>;

/* ── Screen 1: Hero ── */

export const HERO_META_TL: MetaEntry = {
  "DPM PROD": "CREATIVE AI",
  "REV": "2.4",
  "INDEX": "DPM-001",
};

export const HERO_META_BR: MetaEntry = {
  "SERIES": "INFRASTRUCTURE",
  "BATCH": "2026.Q1",
  "STATUS": "ACTIVE",
};

/* ── Screen 2: Value Cards (per-card metadata) ── */

export const CARD_META = [
  { "INDEX": "DPM-178", "REV": "1.0" } as MetaEntry,
  { "INDEX": "DPM-291", "REV": "2.3" } as MetaEntry,
  { "INDEX": "DPM-456", "REV": "1.7" } as MetaEntry,
] as const;

/* ── Screen 3: Agency ── */

export const AGENCY_META_TL: MetaEntry = {
  "DPM-AG": "AGENCY",
  "REV": "2.0",
  "CLASS": "COMMERCIAL",
};

export const AGENCY_META_TR: MetaEntry = {
  "SERVICES": "FULL-STACK",
  "INDEX": "DPM-AG-01",
  "PIPELINE": "ACTIVE",
};

/* ── Screen 4: Serotonin ── */

export const SEROTONIN_META_TL: MetaEntry = {
  "SRT-SW": "SOFTWARE",
  "REV": "4.0",
  "CLASS": "ENTERPRISE",
};

export const SEROTONIN_META_TR: MetaEntry = {
  "PLATFORM": "SAAS",
  "INDEX": "SRT-ENT-01",
  "ENCRYPT": "E2E",
};

/* ── Screen 5: Contact ── */

export const CONTACT_META_TL: MetaEntry = {
  "DPM COMMS": "CONTACT",
  "REV": "1.0",
  "CHANNEL": "DIRECT",
};

export const CONTACT_META_BR: MetaEntry = {
  "RESPONSE": "24HR SLA",
  "INDEX": "DPM-CX-01",
  "STATUS": "OPEN",
};
