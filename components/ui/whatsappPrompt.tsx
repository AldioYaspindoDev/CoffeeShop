"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, MessageCircle } from "lucide-react";

// ── KONFIGURASI ──────────────────────────────────────────────────────────────
// Ganti nomor di bawah dengan nomor WhatsApp tujuan (format internasional tanpa +)
const WA_NUMBER = "6281234567890";
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "coffee_wa_prompt_shown";

export default function WhatsAppPrompt() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const alreadyShown = localStorage.getItem(STORAGE_KEY);
    if (!alreadyShown) {
      // Tampilkan setelah sedikit delay agar halaman sempat render
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setClosing(true);
    localStorage.setItem(STORAGE_KEY, "true");
    setTimeout(() => setVisible(false), 300);
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${WA_NUMBER}`;
    window.open(url, "_blank", "noopener,noreferrer");
    dismiss();
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
        style={{
          animation: closing
            ? "waFadeOut 0.3s ease forwards"
            : "waFadeIn 0.3s ease forwards",
        }}
        onClick={dismiss}
      />

      {/* Modal Card */}
      <div
        className="fixed bottom-24 left-0 right-0 z-50 flex justify-center px-4"
        style={{
          animation: closing
            ? "waSlideDown 0.3s ease forwards"
            : "waSlideUp 0.3s ease forwards",
        }}
      >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E8E8E8]">
          {/* Header accent */}
          <div className="h-1 w-full bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#075E54]" />

          <div className="p-5">
            {/* Close button */}
            <button
              onClick={dismiss}
              aria-label="Tutup"
              className="absolute top-4 right-4 text-[#707070] hover:text-[#1E1E1E] transition p-1 rounded-full hover:bg-[#F7F7F7]"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Logo + teks */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#F7F7F7] border border-[#E8E8E8] flex items-center justify-center shrink-0">
                <Image
                  src="/kopkit/LogoMain.png"
                  alt="COFFEE Logo"
                  width={36}
                  height={36}
                  className="rounded-lg object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1E1E1E] leading-tight">
                  Hubungi Kami via WhatsApp
                </h3>
                <p className="text-[11px] text-[#707070] mt-0.5 leading-snug">
                  Reservasi, pertanyaan, atau sekadar menyapa — kami siap membantu!
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={openWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-[0.98] text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all duration-150 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Buka WhatsApp
            </button>

            {/* Skip */}
            <button
              onClick={dismiss}
              className="w-full mt-2 text-[11px] text-[#707070] hover:text-[#1E1E1E] py-1.5 transition"
            >
              Nanti saja
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes waFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes waFadeOut { from { opacity: 1 } to { opacity: 0 } }
        @keyframes waSlideUp {
          from { opacity: 0; transform: translateY(24px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        @keyframes waSlideDown {
          from { opacity: 1; transform: translateY(0) }
          to   { opacity: 0; transform: translateY(24px) }
        }
      `}</style>
    </>
  );
}
