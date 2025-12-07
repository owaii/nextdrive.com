"use client"

import { useState } from "react";
import CarHero from "@/components/MainPage/Car";

type PriceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  customMode: boolean;
  setCustomMode: (val: boolean) => void;
};

const carPrices = [1500, 1200, 1000];

export default function PriceModal({ isOpen, onClose, customMode, setCustomMode }: PriceModalProps) {
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [selectedHours, setSelectedHours] = useState<number>(5);
  const min = 0, max = 10;
  const percent = ((selectedHours - min) / (max - min)) * 100;

  if (!isOpen) return null;

  const priceValue = selectedCar !== null 
    ? carPrices[selectedCar] * selectedHours 
    : 0;

  return (
    <section className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white w-4/5 h-9/10 rounded-2xl p-10 shadow-2xl relative flex flex-col items-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-4xl font-bold hover:text-red-600 hover:cursor-pointer">X</button>

        <div className="w-full p-10 flex justify-center items-center">
          <span className="text-7xl font-extrabold text-black">Cennik</span>
        </div>

        <div className="w-full mt-5 flex justify-center items-center flex-col gap-5">
          <span className="text-2xl font-medium text-black text-center leading-tight">
            Wybierz ile godzin jazd chcesz wykupić
          </span>

          {customMode ? (
            <section className="flex flex-col gap-5 items-center">
              <div className="w-full flex flex-col items-center mt-10">
                <section className="relative w-80">
                  <div
                    className="absolute -top-10 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-md"
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
                </section>
              </div>
              <button
                onClick={() => setCustomMode(false)}
                className="border border-gray-300 px-4 py-3 hover:scale-102 cursor-pointer transition"
              >
                Wróć
              </button>
            </section>
          ) : (
            <section className="flex gap-3 flex-col items-center">
              <section className="flex gap-5">
                {[2,5,10].map(n => (
                  <button 
                    key={n} 
                    className={`border border-gray-300 px-4 py-3 hover:scale-102 cursor-pointer transition ${selectedHours === n ? "bg-black text-white" : ""}`}
                    onClick={() => setSelectedHours(n)}
                  >
                    {n}
                  </button>
                ))}
              </section>
              <span className="text-sm">albo</span>
              <button onClick={() => setCustomMode(true)} className="border border-gray-300 px-4 py-3 hover:scale-102 cursor-pointer transition">
                Wybierz własną
              </button>
            </section>
          )}
        </div>

        <CarHero 
          with_buttons={false} 
          selectable={true} 
          selected={selectedCar} 
          onSelectCar={(id: number) => setSelectedCar(id)} 
        />

        <span className="text-center mt-10 text-gray-600">Ceny mogą się różnić w zależności od wybranego pakietu i liczby godzin jazd.</span>
        
        <section className="w-1/3 flex flex-col mt-30 shadow-md hover:scale-101 transition-all duration-300 cursor-pointer">
          <section className="w-full h-30 flex">
            <div className="flex-1 flex items-center justify-start m-5">
              <span className="text-5xl font-bold text-black">Cena: </span>
            </div>
            <div className="flex-1 flex justify-end items-center m-5">
              <span className="text-5xl font-bold text-black">{priceValue > 0 ? priceValue : "-"} zł</span>
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}
