import ScreenLayout from "@/src/components/ui/screen-layout";
import ForgotPasswordForm from "@/src/features/auth/components/form/forgot-password-form";

export default function ForgotPasswordScreen() {
  return (
    <ScreenLayout scrollable>
      <ForgotPasswordForm />
    </ScreenLayout>
  );
}
