"use client";
import AuthPageLayout from '@/components/auth/AuthPageLayout';

export default function VerifyEmailPage() {


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
          className="text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Resend Verification Email
        </button>
      </div>
    </AuthPageLayout>
  );
}