import React, { useState, useRef } from "react";
import {
  CheckCircle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Globe,
  Award,
  Users,
  Compass,
  Lightbulb,
  Cpu,
  Laptop
} from "lucide-react";
import { NetworkBackground } from "../components/visualizers/NetworkBackground";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { useSEO } from "../hooks/useSEO";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useRevealObserver } from "../hooks/useRevealObserver";
import { useTilt } from "../hooks/useTilt";
import { scrollToElement } from "../utils/scrollUtils";
import { jobOpenings } from "../constants/careersData";



export default function Careers({ navigate }: { navigate: (path: string) => void }) {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const scrollPercent = useScrollProgress();
  const { handleTiltMove, handleTiltLeave } = useTilt(6);
  const jobsRef = useRef<HTMLDivElement>(null);
  useSEO("/careers");
  useRevealObserver();

  const openCareerApplication = (position = "General Application") => {
    const url = import.meta.env.VITE_CAREERS_GOOGLE_FORM_URL;

    if (!url) {
      console.error("Missing Google Form careers URL");
      return;
    }

    try {
      const formUrl = new URL(url);
      formUrl.searchParams.delete("usp");
      
      if (position && position !== "General Application") {
        formUrl.search = `?usp=pp_url&entry.554521820=${encodeURIComponent(position)}`;
      } else {
        formUrl.search = "?usp=pp_url";
      }
      
      window.open(formUrl.toString(), "_blank", "noopener,noreferrer");
    } catch {
      console.error("Invalid Google Form careers URL");
    }
  };

  const toggleAccordion = (id: string) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white text-[#0d1b3e] font-sans antialiased overflow-x-hidden relative">
      {/* Scroll Progress Bar */}
      <div
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(scrollPercent)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="fixed top-0 left-0 h-1 bg-secondary z-[60] w-full origin-left transition-transform duration-300 will-change-transform"
        style={{ transform: `scaleX(${scrollPercent / 100})` }}
      />

      {/* Background Graphic Lines */}
      <div className="absolute inset-0 select-none pointer-events-none opacity-40 z-0">
        <NetworkBackground />
      </div>

      {/* Navigation Header */}
      <Navbar currentPath="/careers" navigate={navigate} />

      {/* ================================================================
          1. HERO SECTION
          ================================================================ */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 px-6 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 z-10">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2559bd]/10 border border-[#2559bd]/20 rounded-full text-xs font-bold text-[#2559bd] tracking-wide uppercase">
            <Sparkles size={12} className="animate-pulse" />
            Careers at AV Impact
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#0d1b3e] leading-tight">
            Build the Future of <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-[#2559bd] to-[#10b981] bg-clip-text text-transparent">
              Communication Technology
            </span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-xl leading-relaxed">
            Join a team passionate about creating smarter meeting rooms, impactful communication environments, and innovative audio-visual experiences.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => scrollToElement(jobsRef)}
              className="px-8 py-4 bg-[#2559bd] text-white font-extrabold rounded-full text-sm hover:bg-[#1f4a9e] transition-all transform hover:-translate-y-0.5 shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
            >
              View Opportunities <ArrowRight size={16} />
            </button>
            <button
              onClick={() => openCareerApplication()}
              className="px-8 py-4 bg-transparent border-2 border-slate-200 text-[#0d1b3e] font-extrabold rounded-full text-sm hover:border-[#2559bd]/30 hover:bg-[#2559bd]/5 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              Submit Your Resume
            </button>
          </div>
        </div>

        {/* Visual Workspace Showcase */}
        <div className="flex-1 w-full relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#2559bd] to-[#10b981] rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-all duration-700" />
          <div className="relative bg-white/70 border border-slate-100 rounded-2xl overflow-hidden shadow-2xl p-4 md:p-6 backdrop-blur-md">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-4 md:mb-6">
              <img
                src="/assets/boardroom_hero.webp"
                alt="Modern AV Workspace Showcase"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 flex flex-col justify-end p-4 text-white">
                <div className="flex items-center gap-2 text-xs font-bold text-[#10b981] uppercase tracking-wider mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
                  AV Innovation Hub
                </div>
                <h3 className="font-extrabold text-sm md:text-base">Collaborative Meeting Room Deployments</h3>
              </div>
            </div>

            {/* Micro Graphic indicators for Collaboration, Technology, Innovation, Teamwork */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#2559bd]/5 border border-[#2559bd]/10 p-3.5 rounded-xl text-center">
                <Users size={20} className="mx-auto mb-1.5 text-[#2559bd]" />
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Collaboration</div>
              </div>
              <div className="bg-[#10b981]/5 border border-[#10b981]/10 p-3.5 rounded-xl text-center">
                <Cpu size={20} className="mx-auto mb-1.5 text-[#10b981]" />
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Technology</div>
              </div>
              <div className="bg-amber-500/5 border border-amber-500/10 p-3.5 rounded-xl text-center">
                <Lightbulb size={20} className="mx-auto mb-1.5 text-amber-500" />
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Innovation</div>
              </div>
              <div className="bg-violet-500/5 border border-violet-500/10 p-3.5 rounded-xl text-center">
                <Compass size={20} className="mx-auto mb-1.5 text-violet-500" />
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Teamwork</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. WHY JOIN AV IMPACT
          ================================================================ */}
      <section className="bg-slate-50 py-20 px-6 md:px-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-xl text-left space-y-3">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0d1b3e]">Why Join AV Impact</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We solve complex spatial communication challenges, working directly with premier global enterprise solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Card 1: Direct Impact */}
            <div
              onMouseMove={(e) => handleTiltMove(e, 8)}
              onMouseLeave={handleTiltLeave}
              className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform cursor-default flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#2559bd]/10 flex items-center justify-center text-[#2559bd]">
                  <Globe size={22} />
                </div>
                <h3 className="font-extrabold text-base text-[#0d1b3e]">Direct Impact</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  Every installation transforms how teams connect, replacing complex setups with seamless, one-touch environments.
                </p>
              </div>
            </div>

            {/* Card 2: Advanced Tech */}
            <div
              onMouseMove={(e) => handleTiltMove(e, 8)}
              onMouseLeave={handleTiltLeave}
              className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform cursor-default flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                  <Cpu size={22} />
                </div>
                <h3 className="font-extrabold text-base text-[#0d1b3e]">Advanced Tech</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  Configure elite hardware from Crestron, Q-SYS, Shure, and Sennheiser daily.
                </p>
              </div>
            </div>

            {/* Card 3: Rapid Growth */}
            <div
              onMouseMove={(e) => handleTiltMove(e, 8)}
              onMouseLeave={handleTiltLeave}
              className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform cursor-default flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Award size={22} />
                </div>
                <h3 className="font-extrabold text-base text-[#0d1b3e]">Rapid Growth</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  Fast-track your technical career with mentorship from CTS-certified solutions engineers.
                </p>
              </div>
            </div>

            {/* Card 4: Team Pride */}
            <div
              onMouseMove={(e) => handleTiltMove(e, 8)}
              onMouseLeave={handleTiltLeave}
              className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform cursor-default flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500">
                  <Users size={22} />
                </div>
                <h3 className="font-extrabold text-base text-[#0d1b3e]">Team Pride</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  Work alongside dedicated specialists who collaborate closely to execute flawless system integrations.
                </p>
              </div>
            </div>

            {/* Card 5: Client Trust */}
            <div
              onMouseMove={(e) => handleTiltMove(e, 8)}
              onMouseLeave={handleTiltLeave}
              className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform cursor-default flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                  <Sparkles size={22} />
                </div>
                <h3 className="font-extrabold text-base text-[#0d1b3e]">Client Trust</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  Our success is measured by maximum system uptime and long-term customer confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          3. LIFE AT AV IMPACT (Storytelling Section)
          ================================================================ */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto space-y-12">
        <div className="max-w-2xl text-left space-y-3">
          <div className="text-xs uppercase font-extrabold tracking-widest text-[#2559bd]">Behind the Scenes</div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0d1b3e]">Life at AV Impact</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Our daily work centers around execution, precision, and solving real-world acoustic and signal routing challenges.
          </p>
        </div>

        {/* Dynamic Storytelling Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4 hover:bg-slate-50/50 hover:border-[#2559bd]/10 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-[#2559bd]/10 text-[#2559bd] flex items-center justify-center font-bold">01</div>
            <h3 className="font-extrabold text-lg text-[#0d1b3e]">Site Surveys & Acoustics</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
              We map physical spaces, measure room reverberation, and plan optimal display sightlines before a single cable is laid.
            </p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4 hover:bg-slate-50/50 hover:border-[#10b981]/10 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 text-[#10b981] flex items-center justify-center font-bold">02</div>
            <h3 className="font-extrabold text-lg text-[#0d1b3e]">System Staging & Rack Building</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
              We pre-assemble hardware racks, label structural paths, and pre-configure switches in our lab for rapid site deployment.
            </p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4 hover:bg-slate-50/50 hover:border-amber-500/10 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">03</div>
            <h3 className="font-extrabold text-lg text-[#0d1b3e]">Tuning & Calibrating Audio</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
              We position beamforming ceiling microphones, configure echo cancellation DSPs, and calibrate multi-zone sound distribution.
            </p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4 hover:bg-slate-50/50 hover:border-violet-500/10 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold">04</div>
            <h3 className="font-extrabold text-lg text-[#0d1b3e]">Client Handover & Syncs</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
              We conduct step-by-step user walkthroughs on touch panel controls, run stress tests, and verify overall system uptime.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          3.5 CAREER PROGRESSION & TECHNOLOGY EXPOSURE
          ================================================================ */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto space-y-16 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Career Growth Tracks */}
          <div className="space-y-8 text-left">
            <div>
              <div className="text-xs uppercase font-extrabold tracking-widest text-[#2559bd] mb-2">Grow With Us</div>
              <h2 className="text-3xl font-black tracking-tight text-[#0d1b3e]">Career Progression Paths</h2>
              <p className="text-slate-500 text-sm leading-relaxed mt-2 font-medium">
                We support structured career growth. Whether you prefer technical engineering or sales and consulting, we map out clear progression paths.
              </p>
            </div>

            <div className="space-y-6">
              {/* Technical Path */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-[#2559bd] font-bold text-sm uppercase tracking-wider">
                  <Cpu size={18} />
                  Technical & Engineering Track
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 font-semibold text-xs text-slate-600">
                  <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">AV Installer</span>
                  <ChevronRight size={14} className="text-slate-400 rotate-90 sm:rotate-0 self-center" />
                  <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">Lead Tech</span>
                  <ChevronRight size={14} className="text-slate-400 rotate-90 sm:rotate-0 self-center" />
                  <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">Systems Eng</span>
                  <ChevronRight size={14} className="text-slate-400 rotate-90 sm:rotate-0 self-center" />
                  <span className="bg-white px-3 py-1.5 rounded-lg border border-[#2559bd]/30 bg-[#2559bd]/5 text-[#2559bd]">Lead Solutions Architect</span>
                </div>
              </div>

              {/* Sales/Design Path */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-[#10b981] font-bold text-sm uppercase tracking-wider">
                  <Briefcase size={18} />
                  Solutions Design & Sales Track
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 font-semibold text-xs text-slate-600">
                  <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">Sales Specialist</span>
                  <ChevronRight size={14} className="text-slate-400 rotate-90 sm:rotate-0 self-center" />
                  <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">Account Exec</span>
                  <ChevronRight size={14} className="text-slate-400 rotate-90 sm:rotate-0 self-center" />
                  <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">AV Design Consultant</span>
                  <ChevronRight size={14} className="text-slate-400 rotate-90 sm:rotate-0 self-center" />
                  <span className="bg-white px-3 py-1.5 rounded-lg border border-[#10b981]/30 bg-[#10b981]/5 text-[#10b981]">VP of Solutions Development</span>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Technology Exposure */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6 text-left relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#2559bd]/20 to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="space-y-2 relative z-10">
              <div className="text-xs uppercase font-extrabold tracking-widest text-[#6c98ff]">Hands-on Experience</div>
              <h3 className="text-2xl font-black tracking-tight">Core Technologies Deployed Daily</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our team integrates and configures hardware from world-class AV ecosystems every single day.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10 pt-2">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="text-[#6c98ff] font-bold text-xs uppercase tracking-wider mb-1">Collaboration</div>
                <div className="font-extrabold text-slate-200 text-sm">Logitech Rally / Poly Studio</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="text-[#10b981] font-bold text-xs uppercase tracking-wider mb-1">Audio Networks</div>
                <div className="font-extrabold text-slate-200 text-sm">Shure MXA / Dante DSPs</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">Control Systems</div>
                <div className="font-extrabold text-slate-200 text-sm">Crestron DM-NVX / Q-SYS Core</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="text-violet-400 font-bold text-xs uppercase tracking-wider mb-1">Visual Displays</div>
                <div className="font-extrabold text-slate-200 text-sm">Samsung DVLED / LG Signage</div>
              </div>
            </div>

            <div className="bg-[#2559bd]/20 border border-[#2559bd]/30 p-4 rounded-2xl relative z-10 text-xs text-slate-300 leading-relaxed font-semibold">
              💡 <span className="text-white font-bold">CTS Certification Prep:</span> We sponsor staff studying for InfoComm CTS (Certified Technology Specialist) certifications with weekly study circles and lab practice.
            </div>
          </div>

        </div>
      </section>

      {/* ================================================================
          4. WHO WE LOOK FOR
          ================================================================ */}
      <section className="bg-slate-900 text-white py-24 px-6 md:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-left">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              We're Looking For <br />
              People Who
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-lg leading-relaxed">
              Qualifications matter, but alignment with our core execution culture matters more. We build systems that clients depend on, so accountability and attention to detail are vital.
            </p>
          </div>

          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Take Ownership",
              "Love Solving Problems",
              "Enjoy Learning",
              "Care About Customers",
              "Communicate Effectively",
              "Value Professionalism",
              "Work Well In Teams",
              "Adapt To New Technologies"
            ].map((trait, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-6 h-6 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 flex items-center justify-center text-[#10b981] flex-shrink-0">
                  <CheckCircle size={14} />
                </div>
                <span className="font-extrabold text-xs md:text-sm tracking-wide text-slate-100">{trait}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          5. CURRENT OPENINGS
          ================================================================ */}
      <section ref={jobsRef} className="py-24 px-6 md:px-16 max-w-7xl mx-auto space-y-12">
        <div className="max-w-xl text-left space-y-3">
          <div className="text-xs uppercase font-extrabold tracking-widest text-[#2559bd]">Join Our Journey</div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0d1b3e]">Current Openings</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Select an opening below to view responsibilities, required experience, and apply.
          </p>
        </div>

        {/* Jobs Accordion */}
        <div className="space-y-4 max-w-4xl">
          {jobOpenings.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <div
                key={job.id}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? "border-[#2559bd] shadow-md bg-white" : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                {/* Header (Always Visible) */}
                <div
                  onClick={() => toggleAccordion(job.id)}
                  className="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer"
                  role="button"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-2">
                    <h3 className="font-black text-lg md:text-xl text-[#0d1b3e]">{job.title}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs md:text-sm text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#2559bd]" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase size={14} className="text-[#10b981]" />
                        {job.experience}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-amber-500" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <button className="p-2.5 rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-[#2559bd] transition-colors self-end sm:self-auto">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {/* Expanded Details (Accordion Panel) */}
                {isExpanded && (
                  <div className="px-6 pb-8 md:px-8 border-t border-slate-100 pt-6 space-y-6 text-left text-xs md:text-sm animate-fade-in">
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-[#0d1b3e] uppercase tracking-wider text-[10px]">Role Overview</h4>
                      <p className="text-slate-600 leading-relaxed font-medium">{job.overview}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-extrabold text-[#0d1b3e] uppercase tracking-wider text-[10px]">Key Responsibilities</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600 font-medium">
                          {job.responsibilities.map((res, i) => (
                            <li key={i}>{res}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-extrabold text-[#0d1b3e] uppercase tracking-wider text-[10px]">Requirements</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600 font-medium">
                          {job.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {job.preferredCertifications && (
                      <div className="space-y-2">
                        <h4 className="font-extrabold text-[#0d1b3e] uppercase tracking-wider text-[10px]">Preferred Certifications</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600 font-medium">
                          {job.preferredCertifications.map((cert, i) => (
                            <li key={i}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {job.preferredSkills && (
                      <div className="space-y-2">
                        <h4 className="font-extrabold text-[#0d1b3e] uppercase tracking-wider text-[10px]">Preferred Skills</h4>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600 font-medium">
                          {job.preferredSkills.map((skill, i) => (
                            <li key={i}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="space-y-2 bg-[#2559bd]/5 border border-[#2559bd]/10 p-4 rounded-xl">
                      <h4 className="font-extrabold text-[#2559bd] uppercase tracking-wider text-[10px]">Growth Opportunities</h4>
                      <p className="text-slate-600 leading-relaxed font-semibold">{job.growthOpportunities}</p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => openCareerApplication(job.title)}
                        className="px-6 py-3 bg-[#2559bd] text-white font-bold rounded-lg hover:bg-[#1f4a9e] transition-colors shadow-sm cursor-pointer"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================
          6. GENERAL APPLICATION SECTION
          ================================================================ */}
      <section className="bg-slate-50 border-y border-slate-100 py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-left">
            <h3 className="text-xl md:text-2xl font-black text-[#0d1b3e]">Don't See A Suitable Role?</h3>
            <p className="text-slate-500 text-xs md:text-sm font-medium">
              We're always interested in meeting talented professionals who are passionate about technology and customer success.
            </p>
          </div>
          <button
            onClick={() => openCareerApplication()}
            className="px-6 py-3.5 bg-white border-2 border-slate-200 text-[#0d1b3e] font-extrabold rounded-lg hover:border-[#2559bd] hover:text-[#2559bd] transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap"
          >
            Submit General Application
          </button>
        </div>
      </section>

      {/* Footer Component */}
      <Footer navigate={navigate} />
    </div>
  );
}
