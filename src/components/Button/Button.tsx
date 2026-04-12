import type { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import cls from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export const Button: FC<ButtonProps> = ({ children, to, onClick, type = "button", disabled, className }) => {
  if (to) {
    return (
      <NavLink to={to} className={({ isActive }) => `${cls.btn} ${className || ""} ${isActive ? cls.active : ""}`}>
        {children}
      </NavLink>
    );
  }
  return (
    <button className={`${cls.btn} ${className || ""}`} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
};
