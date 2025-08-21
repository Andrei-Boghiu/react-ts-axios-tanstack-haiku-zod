import axios from "../lib/axios";
import type { RegisterFormData } from "../schemas/register.schema";
import type { LoginInput } from "../schemas/login.schema";

export const registerUser = async (data: RegisterFormData) => {
  const response = await axios.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginInput) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.delete("/auth/logout");
  return response.data;
};

export const userProfile = async () => {
  const response = await axios.get("/auth/profile");
  return response.data;
};
