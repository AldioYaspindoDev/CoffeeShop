"use client"

import { useEffect, useState } from "react"
import { categoryData } from "@/lib/data/categoryData"
import { categoryInterface } from "@/lib/types/categoryInterface"
import Image from "next/image"
import { FiPlus, FiSearch, FiEdit3, FiTrash2, FiFolder } from "react-icons/fi"
import CategoryModal from "@/components/modal/categoryModal"

export default function Categories() {
    const [category, setCategory] = useState<categoryInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleGetData = async () => {
            try {
                const res = await fetch("/api/category");
                const data = await res.json();
                setCategory(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategory(categoryData);
            } finally {
                setLoading(false);
            }
        };

        handleGetData();
    }, []);

    const handleAddCategory = async (data: { name: string; icon?: string }) => {
        try {
            const res = await fetch("/api/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const newCategory = await res.json();
                setCategory((prev) => [...prev, newCategory]);
            } else {
                console.error("Failed to add category");
            }
        } catch (error) {
            console.error("Error adding category:", error);
            // Fallback to local state if API/Database is offline
            const newMock: categoryInterface = {
                id: (category.length + 1).toString(),
                name: data.name,
                icon: data.icon,
            };
            setCategory((prev) => [...prev, newMock]);
        }
    };

    // Filter categories based on search
    const filteredCategories = category.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Mock count/details to make it look premium
    const getProductCount = (id: string) => {
        if (id === "all") return 45;
        if (id === "1") return 15;
        if (id === "2") return 12;
        if (id === "3") return 10;
        if (id === "4") return 8;
        return 6;
    }

    const getColorClass = (idx: number) => {
        const colors = [
            "bg-blue-50 text-blue-600 border-blue-100",
            "bg-emerald-50 text-emerald-600 border-emerald-100",
            "bg-amber-50 text-amber-600 border-amber-100",
            "bg-rose-50 text-rose-600 border-rose-100",
            "bg-purple-50 text-purple-600 border-purple-100",
        ];
        return colors[idx % colors.length];
    }

    return (
        <section className="space-y-4">
            {/* Header Section */}
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                    <h1 className="font-bold text-xl text-[#1E1E1E] tracking-tight">Kategori</h1>
                    <p className="text-[#707070] text-xs">Kelola kategori produk.</p>
                </div>

                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#1E1E1E] hover:bg-black rounded-xl transition-all shadow-xs cursor-pointer shrink-0">
                    <FiPlus className="text-sm" />
                    Tambah
                </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex gap-2 items-center bg-white p-3 rounded-xl border border-[#E8E8E8] shadow-xs">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707070] text-sm" />
                    <input
                        type="text"
                        placeholder="Cari kategori..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] focus:border-[#1E1E1E] rounded-lg outline-hidden transition-all placeholder:text-[#707070]"
                    />
                </div>

                <div className="text-[11px] font-semibold text-[#707070] bg-[#F7F7F7] px-2.5 py-2 rounded-lg border border-[#E8E8E8] shrink-0 whitespace-nowrap">
                    {filteredCategories.length} Kategori
                </div>
            </div>

            {/* Category Content */}
            {loading ? (
                /* Skeleton Loader */
                <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-xs animate-pulse space-y-3">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 bg-[#E8E8E8] rounded-lg" />
                                <div className="w-8 h-4 bg-[#E8E8E8] rounded" />
                            </div>
                            <div className="space-y-1.5">
                                <div className="w-2/3 h-4 bg-[#E8E8E8] rounded" />
                                <div className="w-1/2 h-3 bg-[#E8E8E8] rounded" />
                            </div>
                            <div className="pt-3 border-t border-[#F7F7F7] flex justify-end gap-1">
                                <div className="w-7 h-7 bg-[#E8E8E8] rounded-lg" />
                                <div className="w-7 h-7 bg-[#E8E8E8] rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredCategories.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-[#E8E8E8] shadow-xs text-center p-6">
                    <div className="p-3 bg-[#F7F7F7] rounded-full border border-[#E8E8E8] mb-3">
                        <FiFolder className="text-2xl text-[#707070]" />
                    </div>
                    <h3 className="font-semibold text-[#1E1E1E] text-sm">Kategori Tidak Ditemukan</h3>
                    <p className="text-[#707070] text-xs mt-1 max-w-xs">Tidak ada kategori yang cocok dengan pencarian {searchQuery}.</p>
                </div>
            ) : (
                /* Categories Grid */
                <div className="grid grid-cols-2 gap-3">
                    {filteredCategories.map((data, idx) => {
                        const styleClass = getColorClass(idx);
                        return (
                            <div key={data.id} className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-xs flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start justify-between">
                                        <div className={`p-2.5 rounded-lg border ${data.icon ? 'bg-[#F7F7F7] border-[#E8E8E8]' : styleClass}`}>
                                            {data.icon ? (
                                                <Image
                                                    src={data.icon}
                                                    alt={data.name}
                                                    width={24}
                                                    height={24}
                                                    className="object-contain"
                                                />
                                            ) : (
                                                <FiFolder className="text-base" />
                                            )}
                                        </div>
                                        <span className="text-[9px] font-bold text-[#707070] bg-[#F7F7F7] px-1.5 py-0.5 rounded border border-[#E8E8E8] uppercase">
                                            #{data.id}
                                        </span>
                                    </div>

                                    <div className="mt-3 space-y-0.5">
                                        <h2 className="text-sm font-bold text-[#1E1E1E] leading-tight">
                                            {data.name}
                                        </h2>
                                        <p className="text-[10px] text-[#707070]">
                                            {getProductCount(data.id)} Produk
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-[#F7F7F7] flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Aktif
                                    </span>

                                    <div className="flex gap-0.5">
                                        <button className="p-1.5 text-[#707070] hover:text-[#1E1E1E] hover:bg-[#F7F7F7] rounded-lg transition-all cursor-pointer">
                                            <FiEdit3 className="text-xs" />
                                        </button>
                                        <button className="p-1.5 text-[#707070] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer">
                                            <FiTrash2 className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            <CategoryModal
                isOpen={isModalOpen}
                onClose={()=> setIsModalOpen(false)}
                onSubmit={(data)=> handleAddCategory(data)}
            />
        </section>
    )
}