"use client";

import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function CtaAbout() {
  return (
    <section className="px-4 py-3">
      <div className="bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl p-4 text-[#1E1E1E] text-center flex flex-col items-center gap-2">
        <h2 className="text-sm font-bold tracking-tight text-[#1E1E1E]">Siap Untuk Pengalaman Baru?</h2>
        <p className="text-[11px] text-[#707070] leading-relaxed">
          Mulai hari ini dengan secangkir kopi terbaik di lingkungan yang mendukung kreativitas Anda.
        </p>

        <Link
          href="/#location"
          className="w-full mt-1 py-2.5 px-4 rounded-lg bg-[#1E1E1E] hover:bg-black text-white font-medium text-xs flex items-center justify-center gap-1.5 min-h-[40px] transition active:scale-98 shadow-xs"
        >
          <MapPin className="w-3.5 h-3.5" />
          Temukan Lokasi Cabang
        </Link>
      </div>
    </section>
  );
}
