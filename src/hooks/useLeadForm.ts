import { useState } from "react";
import { sanitizeString } from "../utils/sanitize";

interface LeadData {
  spaceType?: string;
  roomSize?: string;
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  companyName?: string;
  preferredContact?: "Call" | "Email" | "WhatsApp";
  message?: string;
  role?: string;
}

export function useLeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<LeadData>({
    fullName: "",
    emailAddress: "",
    mobileNumber: "",
    companyName: "",
    preferredContact: "Email",
    message: "",
    role: ""
  });

  const sanitizeLeadDetails = (details: LeadData): LeadData => {
    return {
      ...details,
      fullName: sanitizeString(details.fullName),
      emailAddress: sanitizeString(details.emailAddress),
      mobileNumber: sanitizeString(details.mobileNumber),
      companyName: details.companyName ? sanitizeString(details.companyName) : "",
      message: details.message ? sanitizeString(details.message) : "",
      role: details.role ? sanitizeString(details.role) : "",
      spaceType: details.spaceType ? sanitizeString(details.spaceType) : undefined,
      roomSize: details.roomSize ? sanitizeString(details.roomSize) : undefined,
    };
  };

  const saveLead = (leadType: string, leadDetails: LeadData) => {
    try {
      const sanitizedDetails = sanitizeLeadDetails(leadDetails);
      const existingLeads = localStorage.getItem("av_impact_leads");
      const leads = existingLeads ? JSON.parse(existingLeads) : [];
      leads.push({
        type: leadType,
        data: sanitizedDetails,
        id: Date.now(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("av_impact_leads", JSON.stringify(leads));
    } catch (e) {
      console.error("Error saving lead:", e);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const validatePhone = (phone: string) => {
    return /^\+?[0-9\s-]{8,15}$/.test(phone.trim());
  };

  const validateForm = (fields: (keyof LeadData)[]) => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const val = formData[field];
      if (typeof val === "string" && !val.trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    if (fields.includes("emailAddress") && formData.emailAddress) {
      if (!validateEmail(formData.emailAddress)) {
        newErrors.emailAddress = "Please enter a valid email address";
      }
    }

    if (fields.includes("mobileNumber") && formData.mobileNumber) {
      if (!validatePhone(formData.mobileNumber)) {
        newErrors.mobileNumber = "Please enter a valid mobile number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      emailAddress: "",
      mobileNumber: "",
      companyName: "",
      preferredContact: "Email",
      message: "",
      role: ""
    });
    setErrors({});
    setSubmitted(false);
  };

  return {
    formData,
    setFormData,
    submitted,
    setSubmitted,
    errors,
    setErrors,
    validateForm,
    saveLead,
    resetForm
  };
}
export default useLeadForm;
