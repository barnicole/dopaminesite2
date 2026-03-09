/* Character-by-character typewriter effect for OCR-styled text */
"use client";

import { useEffect, useState } from "react";

const CHAR_INTERVAL_MS = 18;

interface TypewriterProps {
  text: string;
  /** Delay before typing starts */
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reveals text one character at a time with a blinking cursor.
 * Optimized for the OCR font — feels like a terminal printing output.
 * Cursor disappears after typing completes.
 */
export default function Typewriter({
  text,
  delay = 0,
  className = "",
  style,
}: TypewriterProps) {
  const [charCount, setCharCount] = useState(0);
  const [started, setStarted] = useState(false);
  const isComplete = charCount >= text.length;

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started || isComplete) return;
    const timer = setInterval(() => {
      setCharCount((prev) => Math.min(prev + 1, text.length));
    }, CHAR_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [started, isComplete, text.length]);

  return (
    <span className={className} style={style}>
      {text.slice(0, charCount)}
      {started && !isComplete && (
        <span className="inline-block w-[1ch] animate-pulse">▌</span>
      )}
    </span>
  );
}
