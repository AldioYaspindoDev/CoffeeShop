"use client"

import { useState } from "react"
import Navbar from "../layout/navbar"
import HeroMenu from "../layoutMenu/heroMenu"
import NavMenu from "../layoutMenu/navMenu"
import WeeklyPromo from "../layoutMenu/weeklyPromo"
import MenuCard from "../layoutMenu/menuCard"
import Footer from "../layout/footer"

export default function Menu(){
    const [selectedCategory, setSelectedCategory] = useState("Semua")
    const [currentPage, setCurrentPage] = useState(1)

    // Reset pagination to page 1 whenever category changes
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
        setCurrentPage(1)
    }

    return(
        <main>
            <Navbar/>
            <HeroMenu/>
            <NavMenu 
                selectedCategory={selectedCategory} 
                setSelectedCategory={handleCategoryChange} 
            />
            <WeeklyPromo/>
            <MenuCard 
                selectedCategory={selectedCategory} 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <Footer/>
        </main>
    )
}