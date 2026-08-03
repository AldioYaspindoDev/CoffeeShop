"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { menuData } from "@/lib/data/menuData"
import { menuInterface } from "@/lib/types/menuInterface"

interface MenuCardProps {
    selectedCategory: string
    currentPage: number
    setCurrentPage: (page: number) => void
}

export default function MenuCard({ selectedCategory, currentPage, setCurrentPage }: MenuCardProps) {
    const ITEMS_PER_PAGE = 6
    const [menus, setMenus] = useState<menuInterface[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const res = await fetch("/api/menu")
                if (res.ok) {
                    const data = await res.json()
                    if (data && data.length > 0) {
                        setMenus(data)
                    } else {
                        setMenus(menuData)
                    }
                } else {
                    setMenus(menuData)
                }
            } catch (error) {
                console.error("Error fetching menus:", error)
                setMenus(menuData)
            } finally {
                setLoading(false)
            }
        }
        fetchMenus()
    }, [])

    const getCategoryName = (category: menuInterface["category"]): string => {
        if (category && typeof category === "object") {
            return category.name || ""
        }
        return category || ""
    }

    const getDescription = (data: menuInterface): string => {
        return data.productDescription || data.productDestcription || ""
    }

    const formatPrice = (price: menuInterface["productPricing"]): string => {
        if (typeof price === "number") {
            return price >= 1000 ? `${price / 1000}K` : `${price}`
        }
        return price || ""
    }

    // 1. Filter data berdasarkan kategori
    const filteredMenus = menus.filter((data) => {
        const catName = getCategoryName(data.category)
        if (selectedCategory === "Semua") return true
        return catName.toLowerCase() === selectedCategory.toLowerCase()
    })

    // 2. Hitung total halaman
    const totalPages = Math.ceil(filteredMenus.length / ITEMS_PER_PAGE)

    // 3. Potong data sesuai halaman aktif saat ini
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedMenus = filteredMenus.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    // Handler untuk berganti halaman
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
            const section = document.getElementById("pilihan-kopi-section")
            if (section) {
                section.scrollIntoView({ behavior: "smooth" })
            }
        }
    }

    return (
        <section id="pilihan-kopi-section" className="py-16 px-6 md:px-20 bg-white">
            <div className="mb-10 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Pilihan Kopi</h2>
                    <p className="text-sm text-gray-400 mt-1">
                        {loading 
                            ? "Memuat menu..." 
                            : `Menampilkan ${filteredMenus.length} menu untuk kategori "${selectedCategory}"`
                        }
                    </p>
                </div>
            </div>

            {loading ? (
                /* Premium skeleton loader */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-[#F5F5F5]/40 border border-transparent rounded-[40px] p-6 flex flex-col sm:flex-row items-center gap-6 animate-pulse"
                        >
                            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex-shrink-0 rounded-[32px] bg-gray-200" />
                            <div className="flex-1 w-full py-1">
                                <div className="flex justify-between items-start gap-4 mb-3">
                                    <div className="h-7 bg-gray-200 rounded-lg w-1/2" />
                                    <div className="h-7 bg-gray-200 rounded-lg w-1/4" />
                                </div>
                                <div className="h-4 bg-gray-200 rounded-lg w-full mb-2" />
                                <div className="h-4 bg-gray-200 rounded-lg w-5/6 mb-4" />
                                <div className="h-6 bg-gray-200 rounded-full w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredMenus.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-[40px]">
                    <p className="text-gray-500 font-medium text-lg">Menu tidak ditemukan untuk kategori ini.</p>
                </div>
            ) : (
                <>
                    {/* Grid menu cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {paginatedMenus.map((data, idx) => (
                            <div
                                key={data.id || idx}
                                className="bg-[#F5F5F5]/60 hover:bg-[#F5F5F5] border border-transparent hover:border-gray-200/50 rounded-[40px] p-6 flex flex-col sm:flex-row items-center gap-6 transition-all duration-300"
                            >
                                {/* Container Gambar Kopi */}
                                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex-shrink-0 rounded-[32px] overflow-hidden bg-gray-200">
                                    <Image
                                        src={data.images}
                                        alt={data.productName}
                                        fill
                                        sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
                                        className="object-cover"
                                    />
                                    {data.isBestSeller && idx % 2 === 1 && (
                                        <span className="absolute top-3 left-3 bg-black text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                                            PROMO
                                         </span>
                                    )}
                                </div>

                                {/* Detail Informasi Kopi */}
                                <div className="flex-1 flex flex-col justify-between w-full min-h-[120px] py-1">
                                    <div>
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">{data.productName}</h3>
                                            <div className="flex flex-col items-end">
                                                <span className="text-xl md:text-2xl font-bold text-gray-900">{formatPrice(data.productPricing)}</span>
                                                {data.isBestSeller && idx % 2 === 1 && (
                                                    <span className="text-xs text-gray-400 line-through">28K</span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm md:text-base text-gray-500 mt-2 line-clamp-2 font-medium">
                                            {getDescription(data)}
                                        </p>
                                    </div>

                                    {/* Tag Kategori */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="text-[10px] md:text-xs font-bold text-gray-600 bg-gray-200/60 uppercase tracking-wide px-3 py-1.5 rounded-full">
                                            {getCategoryName(data.category)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 hover:bg-gray-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Sebelumnya
                            </button>

                            <div className="flex gap-1.5">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-10 h-10 rounded-full text-sm font-semibold flex items-center justify-center transition-all ${
                                            currentPage === page
                                                ? "bg-black text-white shadow-sm"
                                                : "border border-transparent hover:border-gray-200 text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 hover:bg-gray-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Selanjutnya
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    )
}
