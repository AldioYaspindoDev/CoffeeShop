import Navbar from "@/components/ui/navbar"
import HeroAbout from "@/components/about/heroAbout"
import OurValue from "@/components/about/ourValue"
import Gallery from "@/components/sections/gallery"
import FullLocation2 from "@/components/about/fullLocation2"
import CtaAbout from "@/components/about/ctaAbout"
import Footer from "@/components/ui/footer"

export default function About() {
    return (
        <section>
            <Navbar />
            <HeroAbout />
            <OurValue />
            <Gallery />
            <FullLocation2 />
            <CtaAbout />
            <Footer />
        </section>
    )
}