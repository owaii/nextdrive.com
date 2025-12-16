"use client";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

type HowItWorksBlockProps = {
  image_src: string;
  title: string;
  text: string;
};

function HowItWorksBlock({ image_src, title, text }: HowItWorksBlockProps) {
  return (
    <section className="p-5 h-full xl:h-70 2xl:h-80 flex flex-col xl:flex-row 2xl:flex-row xl:justify-center 2xl:justify-center">
      <div className="flex-1 aspect-square p-5 relative flex justify-center items-center">
        <Image
          src={`/${image_src}`}
          alt="Step Icon"
          fill
          className="object-scale-down"
        />
      </div>
      <section className="flex flex-1 flex-col justify-center">
        <div className="flex-1 flex items-center justify-center p-2 xl:p-5 2xl:p-5">
          <span className="text-xl xl:text-2xl 2xl:text-3xl font-extrabold">{title}</span>
        </div>
        <div className="flex-2 flex justify-center items-start mt-5 xl:mt-8 2xl:mt-10">
          <span className="text-sm xl:text-l 2xl:text-l font-light px-10 text-center xl:text-left 2xl:text-left">{text}</span>
        </div>
      </section>
    </section>
  );
}

export default function HowItWorksHero() {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".pin-section",
        pin: true,
        start: "top top",
        pinSpacing: true,
        anticipatePin: 1,
        end: "+=250%",
        scrub: true,
      }
    })

    tl.from(".box-1", {x: "100%", opacity: 0, zIndex: 20, duration: 6, ease: "power2.out"})
      .from(".box-2", {x: "-100%", opacity: 0, zIndex: 30, duration: 6, ease: "power2.out"})
      .from(".box-3", {y: "100%", opacity: 0, zIndex: 40, duration: 6, ease: "power2.out"})

  }, [])

  return (
    <section id="HowThisWorks" className="pin-section w-full min-h-screen relative shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="w-full h-screen bg-(--WarmWhite) flex items-center justify-center">
        <span className="text-4xl xl:text-5xl 2xl:text-6xl text-black font-extrabold">Jak to działa?</span>
      </div>
      <div className="box-1 w-full h-screen bg-(--WarmWhite) flex items-center justify-center absolute top-0 left-0">
        <HowItWorksBlock 
          image_src="FirstStep.png" 
          title="Odkryj naszą ofertę" 
          text="Przeglądaj nasze pakiety jazd doszkalających i wybierz ten, który najlepiej odpowiada Twoim potrzebom. Jasne informacje, atrakcyjne opcje i pełen przegląd możliwości w jednym miejscu."
        />
      </div>
      <div className="box-2 w-full h-screen bg-(--WarmWhite) flex items-center justify-center absolute top-0 left-0">
        <HowItWorksBlock
          image_src="SecondStep.png"
          title="Zapisz się w kilka kliknięć"
          text="Rejestracja nigdy nie była prostsza! Wybierz termin, potwierdź swoje dane i gotowe – miejsce na jazdy doszkalające czeka na Ciebie."
        />
      </div>
      <div className="box-3 w-full h-screen bg-(--WarmWhite) flex items-center justify-center absolute top-0 left-0">
        <HowItWorksBlock
          image_src="ThirdStep.png"
          title="Ciesz się profesjonalną nauką"
          text="Doświadcz profesjonalnych instruktorów, przyjaznej atmosfery i indywidualnego podejścia. Każda lekcja przybliża Cię do pewności i bezpieczeństwa za kierownicą."
        />
      </div>
    </section>
  );
}
