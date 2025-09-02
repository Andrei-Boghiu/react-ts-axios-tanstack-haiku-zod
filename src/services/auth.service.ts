import axios, {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../lib/axios";
import type { RegisterFormData } from "../schemas/register.schema";
import type { LoginFormData } from "../schemas/login.schema";

export const registerUser = async (data: RegisterFormData) => {
  const response = await axios.post("/auth/register", data);

  const refreshToken = response.headers["x-refresh-token"];
  const accessToken = response.headers["x-access-token"];

  if (refreshToken && accessToken) {
    setRefreshToken(refreshToken);
    setAccessToken(accessToken);
  }

  return response.data;
};

export const loginUser = async (data: LoginFormData) => {
  const response = await axios.post("/auth/login", data);

  const refreshToken = response.headers["x-refresh-token"];
  const accessToken = response.headers["x-access-token"];

  if (refreshToken && accessToken) {
    setRefreshToken(refreshToken);
    setAccessToken(accessToken);
  }

  return response.data;
};

export const refreshTokens = async () => {
  const refreshToken = getRefreshToken();

  const response = await axios.post("/auth/refresh", { refreshToken });
  return response.data;
};

export const logoutUser = async () => {
  removeAccessToken();
  removeRefreshToken();

  const response = await axios.delete("/auth/logout");

  return response.data;
};

export const userProfile = async () => {
  const response = await axios.get("/auth/profile");
  return response.data;
};
