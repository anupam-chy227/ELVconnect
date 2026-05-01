import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api";
import { useToast } from "@/components/Toast/ToastContext";
import { AxiosError } from "axios";

type HttpMethod = "post" | "patch" | "put" | "delete";

interface UseMutationOptions<T> {
  method: HttpMethod;
  url: string;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  showSuccessToast?: boolean;
  successMessage?: string;
}

interface UseMutationState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

/**
 * Custom hook for making mutations (POST, PATCH, PUT, DELETE) to API
 * Handles loading, error, and success states
 */
export function useMutation<T = any, R = any>(
  options: UseMutationOptions<R>
): UseMutationState<R> & {
  mutate: (payload?: T) => Promise<R | null>;
} {
  const {
    method,
    url,
    onSuccess,
    onError,
    showSuccessToast = true,
    successMessage = "Operation completed successfully",
  } = options;

  const [state, setState] = useState<UseMutationState<R>>({
    data: null,
    loading: false,
    error: null,
  });

  const { addToast } = useToast();

  const mutate = useCallback(
    async (payload?: T): Promise<R | null> => {
      setState({ data: null, loading: true, error: null });

      try {
        let response;

        switch (method) {
          case "post":
            response = await apiClient.post<R>(url, payload);
            break;
          case "patch":
            response = await apiClient.patch<R>(url, payload);
            break;
          case "put":
            response = await apiClient.put<R>(url, payload);
            break;
          case "delete":
            response = await apiClient.delete<R>(url);
            break;
          default:
            throw new Error(`Unknown method: ${method}`);
        }

        const data = response.data;
        setState({ data, loading: false, error: null });

        if (showSuccessToast) {
          addToast(successMessage, "success");
        }

        onSuccess?.(data);
        return data;
      } catch (error: any) {
        setState({ data: null, loading: false, error });

        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Operation failed";
        addToast(errorMessage, "error");
        onError?.(error);
        return null;
      }
    },
    [method, url, onSuccess, onError, showSuccessToast, successMessage, addToast]
  );

  return { ...state, mutate };
}
