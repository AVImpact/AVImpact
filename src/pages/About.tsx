import React, { useState } from "react";
import {
  Sparkles, ArrowRight, ShieldCheck, CheckCircle2,
  Globe, Award, Shield, Cpu, CalendarDays
} from "lucide-react";
import { NetworkBackground } from "../components/visualizers/NetworkBackground";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { useUI } from "../contexts/UIContext";
import { useSEO } from "../hooks/useSEO";
import { useTilt } from "../hooks/useTilt";
import { useRevealObserver } from "../hooks/useRevealObserver";
import { processSteps } from "../constants/aboutData";

export default function About({ navigate }: { navigate: (path: string) => void }) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { openLeadModal } = useUI();
  const { handleTiltMove, handleTiltLeave } = useTilt(5);
  useSEO("/about");
  useRevealObserver();





  return (
    <div className="bg-background text-on-background font-body-md text-body-md overflow-x-hidden selection:bg-secondary/20 selection:text-secondary antialiased relative">
      
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 select-none pointer-events-none opacity-40 z-0">
        <NetworkBackground />
      </div>

      {/* Navigation Header */}
      <Navbar currentPath="/about" navigate={navigate} />

      {/* ================================================================
          SECTION 1: HERO
          ================================================================ */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 px-6 md:px-16 max-w-7xl mx-auto flex flex-col items-center text-center z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-100/35 border border-blue-200/50 rounded-full text-xs font-bold text-[#2559bd] tracking-wide uppercase">
          <Sparkles size={12} className="animate-pulse" />
          Technology That Connects People, Spaces, and Ideas
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#0d1b3e] leading-[1.1] max-w-4xl mx-auto">
          Technology That Connects <br />
          <span className="bg-gradient-to-r from-[#2559bd] to-[#10b981] bg-clip-text text-transparent">
            People, Spaces, and Ideas.
          </span>
        </h1>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          AV Impact delivers integrated audio visual, collaboration, and communication solutions that help organizations work smarter.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => openLeadModal("quotation")}
            className="px-7 py-3.5 bg-[#2559bd] text-white rounded-full font-bold hover:bg-[#1f4a9e] transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          >
            Schedule Free Consultation
          </button>
          <a
            href="#story"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-7 py-3.5 bg-white border border-slate-200 text-[#2559bd] hover:bg-slate-50 rounded-full font-bold transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center gap-1.5 cursor-pointer"
          >
            Learn Our Story <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* ================================================================
          SECTION 2: COMPANY STORY
          ================================================================ */}
      <section id="story" className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-slate-100 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[10px] font-black uppercase text-secondary tracking-widest">Our Founding & Mission</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0d1b3e] leading-snug">
              Simplifying the Way Teams Collaborate
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              AV Impact was founded with a singular, clear vision: to design office technology environments where teams can focus entirely on collaborative ideas rather than troubleshooting connection issues.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">M</div>
                <div>
                  <h4 className="font-extrabold text-xs md:text-sm text-[#0d1b3e]">Our Mission</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mt-0.5">To eliminate meeting latency and build absolute communication equality across hybrid offices, universities, and command centers.</p>
                </div>
              </div>
              <div className="flex gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">V</div>
                <div>
                  <h4 className="font-extrabold text-xs md:text-sm text-[#0d1b3e]">Our Vision</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mt-0.5">To set the gold standard in workspace systems deployment, where physical boundaries fade through high-fidelity visual and audio engineering.</p>
                </div>
              </div>
              <div className="flex gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">I</div>
                <div>
                  <h4 className="font-extrabold text-xs md:text-sm text-[#0d1b3e]">Commitment to Innovation</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mt-0.5">Continuously testing, calibrating, and integrating open-architecture components that adapt to next-generation conferencing frameworks.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 w-full relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#2559bd] to-[#10b981] rounded-3xl opacity-15 blur-xl pointer-events-none" />
            <div className="relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xl p-4">
              <img
                src="/assets/boardroom_after.webp"
                alt="Modern collaborative workspace design by AV Impact"
                className="w-full rounded-xl object-cover aspect-video"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================================================================
          SECTION 3: OUR PROCESS
          ================================================================ */}
      <section className="bg-slate-50 py-24 px-6 md:px-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-xl text-left space-y-3">
            <span className="text-[10px] font-black uppercase text-secondary tracking-widest">Delivery Framework</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0d1b3e]">How We Guarantee Success</h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Our structured process ensures alignment with technical parameters and general construction milestones at every step.
            </p>
          </div>

          {/* Stepper Timeline Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Timeline Menu Column */}
            <div className="lg:col-span-5 space-y-2" role="tablist" aria-label="Project phases">
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activeStep === idx;
                return (
                  <button
                    key={idx}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`step-panel-${idx}`}
                    id={`step-tab-${idx}`}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border text-left cursor-pointer transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      isActive 
                        ? 'border-blue-500 bg-[#f0f5ff] text-blue-700 font-bold' 
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                        <Icon size={16} />
                      </span>
                      <span className="text-xs md:text-sm font-black tracking-tight">{step.step}</span>
                    </div>
                    <span className={`text-[10px] font-black ${isActive ? 'text-blue-500' : 'text-slate-350'}`}>{step.num}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Step Panel Card */}
            <div
              id={`step-panel-${activeStep}`}
              role="tabpanel"
              aria-labelledby={`step-tab-${activeStep}`}
              className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-8 md:p-10 shadow-lg relative min-h-[260px] flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-50/40 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <span className="text-[10px] font-black uppercase text-secondary tracking-widest">
                  Phase {processSteps[activeStep].num} Details
                </span>
                <h3 className="font-sans text-2xl font-black text-[#0d1b3e] leading-snug">
                  {processSteps[activeStep].step}
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {processSteps[activeStep].desc}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-600 mt-6">
                <CheckCircle2 size={16} />
                <span>Verified industry design checklist compliance</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================
          SECTION 4: WHY AV IMPACT
          ================================================================ */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto space-y-12 z-10 relative">
        <div className="max-w-xl text-left space-y-3">
          <span className="text-[10px] font-black uppercase text-secondary tracking-widest">Value Verification</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0d1b3e]">Why Choose AV Impact</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            We prioritize high-end signal engineering, direct OEM relationships, and lifetime support pathways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { title: "End-to-End Delivery", desc: "From physical surveys and CAD schematics to final acoustic commissioning, we own the complete lifecycle.", icon: Globe },
            { title: "Industry Expertise", desc: "Our CTS-D and CTS-I designers select audio and display specifications tailored to your space limits.", icon: Award },
            { title: "Certified Partners", desc: "Integration access to top brands (Jabra, Cisco, Bose, Crestron, Kramer) ensures authentic warranties and direct firmware updates.", icon: Shield },
            { title: "Scalable Solutions", desc: "We design open-architecture, scalable layouts allowing you to add future sources or displays with ease.", icon: Cpu },
            { title: "Long-Term Support", desc: "Commitment to rapid response SLA contracts, preventative system health tune-ups, and diagnostic monitoring.", icon: ShieldCheck }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onMouseMove={(e) => handleTiltMove(e, 5)}
                onMouseLeave={handleTiltLeave}
                className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left col-span-1"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-extrabold text-xs md:text-sm text-[#0d1b3e]">{item.title}</h3>
                  <p className="text-slate-550 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================
          SECTION 5: COMPANY STATISTICS
          ================================================================ */}
      <section className="bg-slate-900 text-white py-24 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
          {[
            { label: "Projects Completed", value: "350+" },
            { label: "Cities Served", value: "25+" },
            { label: "Industries Supported", value: "8" },
            { label: "Years of Experience", value: "12+" }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-4xl md:text-5xl font-black text-[#10b981]">{stat.value}</div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          SECTION 6: CTA (Schedule Consultation)
          ================================================================ */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto z-10 relative">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[32px] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10 flex flex-col items-center">
            <CalendarDays size={48} className="text-blue-200 animate-bounce" />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Ready to Upgrade Your Workspace?
            </h2>
            <p className="text-blue-100 text-xs md:text-sm leading-relaxed max-w-md mx-auto">
              Schedule a free consultation layout design audit with our AV engineering specialists today. We will configure an outcomes blueprint staging report.
            </p>
            <button
              onClick={() => openLeadModal("quotation")}
              className="px-8 py-4 bg-white text-blue-600 hover:bg-slate-50 font-bold rounded-full text-xs md:text-sm shadow-xl active:scale-95 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white focus:outline-none cursor-pointer mt-4"
            >
              Book Consultation Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer navigate={navigate} />
    </div>
  );
}
