/**
 * Footer.tsx
 * -----------
 * Global site footer rendered on every page.
 *
 * Sections:
 *  1. Full-width CTA banner (with background image overlay)
 *  2. Trust indicators horizontal strip
 *  3. Three-column footer (Brand, Quick Links with hover popovers, Contact)
 *  4. Bottom legal / copyright bar
 *
 * Modal interaction:
 *  All CTA buttons dispatch the `open-av-modal` CustomEvent, which is
 *  handled exclusively by the global <LeadModal> component mounted in
 *  App.tsx. This keeps form/validation logic in a single place.
 *
 * @see src/components/modals/LeadModal.tsx
 */

import React, { useState, useRef } from "react";
import { AVImpactLogo } from "../ui/AVImpactLogo";
import {
  Linkedin, Instagram, Facebook, Phone, Mail, MapPin, Clock,
  ChevronRight, Laptop, Building,
} from "lucide-react";
import { useUI } from "../../contexts/UIContext";
import {
  FOOTER_SOLUTIONS,
  FOOTER_INDUSTRIES,
  FOOTER_TRUST_INDICATORS,
} from "../../constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FooterProps {
  navigate: (path: string) => void;
}



/** Smoothly scrolls to a page section by its element ID. Falls back to navigation. */
function scrollToSection(id: string, navigateFn: (path: string) => void) {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 96;
    const offsetPosition =
      element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  } else {
    navigateFn(`/#${id}`);
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Footer({ navigate }: FooterProps) {
  const { openLeadModal } = useUI();
  // Hover-activated popovers for Solutions / Industries links
  const [activePopover, setActivePopover] = useState<"solutions" | "industries" | null>(null);
  const popoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ---- Popover helpers ---------------------------------------------------

  const handlePopoverOpen = (type: "solutions" | "industries") => {
    if (popoverTimeout.current) clearTimeout(popoverTimeout.current);
    setActivePopover(type);
  };

  const handlePopoverClose = () => {
    popoverTimeout.current = setTimeout(() => setActivePopover(null), 200);
  };

  const keepPopoverOpen = () => {
    if (popoverTimeout.current) clearTimeout(popoverTimeout.current);
  };

  // ---- Link-click handler -----------------------------------------------

  const handleLinkClick = (path: string) => {
    if (path.startsWith("#")) {
      scrollToSection(path.substring(1), navigate);
    } else if (path === "Book Consultation") {
      openLeadModal("quotation");
    } else if (path === "Contact Us") {
      openLeadModal("sales");
    } else {
      navigate(path);
    }
  };

  // ---- Render ------------------------------------------------------------

  return (
    <div className="w-full relative z-20 text-white select-none">

      {/* ================================================================
          1. FULL-WIDTH CTA SECTION
          ================================================================ */}
      <section className="relative w-full bg-[#00061a] border-t border-white/10 py-24 px-6 md:px-16 overflow-hidden">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="/assets/boardroom_hero.webp"
            alt="Boardroom background"
            className="w-full h-full object-cover opacity-20 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#00061a]/30 via-transparent to-[#00061a]/95" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <h2 className="font-sans font-black text-3xl md:text-5xl text-white tracking-tight leading-tight">
            Let's Design The Right AV Solution For Your Environment
          </h2>
          <p className="text-slate-200 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
            Whether you're planning a meeting room, classroom, conference facility, hospitality venue, or communication space, AV Impact can help identify the right technologies based on your requirements and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button
              onClick={() => openLeadModal("quotation")}
              className="px-8 py-4 bg-white text-[#000924] rounded-full font-bold text-sm hover:bg-slate-100 transition-all transform hover:-translate-y-0.5 shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Book Free Consultation
            </button>
            <button
              onClick={() => openLeadModal("sales")}
              className="px-8 py-4 bg-[#2559bd] hover:bg-[#1f4a9e] text-white border border-[#2559bd]/25 rounded-full font-bold text-sm transition-all transform hover:-translate-y-0.5 shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Discuss Your Requirements
            </button>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. TRUST INDICATORS BANNER
          ================================================================ */}
      <section className="w-full bg-[#0b1329] border-t border-b border-white/10 py-8 px-6 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {FOOTER_TRUST_INDICATORS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3.5 group cursor-default transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color} shadow-sm transition-transform duration-500 group-hover:rotate-12`}
                >
                  <Icon size={18} className="transition-all duration-300 group-hover:scale-110" />
                </div>
                <span className="font-bold text-xs md:text-sm text-slate-200 tracking-tight">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================
          3. MAIN 3-COLUMN FOOTER
          ================================================================ */}
      <footer className="w-full bg-[#000924] py-16 px-6 md:px-16 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* --- COLUMN 1: Company Overview -------------------------------- */}
          <div className="space-y-6 flex flex-col justify-between h-full min-h-[160px]">
            <div className="space-y-4">
              <div
                onClick={() => handleLinkClick("/")}
                className="inline-flex items-center cursor-pointer group bg-white px-5 py-3 rounded-2xl"
                role="button"
                aria-label="Go to homepage"
              >
                <AVImpactLogo
                  height={64}
                  className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-semibold italic">
                "Better Connections. Better Decisions. Better Results."
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h5 className="font-extrabold text-[10px] uppercase tracking-widest text-[#7287c1] opacity-90">
                Connect with us
              </h5>
              <div className="flex gap-4 items-center">
                <a
                  href="https://www.linkedin.com/company/av-impact/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0a66c2] hover:scale-110 flex items-center justify-center text-white transition-all shadow-md"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.instagram.com/avimpact2026"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] hover:scale-110 flex items-center justify-center text-white transition-all shadow-md"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.facebook.com/avimpact2026/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1877f2] hover:scale-110 flex items-center justify-center text-white transition-all shadow-md"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://wa.me/919685453058"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#25d366] hover:scale-110 flex items-center justify-center text-white transition-all shadow-md"
                  aria-label="WhatsApp"
                >
                  {/* WhatsApp SVG icon */}
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.057 5.284 5.349 0 11.83 0c3.14 0 6.095 1.223 8.318 3.447C22.37 5.672 23.59 8.627 23.59 11.77c0 6.486-5.297 11.77-11.78 11.77-2.002-.001-3.973-.51-5.719-1.478L0 24zm6.59-4.846c1.64.975 3.24 1.488 4.966 1.49 5.373 0 9.743-4.373 9.745-9.743 0-2.602-1.012-5.05-2.848-6.886C16.619 2.18 14.173 1.168 11.83 1.168c-5.375 0-9.747 4.373-9.749 9.747-.001 1.83.483 3.61 1.398 5.17l-.988 3.606 3.693-.969-.136-.08zm11.705-7.078c-.322-.162-1.902-.938-2.197-1.045-.295-.108-.51-.162-.725.162-.215.324-.834 1.045-1.022 1.261-.188.216-.376.243-.698.082-.323-.162-1.36-.5-2.593-1.6c-.96-.855-1.607-1.912-1.795-2.236-.188-.324-.02-.5-.181-.661-.146-.145-.323-.378-.484-.567-.161-.189-.215-.324-.323-.54-.108-.217-.054-.405-.027-.568.027-.162.215-.513.323-.729.108-.216.161-.351.269-.567.108-.216.054-.405.027-.568-.027-.162-.215-.513-.323-.729-.108-.216-.161-.351-.269-.567-.108-.216-.215-.243-.376-.243-.161 0-.35 0-.538.027-.188.027-.512.108-.779.378-.269.27-.968.946-.968 2.3 0 1.35.98 2.646 1.115 2.835.134.189 1.928 2.946 4.672 4.135.653.283 1.162.451 1.558.577.656.208 1.253.179 1.725.108.526-.079 1.61-.658 1.837-1.296.226-.638.226-1.188.158-1.296-.068-.108-.246-.162-.568-.324z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* --- COLUMN 2: Quick Links with hover drop-panels --------------- */}
          <div className="space-y-6 relative">
            <h4 className="font-black text-sm uppercase tracking-wider text-[#7287c1] border-b border-white/10 pb-2">
              Quick Links
            </h4>
            <div className="relative">
              <ul className="space-y-3 text-xs md:text-sm font-semibold text-slate-300/95">
                <li>
                  <button
                    onClick={() => handleLinkClick("/")}
                    className="hover:text-blue-400 transition-colors nav-underline text-left cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li
                  onMouseEnter={() => handlePopoverOpen("solutions")}
                  onMouseLeave={handlePopoverClose}
                  className="relative group/pop"
                >
                  <button
                    onClick={() => handleLinkClick("/solutions")}
                    className="hover:text-blue-400 transition-colors nav-underline flex items-center gap-1.5 text-left cursor-pointer"
                  >
                    Solutions
                    <ChevronRight size={12} className="transform group-hover/pop:translate-x-0.5 transition-transform" />
                  </button>
                </li>
                <li
                  onMouseEnter={() => handlePopoverOpen("industries")}
                  onMouseLeave={handlePopoverClose}
                  className="relative group/pop"
                >
                  <button
                    onClick={() => handleLinkClick("/industries")}
                    className="hover:text-blue-400 transition-colors nav-underline flex items-center gap-1.5 text-left cursor-pointer"
                  >
                    Industries
                    <ChevronRight size={12} className="transform group-hover/pop:translate-x-0.5 transition-transform" />
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => handleLinkClick("/brands-products")}
                    className="hover:text-blue-400 transition-colors nav-underline text-left cursor-pointer"
                  >
                    Brands & Technologies
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/careers")}
                    className="hover:text-blue-400 transition-colors nav-underline text-left cursor-pointer"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/contact")}
                    className="hover:text-blue-400 transition-colors nav-underline text-left cursor-pointer"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openLeadModal("quotation")}
                    className="hover:text-blue-400 transition-colors nav-underline text-left cursor-pointer"
                  >
                    Book Consultation
                  </button>
                </li>
              </ul>

              {/* Hover Panel: SOLUTIONS */}
              {activePopover === "solutions" && (
                <div
                  onMouseEnter={keepPopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  className="absolute left-[130px] md:left-[150px] top-0 z-40 bg-[#0b1329]/95 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-5 w-[280px] space-y-3 animate-fade-in"
                >
                  <h5 className="font-extrabold text-[10px] uppercase tracking-wider text-[#7287c1] border-b border-white/5 pb-1.5 flex items-center gap-1.5">
                    <Laptop size={12} /> Our Solutions
                  </h5>
                  <div className="grid grid-cols-1 gap-2.5">
                    {FOOTER_SOLUTIONS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.title}
                          onClick={() => { setActivePopover(null); navigate("/solutions"); }}
                          className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-blue-400 transition-all hover:translate-x-1 text-left w-full"
                        >
                          <span className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-blue-400">
                            <Icon size={12} />
                          </span>
                          <span className="font-medium">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Hover Panel: INDUSTRIES */}
              {activePopover === "industries" && (
                <div
                  onMouseEnter={keepPopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  className="absolute left-[130px] md:left-[150px] top-[24px] z-40 bg-[#0b1329]/95 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-5 w-[240px] space-y-3 animate-fade-in"
                >
                  <h5 className="font-extrabold text-[10px] uppercase tracking-wider text-[#7287c1] border-b border-white/5 pb-1.5 flex items-center gap-1.5">
                    <Building size={12} /> Industries Served
                  </h5>
                  <div className="grid grid-cols-1 gap-2.5">
                    {FOOTER_INDUSTRIES.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.title}
                          onClick={() => {
                            setActivePopover(null);
                            navigate(`/industries#${item.title.toLowerCase()}`);
                          }}
                          className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-blue-400 transition-all hover:translate-x-1 text-left w-full"
                        >
                          <span className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-blue-400">
                            <Icon size={12} />
                          </span>
                          <span className="font-medium">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* --- COLUMN 3: Contact Information ------------------------------ */}
          <div className="space-y-6">
            <h4 className="font-black text-sm uppercase tracking-wider text-[#7287c1] border-b border-white/10 pb-2">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-xs md:text-sm text-slate-300 font-medium">
              <li className="flex gap-2.5 items-start">
                <MapPin size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <span>101, Balaji Heights, Geeta Bhawan, Indore M.P, India 452001</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone size={16} className="text-blue-400 shrink-0" />
                <a href="tel:+919685453058" className="hover:text-blue-400 transition-colors">
                  +91 9685453058
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail size={16} className="text-blue-400 shrink-0" />
                <a href="mailto:sales@avimpact.in" className="hover:text-blue-400 transition-colors">
                  sales@avimpact.in
                </a>
              </li>
              <li className="flex gap-2.5 items-start">
                <Clock size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">Business Hours:</span>
                  <span className="block text-xs">Mon–Sat: 10:30 AM – 7:30 PM</span>
                </div>
              </li>
            </ul>

            {/* Quick Action Icon Buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href="tel:+919685453058"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors border border-white/10"
                title="Call us"
                aria-label="Call AV Impact"
              >
                <Phone size={18} />
              </a>
              <a
                href="mailto:sales@avimpact.in"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors border border-white/10"
                title="Email us"
                aria-label="Email AV Impact"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* ================================================================
          4. BOTTOM LEGAL / COPYRIGHT BAR
          ================================================================ */}
      <section className="w-full bg-[#080d1e] py-8 px-6 md:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-semibold text-slate-500">
          <div>© 2026 AV Impact. All Rights Reserved.</div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms &amp; Conditions</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </section>

    </div>
  );
}
