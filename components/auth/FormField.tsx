import { FaEye } from "react-icons/fa";

interface FormFieldProps {
  type: string;
  name: string;
  placeholder: string;
  label: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  className?: string;
}

export default function FormField({
  type = "text",
  name,
  placeholder,
  label,
  icon,
  showPasswordToggle = false,
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
          placeholder={placeholder}
          className={`w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 px-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${icon ? "pl-10" : ""} ${showPasswordToggle ? "pr-10" : ""}`}
          readOnly // Added to make it clear this is display-only
        />
        {showPasswordToggle && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400">
            <FaEye /> {/* Default to visible eye icon */}
          </div>
        )}
      </div>
    </div>
  );
}