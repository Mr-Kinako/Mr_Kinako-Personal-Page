import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import cn from "classnames";
import s from "./Overlay.module.scss";

export interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Показывать ли стандартный крестик закрытия */
  showCloseButton?: boolean;
  /** Дополнительный класс для самой подложки */
  className?: string;
  /** Дополнительный класс для контентного контейнера */
  contentClassName?: string;
  /** Дополнительный zIndex при необходимости */
  zIndex?: number;
}

export const Overlay = ({
  isOpen,
  onClose,
  children,
  showCloseButton = false,
  className,
  contentClassName,
  zIndex,
}: OverlayProps) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Управление монтированием с задержкой под анимацию выходящего состояния (fadeOut)
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setIsClosing(false);
    } else if (isRendered) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsRendered(false);
        setIsClosing(false);
      }, 300); // Совпадает с 0.3s анимацией в CSS

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Закрытие по клавише Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  return createPortal(
    <div
      className={cn(s.overlay, isClosing ? s.fadeOut : s.fadeIn, className)}
      style={zIndex ? { zIndex } : undefined}
      onClick={onClose}
    >
      <div className={cn(s.content, contentClassName)} onClick={(e) => e.stopPropagation()}>
        {showCloseButton && (
          <button type="button" className={s.closeBtn} onClick={onClose}>
            ×
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
};
