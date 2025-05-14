"use client";
import { useState } from 'react';
import FormField from '@/components/auth/FormField';
import { FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await loginUser(formData);
      // Handle successful login
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      <FormField
        type="email"
        name="email"
        value={formData.email}
        placeholder="your@email.com"
        label="Email"
        icon={<FaEnvelope />}
      />

      <FormField
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={formData.password}
        placeholder="••••••••"
        label="Password"
        icon={<FaLock />}
        showPasswordToggle
        onTogglePassword={() => setShowPassword(!showPassword)}
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
        disabled={loading || !formData.email || !formData.password}
        className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin">
              <FaSpinner />
            </div>
            <span>Signing In...</span>
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
}