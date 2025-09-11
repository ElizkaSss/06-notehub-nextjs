"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
 
  // Блокування прокрутки під час відкриття
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Закриття по Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  
  return createPortal (
    <div className={css.overlay} role="dialog" onClick={onClose}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <button className={css.close} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
