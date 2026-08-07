"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F7F7F7] border-t border-[#E8E8E8] px-4 pt-5 pb-5 text-[#707070] mt-4">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="flex items-center gap-2">
          <Image
            src="/kopkit/LogoMain.png"
            alt="Logo Coffee"
            width={24}
            height={24}
            className="rounded"
          />
          <span className="font-semibold text-[#1E1E1E] text-sm">COFFEE</span>
        </div>

        <p className="text-[11px] text-[#707070] max-w-xs leading-relaxed">
          Digital Workspace & Coffee Haven. Nikmati kopi pilihan dan ruang kerja yang tenang.
        </p>

        <div className="flex items-center gap-3 text-xs font-medium text-[#1E1E1E]">
          <Link href="/" className="hover:underline min-h-[36px] flex items-center">
            Beranda
          </Link>
          <span className="text-[#707070]">•</span>
          <Link href="/menu" className="hover:underline min-h-[36px] flex items-center">
            Menu
          </Link>
          <span className="text-[#707070]">•</span>
          <Link href="/about" className="hover:underline min-h-[36px] flex items-center">
            Tentang
          </Link>
        </div>

        <div className="w-full border-t border-[#E8E8E8] pt-3 flex flex-col items-center gap-0.5">
          <p className="text-[10px] text-[#707070]">
            © 2026 COFFEE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
