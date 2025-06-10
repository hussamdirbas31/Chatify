"use client";
import FormField from '@/components/auth/FormField';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginForm() {
  return (
    <form className="space-y-5 w-full">
      <FormField
        type="email"
        name="email"
        placeholder="your@email.com"
        label="Email"
        icon={<FaEnvelope />}
      />

      <FormField
        type="password"
        name="password"
        placeholder="••••••••"
        label="Password"
        icon={<FaLock />}
        showPasswordToggle
      />

      <div className="flex justify-end">
        <Link 
          href="/auth/forgot-password" 
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex justify-center items-center gap-2"
      >
        Sign In
      </button>
    </form>
  );
}