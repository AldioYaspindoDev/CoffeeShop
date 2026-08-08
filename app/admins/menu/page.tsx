"use client"

import { categoryData } from "@/lib/data/categoryData"
import { useEffect, useState } from "react"
import { menuInterface } from "@/lib/types/menuInterface"
import { menuData } from "@/lib/data/menuData"
import { FiPlus, FiSearch, FiEdit3, FiTrash2, FiCoffee, FiInbox } from "react-icons/fi"
import { FaStar } from "react-icons/fa"
import MenuModal from "@/components/modal/menuModal"

export default function MenuManagement() {
    const [menu, setMenu] = useState<menuInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMenuData, setEditMenuData] = useState<menuInterface | null>(null);

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

    const handleOpenEdit = (item: menuInterface) => {
        setEditMenuData(item);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setEditMenuData(null);
        setIsModalOpen(false);
    };

    const handleFormSubmit = async (data: Omit<menuInterface, 'id'>) => {
        if (editMenuData) {
            // Edit Mode (PATCH)
            try {
                const res = await fetch(`/api/menu/${editMenuData.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                if (res.ok) {
                    const updatedMenuItem = await res.json();
                    setMenu((prev) =>
                        prev.map((item) => (item.id === editMenuData.id ? updatedMenuItem : item))
                    );
                } else {
                    console.error("Gagal memperbarui menu");
                }
            } catch (error) {
                console.error("Error updating menu:", error);
            }
        } else {
            // Add Mode (POST)
            await handleAddMenu(data);
        }
        handleModalClose();
    };

    const handleAddMenu = async (data: Omit<menuInterface, 'id'>) => {
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

    const handleDeleteMenu = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus menu ini?")) return;

        try {
            const res = await fetch(`/api/menu/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setMenu((prev) => prev.filter((item) => item.id !== id));
            } else {
                console.error("Gagal menghapus menu");
            }
        } catch (error) {
            console.error("Error deleting menu:", error);
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
        <section className="space-y-4">
            {/* Header Section */}
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                    <h1 className="font-bold text-xl text-[#1E1E1E] tracking-tight">Menu</h1>
                    <p className="text-[#707070] text-xs">Kelola produk makanan & kopi.</p>
                </div>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#1E1E1E] hover:bg-black rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
                >
                    <FiPlus className="text-sm" />
                    Tambah
                </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col gap-3 bg-white p-3 rounded-xl border border-[#E8E8E8] shadow-xs">
                <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707070] text-sm" />
                        <input
                            type="text"
                            placeholder="Cari menu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] focus:border-[#1E1E1E] rounded-lg outline-hidden transition-all placeholder:text-[#707070]"
                        />
                    </div>
                    <div className="text-[11px] font-semibold text-[#707070] bg-[#F7F7F7] px-2.5 py-2 rounded-lg border border-[#E8E8E8] shrink-0 whitespace-nowrap">
                        {filteredMenu.length} Menu
                    </div>
                </div>

                {/* Category Filtering Tabs */}
                <div className="flex gap-1.5 items-center overflow-x-auto pb-0.5 scrollbar-none">
                    {categoryData.map((data, idx) => {
                        const isActive = selectedCategory.toLowerCase() === data.name.toLowerCase() || (data.id === "all" && selectedCategory === "Semua");
                        return (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(data.name)}
                                className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all border cursor-pointer whitespace-nowrap ${
                                    isActive
                                        ? "bg-[#1E1E1E] text-white border-[#1E1E1E] shadow-xs"
                                        : "bg-white text-[#707070] border-[#E8E8E8] hover:bg-[#F7F7F7] hover:text-[#1E1E1E]"
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
                <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="bg-white rounded-xl border border-[#E8E8E8] shadow-xs animate-pulse overflow-hidden">
                            <div className="w-full h-36 bg-[#F7F7F7]" />
                            <div className="p-3 space-y-2">
                                <div className="w-2/3 h-3 bg-[#E8E8E8] rounded" />
                                <div className="w-full h-4 bg-[#E8E8E8] rounded" />
                                <div className="flex justify-between items-center pt-1">
                                    <div className="w-12 h-3 bg-[#E8E8E8] rounded" />
                                    <div className="w-10 h-3 bg-[#E8E8E8] rounded" />
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
                <div className="grid grid-cols-2 gap-3">
                    {filteredMenu.map((data, idx) => {
                        const categoryName = typeof data.category === "string" ? data.category : data.category?.name || "Kopi";
                        return (
                            <div key={data.id || idx} className="bg-white rounded-xl border border-[#E8E8E8] shadow-xs flex flex-col overflow-hidden">
                                {/* Product Image */}
                                <div className="relative w-full h-36 bg-[#F7F7F7] overflow-hidden">
                                    {data.images ? (
                                        <img
                                            src={data.images}
                                            alt={data.productName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#F7F7F7] text-[#707070]">
                                            <FiCoffee className="text-2xl" />
                                        </div>
                                    )}

                                    {data.isBestSeller && (
                                        <span className="absolute top-2 left-2 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-amber-500 text-white">
                                            <FaStar className="text-[8px]" /> Best
                                        </span>
                                    )}
                                    <span className="absolute top-2 right-2 text-[9px] font-semibold bg-white/90 text-[#707070] px-1.5 py-0.5 rounded-md border border-[#E8E8E8] capitalize">
                                        {categoryName}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-3 flex flex-col gap-2 flex-1">
                                    <div>
                                        <h3 className="font-bold text-xs text-[#1E1E1E] leading-snug line-clamp-1">
                                            {data.productName}
                                        </h3>
                                        <p className="text-[10px] text-[#707070] line-clamp-2 mt-0.5 leading-relaxed">
                                            {data.productDescription || data.productDestcription || "Tidak ada deskripsi."}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-[#F7F7F7] mt-auto">
                                        <div>
                                            <span className="text-[10px] text-[#707070] font-medium block">Harga</span>
                                            <span className="text-xs font-bold text-[#1E1E1E]">
                                                {typeof data.productPricing === "number" 
                                                    ? `Rp ${data.productPricing.toLocaleString()}` 
                                                    : data.productPricing}
                                            </span>
                                        </div>

                                        <div className="flex flex-col items-end gap-1">
                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                                                data.isAvailable 
                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                                                    : "bg-rose-50 text-rose-700 border border-rose-100"
                                            }`}>
                                                {data.isAvailable ? `Stok: ${data.stock}` : "Habis"}
                                            </span>
                                            <div className="flex gap-0.5">
                                                <button 
                                                    onClick={() => handleOpenEdit(data)}
                                                    className="p-1 text-[#707070] hover:text-[#1E1E1E] hover:bg-[#F7F7F7] rounded transition-all cursor-pointer"
                                                >
                                                    <FiEdit3 className="text-xs" />
                                                </button>
                                                <button 
                                                    onClick={() => data.id && handleDeleteMenu(data.id)}
                                                    className="p-1 text-[#707070] hover:text-rose-600 hover:bg-rose-50 rounded transition-all cursor-pointer"
                                                >
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
                key={editMenuData ? editMenuData.id : "new-menu"}
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleFormSubmit}
                initialData={editMenuData}
            />
        </section>
    );
}