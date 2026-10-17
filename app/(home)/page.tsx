import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Projects from "@/components/site/Projects";
import Services from "@/components/site/Services";
import Why from "@/components/site/Why";
import Testimonials from "@/components/site/Testimonials";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import SaluteEgg from "@/components/features/SaluteEgg";
import PaletteSwitcher from "@/components/features/PaletteSwitcher";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Services />
        <Why />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <SaluteEgg />
      <PaletteSwitcher />
    </>
  );
}
