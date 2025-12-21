import Image from "next/image";
import clsx from "clsx";

export default function AboutMe() {
  return (
    <section
      id="AboutMe"
      className="relative w-full h-screen bg-transparent flex items-center justify-center"
    >
      {/* Parallax background */}
      <div className="absolute top-0 left-0 w-full h-screen bg-[url('images/ParalaxBackground1.png')] bg-cover bg-center">
        <div className="absolute top-0 left-0 w-full h-full bg-black/60" />
      </div>

      {/* Foreground content */}
      <section
        className={clsx(
          "relative z-10 w-9/10 h-auto bg-brand-white rounded-2xl flex flex-col",
          "2xl:w-4/10 2xl:h-6/10"
        )}
      >
        <div className="w-full flex items-center justify-center">
          <div className="w-full p-3 sm:p-5 flex justify-center items-center bg-txt-red rounded-t-2xl">
            <span className="text-5xl text-txt-white font-extrabold tracking-wider">
              O Mnie
            </span>
          </div>
        </div>
        <div
          className={clsx(
            "text-sm px-5 text-txt-black flex-1 font-light tracking-normal mx-2 my-5 justified",
            "2xl:text-2xl"
          )}
        >
          <p>
            Jestem instruktorem jazdy z pasją, który stawia na indywidualne
            podejście do każdego kursanta. Zależy mi, aby nauka była skuteczna,
            a przy tym przyjemna i bezstresowa.
          </p>
          <br />
          <p>
            Podczas lekcji skupiam się na praktyce w realnych warunkach
            drogowych, ucząc zarówno podstawowych manewrów, jak i technik
            potrzebnych w trudnych sytuacjach. Dbam o detale, które zwiększają
            bezpieczeństwo i komfort jazdy.
          </p>
          <br />
          <p>
            Stawiam też na budowanie pewności siebie kursantów. Wiem, że stres
            może przeszkadzać, dlatego staram się tworzyć spokojną i wspierającą
            atmosferę, w której każdy może się rozwijać w swoim tempie.
          </p>
        </div>
      </section>
    </section>
  );
}
