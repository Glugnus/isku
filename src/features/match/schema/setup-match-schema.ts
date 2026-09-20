import * as z from "zod";

export const setupMatchSchema = z.object({
  p1Name: z.string().min(1, "Le nom est requis"),
  p2Name: z.string().min(1, "Le nom est requis"),
  currentProfilePosition: z.enum(["p1", "p2"]),
  location: z.string().optional(),
  scheduledAt: z.date().optional(),
  setsToWin: z.number().int().positive().min(1),
  matchMode: z.enum(["umpire", "quick"]),
});

export type SetupMatchFormData = z.infer<typeof setupMatchSchema>;
