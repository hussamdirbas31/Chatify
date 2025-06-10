import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import AuthPageLayout from "@/components/auth/AuthPageLayout";

export default async function ForgotPasswordPage() {
  return (
    <AuthPageLayout
      title="Reset Password"
      subtitle="Enter your email to receive a reset link"
      footerText="Remember your password?"
      footerLink="Sign In"
      footerHref="/auth/login"
    >
      <ForgotPasswordForm />
    </AuthPageLayout>
  );
}