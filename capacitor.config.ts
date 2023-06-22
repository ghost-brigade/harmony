import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "sh.alexi.harmony",
  appName: "Harmony",
  webDir: "dist/apps/client",
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      androidScaleType: "CENTER_CROP",
    },
  },
};

export default config;
