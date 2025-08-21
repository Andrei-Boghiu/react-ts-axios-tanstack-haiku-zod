import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  organization: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
