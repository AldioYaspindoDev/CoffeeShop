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
        <section className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="font-bold text-3xl text-gray-900 tracking-tight">Categories Management</h1>
                    <p className="text-gray-500 text-sm">Kelola kategori produk makanan, kopi, dan minuman KOPKIT.</p>
                </div>

                <button onClick={()=> setIsModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-black hover:bg-gray-800 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer">
                    <FiPlus className="text-lg" />
                    Tambah Kategori
                </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="relative w-full sm:w-80">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                    <input
                        type="text"
                        placeholder="Cari kategori..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-black rounded-xl outline-hidden transition-all placeholder:text-gray-400"
                    />
                </div>

                <div className="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    Total: <span className="text-gray-900 font-bold">{filteredCategories.length} Kategori</span>
                </div>
            </div>

            {/* Category Content */}
            {loading ? (
                /* Skeleton Loader */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs animate-pulse space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                                <div className="w-14 h-5 bg-gray-200 rounded-lg" />
                            </div>
                            <div className="space-y-2">
                                <div className="w-2/3 h-6 bg-gray-200 rounded-md" />
                                <div className="w-1/2 h-4 bg-gray-200 rounded-md" />
                            </div>
                            <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredCategories.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200/80 shadow-xs text-center p-6">
                    <div className="p-4 bg-gray-50 rounded-full border border-gray-100 mb-4">
                        <FiFolder className="text-3xl text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">Kategori Tidak Ditemukan</h3>
                    <p className="text-gray-500 text-sm mt-1 max-w-xs">Tidak ada kategori yang cocok dengan pencarian {searchQuery}.</p>
                </div>
            ) : (
                /* Categories Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCategories.map((data, idx) => {
                        const styleClass = getColorClass(idx);
                        return (
                            <div key={data.id} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between group">
                                <div>
                                    <div className="flex items-start justify-between">
                                        <div className={`p-3 rounded-xl border ${data.icon ? 'bg-gray-50 border-gray-100' : styleClass} transition-transform duration-300 group-hover:scale-105`}>
                                            {data.icon ? (
                                                <Image
                                                    src={data.icon}
                                                    alt={data.name}
                                                    width={32}
                                                    height={32}
                                                    className="object-contain"
                                                />
                                            ) : (
                                                <FiFolder className="text-xl" />
                                            )}
                                        </div>
                                        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 uppercase">
                                            ID: {data.id}
                                        </span>
                                    </div>

                                    <div className="mt-5 space-y-1">
                                        <h2 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-black transition-colors">
                                            {data.name}
                                        </h2>
                                        <p className="text-xs text-gray-500 font-medium">
                                            {getProductCount(data.id)} Produk terhubung
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100/80 flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-2xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Aktif
                                    </span>

                                    <div className="flex gap-1">
                                        <button className="p-2 text-gray-500 hover:text-black hover:bg-gray-50 rounded-lg transition-all cursor-pointer" title="Edit Kategori">
                                            <FiEdit3 className="text-sm" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer" title="Hapus Kategori">
                                            <FiTrash2 className="text-sm" />
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