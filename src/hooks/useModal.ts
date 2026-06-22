import { useModalContext } from "../contexts/ModalContext";

export function useModal() {
  const { isOpen, modalType, requirement, openModal, closeModal } = useModalContext();

  return {
    isOpen,
    modalType,
    requirement,
    openModal,
    closeModal,
  };
}

export default useModal;
