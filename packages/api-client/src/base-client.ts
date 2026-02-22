import type { ApiResponse, ApiError, PaginatedResponse, PaginationParams } from "@nctp/api-types";

// ============================================================================
// Base API Client
// ============================================================================

export interface ClientConfig {
  baseUrl: string;
  apiKey?: string;
  accessToken?: string;
  timeout?: number;
  headers?: Record<string, string>;
  onError?: (error: ApiClientError) => void;
  onUnauthorized?: () => void;
}

export class ApiClientError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: Record<string, unknown>;

  constructor(message: string, status: number, code: string, details?: Record<string, unknown>) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class BaseAPIClient {
  protected readonly config: ClientConfig;

  constructor(config: ClientConfig) {
    this.config = {
      timeout: 30_000,
      ...config,
      baseUrl: config.baseUrl.replace(/\/$/, ""),
    };
  }

  protected getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...this.config.headers,
    };

    if (this.config.apiKey) {
      headers["X-API-Key"] = this.config.apiKey;
    }

    if (this.config.accessToken) {
      headers["Authorization"] = `Bearer ${this.config.accessToken}`;
    }

    return headers;
  }

  protected buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(`${this.config.baseUrl}${path}`);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }
    return url.toString();
  }

  protected buildPaginationParams(params?: PaginationParams): Record<string, string | number | undefined> {
    if (!params) return {};
    return {
      page: params.page,
      pageSize: params.pageSize,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
    };
  }

  protected async request<T>(
    method: string,
    path: string,
    options: {
      body?: unknown;
      params?: Record<string, string | number | boolean | undefined>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<T> {
    const url = this.buildUrl(path, options.params);
    const headers = { ...this.getHeaders(), ...options.headers };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const apiError = errorBody as ApiError | null;

        if (response.status === 401 && this.config.onUnauthorized) {
          this.config.onUnauthorized();
        }

        const error = new ApiClientError(
          apiError?.error?.message ?? `Request failed with status ${response.status}`,
          response.status,
          apiError?.error?.code ?? "UNKNOWN_ERROR",
          apiError?.error?.details
        );

        if (this.config.onError) {
          this.config.onError(error);
        }

        throw error;
      }

      const data = await response.json();
      return data as T;
    } catch (err) {
      clearTimeout(timeoutId);

      if (err instanceof ApiClientError) {
        throw err;
      }

      if (err instanceof DOMException && err.name === "AbortError") {
        throw new ApiClientError("Request timed out", 408, "TIMEOUT");
      }

      throw new ApiClientError(
        err instanceof Error ? err.message : "Network error",
        0,
        "NETWORK_ERROR"
      );
    }
  }

  protected get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.request<T>("GET", path, { params });
  }

  protected post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("POST", path, { body });
  }

  protected put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("PUT", path, { body });
  }

  protected patch<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("PATCH", path, { body });
  }

  protected delete<T>(path: string): Promise<T> {
    return this.request<T>("DELETE", path);
  }

  /**
   * Set or update the access token (e.g., after login or token refresh).
   */
  setAccessToken(token: string): void {
    (this.config as ClientConfig).accessToken = token;
  }

  /**
   * Health check for the API.
   */
  async healthCheck(): Promise<{ status: string; version: string }> {
    return this.get("/health");
  }
}
