import { signOut, updateUserPassword } from "@/src/features/auth/api/auth-api";
import {
  getResetPasswordFormSchema,
  ResetPasswordFormValues,
} from "@/src/features/auth/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const useResetPasswordForm = () => {
  const { t } = useTranslation("auth");
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(getResetPasswordFormSchema(t)),
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
          message: t("resetPassword.errorSamePassword"),
        });
        return;
      }
      form.setError("root", {
        type: "manual",
        message: t("resetPassword.errorGeneric"),
      });
      console.log(err);
    }
  };

  return {
    control: form.control,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    onSubmit: () => form.handleSubmit(onSubmit)(),
  };
};
