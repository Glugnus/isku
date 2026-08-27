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

export const loginSchema = z.object({
  email: emailValidation,
  password: z.string().min(1, "Le mot de passe est requis"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
