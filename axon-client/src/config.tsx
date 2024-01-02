export const GITHUB_AUTH_URL = import.meta.env.VITE_GITHUB_AUTH_URL;
export const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL;
export const STRIPE_EXPLORER_URL = import.meta.env.VITE_STRIPE_EXPLORER_URL;
export const STRIPE_BASIC_URL = import.meta.env.VITE_STRIPE_BASIC_URL;
export const STRIPE_MANAGE_SUBSCRIPTION_URL = import.meta.env
  .VITE_STRIPE_MANAGE_SUBSCRIPTION_URL;
export const APP_ENV = import.meta.env.VITE_APP_ENV;
export const BASE_URL = () => {
  const appEnv = import.meta.env.VITE_APP_ENV;
  if (appEnv === "development") {
    return import.meta.env.VITE_DEV_BASE_URL;
  } else if (appEnv === "production") {
    return import.meta.env.VITE_PROD_BASE_URL;
  } else {
    return import.meta.env.VITE_DEV_BASE_URL;
  }
};
export const JSON_LINK_API_KEY = import.meta.env.VITE_JSON_LINK_API_KEY;