"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase-client';
import FormField from '@/components/auth/FormField';
import { FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';
import AuthFormMessage from '@/components/auth/AuthFormMessage';
import Link from 'next/link';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setMessage({ type: 'error', text: 'Email and password are required' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      if (!userCredential.user.emailVerified) {
        setMessage({ 
          type: 'error', 
          text: 'Please verify your email before logging in' 
        });
        return;
      }
      
      const idToken = await userCredential.user.getIdToken();
      
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Session creation failed');
      }

      const from = searchParams.get('from') || '/dashboard';
      router.push(from);
    } catch (error: any) {
      let errorMessage = 'Login failed. Please try again.';
      
      switch (error.code) {
        case 'auth/invalid-email': errorMessage = 'Invalid email address.'; break;
        case 'auth/user-disabled': errorMessage = 'This account has been disabled.'; break;
        case 'auth/user-not-found': errorMessage = 'No account found with this email.'; break;
        case 'auth/wrong-password': errorMessage = 'Incorrect password.'; break;
        default: errorMessage = error.message || errorMessage;
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
        disabled={loading}
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