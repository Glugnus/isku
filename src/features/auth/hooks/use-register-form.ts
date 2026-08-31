import { signUp } from "@/src/features/auth/api/auth-api";
import {
  RegisterFormValues,
  registerSchema,
} from "@/src/features/auth/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

export const useRegisterForm = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await signUp(data);
      router.push({
        pathname: "/(auth)/verify-otp",
        params: {
          email: data.email,
          type: "email",
        },
      });
    } catch (err) {
      form.setError("root", {
        // TODO: Gérer le cas inscription déjà existante
        type: "manual",
        message: "Erreur lors de l'inscription",
      });
      console.log(err);
    }
  };

  return {
    control: form.control,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    handleSubmit: form.handleSubmit,
    onSubmit,
  };
};
