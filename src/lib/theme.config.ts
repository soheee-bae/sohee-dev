/**
 * Single source of truth for brand & UX-level constants.
 *
 * Color tokens themselves live in `src/app/globals.css` (Tailwind v4 @theme).
 * Use this file for values that the app reads at runtime: brand identity,
 * default theme behavior, admin allowlist, etc.
 */

export const themeConfig = {
  brand: {
    name: "Sohee.dev",
    shortName: "Sohee",
    tagline: "Notes, code and the road in between.",
  },
  fonts: {
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  },
  defaultMode: "system" as "light" | "dark" | "system",
  /**
   * Email allowlist used until a Firestore-backed admin role is wired up.
   * Sign-ins that match are treated as admins and may enter `/admin/*`.
   */
  adminEmails: [] as string[],
} as const;

export type ThemeConfig = typeof themeConfig;
