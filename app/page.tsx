"use client"

import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/RegisterForm";
import CarHero from "@/components/Home/Car";
import PriceModal from "@/components/Home/PriceModal";
import HowItWorksHero from "@/components/Home/HowItWorks";
import Contact from "@/components/Home/Contact";
import Entry from "@/components/Home/Entry";
import Footer from "@/components/Home/Footer";
import AboutMePage from "@/components/Home/AboutMe";
import EntryInfoModal from "@/components/Home/EntryModal"

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

export default function Home() {
  const [view, setView] = useState<"home" | "login" | "signup">("home");
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [isEntryPopupOpen, setIsEntryPopupOpen] = useState(false);

  const smoother = useRef<any>(null);

  useEffect(() => {
    if (isOpenPrice) {
      smoother.current?.paused(true); // stop page scroll
    } else {
      smoother.current?.paused(false); // resume page scroll
    }
  }, [isOpenPrice]);

  {/* Handle Little animations */}
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, TextPlugin);

    if (!smoother.current) {
      smoother.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
        normalizeScroll: true,
      });
    }

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);

  }, []);

  {/* Handle hash change */}
  useEffect(() => {
    const handleHashChange = () => {
    const hash = window.location.hash;
    if (hash === "#login") setView("login");
    else if (hash === "#signup") setView("signup");
    else setView("home");
  };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);


  const goToLogin = () => {
    window.location.hash = "login";
    setView("login");
  };

  const goToSignup = () => {
    window.location.hash = "signup";
    setView("signup");
  }

  const goHome = () => {
    window.location.hash = "";
    setView("home");
  };

  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector);
    if (!target) {
      console.warn(`Scroll target not found: ${selector}`);
      return;
    }
    smoother.current?.scrollTo(target, true);
  };

  return (
    <>
    {view == "home" && (
      <>
      <div
          className="
            fixed inset-0
            bg-[url('/bg.png')]
            bg-center
            bg-no-repeat
            bg-cover
            z-[-1]
          "
        />

      <main id="smooth-wrapper" className="min-h-screen w-screen">
        <div id="smooth-content" className="flex flex-col w-full overflow-hidden">
          {/* Entry Page */}
          <Entry 
            goToLogin={goToLogin}
            goToSignup={goToSignup}
            smoothScroll={scrollToSection}
            openInfoPopup={() => setIsEntryPopupOpen(true)}
          />

          {/* Main */}
          <section className="main w-full flex flex-col items-center">
            {/* Upper Section */}
            <section className="
              w-full flex flex-col items-center 
              bg-[var(--WarmWhite)] 
              lg:py-10 
              2xl:py-30
            ">
              <section className="
                w-[98%] h-20 
                sm:w-[95%] 
                md:w-[70%] 
                lg:w-[85%]
                xl:w-4/5 xl:h-15 
                2xl:w-4/5
                flex">
                <div className="flex-3 h-full flex justify-start items-center">
                  <span className="
                  text-2xl 
                  sm:text-xl
                  
                  xl:text-4xl 
                  2xl:text-5xl 
                  font-extrabold"
                > Poznaj naszą flotę</span>
                </div>
                <div className="flex-2 h-full flex justify-end items-center">
                  <button 
                    onClick={() => setIsOpenPrice(true)} 
                    className="
                      text-[var(--White)] text-sm xl:text-xl 2xl:text-2xl font-semibold 
                      bg-[var(--Black)] hover:cursor-pointer py-2 px-2 xl:px-6 xl:py-3 rounded-md 
                      transition transform hover:scale-107
                    "> Zobacz cennik
                    </button>
                </div>
              </section>
              <CarHero with_buttons={true} selectable={false} smoothScroll={scrollToSection}/>
            </section>
            
            <section className="w-full h-[90vh] flex items-center justify-center bg-black/60">
              <AboutMePage />
            </section>

            {/* Jak to działa */}
            <HowItWorksHero />
            
            <section className="w-full flex flex-col items-center bg-[var(--WarmWhite)]">
              {/* Contact Info */}
              <Contact />
            </section>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      </main>
      </>
    )}

    {isOpenPrice && (
      <PriceModal
        isOpen={isOpenPrice}
        onClose={() => setIsOpenPrice(false)}
        customMode={customMode}
        setCustomMode={setCustomMode}
        smoothScroll={scrollToSection}
      />
    )}

    {isEntryPopupOpen && (
      <EntryInfoModal
        isOpen={isEntryPopupOpen}
        onClose={() => setIsEntryPopupOpen(false)}
      />
    )}


    {view === "login" && <LoginForm goHome={goHome} goToSignup={goToSignup} />}
    {view === "signup" && <SignupForm goHome={goHome} goToLogin={goToLogin} />}
    </>
  );
}
