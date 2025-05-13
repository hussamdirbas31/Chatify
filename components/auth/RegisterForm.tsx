"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase-client';
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
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      setMessage({ type: 'error', text: 'All fields are required' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password should be at least 6 characters' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      await sendEmailVerification(userCredential.user);

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

      router.push('/dashboard');
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';
      
      switch (error.code || error.message) {
        case 'auth/email-already-in-use': 
          errorMessage = 'Email already in use.'; 
          break;
        case 'auth/invalid-email': 
          errorMessage = 'Invalid email address.'; 
          break;
        case 'auth/weak-password': 
          errorMessage = 'Password should be at least 6 characters.'; 
          break;
        default:
          errorMessage = error.message || errorMessage;
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
        icon={<FaLock />}
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
        icon={<FaLock />}
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