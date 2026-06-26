import React, { useState, useRef, useEffect } from "react";
import { useSEO } from "../hooks/useSEO";
import {
  Check,
  ArrowDown,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Clock,
  MousePointer,
  Users,
  GraduationCap,
  Video,
  ShieldAlert,
  Sparkles,
  Tv,
  Monitor
} from "lucide-react";
import { WaveBackground } from "../components/visualizers/WaveBackground";
import { SolutionCard, ProcessStep } from "../types";
import { NetworkBackground } from "../components/visualizers/NetworkBackground";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { useUI } from "../contexts/UIContext";

export default function Solutions({ navigate }: { navigate: (path: string) => void }) {
  // Expandable Bento cards state
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  // Solutions Static Data
  const solutions: SolutionCard[] = [
    {
      id: "enterprise",
      title: "Smart Boardrooms",
      description: "Next-generation video-conferencing systems modeled for high-stakes enterprise decisions.",
      imageUrl: "/assets/boardroom_curved.webp",
      specs: [
        "4K Ultra-HD PTZ auto-tracking framing systems",
        "Acoustic beamforming micro-arrays with smart noise filtering",
        "Zero-latency multi-channel digital signal matrix",
        "Dual displays with dedicated content share pathways"
      ]
    },
    {
      id: "education",
      title: "Interactive Classrooms",
      description: "Empowering next-gen educators with intuitive, collaborative digital teaching technology.",
      imageUrl: "/assets/classroom_interactive.webp",
      specs: [
        "Ultra-precise pressure-sensitive interactive displays",
        "BYOD (Bring Your Own Device) wireless screen-casting",
        "Hybrid classroom capture cameras & immersive distance audio",
        "Single-touch environment controllers"
      ]
    },
    {
      id: "venues",
      title: "Residential Solutions",
      description: "Smart home automation, high-end private cinema setups, and distributed audio systems for premium residences.",
      imageUrl: "/assets/residential_cinema.webp",
      specs: [
        "Dolby Atmos surround sound spatial calibration",
        "Concealed architectural speakers & subwoofers",
        "Smart lighting integration & environmental controllers",
        "Private theater projection & laser display panels"
      ]
    },
    {
      id: "events",
      title: "Broadcasting & Events",
      description: "Studio-tier routing, live switching controls, and high-fidelity output for state-of-the-art webcasting.",
      imageUrl: "/assets/broadcast_summit.webp",
      specs: [
        "Multi-camera 4K high-frame switch systems",
        "Low-latency dual live-stream encoders built-in",
        "Independent Dante digital audio monitoring channels",
        "Pre-routed studio-lit dynamic controls"
      ]
    }
  ];

  // Before/After Slider percentage position
  const [sliderPercent, setSliderPercent] = useState(50);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const isDragging = useRef(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Automatic smooth sweep loop for Before/After Slider
  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();

    const currentPercent = sliderPercent;
    const normalized = Math.max(0, Math.min(1, (currentPercent - 10) / 80));
    const cosValue = Math.max(-1, Math.min(1, 2 * normalized - 1));
    const initialAngle = isNaN(cosValue) ? 0 : Math.acos(cosValue);

    const animate = (now: number) => {
      const period = 8000;
      const elapsed = now - startTime;
      const angle = initialAngle + (elapsed / period) * 2 * Math.PI;

      const normalizedCos = (Math.cos(angle) + 1) / 2;
      const percentage = 10 + normalizedCos * 80;

      setSliderPercent(percentage);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Centralized SEO via useSEO hook
  useSEO("/solutions");

  // Scroll reveal observer for elements
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((r) => revealObserver.observe(r));

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  const { openLeadModal } = useUI();

  // Process data for structural steps
  const processSteps: ProcessStep[] = [
    {
      stepNumber: 1,
      title: "Discovery & Workspace Audit",
      description: "We perform high-fidelity acoustic assessments and visual mapping of your real architectural site constraints.",
      details: ["Acoustic echo analysis", "Ambient lux/lighting capture", "Cable-debt path assessments"]
    },
    {
      stepNumber: 2,
      title: "Bespoke System Engineering",
      description: "Our dedicated AV specialists formulate exact spatial blueprints outlining system configurations and zero-latency routing.",
      details: ["EASE acoustic simulation maps", "Dante channel layouts", "CAD visual blueprints"]
    },
    {
      stepNumber: 3,
      title: "Flawless Integration & Tuning",
      description: "Physical installers and certified system engineers calibrate premium display mounts and beamforming DSPs.",
      details: ["Clean rack cabling standards", "Beamforming polar sweep setup", "Single-point control scripting"]
    },
    {
      stepNumber: 4,
      title: "Operational Lifecycle Support",
      description: "Our active enterprise service desk stands updated with active monitoring to prevent and troubleshoot meeting friction.",
      details: ["Continuous remote tracking", "Real-time error notification", "Over-the-air firmware maintenance"]
    }
  ];


  // Drag handlers for Before/After Slider
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPercent(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsUserInteracting(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const globalMouseUp = () => {
      isDragging.current = false;
      setIsUserInteracting(false);
    };
    window.addEventListener("mouseup", globalMouseUp);
    return () => {
      window.removeEventListener("mouseup", globalMouseUp);
    };
  }, []);

  // Modal handlers
  const openModal = (requirementType?: string) => {
    const typeLower = requirementType?.toLowerCase() || "";
    const isSales = typeLower.includes("contact") ||
      typeLower.includes("sales") ||
      typeLower.includes("specialist") ||
      typeLower.includes("talk");
    openLeadModal(isSales ? "sales" : "quotation", requirementType);
  };

  // Custom function to smooth scroll to anchor
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 84;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // 3D Card Hover Tilt logic
  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>, maxRotation = 8) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateY = ((x - xc) / xc) * maxRotation;
    const rotateX = -((y - yc) / yc) * maxRotation;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div className="bg-background text-on-background min-h-screen font-sans selection:bg-secondary/20 selection:text-secondary antialiased tech-grid-dots relative overflow-x-hidden">

      {/* Decorative ambient glowing backdrops behind content sections to make the screen look visually rich */}
      <div className="absolute top-[5%] left-[-10%] w-[800px] h-[800px] glow-radial-soft pointer-events-none rounded-full z-0 opacity-85" />
      <div className="absolute top-[25%] right-[-15%] w-[900px] h-[900px] glow-radial-tertiary pointer-events-none rounded-full z-0 opacity-70" />
      <div className="absolute top-[45%] left-[-20%] w-[850px] h-[850px] glow-radial-vibrant pointer-events-none rounded-full z-0 opacity-60" />
      <div className="absolute top-[65%] right-[-10%] w-[950px] h-[950px] glow-radial-soft pointer-events-none rounded-full z-0 opacity-75" />
      <div className="absolute bottom-[5%] left-[-5%] w-[800px] h-[800px] glow-radial-tertiary pointer-events-none rounded-full z-0 opacity-80" />

      {/* Network Background lines visualizer */}
      <NetworkBackground />

      {/* Shared Sticky Navigation */}
      <Navbar currentPath="/solutions" navigate={navigate} />

      {/* Main Content Space */}
      <main className="pt-24">

        {/* Hero Section Container */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#faf8ff] text-primary py-12">

          {/* High Fidelity Wave Canvas background */}
          <WaveBackground />

          {/* Hero Branding Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">

            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 text-secondary text-xs uppercase font-bold tracking-widest px-4 py-1.5 rounded-full mb-8 hover:bg-secondary/15 transition-colors">
              <ShieldCheck size={14} className="text-secondary" />
              Professional Integration Standards
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl md:text-6.5xl font-black text-primary leading-tight tracking-tight mb-6">
              AV Solutions Designed Around <span className="text-secondary relative">Your Space</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl font-normal leading-relaxed mb-10">
              Elevating enterprise rooms and lecture halls through custom audio-visual engineering. Precision-built connectivity, future-ready setups, and flawlessly hidden integration logic.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
              <button
                onClick={() => openModal("New Install")}
                data-cursor="magnetic"
                className="w-full sm:w-auto bg-primary hover:bg-secondary text-white font-bold text-base px-10 py-4.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 hover-scale-sm"
              >
                Start Your Project
              </button>

              <button
                onClick={() => scrollToSection("solutions")}
                data-cursor="magnetic"
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-primary font-bold text-base px-10 py-4.5 rounded-full border border-primary/20 bg-white/40 backdrop-blur-md hover:bg-white/70 transition-all duration-200 active:scale-95 hover-scale-sm"
              >
                View Solutions
                <ArrowDown size={18} className="text-secondary animate-bounce" />
              </button>
            </div>

          </div>
        </section>

        {/* Solutions Overview Bento Grid */}
        <section id="solutions" className="py-20 md:py-28 px-6 md:px-16 max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2559bd] bg-secondary/5 px-3 py-1 rounded">Our Expertise</span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-primary mt-3 mb-4">Tailored Spatial Engineering</h2>
            <p className="text-on-surface-variant text-base sm:text-lg">Our core disciplines in high-performance spatial connectivity for business and education.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {solutions.map((sol) => {
              const isExpanded = expandedCardId === sol.id;
              return (
                <div
                  id={`card-${sol.id}`}
                  key={sol.id}
                  onClick={() => setExpandedCardId(isExpanded ? null : sol.id)}
                  onMouseMove={(e) => handleTiltMove(e, 4)}
                  onMouseLeave={handleTiltLeave}
                  data-cursor="text"
                  data-cursor-label="View Setup"
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col tilt-card-inner reveal stagger-1"
                >
                  {/* Moving ambient glow light inside bento card */}
                  <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_220px_at_var(--x,50%)_var(--y,50%),rgba(37,89,189,0.05),transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative h-64 overflow-hidden z-10">
                    <img
                      alt={sol.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      src={sol.imageUrl}
                      referrerPolicy="no-referrer"
                    />
                    {/* High contrast gradient overlay at bottom of image for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6">
                      <div className="flex gap-2 items-center text-xs text-white/90 uppercase tracking-wider font-semibold mb-1">
                        <Clock size={11} className="text-[#6c98ff] animate-pulse" />
                        Professional Grade Blueprint
                      </div>
                      <h3 className="text-2.5xl font-black text-white tracking-tight">{sol.title}</h3>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between z-10 relative bg-white/95">
                    <div>
                      <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed mb-4">
                        {sol.description}
                      </p>

                      {/* Specs section (dynamic expand/collapse mimicking standard template) */}
                      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? "max-h-[350px] opacity-100 border-t border-slate-100 pt-4 mt-2" : "max-h-0 opacity-0"}`}>
                        <p className="text-xs uppercase font-extrabold tracking-widest text-secondary mb-3">Custom System Specifications</p>
                        <ul className="space-y-2 mb-4">
                          {sol.specs.map((spec, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-primary font-medium">
                              <Check size={14} className="text-[#10b981] mt-0.5 shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#f3f3fd]">
                      <span className="text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-1">
                        {isExpanded ? "Collapse Specs" : "Explore Integration blueprint"}
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(`Blueprint Info: ${sol.title}`);
                        }}
                        className="bg-primary/5 hover:bg-secondary hover:text-white text-primary text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                      >
                        Request Specs
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Before/After Transformation Slider Section */}
        <section id="transformation" className="py-20 md:py-24 bg-surface-container-low overflow-hidden relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-16 text-center mb-12 reveal">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2559bd] bg-secondary/5 px-3 py-1 rounded">The AV Impact Resolution</span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-primary mt-3 mb-4">Standard Setup vs. Integrated AV Solution</h2>
            <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto">
              Drag the interactive slider to compare a standard room configuration with our fully integrated, high-performance audio-visual solution designed for seamless collaboration.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-6 reveal">
            <div
              id="slider-container"
              ref={sliderRef}
              data-cursor="text"
              data-cursor-label="Slide"
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl group select-none cursor-pointer border border-[#c5c6d1]"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={handleMouseDown}
              onMouseLeave={() => {
                setIsUserInteracting(false);
                isDragging.current = false;
              }}
              onTouchStart={(e) => {
                isDragging.current = true;
                setIsUserInteracting(true);
                if (e.touches && e.touches[0]) {
                  handleMove(e.touches[0].clientX);
                }
              }}
              onTouchEnd={() => {
                setIsUserInteracting(false);
                isDragging.current = false;
              }}
            >

              {/* Underneath: Before Image (Standard Setup) */}
              <div className="absolute inset-0 pointer-events-none">
                <img
                  className="w-full h-full object-cover filter brightness-85"
                  src="/assets/boardroom_before.webp"
                  alt="Standard meeting room setup before audio-visual integration"
                />
              </div>

              {/* Masked Overlay: After Image (Integrated AV Solution) */}
              <div
                className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
                style={{
                  clipPath: `inset(0 ${100 - sliderPercent}% 0 0)`,
                  willChange: "clip-path"
                }}
              >
                <img
                  className="absolute inset-0 w-full h-full object-cover transform-gpu"
                  src="/assets/boardroom_after.webp"
                  alt="Fully integrated audio-visual boardroom solution after installation"
                />
              </div>

              {/* Slider Drag Bar Trigger Handle */}
              <div
                className="absolute inset-y-0 z-20 w-1 bg-white select-none pointer-events-none"
                style={{
                  left: `${sliderPercent}%`,
                  willChange: "left"
                }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center border border-gray-150 transition-transform group-hover:scale-110">
                  <span className="text-secondary font-sans font-bold select-none leading-none flex gap-0.5 items-center justify-center text-sm">
                    {`↔`}
                  </span>
                </div>
              </div>

              {/* Floating Labels */}
              <div className="absolute top-4 right-4 z-30 font-sans text-xs font-bold text-white bg-primary/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 uppercase tracking-widest shadow">
                .....
              </div>

              <div className="absolute top-4 left-4 z-30 font-sans text-xs font-bold text-white bg-secondary/90 px-3 py-1.5 rounded-lg uppercase tracking-widest shadow">
                av impact solution
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-black/75 backdrop-blur-sm text-[10px] text-white/90 px-4 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none">
                <MousePointer size={10} className="text-[#6c98ff]" />
                Drag / Swipe to Compare
              </div>

            </div>
          </div>
        </section>

        {/* Structured Process Section */}
        <section id="process" className="pt-20 pb-4 md:pt-28 md:pb-6 max-w-7xl mx-auto px-6 md:px-16 border-b border-gray-100 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2559bd] bg-secondary/5 px-3 py-1 rounded">Our Methodology</span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-primary mt-3 mb-4">Engineering Integration Lifecycle</h2>
            <p className="text-on-surface-variant text-base sm:text-lg">How our lead engineers execute physical integrations with surgical acoustic and cable precision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((p, idx) => (
              <div
                key={p.stepNumber}
                onMouseMove={(e) => handleTiltMove(e, 5)}
                onMouseLeave={handleTiltLeave}
                data-cursor="text"
                data-cursor-label="Step Info"
                className="relative group flex flex-col justify-between bg-white border border-[#c5c6d1] rounded-xl p-6 hover:shadow-lg transition-transform hover:-translate-y-1 reveal glow-border tilt-card-inner stagger-1"
              >
                {/* Moving ambient glow light inside process card */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_180px_at_var(--x,50%)_var(--y,50%),rgba(37,89,189,0.04),transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="z-10 relative">
                  <div className="relative w-12 h-12 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6">
                    <span className="text-secondary text-lg font-black">{p.stepNumber}</span>
                  </div>
                  <h4 className="font-sans text-lg font-extrabold text-primary mb-3">{p.title}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                <div className="border-t border-[#f3f3fd] pt-4 mt-auto">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-secondary block mb-2">Checklist Outputs</span>
                  <ul className="space-y-1">
                    {p.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-1 text-xs text-primary font-medium">
                        <Check size={12} className="text-[#2559bd]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Reusable Premium Footer */}
      <Footer navigate={navigate} />

    </div>
  );
}
