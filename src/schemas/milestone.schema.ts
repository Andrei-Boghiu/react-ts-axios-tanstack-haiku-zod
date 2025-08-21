import z from "zod";
import { description, optionalDatetime, statusEnum } from "./zod.config";

export const createMilestoneSchema = z.object({
  name: z.string().min(1, "Milestone name is required"),
  description,
  supervisorId: z.optional(z.uuid()).nullable(),
  status: z.optional(statusEnum).or(z.literal("")),
  startDate: optionalDatetime,
  endDate: optionalDatetime,
});

export const updateMilestoneSchema = createMilestoneSchema.partial();

export type CreateMilestoneFormData = z.infer<typeof createMilestoneSchema>;
export type UpdateMilestoneFormData = z.infer<typeof updateMilestoneSchema>;
