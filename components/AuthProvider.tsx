'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  name: string;
  role: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = 'betterdirect_auth_user';
const AUTH_COOKIE_NAME = 'betterdirect_auth';

function persistCookie(isAuthenticated: boolean) {
  const expires = isAuthenticated
    ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
    : 'Thu, 01 Jan 1970 00:00:00 GMT';

  document.cookie = `${AUTH_COOKIE_NAME}=${isAuthenticated ? '1' : ''}; expires=${expires}; path=/; SameSite=Lax`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);

    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored auth user', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string) => {
    // Mock API delay to simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 500));

    const name = email.split('@')[0] || 'User';
    const userProfile: User = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      role: 'IT Manager',
      email,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userProfile));
    persistCookie(true);
    setUser(userProfile);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    persistCookie(false);
    setUser(null);
    router.push('/login');
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }),
    [isLoading, login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
