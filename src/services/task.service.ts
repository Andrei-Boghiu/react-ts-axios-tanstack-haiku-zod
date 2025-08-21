import axios from "../lib/axios";
import type { CreateTaskFormData, UpdateTaskFormData } from "../schemas/task.schema";
import type { Task } from "../types/task";
import type { PaginatedResponse } from "../types/types";

export const createTask = async (data: CreateTaskFormData): Promise<Task> => {
  const res = await axios.post("/tasks", data);
  return res.data;
};

export const getTasks = async (projectId: string): Promise<PaginatedResponse<Task>> => {
  const res = await axios.get(`/tasks/${projectId}`);
  return res.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const res = await axios.get(`/tasks/id/${id}`);
  return res.data;
};

export const updateTask = async (id: string, data: UpdateTaskFormData): Promise<Task> => {
  const res = await axios.patch(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  const res = await axios.delete(`/task/${id}`);
  return res.data;
};
