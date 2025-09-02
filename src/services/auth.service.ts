import axios from "../lib/axios";
import type { RegisterFormData } from "../schemas/register.schema";
import type { LoginFormData } from "../schemas/login.schema";
import { getRefreshToken, removeTokens, updateTokens } from "../lib/auth-tokens";

export const registerUser = async (data: RegisterFormData) => {
  const response = await axios.post("/auth/register", data);

  const refreshToken = response.headers["x-refresh-token"];
  const accessToken = response.headers["x-access-token"];
  updateTokens({ accessToken, refreshToken });

  return response.data;
};

export const loginUser = async (data: LoginFormData) => {
  const response = await axios.post("/auth/login", data);

  const refreshToken = response.headers["x-refresh-token"];
  const accessToken = response.headers["x-access-token"];
  updateTokens({ accessToken, refreshToken });

  return response.data;
};

export const refreshTokens = async () => {
  const oldRefreshToken = getRefreshToken();

  const response = await axios.post("/auth/refresh", { refreshToken: oldRefreshToken });

  const { refreshToken, accessToken } = response.data;

  updateTokens({ accessToken, refreshToken });

  return accessToken;
};

export const logoutUser = async () => {
  removeTokens();

  const response = await axios.delete("/auth/logout");

  return response.data;
};

export const userProfile = async () => {
  const response = await axios.get("/auth/profile");
  return response.data;
};
