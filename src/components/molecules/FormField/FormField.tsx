import React from "react";
import Input from "../../atoms/Input/Input";
import "./FormField.css";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder,
}) => {
  return (
    <div className="form-field">
      <Input
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        required={required}
        placeholder={placeholder}
        fullWidth
      />
    </div>
  );
};

export default FormField;
