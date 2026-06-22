import React from "react";
import { useHotspots } from "../hooks/useHotspots";

interface HotspotDetail {
  name: string;
  purpose: string;
  brands: string;
  benefit: string;
  top: string;
  left: string;
}

interface TechnologyHotspotsProps {
  hotspots: Record<string, HotspotDetail>;
  assemblyStep: number;
}

export function TechnologyHotspots({ hotspots, assemblyStep }: TechnologyHotspotsProps) {
  const { hoveredHotspot, setHoveredHotspot } = useHotspots();

  return (
    <>
      {Object.entries(hotspots).map(([key, spot]) => {
        const stepMap: Record<string, number> = {
          display: 1,
          camera: 2,
          mic: 3,
          audio: 4,
          control: 5
        };
        const stepNum = stepMap[key] || 1;
        const isAssembled = assemblyStep >= stepNum;

        if (!isAssembled) return null;

        const isHovered = hoveredHotspot === key;

        return (
          <div
            key={key}
            className="absolute z-20 transition-all duration-300"
            style={{ top: spot.top, left: spot.left }}
            onMouseEnter={() => setHoveredHotspot(key)}
            onMouseLeave={() => setHoveredHotspot(null)}
          >
            {/* Pulsing Hotspot Trigger */}
            <button
              type="button"
              className="relative flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
              aria-label={`Inspect ${spot.name}`}
              aria-expanded={isHovered}
              aria-describedby={`tooltip-${key}`}
              onFocus={() => setHoveredHotspot(key)}
              onBlur={() => setHoveredHotspot(null)}
            >
              <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 border-2 border-white shadow-lg transition-transform duration-300 hover:scale-125"></span>
            </button>

            {/* Tooltip Popup Detail Card */}
            {isHovered && (() => {
              const topVal = parseFloat(spot.top);
              const leftVal = parseFloat(spot.left);
              const isTopHalf = topVal < 45;
              const alignLeft = leftVal < 30;
              const alignRight = leftVal > 70;

              const tooltipStyle: React.CSSProperties = {};
              if (isTopHalf) {
                tooltipStyle.top = "20px";
              } else {
                tooltipStyle.bottom = "20px";
              }

              if (alignLeft) {
                tooltipStyle.left = "-8px";
              } else if (alignRight) {
                tooltipStyle.right = "-8px";
              } else {
                tooltipStyle.left = "-104px";
              }

              return (
                <div
                  id={`tooltip-${key}`}
                  role="tooltip"
                  style={tooltipStyle}
                  className="absolute bg-[#020617]/95 border border-slate-800 rounded-xl p-3.5 shadow-2xl backdrop-blur-md w-56 text-left z-30 space-y-2 pointer-events-none animate-fade-in-only"
                >
                  <div
                    className={`absolute w-2.5 h-2.5 rotate-45 bg-[#020617] border border-slate-800`}
                    style={
                      isTopHalf
                        ? alignLeft
                          ? { top: "-5px", left: "12px", borderRight: "none", borderBottom: "none" }
                          : alignRight
                            ? { top: "-5px", right: "12px", left: "auto", borderRight: "none", borderBottom: "none" }
                            : { top: "-5px", left: "108px", borderRight: "none", borderBottom: "none" }
                        : alignLeft
                          ? { bottom: "-5px", left: "12px", borderLeft: "none", borderTop: "none" }
                          : alignRight
                            ? { bottom: "-5px", right: "12px", left: "auto", borderLeft: "none", borderTop: "none" }
                            : { bottom: "-5px", left: "108px", borderLeft: "none", borderTop: "none" }
                    }
                  />
                  <h4 className="font-bold text-[10px] text-white tracking-tight uppercase border-b border-slate-800 pb-1">{spot.name}</h4>
                  <div className="space-y-1 text-[9px] text-slate-300">
                    <div>
                      <span className="font-bold text-[7px] uppercase tracking-wider text-blue-400 block">Purpose</span>
                      <span>{spot.purpose}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[7px] uppercase tracking-wider text-blue-400 block">Recommended Brands</span>
                      <span>{spot.brands}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[7px] uppercase tracking-wider text-blue-400 block">Business Benefit</span>
                      <span>{spot.benefit}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      })}
    </>
  );
}

export default TechnologyHotspots;
