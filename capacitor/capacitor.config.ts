import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.townlink.app",
  appName: "TownLink",
  webDir: "../apps/mobile/out",
  server: {
    androidScheme: "https",
  },
  plugins: {
    CapacitorUpdater: {
      autoUpdate: true,
    },
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: "#1a5c3a",
      showSpinner: false,
      androidScaleType: "CENTER_CROP",
    },
    StatusBar: {
      style: "LIGHT",
      backgroundColor: "#1a5c3a",
    },
  },
};

export default config;
