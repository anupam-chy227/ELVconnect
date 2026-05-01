import { useEffect, useState, useCallback, useRef } from "react";
import { apiClient } from "@/lib/api";
import { useToast } from "@/components/Toast/ToastContext";
import { AxiosError } from "axios";

interface UseQueryOptions {
  enabled?: boolean;
  retry?: boolean;
  retryCount?: number;
  showErrorToast?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

interface UseQueryState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

/**
 * Custom hook for fetching data from API
 * Handles loading, error, and success states
 */
export function useQuery<T = any>(
  url: string | null,
  options: UseQueryOptions = {}
): UseQueryState<T> & { refetch: () => Promise<void> } {
  const {
    enabled = true,
    retry = true,
    retryCount = 3,
    showErrorToast = true,
    onSuccess,
    onError,
  } = options;

  const [state, setState] = useState<UseQueryState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const { addToast } = useToast();
  const optionsRef = useRef({
    onSuccess,
    onError,
    addToast,
  });

  useEffect(() => {
    optionsRef.current = { onSuccess, onError, addToast };
  }, [onSuccess, onError, addToast]);

  const fetchData = useCallback(async () => {
    if (!url || !enabled) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    let lastError: any = null;
    const maxAttempts = retry ? retryCount + 1 : 1;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      try {
        const response = await apiClient.get<T>(url);
        const data = response.data;

        setState({ data, loading: false, error: null });
        optionsRef.current.onSuccess?.(data);
        return;
      } catch (error: any) {
        lastError = error;
        const shouldRetry =
          attempt < maxAttempts - 1 &&
          error.response?.status !== 401 &&
          error.response?.status !== 403 &&
          error.response?.status !== 429;

        if (!shouldRetry) {
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)));
      }
    }

    setState({ data: null, loading: false, error: lastError });
    const errorMessage =
      lastError?.response?.data?.message ||
      lastError?.message ||
      "Failed to fetch data";
    if (showErrorToast) {
      optionsRef.current.addToast(errorMessage, "error");
    }
    optionsRef.current.onError?.(lastError);
  }, [url, enabled, retry, retryCount, showErrorToast]);

  useEffect(() => {
    fetchData();
  }, [url, enabled, fetchData]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return { ...state, refetch };
}
