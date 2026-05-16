import { themeConfig } from "@/lib/theme.config";

export const siteConfig = {
  name: themeConfig.brand.name,
  shortName: themeConfig.brand.shortName,
  description: themeConfig.brand.tagline,
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  defaultLocale: "ko",
  ogImage: "/og.png",
  links: {
    github: "",
    twitter: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
