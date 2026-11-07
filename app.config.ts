import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  const isDev = process.env.APP_VARIANT === "development";

  return {
    ...config,
    name: isDev ? "Isku (Dev)" : (config.name ?? "isku"),
    slug: "isku",
    ios: {
      ...config.ios,
      bundleIdentifier: isDev
        ? "com.isku.app.dev"
        : (config.ios?.bundleIdentifier ?? "com.isku.app"),
    },
    android: {
      ...config.android,
      package: isDev
        ? "com.isku.app.dev"
        : (config.android?.package ?? "com.isku.app"),
    },
  };
};
