"use client";
import { useState } from 'react';
import FormField from '@/components/auth/FormField';
import { FaUser, FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';
import AuthFormMessage from '@/components/auth/AuthFormMessage';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is where you would connect to your registration API
    setLoading(true);
    console.log('Registration form submitted:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
        type="text"
        name="name"
        value={formData.name}
        placeholder="John Doe"
        label="Full Name"
        icon={<FaUser />}
      />

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

      <FormField
        type={showPassword ? 'text' : 'password'}
        name="confirmPassword"
        value={formData.confirmPassword}
        placeholder="••••••••"
        label="Confirm Password"
        icon={<FaLock />}
      />

      <button
        type="submit"
        disabled={loading || !formData.name || !formData.email || !formData.password || !formData.confirmPassword}
        className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin">
              <FaSpinner />
            </div>
            <span>Creating Account...</span>
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
}