"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function HeroAbout() {
  return (
    <section className="px-4 pt-4 pb-2">
      <div className="bg-white border border-[#E8E8E8] rounded-xl p-4 shadow-xs flex flex-col gap-3">
        <h1 className="text-xl font-bold text-[#1E1E1E] tracking-tight">
          Tentang COFFEE
        </h1>

        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-[#E8E8E8] bg-[#F7F7F7]">
          <Image
            src="/kopkit/HeroAbout.jpg"
            alt="Tentang Coffee Workspace & Cafe"
            fill
            priority
            className="object-cover"
            sizes="400px"
          />
        </div>

        <div className="text-[#707070] text-xs leading-relaxed space-y-2">
          <p>
            Di COFFEE, kami percaya bahwa setiap tegukan kopi membawa cerita. Berawal dari keinginan sederhana untuk menciptakan ruang produktif dan santai, COFFEE hadir sebagai <strong className="text-[#1E1E1E]">&apos;Your Digital Workspace Haven&apos;</strong>.
          </p>
          <p>
            Kami menyajikan kopi berkualitas dari biji pilihan lokal dengan atmosfer yang hangat untuk berkreasi dan berkolaborasi.
          </p>
        </div>

        <Link
          href="/#location"
          className="py-2.5 px-4 rounded-lg bg-[#1E1E1E] hover:bg-black text-white font-medium text-xs flex items-center justify-center gap-1.5 min-h-[40px] transition active:scale-98 shadow-xs"
        >
          <MapPin className="w-3.5 h-3.5" />
          Jelajahi Lokasi Cabang
        </Link>
      </div>
    </section>
  );
}
