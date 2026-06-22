import { useCallback } from "react";
import React from "react";

/**
 * hooks/useTilt.ts
 * ----------------
 * Shared 3D card tilt effect on mouse hover.
 * Eliminates the handleTiltMove/handleTiltLeave duplication
 * across About, Contact, and Careers pages.
 *
 * @example
 *   const { handleTiltMove, handleTiltLeave } = useTilt();
 *   <div onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave} />
 */
export function useTilt(maxRotation = 6) {
  const handleTiltMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const rotateY = ((x - xc) / xc) * maxRotation;
      const rotateX = -((y - yc) / yc) * maxRotation;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    },
    [maxRotation]
  );

  const handleTiltLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return { handleTiltMove, handleTiltLeave };
}

export default useTilt;
