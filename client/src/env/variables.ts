import Constants from "expo-constants";

export const baseUrl =
  Constants.expoConfig?.extra?.baseProxyUrl ||
  console.warn(
    "baseUrl for backend proxy server not found. " +
      "API requests requiring authentication will not work."
  );
