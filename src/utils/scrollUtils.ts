import { RefObject } from "react";

/**
 * utils/scrollUtils.ts
 * --------------------
 * Shared scroll utility helpers used across multiple pages.
 */

/**
 * Smoothly scrolls to a referenced element, accounting for the sticky navbar height.
 */
export function scrollToElement(
  ref: RefObject<HTMLDivElement | null>,
  headerOffset = 96
): void {
  if (ref.current) {
    const offsetPosition =
      ref.current.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
}

export default scrollToElement;
