import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";

const basicAuthHeader = (axios.defaults.headers.common["Authorization"] =
  "Basic " + btoa("admin:password"));

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: basicAuthHeader,
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
