import { getTokens, setTokens } from './tokenStore';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

interface ApiFetchOptions extends RequestInit {
  /** Skip attaching the access token / 401-refresh retry — for public endpoints and the auth endpoints themselves. */
  skipAuth?: boolean;
}

function buildHeaders(extra?: HeadersInit, attachAuth = true, isFormData = false): Record<string, string> {
  const headers: Record<string, string> = {
    // FormData sets its own multipart Content-Type (with boundary) — let fetch handle that.
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(extra as Record<string, string> | undefined),
  };

  const tokens = getTokens();
  if (attachAuth && tokens && !headers.Authorization) {
    headers.Authorization = `Bearer ${tokens.accessToken}`;
  }

  return headers;
}

let refreshPromise: Promise<boolean> | null = null;

/** Exposed so callers (e.g. a proactive background refresh timer) can trigger the same rotation apiFetch uses reactively on a 401. */
export async function refreshTokens(): Promise<boolean> {
  const tokens = getTokens();
  if (!tokens) return false;

  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: tokens.refreshToken }),
        });
        if (!res.ok) {
          setTokens(null);
          return false;
        }
        const next = (await res.json()) as { accessToken: string; refreshToken: string };
        setTokens(next);
        return true;
      } catch {
        setTokens(null);
        return false;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}

async function throwApiError(res: Response): Promise<never> {
  const body = await res.json().catch(() => null);
  throw new ApiError(res.status, body?.error ?? 'Something went wrong. Please try again.');
}

export async function apiFetch<T>(path: string, options?: ApiFetchOptions): Promise<T> {
  const { skipAuth, ...rest } = options ?? {};
  const isFormData = rest.body instanceof FormData;

  let res = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: buildHeaders(rest.headers, !skipAuth, isFormData),
  });

  if (res.status === 401 && !skipAuth && getTokens()) {
    const refreshed = await refreshTokens();
    if (refreshed) {
      res = await fetch(`${API_BASE_URL}${path}`, {
        ...rest,
        headers: buildHeaders(rest.headers, true, isFormData),
      });
    }
  }

  if (!res.ok) {
    return throwApiError(res);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
