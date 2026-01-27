import Image from "next/image";

type CalendarDateItemProps = {
  date: string;
  setCurrentDateChosen: () => void;
  enableHourChoice: () => void;
};

export default function CalendarDateItem({ date, setCurrentDateChosen, enableHourChoice }: CalendarDateItemProps) {
  return (
    <div 
      onClick={() => {
        setCurrentDateChosen();
        enableHourChoice();
      }}
      className="w-full h-full rounded-xl bg-[#1A1C1E] flex flex-col items-center justify-center p-2 hover:bg-[#545558] cursor-pointer hover:scale-102 duration-300">
      <Image
        src="/icons/CalendarIcon.png"
        alt="Calendar Icon"
        width={60}
        height={60}
        className="mb-2"
      />
      <span className="text-white font-bold text-xl">{date}</span>
    </div>
  );
}
