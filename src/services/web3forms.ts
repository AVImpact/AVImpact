import { sanitizeString } from "../utils/sanitize";

export type LeadPayload = Record<string, string | number | boolean | undefined | null>;

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const leadSubjects: Record<string, string> = {
  "scroll-email": "New Quick Email Lead - AV Impact",
  consultation: "New Consultation Assistant Lead - AV Impact",
  "contact-page": "New Contact Page Inquiry - AV Impact",
  careers: "New Careers Inquiry - AV Impact",
};

const cleanPayload = (payload: LeadPayload) => {
  const cleaned: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === null || value === "") continue;
    cleaned[key] = typeof value === "string" ? sanitizeString(value) : value;
  }

  return cleaned;
};

export const saveLeadBackup = (leadType: string, leadData: LeadPayload) => {
  try {
    const existingLeads = localStorage.getItem("av_impact_leads");
    const leads = existingLeads ? JSON.parse(existingLeads) : [];
    leads.push({
      type: leadType,
      data: cleanPayload(leadData),
      id: Date.now(),
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("av_impact_leads", JSON.stringify(leads));
  } catch (error) {
    console.error("Error saving lead backup:", error);
  }
};

export const getLeadBackups = (): any[] => {
  try {
    const existingLeads = localStorage.getItem("av_impact_leads");
    return existingLeads ? JSON.parse(existingLeads) : [];
  } catch (error) {
    console.error("Error getting lead backups:", error);
    return [];
  }
};

export async function submitLeadToWeb3Forms(leadType: string, leadData: LeadPayload) {
  const sanitizedLead = cleanPayload(leadData);
  saveLeadBackup(leadType, sanitizedLead);

  if (!WEB3FORMS_ACCESS_KEY) {
    throw new Error("Missing VITE_WEB3FORMS_ACCESS_KEY. Add your Web3Forms access key to .env before publishing.");
  }

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: leadSubjects[leadType] || "New Website Lead - AV Impact",
    from_name: "AV Impact Website",
    lead_source: leadType,
    botcheck: false,
    name: sanitizedLead.name || sanitizedLead.fullName,
    email: sanitizedLead.email || sanitizedLead.emailAddress,
    phone: sanitizedLead.phone || sanitizedLead.mobileNumber,
    ...sanitizedLead,
  };

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(result?.message || "Unable to submit the form right now.");
  }

  return result;
}
