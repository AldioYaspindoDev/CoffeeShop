import Navbar from "./layout/navbar";
import HeroSection from "./layout/heroSection";
import MenuSpecial from "./layout/menuSpecial";
import AboutKopkit from "./layout/aboutKopkit";
import TakeUsWithYou from "./layout/takeUsWithYou";
import Gallery from "./layout/gallery";
import Location from "./layout/location";
import CallToAction from "./layout/callToAction";
import Footer from "./layout/footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <MenuSpecial/>
      <AboutKopkit/>
      <TakeUsWithYou/>
      <Gallery/>
      <Location/>
      <CallToAction/>
      <Footer/>
    </div>
  );
}
