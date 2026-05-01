import axios, { AxiosInstance, AxiosError } from "axios";
import { API_BASE_URL, API_TIMEOUT, TOKEN_KEYS } from "./config";

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: string) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      withCredentials: true, // Enable sending cookies
    });

    // Request interceptor to add JWT token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
          const requestUrl = originalRequest?.url || "";
          const isAuthBootstrapRequest =
            requestUrl.includes("/auth/me") || requestUrl.includes("/auth/refresh");

          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.client(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const newAccessToken = await this.refreshAccessToken();
            this.failedQueue.forEach(({ resolve }) => resolve(newAccessToken));
            this.failedQueue = [];

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            this.failedQueue.forEach(({ reject }) => reject(refreshError));
            this.failedQueue = [];

            this.clearAuth();

            if (
              typeof window !== "undefined" &&
              this.isProtectedBrowserPath(window.location.pathname) &&
              !isAuthBootstrapRequest
            ) {
              window.location.href = "/login";
            }
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private isProtectedBrowserPath(pathname: string): boolean {
    return pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  }

  private async refreshAccessToken(): Promise<string> {
    try {
      const response = await this.client.post("/auth/refresh");
      const newAccessToken = response.data.data.accessToken;
      this.setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      throw error;
    }
  }

  // Token management methods
  public setAccessToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
    }
  }

  public getAccessToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
    }
    return null;
  }

  public clearAuth(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
    }
  }

  // API methods
  public get<T = any>(url: string, config = {}) {
    return this.client.get<T>(url, config);
  }

  public post<T = any>(url: string, data?: any, config = {}) {
    return this.client.post<T>(url, data, config);
  }

  public patch<T = any>(url: string, data?: any, config = {}) {
    return this.client.patch<T>(url, data, config);
  }

  public put<T = any>(url: string, data?: any, config = {}) {
    return this.client.put<T>(url, data, config);
  }

  public delete<T = any>(url: string, config = {}) {
    return this.client.delete<T>(url, config);
  }
}

export const apiClient = new ApiClient();
