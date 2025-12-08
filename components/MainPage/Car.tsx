import Image from "next/image";
import { useState } from "react";

const carList = [
  { title: "RedBull RB23", gearbox: "manual", img: "car2.png" },
  { title: "Ferrari F25", gearbox: "automat", img: "car1.png" },
  { title: "Kick Sauber", gearbox: "manual", img: "car3.png" }
];

type CarCardProps = {
  car_id: number;
  with_buttons?: boolean;
  selectable?: boolean;    
  selected?: boolean;       
  onSelect?: (id: number) => void; 
};

function CarCard({ car_id, with_buttons, selectable, selected, onSelect }: CarCardProps) {
  const car = carList[car_id];

  return (
    <section
      onClick={() => selectable && onSelect?.(car_id)}
      className={`
        w-120 flex flex-col rounded-3xl overflow-hidden shadow-md 
        transition-all duration-300 cursor-pointer
        hover:shadow-xl hover:shadow-black/30 hover:scale-102
        ${selectable && selected ? "ring-4 ring-blue-500 scale-105" : ""}
      `}
    >
      <div className="w-full aspect-video relative">
        <Image src={`/${car.img}`} alt={car.title} fill className="object-cover rounded-t-3xl" />
      </div>

      <section className="w-full border border-black border-t-0 rounded-b-3xl flex flex-col">
        <div className="w-full flex items-center justify-center pt-5 px-5">
          <span className="text-4xl font-bold">{car.title}</span>
        </div>
        <div className="w-full flex items-center justify-center">
          <span className="text-lg italic text-center">{car.gearbox}</span>
        </div>

        {with_buttons && (
          <section className="w-full p-5 flex justify-center items-center gap-5">
            <button className="text-amber-50 font-semibold bg-black px-4 py-2 rounded-md transition hover:scale-102">
              Info
            </button>
            <button className="text-amber-50 font-semibold bg-black px-4 py-2 rounded-md transition hover:scale-102">
              Umów Jazdy
            </button>
          </section>
        )}

        {!with_buttons && (
          <div className="h-3"></div>
        )}
      </section>
    </section>
  );
}

type CarHeroProps = {
  with_buttons?: boolean;
  selectable?: boolean;
  selected?: number | null;              
  onSelectCar?: (id: number) => void;     
};

export default function CarHero({ with_buttons, selectable, selected, onSelectCar }: CarHeroProps) {
  const [internalSelected, setInternalSelected] = useState<number | null>(null);
  const activeSelected = selected !== undefined ? selected : internalSelected;
  const handleSelect = onSelectCar ? onSelectCar : (id: number) => setInternalSelected(prev => (prev === id ? null : id));

  return (
    <section className="w-full flex items-center justify-center mx-auto pt-20 gap-15">
      {carList.map((car, i) => (
        <CarCard
          key={i}
          car_id={i}
          with_buttons={with_buttons}
          selectable={selectable}
          selected={activeSelected === i}
          onSelect={handleSelect}
        />
      ))}
    </section>
  );
}

