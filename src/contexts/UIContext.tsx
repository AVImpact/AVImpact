import React, { createContext, useContext, useState, useEffect } from "react";

type ModalType = "sales" | "quotation" | "scroll-email";

interface UIContextType {
  isLeadModalOpen: boolean;
  leadModalType: ModalType;
  leadModalRequirement: string;
  openLeadModal: (type: ModalType, requirement?: string) => void;
  closeLeadModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalType, setLeadModalType] = useState<ModalType>("quotation");
  const [leadModalRequirement, setLeadModalRequirement] = useState("");

  const openLeadModal = (type: ModalType, requirement = "") => {
    setLeadModalType(type);
    setLeadModalRequirement(requirement);
    setIsLeadModalOpen(true);
  };

  const closeLeadModal = () => {
    setIsLeadModalOpen(false);
    setLeadModalRequirement("");
  };

  // Lock body scroll when modal is open (Phase 11: Responsive design fixes / scroll lock)
  useEffect(() => {
    if (isLeadModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLeadModalOpen]);

  return (
    <UIContext.Provider
      value={{
        isLeadModalOpen,
        leadModalType,
        leadModalRequirement,
        openLeadModal,
        closeLeadModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
