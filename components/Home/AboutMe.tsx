import Image from "next/image";

export default function AboutMePage() {
  return (
   <section className="w-full h-200 my-20 flex items-center justify-center flex-col">
    <section className="w-full xl:w-3/5 2xl:w-1/2 h-8/10 xl:h-1/2 2xl:h-140 rounded-4xl bg-(--White) flex shadow-xl py-10 px-5 gap-10 2xl:gap-0 flex-col-reverse 2xl:flex-row xl:flex-row">
      <div className="flex-2 2xl:flex-3 w-full flex justify-center px-10">
        <span className="text-xs xl:text-l 2xl:text-xl text-(--Black) font-light space-y-8">
          <p>
            Nazywam się [Twoje Imię] i od wielu lat pomagam kierowcom odzyskać pewność za kierownicą.
          </p>
          <p>
            Specjalizuję się w jazdach doszkalających dla osób, które chcą poprawić technikę jazdy, przygotować się do egzaminu lub po prostu poczuć się bezpieczniej na drodze. Podczas zajęć stawiam na cierpliwość, indywidualne podejście oraz spokojną atmosferę.
          </p>
          <p>
            Moją misją jest sprawić, aby każdy mój kursant wsiadał do auta z poczuciem kontroli i satysfakcji. Właściwe wsparcie potrafi zdziałać cuda.
          </p>
        </span>
      </div>
      <section className="flex-1 xl:flex-2 2xl:flex-2 w-full flex items-center justify-center">
        <div className="w-full h-full relative">
          <Image 
            src = "/TeachersPhoto.png"
            alt = "Teachers photo"
            fill
            className = "object-contain"
          />
        </div>
      </section>
    </section>
   </section>   
  );
}