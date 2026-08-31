import ScreenLayout from "@/src/components/ui/screen-layout";
import AuthHeader from "@/src/features/auth/components/auth-header";
import ResetPasswordForm from "@/src/features/auth/components/form/reset-password-form";

export default function ResetPasswordScreen() {
  return (
    <ScreenLayout>
      <ResetPasswordForm />
    </ScreenLayout>
  );
}
