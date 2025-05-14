"use client";

import { useState } from 'react';
import AuthFormMessage from '@/components/auth/AuthFormMessage';
import { FaEnvelope, FaSpinner, FaArrowRight, FaCheck } from 'react-icons/fa';

export default function EmailVerificationForm({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [verified, setVerified] = useState(false);

  const handleResend = () => {
    // This should be connected to your API
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage({ type: 'success', text: 'Verification email sent successfully!' });
    }, 1000);
  };

  const handleLogout = () => {
    // This should be connected to your API
    console.log('Logout clicked');
  };

  return (
    <div className="space-y-5 w-full">
      {message && <AuthFormMessage type={message.type} message={message.text} />}

      <div className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500/10 p-2 rounded-full">
            {verified ? <FaCheck className="text-green-400" /> : <FaEnvelope className="text-indigo-400" />}
          </div>
          <div>
            <h3 className="font-medium text-zinc-100">
              {verified ? 'Email Verified!' : 'Verify your email'}
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              {verified ? 'Your email has been successfully verified.' : `We've sent a verification link to ${email}`}
            </p>
          </div>
        </div>
      </div>

      {!verified && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500/80 to-purple-500/80 text-zinc-100 py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center items-center gap-2"
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
                <span>Resend Verification Email</span>
                <FaArrowRight />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-center text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}