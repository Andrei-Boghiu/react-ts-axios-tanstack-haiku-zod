import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { refreshTokens } from "../services/auth.service";
import { removeTokens } from "./auth-tokens";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshAuth = async () => {
  try {
    const accessToken = await refreshTokens();

    if (accessToken) {
      return Promise.resolve(accessToken);
    } else {
      removeTokens();
      window.location.href = "/login";
      return Promise.reject();
    }
  } catch (error) {
    console.error(error);
  }
};

createAuthRefreshInterceptor(axiosClient, refreshAuth, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});

export default axiosClient;
