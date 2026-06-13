// Route constants shared by web and mobile apps

export const ROUTES = {
  // Marketing (web-only)
  HOME: "/",
  ABOUT: "/about",
  BLOG: "/blog",
  PRICING: "/pricing",
  CONTACT: "/contact",
  PROVIDER_FAQ: "/provider-faq",

  // Auth
  LOGIN: "/login",
  REGISTER: "/register",
  ONBOARDING: "/onboarding",

  // App (shared by web and mobile)
  DASHBOARD: "/dashboard",
  FEED: "/feed",
  PROFILE: "/profile",
  CHAT: "/chat",
  SETTINGS: "/settings",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
