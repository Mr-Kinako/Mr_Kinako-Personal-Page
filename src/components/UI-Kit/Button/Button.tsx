import type { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import s from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  customClass?: string;
}

export const Button = ({ children, variant = "primary", customClass, ...props }: ButtonProps) => {
  return (
    <button className={cn(s.button, s[variant], customClass)} {...props}>
      {children}
    </button>
  );
};
