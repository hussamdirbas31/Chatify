import LoginForm from '@/components/auth/LoginForm';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

export default function LoginPage() {
  return (
    <AuthPageLayout
      showImage
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