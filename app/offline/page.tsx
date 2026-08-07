"use client";

import React from "react";
import Link from "next/link";
import { WifiOff, RotateCw, Home } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-6 text-center bg-white text-[#1E1E1E]">
      <div className="w-16 h-16 rounded-full bg-[#F7F7F7] border border-[#E8E8E8] flex items-center justify-center mb-5">
        <WifiOff className="w-7 h-7 text-[#707070]" />
      </div>

      <h1 className="text-lg font-bold mb-1">Anda Sedang Offline</h1>
      <p className="text-[#707070] text-xs max-w-xs mb-6 leading-relaxed">
        Koneksi internet Anda terputus. Silakan periksa koneksi Anda dan coba muat ulang halaman.
      </p>

      <div className="flex flex-col gap-2 w-full max-w-xs">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-1.5 py-2.5 px-5 rounded-lg bg-[#1E1E1E] hover:bg-black text-white font-medium text-xs shadow-xs transition active:scale-98 min-h-[40px]"
        >
          <RotateCw className="w-3.5 h-3.5" />
          Coba Lagi
        </button>
        <Link
          href="/"
          className="flex items-center justify-center gap-1.5 py-2.5 px-5 rounded-lg bg-[#F7F7F7] hover:bg-[#E8E8E8] text-[#1E1E1E] font-medium text-xs border border-[#E8E8E8] transition active:scale-98 min-h-[40px]"
        >
          <Home className="w-3.5 h-3.5" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
