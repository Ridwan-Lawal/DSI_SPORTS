/**
 * This routes are accessible by everyone
 * @type {string[]}
 */
export const publicRoutes = ["/news", "/tags"];
export const publicHomePage = ["/"];

/**
 * This prefix is for auth api routes
 * @type {string}
 */

export const authApiPrefix = "/api/auth";

/**
 * This routes below are authentication routes, only accessible by unauthenticated users
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/admin/login",
  "/auth/admin/create-new-password",
  "/auth/admin/forgot-password",
  "/auth/admin/reset-password",
];

/**
 * The routes beginning with this prefix are only accessible by admins
 * @type {string}
 */
export const adminRoutes = "/admin";

/**
 * The default route for admin
 * @type {string}
 */
export const DEFAULT_ADMIN_REDIRECT = "/admin/overview";

/**
 * The default redirect route for users
 * @type {string}
 */

export const DEFAULT_USER_REDIRECT = "/";
