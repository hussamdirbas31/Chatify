// components/auth/FormField.tsx
import { ReactNode } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React from 'react';

export default function FormField({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  label,
  icon,
  showPasswordToggle,
  onTogglePassword,
}: {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  icon: ReactNode;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-surface-700">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-muted/20 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-surface-900"
          required
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
            onClick={onTogglePassword}
          >
            {type === 'password' ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
}