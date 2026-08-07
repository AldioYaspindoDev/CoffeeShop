"use client";

import React, { useEffect } from "react";
import BottomNav from "./bottomNav";
import InstallPrompt from "./installPrompt";

interface MobileAppShellProps {
  children: React.ReactNode;
}

export default function MobileAppShell({ children }: MobileAppShellProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("COFFEE Service Worker registered with scope:", reg.scope);
          })
          .catch((err) => {
            console.error("Service Worker registration failed:", err);
          });
      });
    }
  }, []);

  return (
    <div className="min-h-dvh w-full bg-[#F7F7F7] flex justify-center items-start text-[#1E1E1E] antialiased selection:bg-[#1E1E1E] selection:text-white">
      {/* Outer desktop backdrop subtle indicator */}
      <div className="hidden lg:flex fixed top-6 left-8 text-xs text-[#707070] flex-col gap-1">
        <span className="font-semibold text-[#1E1E1E] text-sm">COFFEE</span>
        <span>Mobile App Mode (320px – 430px)</span>
      </div>

      {/* Main Mobile App Container */}
      <div className="w-full max-w-md min-h-dvh bg-white text-[#1E1E1E] border-x border-[#E8E8E8] shadow-sm relative flex flex-col pb-20 overflow-x-hidden">
        {/* PWA Install Banner */}
        <InstallPrompt />

        {/* Dynamic Page Content */}
        <main className="flex-1 w-full flex flex-col">{children}</main>

        {/* Fixed Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
