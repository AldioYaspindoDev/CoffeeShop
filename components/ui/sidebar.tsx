"use client"

import { MdDashboard } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { PiNoteDuotone } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { sidebarData } from "@/lib/data/sidebarData";
import { usePathname } from "next/navigation";
import { IoMdExit } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
    
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    MdDashboard: MdDashboard,
    MdCategory: MdCategory,
    MdOutlineRestaurantMenu: MdOutlineRestaurantMenu,
    PiNoteDuotone: PiNoteDuotone,
    MdPayments: MdPayments,
    IoMdSettings: IoMdSettings,
}

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <aside className="w-64 h-screen flex flex-col p-4 border-r border-gray-200 bg-white">
            <div className="flex gap-3 mb-10 items-center">
                <div>
                    <Image
                        src='/kopkit/LogoMain.png'
                        alt="Kopkit"
                        width={50}
                        height={50}
                    />
                </div>

                <div className="flex flex-col">
                    <h1 className="font-bold text-xl">
                        Admin KOPKIT
                    </h1>
                    <p className="font-semibold text-sm text-gray-500">
                        Coffee Operational
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {sidebarData.map((data, idx) => {
                    const IconComponents = iconMap[data.icon]
                    const targetPath = `/admins/${data.menu}`.toLowerCase();
                    const isActivate = pathname.toLowerCase() === targetPath || (data.menu === "dashboard" && pathname.toLowerCase() === "/admins");
                    return (
                        <Link
                            key={idx}
                            href={`/admins/${data.menu}`}
                            className={`flex items-center gap-3 px-4 py-3 border-l-4 transition-all ${isActivate
                                ? "border-black bg-gray-100 text-gray-900 font-semibold"
                                : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            {IconComponents && <IconComponents className="text-lg" />}
                            <span className="capitalize">{data.menu}</span>
                        </Link>
                    )
                })}
            </div>


            <div className="flex items-center gap-3 justify-center p-2 border-t border-gray-200 mt-auto cursor-pointer hover:bg-gray-50 rounded-xl transition-all">
                <IoMdExit className="text-red-800 text-xl" />
                <h1 className="font-semibold text-gray-700">Exit</h1>
            </div>

        </aside>
    )
}