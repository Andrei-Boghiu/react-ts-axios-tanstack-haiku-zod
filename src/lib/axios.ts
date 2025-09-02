import axios, { AxiosError } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { refreshTokens } from "../services/auth.service";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const REFRESH_TOKEN_KEY = "REFRESH_TOKEN_MEOW";

export const setRefreshToken = (newToken: string) => window.localStorage.setItem(REFRESH_TOKEN_KEY, newToken);
export const getRefreshToken = () => window.localStorage.getItem(REFRESH_TOKEN_KEY);
export const removeRefreshToken = () => window.localStorage.clear();

export const setAccessToken = (newToken: string) =>
  (axiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`);
export const removeAccessToken = () => delete axiosClient.defaults.headers.common.Authorization;

export const refreshAuth = async (failedRequest: AxiosError) => {
  try {
    const newTokens = await refreshTokens();
    const accessToken = newTokens?.accessToken;
    const refreshToken = newTokens?.refreshToken;

    if (accessToken && refreshToken && failedRequest?.response) {
      // failedRequest.response.config.headers.Authorization = "Bearer " + accessToken;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      return Promise.resolve(accessToken);
    } else {
      removeAccessToken();
      removeRefreshToken();
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
