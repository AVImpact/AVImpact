import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X, Mail, CheckCircle2, Phone, Building,
  School, Landmark, Send, ChevronRight,
  Lightbulb, User, Sparkles, Video, Monitor
} from "lucide-react";
import { useUI } from "../../contexts/UIContext";
import { useLeadContext } from "../../contexts/LeadContext";
import { validateEmail } from "../../utils/validation/emailValidation";
import { trackEvent } from "../../utils/analyticsEvents";

export function LeadModal() {
  const { isLeadModalOpen, leadModalType, closeLeadModal } = useUI();
  const { submitLead } = useLeadContext();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [scrollEmail, setScrollEmail] = useState("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showOptionalDetails, setShowOptionalDetails] = useState(false);
  const [scrollEmailSuggestion, setScrollEmailSuggestion] = useState<string | undefined>(undefined);
  const [consultationEmailSuggestion, setConsultationEmailSuggestion] = useState<string | undefined>(undefined);

  // Form states matching Step 1 to 3 of the AV Consultation Assistant
  const [consultationData, setConsultationData] = useState({
    spaceType: "",
    roomSize: "",
    fullName: "",
    emailAddress: "",
    mobileNumber: "",
    companyName: "",
    preferredContact: "Email" as "Call" | "Email" | "WhatsApp"
  });

  // Ref for focus management
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Reset form and lock body scroll when modal opens
  useEffect(() => {
    if (isLeadModalOpen) {
      // Store the element that triggered the modal so we can restore focus on close
      previousFocusRef.current = document.activeElement as HTMLElement;

      setSubmitted(false);
      setIsSubmitting(false);
      setSubmitError("");
      setErrors({});
      setScrollEmail("");
      setCurrentStep(1);
      setShowOptionalDetails(false);
      setScrollEmailSuggestion(undefined);
      setConsultationEmailSuggestion(undefined);
      setConsultationData({
        spaceType: "",
        roomSize: "",
        fullName: "",
        emailAddress: "",
        mobileNumber: "",
        companyName: "",
        preferredContact: "Email"
      });
      document.body.style.overflow = "hidden";

      // Fire analytics event
      trackEvent.contactFormOpen(leadModalType);

      // Move focus into the modal after it renders
      requestAnimationFrame(() => {
        const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      });
    } else {
      document.body.style.overflow = "";
      // Restore focus to the element that opened the modal
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLeadModalOpen]);

  // Focus trap + Escape key handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isLeadModalOpen) return;

    if (e.key === "Escape") {
      closeLeadModal();
      return;
    }

    if (e.key === "Tab" && modalRef.current) {
      const focusableSelectors = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
      ).filter((el: HTMLElement) => el.offsetParent !== null); // visible only

      if (focusable.length === 0) return;

      const first = focusable.at(0) as HTMLElement;
      const last = focusable.at(-1) as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }, [isLeadModalOpen, closeLeadModal]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleScrollEmailBlur = () => {
    const trimmedVal = scrollEmail.trim();
    setScrollEmail(trimmedVal);
    const result = validateEmail(trimmedVal);
    if (!result.isValid) {
      setErrors(prev => ({ ...prev, scrollEmail: result.error || "Please enter a valid email address." }));
      setScrollEmailSuggestion(undefined);
    } else {
      setErrors(prev => {
        const next = { ...prev };
        delete next.scrollEmail;
        return next;
      });
      setScrollEmailSuggestion(result.suggestion);
    }
  };

  const handleScrollEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setScrollEmail(val);
    
    if (errors.scrollEmail) {
      const result = validateEmail(val);
      if (result.isValid) {
        setErrors(prev => {
          const next = { ...prev };
          delete next.scrollEmail;
          return next;
        });
        setScrollEmailSuggestion(result.suggestion);
      }
    } else {
      const result = validateEmail(val);
      setScrollEmailSuggestion(result.suggestion);
    }
  };

  const handleConsultationEmailBlur = () => {
    const trimmedVal = consultationData.emailAddress.trim();
    setConsultationData(prev => ({ ...prev, emailAddress: trimmedVal }));
    const result = validateEmail(trimmedVal);
    if (!result.isValid) {
      setErrors(prev => ({ ...prev, emailAddress: result.error || "Please enter a valid email address." }));
      setConsultationEmailSuggestion(undefined);
    } else {
      setErrors(prev => {
        const next = { ...prev };
        delete next.emailAddress;
        return next;
      });
      setConsultationEmailSuggestion(result.suggestion);
    }
  };

  const handleConsultationEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setConsultationData(prev => ({ ...prev, emailAddress: val }));
    
    if (errors.emailAddress) {
      const result = validateEmail(val);
      if (result.isValid) {
        setErrors(prev => {
          const next = { ...prev };
          delete next.emailAddress;
          return next;
        });
        setConsultationEmailSuggestion(result.suggestion);
      }
    } else {
      const result = validateEmail(val);
      setConsultationEmailSuggestion(result.suggestion);
    }
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (!consultationData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!consultationData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(consultationData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Please enter a valid mobile number";
    }

    const trimmedEmail = consultationData.emailAddress.trim();
    setConsultationData(prev => ({ ...prev, emailAddress: trimmedEmail }));

    const emailResult = validateEmail(trimmedEmail);
    if (!emailResult.isValid) {
      newErrors.emailAddress = emailResult.error || "Please enter a valid email address.";
      setConsultationEmailSuggestion(undefined);
    } else {
      setConsultationEmailSuggestion(emailResult.suggestion);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) {
      setIsSubmitting(true);
      setSubmitError("");
      const sent = await submitLead("consultation", {
        spaceType: consultationData.spaceType,
        roomSize: consultationData.roomSize,
        fullName: consultationData.fullName,
        emailAddress: consultationData.emailAddress.trim(),
        mobileNumber: consultationData.mobileNumber,
        companyName: consultationData.companyName,
        preferredContact: consultationData.preferredContact
      });
      setIsSubmitting(false);
      if (sent) {
        trackEvent.solutionDesignerComplete(consultationData.spaceType, consultationData.roomSize);
        trackEvent.contactFormSubmit(leadModalType, consultationData.spaceType);
        setSubmitted(true);
      } else {
        setSubmitError("We could not submit the enquiry right now. Please check the Web3Forms access key or try again.");
      }
    }
  };

  const handleScrollEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedVal = scrollEmail.trim();
    setScrollEmail(trimmedVal);
    const result = validateEmail(trimmedVal);
    if (!result.isValid) {
      setErrors({ scrollEmail: result.error || "Please enter a valid email address." });
      setScrollEmailSuggestion(undefined);
    } else {
      setIsSubmitting(true);
      setSubmitError("");
      const sent = await submitLead("scroll-email", {
        emailAddress: trimmedVal
      });
      setIsSubmitting(false);
      if (sent) {
        trackEvent.contactFormSubmit("scroll-email");
        setSubmitted(true);
      } else {
        setSubmitError("We could not submit the enquiry right now. Please check the Web3Forms access key or try again.");
      }
    }
  };

  if (!isLeadModalOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Click Outside to Close */}
      <div className="absolute inset-0 z-0 bg-slate-950/20" onClick={closeLeadModal} />

      {/* Modal Card */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-t-[28px] sm:rounded-[28px] w-full sm:max-w-lg shadow-2xl relative overflow-hidden transition-all duration-350 transform scale-100 flex flex-col max-h-[95vh] sm:max-h-[90vh] z-10 font-sans antialiased text-slate-800">

        {/* Background Glow Overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 relative z-10 bg-white/60 backdrop-blur-md">
          {leadModalType === "scroll-email" ? (
            <div>
              <h3 id="modal-title" className="text-sm font-black text-slate-900 tracking-tight">
                Planning a Meeting Room, Auditorium or Event Setup?
              </h3>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Sparkles size={14} className="animate-pulse" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">AV Impact Integration</h3>
                <h2 id="modal-title" className="text-base font-extrabold text-slate-900 leading-tight">AV Consultation Assistant</h2>
              </div>
            </div>
          )}
          <button
            onClick={closeLeadModal}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-all cursor-pointer border border-slate-200/30"
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress Tracker bar */}
        {!submitted && leadModalType !== "scroll-email" && (
          <div className="w-full bg-slate-100 h-1 relative overflow-hidden" aria-hidden="true">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 relative z-10 scrollbar-thin">
          {submitted ? (
            // Success / Staging Plan Screen
            <div className="text-center py-6 space-y-6 animate-slide-left-fade">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={28} className="animate-bounce" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-slate-900 tracking-tight">Staging Plan Configured!</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your environment details have been registered. An AV Impact systems architect is drafting your initial hardware layout blueprint. We will connect with you via email shortly.
                </p>
              </div>

              {/* Selection summary badge */}
              {leadModalType !== "scroll-email" && (
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 max-w-sm mx-auto text-left space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between"><span className="font-semibold">Workspace Profile:</span> <span className="text-slate-900 font-bold">{consultationData.spaceType}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">Room Scale:</span> <span className="text-slate-900 font-bold">{consultationData.roomSize} Space</span></div>
                  <div className="flex justify-between"><span className="font-semibold">Contact Partner:</span> <span className="text-slate-900 font-bold">{consultationData.fullName}</span></div>
                </div>
              )}

              <div className="pt-4 max-w-sm mx-auto">
                <button
                  onClick={closeLeadModal}
                  className="w-full py-3 bg-[#2559bd] text-white hover:bg-[#1f4a9e] rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md"
                  data-cursor="magnetic"
                >
                  Close Assistant
                </button>
              </div>
            </div>
          ) : leadModalType === "scroll-email" ? (
            // Scroll Email-Only Form
            <form onSubmit={handleScrollEmailSubmit} className="space-y-5 text-left animate-slide-left-fade">
              <div className="text-center py-2">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lightbulb size={22} />
                </div>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Get expert AV recommendations, pricing and solution ideas tailored to your budget.
                </p>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <input
                  id="scroll-email-input"
                  type="email"
                  autoComplete="email"
                  required
                  value={scrollEmail}
                  onChange={handleScrollEmailChange}
                  onBlur={handleScrollEmailBlur}
                  placeholder="Your Work Email"
                  className={`w-full bg-white border ${errors.scrollEmail
                      ? 'border-rose-500 focus:ring-rose-500/20'
                      : 'border-slate-200 focus:border-blue-500/80 focus:ring-blue-500/10'
                    } text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 transition-all placeholder-slate-400 text-sm`}
                />
                {errors.scrollEmail && <p className="text-[11px] font-semibold text-rose-500 mt-1">{errors.scrollEmail}</p>}
                {scrollEmailSuggestion && (
                  <p className="text-[11px] text-[#2559bd] mt-1 cursor-pointer hover:underline" onClick={() => {
                    setScrollEmail(scrollEmailSuggestion);
                    setScrollEmailSuggestion(undefined);
                    setErrors(prev => {
                      const next = { ...prev };
                      delete next.scrollEmail;
                      return next;
                    });
                  }}>
                    Did you mean <span className="font-semibold">{scrollEmailSuggestion}</span>?
                  </p>
                )}
              </div>

              {/* Submit Button */}
              {submitError && (
                <p role="alert" className="text-[11px] font-semibold text-rose-500">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 bg-[#2559bd] hover:bg-[#1f4a9e] text-white font-bold py-3.5 px-6 rounded-xl transition-all active:scale-98 shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                {isSubmitting ? "Sending..." : "Get Free Consultation"}
              </button>
            </form>
          ) : (
            // Unified Premium 3-Step Consultation Experience
            <div className="space-y-6">

              {/* Step 1: Space Type Selection */}
              {currentStep === 1 && (
                <div className="space-y-5 text-left animate-slide-left-fade">
                  {/* Guidance message */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-slate-650 leading-relaxed italic">
                    "Hello! Let's build your setup. First, what type of environment are we planning to integrate? This helps me understand the necessary display sizes and acoustic requirements."
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Workspace</label>
                    <div className="grid grid-cols-1 gap-2.5">
                      {[
                        {
                          name: "Meeting Room",
                          icon: Video,
                          desc: "Boardrooms, videoconferencing hubs, and huddle spaces."
                        },
                        {
                          name: "Auditorium",
                          icon: Monitor,
                          desc: "Large presentation halls, town halls, and theater systems."
                        },
                        {
                          name: "Classroom",
                          icon: School,
                          desc: "Interactive learning halls, universities, and training rooms."
                        },
                        {
                          name: "Custom / Other Space",
                          icon: Building,
                          desc: "Digital signage walls, residential integration, command centers."
                        }
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.name}
                            type="button"
                            onClick={() => {
                              setConsultationData({ ...consultationData, spaceType: item.name });
                              trackEvent.solutionDesignerUsage(item.name);
                              setCurrentStep(2);
                            }}
                            className={`flex items-start gap-4 p-4 rounded-2xl border text-left cursor-pointer transition-all active:scale-[0.98] ${consultationData.spaceType === item.name
                                ? 'border-blue-600 bg-blue-50/35 shadow-sm'
                                : 'border-slate-200/80 bg-white hover:border-slate-350 hover:bg-slate-50/50'
                              }`}
                            aria-pressed={consultationData.spaceType === item.name}
                          >
                            <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${consultationData.spaceType === item.name
                                ? 'bg-blue-600 text-white animate-pulse'
                                : 'bg-slate-50 text-slate-400'
                              }`}>
                              <Icon size={18} />
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                              <p className="text-[11px] text-slate-500 leading-normal">{item.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Room Size Selection */}
              {currentStep === 2 && (
                <div className="space-y-5 text-left animate-slide-left-fade">
                  {/* Guidance message */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-slate-650 leading-relaxed italic">
                    "Superb. Next, how large is the workspace? Room scale dictates displays, sound reinforcement capacity, and microphone counts."
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Room Capacity</label>
                    <div className="grid grid-cols-1 gap-2.5">
                      {[
                        { name: "Small", desc: "For 2-5 students. Ideal for team clusters and huddle rooms." },
                        { name: "Medium", desc: "For 6-12 students. Ideal for conference rooms and collaboration hubs." },
                        { name: "Large", desc: "For 13+ students. Suitable for large corporate boardrooms or auditoriums." }
                      ].map((size) => (
                        <button
                          key={size.name}
                          type="button"
                          onClick={() => {
                            setConsultationData({ ...consultationData, roomSize: size.name });
                            setCurrentStep(3);
                          }}
                          className={`flex items-start gap-4 p-4 rounded-2xl border text-left cursor-pointer transition-all active:scale-[0.98] ${consultationData.roomSize === size.name
                              ? 'border-blue-600 bg-blue-50/35 shadow-sm'
                              : 'border-slate-200/80 bg-white hover:border-slate-350 hover:bg-slate-50/50'
                            }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${consultationData.roomSize === size.name
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-slate-300 bg-white'
                            }`}>
                            {consultationData.roomSize === size.name && (
                              <div className="w-1.5 h-1.5 bg-white rounded-full" />
                            )}
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-sm font-bold text-slate-900">{size.name} Space</h4>
                            <p className="text-[11px] text-slate-500 leading-normal">{size.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    ← Back to Workspace
                  </button>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {currentStep === 3 && (
                <form onSubmit={handleConsultationSubmit} className="space-y-5 text-left animate-slide-left-fade">
                  {/* Guidance message */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-slate-650 leading-relaxed italic">
                    "Excellent details. Lastly, share your contact details. Our staging engineer will review the parameters to prepare your custom equipment plan."
                  </div>

                  <div className="space-y-3.5">
                    {/* Name Input */}
                    <div className="space-y-1">
                      <label htmlFor="fullName" className="text-xs font-bold text-slate-700">Full Name *</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <User size={16} />
                        </span>
                        <input
                          type="text"
                          id="fullName"
                          value={consultationData.fullName}
                          onChange={(e) => setConsultationData({ ...consultationData, fullName: e.target.value })}
                          placeholder="John Doe"
                          className={`w-full bg-white border ${errors.fullName ? 'border-rose-350 focus:ring-rose-500/20' : 'border-slate-200 focus:border-blue-500/80'} text-slate-900 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-4 transition-all`}
                        />
                      </div>
                      {errors.fullName && <p className="text-[10px] font-semibold text-rose-500 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1">
                      <label htmlFor="emailAddress" className="text-xs font-bold text-slate-700">Email Address *</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <Mail size={16} />
                        </span>
                         <input
                           type="email"
                           id="emailAddress"
                           autoComplete="email"
                           required
                           value={consultationData.emailAddress}
                           onChange={handleConsultationEmailChange}
                           onBlur={handleConsultationEmailBlur}
                           placeholder="name@company.com"
                           className={`w-full bg-white border ${errors.emailAddress ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 focus:border-blue-500/80'} text-slate-900 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-4 transition-all`}
                         />
                      </div>
                      {errors.emailAddress && <p className="text-[10px] font-semibold text-rose-500 mt-1">{errors.emailAddress}</p>}
                      {consultationEmailSuggestion && (
                        <p className="text-[11px] text-[#2559bd] mt-1 cursor-pointer hover:underline" onClick={() => {
                          setConsultationData(prev => ({ ...prev, emailAddress: consultationEmailSuggestion }));
                          setConsultationEmailSuggestion(undefined);
                          setErrors(prev => {
                            const next = { ...prev };
                            delete next.emailAddress;
                            return next;
                          });
                        }}>
                          Did you mean <span className="font-semibold">{consultationEmailSuggestion}</span>?
                        </p>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1">
                      <label htmlFor="mobileNumber" className="text-xs font-bold text-slate-700">Mobile Number *</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <Phone size={16} />
                        </span>
                        <input
                          type="tel"
                          id="mobileNumber"
                          value={consultationData.mobileNumber}
                          onChange={(e) => setConsultationData({ ...consultationData, mobileNumber: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className={`w-full bg-white border ${errors.mobileNumber ? 'border-rose-350 focus:ring-rose-500/20' : 'border-slate-200 focus:border-blue-500/80'} text-slate-900 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-4 transition-all`}
                        />
                      </div>
                      {errors.mobileNumber && <p className="text-[10px] font-semibold text-rose-500 mt-1">{errors.mobileNumber}</p>}
                    </div>

                    {/* Optional Details Expandable */}
                    <div className="border border-slate-150 rounded-2xl overflow-hidden mt-1 bg-slate-50/30">
                      <button
                        type="button"
                        onClick={() => setShowOptionalDetails(!showOptionalDetails)}
                        className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-slate-100/30 cursor-pointer"
                      >
                        <span className="text-xs font-bold text-slate-600">Company & Contact Mode (Optional)</span>
                        <ChevronRight
                          size={14}
                          className={`text-slate-400 transform transition-transform duration-300 ${showOptionalDetails ? 'rotate-90' : ''}`}
                        />
                      </button>

                      {showOptionalDetails && (
                        <div className="p-4 bg-white border-t border-slate-100 space-y-4">
                          <div className="space-y-1">
                            <label htmlFor="companyName" className="text-xs font-bold text-slate-700">Company Name</label>
                            <input
                              type="text"
                              id="companyName"
                              value={consultationData.companyName}
                              onChange={(e) => setConsultationData({ ...consultationData, companyName: e.target.value })}
                              placeholder="Acme Corp"
                              className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-750 block">Preferred Staging Consultation Mode</span>
                            <div className="flex gap-2">
                              {(["Call", "Email", "WhatsApp"] as const).map((method) => (
                                <button
                                  key={method}
                                  type="button"
                                  onClick={() => setConsultationData({ ...consultationData, preferredContact: method })}
                                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${consultationData.preferredContact === method
                                      ? 'bg-blue-600 border-transparent text-white shadow-sm'
                                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                  {method}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions footer */}
                  {submitError && (
                    <p role="alert" className="text-[11px] font-semibold text-rose-500">{submitError}</p>
                  )}
                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-3 border border-slate-200 rounded-xl font-bold text-xs text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 bg-[#2559bd] text-white hover:bg-[#1f4a9e] rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      data-cursor="magnetic"
                    >
                      {isSubmitting ? "Sending..." : <>Request Blueprint <Send size={12} /></>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
