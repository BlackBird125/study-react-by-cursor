import React from "react";
import "./Button.css";

export type ButtonVariant = "primary" | "danger" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const buttonClasses = [
    "button",
    `button-${variant}`,
    `button-${size}`,
    fullWidth ? "button-full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
