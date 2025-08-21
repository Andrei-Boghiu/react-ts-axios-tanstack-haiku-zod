import axios from "../lib/axios";
import type { CreateMilestoneFormData, UpdateMilestoneFormData } from "../schemas/milestone.schema";
import type { Milestone } from "../types/milestone";
import type { PaginatedResponse } from "../types/types";

export const createMilestone = async (data: CreateMilestoneFormData): Promise<Milestone> => {
  const res = await axios.post("/milestones", data);
  return res.data;
};

export const getMilestones = async (projectId: string): Promise<PaginatedResponse<Milestone>> => {
  const res = await axios.get(`/milestones/${projectId}`);
  return res.data;
};

export const getMilestoneById = async (id: string): Promise<Milestone> => {
  const res = await axios.get(`/milestones/id/${id}`);
  return res.data;
};

export const updateMilestone = async (id: string, data: UpdateMilestoneFormData): Promise<Milestone> => {
  const res = await axios.patch(`/milestones/${id}`, data);
  return res.data;
};

export const deleteMilestone = async (id: string): Promise<void> => {
  const res = await axios.delete(`/milestone/${id}`);
  return res.data;
};
