"use client";

import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { Download, Share, Compass } from "lucide-react";

export function PlatformGate({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isIosSafari, setIsIosSafari] = useState(false);

  useEffect(() => {
    try {
      // 1. Check if we are running in Capacitor Native Android/iOS App
      const isNative = Capacitor.isNativePlatform();

      // 2. Check if we are running as an installed PWA
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.matchMedia("(display-mode: minimal-ui)").matches ||
        window.matchMedia("(display-mode: window-controls-overlay)").matches ||
        (window.navigator as any).standalone === true;

      // 3. Simple iOS detection for the instructional UI
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isAppleDevice = /iphone|ipad|ipod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsIos(isAppleDevice);

      const isSafari = isAppleDevice && /safari/i.test(userAgent) && !/crios|fxios|opr|edgios|fbav|instagram|twitter/i.test(userAgent);
      setIsIosSafari(isSafari);

      if (isNative || isStandalone) {
        // If native or installed, allow the app to render!
        setShowApp(true);
      }
    } catch (e) {
      console.error("PlatformGate Error:", e);
      // Fallback: If detection crashes, show the gateway by default
    } finally {
      setIsReady(true);
    }
  }, []);

  // Prevent hydration errors by waiting for client-side evaluation
  if (!isReady) return null;

  // If they are allowed in, render the app normally
  if (showApp) {
    return <>{children}</>;
  }

  // Otherwise, render the Installation Instructions Gate
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full space-y-8 flex flex-col items-center">
        {/* App Icon */}
        <img src="/icon.png" alt="Townlink Logo" className="w-24 h-24 rounded-2xl shadow-lg object-cover" />

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Townlink</h1>
          <p className="text-gray-500">Ghana's Trusted Service Directory</p>
        </div>

        {isIos ? (
          isIosSafari ? (
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl w-full text-left space-y-4">
              <p className="font-semibold text-blue-900">Install the iOS App</p>
              <ol className="text-sm text-blue-800 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-blue-200 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">1</span>
                  <span>Tap the <Share className="inline w-4 h-4 mx-1" /> <strong>Share</strong> button at the bottom of Safari.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-200 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">2</span>
                  <span>Scroll down and select <strong>"Add to Home Screen"</strong>.</span>
                </li>
              </ol>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl w-full text-left space-y-4">
              <p className="font-semibold text-amber-900 flex items-center gap-2">
                <Compass className="w-5 h-5" /> Open in Safari
              </p>
              <p className="text-sm text-amber-800 leading-relaxed">
                To install this app, you must open this link in the official <strong>Safari</strong> browser. Apple does not allow apps to be installed from here.
              </p>
            </div>
          )
        ) : (
          <div className="bg-gray-100 p-6 rounded-2xl w-full">
            <p className="text-gray-600 text-sm">
              Please open this page in <strong>Safari on your iPhone</strong> to install the application, or download our Android app from the <a href="https://play.google.com/store/apps/details?id=com.townLink.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Play Store</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
