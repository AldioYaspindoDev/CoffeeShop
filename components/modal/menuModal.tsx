import { useState, useEffect } from "react";
import { categoryInterface } from "@/lib/types/categoryInterface";
import { categoryData } from "@/lib/data/categoryData";
import { FiX, FiImage, FiPlusCircle } from "react-icons/fi";

interface MenuModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        categoryId?: string;
        category: categoryInterface | string;
        productName: string;
        productDescription?: string;
        images: string;
        productPricing: number | string;
        stock: number;
        isAvailable: boolean;
        isBestSeller: boolean;
    }) => void;
}

export default function MenuModal({ isOpen, onClose, onSubmit }: MenuModalProps) {
    const [categories, setCategories] = useState<categoryInterface[]>([]);
    
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [images, setImages] = useState("");
    const [productPricing, setProductPricing] = useState("");
    const [stock, setStock] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [isBestSeller, setIsBestSeller] = useState(false);

    // Fetch categories when modal opens to populate the dropdown
    useEffect(() => {
        if (isOpen) {
            const fetchCategories = async () => {
                try {
                    const res = await fetch("/api/category");
                    const data = await res.json();
                    setCategories(data);
                    if (data.length > 0) {
                        setCategoryId(data[0].id);
                        setCategoryName(data[0].name);
                    }
                } catch (error) {
                    console.error("Gagal mengambil kategori:", error);
                    setCategories(categoryData.filter(c => c.id !== "all"));
                    const fallback = categoryData.filter(c => c.id !== "all");
                    if (fallback.length > 0) {
                        setCategoryId(fallback[0].id);
                        setCategoryName(fallback[0].name);
                    }
                }
            };
            fetchCategories();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setCategoryId(selectedId);
        const selectedCat = categories.find((c) => c.id === selectedId);
        if (selectedCat) {
            setCategoryName(selectedCat.name);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!productName.trim()) return;

        onSubmit({
            categoryId: categoryId,
            category: categoryName || "Kopi",
            productName: productName.trim(),
            productDescription: productDescription.trim(),
            images: images.trim(),
            productPricing: parseInt(productPricing) || 0,
            stock: parseInt(stock) || 0,
            isAvailable: isAvailable,
            isBestSeller: isBestSeller,
        });

        // Reset form
        setProductName("");
        setProductDescription("");
        setImages("");
        setProductPricing("");
        setStock("");
        setIsAvailable(true);
        setIsBestSeller(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity duration-300">
            {/* Backdrop Closer */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Card */}
            <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 flex flex-col p-6 animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Tambah Menu Baru</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Kelola produk yang akan dipasarkan di KOPKIT.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-50 text-gray-400 hover:text-black rounded-lg transition-all cursor-pointer"
                        type="button"
                    >
                        <FiX className="text-lg" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Product Name & Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-600 block">
                                Nama Menu <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Contoh: Cappuccino Mint"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="w-full px-4 py-2.5 text-sm bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-black rounded-xl outline-hidden transition-all text-gray-900 font-medium"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-600 block">
                                Kategori <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={categoryId}
                                onChange={handleCategoryChange}
                                className="w-full px-4 py-2.5 text-sm bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-black rounded-xl outline-hidden transition-all text-gray-900 font-medium cursor-pointer"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Price & Stock */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-600 block">
                                Harga Menu <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="number"
                                required
                                min="1"
                                placeholder="Contoh: 22000"
                                value={productPricing}
                                onChange={(e) => setProductPricing(e.target.value)}
                                className="w-full px-4 py-2.5 text-sm bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-black rounded-xl outline-hidden transition-all text-gray-900 font-medium"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-600 block">
                                Jumlah Stok <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="number"
                                required
                                min="0"
                                placeholder="Contoh: 100"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full px-4 py-2.5 text-sm bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-black rounded-xl outline-hidden transition-all text-gray-900 font-medium"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 block">
                            URL Gambar Produk <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="url"
                            required
                            placeholder="Contoh: https://images.unsplash.com/..."
                            value={images}
                            onChange={(e) => setImages(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-black rounded-xl outline-hidden transition-all text-gray-900 font-medium"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 block">
                            Deskripsi Produk <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                            required
                            minLength={5}
                            placeholder="Tuliskan komposisi atau info detail produk (minimal 5 karakter)..."
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2.5 text-sm bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-black rounded-xl outline-hidden transition-all text-gray-900 font-medium resize-none"
                        />
                    </div>

                    {/* Switch Toggles */}
                    <div className="flex gap-6 items-center p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={isAvailable}
                                onChange={(e) => setIsAvailable(e.target.checked)}
                                className="w-4 h-4 text-black border-gray-300 rounded-sm focus:ring-black accent-black cursor-pointer"
                            />
                            <span className="text-xs font-semibold text-gray-700">Tersedia (Ready)</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={isBestSeller}
                                onChange={(e) => setIsBestSeller(e.target.checked)}
                                className="w-4 h-4 text-black border-gray-300 rounded-sm focus:ring-black accent-black cursor-pointer"
                            />
                            <span className="text-xs font-semibold text-gray-700">Best Seller ⭐</span>
                        </label>
                    </div>

                    {/* Live Preview Container */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden shrink-0">
                            {images ? (
                                <img
                                    src={images}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                />
                            ) : (
                                <FiImage className="text-2xl text-gray-300" />
                            )}
                        </div>
                        <div className="min-w-0">
                            <span className="text-2xs font-bold text-gray-400 block uppercase tracking-wider">
                                Preview: {categoryName || "Kopi"}
                            </span>
                            <span className="text-sm font-bold text-gray-800 truncate block">
                                {productName || "Nama Produk Baru"}
                            </span>
                            <span className="text-xs font-semibold text-gray-900 block">
                                {productPricing ? `Price: ${productPricing}` : "Rp 0"}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-3 border-t border-gray-100 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-semibold text-white bg-black hover:bg-gray-800 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
                        >
                            Simpan Menu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}