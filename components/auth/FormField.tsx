import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormFieldProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  className?: string;
}

export default function FormField({
  type,
  name,
  value,
  onChange,
  placeholder,
  label,
  icon,
  showPasswordToggle = false,
  onTogglePassword,
  className = ""
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="text-sm font-medium text-zinc-300">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 px-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${icon ? "pl-10" : ""} ${showPasswordToggle ? "pr-10" : ""}`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-300 transition-colors"
            onClick={onTogglePassword}
          >
            {type === "password" ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
    </div>
  );
}