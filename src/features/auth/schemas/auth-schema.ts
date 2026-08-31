import { z } from "zod";

const emailValidation = z
  .string()
  .trim()
  .min(1, "L'email est requis")
  .email("Format d'email invalide");

const passwordValidation = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .regex(/[a-zA-Z]/, "Le mot de passe doit contenir au moins une lettre")
  .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre");

const confirmPasswordValidation = z
  .string()
  .min(1, "La confirmation du mot de passe est requise");

export const loginSchema = z.object({
  email: emailValidation,
  password: z.string().min(1, "Le mot de passe est requis"),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Le pseudo doit contenir au moins 3 caractères"),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const resetPasswordFormSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: emailValidation,
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;

export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
