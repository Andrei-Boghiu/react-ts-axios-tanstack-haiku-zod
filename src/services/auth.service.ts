import axiosClient from "../lib/axios";
import type { RegisterFormData } from "../schemas/register.schema";
import type { LoginInput } from "../schemas/login.schema";

export const registerUser = async (data: RegisterFormData) => {
  const response = await axiosClient.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginInput) => {
  const response = await axiosClient.post("/auth/login", data);
  return response.data;
};

export const refreshToken = async () => {
  const response = await axiosClient.get("/auth/refresh");
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosClient.delete("/auth/logout");
  return response.data;
};

export const userProfile = async () => {
  const response = await axiosClient.get("/auth/profile");
  return response.data;
};
