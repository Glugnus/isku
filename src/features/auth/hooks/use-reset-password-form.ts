import { signOut, updateUserPassword } from "@/src/features/auth/api/auth-api";
import {
  resetPasswordFormSchema,
  ResetPasswordFormValues,
} from "@/src/features/auth/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

export const useResetPasswordForm = () => {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await updateUserPassword({ newPassword: data.password });
      await signOut();
      router.replace("/(auth)/login");
    } catch (err) {
      if (
        err instanceof Error &&
        err.message ===
          "New password should be different from the old password."
      ) {
        form.setError("root", {
          type: "manual",
          message: "Le nouveau mot de passe doit être différent de l'ancien",
        });
        return;
      }
      form.setError("root", {
        type: "manual",
        message: "Erreur lors de la modification du mot de passe",
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
