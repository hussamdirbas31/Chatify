"use client";
import { FaEnvelope, FaArrowRight } from 'react-icons/fa';

export default function EmailVerificationForm({ email }: { email: string }) {
  return (
    <div className="space-y-5 w-full">
      <div className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500/10 p-2 rounded-full">
            <FaEnvelope className="text-indigo-400" />
          </div>
          <div>
            <h3 className="font-medium text-zinc-100">Verify your email</h3>
            <p className="text-sm text-zinc-400 mt-1">
              We&apos;ve sent a verification link to {email}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          className="w-full bg-gradient-to-r from-indigo-500/80 to-purple-500/80 text-zinc-100 py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex justify-center items-center gap-2"
        >
          <span>Resend Verification Email</span>
          <FaArrowRight />
        </button>

        <button
          type="button"
          className="w-full text-center text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}