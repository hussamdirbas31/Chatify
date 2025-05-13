"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase-client";
import AuthFormMessage from "@/components/auth/AuthFormMessage";
import FormField from "@/components/auth/FormField";
import { FaEnvelope, FaSpinner, FaPaperPlane } from "react-icons/fa";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!email) {
      setMessage({ type: 'error', text: 'Email is required' });
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage({
        type: 'success',
        text: 'Password reset email sent. Check your inbox.'
      });
    } catch (error: any) {
      let errorMessage = 'Failed to send reset email. Please try again.';

      switch (error.code) {
        case 'auth/invalid-email': errorMessage = 'Invalid email address.'; break;
        case 'auth/user-not-found': errorMessage = 'No account found with this email.'; break;
      }

      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      {message && <AuthFormMessage type={message.type} message={message.text} />}

      <FormField
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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