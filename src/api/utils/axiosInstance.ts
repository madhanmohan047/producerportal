import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";
const AUTH_MODE = process.env.REACT_APP_AUTH_MODE || "BASIC";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let jwtToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  jwtToken = token;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    if (AUTH_MODE != "JWT") {
      const username = process.env.REACT_APP_BASIC_USER || "su";
      const password = process.env.REACT_APP_BASIC_PASS || "gw";
      const encoded = btoa(`${username}:${password}`);
      config.headers.Authorization = `Basic ${encoded}`;
    } else {
      if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
      } else {
        const fallbackToken = localStorage.getItem("auth0_token");
        if (fallbackToken) {
          config.headers.Authorization = `Bearer ${fallbackToken}`;
        } else {
          console.error("[Axios] NO TOKEN AVAILABLE in memory or storage!");
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
