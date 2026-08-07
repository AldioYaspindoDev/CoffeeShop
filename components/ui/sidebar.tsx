"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarData } from "@/lib/data/sidebarData";
import { LayoutDashboard, FolderTree, Utensils, ArrowLeft } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const getIcon = (menu: string) => {
    if (menu === "dashboard") return LayoutDashboard;
    if (menu === "categories") return FolderTree;
    return Utensils;
  };

  return (
    <div className="w-full bg-white border border-[#E8E8E8] rounded-xl p-3 shadow-xs flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-[#1E1E1E] uppercase tracking-wide">
            Admin Panel
          </span>
        </div>
        <Link
          href="/"
          className="text-xs text-[#707070] hover:text-[#1E1E1E] flex items-center gap-1 min-h-[32px] px-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Beranda
        </Link>
      </div>

      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {sidebarData.map((data, idx) => {
          const IconComp = getIcon(data.menu);
          const targetPath = `/admins/${data.menu}`.toLowerCase();
          const isActive =
            pathname.toLowerCase() === targetPath ||
            (data.menu === "dashboard" && pathname.toLowerCase() === "/admins");

          return (
            <Link
              key={idx}
              href={`/admins/${data.menu}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition active:scale-98 min-h-[36px] ${
                isActive
                  ? "bg-[#1E1E1E] text-white shadow-xs"
                  : "bg-[#F7F7F7] text-[#707070] hover:bg-[#E8E8E8] hover:text-[#1E1E1E] border border-[#E8E8E8]"
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{data.menu}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}