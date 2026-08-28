import type { ReactNode } from "react";
import s from "./CardContainer.module.scss";

interface CardProps {
  children: ReactNode;
  customClass?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const CardContainer = ({ children, customClass = "", onClick }: CardProps) => {
  return (
    <div className={`${s.cardContainer} ${customClass}`} onClick={onClick}>
      {children}
    </div>
  );
};
