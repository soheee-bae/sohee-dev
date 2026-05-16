"use client";

import * as React from "react";
import { onAuthStateChanged, type User } from "firebase/auth";

import { getFirebaseAuth } from "@/lib/firebase/auth";
import { themeConfig } from "@/lib/theme.config";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

function checkIsAdmin(user: User | null): boolean {
  if (!user?.email) return false;
  return themeConfig.adminEmails.includes(user.email);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;
    try {
      unsub = onAuthStateChanged(getFirebaseAuth(), (next) => {
        if (cancelled) return;
        setUser(next);
        setIsLoading(false);
      });
    } catch (err) {
      // Firebase not configured yet — surface a console hint and let the
      // app stay interactive in an unauthenticated state.
      console.warn("[AuthProvider] Firebase auth unavailable:", err);
      const id = setTimeout(() => {
        if (!cancelled) setIsLoading(false);
      }, 0);
      return () => {
        cancelled = true;
        clearTimeout(id);
      };
    }
    return () => {
      cancelled = true;
      unsub?.();
    };
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({ user, isLoading, isAdmin: checkIsAdmin(user) }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
