import axios from "../lib/axios";
import type { CreateCommentFormData, UpdateCommentFormData } from "../schemas/comment.schema";
import type { Comment } from "../types/comment";
import type { PaginatedResponse } from "../types/types";

export const createComment = async (data: CreateCommentFormData): Promise<Comment> => {
  const res = await axios.post("/comments", data);
  return res.data;
};

export const getComments = async (projectId: string): Promise<PaginatedResponse<Comment>> => {
  const res = await axios.get(`/comments/${projectId}`);
  return res.data;
};

export const getCommentById = async (id: string): Promise<Comment> => {
  const res = await axios.get(`/comments/id/${id}`);
  return res.data;
};

export const updateComment = async (id: string, data: UpdateCommentFormData): Promise<Comment> => {
  const res = await axios.patch(`/comments/${id}`, data);
  return res.data;
};

export const deleteComment = async (id: string): Promise<void> => {
  const res = await axios.delete(`/comment/${id}`);
  return res.data;
};
