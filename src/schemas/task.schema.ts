import z from "zod";
import { description, optionalDatetime, priorityEnum, statusEnum } from "./zod.config";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description,
  priority: z.optional(priorityEnum).or(z.literal("")),
  status: z.optional(statusEnum).or(z.literal("")),
  dueDate: optionalDatetime,
  assigneeId: z.optional(z.string().uuid()).nullable(),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;
