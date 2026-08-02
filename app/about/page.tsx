import Navbar from "../layout/navbar"
import HeroAbout from "../layoutAbout/heroAbout"
import OurValue from "../layoutAbout/ourValue"
import Gallery from "../layout/gallery"
import FullLocation2 from "../layoutAbout/fullLocation2"
import CtaAbout from "../layoutAbout/ctaAbout"
import Footer from "../layout/footer"

export default function About(){
    return(
        <section>
            <Navbar/>
            <HeroAbout/>
            <OurValue/>
            <Gallery/>
            <FullLocation2/>
            <CtaAbout/>
            <Footer/>
        </section>
    )
}