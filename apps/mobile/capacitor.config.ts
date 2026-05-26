import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.townLink.app",
  appName: "TownLink",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    CapacitorUpdater: {
      autoUpdate: true,
      updateUrl: "https://services.townlinkglobal.com/ota/latest.json"
    },
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: "#00404F",
      showSpinner: false,
      androidScaleType: "CENTER_CROP",
    },
    StatusBar: {
      style: "LIGHT",
      backgroundColor: "#00404F",
    },
  },
};

export default config;
