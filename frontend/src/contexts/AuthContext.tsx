"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiClient } from "@/lib/api";
import { User, AuthResponse, LoginPayload, RegisterPayload } from "@/types";
import { useToast } from "@/components/Toast/ToastContext";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  loginWithGoogle: (credential: string, role?: "customer" | "service_provider") => Promise<void>;
  register: (payload: RegisterPayload, isServiceProvider: boolean) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  // Load user from API on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await apiClient.get<AuthResponse>("/auth/me");
        setUser(response.data.data.user);
      } catch {
        // User not authenticated, clear any stale tokens
        apiClient.clearAuth();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      try {
        setLoading(true);
        const response = await apiClient.post<AuthResponse>("/auth/login", payload);
        const { user, accessToken } = response.data.data;

        apiClient.setAccessToken(accessToken);
        setUser(user);
        addToast("Login successful!", "success");
      } catch (error: any) {
        const message =
          error.response?.data?.message || "Login failed. Please try again.";
        addToast(message, "error");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  const loginWithGoogle = useCallback(
    async (credential: string, role: "customer" | "service_provider" = "customer") => {
      try {
        setLoading(true);
        const response = await apiClient.post<AuthResponse>("/auth/google", {
          credential,
          role,
        });
        const { user, accessToken } = response.data.data;

        apiClient.setAccessToken(accessToken);
        setUser(user);
        addToast("Google sign-in successful!", "success");
      } catch (error: any) {
        const message =
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "Google sign-in failed. Please try again.";
        addToast(message, "error");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  const register = useCallback(
    async (payload: RegisterPayload, isServiceProvider: boolean) => {
      try {
        setLoading(true);
        const endpoint = isServiceProvider
          ? "/auth/register/service-provider"
          : "/auth/register/customer";

        const response = await apiClient.post<AuthResponse>(endpoint, payload);
        const { user, accessToken } = response.data.data;

        apiClient.setAccessToken(accessToken);
        setUser(user);
        addToast("Registration successful!", "success");
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          "Registration failed. Please try again.";
        addToast(message, "error");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await apiClient.post("/auth/logout");
      apiClient.clearAuth();
      setUser(null);
      addToast("Logged out successfully", "success");
    } catch (error: any) {
      const message = error.response?.data?.message || "Logout failed";
      addToast(message, "error");
      // Still clear local auth even if API call fails
      apiClient.clearAuth();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const refreshUser = useCallback(async () => {
    try {
      const response = await apiClient.get<AuthResponse>("/auth/me");
      setUser(response.data.data.user);
    } catch {
      apiClient.clearAuth();
      setUser(null);
    }
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    loginWithGoogle,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
