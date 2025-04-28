// components/auth/RegisterForm.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/auth';
import FormField from '@/components/auth/FormField';
import { FaUser, FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        router.push('/home');
        router.refresh();
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      {error && (
        <div className="p-3 bg-pink-400/10 border border-pink-400/20 rounded-lg text-pink-400 text-sm">
          {error}
        </div>
      )}

      <FormField
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="John Doe"
        label="Full Name"
        icon={<FaUser />}
      />

      <FormField
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="your@email.com"
        label="Email"
        icon={<FaEnvelope />}
      />

      <FormField
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
        label="Password"
        icon={<FaLock  />}
        showPasswordToggle
        onTogglePassword={() => setShowPassword(!showPassword)}
      />

      <FormField
        type={showPassword ? 'text' : 'password'}
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="••••••••"
        label="Confirm Password"
        icon={<FaLock  />}
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
            <span>Creating Account...</span>
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
}