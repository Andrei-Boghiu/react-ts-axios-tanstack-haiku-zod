import axios from "../lib/axios";
import type { CreateProjectFormData } from "../schemas/project.schema";
import type { Project } from "../types/project";
import type { PaginatedResponse } from "../types/types";

export const getProjects = async (): Promise<PaginatedResponse<Project>> => {
  const res = await axios.get("/projects");
  return res.data;
};

export const createProject = async (data: CreateProjectFormData): Promise<Project> => {
  const res = await axios.post("/projects", data);
  return res.data;
};
