import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const accessToken = window.localStorage.getItem("accessToken");
  const refreshToken = window.localStorage.getItem("refreshToken");

  if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
  if (refreshToken) config.headers["x-refresh-token"] = refreshToken;

  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    const accessTokenHeader = res.headers["x-access-token"];
    const refreshTokenHeader = res.headers["x-refresh-token"];

    console.log(!!accessTokenHeader, !!refreshTokenHeader);

    if (accessTokenHeader) window.localStorage.setItem("accessToken", accessTokenHeader);
    if (refreshTokenHeader) window.localStorage.setItem("refreshToken", refreshTokenHeader);

    return res;
  },
  async (error) => {
    // should handle 401s here, but later
    return Promise.reject(error);
  }
);

export default axiosClient;
