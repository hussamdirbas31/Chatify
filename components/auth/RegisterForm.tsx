"use client";
import FormField from '@/components/auth/FormField';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function RegisterForm() {
  return (
    <form className="space-y-5 w-full">
      <FormField
        type="text"
        name="name"
        placeholder="John Doe"
        label="Full Name"
        icon={<FaUser />}
      />

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

      <FormField
        type="password"
        name="confirmPassword"
        placeholder="••••••••"
        label="Confirm Password"
        icon={<FaLock />}
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex justify-center items-center gap-2"
      >
        Create Account
      </button>
    </form>
  );
}