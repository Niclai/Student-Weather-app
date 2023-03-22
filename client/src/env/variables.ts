/**
 * Base URL for connecting to the proxy backend server, set via environment
 * variables when building the application
 */
export const baseUrl: string | undefined =
  import.meta.env.VITE_BASE_PROXY_URL ||
  console.warn(
    "baseUrl for backend proxy server not found. " +
      "API requests requiring authentication will not work."
  );

export const gmapsApiKey: string | undefined =
  import.meta.env.VITE_GMAPS_API_KEY ||
  console.warn(
    "gmapsApiKey for places autocomplete not found. " +
      "API requests requiring authentication will not work."
  );
