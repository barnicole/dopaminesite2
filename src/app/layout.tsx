/* Root layout — fonts, metadata, base styles for NU Speculative Corporate. */
import type { Metadata } from "next";
import {
  Bebas_Neue,
  Anton,
  Space_Grotesk,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

/** Tier 1 — condensed display for hero numbers and product names. */
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

/** Tier 1 fallback — secondary condensed display. */
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

/** Tier 2 — geometric sans for headings, labels, and body. */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Tier 3 — monospace for metadata and fine print. */
const spaceMono = Space_Mono({
  variable: "--font-spacemono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: `${SITE_NAME} — Creative AI Infrastructure`,
  description: SITE_DESCRIPTION,
};

/**
 * Root layout wrapping every page with shared fonts and base styles.
 * @param children - Page content rendered inside the layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${anton.variable} ${spaceGrotesk.variable} ${spaceMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
