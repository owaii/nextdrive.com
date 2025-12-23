import clsx from "clsx";
import Image from "next/image";
import gsap from "gsap";

type InfoBlockProps = {
  title: string;
  image_src: string;
};

function InfoBlock({ title, image_src }: InfoBlockProps) {
  return (
    <section className="flex-1 flex flex-col gap-3">
      {/* Image Section */}
      <div className="w-full flex items-center justify-start sm:justify-center">
        <div className="w-13 2xl:w-20 aspect-square relative">
          <Image
            src={`/images/${image_src}`}
            alt={title}
            fill
            className="object-contain rounded-sm"
          />
        </div>
      </div>
      {/* Text Section */}
      <div className="w-full flex justify-start">
        <span className="text-l 2xl:text-2xl text-txt-white font-medium sm:text-center">
          {title}
        </span>
      </div>
    </section>
  );
}

export default function InfoPage() {
  return (
    <section className="relative w-full h-screen bg-transparent flex items-center justify-center">
      {/* Parallax background */}
      <div className="absolute top-0 left-0 w-full h-screen bg-[url('/images/ParalaxBackground3.png')] bg-cover bg-center">
        <div className="absolute top-0 left-0 w-full h-full bg-black/60" />
      </div>

      {/* Foreground content */}
      <section
        className={clsx(
          "relative z-10 w-full flex flex-col px-10",
          "2xl:w-7/10 2xl:h-1/2"
        )}
      >
        <div className="w-full flex justify-start 2xl:justify-center">
          <span className="text-4xl 2xl:text-7xl text-txt-white font-bold">
            Jazdy doszkalające mają na celu
          </span>
        </div>

        <section className="w-full flex flex-col gap-8 mt-10 sm:flex-row sm:gap-2 2xl:gap-10 2xl:mt-30">
          <InfoBlock
            title="naukę obsługi i „wyczucia” pojazdu egzaminacyjnego"
            image_src="InfoIcon1.png"
          />
          <InfoBlock
            title="sprawdzenie i doskonalenie umiejętności prowadzenia samochodu"
            image_src="InfoIcon2.png"
          />
          <InfoBlock
            title="przygotowanie do egzaminu w realnych warunkach egzaminacyjnych"
            image_src="InfoIcon3.png"
          />
        </section>
      </section>
    </section>
  );
}
