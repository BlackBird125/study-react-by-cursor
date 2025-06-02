import React from "react";
import "./Input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const inputClasses = [
    "input",
    error ? "input-error" : "",
    fullWidth ? "input-full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <input className={inputClasses} {...props} />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;
