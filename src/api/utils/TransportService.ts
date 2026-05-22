import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

class TransportService {
  private instance: AxiosInstance;
  private tokenProvider: (() => Promise<string | null>) | null = null;

  constructor() {
    const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";

    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  public setTokenProvider(provider: () => Promise<string | null>) {
    this.tokenProvider = provider;
    console.log(
      "%c [Transport] Token Provider linked successfully",
      "color: #00ff00; font-weight: bold;",
    );
  }

  private setupInterceptors() {
    const AUTH_MODE = process.env.REACT_APP_AUTH_MODE || "JWT";

    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (AUTH_MODE === "BASIC") {
          const username = process.env.REACT_APP_BASIC_USER || "su";
          const password = process.env.REACT_APP_BASIC_PASS || "gw";
          config.headers.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
          return config;
        }

        if (this.tokenProvider) {
          try {
            const token = await this.tokenProvider();
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
              return config;
            }
          } catch (err) {
            console.error(
              "[Transport] Error fetching token from provider:",
              err,
            );
          }
        }

        console.error("[Transport] NO TOKEN PROVIDER OR TOKEN FOUND!");
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("[Transport] API Error:", error);
        return Promise.reject(error);
      },
    );
  }

  public get api() {
    return this.instance;
  }
}

export const transport = new TransportService();
