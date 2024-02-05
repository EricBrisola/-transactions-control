import { useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(`valor atual do modal: ${isModalOpen}`);
  return {
    openModal,
    closeModal,
    isModalOpen,
  };
};
