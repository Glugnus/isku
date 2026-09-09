import ScreenLayout from "@/src/components/ui/screen-layout";
import RegisterForm from "@/src/features/auth/components/form/register-form";

export default function RegisterScreen() {
  return (
    <ScreenLayout scrollable>
      <RegisterForm />
    </ScreenLayout>
  );
}
