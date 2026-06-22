import { useState } from "react";

export function useHotspots() {
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  return {
    hoveredHotspot,
    setHoveredHotspot
  };
}
export default useHotspots;
