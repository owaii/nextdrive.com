"use client"

import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/RegisterForm";
import CarHero from "@/components/MainPage/Car";
import PriceModal from "@/components/MainPage/PriceModal";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [view, setView] = useState<"home" | "login" | "signup">("home");
  const [isOpen, setIsOpen] = useState(false);
  const [customMode, setCustomMode] = useState(false);

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

  return (
    <>
    {view == "home" && (
      <main className="min-h-screen w-screen flex flex-col">
        <section className="h-screen w-full bg-cover bg-center bg-no-repeat bg-[url('/backgroundPic2.png')]">
          <header className="w-full h-1/10 flex p-5">
            <section className="flex flex-1 justify-start items-center">
              <Link href="/">
                <span className="text-[300%] text-(--White) font-bold font-mono">NextDrive.pl</span>
              </Link>
            </section>
            <section className="flex flex-1 justify-end items-center">
              <button
                onClick={goToLogin}
                className="text-(--White) font-semibold bg-(--Black) bg-opacity-50 hover:cursor-pointer px-4 py-2 rounded-md mr-4 transition transform hover:scale-105"
              >Zaloguj</button>
              <button
                onClick={goToSignup}
                className="text-(--White) font-semibold bg-(--Black) bg-opacity-50 hover:cursor-pointer px-4 py-2 rounded-md mr-4 transition transform hover:scale-105"
              >Rejestracja</button>
            </section>
          </header>
          <section className="h-7/10 w-full flex justify-center items-center">
            <section className="h-full w-2/3 flex flex-col justify-center items-cetner mt-15">
              <span className="
                text-6xl md:text-7xl lg:text-8xl 
                font-extrabold 
                text-center 
                text-(--White) 
                drop-shadow-[0_5px_10px_rgba(0,0,0,0.7)] 
                leading-tight
                px-4
                animate-fadeIn
              ">
                Poczuj pewność siebie za kierownicą
              </span>
              <span className="text-2xl font-medium text-(--White) text-center drop-shadow-[0_5px_10px_rgba(0,0,0,0.7)] leading-tight animate-fadeIn mt-6 px-60">
                Profesjonalne jazdy doszkalające dla każdego kierowcy – od początkujących po doświadczonych. Sprawdź naszą ofertę i poczuj kontrolę za kierownicą.
              </span>
              <section className="w-full p-10 flex justify-center items-center mt-6 animate-fadeIn gap-10">
                <Link href="/#CarChoice">
                  <button className="text-(--White) font-semibold bg-(--Black) bg-opacity-50 border border-(--White) hover:cursor-pointer px-4 py-2 rounded-md mr-4 transition transform hover:scale-105">Sprawdź ofertę</button>
                </Link>
                <Link href={"/#SiteInfo"}>
                  <button className="text-(--TextBlack) font-semibold bg-(--WarmWhite) border border-(--Black) hover:cursor-pointer px-4 py-2 rounded-md mr-4 transition transform hover:scale-105">Dowiedz się więcej</button>
                </Link>
              </section>
            </section>
          </section>
          <div className="h-2/10 w-full flex flex-col justify-end items-center">
            <span className="text-(--White) font-light text-center mb-2 block">Scrolluj żeby zobaczyć więcej</span>
            <div className="w-6 h-6 border-l-2 border-b-2 border-(--White) rotate-315 animate-pulse mb-10"></div>
          </div>
        </section>

        <section id="CarChoice" className="w-full min-h-screen bg-(--WarmWhite) flex flex-col items-center">
          <div className="w-full mt-20 flex justify-center">
            <span className="text-6xl font-extrabold">Poznaj naszą flotę</span>
          </div>
          
          <CarHero with_buttons={true} selectable={false}/>

          <section className="w-full flex justify-center items-center mt-20">
            <button onClick={() => setIsOpen(true)} className="text-(--White) text-2xl font-semibold bg-(--Black) hover:cursor-pointer px-6 py-3 rounded-md transition transform hover:scale-107">Zobacz nas cennik</button>
          </section> 

          {/* Contact Info */}
          <section className="w-full flex justify-center items-center mt-30">
            <section className="flex p-10 shadow-md hover:shadow-xl hover:shadow-black/30 hover:scale-102 transition-all duration-300 cursor-pointer rounded-3xl">
              {/* Block 1 */}
              <div className="w-1/2 justify-center items-center">
                <span className="text-7xl font-extrabold">Skontaktuj się z nami</span>
              </div>
              {/* Block 2 */}
              <section className="w-1/2 flex flex-col justify-center items-center">
                <section className="w-4/5 flex">
                  <div className="w-[60px] h-[60px] relative">
                    <Image
                      src="/phone.png"
                      alt="Phone Icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center ml-7">
                    <span className="text-2xl font-semibold">+48 123 456 789</span>
                    <span className="text-sm italic">Pon - Pt: 8:00 - 20:00</span>
                  </div>
                </section>
                <section className="w-4/5 flex mt-6">
                  <div className="w-[60px] h-[60px] relative">
                    <Image
                      src="/email.png"
                      alt="Email Icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center ml-7">
                    <span className="text-2xl font-semibold">jan.kowalski@gmail.com</span>
                  </div>
                </section>
              </section>
            </section>
          </section>
        </section>

        {/* Footer */}
        <section className="w-full h-150 bg-(--Black) flex items-center justify-center flex-col">
          <span className="text-[300%] text-(--White) font-bold font-mono">NextDrive.pl</span>
        </section>
      </main>
    )}

    {isOpen && (
      <PriceModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        customMode={customMode}
        setCustomMode={setCustomMode}
      />
    )}

    {view === "login" && <LoginForm goHome={goHome} goToSignup={goToSignup} />}
    {view === "signup" && <SignupForm goHome={goHome} goToLogin={goToLogin} />}
    </>
  );
}
