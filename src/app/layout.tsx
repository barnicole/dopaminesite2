/* Root layout — minimal shell, no nav, no footer, just the page */
import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Dopamine",
  description:
    "Creative production studio and licensable AI pipeline. Part studio, part lab, all output.",
  openGraph: {
    title: "Dopamine",
    description:
      "Creative production studio and licensable AI pipeline.",
    type: "website",
    url: "https://makedopamine.com",
  },
};

/**
 * Minimal root layout — pure black canvas, no chrome.
 * The page itself handles all structure.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable, geistMono.variable)}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
