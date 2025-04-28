import AuthPageLayout from '@/components/auth/AuthPageLayout';
import LoginForm from '@/components/auth/LoginForm';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect('/profile');

  return (
    <AuthPageLayout
      showImage // ← أضفنا هذا السطر لجعل الصورة تظهر على اليسار
      title="Welcome Back"
      subtitle="Sign in to your account"
      footerText="Don't have an account?"
      footerLink="Create account"
      footerHref="/auth/register"
    >
      <LoginForm />
    </AuthPageLayout>
  );
}