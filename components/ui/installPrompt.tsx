"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Download, X, Share2, PlusSquare } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream: boolean }).MSStream;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

    if (isIOS && !isStandalone) {
      const dismissed = localStorage.getItem("coffee_ios_prompt_dismissed");
      if (!dismissed) {
        queueMicrotask(() => {
          setShowIOSPrompt(true);
        });
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  const dismissPrompt = () => {
    setIsDismissed(true);
    if (showIOSPrompt) {
      localStorage.setItem("coffee_ios_prompt_dismissed", "true");
    }
  };

  if (isDismissed) return null;

  if (deferredPrompt) {
    return (
      <div className="fixed top-16 left-0 right-0 z-50 flex justify-center p-3">
        <div className="w-full max-w-md bg-white border border-[#E8E8E8] text-[#1E1E1E] rounded-xl p-3 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F7F7F7] border border-[#E8E8E8] p-1 flex items-center justify-center shrink-0">
              <Image
                src="/kopkit/LogoMain.png"
                alt="COFFEE Logo"
                width={32}
                height={32}
                className="rounded object-cover"
              />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#1E1E1E]">Install Aplikasi COFFEE</h4>
              <p className="text-[11px] text-[#707070]">Akses cepat di layar utama Anda.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="bg-[#1E1E1E] hover:bg-black text-white text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-1.5 min-h-[36px] transition active:scale-98 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Install
            </button>
            <button
              onClick={dismissPrompt}
              className="text-[#707070] hover:text-[#1E1E1E] p-1.5 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showIOSPrompt) {
    return (
      <div className="fixed bottom-20 left-0 right-0 z-50 flex justify-center p-3">
        <div className="w-full max-w-md bg-white border border-[#E8E8E8] text-[#1E1E1E] rounded-xl p-4 shadow-sm relative">
          <button
            onClick={dismissPrompt}
            className="absolute top-2 right-2 text-[#707070] hover:text-[#1E1E1E] p-1"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <Share2 className="w-4 h-4 text-[#1E1E1E]" />
            <h4 className="text-xs font-semibold text-[#1E1E1E]">Install di iOS Safari</h4>
          </div>
          <p className="text-[11px] text-[#707070] flex items-center gap-1 flex-wrap">
            Ketuk tombol <Share2 className="w-3 h-3 inline text-[#1E1E1E]" /> di Safari, lalu pilih <PlusSquare className="w-3 h-3 inline text-[#1E1E1E]" /> <b>&quot;Tambah ke Layar Utama&quot;</b>.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
