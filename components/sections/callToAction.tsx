"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="px-4 py-3">
      <div className="bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl p-5 text-[#1E1E1E] text-center flex flex-col items-center gap-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#707070] font-semibold">Siap Produktif Hari Ini?</span>
          <h2 className="text-base font-bold tracking-tight text-[#1E1E1E] mt-0.5">
            Pesan Kopi & Nikmati Workspace Coffee
          </h2>
        </div>

        <Link
          href="/menu"
          className="w-full py-2.5 px-4 rounded-lg bg-[#1E1E1E] hover:bg-black text-white font-medium text-xs flex items-center justify-center gap-1.5 min-h-[40px] shadow-xs transition active:scale-98"
        >
          <span>Pesan Sekarang</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
