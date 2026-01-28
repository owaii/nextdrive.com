"use client"

{/* Files Imports */}
import LandingPage from "@/components/home/LandingPage";
import CarChoicePage from "@/components/home/CarChoicePage";
import AboutMe from "@/components/home/AboutMe";
import HeroSection from "@/components/home/HeroSection";
import ContactPage from "@/components/home/ContactPage";
import PricingPage from "@/components/home/PricingPage";
import InfoPage from "@/components/home/InfoPage";
import OffersHero from "@/components/home/OffersHero";
import OpinionsPage from "@/components/home/OpinionsPage";
import Footer from "@/components/home/Footer";

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

        <OpinionsPage />
        
        <PricingPage />

        <Footer />
      </section>
    </main>    
  );
}
