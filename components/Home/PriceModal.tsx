"use client"

import { useState, useEffect } from "react";
import CarHero from "@/components/Home/Car";

type PriceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  customMode: boolean;
  setCustomMode: (val: boolean) => void;
  smoothScroll: (selector: string) => void; 
};

const carPrices = [110, 120, 110];

export default function PriceModal({ isOpen, onClose, customMode, setCustomMode, smoothScroll }: PriceModalProps) {
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [selectedHours, setSelectedHours] = useState<number>(5);
  const min = 1, max = 10;
  const percent = ((selectedHours - min) / (max - min)) * 100;

  // Prevent page scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  let priceValue = 0;
  if (selectedCar !== null) {
    if (selectedHours === 6 || selectedHours === 10) {
      priceValue = carPrices[selectedCar] * selectedHours * 0.75;
    } else {
      priceValue = carPrices[selectedCar] * selectedHours;
    }
  }

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="bg-(--WarmWhite) w-full 2xl:w-4/5 max-h-[90vh] 2xl:max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-y-auto relative p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-4xl font-bold hover:text-red-600 cursor-pointer"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="w-full text-center mb-8">
          <h2 className="text-5xl font-extrabold text-black">Cennik</h2>
        </div>

        {/* Hours Selection */}
        <div className="flex flex-col items-center gap-6 mb-8 text-center">
          <span className="text-2xl font-medium text-black leading-tight">
            Wybierz ile godzin jazd chcesz wykupić
          </span>

          {customMode ? (
            <div className="flex flex-col items-center gap-5 w-full">
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
              <button
                onClick={() => setCustomMode(false)}
                className="border border-gray-300 px-4 py-2 rounded-md hover:scale-105 transition"
              >
                Wróć
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-4">
                {[2, 5, 10].map((n) => (
                  <button
                    key={n}
                    className={`px-4 py-2 border rounded-md hover:scale-105 transition ${
                      selectedHours === n ? "bg-black text-white" : ""
                    }`}
                    onClick={() => setSelectedHours(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <span className="text-sm">albo</span>
              <button
                onClick={() => setCustomMode(true)}
                className="px-4 py-2 border rounded-md hover:scale-105 transition"
              >
                Wybierz własną
              </button>
            </div>
          )}
        </div>

        {/* Car Selection */}
        <div className="mb-6 w-full">
          <CarHero
            with_buttons={false}
            selectable={true}
            selected={selectedCar}
            onSelectCar={(id: number) => setSelectedCar(id)}
            smoothScroll={smoothScroll}
          />
        </div>

        {/* Price Info */}
        <div className="text-center mt-6 mb-6 text-gray-600">
          Ceny mogą się różnić w zależności od wybranego pakietu i liczby godzin jazd.
        </div>

        {/* Price Summary */}
        <div className="w-full flex justify-center mb-6">
          <div className="w-full 2xl:w-1/3 flex justify-between items-center p-5 shadow-md rounded-md hover:scale-105 transition">
            <span className="text-5xl 2xl:text-5xl font-bold text-black">Cena:</span>
            <span className="text-5xl 2xl:text-5xl font-bold text-black">{priceValue > 0 ? priceValue : "-"} zł</span>
          </div>
        </div>
      </div>
    </section>
  );
}
