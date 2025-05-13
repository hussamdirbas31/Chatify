import LoginForm from '@/components/auth/LoginForm';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { from?: string; verified?: string; error?: string };
}) {
  return (
    <AuthPageLayout
      showImage
      title={searchParams.verified ? 'Email Verified!' : 'Welcome Back'}
      subtitle={
        searchParams.verified
          ? 'Your email has been verified. Please sign in.'
          : 'Sign in to your account'
      }
      footerText="Don't have an account?"
      footerLink="Create account"
      footerHref="/auth/register"
    >
      <LoginForm />
    </AuthPageLayout>
  );
}