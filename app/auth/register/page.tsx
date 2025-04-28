// app/auth/register/page.tsx
import AuthPageLayout from '@/components/auth/AuthPageLayout';
import RegisterForm from '@/components/auth/RegisterForm';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect('/profile');

  return (
    <AuthPageLayout
      showImage
      title="Create Account"
      subtitle="Fill in your details to get started"
      footerText="Already have an account?"
      footerLink="Sign In"
      footerHref="/auth/login"
    >
      <RegisterForm />
    </AuthPageLayout>
  );
}