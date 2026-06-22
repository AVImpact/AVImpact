import React, { useEffect } from "react";
import { AVImpactLogo } from "../components/ui/AVImpactLogo";
import { 
  Tv, Compass, Video, Laptop, Volume2, Cpu, Sliders, Network, Server, Shield, Sparkles, Check,
  Award, Target, Users, Phone, Mail, MapPin, Globe, Linkedin, ArrowRight
} from "lucide-react";
import { useUI } from "../contexts/UIContext";

interface CompanyProfileProps {
  navigate: (path: string) => void;
}

export default function CompanyProfile({ navigate }: CompanyProfileProps) {
  const { openLeadModal } = useUI();
  useEffect(() => {
    // Smooth scroll to top on load
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="bg-[#0d1222] min-h-screen font-sans antialiased text-[#000924] select-none">
      
      {/* Web sticky action bar for saving/downloading PDF */}
      <div className="no-print sticky top-0 z-50 w-full bg-[#0d1222]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#2559bd] animate-ping" />
          <span className="text-white text-xs font-black uppercase tracking-widest">AV Impact Corporate Brochure</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/")} 
            className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white border border-white/10 rounded-full hover:bg-white/5 transition-all active:scale-95 cursor-pointer"
          >
            Back to Home
          </button>
          <button 
            onClick={() => window.print()} 
            className="px-5 py-2.5 bg-[#2559bd] text-white hover:bg-[#1f4a9e] text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      {/* Pages Container */}
      <div className="a4-container">
        
        {/* ================= PAGE 01: COVER (Dark Navy) ================= */}
        <div className="a4-page-wrapper">
          <div className="a4-page">
            <div className="relative w-full h-full bg-[#000924] text-white flex flex-col justify-between p-16 box-border">
              {/* Background Image */}
              <img 
                src="/assets/boardroom_curved.webp" 
                className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-luminosity pointer-events-none" 
                alt="Cover background" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000924] via-[#000924]/60 to-transparent pointer-events-none" />
              
              {/* Top Logo */}
              <div className="relative z-10">
                <AVImpactLogo height={130} light={true} className="h-[120px] scale-[1.3] origin-left" />
              </div>

              {/* Center Title */}
              <div className="relative z-10 my-auto flex flex-col gap-5">
                <div className="w-16 h-1.5 bg-[#2559bd] rounded-full" />
                <h1 className="text-5xl font-black uppercase tracking-wider leading-none m-0 font-sans">
                  Company Profile
                </h1>
                <p className="text-sm text-slate-300 font-bold tracking-widest max-w-md uppercase leading-relaxed font-sans">
                  System Integration, Consultation, Design, Installation & Support Services
                </p>
              </div>

              {/* Bottom Tagline / Page Number */}
              <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-6">
                <p className="text-[10px] font-bold text-[#6c98ff] font-sans uppercase tracking-widest m-0">
                  Better Connections. Better Decisions. Better Results.
                </p>
                <p className="text-xs font-bold text-slate-500 m-0">PAGE 01</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PAGE 02: ABOUT AV IMPACT (Light Background) ================= */}
        <div className="a4-page-wrapper">
          <div className="a4-page">
            <div className="relative w-full h-full bg-[#faf8ff] text-[#000924] flex flex-col justify-between p-12 box-border">
              {/* Header */}
              <div>
                <span className="text-[10px] font-black tracking-widest text-[#2559bd] uppercase block mb-1">Corporate Overview</span>
                <h2 className="text-3xl font-black tracking-tight font-sans m-0 leading-none">
                  About AV Impact
                </h2>
                <div className="w-12 h-1 bg-[#2559bd] mt-3" />
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-12 gap-6 items-start my-auto">
                {/* Left Column: Who We Are & Overview */}
                <div className="col-span-7 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-black text-[#0d1b3e] uppercase m-0 flex items-center gap-2">
                      <Users size={15} className="text-[#2559bd]" />
                      Who We Are
                    </h3>
                    <p className="text-[10px] text-slate-600 m-0 leading-relaxed font-medium">
                      AV Impact is a premier Audio-Visual solutions and system integration partner. We specialize in transforming spaces through state-of-the-art visual communication, audio reinforcement, and smart automation systems.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 border-t border-slate-200/60 pt-4">
                    <h3 className="text-xs font-black text-[#0d1b3e] uppercase m-0 flex items-center gap-2">
                      <Award size={15} className="text-[#2559bd]" />
                      Company Overview
                    </h3>
                    <p className="text-[9.5px] text-slate-600 m-0 leading-relaxed font-medium">
                      AV Impact specializes in designing, deploying, integrating, and supporting modern Audio-Visual solutions tailored to corporate, educational, government, healthcare, retail, and residential environments. Our focus is on enabling seamless collaboration, enhancing communication, and creating technology-enabled spaces that improve user experience and operational efficiency. Through a consultation-first approach, we ensure every solution is aligned with our clients' objectives, technical requirements, and budget.
                    </p>
                  </div>
                </div>

                {/* Right Column: Vision, Mission & Values */}
                <div className="col-span-5 flex flex-col gap-3.5">
                  {/* Vision */}
                  <div className="bg-slate-50 border border-slate-200/40 p-3 rounded-xl">
                    <h4 className="text-[11px] font-black text-[#0d1b3e] uppercase m-0 flex items-center gap-1.5 mb-1">
                      <Target size={13} className="text-[#2559bd]" />
                      Our Vision
                    </h4>
                    <p className="text-[9px] text-slate-500 m-0 leading-relaxed font-medium">
                      To empower organizations to connect, collaborate, and succeed through innovative, state-of-the-art visual and sound technologies.
                    </p>
                  </div>

                  {/* Mission */}
                  <div className="bg-slate-50 border border-slate-200/40 p-3 rounded-xl">
                    <h4 className="text-[11px] font-black text-[#0d1b3e] uppercase m-0 flex items-center gap-1.5 mb-1">
                      <Compass size={13} className="text-[#2559bd]" />
                      Our Mission
                    </h4>
                    <p className="text-[9px] text-slate-500 m-0 leading-relaxed font-medium">
                      To deliver reliable, high-performance, and user-centric AV systems through expert consultation, precision design, and professional support.
                    </p>
                  </div>

                  {/* Core Values */}
                  <div className="bg-[#2559bd]/5 border border-[#2559bd]/10 p-3 rounded-xl">
                    <h4 className="text-[11px] font-black text-[#2559bd] uppercase m-0 mb-1.5">
                      Core Values
                    </h4>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                      {["AV Solutions Focus", "System Integration", "Expert Design", "Quality Support", "Reliable Calibrations", "Client Satisfaction"].map((val, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-[8.5px] font-bold text-slate-700">
                          <Check size={10} className="text-emerald-500 shrink-0" />
                          <span>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Graphic */}
              <div className="h-[140px] rounded-xl overflow-hidden shadow-md">
                <img src="/assets/boardroom_hero.webp" className="w-full h-full object-cover" alt="Corporate Boardroom Integration" />
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center border-t border-slate-200 pt-4 mt-auto">
                <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase">AV Impact - About Us</span>
                <span className="text-[10px] font-bold text-slate-400">PAGE 02</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PAGE 03: SOLUTIONS OVERVIEW (Dark Navy) ================= */}
        <div className="a4-page-wrapper">
          <div className="a4-page">
            <div className="relative w-full h-full bg-[#000924] text-white flex flex-col justify-between p-12 box-border">
              <div className="absolute inset-0 bg-gradient-to-br from-[#000924] via-[#000924] to-[#00133c]" />
              
              {/* Header */}
              <div className="relative z-10">
                <span className="text-[10px] font-black tracking-widest text-[#6c98ff] uppercase block mb-1">Our Expertise</span>
                <h2 className="text-3xl font-black tracking-tight font-sans m-0 leading-none">
                  Core Audio-Visual Solutions
                </h2>
                <div className="w-12 h-1 bg-[#2559bd] mt-3" />
              </div>

              {/* Grid of 8 solutions */}
              <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-3.5 my-auto">
                {[
                  { title: "Smart Meeting Rooms", desc: "Interactive display units, native room schedulers, and wireless screensharing tools to streamline daily team updates." },
                  { title: "Boardroom Solutions", desc: "High-end corporate settings featuring custom automated controls, smart lighting, and acoustically optimized spaces." },
                  { title: "Video Conferencing Solutions", desc: "Native Teams, Zoom, and Webex systems with auto-tracking PTZ cameras and multi-mic soundbars for seamless hybrid work." },
                  { title: "Digital Signage Solutions", desc: "Enterprise networks of displays and LED video walls for corporate lobby branding, corridors, and high-visibility areas." },
                  { title: "Auditorium Solutions", desc: "Massive venues featuring high-lumen laser projectors, array loudspeaker setups, and central stage lighting." },
                  { title: "Training Room Solutions", desc: "Active whiteboards, audio zone distribution, and dedicated streaming boxes for digital lectures and hybrid learning." },
                  { title: "Command & Control Centers", desc: "24/7 mission-critical operations with micro-LED video walls, secure KVM grids, and zero-latency signal distribution." },
                  { title: "Unified Communication Solutions", desc: "Fully integrated hardware and software architectures to unify chat, voice, video conferencing, and desktop sharing." }
                ].map((sol, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3 flex gap-2.5 items-start">
                    <span className="w-7 h-7 rounded-lg bg-[#2559bd]/20 text-[#6c98ff] border border-[#2559bd]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles size={14} />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-xs font-black uppercase text-white m-0 tracking-wide">{sol.title}</h4>
                      <p className="text-[8.5px] text-slate-300 leading-normal m-0 font-medium">{sol.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="relative z-10 flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                <span className="text-[9px] font-black tracking-wider text-slate-500 uppercase">AV Impact Solutions</span>
                <span className="text-[10px] font-bold text-slate-400">PAGE 03</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PAGE 04: DEEP DIVE - COLLABORATION SPACES (Light Background) ================= */}
        <div className="a4-page-wrapper">
          <div className="a4-page">
            <div className="relative w-full h-full bg-[#faf8ff] text-[#000924] flex flex-col justify-between p-12 box-border">
              {/* Header */}
              <div>
                <span className="text-[10px] font-black tracking-widest text-[#2559bd] uppercase block mb-1">Solution Spotlight</span>
                <h2 className="text-3xl font-black tracking-tight font-sans m-0 leading-none">
                  Modern Collaboration Environments
                </h2>
                <div className="w-12 h-1 bg-[#2559bd] mt-3" />
              </div>

              {/* Main Split Content */}
              <div className="grid grid-cols-12 gap-6 items-center my-auto">
                {/* Left Column: Text & Benefits */}
                <div className="col-span-7 flex flex-col gap-4">
                  <p className="text-[11px] text-[#0d1b3e] font-black uppercase tracking-wider m-0 border-l-2 border-[#2559bd] pl-3">
                    Redefining corporate connectivity through frictionless system design.
                  </p>
                  
                  <p className="text-[10px] text-slate-500 m-0 leading-relaxed font-medium">
                    Modern businesses require flexible meeting setups that eliminate standard tech delays. Our integrated systems are custom-designed around user experiences, prioritizing ease of access and crystal-clear communication.
                  </p>

                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2.5 items-start">
                      <span className="w-6 h-6 rounded bg-[#2559bd]/10 text-[#2559bd] flex items-center justify-center shrink-0 mt-0.5">
                        <Video size={13} />
                      </span>
                      <div>
                        <h4 className="text-xs font-black uppercase text-[#0d1b3e] m-0">Frictionless Virtual Meeting</h4>
                        <p className="text-[9px] text-slate-500 m-0 leading-normal font-medium">
                          Single tap-to-join panels, automatic camera tracking, and intelligent room scheduler synchronization.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start border-t border-slate-200/50 pt-2.5">
                      <span className="w-6 h-6 rounded bg-[#2559bd]/10 text-[#2559bd] flex items-center justify-center shrink-0 mt-0.5">
                        <Volume2 size={13} />
                      </span>
                      <div>
                        <h4 className="text-xs font-black uppercase text-[#0d1b3e] m-0">Professional Acoustic Design</h4>
                        <p className="text-[9px] text-slate-500 m-0 leading-normal font-medium">
                          Multi-array beamforming ceiling microphones and active DSP calibration ensure every participant is heard.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start border-t border-slate-200/50 pt-2.5">
                      <span className="w-6 h-6 rounded bg-[#2559bd]/10 text-[#2559bd] flex items-center justify-center shrink-0 mt-0.5">
                        <Laptop size={13} />
                      </span>
                      <div>
                        <h4 className="text-xs font-black uppercase text-[#0d1b3e] m-0">Unified Communications (UC)</h4>
                        <p className="text-[9px] text-slate-500 m-0 leading-normal font-medium">
                          Seamless native integrations of Zoom, Teams, and Webex environments with BYOD wireless screen-sharing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Visual Case */}
                <div className="col-span-5 flex flex-col gap-3">
                  <div className="h-[180px] rounded-xl overflow-hidden shadow-md border border-slate-200/40">
                    <img src="/assets/boardroom_curved.webp" className="w-full h-full object-cover" alt="Modern Boardroom" />
                  </div>
                  <div className="bg-[#2559bd]/5 border border-[#2559bd]/10 p-3.5 rounded-xl text-center">
                    <span className="text-[9px] font-black text-[#2559bd] uppercase tracking-wider block mb-1">User Outcomes</span>
                    <p className="text-[9.5px] font-bold text-slate-700 m-0 leading-relaxed">
                      "Meetings start on time, remote team members feel fully present, and hardware operates invisibly in the background."
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center border-t border-slate-200 pt-4 mt-auto">
                <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase">AV Impact - Collaboration</span>
                <span className="text-[10px] font-bold text-slate-400">PAGE 04</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PAGE 05: WHY CHOOSE AV IMPACT (Light Background) ================= */}
        <div className="a4-page-wrapper">
          <div className="a4-page">
            <div className="relative w-full h-full bg-[#faf8ff] text-[#000924] flex flex-col justify-between p-12 box-border">
              {/* Header */}
              <div>
                <span className="text-[10px] font-black tracking-widest text-[#2559bd] uppercase block mb-1">Value Proposition</span>
                <h2 className="text-3xl font-black tracking-tight font-sans m-0 leading-none">
                  Why Choose AV Impact
                </h2>
                <div className="w-12 h-1 bg-[#2559bd] mt-3" />
              </div>

              {/* 3x2 Cards Grid */}
              <div className="grid grid-cols-2 gap-4 my-auto">
                {[
                  { 
                    icon: <Cpu size={16} />, 
                    title: "End-to-End AV Solutions", 
                    desc: "From initial room analysis and blueprint engineering to full hardware deployment and customized maintenance plans." 
                  },
                  { 
                    icon: <Compass size={16} />, 
                    title: "Expert Consultation & Design", 
                    desc: "Tailored architectural drawings, signal-flow schematics, and custom acoustics modelling to align with your building layout." 
                  },
                  { 
                    icon: <Sliders size={16} />, 
                    title: "Professional Installation", 
                    desc: "Experienced, system-certified integration technicians ensuring pristine rack cabling, proper mounting, and exact sound tuning." 
                  },
                  { 
                    icon: <Sparkles size={16} />, 
                    title: "Competitive Pricing", 
                    desc: "Strategic partner relationships with global equipment manufacturers, delivering tier-one technologies within your budget parameters." 
                  },
                  { 
                    icon: <Shield size={16} />, 
                    title: "Reliable Support", 
                    desc: "Dedicated post-install support SLA contracts, rapid phone/email technical ticketing, and preventive hardware revisions." 
                  },
                  { 
                    icon: <Check size={16} />, 
                    title: "Long-Term Partnership", 
                    desc: "Regular software updates, customized workspace training modules, and strategic technology planning as your team expands." 
                  }
                ].map((card, idx) => (
                  <div key={idx} className="bg-white border border-slate-200/50 rounded-xl p-4 shadow-sm flex flex-col gap-2 hover:shadow-md transition-all duration-300">
                    <span className="w-8 h-8 rounded-lg bg-[#2559bd]/10 text-[#2559bd] flex items-center justify-center shrink-0">
                      {card.icon}
                    </span>
                    <h3 className="text-xs font-black uppercase text-[#0d1b3e] m-0 tracking-wide">{card.title}</h3>
                    <p className="text-[9px] text-slate-500 leading-relaxed m-0 font-medium">{card.desc}</p>
                  </div>
                ))}
              </div>

              {/* Tagline */}
              <div className="bg-[#2559bd]/5 border border-[#2559bd]/10 p-3 rounded-xl text-center">
                <p className="text-[9.5px] font-black text-[#2559bd] uppercase tracking-wider m-0">
                  Delivering reliable systems, precise craftsmanship, and clear connection across every deployment.
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center border-t border-slate-200 pt-4 mt-auto">
                <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase">AV Impact - Why Choose Us</span>
                <span className="text-[10px] font-bold text-slate-400">PAGE 05</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PAGE 06: INDUSTRIES WE SERVE (Dark Navy) ================= */}
        <div className="a4-page-wrapper">
          <div className="a4-page">
            <div className="relative w-full h-full bg-[#000924] text-white flex flex-col justify-between p-12 box-border">
              <div className="absolute inset-0 bg-gradient-to-br from-[#000924] via-[#000924] to-[#00133c]" />
              
              {/* Header */}
              <div className="relative z-10">
                <span className="text-[10px] font-black tracking-widest text-[#6c98ff] uppercase block mb-1">Target Sectors</span>
                <h2 className="text-3xl font-black tracking-tight font-sans m-0 leading-none">
                  Industries We Serve
                </h2>
                <div className="w-12 h-1 bg-[#2559bd] mt-3" />
              </div>

              {/* 7-Sector Grid */}
              <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-2.5 my-auto">
                {[
                  { name: "Corporate", img: "/assets/boardroom_curved.webp", value: "Enhancing collaboration and productivity through modern workplace technology." },
                  { name: "Education", img: "/assets/classroom_interactive.webp", value: "Creating engaging and interactive learning environments." },
                  { name: "Govt", img: "/assets/project_presentation.webp", value: "Secure, reliable AV infrastructure for critical decision-making environments." },
                  { name: "Healthcare", img: "/assets/project_lobby.webp", value: "Improving patient outcomes through clear communication and connected care." },
                  { name: "Defense", img: "/assets/project_broadcast.webp", value: "Advanced visualization and secure control systems for mission-critical command centers." },
                  { name: "Retail", img: "/assets/broadcast_summit.webp", value: "Transforming customer engagement and brand experience through dynamic visual display networks." },
                  { name: "Residential", img: "/assets/residential_cinema.webp", value: "Automated high-fidelity smart environments and immersive home entertainment systems." }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden flex flex-col ${
                      idx === 6 ? "col-span-2 flex-row h-[70px]" : ""
                    }`}
                  >
                    <div className={`${idx === 6 ? "h-full w-[35%] shrink-0" : "h-[70px] w-full"} overflow-hidden relative`}>
                      <img src={item.img} className="w-full h-full object-cover opacity-80" alt={item.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                      <div className="absolute bottom-2 left-3">
                        <h4 className="text-[10px] font-black text-white tracking-wider uppercase m-0">{item.name}</h4>
                      </div>
                    </div>
                    <div className={`p-2.5 flex flex-col justify-center ${idx === 6 ? "flex-1" : ""}`}>
                      <p className="text-[8.5px] text-slate-300 leading-normal m-0 font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="relative z-10 flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                <span className="text-[9px] font-black tracking-wider text-slate-500 uppercase">AV Impact Sectors</span>
                <span className="text-[10px] font-bold text-slate-400">PAGE 06</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PAGE 07: PROCESS & COMMITMENT (Light Background) ================= */}
        <div className="a4-page-wrapper">
          <div className="a4-page">
            <div className="relative w-full h-full bg-[#faf8ff] text-[#000924] flex flex-col justify-between p-12 box-border">
              {/* Header */}
              <div>
                <span className="text-[10px] font-black tracking-widest text-[#2559bd] uppercase block mb-1">Our Methodology</span>
                <h2 className="text-3xl font-black tracking-tight font-sans m-0 leading-none">
                  Process & Core Commitment
                </h2>
                <div className="w-12 h-1 bg-[#2559bd] mt-3" />
              </div>

              {/* Process timeline horizontal */}
              <div className="relative my-auto bg-slate-50 border border-slate-200/40 rounded-2xl p-5">
                <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
                <div className="grid grid-cols-5 relative z-10 gap-2">
                  {[
                    { step: "01", name: "Consult", desc: "Auditing space layout & requirements." },
                    { step: "02", name: "Design", desc: "CAD cabling grids & signal drawings." },
                    { step: "03", name: "Integrate", desc: "Certified mounting & DSP settings." },
                    { step: "04", name: "Train", desc: "Interactive runs for user teams." },
                    { step: "05", name: "Support", desc: "SLA maintenance & update plans." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center gap-1.5">
                      <div className="w-8 h-8 rounded-full bg-[#2559bd] text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white">
                        {item.step}
                      </div>
                      <h4 className="text-[10.5px] font-black text-[#0d1b3e] uppercase tracking-wider m-0 mt-0.5">{item.name}</h4>
                      <p className="text-[7.5px] text-slate-500 leading-normal m-0 max-w-[90px] font-medium">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commitment Column and Image Column */}
              <div className="grid grid-cols-12 gap-6 items-center my-auto">
                <div className="col-span-5 h-[140px] rounded-xl overflow-hidden shadow-sm border border-slate-200/40">
                  <img src="/assets/project_classroom.webp" className="w-full h-full object-cover" alt="System Calibration" />
                </div>
                <div className="col-span-7 flex flex-col gap-3">
                  <div className="border-l-4 border-[#2559bd] pl-4">
                    <h3 className="text-xs font-black text-[#2559bd] uppercase tracking-wider m-0 mb-1">Our Commitment</h3>
                    <p className="text-[9.5px] text-slate-600 leading-relaxed m-0 font-medium">
                      At AV Impact, we do not simply supply products. We build complete, highly integrated environments tailored for clear communication and simple, reliable operations.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9.5px] font-black text-[#0d1b3e] uppercase">Reliable Solutions</span>
                      <span className="text-[8.5px] text-slate-500 leading-tight font-medium">Built on industry-certified platforms for maximum uptime.</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9.5px] font-black text-[#0d1b3e] uppercase">Quality Installation</span>
                      <span className="text-[8.5px] text-slate-500 leading-tight font-medium">Meticulous craftsmanship, cabling standards, and neat racks.</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9.5px] font-black text-[#0d1b3e] uppercase">Customer Satisfaction</span>
                      <span className="text-[8.5px] text-slate-500 leading-tight font-medium">Prioritizing user experience and seamless daily operations.</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9.5px] font-black text-[#0d1b3e] uppercase">Ongoing Support</span>
                      <span className="text-[8.5px] text-slate-500 leading-tight font-medium">Rapid SLA support keeping critical infrastructures active.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center border-t border-slate-200 pt-4 mt-auto">
                <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase">AV Impact Quality Process</span>
                <span className="text-[10px] font-bold text-slate-400">PAGE 07</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PAGE 08: TECHNOLOGY PARTNERS (Dark Navy) ================= */}
        <div className="a4-page-wrapper">
          <div className="a4-page">
            <div className="relative w-full h-full bg-[#000924] text-white flex flex-col justify-between p-12 box-border">
              <div className="absolute inset-0 bg-gradient-to-br from-[#000924] via-[#000924] to-[#00133c]" />
              
              {/* Header */}
              <div className="relative z-10">
                <span className="text-[10px] font-black tracking-widest text-[#6c98ff] uppercase block mb-1">Solutions Powered by</span>
                <h2 className="text-3xl font-black tracking-tight font-sans m-0 leading-none">
                  Industry-Leading Technologies
                </h2>
                <div className="w-12 h-1 bg-[#2559bd] mt-3" />
              </div>

              {/* Brand statement */}
              <p className="relative z-10 text-[9.5px] text-slate-300 leading-relaxed font-medium m-0 max-w-xl my-3">
                AV Impact designs and deploys custom systems integrated with industry-leading hardware from the world's most trusted manufacturers. By leveraging top-tier product ecosystems, we deliver seamless interoperability, reliable performance, and long-term durability for every environment.
              </p>

              {/* Logo Grid */}
              <div className="relative z-10 grid grid-cols-4 gap-3 my-auto">
                {[
                  "Logitech", "Poly", "Yealink", "Samsung", 
                  "LG", "Sony", "Epson", "BenQ", 
                  "JBL", "Bose", "Shure", "Crestron"
                ].map((brand) => (
                  <div key={brand} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center h-[70px] shadow-sm text-center">
                    <span className="text-xs font-black tracking-widest text-slate-300 uppercase">{brand}</span>
                  </div>
                ))}
              </div>

              {/* Trust Tagline */}
              <div className="relative z-10 border border-white/5 bg-white/5 rounded-xl p-3.5 text-center mt-3">
                <p className="text-[9px] text-slate-400 font-bold m-0 uppercase tracking-widest">
                  Custom-integrated architectures using industry-leading hardware platforms
                </p>
              </div>

              {/* Footer */}
              <div className="relative z-10 flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                <span className="text-[9px] font-black tracking-wider text-slate-500 uppercase">AV Impact Partners</span>
                <span className="text-[10px] font-bold text-slate-400">PAGE 08</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PAGE 09: CONTACT & CALL-TO-ACTION (Dark Navy) ================= */}
        <div className="a4-page-wrapper">
          <div className="a4-page">
            <div className="relative w-full h-full bg-[#000924] text-white flex flex-col justify-between p-12 box-border">
              {/* Background Backdrop */}
              <img 
                src="/assets/boardroom_hero.webp" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity pointer-events-none" 
                alt="Workspace CTA background" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000924] via-[#000924]/80 to-transparent pointer-events-none" />
              
              {/* Heading */}
              <div className="relative z-10 text-center mt-4 flex flex-col gap-2">
                <span className="text-[10px] font-black text-[#6c98ff] uppercase tracking-widest">Contact & Consultation</span>
                <h2 className="text-3xl font-black tracking-tight font-sans m-0 leading-none">
                  Let's Discuss Your Next AV Project
                </h2>
                <p className="text-[10.5px] text-slate-300 leading-normal max-w-lg mx-auto m-0 mt-1 font-medium">
                  Whether you're planning a meeting room, boardroom, auditorium, training center, digital signage deployment, or video conferencing solution, AV Impact is ready to help.
                </p>
                <div className="w-12 h-1 bg-[#2559bd] mx-auto mt-2" />
              </div>
              
              {/* Contact Information Cards */}
              <div className="relative z-10 grid grid-cols-3 gap-3 my-auto">
                <div className="flex flex-col gap-1.5 bg-white/5 border border-white/10 rounded-xl p-3.5 text-center">
                  <span className="w-7 h-7 rounded-full bg-[#2559bd]/25 text-[#6c98ff] flex items-center justify-center mx-auto mb-1">
                    <Phone size={13} />
                  </span>
                  <span className="text-[8px] text-[#6c98ff] font-bold uppercase tracking-wider">Call Our Office</span>
                  <span className="text-[11.5px] font-bold text-white tracking-wide font-sans">+91 9685453058</span>
                </div>
                <div className="flex flex-col gap-1.5 bg-white/5 border border-white/10 rounded-xl p-3.5 text-center">
                  <span className="w-7 h-7 rounded-full bg-[#2559bd]/25 text-[#6c98ff] flex items-center justify-center mx-auto mb-1">
                    <Mail size={13} />
                  </span>
                  <span className="text-[8px] text-[#6c98ff] font-bold uppercase tracking-wider">Email Inquiry</span>
                  <span className="text-[11px] font-bold text-white tracking-wide font-sans">av.info4u@gmail.com</span>
                </div>
                <div className="flex flex-col gap-1.5 bg-white/5 border border-white/10 rounded-xl p-3.5 text-center">
                  <span className="w-7 h-7 rounded-full bg-[#2559bd]/25 text-[#6c98ff] flex items-center justify-center mx-auto mb-1">
                    <MapPin size={13} />
                  </span>
                  <span className="text-[8px] text-[#6c98ff] font-bold uppercase tracking-wider">Office Address</span>
                  <span className="text-[8.5px] font-bold text-slate-300 leading-normal font-sans">
                    101, Balaji Heights, Geeta Bhawan, Indore M.P, India 452001
                  </span>
                </div>
              </div>
              
              {/* Direct Links and CTA */}
              <div className="relative z-10 border-t border-white/10 pt-5 my-auto flex flex-col items-center gap-4">
                {/* Website & LinkedIn */}
                <div className="flex gap-6 text-[10px] font-bold text-slate-300">
                  <a href="https://www.avimpact.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                    <Globe size={13} className="text-[#6c98ff]" />
                    <span>www.avimpact.in</span>
                  </a>
                  <span className="text-white/10">|</span>
                  <a href="https://linkedin.com/company/av-impact" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                    <Linkedin size={13} className="text-[#6c98ff]" />
                    <span>linkedin.com/company/av-impact</span>
                  </a>
                </div>

                {/* Main Interactive Button (no-print) */}
                <button 
                  onClick={() => openLeadModal("quotation")}
                  className="no-print px-7 py-3 bg-[#2559bd] hover:bg-[#1f4a9e] text-white text-[11px] font-black uppercase tracking-widest rounded-full shadow-lg hover:shadow-[#2559bd]/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <span>Start Your AV Consultation</span>
                  <ArrowRight size={13} />
                </button>
              </div>
              
              {/* Footer Closing */}
              <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-4 mt-auto">
                <div className="text-[8.5px] font-bold text-[#6c98ff] font-sans uppercase tracking-widest m-0 flex flex-col gap-0.5 text-left">
                  <span>Better Connections.</span>
                  <span>Better Decisions.</span>
                  <span>Better Results.</span>
                </div>
                <p className="text-xs font-bold text-slate-500 m-0">PAGE 09</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
