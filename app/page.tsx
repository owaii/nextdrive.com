"use client"
import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [view, setView] = useState<"home" | "login" | "signup">("home");

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
                <span className="text-[300%] text-amber-50 font-bold font-mono">NextDrive.pl</span>
              </Link>
            </section>
            <section className="flex flex-1 justify-end items-center">
              <button
                onClick={goToLogin}
                className="text-amber-50 font-semibold bg-black bg-opacity-50 hover:cursor-pointer px-4 py-2 rounded-md mr-4 transition transform hover:scale-105"
              >Zaloguj</button>
              <button
                onClick={goToSignup}
                className="text-amber-50 font-semibold bg-black bg-opacity-50 hover:cursor-pointer px-4 py-2 rounded-md mr-4 transition transform hover:scale-105"
              >Rejestracja</button>
            </section>
          </header>
          <section className="h-7/10 w-full flex justify-center items-center">
            <section className="h-full w-2/3 flex flex-col justify-center items-cetner mt-15">
              <h1 className="
                text-6xl md:text-7xl lg:text-8xl 
                font-extrabold 
                text-center 
                text-amber-50 
                drop-shadow-[0_5px_10px_rgba(0,0,0,0.7)] 
                leading-tight
                px-4
                animate-fadeIn
              ">
                Poczuj pewność siebie za kierownicą
              </h1>
              <span className="text-2xl font-medium text-amber-50 text-center drop-shadow-[0_5px_10px_rgba(0,0,0,0.7)] leading-tight animate-fadeIn mt-6 px-60">
                Profesjonalne jazdy doszkalające dla każdego kierowcy – od początkujących po doświadczonych. Sprawdź naszą ofertę i poczuj kontrolę za kierownicą.
              </span>
              <section className="w-full p-10 flex justify-center items-center mt-6 animate-fadeIn gap-10">
                <button className="text-amber-50 font-semibold bg-black bg-opacity-50 border border-amber-50 hover:cursor-pointer px-4 py-2 rounded-md mr-4 transition transform hover:scale-105">Sprawdź ofertę</button>
                <button className="text-black font-semibold bg-amber-50 border border-black hover:cursor-pointer px-4 py-2 rounded-md mr-4 transition transform hover:scale-105">Dowiedz się więcej</button>
              </section>
            </section>
          </section>
          <div className="h-2/10 w-full flex flex-col justify-end items-center">
            <span className="text-amber-50 font-light text-center mb-2 block">Scrolluj żeby zobaczyć więcej</span>
            <div className="w-6 h-6 border-l-2 border-b-2 border-white rotate-315 animate-pulse mb-10"></div>
          </div>
        </section>

        <section className="w-full min-h-screen bg-amber-50 flex flex-col items-center">
          <div className="w-full mt-20 flex justify-center">
            <span className="text-6xl font-extrabold">Poznaj naszą flotę</span>
          </div>
          
          <section className="w-full flex items-center justify-center mx-auto pt-20">
            <section className="w-140 h-200 border border-black rounded-4xl flex flex-col">

            </section>
          </section>
        </section>
      </main>
    )}

    {view === "login" && <LoginForm goHome={goHome} goToSignup={goToSignup} />}
    {view === "signup" && <SignupForm goHome={goHome} goToLogin={goToLogin} />}
    </>
  );
}
