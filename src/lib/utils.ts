/* Utility for merging Tailwind class names — required by shadcn/ui */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with clsx and deduplicates Tailwind conflicts via twMerge.
 * @param inputs - Any number of class values (strings, arrays, conditionals)
 * @returns Merged, deduplicated class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
