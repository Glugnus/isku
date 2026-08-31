import ScreenLayout from "@/src/components/ui/screen-layout";
import AuthHeader from "@/src/features/auth/components/auth-header";
import RegisterForm from "@/src/features/auth/components/form/register-form";

export default function RegisterScreen() {
  return (
    <ScreenLayout>
      <RegisterForm />
    </ScreenLayout>
  );
}
