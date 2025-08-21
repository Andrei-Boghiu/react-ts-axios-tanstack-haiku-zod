import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const storedAccessToken = localStorage.getItem("accessToken");
const storedRefreshToken = localStorage.getItem("refreshToken");

if (storedAccessToken && storedRefreshToken) {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${storedAccessToken}`;
  axiosClient.defaults.headers.common["x-refresh-token"] = storedRefreshToken;
  console.log("Authorization and Refresh tokens were updated");
}

axiosClient.interceptors.response.use(
  (res) => {
    const accessToken = res.headers["x-access-token"];
    const refreshToken = res.headers["x-refresh-token"];

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axiosClient.defaults.headers.common["x-refresh-token"] = refreshToken;
      console.log("Authorization and Refresh tokens were updated");
    }

    return res;
  },
  async (error) => {
    // should handle 401s here, but later
    return Promise.reject(error);
  }
);

export default axiosClient;
