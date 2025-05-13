import RegisterForm from '@/components/auth/RegisterForm';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { from?: string; error?: string };
}) {
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