"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, ArrowLeft, Menu, X, PhoneCall } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isHome = pathname === "/";
  const getPageTitle = () => {
    if (pathname === "/") return "COFFEE";
    if (pathname === "/menu") return "Menu";
    if (pathname === "/about") return "Tentang Kami";
    if (pathname.startsWith("/admins")) return "Admin Portal";
    return "COFFEE";
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E8E8E8] px-4 py-3 text-[#1E1E1E] flex items-center justify-between shadow-xs">
        {/* Left: Back Button or Logo */}
        <div className="flex items-center gap-2.5">
          {!isHome ? (
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-lg text-[#1E1E1E] hover:bg-[#F7F7F7] transition active:scale-98 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Kembali"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center shrink-0">
                <Image
                  src="/kopkit/LogoMain.png"
                  alt="Coffee Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          )}

          <span className="font-semibold text-base tracking-tight text-[#1E1E1E]">
            {getPageTitle()}
          </span>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1">
          <Link
            href="/menu"
            className="p-2 rounded-lg text-[#1E1E1E] hover:bg-[#F7F7F7] transition active:scale-98 min-w-[44px] min-h-[44px] flex items-center justify-center relative"
            aria-label="Pesan Menu"
          >
            <ShoppingBag className="w-6 h-6" />
          </Link>

          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-2 rounded-lg text-[#1E1E1E] hover:bg-[#F7F7F7] transition active:scale-98 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Buka Menu Navigasi"
          >
            {drawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Quick Side Drawer / Modal Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-center pointer-events-auto">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white border-b border-[#E8E8E8] text-[#1E1E1E] p-5 rounded-b-2xl shadow-md flex flex-col gap-4 top-0">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E8]">
              <div className="flex items-center gap-2">
                <Image
                  src="/kopkit/LogoMain.png"
                  alt="Coffee Logo"
                  width={28}
                  height={28}
                  className="rounded-md"
                />
                <span className="font-semibold text-[#1E1E1E] text-base">Navigasi</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 text-[#707070] hover:text-[#1E1E1E] min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <Link
                href="/"
                onClick={() => setDrawerOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition flex items-center justify-between ${
                  pathname === "/" ? "bg-[#F7F7F7] text-[#1E1E1E] font-semibold" : "text-[#707070] hover:bg-[#F7F7F7] hover:text-[#1E1E1E]"
                }`}
              >
                <span>Beranda</span>
                <span>→</span>
              </Link>
              <Link
                href="/menu"
                onClick={() => setDrawerOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition flex items-center justify-between ${
                  pathname === "/menu" ? "bg-[#F7F7F7] text-[#1E1E1E] font-semibold" : "text-[#707070] hover:bg-[#F7F7F7] hover:text-[#1E1E1E]"
                }`}
              >
                <span>Menu</span>
                <span>→</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setDrawerOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition flex items-center justify-between ${
                  pathname === "/about" ? "bg-[#F7F7F7] text-[#1E1E1E] font-semibold" : "text-[#707070] hover:bg-[#F7F7F7] hover:text-[#1E1E1E]"
                }`}
              >
                <span>Tentang Kami</span>
                <span>→</span>
              </Link>
            </div>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full py-3 bg-[#1E1E1E] hover:bg-black text-white font-medium text-xs text-center rounded-xl flex items-center justify-center gap-2 min-h-[44px] transition active:scale-98"
            >
              <PhoneCall className="w-4 h-4" />
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
