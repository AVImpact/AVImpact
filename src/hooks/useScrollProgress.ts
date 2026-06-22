import { useState, useEffect } from "react";

/**
 * hooks/useScrollProgress.ts
 * --------------------------
 * Tracks vertical scroll progress as a 0-100 value.
 * Eliminates the duplicate scroll listener pattern in
 * Home, Careers, and BrandsProducts pages.
 *
 * @example
 *   const scrollPercent = useScrollProgress();
 *   <div style={{ transform: `scaleX(${scrollPercent / 100})` }} />
 */
export function useScrollProgress(): number {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      // Throttle via rAF - skip if a frame is already pending
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - windowHeight;
        if (docHeight > 0) {
          // Round to 1 decimal to avoid micro-renders from float drift
          const percent = Math.round((window.scrollY / docHeight) * 1000) / 10;
          setScrollPercent(percent);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollPercent;
}

export default useScrollProgress;
