"use client"

import { categoryData } from "@/lib/data/categoryData"
import { useEffect, useState } from "react"
import { menuInterface } from "@/lib/types/menuInterface"
import { menuData } from "@/lib/data/menuData"
import Image from "next/image"
import { FiPlus, FiSearch, FiEdit3, FiTrash2, FiCoffee, FiInbox } from "react-icons/fi"
import { FaStar } from "react-icons/fa"
import MenuModal from "@/components/modal/menuModal"

export default function MenuManagement() {
    const [menu, setMenu] = useState<menuInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleGetData = async () => {
            try {
                const res = await fetch("/api/menu");
                const data = await res.json();
                setMenu(data);
            } catch (error) {
                console.error("gagal mendapatkan data", error);
                setMenu(menuData);
            } finally {
                setLoading(false);
            }
        };

        handleGetData();
    }, []);

    const handleAddMenu = async (data: any) => {
        try {
            const res = await fetch("/api/menu", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const newMenuItem = await res.json();
                setMenu((prev) => [...prev, newMenuItem]);
            } else {
                console.error("Gagal menambahkan menu");
            }
        } catch (error) {
            console.error("Error adding menu:", error);
            // Fallback ke data lokal jika API offline
            const newMock: menuInterface = {
                id: (menu.length + 1).toString(),
                categoryId: data.categoryId,
                category: data.category,
                productName: data.productName,
                productDescription: data.productDescription,
                images: data.images,
                productPricing: data.productPricing,
                stock: data.stock,
                isAvailable: data.isAvailable,
                isBestSeller: data.isBestSeller,
            };
            setMenu((prev) => [...prev, newMock]);
        }
    };

    // Filter menu based on search query and category
    const filteredMenu = menu.filter((item) => {
        const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "Semua" ||
            selectedCategory === "all" ||
            (item.category
                ? typeof item.category === "string" 
                    ? item.category.toLowerCase() === selectedCategory.toLowerCase()
                    : item.category.name?.toLowerCase() === selectedCategory.toLowerCase()
                : false);
        return matchesSearch && matchesCategory;
    });

    return (
        <section className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="font-bold text-3xl text-gray-900 tracking-tight">Menu Management</h1>
                    <p className="text-gray-500 text-sm">Kelola produk makanan, kopi, dan snack KOPKIT disini.</p>
                </div>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-black hover:bg-gray-800 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                    <FiPlus className="text-lg" />
                    Tambah Menu
                </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-80">
                        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                        <input
                            type="text"
                            placeholder="Cari menu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-black rounded-xl outline-hidden transition-all placeholder:text-gray-400"
                        />
                    </div>

                    {/* Category Count Info */}
                    <div className="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 shrink-0">
                        Total: <span className="text-gray-900 font-bold">{filteredMenu.length} Menu</span>
                    </div>
                </div>

                {/* Category Filtering Tabs */}
                <div className="flex gap-2 items-center overflow-x-auto pb-1 scrollbar-none">
                    {categoryData.map((data, idx) => {
                        const isActive = selectedCategory.toLowerCase() === data.name.toLowerCase() || (data.id === "all" && selectedCategory === "Semua");
                        return (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(data.name)}
                                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all border cursor-pointer whitespace-nowrap ${
                                    isActive
                                        ? "bg-black text-white border-black shadow-xs"
                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                {data.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Menu Content Grid */}
            {loading ? (
                /* Skeleton Loader */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="bg-white rounded-2xl border border-gray-200/80 shadow-xs animate-pulse overflow-hidden space-y-4">
                            <div className="w-full h-48 bg-gray-200" />
                            <div className="p-5 space-y-3">
                                <div className="w-2/3 h-5 bg-gray-200 rounded-md" />
                                <div className="w-full h-8 bg-gray-200 rounded-md" />
                                <div className="pt-2 flex justify-between items-center">
                                    <div className="w-16 h-5 bg-gray-200 rounded-md" />
                                    <div className="w-14 h-5 bg-gray-200 rounded-md" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredMenu.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200/80 shadow-xs text-center p-6">
                    <div className="p-4 bg-gray-50 rounded-full border border-gray-100 mb-4">
                        <FiInbox className="text-3xl text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">Menu Tidak Ditemukan</h3>
                    <p className="text-gray-500 text-sm mt-1 max-w-xs">
                        Tidak ada menu {selectedCategory !== "Semua" ? `di kategori "${selectedCategory}"` : ""} yang cocok dengan pencarian Anda.
                    </p>
                </div>
            ) : (
                /* Menu Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredMenu.map((data, idx) => {
                        const categoryName = typeof data.category === "string" ? data.category : data.category?.name || "Kopi";
                        return (
                            <div key={data.id || idx} className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
                                <div className="relative">
                                    {/* Product Image */}
                                    <div className="relative w-full h-48 bg-gray-50 overflow-hidden">
                                        {data.images ? (
                                            <img
                                                src={data.images}
                                                alt={data.productName}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                                <FiCoffee className="text-3xl" />
                                            </div>
                                        )}

                                        {/* Best Seller Badge */}
                                        {data.isBestSeller && (
                                            <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-2xs font-bold bg-amber-500 text-white shadow-sm">
                                                <FaStar className="text-xs" />
                                                Best Seller
                                            </span>
                                        )}

                                        {/* Category Badge */}
                                        <span className="absolute top-3 right-3 text-2xs font-semibold bg-white/90 backdrop-blur-xs text-gray-700 px-2 py-1 rounded-lg shadow-xs border border-gray-100 capitalize">
                                            {categoryName}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 space-y-2">
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-black transition-colors leading-tight">
                                                {data.productName}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                            {data.productDescription || data.productDestcription || "Tidak ada deskripsi produk."}
                                        </p>
                                    </div>
                                </div>

                                {/* Footer & Actions */}
                                <div className="p-5 pt-0">
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100/80">
                                        <div>
                                            <span className="text-xs text-gray-400 block font-medium">Harga</span>
                                            <span className="text-lg font-bold text-gray-950">
                                                {typeof data.productPricing === "number" 
                                                    ? `Rp ${data.productPricing.toLocaleString()}` 
                                                    : data.productPricing}
                                            </span>
                                        </div>

                                        <div className="flex flex-col items-end gap-1">
                                            <span className={`text-2xs font-bold px-2 py-0.5 rounded-full ${
                                                data.isAvailable 
                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                                                    : "bg-rose-50 text-rose-700 border border-rose-100"
                                            }`}>
                                                {data.isAvailable ? `Ready: ${data.stock}` : "Habis"}
                                            </span>

                                            <div className="flex gap-1 mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-50 rounded-md transition-all cursor-pointer" title="Edit Menu">
                                                    <FiEdit3 className="text-xs" />
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all cursor-pointer" title="Hapus Menu">
                                                    <FiTrash2 className="text-xs" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            <MenuModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddMenu}
            />
        </section>
    );
}