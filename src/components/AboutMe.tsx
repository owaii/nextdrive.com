import Image from "next/image";
import clsx from "clsx";

export default function AboutMe() {
  return (
    <section id="AboutMe" className="relative w-full h-screen bg-transparent flex items-center justify-center">
      {/* Parallax background */}
      <div className="absolute top-0 left-0 w-full h-screen bg-[url('/images/ParalaxBackground1.png')] bg-cover bg-center">
        <div className="absolute top-0 left-0 w-full h-full bg-black/60" />
      </div>

      {/* Foreground content */}
      <section className={clsx(
        "relative z-10 w-9/10 h-7/10 bg-brand-white rounded-2xl p-8 flex flex-col",
        "md:h-9/10 md:flex-row-reverse",
        "2xl:w-7/10 2xl:h-6/10"
      )}>
        <div className="w-full flex items-center justify-center">
          <div className={clsx(
            "relative w-1/2 aspect-square",
            "md:w-full",
            "2xl:w-7/10"
          )}>
            <Image 
              src="/images/TeachersPhoto.png"
              alt="Teacher's photo"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className={clsx(
          "text-sm text-txt-black font-light tracking-normal mx-2 my-5",
          "2xl:text-xl"
        )}>
          <p>Jestem instruktorem jazdy z pasją, który stawia na indywidualne podejście do każdego kursanta. Zależy mi, aby nauka była skuteczna, a przy tym przyjemna i bezstresowa.</p>
          <br />
          <p>Podczas lekcji skupiam się na praktyce w realnych warunkach drogowych, ucząc zarówno podstawowych manewrów, jak i technik potrzebnych w trudnych sytuacjach. Dbam o detale, które zwiększają bezpieczeństwo i komfort jazdy.</p>
          <br />
          <p>Stawiam też na budowanie pewności siebie kursantów. Wiem, że stres może przeszkadzać, dlatego staram się tworzyć spokojną i wspierającą atmosferę, w której każdy może się rozwijać w swoim tempie.</p>
        </div>
      </section>
    </section>
  );
}
