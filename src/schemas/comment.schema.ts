import z from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(1, "Comment content is required"),
});

export const updateCommentSchema = createCommentSchema;

export type CreateCommentFormData = z.infer<typeof createCommentSchema>;
export type UpdateCommentFormData = z.infer<typeof updateCommentSchema>;
