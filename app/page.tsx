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
                <Link href={"/#Contact"}>
                  <button className="text-(--TextBlack) font-semibold bg-(--WarmWhite) border border-(--Black) hover:cursor-pointer px-4 py-2 rounded-md mr-4 transition transform hover:scale-105">Kontakt</button>
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
            <button onClick={() => setIsOpen(true)} className="text-(--White) text-2xl font-semibold bg-(--Black) hover:cursor-pointer px-6 py-3 rounded-md transition transform hover:scale-107">Zobacz nasz cennik</button>
          </section> 

          {/* Contact Info */}
          <section id="Contact" className="w-full flex justify-center items-center mt-30">
            <section className="flex p-10 shadow-md transition-all duration-300 cursor-pointer rounded-3xl">
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

          {/* Stats Page */}
          <section className="w-full my-30 flex flex-col justify-center items-center gap-15">
            <div className="w-2/5 h-1 rounded-2xl bg-(--WarmBlack)"></div>
            <section className="h-full flex gap-20">
              <section className="w-70 h-70 flex flex-col items-center justify-center">
                <div className="w-20 aspect-square relative">
                  <Image 
                    src={"/processing.png"}
                    alt="Reading Icon"
                    fill
                  />
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <span className="text-7xl text-(--Black) font-extrabold">5+</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-l text-(--Black) font-Light">Lata na rynku</span>
                </div>
              </section>
              <section className="w-70 h-70 flex flex-col items-center justify-center">
                <div className="w-20 aspect-square relative">
                  <Image 
                    src={"/studentIcon.png"}
                    alt="Students Number"
                    fill
                  />
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <span className="text-7xl text-(--Black) font-extrabold">35</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-l text-(--Black) font-Light">Liczba przeszkolonych studentów</span>
                </div>
              </section>
              <section className="w-70 h-70 flex flex-col items-center justify-center">
                <div className="w-20 aspect-square relative">
                  <Image 
                    src={"/percent.png"}
                    alt="Percent Number"
                    fill
                  />
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <span className="text-7xl text-(--Black) font-extrabold">80</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-l text-(--Black) font-Light">Zdawalność</span>
                </div>
              </section>
            </section>
            <div className="w-2/5 h-1 rounded-2xl bg-(--WarmBlack)"></div>
          </section>

          {/* Jak to działa */}
          <section className="w-full my-20 flex flex-col items-center">
            <div className="flex justify-center items-center p-10 m-10">
              <span className="text-7xl text-(--Black) font-extrabold">Jak to działa?</span>
            </div>
            <section className="w-1/2 flex flex-col gap-10">
              {/* Block 1 */}
              <section className="p-5 h-80 flex justify-center">
                <div className="flex-1 aspect-square p-5 relative flex justify-center items-center">
                  <Image 
                    src="/FirstStep.png"
                    alt="First Step Icon"
                    fill
                    className="object-scale-down"
                  />
                </div>
                <section className="flex flex-1 flex-col justify-center">
                  <div className="flex-1 flex items-center justify-center p-5">
                    <span className="text-3xl text-(--Black) font-extrabold">Zapoznajesz się z naszą ofertą</span>
                  </div>
                  <div className="flex-2 flex justify-center items-start mt-10">
                    <span className="text-l font-light text-(--Black) px-10">
                      Przeglądasz dostępne usługi i wybierasz te, które najlepiej odpowiadają Twoim potrzebom, aby rozpocząć współpracę w najbardziej wygodny i przejrzysty sposób.
                    </span>
                  </div>
                </section>
              </section>
              {/* Block 2 */}
              <section className="p-5 h-80 flex justify-center">
                <section className="flex flex-1 flex-col justify-center">
                  <div className="flex-1 flex items-center justify-center p-5">
                    <span className="text-3xl text-(--Black) font-extrabold">Zakładasz Konto</span>
                  </div>
                  <div className="flex-2 flex justify-center items-start mt-10">
                    <span className="text-l font-light text-(--Black) px-10">
                      Tworzysz własny profil, który umożliwia Ci wygodne zarządzanie zleceniami, dostęp do wszystkich funkcji oraz szybki kontakt z naszym zespołem.
                    </span>
                  </div>
                </section>
                <div className="flex-1 aspect-square p-5 relative flex justify-center items-center">
                  <Image 
                    src="/SecondStep.png"
                    alt="Second Step Icon"
                    fill
                    className="object-scale-down"
                  />
                </div>
              </section>
              {/* Block 3 */}
              <section className="p-5 h-80 flex justify-center">
                <div className="flex-1 aspect-square p-5 relative flex justify-center items-center">
                  <Image 
                    src="/ThirdStep.png"
                    alt="Thrid Step Icon"
                    fill
                    className="object-scale-down"
                  />
                </div>
                <section className="flex flex-1 flex-col justify-center">
                  <div className="flex-1 flex items-center justify-center p-5">
                    <span className="text-3xl text-(--Black) font-extrabold">Cieszysz się niezawodnością i profesjonalnym podejściem</span>
                  </div>
                  <div className="flex-2 flex justify-center items-start mt-10">
                    <span className="text-l font-light text-(--Black) px-10">
                      Od tego momentu możesz liczyć na pełne wsparcie, terminową realizację oraz jakość, która pozwala skupić się na tym, co naprawdę ważne — a resztą zajmujemy się my.
                    </span>
                  </div>
                </section>
              </section>
            </section>
          </section>

          {/* Specjalna zniżka */}
          <section className="w-full my-20 flex flex-col items-center justify-center gap-5 bg-(--GrayWhite) py-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),_0_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <span className="text-4xl text-(--Black) font-bold">Oferta Limitowana: 
              <span className="text-red-600 font-extrabold"> 15% Zniżki </span>
              dla nowych użytkowników
            </span>
            <span className="text-l text-(--Black) font-semibold ">Oferta obowowiązuje tylko w dniach 10.10.2024 - 31.12.2025</span> 
            <button className="text-amber-50 font-semibold bg-black px-4 py-2 rounded-md transition hover:scale-102 cursor-pointer">Odbierz ofertę</button>
          </section>

          {/* Oceny użytkowników */}
          <section className="w-full my-20 flex flex-col items-center">
            <div className="py-20 flex justify-center items-center">
              <span className="text-6xl md:text-7xl text-(--Black) font-extrabold text-center">
                Jak oceniają nas inni?
              </span>
            </div>

            <section className="w-4/5 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Card 1 */}
              <div className="p-8 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col gap-4">
                <p className="text-(--Black) text-lg font-light leading-relaxed">
                  “Świetna szkoła jazd doszkalających — instruktorzy cierpliwi, wszystko tłumaczą jasno i spokojnie. Dzięki nim w końcu poczułem się pewnie za kierownicą. Polecam każdemu, kto chce naprawdę poprawić swoje umiejętności.”
                </p>
                <span className="text-xl text-(--Black)">— Jan K.</span>
                <span className="text-2xl text-yellow-500">★★★★★</span>
              </div>
              {/* Card 1 */}
              <div className="p-8 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col gap-4">
                <p className="text-(--Black) text-lg font-light leading-relaxed">
                  “Bardzo profesjonalne podejście. Instruktor dostosował zajęcia do moich potrzeb, przez co szybko wyeliminowałem błędy. Zdecydowanie warto!”
                </p>
                <span className="text-xl text-(--Black)">— Marta W.</span>
                <span className="text-2xl text-yellow-500">★★★★★</span>
              </div>
              {/* Card 1 */}
              <div className="p-8 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col gap-4">
                <p className="text-(--Black) text-lg font-light leading-relaxed">
                  “Bardzo dobre warunki, przyjazna atmosfera i świetne tempo pracy. Dzięki dodatkowym jazdom czuję się znacznie pewniej na ulicy.”
                </p>
                <span className="text-xl text-(--Black)">— Tomasz R.</span>
                <span className="text-2xl text-yellow-500">★★★★★</span>
              </div>
              {/* Card 1 */}
              <div className="p-8 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col gap-4">
                <p className="text-(--Black) text-lg font-light leading-relaxed">
                  “Instruktorzy naprawdę wiedzą, jak przygotować do jazdy w realnych warunkach. Ogromna cierpliwość i świetne podejście.”
                </p>
                <span className="text-xl text-(--Black)">— Karolina Z.</span>
                <span className="text-2xl text-yellow-500">★★★★★</span>
              </div>
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
