import axios from "axios";

let accessToken = window.localStorage.getItem("accessToken");
let refreshToken = window.localStorage.getItem("refreshToken");

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
  if (refreshToken) config.headers["x-refresh-token"] = refreshToken;

  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    const accessTokenHeader = res.headers["x-access-token"];
    const refreshTokenHeader = res.headers["x-refresh-token"];

    if (accessTokenHeader) {
      accessToken = accessTokenHeader;
      window.localStorage.setItem("accessToken", accessTokenHeader);
    }
    if (refreshTokenHeader) {
      refreshToken = refreshTokenHeader;
      window.localStorage.setItem("refreshToken", refreshTokenHeader);
    }

    return res;
  },
  async (error) => {
    // should handle 401s here, but later
    return Promise.reject(error);
  }
);

export default axiosClient;
