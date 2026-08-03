import Navbar from "@/components/sections/navbar"
import HeroSection from "@/components/sections/heroSection"
import MenuSpecial from "@/components/sections/menuSpecial"
import AboutKopkit from "@/components/sections/aboutKopkit"
import TakeUsWithYou from "@/components/sections/takeUsWithYou"
import Gallery from "@/components/sections/gallery"
import Location from "@/components/sections/location"
import CallToAction from "@/components/sections/callToAction"
import Footer from "@/components/sections/footer"

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MenuSpecial />
      <AboutKopkit />
      <TakeUsWithYou />
      <Gallery />
      <Location />
      <CallToAction />
      <Footer />
    </div>
  )
}
