"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import gsap from "gsap";

type PriceBlockProps = {
  title: string,
  price: number,
}

type CarBlockProps = {
  title: string,
  gearbox: string,
  color: string,
  isSelected?: boolean,
  onSelect?: () => void
}

function PriceBlock({ title, price } : PriceBlockProps) {
  return (
    <section className="w-full flex">
      <div className="flex-2 flex justify-start items-center">
        <span className="text-l text-txt-black font-extralight">{ title }</span>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <span className="text-l text-txt-black font-extralight">{ price } zł</span>
      </div>
    </section>
  );
}

function CarBlock({ title, gearbox, color, isSelected, onSelect } : CarBlockProps) {
  return (
    <section onClick={onSelect} className={`
      w-full aspect-3/1 rounded-2xl flex my-2 cursor-pointer
      md:w-2/5 md:aspect-auto
      2xl:w-4/5 2xl:aspect-auto
      ${isSelected ? "scale-102 border-2 border-txt-red" : "border border-brand-black"}
      `}>
      <section className="flex-1 h-full flex flex-col">
        <div className="flex-2 w-full flex items-center justify-start pl-5">
          <span className="text-2xl 2xl:text-5xl text-txt-black font-extrabold">{ title }</span>
        </div>
        <div className="flex-1 w-full flex pl-10 gap-5">
          <span className="text-sm 2xl:text-2xl text-txt-black font-light">{ gearbox }</span>
          <span className="text-sm 2xl:text-2xl text-txt-black font-light">{ color }</span>
        </div>
      </section>
      <div className="w-10 h-full flex items-center justify-center">
        <div className="w-full aspect-square">
          <span className=""></span>
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  const [isCalcPopupOpen, setIsCalcPopupOpen] = useState(false);
  const [selectedHours, setSelectedHours] = useState<number>(5);
  const [isCustomChoiceOpen, setIsCustomChoiceOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);

  const cars = [
    { id: 0, title: "Suzuki Swift", gearbox: "Manual", color: "Limonkowy", base_price: 110 },
    { id: 1, title: "Opel Mokka", gearbox: "Automatic", color: "Biały", base_price: 120 },
    { id: 2, title: "Suzuki Swift", gearbox: "Manual", color: "Pomarańczowy", base_price: 110 }
  ];

  const min = 1, max = 10;
  const percent = ((selectedHours - min) / (max - min)) * 100;

  const selectedCarData = cars.find(car => car.id === selectedCar);
  const carBasePrice = selectedCarData ? selectedCarData.base_price : 0;

  let priceValue = 0;
  if (selectedCarData) {
    if (selectedHours === 6 && selectedCarData.gearbox === "Automatic") priceValue = 660;
    else if (selectedHours === 6 && selectedCarData.gearbox === "Manual") priceValue = 630;
    else if (selectedHours === 10 && selectedCarData.gearbox === "Automatic") priceValue = 1000;
    else if (selectedHours === 10 && selectedCarData.gearbox === "Manual") priceValue = 960;
    else {
      priceValue = carBasePrice * selectedHours;
    }
  }

  useEffect(() => {
    if (isCalcPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCalcPopupOpen]);

  return (
    <section id="Pricing" className="w-full py-10 2xl:px-30 flex flex-col bg-brand-white 2xl:items-center">
      <section className="w-full 2xl:w-3/5 px-2 py-5 flex flex-col 2xl:flex-row gap-2">
        <div className="w-full flex items-center justify-start">
          <span className={clsx(
            "text-4xl text-txt-black font-extrabold tracking-wide",
            "md:text-5xl",
            "2xl:text-7xl"
          )}>Cennik</span>
        </div>
        <div className="w-full flex items-center justify-start ml-2 2xl:justify-end">
          <button onClick={() => setIsCalcPopupOpen(true)}  className="py-1.5 px-2 rounded-sm bg-brand-white border border-brand-black hover:scale-102 duration-300 cursor-pointer">
            <span className="text-sm 2xl:text-2xl text-txt-black font-bold">Kalkulator</span>
          </button>
        </div>
      </section>
      <section className="w-full 2xl:w-6/10 px-10 flex flex-col gap-3">
        {/* Title */}
        <div className="w-full flex items-center justify-center">
          <span className="text-3xl text-txt-black font-medium tracking-wide">Podstawowe</span>
        </div>

        {/* Main */}
        <section className="w-full flex flex-col">
          <PriceBlock title="Automat 1h" price={120}/>
          <PriceBlock title="Manual 1h" price={110}/>
        </section>

        {/* Title 2 */}
        <div className="w-full flex items-center justify-center">
          <span className="text-3xl text-txt-black font-medium tracking-wide">Zestawy</span>
        </div>

        {/* Main 2 */}
        <section className="w-full flex flex-col">
          <PriceBlock title="Automat 6h" price={660}/>
          <PriceBlock title="Automat 10h" price={1000}/>

          <div className="w-full h-5 flex items-center justify-center">
            <span className="text-xl text-txt-black font-medium tracking-widest">...</span>
          </div>

          <PriceBlock title="Manual 6h" price={630}/>
          <PriceBlock title="Manual 10h" price={960}/>
        </section>

        {/* Title */}
        <div className="w-full flex items-center justify-center">
          <span className="text-3xl text-txt-black font-medium tracking-wide">Programy Specjalne</span>
        </div>

        {/* Main */}
        <section className="w-full flex flex-col">
          <PriceBlock title="Kurs Kat. B Automat" price={4300}/>
          <PriceBlock title="Podstawienie samochodu" price={300}/>
        </section>

      </section>
      
      {isCalcPopupOpen && (
        <div className="fixed inset-0 w-full h-full bg-brand-black/60 flex items-center justify-center z-30">
          <section className={clsx(
            "relative w-full max-w-3xl max-h-[85vh] rounded-sm bg-brand-white flex flex-col items-center overflow-y-auto 2xl:overflow-hidden",
            "md:w-9/10"
          )}>
            {/* Escape button */}
            <div onClick={() => setIsCalcPopupOpen(false)} className="absolute top-4 right-4 text-2xl hover:text-txt-red cursor-pointer">
              X
            </div>

            {/* Title */}
            <div className="w-full h-20 flex items-center justify-center p-10">
              <span className="text-4xl text-txt-black font-extrabold tracking-wider">Kalkulator</span>
            </div>

            {/* Hour Choice */}
            <section className="w-full flex-1 flex flex-col">
              {/* Title */}
              <div className="w-full h-10 flex items-center justify-center">
                <span className="text-2xl text-txt-Black font-medium tracking-wide">Wybierz liczbe godzin</span>
              </div>
              {/* Main Content */}
              <section className="w-full flex-1">

                {!isCustomChoiceOpen && (
                  <>
                    <section className="w-full flex items-center justify-center my-5 gap-3">
                      {[2, 5, 10].map((n) => (
                        <button 
                          key={n}
                          className={`py-2 px-3 aspect-square flex items-center justify-center hover:scale-101 duration-300 cursor-pointer ${
                          selectedHours === n ? "bg-txt-red border-brand-white" : " bg-brand-white border border-txt-red "}`}
                          onClick={() => setSelectedHours(n)}
                        >
                          <span className={`text-l font-light ${selectedHours === n ? "text-txt-white" : "text-txt-black"}`}>{n}</span>
                        </button>
                      ))}
                    </section>
                    <div className="w-full flex items-center justify-center">
                      <button onClick={() => setIsCustomChoiceOpen(true)} className="py-1.5 px-2 rounded-sm bg-brand-white border border-brand-black hover:scale-102 duration-300 cursor-pointer">
                        <span className="text-sm text-txt-black font-bold">Wybierz Własną</span>
                      </button>
                    </div>
                  </>
                )}

                {isCustomChoiceOpen && (
                  <>
                    <section className="w-full flex items-center justify-center">
                      <div className="w-full flex justify-center mt-5">
                        <div className="relative w-80">
                          <div
                            className="absolute -top-10 left-[50%] transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-md"
                            style={{ left: `${percent}%` }}
                          >
                            {selectedHours}h
                          </div>
                          <input
                            type="range"
                            min={min}
                            max={max}
                            value={selectedHours}
                            onChange={(e) => setSelectedHours(Number(e.target.value))}
                            className="w-full accent-black cursor-pointer"
                          />
                        </div>
                      </div>
                    </section>
                    <div className="w-full flex items-center justify-center">
                      <button onClick={() => setIsCustomChoiceOpen(false)} className="py-1.5 px-2 rounded-sm bg-brand-white border border-brand-black hover:scale-102 duration-300 cursor-pointer">
                        <span className="text-sm text-txt-black font-bold">Wróć</span>
                      </button>
                    </div>
                  </>
                )}
              </section>
            </section>

            {/* CarChoice */}
            <section className="w-full flex-1 2xl:flex-3 flex items-center justify-center">
              <section className={clsx(
                "w-3/4 flex flex-col justify-center gap-2",
                "md:flex-row md:w-full md:px-5",
                "2xl:w-3/4 2xl:flex-col 2xl:px-20 2xl:items-center 2xl:gap-5"
              )}>
                {cars.map((car, index) => (
                  <CarBlock
                    key={car.id}
                    title={car.title}
                    gearbox={car.gearbox}
                    color={car.color}
                    isSelected={selectedCar === car.id}
                    onSelect={() => setSelectedCar(car.id)}
                  />
                ))}
              </section>
            </section>
            
            {/* Price Info */}
            <div className="text-center mt-6 mb-6 text-xs text-txt-black/80">
              Ceny mogą się różnić w zależności od wybranego pakietu i liczby godzin jazd.
            </div>

            {/* Final Price */}
            <div className={clsx(
              "w-full flex justify-center mb-6",
              "md:w-2/3"
            )}>
              <section className="w-full flex justify-between items-center p-5 shadow-md rounded-md">
                <span className="text-3xl font-bold text-txt-black">Cena:</span>
                <span className="text-3xl font-bold text-txt-black">{priceValue > 0 ? priceValue : "-"} zł</span>
              </section>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
