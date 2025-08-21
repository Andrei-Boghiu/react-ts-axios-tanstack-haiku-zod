import axios from "../lib/axios";
import type { CreateProjectFormData } from "../schemas/project.schema";
import type { Project } from "../types/project";
import type { PaginatedResponse } from "../types/types";

export const createProject = async (data: CreateProjectFormData): Promise<Project> => {
  const res = await axios.post("/projects", data);
  return res.data;
};

export const getProjects = async (): Promise<PaginatedResponse<Project>> => {
  const res = await axios.get("/projects");
  return res.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
  const res = await axios.get(`/projects/${id}`);
  return res.data;
};

export const updateProject = async (id: string, data: Partial<CreateProjectFormData>): Promise<Project> => {
  const res = await axios.patch(`/projects/${id}`, data);
  return res.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  const res = await axios.delete(`/projects/${id}`);
  return res.data;
};
