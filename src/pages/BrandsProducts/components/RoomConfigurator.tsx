import React from "react";
import { Check } from "lucide-react";
import { roomConfigurations } from "../constants/roomConfigurations";

export function RoomConfigurator() {
  return (
    <section className="py-20 md:py-24 bg-[#fbfaff]/60 border-b border-gray-150 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-16 text-center mb-16 reveal">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#2559bd] bg-secondary/5 px-3 py-1 rounded">
          Staging Recommendations
        </span>
        <h2 className="font-sans text-3xl sm:text-4xl font-bold text-primary mt-3 mb-4">
          Practical Room Configurations
        </h2>
        <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto font-medium">
          Explore typical standard staging configurations curated by AV Impact engineers for common business spaces.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {roomConfigurations.map((room, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between reveal relative overflow-hidden group text-left focus-within:ring-2 focus-within:ring-blue-500"
            tabIndex={0}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#2559bd]/30 group-hover:bg-[#2559bd] transition-colors" />
            <div className="relative h-44 overflow-hidden">
              <img
                src={room.image}
                alt={`${room.title} Visual`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 right-3 text-[9px] font-black uppercase text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full tracking-wider border border-white/10">
                {room.capacity}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-sans font-black text-base text-primary mb-2">{room.title}</h3>
                <p className="text-[11px] text-slate-500 mb-4.5 leading-relaxed min-h-[44px]">
                  {room.desc}
                </p>
                <div className="space-y-3 mb-6 border-t border-slate-50 pt-4">
                  {room.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex gap-2.5 items-start text-left">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                        <Check size={10} className="stroke-[3]" />
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-[#0d1b3e]">{feat.name}</h4>
                        <p className="text-[10px] text-slate-400 leading-normal">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-auto text-left">
                <span className="text-[9px] font-black text-[#2559bd] uppercase tracking-wider block mb-1">
                  Staging Recommendation:
                </span>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                  {room.recommendation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RoomConfigurator;
