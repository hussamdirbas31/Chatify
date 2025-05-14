"use client";

import AuthFormMessage from "@/components/auth/AuthFormMessage";
import FormField from "@/components/auth/FormField";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import Link from "next/link";

export default function ForgotPasswordForm() {
  return (
    <form className="space-y-5 w-full">
      {/* Example message - to be controlled by parent */}
      <AuthFormMessage 
        type="success" 
        message="Password reset link sent to your email!" 
      />

      <FormField
        type="email"
        name="email"
        placeholder="your@email.com"
        label="Email"
        icon={<FaEnvelope />}
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex justify-center items-center gap-2"
      >
        <FaPaperPlane />
        <span>Send Reset Link</span>
      </button>

      <div className="text-center text-sm text-zinc-400">
        <Link 
          href="/auth/login" 
          className="text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    </form>
  );
}