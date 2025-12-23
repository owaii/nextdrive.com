"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import clsx from "clsx";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";

type PromoBlockProps = {
  title: string;
  updated_price: number;
  regular_price: number;
  onSelect: () => void;
};

function PromoBlock({
  title,
  updated_price,
  regular_price,
  onSelect,
}: PromoBlockProps) {
  const tag_reduce = Math.floor(100 - (updated_price / regular_price) * 100);

  return (
    <section
      onClick={onSelect}
      className={clsx(
        "w-8/10 aspect-2/1 flex flex-col bg-cover bg-center bg-no-repeat bg-[url('/nextdrive.com/images/Background.png')] hover:scale-101 duration-300 cursor-pointer",
        "sm:w-3/10",
        "2xl:w-2/10 2xl:aspect-4/5"
      )}
    >
      {/* Header */}
      <section className="w-full h-10 2xl:h-27 flex items-center justify-center">
        <span className="text-2xl text-promo-secondary font-bold">{title}</span>
      </section>

      {/* Main */}
      <section className="2xl:relative w-full flex flex-1 flex-col items-center justify-center mt-5 2xl:mt-0">
        <span className="text-4xl 2xl:text-6xl text-promo-secondary font-extrabold">
          {updated_price} PLN
        </span>

        <section className="w-full flex items-center justify-center gap-7">
          <span className="text-xl 2xl:text-2xl text-promo-third font-light line-through">
            {regular_price} PLN
          </span>
          <span className="text-2xl 2xl:text-4xl text-promo-primary font-bold">
            {tag_reduce}%
          </span>
        </section>

        <span
          className={clsx(
            "text-l text-promo-secondary font-bold",
            "2xl:text-xl 2xl:absolute 2xl:bottom-0 2xl:mb-2"
          )}
        >
          Kliknij, żeby się umówić
        </span>
      </section>
    </section>
  );
}

export default function LandingPage() {
  const router = useRouter();

  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isManualPromoOpen, setIsManualPromoOpen] = useState(false);

  const titles = ["Poczuj pewność siebie"];

  let index = 0;

  useEffect(() => {
    document.body.style.overflow = isPromoOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPromoOpen]);

  /* title animation */
  useEffect(() => {
    gsap.registerPlugin(SplitText);

    document.fonts.ready.then(() => {
      const split = new SplitText(".title", { type: "words" });

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 7,
      });

      tl.from(split.words, {
        y: 100,
        opacity: 0,
        ease: "circ.inOut",
        stagger: 0.5,
      });
    });
  }, [index]);

  const handlePromoSelect = () => {
    setIsPromoOpen(false);
    router.push("#Contact");
  };

  return (
    <section className="w-full h-screen relative overflow-hidden">
      {/* Background Image + Tint */}
      <div className="absolute -inset-10 bg-cover bg-center bg-no-repeat bg-[url('/nextdrive.com/images/Background.png')] filter blur-md">
        <div className="absolute inset-0 w-full min-h-screen bg-[radial-gradient(circle,rgba(89,131,252,0)_0%,rgba(0,0,0,1)_100%)]"></div>
      </div>

      {/* Main */}
      <section className="relative z-10 w-full h-screen flex flex-col">
        {/* Header */}
        <header className="w-full h-20 2xl:h-35 flex">
          <div className="flex-1 h-full flex justify-start items-center">
            <div className="relative h-full aspect-square ml-2">
              <Image
                src="/nextdrive.com/images/Logo.png"
                alt="Logo"
                priority
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex-1 h-full flex justify-end items-center">
            <section className="flex gap-3 mr-2">
              <button
                onClick={() =>
                  toast(
                    "Logowanie oraz Rejestracja jest zarezerwowana tylko dla uczniów szkólki i nie została jeszcze zrobiona"
                  )
                }
                className="py-1 px-3 rounded-sm border border-brand-white hover:scale-102 duration-300 cursor-pointer"
              >
                <span className="text-sm 2xl:text-xl text-txt-white font-bold">
                  Zarejestruj
                </span>
              </button>
              <button
                onClick={() =>
                  toast(
                    "Logowanie oraz Rejestracja jest zarezerwowana tylko dla uczniów szkólki i nie została jeszcze zrobiona"
                  )
                }
                className="py-1 px-3 rounded-sm border border-brand-white hover:scale-102 duration-300 cursor-pointer"
              >
                <span className="text-sm 2xl:text-xl text-txt-white font-bold">
                  Zaloguj
                </span>
              </button>
            </section>
          </div>
        </header>

        {/* Title + buttons */}
        <section className="w-full flex-1 flex items-center justify-center">
          <section className="w-full flex flex-col gap-2">
            <div className="w-full flex-1">
              <div className="w-full flex items-center justify-center text-center">
                <span className="title text-5xl 2xl:text-8xl text-txt-white font-bold tracking-wide">
                  {titles[index]}
                </span>
              </div>
            </div>

            <section className="w-full h-20 flex justify-center items-center gap-5">
              <button className="py-1.5 px-2 rounded-sm bg-brand-white border border-brand-black hover:scale-102 duration-300 cursor-pointer">
                <Link href="#AboutMe">
                  <span className="text-sm 2xl:text-xl text-txt-black font-bold">
                    Dowiedz się więcej
                  </span>
                </Link>
              </button>
              <button className="py-1.5 px-2 rounded-sm bg-brand-black border border-brand-white hover:scale-102 duration-300 cursor-pointer">
                <Link href="#Contact">
                  <span className="text-sm 2xl:text-xl text-txt-white font-bold">
                    Kontakt
                  </span>
                </Link>
              </button>
            </section>
          </section>
        </section>

        {/* Footer */}
        <div className="w-full h-20 flex items-end justify-center">
          <section className="flex flex-col items-center justify-end pb-5">
            <span className="text-l text-txt-white font-light tracking-wide">
              Scrolluj żeby zobaczyć więcej
            </span>
            <div className="w-6 h-6 border-l-2 border-b-2 border-brand-white rotate-315 animate-pulse"></div>
          </section>
        </div>
      </section>

      {/* Promo Baner */}
      <div
        onClick={() => setIsPromoOpen(true)}
        className={clsx(
          "absolute inset-0 w-full aspect-3/1 top-25 bg-cover bg-center bg-no-repeat bg-[url('/nextdrive.com/images/PromoBaner.png')] cursor-pointer z-20",
          "sm:w-2/5 sm:top-0 sm:left-1/2 sm:-translate-x-1/2"
        )}
      />

      {/* Promo Popup */}
      {isPromoOpen && (
        <div className="absolute inset-0 w-full h-full bg-brand-black/60 flex items-center justify-center z-30">
          <section className="relative w-full h-full rounded-sm bg-brand-white flex flex-col justify-center overflow-y-auto">
            {/* Escape button */}
            <div
              onClick={() => setIsPromoOpen(false)}
              className="absolute top-4 right-4 text-2xl hover:text-txt-red cursor-pointer"
            >
              X
            </div>

            {/* Button section */}
            <section className="w-full flex items-center justify-center gap-5 p-10 2xl:absolute 2xl:top-10">
              <button
                onClick={() => setIsManualPromoOpen(false)}
                className={clsx(
                  "py-3 px-4 rounded-sm border duration-300 cursor-pointer",
                  !isManualPromoOpen
                    ? "bg-promo-primary border-promo-secondary text-promo-secondary"
                    : "bg-promo-secondary border-promo-primary",
                  "hover:scale-103"
                )}
              >
                <span className="text-sm 2xl:text-xl font-bold">Automat</span>
              </button>
              <button
                onClick={() => setIsManualPromoOpen(true)}
                className={clsx(
                  "py-3 px-4 rounded-sm border duration-300 cursor-pointer",
                  isManualPromoOpen
                    ? "bg-promo-primary border-promo-secondary text-promo-secondary"
                    : "bg-promo-secondary border-promo-primary",
                  "hover:scale-103"
                )}
              >
                <span className="text-sm 2xl:text-xl font-bold">Manual</span>
              </button>
            </section>

            {/* Promo Section */}
            <section className="w-full flex flex-col items-center gap-5 sm:flex-row sm:justify-center 2xl:justify-center 2xl:gap-10">
              {!isManualPromoOpen && (
                <>
                  <PromoBlock
                    title="Co 1h"
                    updated_price={120}
                    regular_price={160}
                    onSelect={handlePromoSelect}
                  />
                  <PromoBlock
                    title="Przy zakupie 6h"
                    updated_price={660}
                    regular_price={790}
                    onSelect={handlePromoSelect}
                  />
                  <PromoBlock
                    title="Przy zakupie 10h"
                    updated_price={1000}
                    regular_price={1250}
                    onSelect={handlePromoSelect}
                  />
                </>
              )}

              {isManualPromoOpen && (
                <>
                  <PromoBlock
                    title="Co 1h"
                    updated_price={110}
                    regular_price={150}
                    onSelect={handlePromoSelect}
                  />
                  <PromoBlock
                    title="Przy zakupie 6h"
                    updated_price={630}
                    regular_price={825}
                    onSelect={handlePromoSelect}
                  />
                  <PromoBlock
                    title="Przy zakupie 10h"
                    updated_price={960}
                    regular_price={1200}
                    onSelect={handlePromoSelect}
                  />
                </>
              )}
            </section>
          </section>
        </div>
      )}
    </section>
  );
}
