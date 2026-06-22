import { useEffect } from "react";

/**
 * hooks/useRevealObserver.ts
 * --------------------------
 * Sets up an IntersectionObserver to add the "active" class
 * to any elements matching `.reveal` when they enter the viewport.
 * Eliminates the duplicated observer pattern across all pages.
 *
 * @example
 *   useRevealObserver(); // call at top of component
 *   <div className="reveal"> ... </div>  // will animate in
 */
export function useRevealObserver(threshold = 0.1): void {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold }
    );

    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, [threshold]);
}

export default useRevealObserver;
