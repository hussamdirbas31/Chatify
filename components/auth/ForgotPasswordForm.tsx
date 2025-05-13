"use client";

import { useState } from "react";
import AuthFormMessage from "@/components/auth/AuthFormMessage";
import FormField from "@/components/auth/FormField";
import { FaEnvelope, FaSpinner, FaPaperPlane } from "react-icons/fa";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);


  return (
    <form  className="space-y-5 w-full">
      {message && <AuthFormMessage type={message.type} message={message.text} />}

      <FormField
        type="email"
        name="email"
        value={email}
        placeholder="your@email.com"
        label="Email"
        icon={<FaEnvelope />}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin">
              <FaSpinner />
            </div>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <FaPaperPlane />
            <span>Send Reset Link</span>
          </>
        )}
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