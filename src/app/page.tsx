"use client"

{/* Files Imports */}
import LandingPage from "@/components/LandingPage";
import CarChoicePage from "@/components/CarChoicePage";
import AboutMe from "@/components/AboutMe";
import HeroSection from "@/components/HeroSection";
import ContactPage from "@/components/ContactPage";
import PricingPage from "@/components/PricingPage";
import InfoPage from "@/components/InfoPage";
import OffersHero from "@/components/OffersHero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-brand-black overflow-hidden">
      <section className="flex flex-col">
        <LandingPage />
        
        <CarChoicePage />

        <AboutMe />

        <HeroSection />

        <InfoPage />

        <OffersHero />

        <ContactPage />
        
        <PricingPage />

        <Footer />
      </section>
    </main>    
  );
}
