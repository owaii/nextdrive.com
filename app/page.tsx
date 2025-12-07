"use client"
import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [view, setView] = useState<"home" | "login" | "signup">("home");
  const [isOpen, setIsOpen] = useState(false);
  const [customMode, setCustomMode] = useState(false);

  const min = 0;
  const max = 10;
  let priceValue = 1500.00;

  const [value, setValue] = useState(5);

  const percent = ((value - min) / (max - min)) * 100;

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

          {/* Car Cards */}
          <section className="w-full flex items-center justify-center mx-auto pt-20 gap-15">
            {/* Car Card 1 */}
            <section className="w-120 flex flex-col rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-black/30 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-full aspect-video relative">
                <Image
                  src="/car2.png"
                  alt="Car 1"
                  fill
                  className="object-cover rounded-t-3xl"
                />
              </div>
              <section className="w-full border border-black border-t-0 rounded-b-3xl flex flex-col">
                <div className="w-full flex items-center justify-center pt-5 px-5">
                  <span className="text-4xl font-bold">RedBull RB23</span>
                </div>
                <div className="w-full flex items-center justify-center">
                  <span className="text-lg italic text-center">Manual</span>
                </div>
                <section className="w-full p-5 flex justify-center items-center gap-5">
                  <button className="text-amber-50 font-semibold bg-black hover:cursor-pointer px-4 py-2 rounded-md transition transform hover:scale-102">Umów Jazdy</button>
                  <button className="text-amber-50 font-semibold bg-black hover:cursor-pointer px-4 py-2 rounded-md transition transform hover:scale-102">Info</button>
                </section>
              </section>
            </section>

            {/* Car Card 2 */}
            <section className="w-120 flex flex-col rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-black/30 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-full aspect-video relative">
                <Image
                  src="/car1.png"
                  alt="Car 1"
                  fill
                  className="object-cover rounded-t-3xl"
                />
              </div>
              <section className="w-full border border-black border-t-0 rounded-b-3xl flex flex-col">
                <div className="w-full flex items-center justify-center pt-5 px-5">
                  <span className="text-4xl font-bold">Ferrari F25</span>
                </div>
                <div className="w-full flex items-center justify-center">
                  <span className="text-lg italic text-center">Automat</span>
                </div>
                <section className="w-full p-5 flex justify-center items-center gap-5">
                  <button className="text-amber-50 font-semibold bg-black hover:cursor-pointer px-4 py-2 rounded-md transition transform hover:scale-102">Umów Jazdy</button>
                  <button className="text-amber-50 font-semibold bg-black hover:cursor-pointer px-4 py-2 rounded-md transition transform hover:scale-102">Info</button>
                </section>
              </section>
            </section>

            {/* Car Card 3 */}
            <section className="w-120 flex flex-col rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-black/30 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-full aspect-video relative">
                <Image
                  src="/car3.png"
                  alt="Car 1"
                  fill
                  className="object-cover rounded-t-3xl"
                />
              </div>
              <section className="w-full border border-black border-t-0 rounded-b-3xl flex flex-col">
                <div className="w-full flex items-center justify-center pt-5 px-5">
                  <span className="text-4xl font-bold">Kick Sauber</span>
                </div>
                <div className="w-full flex items-center justify-center">
                  <span className="text-lg italic text-center">Manual</span>
                </div>
                <section className="w-full p-5 flex justify-center items-center gap-5">
                  <button className="text-amber-50 font-semibold bg-black hover:cursor-pointer px-4 py-2 rounded-md transition transform hover:scale-102">Umów Jazdy</button>
                  <button className="text-amber-50 font-semibold bg-black hover:cursor-pointer px-4 py-2 rounded-md transition transform hover:scale-102">Info</button>
                </section>
              </section>
            </section>
          </section>

          <section className="w-full flex justify-center items-center mt-20">
            <button onClick={() => setIsOpen(true)} className="text-amber-50 text-2xl font-semibold bg-black hover:cursor-pointer px-6 py-3 rounded-md transition transform hover:scale-107">Zobacz nas cennik</button>
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
        <section className="w-full h-150 bg-black flex items-center justify-center flex-col">
          <span className="text-[300%] text-amber-50 font-bold font-mono">NextDrive.pl</span>
        </section>
      </main>
    )}

    {isOpen && (
      <section className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
        <div className="bg-white w-4/5 h-9/10 rounded-2xl p-10 shadow-2xl relative flex flex-col items-center">
          
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-4xl font-bold hover:text-red-600 hover:cursor-pointer"
          >X</button>

          <div className="w-full p-10 flex justify-center items-center">
            <span className="text-7xl font-extrabold text-black">Cennik</span>
          </div>

          <div className="w-full mt-5 flex justify-center items-center flex-col gap-5">
            <span className="text-2xl font-medium text-black text-center leading-tight">
              Wybierz ile godzin jazd chcesz wykupić
            </span>

            {customMode && (
              <section className="flex flex-col gap-5 items-center">
                <div className="w-full flex flex-col items-center mt-10">
                  <section className="relative w-80">
                    <div
                      className="absolute -top-10 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-md"
                      style={{ left: `${percent}%` }}
                    >
                      {value}h
                    </div>

                    <input
                      type="range"
                      min={min}
                      max={max}
                      value={value}
                      onChange={(e) => setValue(Number(e.target.value))}
                      className="w-full accent-black cursor-pointer"
                    />
                  </section>
                </div>

                <button
                  onClick={() => setCustomMode(false)}
                  className="border border-gray-300 px-4 py-3 hover:scale-102 cursor-pointer transition"
                >
                  Wróć
                </button>
              </section>
            )}

            {!customMode && (
              <section className="flex gap-3 flex-col items-center">
                <section className="flex gap-5">
                  <button className="border border-gray-300 px-4 py-3 hover:scale-102 cursor-pointer transition">2</button>
                  <button className="border border-gray-300 px-4 py-3 hover:scale-102 cursor-pointer transition">5</button>
                  <button className="border border-gray-300 px-4 py-3 hover:scale-102 cursor-pointer transition">10</button>
                </section>

                <span className="text-sm">albo</span>

                <button
                  onClick={() => setCustomMode(true)}
                  className="border border-gray-300 px-4 py-3 hover:scale-102 cursor-pointer transition"
                >
                  Wybierz własną
                </button>
              </section>
            )}

          </div>

          <section className="w-full flex items-center justify-center mx-auto pt-20 gap-15">
            {/* Car Card 1 */}
            <section className="w-120 flex flex-col rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-black/30 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-full aspect-video relative">
                <Image
                  src="/car2.png"
                  alt="Car 1"
                  fill
                  className="object-cover rounded-t-3xl"
                />
              </div>
              <section className="w-full border border-black border-t-0 rounded-b-3xl flex flex-col">
                <div className="w-full flex items-center justify-center pt-5 px-5">
                  <span className="text-4xl font-bold">RedBull RB23</span>
                </div>
                <div className="w-full flex items-center justify-center  mb-3">
                  <span className="text-lg italic text-center">Manual</span>
                </div>
              </section>
            </section>

            {/* Car Card 2 */}
            <section className="w-120 flex flex-col rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-black/30 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-full aspect-video relative">
                <Image
                  src="/car1.png"
                  alt="Car 1"
                  fill
                  className="object-cover rounded-t-3xl"
                />
              </div>
              <section className="w-full border border-black border-t-0 rounded-b-3xl flex flex-col">
                <div className="w-full flex items-center justify-center pt-5 px-5">
                  <span className="text-4xl font-bold">Ferrari F25</span>
                </div>
                <div className="w-full flex items-center justify-center  mb-3">
                  <span className="text-lg italic text-center">Automat</span>
                </div>
              </section>
            </section>

            {/* Car Card 3 */}
            <section className="w-120 flex flex-col rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-black/30 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-full aspect-video relative">
                <Image
                  src="/car3.png"
                  alt="Car 1"
                  fill
                  className="object-cover rounded-t-3xl"
                />
              </div>
              <section className="w-full border border-black border-t-0 rounded-b-3xl flex flex-col">
                <div className="w-full flex items-center justify-center pt-5 px-5">
                  <span className="text-4xl font-bold">Kick Sauber</span>
                </div>
                <div className="w-full flex items-center justify-center mb-3">
                  <span className="text-lg italic text-center">Manual</span>
                </div>
              </section>
            </section>
          </section>

          <span className="text-center mt-10 text-gray-600">Ceny mogą się różnić w zależności od wybranego pakietu i liczby godzin jazd.</span>
          
          <section className="w-1/3 flex flex-col mt-30 shadow-md hover:scale-101 transition-all duration-300 cursor-pointer">
            <section className="w-full h-30 flex">
              <div className="flex-1 flex items-center justify-start m-5">
                <span className="text-5xl font-bold text-black">Cena: </span>
              </div>
              <div className="flex-1 flex justify-end items-center m-5">
                <span className="text-5xl font-bold text-black">{priceValue} zł</span>
              </div>
            </section>
          </section>
        </div>
      </section>

    )}

    {view === "login" && <LoginForm goHome={goHome} goToSignup={goToSignup} />}
    {view === "signup" && <SignupForm goHome={goHome} goToLogin={goToLogin} />}
    </>
  );
}
