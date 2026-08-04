import { useState } from "react"
import { FiX, FiFolder } from "react-icons/fi"

interface CategoryModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: { name: string; icon?: string }) => void
}

export default function CategoryModal({ isOpen, onClose, onSubmit }: CategoryModalProps) {
    const [name, setName] = useState("")
    const [icon, setIcon] = useState("")

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) return
        onSubmit({ name: name.trim(), icon: icon.trim() || undefined })
        setName("")
        setIcon("")
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity duration-300">
            {/* Backdrop Closer */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Card */}
            <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 flex flex-col p-6 animate-in fade-in-0 zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Tambah Kategori</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Tambahkan kelompok menu baru untuk operasional.</p>
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
                <form onSubmit={handleSubmit} className="space-y-5 mt-5">
                    {/* Category Name Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 block">
                            Nama Kategori <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Contoh: Kopi, Makanan, Dessert"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-black rounded-xl outline-hidden transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                        />
                    </div>

                    {/* Category Icon URL Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 block">
                            URL Gambar / Ikon <span className="text-gray-400 font-normal">(Opsional)</span>
                        </label>
                        <input
                            type="url"
                            placeholder="Contoh: https://example.com/image.jpg"
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-black rounded-xl outline-hidden transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                        />
                    </div>

                    {/* Live Preview Container */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100/80 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden shrink-0">
                            {icon ? (
                                <img
                                    src={icon}
                                    alt="Preview"
                                    className="w-full h-full object-contain p-1"
                                    onError={(e) => {
                                        // Reset preview on load error
                                        (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                />
                            ) : (
                                <FiFolder className="text-xl text-gray-400" />
                            )}
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">Preview Kategori</span>
                            <span className="text-sm font-bold text-gray-800 block">
                                {name || "Nama Kategori Baru"}
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
                            Simpan Kategori
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}