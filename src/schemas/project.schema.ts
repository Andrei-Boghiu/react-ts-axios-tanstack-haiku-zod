import z from "zod";
import { description, optionalDatetime, priorityEnum, projectStatusEnum } from "./zod.config";

export const createProjectSchema = z.object({
  name: z.string().min(1),
  description,
  priority: priorityEnum.optional(),
  status: projectStatusEnum.optional(),
  visibility: z.enum(["PRIVATE", "PUBLIC"]).optional(),
  startDate: optionalDatetime,
  endDate: optionalDatetime,
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
export type UpdateProjectFormData = z.infer<typeof updateProjectSchema>;
