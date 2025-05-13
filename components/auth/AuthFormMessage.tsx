import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

interface AuthFormMessageProps {
  type: "error" | "success";
  message: string;
}

export default function AuthFormMessage({ type, message }: AuthFormMessageProps) {
  return (
    <div
      className={`p-3 rounded-lg flex items-center gap-3 ${
        type === "error"
          ? "bg-red-900/30 text-red-400 border border-red-800/50"
          : "bg-green-900/30 text-green-400 border border-green-800/50"
      }`}
    >
      {type === "error" ? (
        <FaExclamationCircle className="flex-shrink-0" />
      ) : (
        <FaCheckCircle className="flex-shrink-0" />
      )}
      <span className="text-sm">{message}</span>
    </div>
  );
}