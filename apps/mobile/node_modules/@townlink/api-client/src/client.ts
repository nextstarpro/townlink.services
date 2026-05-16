import type { ApiResponse } from "@townlink/core";

const DEFAULT_API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/.netlify/functions";

interface FetchOptions extends RequestInit {
  /** Auth token for authenticated requests */
  token?: string;
}

/**
 * Platform-aware API client for calling Netlify Functions.
 * Handles auth headers, retries, and error normalization.
 */
export async function apiFetch<T = unknown>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const { token, ...fetchOpts } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOpts.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${DEFAULT_API_BASE}${endpoint}`, {
      ...fetchOpts,
      headers,
    });

    const json = await res.json();

    if (!res.ok) {
      return { success: false, error: json.error ?? res.statusText };
    }

    return { success: true, data: json.data ?? json };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
