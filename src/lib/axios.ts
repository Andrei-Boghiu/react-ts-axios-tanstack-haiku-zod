import axios from "axios";
import getCookieValue from "../utils/getCookieValue.util";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = getCookieValue("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Optional: interceptors (e.g., auth errors, token refresh)
axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    // You can check for 401s, log out user, etc.
    return Promise.reject(err);
  }
);

export default axiosClient;
