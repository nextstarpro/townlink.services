"use client";

import { useEffect } from "react";

/**
 * Capgo OTA updater initialization.
 * Calls notifyAppReady() when running inside a Capacitor native shell.
 * Must fire within 10 seconds of app launch or Capgo auto-rollbacks.
 *
 * This is a client component — it has zero impact on SSR or SEO.
 * It only runs inside the mobile app (apps/mobile), never in apps/web.
 */
export function CapgoInit() {
  useEffect(() => {
    async function init() {
      try {
        const { Capacitor } = await import("@capacitor/core");
        if (Capacitor.isNativePlatform()) {
          const { CapacitorUpdater } = await import(
            "@capgo/capacitor-updater"
          );
          CapacitorUpdater.notifyAppReady();
        }
      } catch {
        // Not in a native context — silently ignore
      }
    }
    init();
  }, []);

  return null;
}
