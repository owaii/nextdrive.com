import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import Baner from "./Baner";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useEffect, useState } from "react";

type EntryProps = {
  goToLogin: () => void;
  goToSignup: () => void;
  smoothScroll: (selector: string) => void;
  openInfoPopup: () => void;
};

export default function Entry({ goToLogin, goToSignup, smoothScroll, openInfoPopup } : EntryProps) {
  gsap.registerPlugin(SplitText);
  const [index, setIndex] = useState(0);

  const texts = [
    "Poczuj pewność siebie",
    "Jedź bez stresu",
    "Zdobądź kontrolę",
  ];


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
        ease: "circ.out",
        stagger: 0.5,
      })

    })
  }, [index]);

  return (
    <section className="entry min-h-screen w-full relative">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/backgroundPic.png')] filter blur-xs scale-102">
        <div 
          className="h-full w-full absolute inset-0 bg-[radial-gradient(circle,rgba(89,131,252,0)_0%,rgba(0,0,0,1)_100%)]" 
        ></div>
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Header */}
        <header className="w-full flex p-2 2xl:p-5 justify-between items-center">
          <Link href="/">
            <div className="h-13 2xl:h-[90px] aspect-square relative">
              <Image 
                src="/logo1.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <div className="flex gap-4">
            <button
              onClick={() => { toast("Logowanie oraz Rejestracja jest zarezerwowana tylko dla uczniów szkólki i nie została jeszcze zrobiona") }}
              className="
                text-sm 2xl:text-xl
                text-(--White) font-semibold 
                bg-(--Black) bg-opacity-50 
                hover:cursor-pointer 
                px-3 py-2
                2xl:px-4 2xl:py-2 
                rounded-md transition transform hover:scale-105"
            >
              Zaloguj
            </button>
            <button
              onClick={() => { toast("Logowanie oraz Rejestracja jest zarezerwowana tylko dla uczniów szkólki i nie została jeszcze zrobiona") }}
              className="
              text-sm 2xl:text-xl
              text-(--White) font-semibold 
              bg-(--Black) bg-opacity-50 
              hover:cursor-pointer 
              px-3 py-2
              2xl:px-4 2xl:py-2 
              rounded-md transition transform hover:scale-105"
            >
              Rejestracja
            </button>
          </div>
        </header>
        <Baner openInfoPopup={openInfoPopup}/>

        {/* Main */}
        <section className="flex-1 flex flex-col justify-center items-center px-4 2xl:px-10">

          <div className="w-full max-w-7xl text-center">
            <span className="title text-3xl xl:text-6xl 2xl:text-8xl font-extrabold text-(--White) drop-shadow-[0_5px_10px_rgba(0,0,0,0.7)] leading-tight">
              {texts[index]}
            </span>
            
            <div className="mt-4 2xl:mt-8 flex flex-wrap justify-center gap-6">
              <button 
                onClick={() => smoothScroll("#CarChoice")} 
                className="
                  text-xs 2xl:text-xl 2xl:text:2xl
                  text-(--White) font-semibold 
                  bg-(--Black) bg-opacity-50 border border-(--White) 
                  px-3 py-2
                  2xl:px-4 2xl:py-2 rounded-md 
                  hover:scale-105 transition transform cursor-pointer"
                > Sprawdź ofertę
              </button>
              <button 
                onClick={() => smoothScroll("#HowThisWorks")} 
                className="
                  text-xs 2xl:text-xl 2xl:text:2xl
                  text-(--TextBlack) font-semibold 
                  bg-(--WarmWhite) border border-(--Black) 
                  px-3 py-2
                  2xl:px-4 2xl:py-2 rounded-md 
                  hover:scale-105 transition transform cursor-pointer"
                > Dowiedz się więcej
              </button>
            </div>
          </div>
        </section>

        {/* Arrow */}
        <div className="flex flex-col justify-center items-center py-10">
          <span className="text-(--White) font-light text-center 2xl:mb-2 block text-sm 2xl:text-xl">Scrolluj żeby zobaczyć więcej</span>
          <div className="w-4 h-4 2xl:w-6 2xl:h-6 border-l-2 border-b-2 border-(--White) rotate-315 animate-pulse mt-1 2xl:mt-2"></div>
        </div>
      </div>
    </section>
  );
}