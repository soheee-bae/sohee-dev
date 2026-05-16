"use client";

import * as React from "react";

import { Toaster } from "@/components/ui/sonner";
import { themeConfig } from "@/lib/theme.config";

import { AuthProvider } from "./auth-provider";
import { ThemeProvider } from "./theme-provider";

/**
 * Single entry point for every client-side context the app depends on.
 *
 * Order matters: providers higher in the tree are read by ones below.
 *   ThemeProvider  → exposes `useTheme()` to the rest of the tree.
 *   AuthProvider   → may render UI that respects the current theme.
 *   <Toaster />    → consumes `useTheme()` for theme-aware styling.
 *
 * Add new global contexts (query client, i18n, analytics, …) here so
 * `app/layout.tsx` keeps a single mounting point.
 */
export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={themeConfig.defaultMode}
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
