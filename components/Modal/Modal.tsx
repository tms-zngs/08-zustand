import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

interface NoteModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function NoteModal({ children, onClose }: NoteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
