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
        <section className="space-y-4">
            {/* Header Section */}
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                    <h1 className="font-bold text-xl text-[#1E1E1E] tracking-tight">Dashboard</h1>
                    <p className="text-[#707070] text-xs">Monitoring operasional hari ini.</p>
                </div>

                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E8E8E8] shadow-xs shrink-0">
                    <button className="px-3 py-1.5 text-[11px] font-semibold text-white bg-[#1E1E1E] rounded-lg transition-all cursor-pointer">
                        Hari ini
                    </button>
                    <button className="px-3 py-1.5 text-[11px] font-semibold text-[#707070] hover:text-[#1E1E1E] rounded-lg hover:bg-[#F7F7F7] transition-all cursor-pointer">
                        7H
                    </button>
                    <button className="px-3 py-1.5 text-[11px] font-semibold text-[#707070] hover:text-[#1E1E1E] rounded-lg hover:bg-[#F7F7F7] transition-all cursor-pointer">
                        30H
                    </button>
                </div>
            </div>

            {/* Overview Cards - 2 columns on mobile */}
            <div className="grid grid-cols-2 gap-3">
                {overviewData.map((data, idx) => {
                    const IconComponent = iconMap[data.icon];
                    const colors = colorMap[data.icon] || { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-100" };
                    const trend = trendMap[data.icon] || { value: "+0%", isUp: true };

                    return (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-xs flex flex-col gap-3">
                            <div className="flex items-start justify-between">
                                <span className="text-[10px] font-semibold text-[#707070] uppercase tracking-wide leading-tight">
                                    {data.title}
                                </span>
                                <div className={`p-2 rounded-lg ${colors.bg} ${colors.text} border ${colors.border}`}>
                                    {IconComponent && <IconComponent className="text-sm" />}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h2 className="text-lg font-bold text-[#1E1E1E] tracking-tight">
                                    {data.data}
                                </h2>
                                <div className="flex items-center gap-1 text-[10px]">
                                    {data.icon !== "IoIosCafe" ? (
                                        <>
                                            {trend.isUp ? (
                                                <FaArrowUp className="text-emerald-500 shrink-0" />
                                            ) : (
                                                <FaArrowDown className="text-rose-500 shrink-0" />
                                            )}
                                            <span className={`truncate ${trend.isUp ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}`}>
                                                {trend.value}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.5 rounded text-[10px]">
                                            {trend.value}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Trend Pendapatan Chart */}
            <div className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-xs">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="font-bold text-sm text-[#1E1E1E]">Trend Pendapatan</h3>
                        <p className="text-[#707070] text-[11px] mt-0.5">7 hari terakhir</p>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                        <IoMdTrendingUp /> +12.4%
                    </span>
                </div>

                <div className="relative h-48 w-full">
                    <svg className="w-full h-full" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="revenue-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0.00" />
                            </linearGradient>
                        </defs>
                        <line x1="40" y1="20" x2="580" y2="20" stroke="#F3F4F6" strokeDasharray="4 4" />
                        <line x1="40" y1="70" x2="580" y2="70" stroke="#F3F4F6" strokeDasharray="4 4" />
                        <line x1="40" y1="120" x2="580" y2="120" stroke="#F3F4F6" strokeDasharray="4 4" />
                        <line x1="40" y1="160" x2="580" y2="160" stroke="#F3F4F6" strokeDasharray="4 4" />
                        <path d="M 40 160 Q 120 130 200 100 T 360 55 T 520 80 T 580 30 L 580 160 L 40 160 Z" fill="url(#revenue-gradient)" />
                        <path d="M 40 160 Q 120 130 200 100 T 360 55 T 520 80 T 580 30" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="40" cy="160" r="4" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
                        <circle cx="200" cy="100" r="4" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
                        <circle cx="360" cy="55" r="4" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
                        <circle cx="520" cy="80" r="4" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
                        <circle cx="580" cy="30" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" className="animate-pulse" />
                        <text x="40" y="185" fill="#9CA3AF" fontSize="9" textAnchor="middle">Sen</text>
                        <text x="120" y="185" fill="#9CA3AF" fontSize="9" textAnchor="middle">Sel</text>
                        <text x="200" y="185" fill="#9CA3AF" fontSize="9" textAnchor="middle">Rab</text>
                        <text x="280" y="185" fill="#9CA3AF" fontSize="9" textAnchor="middle">Kam</text>
                        <text x="360" y="185" fill="#9CA3AF" fontSize="9" textAnchor="middle">Jum</text>
                        <text x="440" y="185" fill="#9CA3AF" fontSize="9" textAnchor="middle">Sab</text>
                        <text x="520" y="185" fill="#9CA3AF" fontSize="9" textAnchor="middle">Min</text>
                        <text x="32" y="24" fill="#9CA3AF" fontSize="9" textAnchor="end">3M</text>
                        <text x="32" y="74" fill="#9CA3AF" fontSize="9" textAnchor="end">2M</text>
                        <text x="32" y="124" fill="#9CA3AF" fontSize="9" textAnchor="end">1M</text>
                        <text x="32" y="164" fill="#9CA3AF" fontSize="9" textAnchor="end">0</text>
                    </svg>
                </div>
            </div>

            {/* Menu Populer */}
            <div className="bg-white p-4 rounded-xl border border-[#E8E8E8] shadow-xs">
                <div className="mb-3">
                    <h3 className="font-bold text-sm text-[#1E1E1E]">Menu Populer</h3>
                    <p className="text-[#707070] text-[11px] mt-0.5">Produk paling laku terjual</p>
                </div>

                <div className="divide-y divide-[#F7F7F7]">
                    {menuData.slice(0, 5).map((data, idx) => (
                        <div key={idx} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                            <div className="relative h-10 w-10 rounded-lg overflow-hidden border border-[#E8E8E8] flex-shrink-0 bg-[#F7F7F7]">
                                <Image
                                    src={data.images}
                                    alt={data.productName}
                                    fill
                                    sizes="40px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1">
                                    <h4 className="font-semibold text-xs text-[#1E1E1E] truncate">{data.productName}</h4>
                                    {data.isBestSeller && (
                                        <span className="flex items-center gap-0.5 bg-amber-50 text-amber-600 text-[9px] font-bold px-1 py-0.5 rounded shrink-0">
                                            <FaStar className="text-[7px]" /> Best
                                        </span>
                                    )}
                                </div>
                                <p className="text-[10px] text-[#707070] truncate mt-0.5">
                                    {data.productDescription || data.productDestcription}
                                </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <div className="font-bold text-xs text-[#1E1E1E]">{data.productPricing}</div>
                                <div className="flex items-center justify-end gap-0.5 mt-0.5">
                                    <span className={`h-1.5 w-1.5 rounded-full ${data.stock > 10 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                    <span className="text-[9px] text-[#707070]">{data.stock}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
