import { FaRegCalendar, FaArrowUp, FaArrowDown, FaStar } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { IoIosCafe } from "react-icons/io";
import { MdPayments } from "react-icons/md";
import { overviewData } from "@/lib/data/overviewData";
import { menuData } from "@/lib/data/menuData";
import Image from "next/image";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    FaShoppingCart: FaShoppingCart,
    IoReload: IoReload,
    IoIosCafe: IoIosCafe,
    MdPayments: MdPayments
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    MdPayments: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
    FaShoppingCart: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
    IoReload: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
    IoIosCafe: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" }
}

const trendMap: Record<string, { value: string; isUp: boolean }> = {
    MdPayments: { value: "+14.2% vs kemarin", isUp: true },
    FaShoppingCart: { value: "+8.4% vs kemarin", isUp: true },
    IoReload: { value: "-2.1% vs kemarin", isUp: false },
    IoIosCafe: { value: "Produk Terlaris", isUp: true }
}

export default function Dashboard() {
    return (
        <section className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="font-bold text-3xl text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 text-sm">Monitoring operasional dan penjualan KOPKIT hari ini.</p>
                </div>

                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200 shadow-xs">
                    <button className="px-4 py-2 text-xs font-semibold text-white bg-black rounded-lg transition-all shadow-xs cursor-pointer">
                        Hari ini
                    </button>
                    <button className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                        7 Hari
                    </button>
                    <button className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                        30 Hari
                    </button>
                    <div className="h-4 w-[1px] bg-gray-200 mx-1" />
                    <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all cursor-pointer">
                        <FaRegCalendar className="text-sm" />
                    </button>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewData.map((data, idx) => {
                    const IconComponent = iconMap[data.icon];
                    const colors = colorMap[data.icon] || { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-100" };
                    const trend = trendMap[data.icon] || { value: "+0%", isUp: true };

                    return (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between group">
                            <div className="flex items-start justify-between">
                                <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                                    {data.title}
                                </span>
                                <div className={`p-3 rounded-xl ${colors.bg} ${colors.text} border ${colors.border} transition-transform duration-300 group-hover:scale-110`}>
                                    {IconComponent && <IconComponent className="text-xl" />}
                                </div>
                            </div>

                            <div className="mt-4 space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                    {data.data}
                                </h2>
                                <div className="flex items-center gap-1.5 text-xs">
                                    {data.icon !== "IoIosCafe" ? (
                                        <>
                                            {trend.isUp ? (
                                                <FaArrowUp className="text-emerald-500" />
                                            ) : (
                                                <FaArrowDown className="text-rose-500" />
                                            )}
                                            <span className={trend.isUp ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}>
                                                {trend.value}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded">
                                            {trend.value}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Visual Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Trend Pendapatan (Revenue Trend Chart) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">Trend Pendapatan</h3>
                                <p className="text-gray-500 text-xs mt-0.5">Analisis pendapatan 7 hari terakhir</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-lg">
                                    <IoMdTrendingUp /> +12.4%
                                </span>
                                <span className="text-xs text-gray-400 font-medium">Rata-rata: Rp1.8M</span>
                            </div>
                        </div>

                        {/* Custom Modern SVG Chart Area */}
                        <div className="relative h-64 w-full mt-4">
                            <svg className="w-full h-full" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="revenue-gradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.00" />
                                    </linearGradient>
                                </defs>

                                {/* Grid Lines */}
                                <line x1="40" y1="40" x2="580" y2="40" stroke="#F3F4F6" strokeDasharray="4 4" />
                                <line x1="40" y1="90" x2="580" y2="90" stroke="#F3F4F6" strokeDasharray="4 4" />
                                <line x1="40" y1="140" x2="580" y2="140" stroke="#F3F4F6" strokeDasharray="4 4" />
                                <line x1="40" y1="190" x2="580" y2="190" stroke="#F3F4F6" strokeDasharray="4 4" />

                                {/* Area under curve */}
                                <path
                                    d="M 40 190 Q 120 160 200 130 T 360 80 T 520 110 T 580 50 L 580 190 L 40 190 Z"
                                    fill="url(#revenue-gradient)"
                                />

                                {/* Main Curve Line */}
                                <path
                                    d="M 40 190 Q 120 160 200 130 T 360 80 T 520 110 T 580 50"
                                    stroke="#10B981"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                {/* Data Nodes (Dots) */}
                                <circle cx="40" cy="190" r="5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                                <circle cx="120" cy="172" r="5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                                <circle cx="200" cy="130" r="5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                                <circle cx="280" cy="115" r="5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                                <circle cx="360" cy="80" r="5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                                <circle cx="440" cy="98" r="5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                                <circle cx="520" cy="110" r="5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                                <circle cx="580" cy="50" r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" className="animate-pulse" />

                                {/* X-Axis Labels */}
                                <text x="40" y="220" fill="#9CA3AF" fontSize="10" textAnchor="middle" fontWeight="500">Sen</text>
                                <text x="120" y="220" fill="#9CA3AF" fontSize="10" textAnchor="middle" fontWeight="500">Sel</text>
                                <text x="200" y="220" fill="#9CA3AF" fontSize="10" textAnchor="middle" fontWeight="500">Rab</text>
                                <text x="280" y="220" fill="#9CA3AF" fontSize="10" textAnchor="middle" fontWeight="500">Kam</text>
                                <text x="360" y="220" fill="#9CA3AF" fontSize="10" textAnchor="middle" fontWeight="500">Jum</text>
                                <text x="440" y="220" fill="#9CA3AF" fontSize="10" textAnchor="middle" fontWeight="500">Sab</text>
                                <text x="520" y="220" fill="#9CA3AF" fontSize="10" textAnchor="middle" fontWeight="500">Min</text>

                                {/* Y-Axis Labels */}
                                <text x="30" y="44" fill="#9CA3AF" fontSize="10" textAnchor="end" fontWeight="500">Rp3M</text>
                                <text x="30" y="94" fill="#9CA3AF" fontSize="10" textAnchor="end" fontWeight="500">Rp2M</text>
                                <text x="30" y="144" fill="#9CA3AF" fontSize="10" textAnchor="end" fontWeight="500">Rp1M</text>
                                <text x="30" y="194" fill="#9CA3AF" fontSize="10" textAnchor="end" fontWeight="500">0</text>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Menu Populer */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col">
                    <div className="mb-5">
                        <h3 className="font-bold text-lg text-gray-900">Menu Populer</h3>
                        <p className="text-gray-500 text-xs mt-0.5">Daftar produk paling laku terjual</p>
                    </div>

                    <div className="flex-1 divide-y divide-gray-100 overflow-y-auto pr-1 max-h-[300px] scrollbar-thin">
                        {menuData.slice(0, 5).map((data, idx) => (
                            <div key={idx} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0 hover:bg-gray-50/50 rounded-xl transition-all duration-200 px-2 -mx-2">
                                <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
                                    <Image
                                        src={data.images}
                                        alt={data.productName}
                                        fill
                                        sizes="48px"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="font-semibold text-sm text-gray-950 truncate">{data.productName}</h4>
                                        {data.isBestSeller && (
                                            <span className="flex items-center gap-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                                <FaStar className="text-[8px]" /> Best
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 truncate mt-0.5">
                                        {data.productDescription || data.productDestcription}
                                    </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <div className="font-bold text-sm text-gray-900">{data.productPricing}</div>
                                    <div className="flex items-center justify-end gap-1 mt-0.5">
                                        <span className={`h-1.5 w-1.5 rounded-full ${data.stock > 10 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                        <span className="text-[10px] text-gray-400 font-medium">Stok: {data.stock}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
