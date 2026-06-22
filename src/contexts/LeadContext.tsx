import React, { createContext, useContext } from "react";
import { getLeadBackups, submitLeadToWeb3Forms } from "../services/web3forms";

export interface LeadData {
  spaceType?: string;
  roomSize?: string;
  fullName?: string;
  emailAddress: string;
  mobileNumber?: string;
  companyName?: string;
  preferredContact?: "Call" | "Email" | "WhatsApp";
  message?: string;
}

interface LeadContextType {
  submitLead: (leadType: string, leadData: LeadData) => Promise<boolean>;
  getLeads: () => any[];
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const submitLead = async (leadType: string, leadData: LeadData): Promise<boolean> => {
    try {
      await submitLeadToWeb3Forms(leadType, { ...leadData });
      return true;
    } catch (e) {
      console.error("Error submitting lead:", e);
      return false;
    }
  };

  const getLeads = (): any[] => {
    return getLeadBackups();
  };

  return (
    <LeadContext.Provider value={{ submitLead, getLeads }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLeadContext() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error("useLeadContext must be used within a LeadProvider");
  }
  return context;
}
