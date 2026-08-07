"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Coffee, Info, MapPin } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Menu", href: "/menu", icon: Coffee },
  { label: "Tentang", href: "/about", icon: Info },
  { label: "Lokasi", href: "/#location", icon: MapPin },
];

export default function BottomNav() {
  const pathname = usePathname();

  if (
    pathname.startsWith("/admins/dashboard") ||
    pathname.startsWith("/admins/categories") ||
    pathname.startsWith("/admins/menu")
  ) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="w-full max-w-md bg-white border-t border-[#E8E8E8] px-3 py-2 pb-safe pointer-events-auto flex items-center justify-around shadow-sm">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) && item.href !== "/#location";

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 transition-colors relative ${
                isActive ? "text-[#1E1E1E] font-semibold" : "text-[#707070] hover:text-[#1E1E1E]"
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-6 h-0.5 bg-[#1E1E1E] rounded-full" />
              )}
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
