import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  Building,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  Send,
  User,
  Activity,
  Layers,
  Sparkles,
  Award,
  ShieldCheck,
  Laptop,
  Video,
  Presentation,
  Volume2,
  Monitor,
  HeartPulse,
  Landmark,
  School,
  ShoppingBag,
  Home as HomeIcon,
  X,
  ExternalLink,
  Copy,
  Check
} from "lucide-react";
import { NetworkBackground } from "../components/visualizers/NetworkBackground";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { sanitizeString } from "../utils/sanitize";
import { useSEO } from "../hooks/useSEO";
import { useRevealObserver } from "../hooks/useRevealObserver";
import { scrollToElement } from "../utils/scrollUtils";
import { submitLeadToWeb3Forms } from "../services/web3forms";

export default function Contact({ navigate }: { navigate: (path: string) => void }) {
  const [formStep, setFormStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepError, setStepError] = useState("");

  // Guided Form States
  const [selectedSpace, setSelectedSpace] = useState("");
  const [requirementText, setRequirementText] = useState("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: ""
  });
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [projectTimeline, setProjectTimeline] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const emailStr = "sales@avimpact.in";
    
    // Redirect to Gmail Web Compose in a new tab
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${emailStr}`, "_blank", "noopener,noreferrer");

    const fallbackCopy = () => {
      const textArea = document.createElement("textarea");
      textArea.value = emailStr;
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        const successful = document.execCommand("copy");
        if (successful) {
          setEmailCopied(true);
          setTimeout(() => setEmailCopied(false), 3000);
        }
      } catch (err) {
        console.error("Fallback copy failed:", err);
      }
      document.body.removeChild(textArea);
    };

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailStr)
          .then(() => {
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 3000);
          })
          .catch((err) => {
            console.error("Failed to write to clipboard via API:", err);
            fallbackCopy();
          });
      } else {
        fallbackCopy();
      }
    } catch (err) {
      console.error("Failed to copy email:", err);
      fallbackCopy();
    }
  };

  const formRef = useRef<HTMLDivElement>(null);
  useSEO("/contact");
  useRevealObserver();



  const handleNextStep = () => {
    if (formStep === 1 && !selectedSpace) {
      setStepError("Please select a space type to continue.");
      return;
    }
    if (formStep === 2 && !requirementText.trim()) {
      setStepError("Please enter a brief description of your requirement.");
      return;
    }
    setStepError("");
    setFormStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setFormStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone || !contactInfo.city) {
      setStepError("Please fill in all required contact fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email.trim())) {
      setStepError("Please enter a valid email address.");
      return;
    }
    if (!/^\+?[0-9\s-]{8,15}$/.test(contactInfo.phone.trim())) {
      setStepError("Please enter a valid mobile number.");
      return;
    }

    // Sanitize inputs before state transition and storage
    const sanitizedContactInfo = {
      name: sanitizeString(contactInfo.name),
      company: sanitizeString(contactInfo.company),
      email: sanitizeString(contactInfo.email),
      phone: sanitizeString(contactInfo.phone),
      city: sanitizeString(contactInfo.city)
    };
    const sanitizedRequirement = sanitizeString(requirementText);
    const sanitizedSpace = sanitizeString(selectedSpace);
    const sanitizedTimeline = sanitizeString(projectTimeline);

    setIsSubmitting(true);
    setStepError("");

    try {
      await submitLeadToWeb3Forms("contact-page", {
        name: sanitizedContactInfo.name,
        company: sanitizedContactInfo.company,
        email: sanitizedContactInfo.email,
        phone: sanitizedContactInfo.phone,
        city: sanitizedContactInfo.city,
        requirement: sanitizedRequirement,
        space_type: sanitizedSpace,
        project_timeline: sanitizedTimeline
      });
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting contact lead:", err);
      setStepError("We could not submit the enquiry right now. Please check the Web3Forms access key or try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>, maxRotation = 6) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateY = ((x - xc) / xc) * maxRotation;
    const rotateX = -((y - yc) / yc) * maxRotation;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div className="min-h-screen bg-white text-[#0d1b3e] font-sans antialiased overflow-x-hidden">
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 select-none pointer-events-none opacity-40 z-0">
        <NetworkBackground />
      </div>

      {/* Navigation Header */}
      <Navbar currentPath="/contact" navigate={navigate} />

      {/* ================================================================
          1. HERO SECTION
          ================================================================ */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 px-6 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 z-10">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2559bd]/10 border border-[#2559bd]/20 rounded-full text-xs font-bold text-[#2559bd] tracking-wide uppercase">
            <Sparkles size={12} className="animate-pulse" />
            Start Your AV Consultation
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#0d1b3e] leading-tight">
            Let's Discuss Your <br />
            <span className="bg-gradient-to-r from-[#2559bd] to-[#10b981] bg-clip-text text-transparent">
              AV Requirements
            </span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-xl leading-relaxed">
            Whether you're planning a meeting room, auditorium, classroom, command center, or event space, our team can help identify the right solution for your needs and budget.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => scrollToElement(formRef)}
              className="px-8 py-4 bg-[#2559bd] text-white font-extrabold rounded-full text-sm hover:bg-[#1f4a9e] transition-all transform hover:-translate-y-0.5 shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
            >
              Book Free Consultation <ArrowRight size={16} />
            </button>
            <a
              href="tel:+919685453058"
              className="px-8 py-4 bg-transparent border-2 border-slate-200 text-[#0d1b3e] font-extrabold rounded-full text-sm hover:border-[#2559bd]/30 hover:bg-[#2559bd]/5 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer inline-flex items-center gap-2 justify-center"
            >
              <Phone size={16} /> Call Our Team
            </a>
          </div>

          {/* Response Promise Banner */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-around text-left shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider leading-none">Response SLA</span>
                <span className="text-xs font-black text-slate-800">Proposal in 4 business hours</span>
              </div>
            </div>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#2559bd] animate-pulse shrink-0" />
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider leading-none">Consultation SLA</span>
                <span className="text-xs font-black text-slate-800">Meeting in 1 business day</span>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Graphic Visual */}
        <div className="flex-1 w-full relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#2559bd] to-[#10b981] rounded-3xl opacity-20 blur-xl" />
          <div className="relative bg-white/70 border border-slate-100 rounded-2xl overflow-hidden shadow-2xl p-6 backdrop-blur-md flex flex-col justify-center min-h-[300px]">
            {/* Animated Communication Waves Graphic */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#10b981] animate-ping" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">AV Integration Active</span>
              </div>
              
              {/* Soundwaves SVG Animation */}
              <div className="h-24 flex items-center justify-center gap-1.5 bg-slate-50 rounded-xl p-4 border border-slate-100 overflow-hidden">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((bar) => (
                  <div
                    key={bar}
                    className="w-1.5 bg-gradient-to-t from-[#2559bd] to-[#10b981] rounded-full transition-all duration-300"
                    style={{
                      height: `${Math.floor(Math.random() * 80) + 20}%`,
                      animation: `wave-bounce ${0.8 + bar * 0.05}s ease-in-out infinite alternate`
                    }}
                  />
                ))}
              </div>

              {/* Status checklist */}
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#10b981]" /> Video Conferencing
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#10b981]" /> Interactive Displays
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#10b981]" /> Professional Audio
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#10b981]" /> Control Systems
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. QUICK CONTACT OPTIONS
          ================================================================ */}
      <section className="bg-slate-50 py-24 px-6 md:px-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-xl text-left space-y-3">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0d1b3e]">Quick Connect Channels</h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              We make reaching our systems engineers effortless. Choose the communication channel that fits your timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* CALL US */}
            <div
              onMouseMove={(e) => handleTiltMove(e, 8)}
              onMouseLeave={handleTiltLeave}
              className="bg-white border border-slate-100 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#2559bd]/10 flex items-center justify-center text-[#2559bd]">
                  <Phone size={22} />
                </div>
                <h3 className="font-extrabold text-base text-[#0d1b3e]">Call Us</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  Speak directly with our technical presales engineers.
                </p>
                <div className="text-xs md:text-sm font-bold text-slate-700">+91 96854 53058</div>
              </div>
              <a
                href="tel:+919685453058"
                className="mt-6 w-full text-center py-2.5 bg-slate-50 hover:bg-[#2559bd]/5 hover:text-[#2559bd] text-[#0d1b3e] rounded-lg font-bold text-xs md:text-sm transition-colors cursor-pointer"
              >
                Call Now
              </a>
            </div>

            {/* WHATSAPP */}
            <div
              onMouseMove={(e) => handleTiltMove(e, 8)}
              onMouseLeave={handleTiltLeave}
              className="bg-white border border-slate-100 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                  <MessageSquare size={22} />
                </div>
                <h3 className="font-extrabold text-base text-[#0d1b3e]">WhatsApp</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  Quick questions, media sharing, and instant discussions.
                </p>
              </div>
              <a
                href="https://wa.me/919685453058"
                target="_blank"
                rel="noreferrer"
                className="mt-6 w-full text-center py-2.5 bg-slate-50 hover:bg-[#10b981]/5 hover:text-[#10b981] text-[#0d1b3e] rounded-lg font-bold text-xs md:text-sm transition-colors cursor-pointer"
              >
                Chat On WhatsApp
              </a>
            </div>

            {/* EMAIL */}
            <div
              onMouseMove={(e) => handleTiltMove(e, 8)}
              onMouseLeave={handleTiltLeave}
              className="bg-white border border-slate-100 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Mail size={22} />
                </div>
                <h3 className="font-extrabold text-base text-[#0d1b3e]">Email</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  Send formal RFPs, blueprints, and detailed layouts.
                </p>
                <div className="text-xs md:text-sm font-bold text-slate-700">sales@avimpact.in</div>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailModal(true)}
                className="mt-6 w-full text-center py-2.5 bg-slate-50 hover:bg-amber-500/5 hover:text-amber-500 text-[#0d1b3e] rounded-lg font-bold text-xs md:text-sm transition-colors cursor-pointer border-none"
              >
                Send Email
              </button>
            </div>

            {/* BOOK CONSULTATION */}
            <div
              onMouseMove={(e) => handleTiltMove(e, 8)}
              onMouseLeave={handleTiltLeave}
              className="bg-white border border-slate-100 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500">
                  <Calendar size={22} />
                </div>
                <h3 className="font-extrabold text-base text-[#0d1b3e]">Book Consultation</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  Lock in a scheduled meeting slot with an AV architect.
                </p>
              </div>
              <button
                onClick={() => scrollToElement(formRef)}
                className="mt-6 w-full text-center py-2.5 bg-slate-50 hover:bg-violet-500/5 hover:text-violet-500 text-[#0d1b3e] rounded-lg font-bold text-xs md:text-sm transition-colors cursor-pointer border-none"
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          3. GUIDED INQUIRY FORM (Interactive consultation planner)
          ================================================================ */}
      <section ref={formRef} className="py-24 px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: The Interactive Form Journey */}
        <div 
          className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 md:p-12 shadow-sm space-y-8 text-left"
        >
          
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-[#0d1b3e]">Tell Us About Your Project</h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium">
              We design audio-visual systems tailored strictly to your operational goals. Follow the steps below.
            </p>
          </div>

          {/* Why Clients Contact Us Grid */}
          <div className="space-y-3 pt-2">
            <h3 className="font-extrabold text-xs text-[#2559bd] uppercase tracking-wider">Why Clients Contact Us</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {[
                { title: "Meeting Rooms", desc: "Teams/Zoom room setups." },
                { title: "Auditorium Systems", desc: "Professional acoustics & speech lines." },
                { title: "Interactive Classrooms", desc: "Touch panels & lecture capture." },
                { title: "Video Conferencing", desc: "Boardrooms & remote hybrid syncs." },
                { title: "AV Upgrades", desc: "Upgrading legacy layouts & wiring." }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl space-y-1 hover:border-[#2559bd]/20 transition-all">
                  <h4 className="text-xs font-bold text-[#0d1b3e] leading-snug">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-normal font-semibold">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {formSubmitted ? (
            <div className="bg-[#10b981]/10 border border-[#10b981]/20 p-8 rounded-2xl text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#10b981]/20 text-[#10b981] flex items-center justify-center mx-auto">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-black text-[#0d1b3e]">Thank You For Contacting AV Impact</h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-md mx-auto">
                Our team has received your inquiry and will review your requirements shortly.
              </p>
              <div className="bg-[#10b981]/5 border border-[#10b981]/10 px-4 py-2.5 rounded-lg inline-block text-xs font-bold text-[#10b981]">
                Expected Response Time: Within One Business Day
              </div>
              <div className="flex gap-4 justify-center pt-4">
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-bold hover:bg-slate-50 transition-colors cursor-pointer text-xs md:text-sm"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormStep(1);
                    setSelectedSpace("");
                    setRequirementText("");
                    setContactInfo({ name: "", company: "", email: "", phone: "", city: "" });
                    setProjectTimeline("");
                    setShowOptionalFields(false);
                    setStepError("");
                  }}
                  className="px-6 py-2.5 bg-[#2559bd] text-white rounded-lg font-bold hover:bg-[#1f4a9e] transition-colors cursor-pointer text-xs md:text-sm"
                >
                  Schedule Another
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Stepper Progress Bar */}
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      step <= formStep ? "bg-[#2559bd]" : "bg-slate-100"
                    }`}
                  />
                ))}
              </div>

              {/* STEP 1: Space Type */}
              {formStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-extrabold text-base md:text-lg text-[#0d1b3e]">Step 1: What type of space are you planning?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      "Meeting Room",
                      "Auditorium",
                      "Classroom",
                      "Training Room",
                      "Event Space",
                      "Command Center",
                      "Not Sure Yet"
                    ].map((space) => {
                      const isSelected = selectedSpace === space;
                      return (
                        <button
                          key={space}
                          type="button"
                          onClick={() => { setSelectedSpace(space); setStepError(""); }}
                          aria-pressed={isSelected}
                          className={`border p-4 rounded-xl cursor-pointer text-center font-bold text-xs md:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isSelected
                              ? "border-[#2559bd] bg-[#2559bd]/5 text-[#2559bd] shadow-sm"
                              : "border-slate-200 bg-white hover:border-slate-300 text-slate-600"
                          }`}
                        >
                          {space}
                        </button>
                      );
                    })}
                  </div>
                  {stepError && formStep === 1 && (
                    <p role="alert" className="text-rose-500 text-xs font-semibold mt-2">{stepError}</p>
                  )}
                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-[#2559bd] hover:bg-[#1f4a9e] text-white rounded-lg font-bold text-xs md:text-sm flex items-center gap-2 cursor-pointer border-none"
                    >
                      Next Step <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Requirement Description */}
              {formStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-extrabold text-base md:text-lg text-[#0d1b3e]">Step 2: Tell us about your requirement</h3>
                  <textarea
                    rows={6}
                    required
                    placeholder="We are planning a new boardroom for 20 people with hybrid meeting capabilities."
                    value={requirementText}
                    onChange={(e) => setRequirementText(e.target.value)}
                    className="w-full border border-slate-200 rounded-2xl p-4 text-xs md:text-sm focus:border-[#2559bd] focus:ring-1 focus:ring-[#2559bd] outline-none transition-colors"
                  />
                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={handlePrevStep}
                      className="px-6 py-3 border border-slate-200 text-slate-600 rounded-lg font-bold text-xs md:text-sm cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-[#2559bd] hover:bg-[#1f4a9e] text-white rounded-lg font-bold text-xs md:text-sm flex items-center gap-2 cursor-pointer border-none"
                    >
                      Next Step <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Contact Information */}
              {formStep === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                  <h3 className="font-extrabold text-base md:text-lg text-[#0d1b3e]">Step 3: Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:border-[#2559bd] outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:border-[#2559bd] outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:border-[#2559bd] outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">City *</label>
                      <input
                        type="text"
                        required
                        placeholder="Indore"
                        value={contactInfo.city}
                        onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:border-[#2559bd] outline-none"
                      />
                    </div>
                  </div>

                  {/* Expandable Optional Fields */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setShowOptionalFields(!showOptionalFields)}
                      className="text-xs font-bold text-secondary flex items-center gap-1 hover:text-primary transition-colors cursor-pointer mt-2"
                    >
                      {showOptionalFields ? "− Hide Company & Project Details" : "+ Add Company & Project Details (Optional)"}
                    </button>
                    
                    {showOptionalFields && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 animate-fade-in">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Company Name</label>
                          <input
                            type="text"
                            placeholder="Company Ltd"
                            value={contactInfo.company}
                            onChange={(e) => setContactInfo({ ...contactInfo, company: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:border-[#2559bd] outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Project Timeline</label>
                          <select
                            value={projectTimeline}
                            onChange={(e) => setProjectTimeline(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:border-[#2559bd] outline-none"
                          >
                            <option value="">Select Timeline</option>
                            <option value="immediate">Immediate (Within 1 month)</option>
                            <option value="planning">Planning (1-3 months)</option>
                            <option value="budgeting">Budgeting phase</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                  {stepError && formStep === 3 && (
                    <p role="alert" className="text-rose-500 text-xs font-semibold">{stepError}</p>
                  )}
                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 border border-slate-200 text-slate-600 rounded-lg font-bold text-xs md:text-sm cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 bg-[#2559bd] hover:bg-[#1f4a9e] text-white rounded-lg font-bold text-xs md:text-sm flex items-center gap-2 cursor-pointer border-none shadow-sm"
                    >
                      {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Get Expert Recommendations <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Value Section & Response Promise */}
        <div className="lg:col-span-4 space-y-8 text-left">
          
          {/* What You'll Receive Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 space-y-6">
            <h3 className="font-extrabold text-base md:text-lg text-[#0d1b3e] border-b border-slate-200 pb-3">
              What You'll Receive
            </h3>
            <div className="space-y-4">
              {[
                { title: "Solution Recommendations", desc: "Hardware and architecture ideas." },
                { title: "Budget Guidance", desc: "Accurate cost estimates." },
                { title: "Technology Suggestions", desc: "Protocols and display types." },
                { title: "Product Recommendations", desc: "Top-tier OEM components." },
                { title: "Expert Consultation", desc: "1-on-1 discuss with our architects." },
                { title: "No Obligation Discussion", desc: "100% free, zero pressure." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#10b981]/15 text-[#10b981] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0d1b3e]">{item.title}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Promise */}
          <div className="bg-[#000924] text-white border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
            <h3 className="font-extrabold text-base md:text-lg border-b border-white/10 pb-3">
              What Happens Next?
            </h3>
            <div className="space-y-6 text-xs">
              {[
                { step: "1", title: "We Review Your Requirement", desc: "Our design desk analyzes spatial acoustics." },
                { step: "2", title: "We Contact You", desc: "Within 24 hours to clear up scope points." },
                { step: "3", title: "We Recommend Solutions", desc: "Draft outline topologies and bill-of-materials." },
                { step: "4", title: "We Schedule Consultation", desc: "Optional video call to adjust variables." },
                { step: "5", title: "We Provide Proposal", desc: "Complete official quote & technical schematics." }
              ].map((step, idx) => (
                <div key={idx} className="relative flex gap-4 items-start">
                  {/* Connecting Line segment */}
                  {idx < 4 && (
                    <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-white/20 -translate-x-1/2" style={{ minHeight: "24px" }} />
                  )}
                  {/* Number bubble */}
                  <div className="w-6 h-6 rounded-full bg-[#2559bd] border-2 border-[#000924] flex items-center justify-center text-[10px] font-bold shrink-0 z-10">
                    {step.step}
                  </div>
                  <div className="space-y-0.5 pt-0.5">
                    <h4 className="font-bold text-slate-200 text-xs md:text-sm">{step.title}</h4>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================================================================
          4. OFFICE INFORMATION
          ================================================================ */}
      <section className="bg-slate-50 border-y border-slate-100 py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div 
            className="lg:col-span-5 space-y-6 text-left"
          >
            <div className="text-xs uppercase font-extrabold tracking-widest text-[#2559bd]">In-Person Meeting</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0d1b3e]">Visit Our Office</h2>
            
            <div className="space-y-4 text-xs md:text-sm font-semibold text-slate-600">
              <div className="flex gap-3">
                <MapPin size={18} className="text-[#2559bd] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#0d1b3e] font-bold">Indore Office</div>
                  <p className="text-slate-500 font-medium">101, Balaji Heights, Geeta Bhawan, Indore, M.P. 452001, India</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock size={18} className="text-[#2559bd] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#0d1b3e] font-bold">Business Hours</div>
                  <p className="text-slate-500 font-medium">Mon–Sat: 10:30 AM – 7:30 PM (Sunday Closed)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone size={18} className="text-[#2559bd] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#0d1b3e] font-bold">Inquiries</div>
                  <p className="text-slate-500 font-medium">+91 96854 53058</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail size={18} className="text-[#2559bd] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#0d1b3e] font-bold">Sales Desk</div>
                  <a href="mailto:sales@avimpact.in" className="text-slate-500 font-medium hover:text-[#2559bd] transition-colors">
                    sales@avimpact.in
                  </a>
                </div>
              </div>
            </div>

             <div className="pt-2">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=101,+Balaji+Heights,+Geeta+Bhawan,+Indore,+M.P.+452001"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-[#2559bd] hover:bg-[#1f4a9e] text-white font-bold rounded-lg text-xs md:text-sm transition-colors shadow-sm inline-flex items-center gap-2"
              >
                Get Directions <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Interactive Map Iframe Placeholder */}
          <div 
            className="lg:col-span-7 w-full h-[400px] rounded-2xl overflow-hidden border border-slate-200 relative group"
          >
            <iframe
              title="AV Impact Indore Office Location"
              src="https://maps.google.com/maps?q=101,%20Balaji%20Heights,%20Geeta%20Bhawan,%20Indore,%20M.P.%20452001&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

        </div>
      </section>

      {/* ================================================================
          5. SERVICE AREAS
          ================================================================ */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto space-y-12">
        <div className="max-w-xl mx-auto text-center space-y-3">
          <div className="text-xs uppercase font-extrabold tracking-widest text-[#2559bd]">Tailored Deployments</div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0d1b3e]">Industries & Spaces We Support</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Our teams support corporate, educational, governmental, retail, and residential facilities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Corporate Offices", icon: Building },
            { label: "Educational Institutions", icon: School },
            { label: "Government Organizations", icon: Landmark },
            { label: "Healthcare Facilities", icon: HeartPulse },
            { label: "Retail Outlets", icon: ShoppingBag },
            { label: "Residential Spaces", icon: HomeIcon },
            { label: "Training Centers", icon: Presentation },
            { label: "Auditoriums", icon: Volume2 },
            { label: "Conference Rooms", icon: Video },
            { label: "Event Venues", icon: Sparkles }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-100 p-6 rounded-2xl text-center space-y-3 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2559bd]/5 text-[#2559bd] flex items-center justify-center mx-auto">
                  <Icon size={20} />
                </div>
                <div className="font-extrabold text-xs md:text-sm text-[#0d1b3e]">{item.label}</div>
              </div>
            );
          })}
        </div>
      </section>



      {/* Footer Component */}
      <Footer navigate={navigate} />

      {/* Professional Email Client Selection Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-[#0d1b3e]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative animate-fade-in text-center space-y-6">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer border-none bg-transparent"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#2559bd]/15 text-[#2559bd] flex items-center justify-center mx-auto">
              <Mail size={24} />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-[#0d1b3e]">Contact Sales Desk</h3>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                Compose an email to <span className="text-[#2559bd] font-bold">sales@avimpact.in</span> using one of the channels below:
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Option 1: Outlook Web */}
              <button
                onClick={() => {
                  window.open("https://outlook.live.com/mail/0/deeplink/compose?to=sales@avimpact.in", "_blank", "noopener,noreferrer");
                  setShowEmailModal(false);
                }}
                className="w-full py-3.5 px-4 bg-slate-50 hover:bg-[#0078d4]/10 border border-slate-100 hover:border-[#0078d4]/20 rounded-xl font-extrabold text-xs md:text-sm text-[#0d1b3e] flex items-center gap-3 transition-all active:scale-98 cursor-pointer text-left border-none"
              >
                <span className="w-8 h-8 rounded-lg bg-[#0078d4]/10 text-[#0078d4] flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </span>
                <div className="flex-1">
                  <div className="font-bold text-slate-800 text-xs md:text-sm">Outlook Web</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-0.5">Use Office 365 / Outlook.com</div>
                </div>
                <ExternalLink size={14} className="text-slate-400" />
              </button>

              {/* Option 2: Gmail Web */}
              <button
                onClick={() => {
                  window.open("https://mail.google.com/mail/?view=cm&fs=1&to=sales@avimpact.in", "_blank", "noopener,noreferrer");
                  setShowEmailModal(false);
                }}
                className="w-full py-3.5 px-4 bg-slate-50 hover:bg-rose-500/10 border border-slate-100 hover:border-rose-500/20 rounded-xl font-extrabold text-xs md:text-sm text-[#0d1b3e] flex items-center gap-3 transition-all active:scale-98 cursor-pointer text-left border-none"
              >
                <span className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </span>
                <div className="flex-1">
                  <div className="font-bold text-slate-800 text-xs md:text-sm">Gmail (Webmail)</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-0.5">Compose in your browser</div>
                </div>
                <ExternalLink size={14} className="text-slate-400" />
              </button>

              {/* Option 3: Default Mail App */}
              <a
                href="mailto:sales@avimpact.in"
                onClick={() => setShowEmailModal(false)}
                className="w-full py-3.5 px-4 bg-slate-50 hover:bg-[#2559bd]/10 border border-slate-100 hover:border-[#2559bd]/20 rounded-xl font-extrabold text-xs md:text-sm text-[#0d1b3e] flex items-center gap-3 transition-all active:scale-98 cursor-pointer text-left no-underline"
              >
                <span className="w-8 h-8 rounded-lg bg-[#2559bd]/10 text-[#2559bd] flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </span>
                <div className="flex-1">
                  <div className="font-bold text-slate-800 text-xs md:text-sm">Default Email App</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-0.5">Launch Outlook, Mail app, etc.</div>
                </div>
                <ExternalLink size={14} className="text-slate-400" />
              </a>

              {/* Option 4: Copy Email Address */}
              <button
                onClick={() => {
                  try {
                    navigator.clipboard.writeText("sales@avimpact.in");
                    setEmailCopied(true);
                    setTimeout(() => setEmailCopied(false), 3000);
                  } catch (err) {
                    const textArea = document.createElement("textarea");
                    textArea.value = "sales@avimpact.in";
                    textArea.style.position = "fixed";
                    textArea.style.opacity = "0";
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textArea);
                    setEmailCopied(true);
                    setTimeout(() => setEmailCopied(false), 3000);
                  }
                }}
                className="w-full py-3.5 px-4 bg-slate-50 hover:bg-emerald-500/10 border border-slate-100 hover:border-emerald-500/20 rounded-xl font-extrabold text-xs md:text-sm text-[#0d1b3e] flex items-center gap-3 transition-all active:scale-98 cursor-pointer text-left border-none"
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  emailCopied ? "bg-emerald-500/20 text-emerald-600" : "bg-emerald-500/10 text-emerald-500"
                }`}>
                  {emailCopied ? <Check size={16} /> : <Copy size={16} />}
                </span>
                <div className="flex-1">
                  <div className="font-bold text-slate-800 text-xs md:text-sm">
                    {emailCopied ? "Address Copied!" : "Copy to Clipboard"}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-0.5">Copy sales@avimpact.in</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
