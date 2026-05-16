"use client";

import { useEffect, useState } from "react";

type Platform = "web" | "android" | "ios";

interface PlatformInfo {
  isNative: boolean;
  isWeb: boolean;
  platform: Platform;
}

/**
 * Detects whether the app is running inside a Capacitor native shell
 * or in a standard browser/PWA context.
 */
export function usePlatform(): PlatformInfo {
  const [platform, setPlatform] = useState<PlatformInfo>({
    isNative: false,
    isWeb: true,
    platform: "web",
  });

  useEffect(() => {
    async function detect() {
      try {
        const { Capacitor } = await import("@capacitor/core");
        const isNative = Capacitor.isNativePlatform();
        const plat = Capacitor.getPlatform() as Platform;
        setPlatform({
          isNative,
          isWeb: !isNative,
          platform: plat,
        });
      } catch {
        // Capacitor not available — we're on web
      }
    }
    detect();
  }, []);

  return platform;
}
