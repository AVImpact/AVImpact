import React, { createContext, useContext, useState, useEffect } from "react";

export type ModalType = "sales" | "quotation" | "scroll-email";

interface ModalContextType {
  isOpen: boolean;
  modalType: ModalType;
  requirement: string;
  openModal: (type: ModalType, requirement?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("quotation");
  const [requirement, setRequirement] = useState("");

  const openModal = (type: ModalType, req = "") => {
    setModalType(type);
    setRequirement(req);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setRequirement("");
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalType,
        requirement,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}
