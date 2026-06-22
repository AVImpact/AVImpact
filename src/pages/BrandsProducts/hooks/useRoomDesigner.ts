import { useState, useEffect, RefObject } from "react";
import { industryMappings } from "../../../constants/industryMappings";

export function useRoomDesigner(containerRef: RefObject<HTMLDivElement | null>) {
  const [selectedSpaceId, setSelectedSpaceId] = useState("meeting-room");
  const [selectedIndustry, setSelectedIndustry] = useState("corporate");
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [connections, setConnections] = useState<{ startX: number; startY: number; endX: number; endY: number }[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const clearConnections = () => {
    setHoveredIndustry(null);
    setHoveredCategory(null);
  };

  useEffect(() => {
    const recalculateConnections = () => {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();

      const activeIndIdVal = hoveredIndustry || (hoveredCategory ? null : selectedIndustry);

      if (activeIndIdVal) {
        const industryEl = document.getElementById(`ind-${activeIndIdVal}`);
        if (!industryEl) return;
        const indRect = industryEl.getBoundingClientRect();
        const startY = indRect.top - containerRect.top + indRect.height / 2;
        const startX = indRect.right - containerRect.left;

        const mappedInd = industryMappings.find((ind) => ind.id === activeIndIdVal);
        if (mappedInd) {
          const directConnections = mappedInd.categories
            .map((catId) => {
              const catEl = document.getElementById(`ind-cat-${catId}`);
              if (!catEl) return null;
              const catRect = catEl.getBoundingClientRect();
              const endY = catRect.top - containerRect.top + catRect.height / 2;
              const endX = catRect.left - containerRect.left;
              return { startX, startY, endX, endY };
            })
            .filter(Boolean) as { startX: number; startY: number; endX: number; endY: number }[];

          setConnections(directConnections);
        }
      } else if (hoveredCategory) {
        const catEl = document.getElementById(`ind-cat-${hoveredCategory}`);
        if (!catEl) return;
        const catRect = catEl.getBoundingClientRect();
        const endY = catRect.top - containerRect.top + catRect.height / 2;
        const endX = catRect.left - containerRect.left;

        const linkedIndustries = industryMappings.filter((ind) =>
          ind.categories.includes(hoveredCategory)
        );
        const directConnections = linkedIndustries
          .map((ind) => {
            const indEl = document.getElementById(`ind-${ind.id}`);
            if (!indEl) return null;
            const indRect = indEl.getBoundingClientRect();
            const startY = indRect.top - containerRect.top + indRect.height / 2;
            const startX = indRect.right - containerRect.left;
            return { startX, startY, endX, endY };
          })
          .filter(Boolean) as { startX: number; startY: number; endX: number; endY: number }[];

        setConnections(directConnections);
      } else {
        setConnections([]);
      }
    };

    const timer = setTimeout(recalculateConnections, 100);

    window.addEventListener("resize", recalculateConnections);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", recalculateConnections);
    };
  }, [selectedIndustry, hoveredIndustry, hoveredCategory, containerRef]);

  return {
    selectedSpaceId,
    setSelectedSpaceId,
    selectedIndustry,
    setSelectedIndustry,
    hoveredBrand,
    setHoveredBrand,
    hoveredIndustry,
    setHoveredIndustry,
    hoveredCategory,
    setHoveredCategory,
    connections,
    clearConnections,
    hoveredNode,
    setHoveredNode
  };
}
export default useRoomDesigner;
