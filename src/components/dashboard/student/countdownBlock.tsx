import Image from "next/image";
import { useCountdown, padNumber } from "./useCountdown";

type CountdownBlockProps = {
  TargetDate: Date | null;
};

function Block({ value, label }: { value: string; label: string }) {
  return (
    <section className="flex flex-col">
      <div className="bg-[#1A1C1E] h-full aspect-8/7 rounded-sm flex items-center justify-center lg:p-1">
        <span className="text-white font-bold text-6xl">{value}</span>
      </div>
      <span className="text-white text-center w-full text-sm py-1">{label}</span>
    </section>
  );
}

export default function CountdownBlock({ TargetDate }: CountdownBlockProps) {
  const timeRemaining = useCountdown(TargetDate);
  const isAvailable = timeRemaining !== null;

  return (
    <section className="h-full flex-2 flex flex-col">
      <header className="bg-[#1A1C1E] rounded-t-xl p-2 cursor-pointer">
        <div className="flex items-center gap-3 hover:bg-[#545558] transition-colors duration-200 rounded-xl p-2">
          <Image src="/icons/ClockIcon.png" alt="Clock Icon" width={40} height={40} />
          <span className="text-white font-bold tracking-wide text-2xl">
            Czas do następnej jazdy
          </span>
        </div>
      </header>

      <div className="flex-3 flex items-center justify-center w-full bg-[#2B2D31] rounded-b-xl lg:py-0 py-6">
        {isAvailable ? (
          <section className="flex lg:h-20">
            <Block value={padNumber(timeRemaining!.days)} label="Dni" />
            <div className="flex items-center text-white justify-center mx-2">:</div>
            <Block value={padNumber(timeRemaining!.hours)} label="Godzin" />
            <div className="flex items-center text-white justify-center mx-2">:</div>
            <Block value={padNumber(timeRemaining!.minutes)} label="Minut" />
            <div className="flex items-center text-white justify-center mx-2">:</div>
            <Block value={padNumber(timeRemaining!.seconds)} label="Sekund" />
          </section>
        ) : (
          <span className="text-white font-bold tracking-wide text-lg">
            Brak zaplanowanych jazd
          </span>
        )}
      </div>
    </section>
  );
}
