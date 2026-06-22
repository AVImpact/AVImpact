import React, { useState, useRef } from "react";
import { 
  Menu, X, ChevronDown
} from "lucide-react";
import { AVImpactLogo } from "../ui/AVImpactLogo";
import { NAV_INDUSTRIES } from "../../constants";
import { useUI } from "../../contexts/UIContext";

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  activeSection?: string;
}

export function Navbar({ currentPath, navigate, activeSection = "" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"industries" | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { openLeadModal } = useUI();

  const handleMouseEnter = (menu: "industries") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    
    if (path === "/") {
      if (currentPath === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
    } else {
      navigate(path);
    }
  };

  const handleModalOpen = (type: "sales" | "quotation") => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    openLeadModal(type);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/" && (activeSection === "home" || !activeSection);
    }
    return currentPath === path;
  };




  return (
    <header className="fixed top-0 w-full h-24 bg-glass-bg/85 backdrop-blur-md border-b border-glass-border/40 shadow-sm z-50 transition-all duration-300">
      <div className="flex justify-between items-center px-6 md:px-16 max-w-7xl mx-auto h-full relative">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick("/")} 
          className="flex items-center cursor-pointer group"
          role="button"
          aria-label="AV Impact Home"
        >
          <AVImpactLogo 
            height={110} 
            className="h-[105px] md:h-[115px] -my-4 scale-[1.35] origin-left w-auto transition-all duration-300 transform group-hover:scale-[1.4]" 
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 h-full" aria-label="Main Navigation">

          {/* Solutions link */}
          <button
            onClick={() => handleNavClick("/solutions")}
            className={`text-sm font-medium transition-colors nav-underline cursor-pointer py-4 ${
              isActive("/solutions") 
                ? "text-secondary font-semibold nav-underline-active" 
                : "text-on-surface-variant hover:text-secondary"
            }`}
            aria-current={isActive("/solutions") ? "page" : undefined}
          >
            Solutions
          </button>
          
          {/* Industries Dropdown Menu */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => handleMouseEnter("industries")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleNavClick("/industries")}
              className={`text-sm font-medium transition-colors nav-underline cursor-pointer flex items-center gap-1 py-4 ${
                isActive("/industries") 
                  ? "text-secondary font-semibold nav-underline-active" 
                  : "text-on-surface-variant hover:text-secondary"
              }`}
              aria-current={isActive("/industries") ? "page" : undefined}
            >
              Industries
              <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === "industries" ? "rotate-180 text-secondary" : ""}`} />
            </button>

            {/* Mega Dropdown Panel Industries */}
            {activeDropdown === "industries" && (
              <div 
                className="absolute top-24 -left-48 w-[580px] bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xl animate-fade-in z-50 grid grid-cols-2 gap-4"
                onMouseEnter={() => handleMouseEnter("industries")}
                onMouseLeave={handleMouseLeave}
              >
                <div className="col-span-2 pb-2 mb-1 border-b border-slate-100 flex justify-between items-center">
                  <span className="text-[10px] font-black text-secondary uppercase tracking-widest">Sectors & Domains</span>
                  <span className="text-[10px] font-bold text-slate-400">Tailored deployments</span>
                </div>
                {NAV_INDUSTRIES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.path);
                      }}
                      className="flex gap-3.5 p-3 rounded-xl hover:bg-[#f0f5ff]/40 transition-all duration-300 border border-transparent hover:border-[#2559bd]/10 group/item"
                    >
                      <span className="w-10 h-10 shrink-0 rounded-lg bg-[#2559bd]/5 text-[#2559bd] flex items-center justify-center group-hover/item:bg-[#2559bd]/10 group-hover/item:scale-105 transition-all">
                        <Icon size={18} />
                      </span>
                      <div>
                        <h4 className="text-xs font-black text-[#0d1b3e] tracking-tight group-hover/item:text-secondary transition-colors mb-0.5">{item.name}</h4>
                        <p className="text-[11px] text-slate-500 leading-normal">{item.desc}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
          


          <button
            onClick={() => handleNavClick("/brands-products")}
            className={`text-sm font-medium transition-colors nav-underline cursor-pointer py-4 ${
              isActive("/brands-products") 
                ? "text-secondary font-semibold nav-underline-active" 
                : "text-on-surface-variant hover:text-secondary"
            }`}
            aria-current={isActive("/brands-products") ? "page" : undefined}
          >
            Brands & Products
          </button>
          
          <button
            onClick={() => handleNavClick("/contact")}
            className={`text-sm font-medium transition-colors nav-underline cursor-pointer py-4 ${
              isActive("/contact") 
                ? "text-secondary font-semibold nav-underline-active" 
                : "text-on-surface-variant hover:text-secondary"
            }`}
            aria-current={isActive("/contact") ? "page" : undefined}
          >
            Contact Us
          </button>
        </nav>

        {/* Nav Right CTA Operations */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleModalOpen("quotation")}
            className="bg-[#2559bd] text-white hover:bg-[#1f4a9e] px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 hover-scale-sm cursor-pointer"
            aria-label="Request consultation"
          >
            Consultation
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-lg text-primary cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-white border-b border-gray-100 shadow-xl py-6 px-6 flex flex-col gap-4 animate-fade-in z-45" role="dialog" aria-label="Mobile Navigation">

          <button
            onClick={() => handleNavClick("/solutions")}
            className={`text-left text-lg font-medium py-2 border-b border-gray-50 cursor-pointer ${isActive("/solutions") ? "text-secondary font-bold" : "text-on-surface-variant hover:text-secondary"}`}
          >
            Solutions
          </button>
          
          <button
            onClick={() => handleNavClick("/industries")}
            className={`text-left text-lg font-medium py-2 border-b border-gray-50 cursor-pointer ${isActive("/industries") ? "text-secondary font-bold" : "text-on-surface-variant hover:text-secondary"}`}
          >
            Industries
          </button>


          
          <button
            onClick={() => handleNavClick("/brands-products")}
            className={`text-left text-lg font-medium py-2 border-b border-gray-50 cursor-pointer ${isActive("/brands-products") ? "text-secondary font-bold" : "text-on-surface-variant hover:text-secondary"}`}
          >
            Brands & Products
          </button>
          
          <button
            onClick={() => handleNavClick("/contact")}
            className={`text-left text-lg font-medium py-2 text-on-surface-variant hover:text-secondary cursor-pointer ${isActive("/contact") ? "text-secondary font-bold" : ""}`}
          >
            Contact Us
          </button>
          
          <div className="pt-4 border-t border-gray-100">
            <button 
              onClick={() => handleModalOpen("quotation")}
              className="w-full bg-[#2559bd] text-white py-3 rounded-full text-sm font-bold text-center shadow-md hover:bg-[#1f4a9e] transition-colors cursor-pointer"
            >
              Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
