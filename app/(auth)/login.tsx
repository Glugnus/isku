import ScreenLayout from "@/src/components/ui/screen-layout";
import AuthHeader from "@/src/features/auth/components/auth-header";
import LoginForm from "@/src/features/auth/components/form/login-form";

export default function LoginScreen() {
  return (
    <ScreenLayout>
      <LoginForm />
    </ScreenLayout>
  );
}
