"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navbarData } from "@/lib/data/navbarData"
import Button from "@/components/ui/button"
import Image from "next/image"

import { useState } from "react"
import { HiMenu, HiX } from "react-icons/hi"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    return (
        <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-5 px-8 sm:px-8">
            <div className="mx-auto flex max-w-[1400px] flex-col md:flex-row md:items-center justify-between border-2 border-black bg-white p-2.5 px-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-3xl md:rounded-full text-black font-semibold">
                
                {/* Header Utama (Logo & Hamburger di Mobile) */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    <div className="flex items-center">
                        <Image
                            width={65}
                            height={65}
                            src="/kopkit/LogoMain.png"
                            alt="Logo KopKit"
                        />
                    </div>
                    {/* Hamburger Button untuk Mobile */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="md:hidden text-3xl focus:outline-none p-2"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>

                {/* Navigation Links */}
                <div className={`
                    flex flex-col md:flex-row text-black items-start md:items-center gap-4 md:gap-2 
                    bg-gray-50 md:bg-gray-100 border-2 border-black md:border-none rounded-2xl md:rounded-full 
                    w-full md:w-auto overflow-hidden md:overflow-visible transition-all duration-300 ease-in-out
                    ${isOpen 
                        ? 'max-h-[300px] opacity-100 mt-4 p-4 px-4 border-2' 
                        : 'max-h-0 opacity-0 mt-0 p-0 px-4 border-0 md:border-none pointer-events-none md:pointer-events-auto md:max-h-none md:opacity-100 md:p-1 md:px-2'
                    }
                `}>
                    {navbarData.map((value, idx) => {
                        const isActive = pathname === value.path
                        return (
                            <div key={idx} className="w-full md:w-auto">
                                <Link
                                    href={value.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block w-full md:w-auto rounded-xl md:rounded-full px-4 py-2 transition-all duration-300 ${
                                        isActive 
                                            ? "bg-[#1E1E1E] text-white" 
                                            : "text-black/70 hover:bg-black/10 hover:text-black"
                                    }`}
                                >
                                    {value.navigasi}
                                </Link>
                            </div>
                        )
                    })}
                </div>

                {/* Contact Button */}
                <div className={`
                    w-full md:w-auto overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen 
                        ? 'max-h-[100px] opacity-100 mt-4' 
                        : 'max-h-0 opacity-0 mt-0 pointer-events-none md:pointer-events-auto md:max-h-none md:opacity-100 md:mt-0'
                    }
                `}>
                    <Button onClick={() => alert("hello")} className="w-full md:w-auto py-3">Contact</Button>
                </div>

            </div>
        </header>
    )
}
