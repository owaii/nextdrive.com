import Image from "next/image";
import { useCountdown, padNumber } from "./useCountdown";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

type CountdownBlockProps = {
  TargetDate: Date | null;
};

function Block({ value, label }: { value: string; label: string }) {
  return (
    <section className="flex flex-col">
      <div
        className="
          bg-(--student-bg-header)/30
          backdrop-blur-lg
          border border-white/10
          shadow-xl
          h-full aspect-8/7
          rounded-sm
          flex items-center justify-center
          lg:p-1
        "
      >
        <span className="text-(--student-txt-prim) font-bold text-6xl">
          {value}
        </span>
      </div>
      <span className="text-(--student-txt-prim) text-center w-full text-sm py-1">
        {label}
      </span>
    </section>
  );
}

export default function CountdownBlock({ TargetDate }: CountdownBlockProps) {
  const timeRemaining = useCountdown(TargetDate);
  const isAvailable = timeRemaining !== null;

  return (
    <section className="h-full flex-2 flex flex-col">
      {/* HEADER */}
      <header
        className="
          bg-(--student-bg-header)/30
          backdrop-blur-lg
          border border-white/10
          shadow-xl
          rounded-t-xl
          p-2
          cursor-pointer
        "
      >
        <div
          className="
            flex items-center gap-3
            hover:bg-(--student-bg-hover)
            transition-colors duration-200
            rounded-xl
            p-2
          "
        >
          <AccessTimeIcon sx={{ fontSize: 40 }} className="text-(--student-icon)" />
          <span className="text-(--student-txt-prim) font-bold tracking-wide text-2xl">
            Czas do następnej jazdy
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div
        className="
          flex-3 flex items-center justify-center w-full
          bg-(--student-bg-content)/30
          backdrop-blur-lg
          border border-white/10
          shadow-xl
          rounded-b-xl
          lg:py-0 py-6
        "
      >
        {isAvailable ? (
          <section className="flex lg:h-20">
            <Block value={padNumber(timeRemaining!.days)} label="Dni" />
            <div className="flex items-center justify-center mx-2 text-(--student-txt-prim)">
              :
            </div>
            <Block value={padNumber(timeRemaining!.hours)} label="Godzin" />
            <div className="flex items-center justify-center mx-2 text-(--student-txt-prim)">
              :
            </div>
            <Block value={padNumber(timeRemaining!.minutes)} label="Minut" />
            <div className="flex items-center justify-center mx-2 text-(--student-txt-prim)">
              :
            </div>
            <Block value={padNumber(timeRemaining!.seconds)} label="Sekund" />
          </section>
        ) : (
          <span className="text-(--student-txt-prim) font-bold tracking-wide text-lg">
            Brak zaplanowanych jazd
          </span>
        )}
      </div>
    </section>
  );
}
