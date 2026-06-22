import React from "react";
import { BrandLogo } from "../../../components/ui/BrandLogo";
import { brandDetails } from "../constants/brandMappings";

export function BrandExplorer() {
  const categories = [
    {
      title: "Video Conferencing",
      brands: ["Logitech", "Poly", "Yealink", "Cisco"],
      delay: "0ms"
    },
    {
      title: "Displays & Projectors",
      brands: ["Samsung", "LG", "Epson", "Panasonic"],
      delay: "100ms"
    },
    {
      title: "Audio Solutions",
      brands: ["Bose", "JBL", "Shure"],
      delay: "200ms"
    },
    {
      title: "Control & Collaboration",
      brands: ["Kramer", "Crestron", "Extron"],
      delay: "300ms"
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-[#fbfaff]/35 border-b border-gray-150 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-16 text-center mb-16 reveal">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#2559bd] bg-secondary/5 px-3 py-1 rounded">
          Ecosystem
        </span>
        <h2 className="font-sans text-3xl sm:text-4xl font-bold text-primary mt-3 mb-4">
          Supported Brands & Hardware Partners
        </h2>
        <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto font-medium">
          We configure and install commercial grade systems utilizing components from the world's most trusted manufacturers.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <div
            key={cat.title}
            className="p-2 reveal text-left"
            style={{ transitionDelay: cat.delay }}
          >
            <h3 className="font-sans font-black text-sm text-primary uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
              {cat.title}
            </h3>
            <div className="flex flex-wrap items-center justify-start gap-5 py-4">
              {cat.brands.map((brand, bIdx) => {
                const info = brandDetails[brand] || {
                  category: cat.title,
                  bestFor: "Meeting Spaces",
                  recommendedUse: "Video Integration"
                };
                return (
                  <div
                    key={brand}
                    className="brand-wave-node relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-50 border border-slate-150 flex items-center justify-center hover:scale-110 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 shadow-sm cursor-pointer group shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
                    tabIndex={0}
                    aria-haspopup="true"
                    aria-label={`Brand information for ${brand}`}
                    style={{ animationDelay: `${-(bIdx * 0.35)}s` }}
                  >
                    <div className="w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-95 max-w-[65%] max-h-[50%] pointer-events-none">
                      <BrandLogo name={brand} className="max-w-full max-h-full w-auto h-auto" />
                    </div>

                    {/* Premium Floating Tooltip on Hover/Focus */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-slate-950/95 text-white p-3.5 rounded-xl shadow-2xl border border-slate-800/80 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 focus-within:opacity-100 focus-within:translate-y-0 transition-all duration-300 z-50 text-left backdrop-blur-md">
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-950/95" aria-hidden="true" />
                      <h4 className="font-bold text-[10px] uppercase tracking-wider border-b border-slate-800 pb-1 mb-1.5 text-white">
                        {brand}
                      </h4>
                      <div className="space-y-1.5 text-[8px] text-slate-300">
                        <div>
                          <span className="font-bold text-blue-400 uppercase tracking-widest block text-[7px] mb-0.5">Category</span>
                          <span className="text-white">{info.category}</span>
                        </div>
                        <div>
                          <span className="font-bold text-blue-400 uppercase tracking-widest block text-[7px] mb-0.5">Best For</span>
                          <span className="text-white leading-normal block">{info.bestFor}</span>
                        </div>
                        <div>
                          <span className="font-bold text-blue-400 uppercase tracking-widest block text-[7px] mb-0.5">Recommended Use</span>
                          <span className="text-white leading-normal block">{info.recommendedUse}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrandExplorer;
