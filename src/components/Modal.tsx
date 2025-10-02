import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, type ReactNode } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const Modal: React.FC<Props> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              className="btn modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <IoClose />
            </button>

            <h2>{title}</h2>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
