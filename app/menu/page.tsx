"use client"

import { useState } from "react"
import Navbar from "@/components/ui/navbar"
import HeroMenu from "@/components/menu/heroMenu"
import NavMenu from "@/components/menu/navMenu"
import WeeklyPromo from "@/components/menu/weeklyPromo"
import MenuCard from "@/components/menu/menuCard"
import Footer from "@/components/ui/footer"

export default function Menu() {
    const [selectedCategory, setSelectedCategory] = useState("Semua")
    const [currentPage, setCurrentPage] = useState(1)

    // Reset pagination to page 1 whenever category changes
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
        setCurrentPage(1)
    }

    return (
        <main>
            <Navbar />
            <HeroMenu />
            <NavMenu
                selectedCategory={selectedCategory}
                setSelectedCategory={handleCategoryChange}
            />
            <WeeklyPromo />
            <MenuCard
                selectedCategory={selectedCategory}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <Footer />
        </main>
    )
}