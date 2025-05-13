"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/firebase-client';
import { sendEmailVerification } from 'firebase/auth';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

export default function VerifyEmailPage() {
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    
    if (user && !user.emailVerified) {
      sendEmailVerification(user)
        .then(() => console.log('Verification email sent'))
        .catch(error => console.error('Error sending verification email:', error));
    } else if (user?.emailVerified) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <AuthPageLayout
      title="Verify Your Email"
      subtitle="We've sent a verification link to your email address"
      footerText="Already verified?"
      footerLink="Sign In"
      footerHref="/auth/login"
    >
      <div className="text-center py-8">
        <p className="text-gray-300 mb-4">
          Please check your inbox and click on the verification link to complete your registration.
        </p>
        <button
          onClick={() => auth.currentUser && sendEmailVerification(auth.currentUser)}
          className="text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Resend Verification Email
        </button>
      </div>
    </AuthPageLayout>
  );
}