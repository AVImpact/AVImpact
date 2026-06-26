import React, { useState, useEffect } from "react";
import {
  X,
  ShieldCheck,
  Briefcase,
  Layers,
  Activity,
  Tv,
  Volume2,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  LayoutGrid,
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { LeadFormData } from "../types";
import { AnimatedMetric } from "../components/ui/AnimatedMetric";
import { NetworkBackground } from "../components/visualizers/NetworkBackground";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { useUI } from "../contexts/UIContext";
import { useSEO } from "../hooks/useSEO";

interface ProjectItem {
  id: string;
  title: string;
  category: "corporate" | "education" | "broadcast" | "live";
  location: string;
  timeline: string;
  shortDesc: string;
  description: string;
  imageUrl: string;
  challenge: string;
  solution: string;
  hardware: string[];
  metrics: { label: string; value: string }[];
  routing: string[];
}

export default function Projects({ navigate }: { navigate: (path: string) => void }) {
  const [activeFilter, setActiveFilter] = useState<"all" | "corporate" | "education" | "broadcast" | "live">("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const { openLeadModal } = useUI();


  // Centralized SEO via useSEO hook
  useSEO("/projects");

  // Track scroll position for header outline & scroll reveals
  useEffect(() => {
    let scrollRafId: number | null = null;
    const handleScroll = () => {
      if (scrollRafId !== null) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = null;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - windowHeight;
        if (docHeight > 0) {
          const scrolled = (window.pageYOffset / docHeight) * 100;
          setScrollPercent(scrolled);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

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
      window.removeEventListener("scroll", handleScroll);
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
      revealObserver.disconnect();
    };
  }, []);


  const openModal = (requirementType?: string) => {
    const typeLower = requirementType?.toLowerCase() || "";
    const isSales = typeLower.includes("contact") || 
                    typeLower.includes("sales") || 
                    typeLower.includes("specialist") || 
                    typeLower.includes("talk");
    openLeadModal(isSales ? "sales" : "quotation", requirementType);
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

  const projectsData: ProjectItem[] = [
    {
      id: "vertex-hq",
      title: "Enterprise Boardroom Solution",
      category: "corporate",
      location: "Corporate Office Site",
      timeline: "Standard Installation",
      shortDesc: "A zero-latency hybrid collaboration environment built for global executive board meetings.",
      description: "Designed for high-stakes corporate decisions, this boardroom configuration provides flawless interactive video streaming and room-wide beamforming audio integration.",
      imageUrl: "/assets/boardroom_hero.webp",
      challenge: "The previous room suffered from severe acoustic echo, messy wiring networks, and camera blindspots, rendering hybrid meetings highly disruptive.",
      solution: "Installed custom acoustic wall panels, clean in-wall structured racking, and automated beamforming ceiling microphone arrays that steer logic beams towards active speakers.",
      hardware: [
        "Shure MXA920 Ceiling Microphone Array",
        "Q-SYS Core 110f Audio-Visual DSP Engine",
        "Crestron DM-NVX-360 4K Streaming Encoders",
        "Dual 85\" Sony Bravia Professional 4K Screens"
      ],
      metrics: [
        { label: "End-to-End Latency", value: "< 1.2ms" },
        { label: "Acoustic Reflection (RT60)", value: "0.38s" },
        { label: "Camera Tracking Speed", value: "Real-time" }
      ],
      routing: [
        "Shure MXA920 mic capturing speaker voice",
        "Q-SYS DSP processes Echo Cancellation & Automix",
        "Crestron NVX encoder streams uncompressed 4K video",
        "Local PoE Switch routes stream to Microsoft Teams Room"
      ]
    },
    {
      id: "apex-stem",
      title: "University STEM Center - Hybrid Auditorium",
      category: "education",
      location: "Academic Lecture Hall Site",
      timeline: "Standard Installation",
      shortDesc: "Interactive distance learning auditorium featuring automated speaker tracking.",
      description: "A large-scale learning auditorium integrated with automated presenter tracking and zoned speech reinforcement systems.",
      imageUrl: "/assets/project_classroom.webp",
      challenge: "Needed a system that allows remote students to hear local questions clearly without capturing background room rumble.",
      solution: "Designed a multi-zone ceiling microphone configuration that dynamically targets the lecturer's area while isolating student desks using automated logic gates.",
      hardware: [
        "Sennheiser TeamConnect Ceiling 2 Microphones",
        "Extron NAV Pro AV-over-IP Matrix",
        "Panasonic 4K PTZ Camera with Auto-Tracking",
        "Biamp TesiraFORTE DAN Digital Signal Processor"
      ],
      metrics: [
        { label: "Zoned Speech Clarity (STI)", value: "0.82 Excellent" },
        { label: "Presenter Tracking Area", value: "98% coverage" },
        { label: "BYOD Connectivity", value: "Wireless 4K ClickShare" }
      ],
      routing: [
        "Sennheiser TCC2 isolates active lecturer voice",
        "Biamp Tesira DSP calibrates EQ & gates background rumble",
        "Extron NAV encoder routes 4K stream to local laser projector",
        "Panasonic PTZ camera pans dynamically based on audio angle"
      ]
    },
    {
      id: "nexus-hub",
      title: "Broadcast Webcast Studio & Production Layout",
      category: "broadcast",
      location: "Media Production Facility Site",
      timeline: "Standard Installation",
      shortDesc: "Broadcast-grade enterprise streaming studio with advanced virtual backdrops.",
      description: "A specialized studio enabling remote webcasting, keynotes, and high-fidelity video recordings with direct matrix switcher control.",
      imageUrl: "/assets/project_broadcast.webp",
      challenge: "Creating a production environment that allows single-operator control of lighting, multi-camera feeds, and low-latency encoding.",
      solution: "Engineered a centralized Crestron control panel coordinating studio fixtures, live switcher presets, and Dante routing channels for automated sound leveling.",
      hardware: [
        "Blackmagic Design ATEM 2 M/E Production Switcher",
        "Shure TwinPlex Premium Lavalier Microphones",
        "Crestron TS-1070 Touch Panel Control Station",
        "Absen Direct-View 1.5mm LED Video Backdrop Wall"
      ],
      metrics: [
        { label: "Livestream Frame Rate", value: "4K60 HDR" },
        { label: "Dante Audio Channels", value: "64 Channels bidirectional" },
        { label: "One-Touch Scene Presets", value: "10 Scenarios" }
      ],
      routing: [
        "Lavaliers input audio to Dante-enabled preamps",
        "Dante digital channels route directly into ATEM console",
        "Absen LED background updates backdrop live from server",
        "Crestron panel sends macro commands to trigger scene profiles"
      ]
    },
    {
      id: "starlight-lounge",
      title: "Multi-Purpose Immersive Forum Layout",
      category: "live",
      location: "Convention & Event Space Site",
      timeline: "Standard Installation",
      shortDesc: "A digital forum layout with massive LED projections and acoustic mapping.",
      description: "An immersive event hall layout featuring line-array sound systems, customizable architectural lighting, and video walls configured for digital banquets and summits.",
      imageUrl: "/assets/boardroom_hero.webp",
      challenge: "Designing for highly varying audio demands, ranging from soft spoken-word keynotes to high-energy visual showcases in a highly reflective concrete room.",
      solution: "Engineered steerable line arrays with localized audio zones, combined with acoustic ceiling treatments and matrix processing configurations.",
      hardware: [
        "Bose Professional ArenaMatch Utility Speakers",
        "Q-SYS Core Nano Digital Processor System",
        "L-Acoustics Steerable Audio Arrays",
        "Extron XTP Matrix Switcher Architecture"
      ],
      metrics: [
        { label: "Maximum Decibel Output", value: "105 dB clean" },
        { label: "Acoustic Reflection (RT60)", value: "0.45s" },
        { label: "Signal Latency Over IP", value: "< 0.8ms" }
      ],
      routing: [
        "Stage microphones feed audio to L-Acoustics arrays",
        "Q-SYS Core Nano applies dynamic acoustic limits",
        "Extron Switcher routes multi-camera SDI feeds",
        "Visual arrays projection mapping synced via master clock"
      ]
    }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projectsData 
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <div className="bg-background text-on-background min-h-screen font-sans selection:bg-secondary/20 selection:text-secondary antialiased tech-grid-dots relative overflow-x-hidden">
      
      {/* Dynamic Background glowing ambient light orbs */}
      <div className="absolute top-[10%] left-[-5%] w-[800px] h-[800px] glow-radial-soft pointer-events-none rounded-full z-0 opacity-80" />
      <div className="absolute top-[40%] right-[-10%] w-[900px] h-[900px] glow-radial-tertiary pointer-events-none rounded-full z-0 opacity-70" />
      <div className="absolute top-[70%] left-[-8%] w-[850px] h-[850px] glow-radial-vibrant pointer-events-none rounded-full z-0 opacity-60" />

      {/* Network background connectivity lines */}
      <NetworkBackground />

      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-secondary z-[99] w-full origin-left transition-transform duration-300 will-change-transform"
        style={{ transform: `scaleX(${scrollPercent / 100})` }}
      />

      {/* Shared Sticky Navigation */}
      <Navbar currentPath="/projects" navigate={navigate} />

      {/* Main Content */}
      <main className="pt-24">
        
        {/* Hero Banner */}
        <section className="relative bg-[#faf8ff] text-primary py-20 px-6 md:px-16 border-b border-gray-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-primary/5 z-0" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 text-secondary text-xs uppercase font-bold tracking-widest px-4 py-1.5 rounded-full mb-6 reveal">
              <Sparkles size={14} className="text-secondary" />
              Realized Integrations
            </div>
            <h1 className="font-sans font-extrabold text-4xl md:text-6xl text-[#0d1b3e] tracking-tight mb-6 leading-tight reveal">
              Spatial AV Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-[#6c98ff]">
                Portfolio of Success
              </span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed reveal">
              Explore how we design and deploy premium acoustics, pixel-perfect visual arrays, and zero-friction control logic for industry leaders.
            </p>
          </div>
        </section>

        {/* Filter Navigation & Project Cards */}
        <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto relative z-10">
          
          {/* Categories Tab */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
            {(["all", "corporate", "education", "broadcast", "live"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all active-scale-down ${
                  activeFilter === filter
                    ? "bg-primary text-white shadow-md scale-[1.02]"
                    : "bg-surface border border-gray-200 text-on-surface-variant hover:border-secondary hover:text-secondary"
                }`}
              >
                {filter === "all" ? "All Projects" : filter.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 perspective-1000">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                onMouseMove={(e) => handleTiltMove(e, 4)}
                onMouseLeave={handleTiltLeave}
                className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-150 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group glow-border tilt-card-inner reveal"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow">
                    {project.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-secondary" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-secondary" />
                        {project.timeline}
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-xl text-[#0d1b3e] mb-3 group-hover:text-secondary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                      {project.shortDesc}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <div className="flex gap-2">
                      {project.hardware.slice(0, 2).map((hw, idx) => (
                        <span key={idx} className="bg-gray-100 text-[#0d1b3e] text-[11px] font-medium px-2.5 py-1 rounded-md">
                          {hw.split(" ")[0]}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 text-sm font-extrabold text-secondary hover:text-primary transition-colors group-hover:translate-x-1 duration-200 active-scale-down"
                    >
                      View Specs & Blueprints
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* Dynamic Interactive Case Study Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-primary/45 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
            <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-scale-up border border-gray-100">
              
              {/* Header block */}
              <div className="p-6 bg-primary text-white flex justify-between items-center relative">
                <div>
                  <div className="text-xs font-bold tracking-widest text-[#a8c3ff] uppercase mb-1">
                    REPRESENTATIVE INSTALLATION: {selectedProject.category.toUpperCase()}
                  </div>
                  <h2 className="font-sans font-extrabold text-xl md:text-2xl pr-8">
                    {selectedProject.title}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Scrollable specs */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1">
                
                {/* Visual Overview grid */}
                <div className="grid md:grid-cols-2 gap-6 items-start">
                  <div>
                    <h4 className="text-xs font-extrabold text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      The Challenge
                    </h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed bg-red-50/20 border border-red-50/50 p-4 rounded-xl">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-extrabold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                      The Engineering Solution
                    </h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed bg-green-50/20 border border-green-50/50 p-4 rounded-xl">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Key Metrics Row */}
                <div className="bg-[#faf8ff] rounded-2xl p-5 border border-gray-100">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 text-center">
                    Acoustic & Hardware Performance Metrics
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {selectedProject.metrics.map((metric, idx) => (
                      <div key={idx} className="border-r last:border-0 border-gray-200/60 px-2">
                        <div className="text-lg md:text-xl font-extrabold text-[#0d1b3e]">
                          {/* Numerical Progressive Animate counting reveal */}
                          <AnimatedMetric value={metric.value} />
                        </div>
                        <div className="text-[10px] md:text-xs text-on-surface-variant font-medium mt-1">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Integration Routing (Flowchart) */}
                <div>
                  <h4 className="text-xs font-extrabold text-secondary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Activity size={14} className="text-secondary" />
                    System Signal Routing Flow (Representative Solution Layout)
                  </h4>
                  <div className="bg-primary/95 text-white p-5 rounded-2xl font-mono text-xs overflow-x-auto space-y-4 shadow-inner">
                    <div className="flex items-center gap-3 flex-wrap">
                      {selectedProject.routing.map((step, idx) => (
                        <React.Fragment key={idx}>
                          <div className="bg-white/10 hover:bg-white/15 px-3 py-2.5 rounded-lg border border-white/10 max-w-[200px]">
                            <div className="text-secondary font-bold text-[10px] mb-1">STEP {idx + 1}</div>
                            <div className="text-white/95 leading-normal">{step}</div>
                          </div>
                          {idx < selectedProject.routing.length - 1 && (
                            // Animated flow arrows/chevrons with dynamic path pulses
                            <div className="flex items-center justify-center shrink-0 w-8 h-8 relative">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="#6c98ff" strokeWidth="2" strokeLinecap="round" className="data-flow-line" />
                                <path d="M13 6L19 12L13 18" stroke="#6c98ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="3" fill="#2559bd" className="data-flow-pulse" />
                              </svg>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Equipment Rack Inventory */}
                <div>
                  <h4 className="text-xs font-extrabold text-secondary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Layers size={14} className="text-secondary" />
                    Hardware Rack Specifications (Illustrative Deployment Example)
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {selectedProject.hardware.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-on-surface-variant bg-gray-50 border border-gray-150/60 p-3 rounded-xl">
                        <CheckCircle size={15} className="text-green-500 shrink-0" />
                        <span className="font-semibold text-primary">{item.split(" ")[0]}</span>
                        <span>{item.substring(item.indexOf(" "))}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Footer CTA in modal */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                <button
                  onClick={() => { setSelectedProject(null); openModal("General Consultation"); }}
                  className="bg-primary text-white hover:bg-secondary px-6 py-2.5 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all active-scale-down"
                >
                  Consult on Similar Architecture
                </button>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Reusable Premium Footer */}
      <Footer navigate={navigate} />



    </div>
  );
}
