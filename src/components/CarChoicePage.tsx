import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type ShowCarProps = {
  title: string;
  gearbox: string;
  image_src: string;
};

function ShowCar({ title, gearbox, image_src }: ShowCarProps) {
  return (
    <section className="w-full flex-col">
      <div className="w-full aspect-4/3 relative">
        <Image
          src={`images/${image_src}`}
          alt={`${title} photo`}
          fill
          className="object-cover"
        />
      </div>
      <section className="w-full flex flex-col gap-1 mt-2">
        <div className="w-full flex items-center justify-start">
          <span className="text-l text-txt-black font-bold tracking-wide">
            {title}
          </span>
        </div>
        <div className="w-full flex items-center justify-start">
          <span className="text-xs text-txt-black font-extralight tracking-wide">
            {gearbox}
          </span>
        </div>
      </section>
    </section>
  );
}

export default function CarChoicePage() {
  const cars = [
    { id: 1, title: "Suzuki Swift", gearbox: "Manual", image_src: "Car2.png" },
    { id: 0, title: "Opel Mokka", gearbox: "Automat", image_src: "Car1.png" },
    { id: 2, title: "Suzuki Swift", gearbox: "Manual", image_src: "Car3.png" },
  ];

  return (
    <section className="w-full py-10 flex flex-col bg-brand-white">
      <section className="w-full px-2 2xl:px-20 py-5 flex flex-col gap-2 2xl:flex-row">
        <div className="w-full flex items-center justify-start">
          <span
            className={clsx(
              "text-3xl text-txt-black font-bold tracking-wide",
              "sm:text-4xl",
              "2xl:text-6xl"
            )}
          >
            {" "}
            Nasze Samochody{" "}
          </span>
        </div>
        <div className="w-full flex items-center justify-start ml-2 2xl:justify-end">
          <Link href="#Pricing">
            <span
              className={clsx(
                "text-xl text-txt-black font-light tracking-wide",
                "relative inline-block",
                "after:content-['']",
                "after:absolute after:left-0 after:bottom-0",
                "after:h-0.5 after:w-full",
                "after:bg-current",
                "after:scale-x-0 after:origin-left",
                "after:transition-transform after:duration-300",
                "hover:after:scale-x-100",
                "sm:text-2xl",
                "2xl:text-3xl"
              )}
            >
              Zobacz Cennik {">"}
            </span>
          </Link>
        </div>
      </section>
      <section
        className={clsx(
          "w-full px-10 flex flex-col gap-5",
          "sm:px-40",
          "2xl:flex-row"
        )}
      >
        {cars.map((car) => (
          <ShowCar
            key={car.id}
            title={car.title}
            gearbox={car.gearbox}
            image_src={car.image_src}
          />
        ))}
      </section>
    </section>
  );
}
