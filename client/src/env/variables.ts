/**
 * Base URL for connecting to the proxy backend server, set via environment
 * variables when building the application
 */
export const baseUrl: string | undefined =
  import.meta.env.BASE_PROXY_URL ||
  console.warn(
    "baseUrl for backend proxy server not found. " +
      "API requests requiring authentication will not work."
  );
