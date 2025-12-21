"use client";

import Image from "next/image";
import clsx from "clsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

type HeroBlockProps = {
  title: string;
  text: string;
  image_src: string;
};

function HeroBlock({ title, text, image_src }: HeroBlockProps) {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <section className={clsx("w-full h-2/3 flex flex-col", "sm:flex-row")}>
        <div className="flex-1 flex justify-center items-center">
          <div className="relative h-2/3 aspect-square 2xl:h-1/2">
            <Image
              src={`images/${image_src}`}
              alt="Step Icon"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <section className="flex-1 flex flex-col justify-center items-center 2xl:my-35">
          <div className="flex-1 flex items-center justify-center">
            <span className="text-xl 2xl:text-4xl text-txt-black font-extrabold">
              {title}
            </span>
          </div>
          <div className="flex-2 flex justify-center items-start px-10">
            <span className="text-sm 2xl:text-xl text-txt-black font-light tracking-wide">
              {text}
            </span>
          </div>
        </section>
      </section>
    </section>
  );
}

export default function HeroSection() {
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
      },
    });

    tl.from(".box-1", {
      x: "100%",
      opacity: 0,
      zIndex: 20,
      duration: 6,
      ease: "power2.out",
    })
      .from(".box-2", {
        x: "-100%",
        opacity: 0,
        zIndex: 30,
        duration: 6,
        ease: "power2.out",
      })
      .from(".box-3", {
        y: "100%",
        opacity: 0,
        zIndex: 40,
        duration: 6,
        ease: "power2.out",
      });
  }, []);

  return (
    <section className="pin-section relative w-full h-screen shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="w-full h-screen bg-brand-white flex items-center justify-center">
        <span className="text-4xl 2xl:text-7xl text-txt-black font-bold tracking-wide">
          Jak to działa?
        </span>
      </div>
      <div className="box-1 absolute top-0 left-0 w-full h-screen bg-brand-white flex items-center justify-center">
        <HeroBlock
          title="Odkryj naszą ofertę"
          text="Przeglądaj nasze pakiety jazd doszkalających i wybierz ten, który najlepiej odpowiada Twoim potrzebom. Jasne informacje, atrakcyjne opcje i pełen przegląd możliwości w jednym miejscu."
          image_src="FirstStep.png"
        />
      </div>
      <div className="box-2 absolute top-0 left-0 w-full h-screen bg-brand-white flex items-center justify-center">
        <HeroBlock
          title="Zapisz się w kilka kliknięć"
          text="Zapisy są teraz szybkie i wygodne! Wystarczy telefon, ustal godziny i miejsce jazd, a Twoja jazda doszkalająca czeka."
          image_src="SecondStep.png"
        />
      </div>
      <div className="box-3 absolute top-0 left-0 w-full h-screen bg-brand-white flex items-center justify-center">
        <HeroBlock
          title="Ciesz się profesjonalną nauką"
          text="Doświadcz profesjonalizmu i przyjaznej atmosfery instruktora, który prowadzi jazdy doszkalające z indywidualnym podejściem. Każda lekcja przybliża Cię do pewności i bezpieczeństwa za kierownicą."
          image_src="ThirdStep.png"
        />
      </div>
    </section>
  );
}
