import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { apiFetch, refreshTokens } from '../lib/api';
import { getTokens, setTokens, subscribe, type Tokens } from '../lib/tokenStore';
import type { Role } from '../lib/types';

/** Access tokens live 15 minutes server-side; refresh well before that so an idle-but-open tab never hits an expired one. */
const PROACTIVE_REFRESH_INTERVAL_MS = 10 * 60 * 1000;

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

interface AuthResponse extends Tokens {
  user: AuthUser;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<AuthUser>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const restoreSession = useCallback(async () => {
    if (!getTokens()) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const me = await apiFetch<AuthUser>('/auth/me');
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
    return subscribe(() => {
      if (!getTokens()) {
        setUser(null);
      }
    });
  }, [restoreSession]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (getTokens()) {
        void refreshTokens();
      }
    }, PROACTIVE_REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({ email, password }),
    });
    setTokens({ accessToken: res.accessToken, refreshToken: res.refreshToken });
    setUser(res.user);
    return res.user;
  }, []);

  const register = useCallback(
    async (data: { name: string; email: string; password: string; phone?: string }) => {
      const res = await apiFetch<AuthResponse>('/auth/register', {
        method: 'POST',
        skipAuth: true,
        body: JSON.stringify(data),
      });
      setTokens({ accessToken: res.accessToken, refreshToken: res.refreshToken });
      setUser(res.user);
      return res.user;
    },
    []
  );

  const logout = useCallback(async () => {
    const tokens = getTokens();
    setTokens(null);
    setUser(null);
    if (tokens) {
      await apiFetch('/auth/logout', {
        method: 'POST',
        skipAuth: true,
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      }).catch(() => undefined);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
