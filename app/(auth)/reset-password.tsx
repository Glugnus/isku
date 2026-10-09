import ScreenLayout from "@/src/components/ui/screen-layout";
import ResetPasswordForm from "@/src/features/auth/components/form/reset-password-form";

export default function ResetPasswordScreen() {
  return (
    <ScreenLayout scrollable>
      <ResetPasswordForm />
    </ScreenLayout>
  );
}
