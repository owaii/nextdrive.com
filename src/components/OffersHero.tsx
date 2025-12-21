import clsx from "clsx";
import { useState } from "react";

type TickTextProps = {
  text: string,
} 

function TickText({ text } : TickTextProps) {
  return (
    <span className="text-sm text-txt-black font-light">✔️ { text }</span>
  );
}

export default function offersHero() {
  return (
    <section className="w-full flex flex-col bg-brand-white py-5 gap-10 2xl:items-center">
        {/* Title 3 */}
        <div className="w-full flex items-center justify-center py-5">
          <span className="text-4xl text-txt-black font-bold tracking-wide">Programy Specjalne</span>
        </div>

        <div className="w-full 2xl:w-1/2 flex flex-col gap-5 sm:flex-row items-start">
          {/* Offers Hero */}
          <div className="relative w-full sm:flex-1 flex justify-center">
            {/* Main Special offer Block */}
            <section className={clsx(
                "w-9/10 flex flex-col items-center shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] hover:scale-102 duration-300 cursor-ponter",
                "border rounded-2xl"
              )}>
                {/* Title */}
                <div className="w-full py-4 px-2 flex items-center justify-center bg-txt-red rounded-t-2xl">
                  <span className="text-3xl text-txt-white font-bold text-center tracking-wide">Podstawienie samochodu na egzamin praktyczny</span>
                </div>

                {/* Main */}
                <section className="w-full flex flex-col">
                  <section className="w-full flex justify-center pb-3 px-1">
                    <span className="text-xl text-txt-black font-medium text-center">Usługa obejmuje podstawienie samochodu z automatyczną skrzynią biegów na egzamin państwowy w WORD.</span>
                  </section>

                  <div className="w-full flex items-center justify-center">
                    <span className="text-xl text-txt-black font-medium tracking-widest flex items-center">...</span>
                  </div>
                  
                  <section className="w-full flex flex-col items-center gap-2 pb-3">
                    <span className="text-xl text-txt-black font-bold text-center">Oferta dostępna dla osób które:</span>
                    <div className="w-9/10 flex items-center 2xl:justify-center flex-wrap">
                      <span className="text-sm text-txt-black font-light">✔️ Wykupiły przynajmniej 4 godziny jazd doszkalających</span>
                    </div>
                  </section>

                  <div className="w-full flex items-center justify-center">
                    <span className="text-xl text-txt-black font-medium tracking-widest flex items-center">...</span>
                  </div>

                  <section className="w-full flex justify-center pb-1">
                    <span className="text-xl text-txt-black font-medium text-center">Dlaczego trzeba wykupić 4 godziny?</span>
                  </section>

                  <section className="w-full flex justify-center pb-3 px-3">
                    <span className="text-l text-txt-black font-light text-center">Ponieważ trzeba zapoznać się z pojazdem, a także poznać osobę, której podstawiam samochód</span>
                  </section>       

                  {/* Price */}
                  <section className="w-full flex px-2 py-4 border-t">
                    <div className="flex-1 h-full flex items-center justify-start">
                      <span className="text-3xl text-txt-black font-bold">Cena: </span>
                    </div>
                    <div className="flex-1 h-full flex items-center justify-end">
                      <span className="text-3xl text-txt-black font-extrabold">300 zł</span>
                    </div>
                  </section>
                </section>
              </section>
          </div>

          <div className="relative w-full sm:flex-1 flex justify-center">
            {/* Main Special offer Block */}
            <section className={clsx(
                "w-9/10 flex flex-col items-center shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] hover:scale-102 duration-300 cursor-ponter",
                "border rounded-2xl"
              )}>
                {/* Title */}
                <div className="w-full py-4 flex items-center justify-center bg-txt-red rounded-t-2xl">
                  <span className="text-3xl text-txt-white font-bold text-center tracking-wide">KURS PRAWO JAZDY <br /> KAT. B – AUTOMAT</span>
                </div>

                {/* Main */}
                <section className="w-full flex flex-col">
                  <section className="w-full flex flex-col items-center gap-2 pb-3">
                    <span className="text-xl text-txt-black font-medium text-center">Kurs realizowany w ośrodku którym również prowadzę szkolenia</span>
                    
                    <div className="w-full flex items-center justify-center">
                      <span className="text-xl text-txt-black font-medium tracking-widest flex items-center">...</span>
                    </div>
                    
                    <span className="text-xl text-txt-black font-bold text-center">W cenę kursu wliczono:</span>
                    <div className="w-9/10 flex flex-col justify-center flex-nowrap">
                      <TickText text="zajęcia teoretyczne" />
                      <TickText text="30 godzin zegarowych jazd praktycznych po obszarze egzaminowania" />
                      <TickText text="przygotowanie z zakresu pierwszej pomocy przedmedycznej" />
                      <TickText text="podręcznik Kierowcy" />
                      <TickText text="dostęp online do bazy pytań egzaminacyjnych" />
                      <TickText text="egzamin wewnętrzny teoretyczny" />
                      <TickText text="egzamin wewnętrzny praktyczny" />
                    </div>
                  </section>

                  <div className="w-full flex items-center justify-center">
                    <span className="text-xl text-txt-black font-medium tracking-widest flex items-center">🚘</span>
                  </div>
                  
                  <div className="w-full flex justify-center px-2">
                    <span className="text-l text-txt-black font-medium text-center">Szkolenie prowadzone nowoczesnym samochodem Opel Mokka 2025 z automatyczną skrzynią biegów.</span>
                  </div>

                  {/* Price */}
                  <section className="w-full flex px-2 py-4 border-t">
                    <div className="flex-1 h-full flex items-center justify-start">
                      <span className="text-3xl text-txt-black font-bold">Cena: </span>
                    </div>
                    <div className="flex-1 h-full flex items-center justify-end">
                      <span className="text-3xl text-txt-black font-extrabold">4 300 zł</span>
                    </div>
                  </section>
                </section>
              </section>
          </div>

        </div>
    </section>
  );
}