"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { menuData } from "@/lib/data/menuData";
import { menuInterface } from "@/lib/types/menuInterface";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface MenuCardProps {
  selectedCategory: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function MenuCard({
  selectedCategory,
  currentPage,
  setCurrentPage,
}: MenuCardProps) {
  const ITEMS_PER_PAGE = 6;
  const [menus, setMenus] = useState<menuInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch("/api/menu");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setMenus(data);
          } else {
            setMenus(menuData);
          }
        } else {
          setMenus(menuData);
        }
      } catch (error) {
        console.error("Error fetching menus:", error);
        setMenus(menuData);
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  const getCategoryName = (category: menuInterface["category"]): string => {
    if (category && typeof category === "object") {
      return category.name || "";
    }
    return category || "";
  };

  const getDescription = (data: menuInterface): string => {
    return data.productDescription || data.productDestcription || "";
  };

  const formatPrice = (price: menuInterface["productPricing"]): string => {
    if (typeof price === "number") {
      return price >= 1000 ? `${price / 1000}K` : `${price}`;
    }
    return price || "";
  };

  const filteredMenus = menus.filter((data) => {
    const catName = getCategoryName(data.category);
    if (selectedCategory === "Semua") return true;
    return catName.toLowerCase() === selectedCategory.toLowerCase();
  });

  const totalPages = Math.ceil(filteredMenus.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMenus = filteredMenus.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const section = document.getElementById("pilihan-kopi-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="pilihan-kopi-section" className="px-4 py-3 flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#1E1E1E] tracking-tight">Menu</h2>
          <p className="text-[11px] text-[#707070]">
            {loading
              ? "Memuat..."
              : `${filteredMenus.length} Varian - "${selectedCategory}"`}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-2.5">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E8E8E8] rounded-xl p-3 flex items-center gap-3 animate-pulse"
            >
              <div className="w-16 h-16 rounded-lg bg-[#F7F7F7] shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3.5 bg-[#F7F7F7] rounded w-2/3" />
                <div className="h-3 bg-[#F7F7F7] rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredMenus.length === 0 ? (
        <div className="text-center py-10 bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl p-4">
          <p className="text-[#707070] text-xs">
            Menu tidak ditemukan untuk kategori ini.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {paginatedMenus.map((data, idx) => (
            <div
              key={data.id || idx}
              className="bg-white border border-[#E8E8E8] rounded-xl p-3 flex items-center gap-3 shadow-xs hover:border-[#1E1E1E]/30 transition"
            >
              {/* Product Image */}
              <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-[#F7F7F7]">
                <Image
                  src={data.images}
                  alt={data.productName}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between min-h-[64px]">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-xs font-semibold text-[#1E1E1E] leading-tight line-clamp-1">
                      {data.productName}
                    </h3>
                    <span className="text-xs font-bold text-[#1E1E1E] shrink-0">
                      {formatPrice(data.productPricing)}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#707070] line-clamp-1 leading-tight mt-0.5">
                    {getDescription(data)}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-[#707070] bg-[#F7F7F7] border border-[#E8E8E8] px-2 py-0.5 rounded font-medium">
                    {getCategoryName(data.category)}
                  </span>
                  <button
                    onClick={() => alert(`Pesanan ${data.productName} ditambahkan!`)}
                    className="p-1 rounded-md bg-[#1E1E1E] hover:bg-black text-white font-medium transition active:scale-98 min-h-[28px] min-w-[28px] flex items-center justify-center"
                    aria-label="Tambah Pesanan"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Minimal Pagination */}
          {totalPages > 1 && (
            <div className="mt-1 flex justify-between items-center bg-white border border-[#E8E8E8] rounded-xl p-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F7F7F7] text-[#1E1E1E] disabled:opacity-40 flex items-center gap-1 min-h-[36px] transition active:scale-98 border border-[#E8E8E8]"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev
              </button>

              <span className="text-xs text-[#707070]">
                <strong className="text-[#1E1E1E]">{currentPage}</strong> / {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1E1E1E] text-white disabled:opacity-40 flex items-center gap-1 min-h-[36px] transition active:scale-98"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
