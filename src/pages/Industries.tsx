import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight, ShieldCheck, Building2,
  GraduationCap, Landmark, HeartPulse, Shield, Home as HomeIcon, ShoppingBag,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { NetworkBackground } from "../components/visualizers/NetworkBackground";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { useUI } from "../contexts/UIContext";
import { useSEO } from "../hooks/useSEO";

// Representative Solution Layouts with Hotspots and Realistic Environment Images
const representativeLayouts = [
  {
    id: "layout-boardroom",
    title: "Boardroom Layout",
    label: "Representative Solution Layout",
    image: "/assets/boardroom_hero.webp",
    challenge: "Hybrid meetings and poor collaboration.",
    solution: "Integrated conferencing, displays and audio.",
    outcome: "More productive meetings and better communication.",
    hotspots: [
      { id: "display", name: "Display", desc: "Dual 75–98\" 4K Professional Displays for high-detail video feeds and presentations.", x: "50%", y: "28%", purpose: "Room-wide remote rendering", benefit: "Enables natural hybrid sightlines", relatedTech: "Dual 75\"-98\" 4K Displays" },
      { id: "camera", name: "Camera", desc: "Smart-framing PTZ camera positioned at eye level for natural face-to-face angles.", x: "50%", y: "40%", purpose: "Speaker auto-framing", benefit: "Ensures remote attendees see everyone", relatedTech: "AI 4K PTZ Camera" },
      { id: "audio", name: "Audio", desc: "Ceiling beamforming mic array and speakers calibrated for even voice distribution.", x: "50%", y: "12%", purpose: "Equal voice pick-up", benefit: "Eliminates room echo & strain", relatedTech: "Ceiling Beamforming Mic Array" },
      { id: "control", name: "Control System", desc: "Tabletop touch panel for one-tap video conferencing and environmental controls.", x: "55%", y: "72%", purpose: "One-tap control of layout/source", benefit: "Reduces meeting setup friction to zero", relatedTech: "Tabletop Touch Panel & Central Engine" },
      { id: "collab", name: "Collaboration Tools", desc: "Wireless presentation hub enabling secure, instant cable-free content sharing.", x: "35%", y: "62%", purpose: "Secure cable-free casting", benefit: "Lets presenters cast screen in seconds", relatedTech: "Wireless Collaboration Hub" }
    ]
  },
  {
    id: "layout-classroom",
    title: "Interactive Classroom Layout",
    label: "Representative Solution Layout",
    image: "/assets/classroom_interactive.webp",
    challenge: "Low student engagement in hybrid classrooms.",
    solution: "Interactive flat panels and auto-tracking cameras.",
    outcome: "Highly active learning and automated lesson capture.",
    hotspots: [
      { id: "display", name: "Display", desc: "86\" 4K Interactive Flat Panel replacing whiteboards for active collaboration.", x: "45%", y: "30%", purpose: "Interactive teaching flat panel", benefit: "Replaces static boards for active learning", relatedTech: "86\" 4K Interactive Display" },
      { id: "camera", name: "Camera", desc: "Auto-tracking PTZ camera mounted at the rear to capture the teacher.", x: "80%", y: "55%", purpose: "Instructor lecture tracking", benefit: "Automates distance lecture recording", relatedTech: "Tracking PTZ Camera" },
      { id: "audio", name: "Audio", desc: "Voice lift system with wireless neckband mic and wall-mounted speakers.", x: "15%", y: "25%", purpose: "Voice-lift amplification", benefit: "Keeps lecturer audible in all rows", relatedTech: "Neckband Mic & DSP Speakers" },
      { id: "control", name: "Control System", desc: "Wall-mounted button controller for simple room power and volume adjustments.", x: "28%", y: "45%", purpose: "One-touch room power & audio", benefit: "Saves teachers from complex setup menus", relatedTech: "Wall-mount Keypad Controller" },
      { id: "collab", name: "Collaboration Tools", desc: "Wireless student screen sharing receiver enabling interactive study from desks.", x: "35%", y: "68%", purpose: "Student workspace casting", benefit: "Lets classrooms share screens concurrently", relatedTech: "Multi-user Screen Gateway" }
    ]
  },
  {
    id: "layout-auditorium",
    title: "Auditorium Layout",
    label: "Representative Solution Layout",
    image: "/assets/broadcast_summit.webp",
    challenge: "Uneven audio coverage and poor sightlines in large venues.",
    solution: "Steerable column line arrays and high-brightness projection.",
    outcome: "Powerful audio reinforcement and clear visibility for all attendees.",
    hotspots: [
      { id: "display", name: "Display", desc: "Direct view LED video wall or high-brightness laser projector for long-distance viewing.", x: "50%", y: "32%", purpose: "Large-scale presentation canvas", benefit: "Guarantees visual clarity from rear rows", relatedTech: "Laser Projection / LED Video Wall" },
      { id: "camera", name: "Camera", desc: "Multi-camera PTZ setup to record and track speakers across the stage.", x: "32%", y: "65%", purpose: "Multi-angle presenter tracking", benefit: "Records broadcast-grade presentation feeds", relatedTech: "Multi-PTZ Camera Matrix" },
      { id: "audio", name: "Audio", desc: "Steerable column line array speakers delivering consistent sound level from front to back.", x: "12%", y: "45%", purpose: "Direct acoustic column delivery", benefit: "Maintains clear sound levels rear to front", relatedTech: "Steerable Column Line Arrays" },
      { id: "control", name: "Control System", desc: "Centralized AV control processor managing audio routing and sources.", x: "85%", y: "78%", purpose: "Centralized signal routing", benefit: "Enables master operator setup control", relatedTech: "Digital DSP & Signal Matrix" },
      { id: "collab", name: "Collaboration Tools", desc: "Hardware encoding system for recording and high-definition live streaming.", x: "50%", y: "85%", purpose: "Studio-tier encoder webcast", benefit: "Enables instant live stream output", relatedTech: "Hardware Streaming Encoder" }
    ]
  },
  {
    id: "layout-government",
    title: "Conference Room Layout",
    label: "Representative Solution Layout",
    image: "/assets/project_boardroom.webp",
    challenge: "Complex council chamber audio and security risks.",
    solution: "Secure discussion microphones and centralized controls.",
    outcome: "Clear speech intelligibility and protected data streams.",
    hotspots: [
      { id: "display", name: "Display", desc: "Commercial displays for video conferencing feeds and encrypted content sharing.", x: "50%", y: "32%", purpose: "Secure feed visual rendering", benefit: "Displays classified content safely", relatedTech: "Commercial Grade Monitor" },
      { id: "camera", name: "Camera", desc: "Wide-angle room camera supporting secure government video conferencing feeds.", x: "50%", y: "45%", purpose: "Full chamber room capture", benefit: "Ensures comprehensive official records", relatedTech: "Chamber Wide PTZ System" },
      { id: "audio", name: "Audio", desc: "Table-mounted gooseneck discussion microphones with individual delegate controls.", x: "50%", y: "68%", purpose: "Individual delegate mic speech", benefit: "Prioritizes speaker audio priority control", relatedTech: "Gooseneck Discussion Mics" },
      { id: "control", name: "Control System", desc: "Central control system with hardware keypad interface for secure input selection.", x: "25%", y: "78%", purpose: "Isolated inputs selection", benefit: "Secures system from cyber-interference", relatedTech: "Secure Hardware Keypad Panel" },
      { id: "collab", name: "Collaboration Tools", desc: "Secure hardware videoconferencing codec with physical network isolation.", x: "65%", y: "78%", purpose: "Physically isolated codec", benefit: "Ensures tamper-proof video calls", relatedTech: "Government Grade Encrypted Codec" }
    ]
  }
];

// Industry list details
const industriesList = [
  {
    id: "corporate",
    title: "Corporate",
    tagline: "Conferencing and smart meeting room setups.",
    icon: Building2,
    challenge: "Hybrid meetings and poor collaboration.",
    solution: "Integrated conferencing, displays and audio.",
    outcome: "More productive meetings and better communication.",
    imageUrl: "/assets/boardroom_curved.webp",
    techIndicators: [
      { name: "Display", icon: "tv" },
      { name: "Camera", icon: "videocam" },
      { name: "Audio", icon: "mic" }
    ]
  },
  {
    id: "education",
    title: "Education",
    tagline: "Interactive classroom displays and lecture capture.",
    icon: GraduationCap,
    challenge: "Low student engagement in hybrid classrooms.",
    solution: "Interactive flat panels and auto-tracking cameras.",
    outcome: "Highly active learning and automated lesson capture.",
    imageUrl: "/assets/classroom_interactive.webp",
    techIndicators: [
      { name: "Display", icon: "tv" },
      { name: "Camera", icon: "videocam" },
      { name: "Audio", icon: "mic" },
      { name: "Cast", icon: "cast" }
    ]
  },
  {
    id: "government",
    title: "Government",
    tagline: "Secure briefing systems and public address rooms.",
    icon: Landmark,
    challenge: "Complex council chamber audio and security risks.",
    solution: "Secure discussion microphones and centralized controls.",
    outcome: "Clear speech intelligibility and protected data streams.",
    imageUrl: "/assets/project_boardroom.webp",
    techIndicators: [
      { name: "Display", icon: "tv" },
      { name: "Audio", icon: "mic" },
      { name: "Security", icon: "lock" }
    ]
  },
  {
    id: "healthcare",
    title: "Healthcare",
    tagline: "Telemedicine consultation carts and digital info screens.",
    icon: HeartPulse,
    challenge: "Slow response for remote specialist consultations.",
    solution: "Mobile telemedicine carts with high-definition cameras.",
    outcome: "Faster expert diagnosis and remote care.",
    imageUrl: "/assets/boardroom_after.webp",
    techIndicators: [
      { name: "Display", icon: "tv" },
      { name: "Camera", icon: "videocam" },
      { name: "Speaker", icon: "volume_up" }
    ]
  },
  {
    id: "defense",
    title: "Defense",
    tagline: "Secure meeting environments and coordination center systems.",
    icon: Shield,
    challenge: "Unauthorized signal access and communication leakage.",
    solution: "Physically isolated matrix switchers and secure endpoints.",
    outcome: "Zero-leakage secure operations and reliable tracking.",
    imageUrl: "/assets/project_broadcast.webp",
    techIndicators: [
      { name: "Display", icon: "tv" },
      { name: "Router", icon: "router" },
      { name: "Lock", icon: "lock" }
    ]
  },
  {
    id: "retail",
    title: "Retail",
    tagline: "High-impact promotional displays and zone audio.",
    icon: ShoppingBag,
    challenge: "Low customer dwell time and inconsistent branding.",
    solution: "High-impact video walls and multi-zone commercial audio.",
    outcome: "Increased foot traffic and dynamic content delivery.",
    imageUrl: "/assets/project_lobby.webp",
    techIndicators: [
      { name: "Display", icon: "tv" },
      { name: "Audio", icon: "volume_up" },
      { name: "Signage", icon: "ad_units" }
    ]
  },
  {
    id: "residential",
    title: "Residential",
    tagline: "Home cinema sound and unified smart room control.",
    icon: HomeIcon,
    challenge: "Clunky home automation controls and clutter.",
    solution: "Unified smart control for audio, visual, and lighting.",
    outcome: "One-touch control and streamlined luxury home cinema.",
    imageUrl: "/assets/residential_cinema.webp",
    techIndicators: [
      { name: "Theater", icon: "movie" },
      { name: "Audio", icon: "speaker" },
      { name: "Control", icon: "settings_remote" }
    ]
  }
];


export default function Industries({ navigate }: { navigate: (path: string) => void }) {
  const [scrollPercent, setScrollPercent] = useState(0);
  const { openLeadModal } = useUI();

  // Active selector state
  const [selectedIndustry, setSelectedIndustry] = useState<string>(() => {
    const hash = window.location.hash.slice(1).toLowerCase();
    const valid = ["corporate", "education", "government", "healthcare", "defense", "retail", "residential"];
    return valid.includes(hash) ? hash : "corporate";
  });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Carousel state
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  useEffect(() => {
    setActiveHotspot(null);
  }, [currentProjectIndex]);

  // Auto-play carousel logic with hover pause and click stop
  useEffect(() => {
    if (!autoPlayEnabled || isPaused) return;
    const timer = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % representativeLayouts.length);
    }, 5000); // auto-slide every 5 seconds
    return () => clearInterval(timer);
  }, [autoPlayEnabled, isPaused, currentProjectIndex]);

  // Centralized SEO via useSEO hook
  useSEO("/industries");

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

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const hash = window.location.hash.slice(1).toLowerCase();
        const valid = ["corporate", "education", "government", "healthcare", "defense", "retail", "residential"];
        if (valid.includes(hash)) {
          setSelectedIndustry(hash);
          const selectorSection = document.getElementById("choose-industry-section");
          if (selectorSection) {
            setTimeout(() => {
              const headerOffset = 96;
              const elementPosition = selectorSection.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              });
            }, 100);
          }
        }
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
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

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % representativeLayouts.length);
    setAutoPlayEnabled(false);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + representativeLayouts.length) % representativeLayouts.length);
    setAutoPlayEnabled(false);
  };

  return (
    <div className="bg-background text-on-background min-h-screen font-sans selection:bg-secondary/20 selection:text-secondary antialiased tech-grid-dots relative overflow-x-hidden">

      {/* Decorative ambient glowing backdrops (Reduced opacity to keep aesthetics clean) */}
      <div className="absolute top-[5%] left-[-10%] w-[800px] h-[800px] glow-radial-soft pointer-events-none rounded-full z-0 opacity-20" />
      <div className="absolute top-[30%] right-[-15%] w-[900px] h-[900px] glow-radial-tertiary pointer-events-none rounded-full z-0 opacity-15" />
      <div className="absolute top-[60%] left-[-20%] w-[850px] h-[850px] glow-radial-vibrant pointer-events-none rounded-full z-0 opacity-15" />
      <div className="absolute bottom-[5%] right-[-5%] w-[800px] h-[800px] glow-radial-soft pointer-events-none rounded-full z-0 opacity-20" />

      {/* Network Background lines */}
      <NetworkBackground />

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-secondary z-[99] w-full origin-left transition-transform duration-300 will-change-transform"
        style={{ transform: `scaleX(${scrollPercent / 100})` }}
      />

      {/* Shared Sticky Navigation */}
      <Navbar currentPath="/industries" navigate={navigate} />

      {/* Main Content */}
      <main className="pt-24">

        {/* Immersive Hero Section */}
        <section className="relative bg-[#faf8ff] text-primary py-24 md:py-32 px-6 md:px-16 border-b border-gray-150 overflow-hidden select-none">
          {/* Subtle grid background & Ambient lights */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

          {/* Animated technology ecosystem graphic nodes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden lg:block opacity-[0.06]">
            <svg className="w-full h-full" viewBox="0 0 1000 500">
              {/* Pulsing connections with data flow animations */}
              <path
                d="M 220 130 L 480 90 L 760 140 L 800 360 L 160 340 Z M 220 130 L 520 245 M 480 90 L 520 245 M 760 140 L 520 245 M 800 360 L 520 245 M 160 340 L 520 245"
                stroke="#2559bd"
                strokeWidth="1.5"
                strokeDasharray="6,6"
                fill="none"
              >
                <animate attributeName="stroke-dashoffset" values="100;0" dur="15s" repeatCount="indefinite" />
              </path>

              {/* Node 1: Modern Boardroom */}
              <circle cx="220" cy="130" r="14" fill="#2559bd" opacity="0.15">
                <animate attributeName="r" values="6;16;6" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="220" cy="130" r="6" fill="#2559bd" />
              <text x="220" y="110" textAnchor="middle" fill="#000924" fontSize="10" fontWeight="bold">Modern Boardroom</text>

              {/* Node 2: Interactive Classroom */}
              <circle cx="480" cy="90" r="14" fill="#2559bd" opacity="0.15">
                <animate attributeName="r" values="6;16;6" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="480" cy="90" r="6" fill="#2559bd" />
              <text x="480" y="70" textAnchor="middle" fill="#000924" fontSize="10" fontWeight="bold">Interactive Classroom</text>

              {/* Node 3: Conference Facility */}
              <circle cx="760" cy="140" r="14" fill="#2559bd" opacity="0.15">
                <animate attributeName="r" values="6;16;6" dur="3.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="760" cy="140" r="6" fill="#2559bd" />
              <text x="760" y="120" textAnchor="middle" fill="#000924" fontSize="10" fontWeight="bold">Conference Facility</text>

              {/* Node 4: Telemedicine Room */}
              <circle cx="160" cy="340" r="14" fill="#2559bd" opacity="0.15">
                <animate attributeName="r" values="6;16;6" dur="2.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="160" cy="340" r="6" fill="#2559bd" />
              <text x="160" y="320" textAnchor="middle" fill="#000924" fontSize="10" fontWeight="bold">Telemedicine Room</text>

              {/* Node 5: Defense Command Center (Hiding Defense category from hero visuals) */}
              <g style={{ display: "none" }}>
                <circle cx="450" cy="410" r="14" fill="#2559bd" opacity="0.15" />
                <circle cx="450" cy="410" r="6" fill="#2559bd" />
                <text x="450" y="390" textAnchor="middle" fill="#000924" fontSize="10" fontWeight="bold">Defense Command Center</text>
              </g>

              {/* Node 6: Conference Hall */}
              <circle cx="800" cy="360" r="14" fill="#2559bd" opacity="0.15">
                <animate attributeName="r" values="6;16;6" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="800" cy="360" r="6" fill="#2559bd" />
              <text x="800" y="340" textAnchor="middle" fill="#000924" fontSize="10" fontWeight="bold">Conference Hall</text>

              {/* Node 7: Premium Home Entertainment Space */}
              <circle cx="520" cy="245" r="14" fill="#2559bd" opacity="0.15">
                <animate attributeName="r" values="6;16;6" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="520" cy="245" r="6" fill="#2559bd" />
              <text x="520" y="225" textAnchor="middle" fill="#000924" fontSize="10" fontWeight="bold">Premium Home Entertainment Space</text>
            </svg>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 text-secondary text-xs uppercase font-bold tracking-widest px-4 py-1.5 rounded-full mb-2 reveal">
              <ShieldCheck size={14} className="text-secondary" />
              Requirement-Based AV Integration
            </div>
            <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-7xl text-primary tracking-tight leading-none reveal">
              We Understand Your Environment
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed font-medium reveal">
              AV Impact identifies the right technologies based on your requirements and budget. We build reliable, tailored communication spaces for corporate, education, government, healthcare, retail, and residential environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center reveal">
              <button
                onClick={() => openModal("Contact Us")}
                className="px-8 py-4 bg-[#2559bd] hover:bg-[#1f4a9e] text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Discuss Your Requirements
              </button>
              <button
                onClick={() => openModal("Book Consultation")}
                className="px-8 py-4 bg-white text-[#2559bd] border border-[#2559bd]/25 rounded-full font-bold text-sm hover:bg-slate-50 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </section>

        {/* Section 2 — Interactive Industry Selector */}
        <section id="choose-industry-section" className="py-20 md:py-24 bg-white border-b border-gray-150 relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-16 text-center mb-16 reveal">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2559bd] bg-secondary/5 px-3 py-1 rounded">Interactive Selector</span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-primary mt-3 mb-4">Choose Your Industry</h2>
            <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto">
              Hover over any industry card below to explore its challenges, tailored AV solutions, and key benefits.
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-16 relative">
            {/* Tech Connection Line Overlay behind cards */}
            <div className="absolute top-[220px] left-12 right-12 h-1 pointer-events-none hidden xl:block z-0 overflow-hidden opacity-60">
              <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="var(--color-secondary)" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="10 15" />
                <path d="M 0 0.5 L 2000 0.5" stroke="var(--color-secondary)" strokeWidth="2" strokeDasharray="8 6" className="data-flow-line" />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 reveal relative z-10">
              {industriesList.map((ind) => {
                const IndIcon = ind.icon;
                const isSelected = selectedIndustry === ind.id;
                return (
                  <div
                    key={ind.id}
                    id={`industry-card-${ind.id}`}
                    onMouseMove={(e) => handleTiltMove(e, 3)}
                    onMouseLeave={handleTiltLeave}
                    data-cursor="text"
                    data-cursor-label="Explore"
                    className={`group relative h-[440px] rounded-3xl border transition-all duration-500 overflow-hidden flex flex-col justify-between bg-[#faf8ff] p-6 shadow-sm hover:shadow-xl glow-border ${
                      isSelected
                        ? "border-secondary/60 ring-2 ring-secondary/20 scale-[1.02] bg-white"
                        : "border-slate-200 hover:border-secondary/30"
                    }`}
                  >
                    {/* Faded Background image overlay slowly zooming on hover */}
                    <div className="absolute inset-0 z-0 opacity-[0.03] group-hover:opacity-[0.09] transition-all duration-700 pointer-events-none">
                      <img 
                        src={ind.imageUrl} 
                        alt="" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                    </div>

                    {/* Ambient glow highlight follows cursor inside card */}
                    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_200px_at_var(--x,50%)_var(--y,50%),rgba(37,89,189,0.06),transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Default front face of the card (Optimized for 3-5 second scan view) */}
                    <div className="flex flex-col justify-between h-full w-full z-10 text-left relative">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? "bg-secondary text-white" : "bg-secondary/15 text-secondary"}`}>
                            <IndIcon size={18} />
                          </span>
                          <h3 className="font-sans font-black text-lg text-primary">{ind.title}</h3>
                        </div>
                        <p className="text-xs text-on-surface-variant font-semibold leading-normal">{ind.tagline}</p>

                        {/* Front face 3-line layout */}
                        <div className="pt-3 border-t border-slate-100 space-y-2.5">
                          <div>
                            <span className="text-[9px] font-extrabold uppercase text-rose-500 tracking-wider block mb-0.5">Challenge</span>
                            <p className="text-xs text-slate-700 font-semibold">{ind.challenge}</p>
                          </div>
                          <div className="text-slate-300 text-[10px] pl-1 font-bold">↓</div>
                          <div>
                            <span className="text-[9px] font-extrabold uppercase text-secondary tracking-wider block mb-0.5">AV Impact Solution</span>
                            <p className="text-xs text-slate-800 font-bold">{ind.solution}</p>
                          </div>
                          <div className="text-slate-300 text-[10px] pl-1 font-bold">↓</div>
                          <div>
                            <span className="text-[9px] font-extrabold uppercase text-emerald-600 tracking-wider block mb-0.5">Business Outcome</span>
                            <p className="text-xs text-emerald-850 font-bold">{ind.outcome}</p>
                          </div>
                        </div>
                      </div>

                      {/* Quick design button at the bottom of each card to drive conversion */}
                      <button
                        onClick={() => openModal(`Consultation: ${ind.title}`)}
                        data-cursor="magnetic"
                        className="w-full mt-4 bg-[#2559bd] hover:bg-[#1f4a9e] text-white font-bold py-2.5 px-4 rounded-xl text-xs tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md"
                      >
                        Request Custom Design <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* Section 5 — Representative Solution Layouts */}
        <section className="py-20 md:py-24 bg-[#fbfaff]/60 border-b border-slate-150 relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-16 text-center mb-16 reveal">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2559bd] bg-secondary/5 px-3 py-1 rounded">Ecosystem Blueprints</span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-primary mt-3 mb-4">Representative Solution Layouts</h2>
            <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Illustrative layouts demonstrating how AV equipment is typically positioned within an environment.
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-16 relative reveal">
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onClick={() => setAutoPlayEnabled(false)}
              className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-md relative z-10"
            >

              {/* Left: Realistic room photograph with interactive hotspots */}
              <div className="lg:col-span-3 bg-slate-950 border border-slate-200 rounded-2xl relative overflow-hidden h-[340px] md:h-[400px] flex flex-col justify-between p-4 shadow-md select-none">
                <div key={`layout-left-${currentProjectIndex}`} className="animate-slide-left-fade absolute inset-0 w-full h-full">
                  <img
                    src={representativeLayouts[currentProjectIndex].image}
                    alt={representativeLayouts[currentProjectIndex].title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

                  {/* Interactive Hotspots Overlay */}
                  <div className="absolute inset-0 z-20">
                    {/* SVG connection path lines */}
                    {activeHotspot && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                        <defs>
                          <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.85" />
                            <stop offset="100%" stopColor="#6c98ff" stopOpacity="0.85" />
                          </linearGradient>
                        </defs>
                        {representativeLayouts[currentProjectIndex].hotspots.map((hs) => {
                          const controlHotspot = representativeLayouts[currentProjectIndex].hotspots.find(h => h.id === "control");
                          // If control is hovered, draw to all other hotspots
                          if (activeHotspot === "control") {
                            if (hs.id === "control") return null;
                            return (
                              <line
                                key={`line-${hs.id}`}
                                x1={controlHotspot?.x}
                                y1={controlHotspot?.y}
                                x2={hs.x}
                                y2={hs.y}
                                stroke="url(#line-glow)"
                                strokeWidth="2.5"
                                className="hotspot-connection-line"
                              />
                            );
                          }
                          // If another hotspot is hovered, draw a line from it to the control hotspot
                          if (activeHotspot === hs.id && hs.id !== "control" && controlHotspot) {
                            return (
                              <line
                                key={`line-${hs.id}`}
                                x1={hs.x}
                                y1={hs.y}
                                x2={controlHotspot.x}
                                y2={controlHotspot.y}
                                stroke="url(#line-glow)"
                                strokeWidth="2.5"
                                className="hotspot-connection-line"
                              />
                            );
                          }
                          return null;
                        })}
                      </svg>
                    )}

                    {representativeLayouts[currentProjectIndex].hotspots.map((hs) => {
                      const isActive = activeHotspot === hs.id;
                      return (
                        <div
                          key={hs.id}
                          className="absolute z-20"
                          style={{ top: hs.y, left: hs.x, transform: "translate(-50%, -50%)" }}
                          onMouseEnter={() => setActiveHotspot(hs.id)}
                          onMouseLeave={() => setActiveHotspot(null)}
                        >
                          {/* Hotspot Ring Animation */}
                          <span className={`absolute inline-flex h-8 w-8 rounded-full bg-secondary/40 -left-2 -top-2 transition-all duration-300 ${isActive ? "animate-ping scale-125" : "scale-100"}`} />
                          
                          {/* Pulsing Hotspot Center */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHotspot(isActive ? null : hs.id);
                            }}
                            data-cursor="text"
                            data-cursor-label="View Setup"
                            className={`h-4 w-4 rounded-full flex items-center justify-center transition-all cursor-pointer border-2 ${
                              isActive 
                                ? "bg-secondary border-white scale-125 shadow-lg shadow-secondary/50" 
                                : "bg-[#2559bd] border-white/80 hover:bg-secondary hover:scale-110"
                            }`}
                            aria-label={`Hotspot for ${hs.name}`}
                          />

                          {/* Hotspot Tooltip */}
                          {isActive && (() => {
                            const yVal = parseFloat(hs.y);
                            const xVal = parseFloat(hs.x);
                            const isTopHalf = yVal < 45;
                            const alignLeft = xVal < 30;
                            const alignRight = xVal > 70;

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
                              tooltipStyle.left = "-120px";
                            }

                            return (
                              <div
                                className="absolute z-30 bg-slate-950/98 text-white border border-secondary/40 p-4 rounded-2xl shadow-2xl w-64 text-left pointer-events-none transition-all duration-300 animate-fade-in-only"
                                style={tooltipStyle}
                              >
                                {/* Arrow indicator */}
                                <div
                                  className={`absolute w-3 h-3 rotate-45 bg-slate-950 ${
                                    isTopHalf 
                                      ? "border-l border-t border-secondary/40" 
                                      : "border-r border-b border-secondary/40"
                                  }`}
                                  style={
                                    isTopHalf
                                      ? alignLeft 
                                        ? { top: "-6px", left: "12px" } 
                                        : alignRight 
                                          ? { top: "-6px", right: "12px", left: "auto" } 
                                          : { top: "-6px", left: "124px" }
                                      : alignLeft 
                                        ? { bottom: "-6px", left: "12px" } 
                                        : alignRight 
                                          ? { bottom: "-6px", right: "12px", left: "auto" } 
                                          : { bottom: "-6px", left: "124px" }
                                  }
                                />
                                <h5 className="font-sans font-black text-xs text-secondary mb-1 flex items-center gap-1.5 tracking-wider uppercase">
                                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                                  {hs.name}
                                </h5>
                                <p className="text-[10px] text-slate-350 leading-relaxed font-semibold mb-2">
                                  {hs.desc}
                                </p>
                                <div className="border-t border-slate-800/80 pt-2 space-y-1 text-[9px] font-mono">
                                  <div>
                                    <span className="font-extrabold text-secondary tracking-wider block">PURPOSE:</span>
                                    <span className="text-slate-450">{hs.purpose}</span>
                                  </div>
                                  <div className="mt-1">
                                    <span className="font-extrabold text-secondary tracking-wider block">BENEFIT:</span>
                                    <span className="text-emerald-450">{hs.benefit}</span>
                                  </div>
                                  <div className="mt-1">
                            <span className="font-extrabold text-secondary tracking-wider block">INTEGRATED TECH:</span>
                                    <span className="text-slate-450">{hs.relatedTech}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      );
                    })}
                  </div>
                </div>


                {/* User Guide Cue */}
                <div className="absolute bottom-4 left-4 z-35 text-[9px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-xs border border-slate-800/40 p-2 rounded-lg self-start">
                  👋 Hover or tap the pulsing nodes on the visual to view equipment details.
                </div>
              </div>

              {/* Right: Clean copy details */}
              <div key={`layout-right-${currentProjectIndex}`} className="animate-slide-left-fade lg:col-span-2 flex flex-col justify-between text-left space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#2559bd]/10 text-[#2559bd] border border-[#2559bd]/20 text-[10px] font-mono px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                      {representativeLayouts[currentProjectIndex].label}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 font-mono">
                      {currentProjectIndex + 1} / {representativeLayouts.length}
                    </span>
                  </div>

                  <h3 className="font-sans font-black text-xl md:text-2xl text-primary leading-tight">
                    {representativeLayouts[currentProjectIndex].title}
                  </h3>

                  {/* Micro Challenges & Intent Details */}
                  <div className="space-y-3 pt-3 border-t border-slate-200/50 text-xs">
                    <div>
                      <span className="font-extrabold text-rose-500 uppercase text-[9px] tracking-wider block mb-0.5">Typical Challenge</span>
                      <p className="text-on-surface-variant font-medium leading-relaxed">{representativeLayouts[currentProjectIndex].challenge}</p>
                    </div>
                    <div>
                      <span className="font-extrabold text-[#2559bd] uppercase text-[9px] tracking-wider block mb-0.5">AV Solution Strategy</span>
                      <p className="text-on-surface-variant font-medium leading-relaxed">{representativeLayouts[currentProjectIndex].solution}</p>
                    </div>
                    <div>
                      <span className="font-extrabold text-emerald-600 uppercase text-[9px] tracking-wider block mb-0.5">Design Intent</span>
                      <p className="text-emerald-700 font-semibold leading-relaxed">{representativeLayouts[currentProjectIndex].outcome}</p>
                    </div>
                  </div>

                  {/* List of Hotspots with Click Highlight Handler */}
                  <div className="pt-4 border-t border-slate-200/50">
                    <span className="font-extrabold text-slate-800 uppercase text-[9px] tracking-wider block mb-2.5">Key Integration Hotspots:</span>
                    <div className="flex flex-wrap gap-2">
                      {representativeLayouts[currentProjectIndex].hotspots.map((hs) => {
                        const isActive = activeHotspot === hs.id;
                        return (
                          <button
                            key={hs.id}
                            onMouseEnter={() => setActiveHotspot(hs.id)}
                            onMouseLeave={() => setActiveHotspot(null)}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHotspot(isActive ? null : hs.id);
                            }}
                            className={`text-[10px] font-mono px-3 py-1 rounded-lg border transition-all cursor-pointer font-bold ${isActive
                                ? "bg-secondary border-secondary text-white shadow-sm"
                                : "bg-white border-slate-200 text-slate-700 hover:border-secondary hover:text-secondary"
                              }`}
                          >
                            {hs.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-5 border-t border-slate-200/50">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(`Layout: ${representativeLayouts[currentProjectIndex].title}`);
                    }}
                    className="text-xs font-extrabold text-secondary hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    Request Blueprint Specs <ArrowRight size={13} />
                  </button>

                  {/* Carousel navigation controls and indicators */}
                  <div className="flex items-center gap-4">
                    {/* Pagination dots indicator */}
                    <div className="flex gap-1.5 items-center">
                      {representativeLayouts.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentProjectIndex(idx);
                            setAutoPlayEnabled(false);
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentProjectIndex
                              ? "bg-secondary w-5"
                              : "bg-[#2559bd]/30 hover:bg-secondary/60"
                            }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                    {/* Chevron controls */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevProject();
                        }}
                        className="w-9 h-9 rounded-full border border-slate-250 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                        aria-label="Previous Layout"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextProject();
                        }}
                        className="w-9 h-9 rounded-full border border-slate-250 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                        aria-label="Next Layout"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Reusable Premium Footer */}
      <Footer navigate={navigate} />

    </div>
  );
}
