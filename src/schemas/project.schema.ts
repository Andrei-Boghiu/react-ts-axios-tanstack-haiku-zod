import z from "zod";
import { description, optionalDatetime, priorityEnum, projectStatusEnum } from "./zod.config";

export const createProjectSchema = z.object({
  name: z.string().min(1),
  description,
  priority: z.optional(priorityEnum).or(z.literal("")),
  status: z.optional(projectStatusEnum).or(z.literal("")),
  visibility: z.optional(z.enum(["PRIVATE", "PUBLIC"])).or(z.literal("")),
  startDate: optionalDatetime,
  endDate: optionalDatetime,
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
export type UpdateProjectFormData = z.infer<typeof updateProjectSchema>;
