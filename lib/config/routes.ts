/**
 * Route configuration for authentication middleware.
 * All routes are protected by default.
 */

export const publicRoutes = ["/", "/login"] as const;

export const authRoutes = ["/login"] as const;

export const DEFAULT_LOGIN_REDIRECT = "/transactions";

export const LOGIN_PATH = "/login";
