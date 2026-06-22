import React from "react";
import { BrandLogo } from "../../../components/ui/BrandLogo";
import { spacesList, spaceImages } from "../constants/designerRecommendations";

interface SolutionAdvisorProps {
  selectedSpaceId: string;
  setSelectedSpaceId: (id: string) => void;
  openModal: (requirementType?: string) => void;
}

export function SolutionAdvisor({ selectedSpaceId, setSelectedSpaceId, openModal }: SolutionAdvisorProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-16 space-y-10 reveal">
      {/* Tabs selector */}
      <div className="flex flex-wrap gap-2.5 justify-center" role="tablist" aria-label="Select Room Subtype">
        {spacesList.map((space) => {
          const SpaceIcon = space.icon;
          const isSelected = selectedSpaceId === space.id;
          return (
            <button
              key={space.id}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${space.id}`}
              id={`tab-${space.id}`}
              onClick={() => setSelectedSpaceId(space.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border text-xs font-bold transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isSelected
                  ? "bg-[#2559bd] text-white border-transparent shadow-md"
                  : "bg-[#faf8ff] border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <SpaceIcon size={14} />
              <span>{space.title}</span>
            </button>
          );
        })}
      </div>

      {/* Recommendation Advisor Panel */}
      {(() => {
        const currentSpace = spacesList.find(s => s.id === selectedSpaceId) || spacesList[0];
        return (
          <div 
            id={`panel-${currentSpace.id}`}
            role="tabpanel" 
            aria-labelledby={`tab-${currentSpace.id}`}
            className="bg-[#faf8ff]/80 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm backdrop-blur-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            
            {/* Space details (lg: 5) */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-sm border border-slate-150 mb-2 bg-slate-100 group/advisor-img">
                <img 
                  src={spaceImages[currentSpace.id] || spaceImages["meeting-room"]} 
                  alt={currentSpace.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/advisor-img:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </div>
              <h3 className="font-sans font-black text-xl text-primary">{currentSpace.title} Advisor</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">{currentSpace.desc}</p>
              
              {/* Recommended Brands list */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-[10px] font-extrabold uppercase text-[#2559bd] tracking-wider mb-3">Recommended Brands:</h4>
                <div className="flex flex-wrap lg:flex-nowrap gap-1.5">
                  {currentSpace.brands.map((brandName) => (
                    <span 
                      key={brandName}
                      className="bg-white border border-slate-150 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-800 flex items-center justify-center shrink-0 shadow-sm h-8"
                    >
                      <BrandLogo name={brandName} className="h-4 md:h-4.5 w-auto" />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* recommended tech categories (lg: 7) */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <h4 className="text-[10px] font-extrabold uppercase text-[#2559bd] tracking-wider">Recommended Hardware Architecture:</h4>
              <div className="grid grid-cols-1 gap-3.5">
                {currentSpace.categories.map((cat, idx) => (
                  <div key={idx} className="bg-white border border-slate-150 rounded-xl p-4 shadow-sm flex gap-3.5 items-start">
                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-secondary flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]" aria-hidden="true">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="font-bold text-xs text-primary">{cat.name}</h5>
                      <p className="text-[10px] text-on-surface-variant leading-relaxed mt-0.5">{cat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation footer CTA */}
            <div className="lg:col-span-12 border-t border-slate-200/80 pt-6 mt-4 w-full">
              <div className="bg-white border border-slate-150 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left space-y-0.5">
                  <h5 className="font-extrabold text-primary text-xs">Ready to design your {currentSpace.title} layout?</h5>
                  <p className="text-[10px] text-slate-500">Get a direct consultation with certified engineers and get a custom Bill of Materials.</p>
                </div>
                <button
                  type="button"
                  onClick={() => openModal(`Solution Advisor: ${currentSpace.title}`)}
                  className="bg-[#2559bd] hover:bg-[#1f4a9e] text-white px-4.5 py-2.5 rounded-xl font-bold text-xs tracking-wider cursor-pointer whitespace-nowrap active:scale-95 transition-all shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  Request Custom BOM
                </button>
              </div>
            </div>

          </div>
        );
      })()}
    </div>
  );
}
export default SolutionAdvisor;
