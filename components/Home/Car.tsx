import Image from "next/image";
import { useState } from "react";

const carList = [
  { title: "Suzuki Swift", gearbox: "manual", img: "car11.png" },
  { title: "Opel Mokka", gearbox: "automat", img: "car12.png" },
  { title: "Suzuki Swift", gearbox: "manual", img: "car13.png" }
];

type CarCardProps = {
  car_id: number;
  with_buttons?: boolean;
  selectable?: boolean;    
  selected?: boolean;       
  onSelect?: (id: number) => void; 
  smoothScroll: (selector: string) => void;  
};

function CarCard({ car_id, with_buttons, selectable, selected, onSelect, smoothScroll }: CarCardProps) {
  const car = carList[car_id];

  return (
    <section
      id="CarChoice"
      onClick={() => selectable && onSelect?.(car_id)}
      className={`
        w-80 2xl:w-120 flex flex-col rounded-3xl overflow-hidden shadow-md 
        transition-all duration-300 cursor-pointer
        hover:shadow-xl hover:shadow-black/30 hover:scale-102
        ${selectable && selected ? "ring-4 ring-blue-500" : ""}
      `}
    >
      <div className="w-full aspect-4/3 relative">
        <Image src={`/${car.img}`} alt={car.title} fill className="object-cover rounded-t-3xl" />
      </div>

      <section className="w-full border border-black border-t-0 rounded-b-3xl flex flex-col">
        <div className="w-full flex items-center justify-center pt-5 px-5">
          <span className="text-3xl 2xl:text-4xl font-bold">{car.title}</span>
        </div>
        <div className="w-full flex items-center justify-center">
          <span className="2xl:text-lg italic text-center">{car.gearbox}</span>
        </div>

        {with_buttons && (
          <section className="w-full p-5 flex justify-center items-center gap-5">
            <button onClick={() => {smoothScroll("#Contact")}} className="
              text-(--White) font-semibold
              text-sm 2xl:text-l 
              bg-(--Black) px-4 py-2 rounded-md 
              transition hover:scale-102 cursor-pointer
            "> Umów Jazdy
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
  smoothScroll: (selector: string) => void;    
};

export default function CarHero({ with_buttons, selectable, selected, onSelectCar, smoothScroll }: CarHeroProps) {
  const [internalSelected, setInternalSelected] = useState<number | null>(null);
  const activeSelected = selected !== undefined ? selected : internalSelected;
  const handleSelect = onSelectCar ? onSelectCar : (id: number) => setInternalSelected(prev => (prev === id ? null : id));

  return (
    <section className="Main w-full flex items-center justify-center mx-auto xl:pt-10 2xl:pt-15 gap-15 bg-(--WarmWhite) flex-wrap">
      {carList.map((car, i) => (
        <CarCard
          key={i}
          car_id={i}
          with_buttons={with_buttons}
          selectable={selectable}
          selected={activeSelected === i}
          onSelect={handleSelect}
          smoothScroll={smoothScroll}
        />
      ))}
    </section>
  );
}

