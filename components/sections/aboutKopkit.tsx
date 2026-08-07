"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AboutKopkit() {
  return (
    <section className="px-4 py-3">
      <div className="bg-white border border-[#E8E8E8] rounded-xl p-4 shadow-xs flex flex-col gap-3">
        <div>
          <h2 className="text-base font-bold text-[#1E1E1E] tracking-tight">Tentang Coffee</h2>
          <p className="text-[11px] text-[#707070]">Ruang kerja digital & tempat hangout</p>
        </div>

        <div className="relative w-full h-100 rounded-lg overflow-hidden border border-[#E8E8E8] bg-[#F7F7F7]">
          <Image
            src="/kopkit/aboutkopkit.png"
            alt="Suasana Coffee"
            fill
            className="object-cover"
          />
        </div>

        <p className="text-[#707070] text-xs leading-relaxed">
          COFFEE hadir sebagai tempat digital workspace dan hangout di mana kopi berkualitas bertemu suasana tenang untuk produktivitas Anda.
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-[#E8E8E8]">
          <span className="text-[11px] text-[#707070]">High-speed WiFi & Stopkontak</span>
          <Link
            href="/about"
            className="text-xs text-[#1E1E1E] font-medium flex items-center gap-0.5 min-h-[40px] px-1 hover:underline"
          >
            Detail
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
