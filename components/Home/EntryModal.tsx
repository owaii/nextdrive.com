"use client";

import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FileProps = {
  title: string,
  amount: string,
  price: number,
  regular_price: number,
}

function Block({ title, amount, price, regular_price } : FileProps) {
  const tag_reduce = Math.floor(100 - ((price / regular_price) * 100));

  return (
    <section className="w-35 h-45 xl:w-70 xl:h-70 flex flex-col bg-(--Black)/95 hover:scale-102 cursor-pointer duration-500">
      {/* Main Part */}
      <section className="w-full flex-1 flex flex-col">
        {/* Title */}
        <div className="w-full h-4 xl:h-5 flex items-center justify-center">
          <span className="text-xs xl:text-sm text-(--White) font-extralight">{ title }</span>
        </div>
        {/* Main */}
        <section className="w-full flex-1 flex flex-col items-center justify-center xl:gap-5">
          <div className="w-full h-5 flex items-center justify-center">
            <span className="text-sm xl:text-xl text-(--White) font-Bold">{ amount }</span>
          </div>
          <div className="w-full h-5 flex items-center justify-center">
            <span className="text-l xl:text-4xl text-(--White) font-extrabold">{ price } PLN</span>
          </div>
          <div className="w-full h-5 flex items-center justify-center">
            <span className="text-sm xl:text-xl text-(--White) font-bold"> <span className="text-red-500">{ tag_reduce }%</span> Zniżki</span>
          </div>
        </section>
        {/* Footer */}
        <div className="w-full h-10 flex items-center justify-center text-center">
          <span className="text-xs xl:text-sm text-(--White) font-extralight">Cena Regularna: { regular_price } PLN</span>
        </div>
      </section>
      {/* Button Part */}
      <div className="w-full h-10">
        <button className="w-full h-full text-sm xl:text-xl flex items-center justify-center bg-gray-500 text-(--White) cursor-pointer ">
          Zamów Jazdy
        </button>
      </div>
    </section>
  );
}

export default function EntryInfoModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;
  const [isManualSelected, setIsManualSelected] = useState(false);

  return (
    <section className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 overflow-hidden">
      <section className="bg-(--WarmWhite) w-full xl:w-3/5 xl:aspect-video aspect-16/15 rounded-2xl shadow-2xl relative flex flex-col items-center justify-center bg-[url('/Entrybg.png')] bg-cover bg-no-repeat bg-center overflow-y-auto">
        <div className="text-2xl xl:text-3xl hover:text-red-500 absolute top-3 right-0 z-60">
          <button
            onClick={onClose}
            className="mr-3 xl:mr-5 cursor-pointer"
          >
            ✕
          </button>
        </div>
        <section className="w-full h-2/3 flex flex-col">
          <section className="w-full h-20 flex items-center justify-center gap-10">
            <button onClick={() => setIsManualSelected(true)} className=
            {`bg-(--White) text-(--Black) text-sm xl:text-xl font-bold py-1 px-3 xl:py-2 xl:px-5 hover:scale-101 cursor-pointer 
            ${isManualSelected && "border-[var(--White)] border-3 bg-[var(--Black)]/78 text-(--White)"}`}
            >Manual</button>
            <button onClick={() => setIsManualSelected(false)} className=
            {`bg-(--White) text-(--Black) text-sm xl:text-xl font-bold py-1 px-3 xl:py-2 xl:px-5 hover:scale-101 cursor-pointer 
            ${!isManualSelected && "border-[var(--White)] border-3 bg-[var(--Black)]/78 text-(--White)"}`}
            >Automatic</button>
          </section>
          <section className="w-full h-full relative">
            <section className="w-full h-full flex items-center justify-center gap-2 xl:gap-10 absolute top-0 left-0 z-20">
              {isManualSelected && (
                <>
                  <Block
                    title="Manual"
                    amount="Za godzinę"
                    price={110}
                    regular_price={150}
                  />

                  <Block
                    title="Manual"
                    amount="6 godzin"
                    price={630}
                    regular_price={900}
                  />

                  <Block
                    title="Manual"
                    amount="10 godzin"
                    price={900}
                    regular_price={1500}
                  />
                </>
              )}

              {!isManualSelected && (
                <>
                  <Block
                    title="Automat"
                    amount="Za godzinę"
                    price={120}
                    regular_price={160}
                  />

                  <Block
                    title="Automat"
                    amount="6 godzin"
                    price={660}
                    regular_price={960}
                  />

                  <Block
                    title="Automat"
                    amount="10 godzin"
                    price={1000}
                    regular_price={1600}
                  />
                </>
              )}
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
