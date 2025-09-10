"use client";

import { ReactNode, useEffect } from "react";
import css from "./Modal.module.css";

export default function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className={css.overlay} role="dialog" onClick={onClose}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <button className={css.close} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
