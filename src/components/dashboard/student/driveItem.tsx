import Image from "next/image";
import clsx from "clsx";
import DeleteIcon from "@mui/icons-material/Delete";

type DriveItemProps = {
  startDate: string;
  carType: string;
  IsMoreThanFour: boolean;
  onClick: () => void;
  onDelete: () => void;
};

export default function DriveItem({ IsMoreThanFour, startDate, carType, onClick, onDelete }: DriveItemProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex h-13 bg-[#1A1C1E] rounded-xl hover:scale-[1.02] transition-transform duration-150 cursor-pointer",
        IsMoreThanFour ? "2xl:w-full" : "2xl:w-1/2"
      )}
    >
      <div className="flex-1 h-full aspect-16/15 relative">
        <Image
          src="/icons/CarIcon.png"
          alt="Car Icon"
          fill
          className="object-contain p-1"
        />
      </div>

      <section className="flex flex-3 flex-col justify-center">
        <span className="text-white font-bold tracking-wide">{carType}</span>
        <span className="text-white font-semibold tracking-wide text-xs">
          {startDate}
        </span>
      </section>

      <section className="flex-1 flex items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <DeleteIcon fontSize="large" className="hover:text-red-600 cursor-pointer"/>
        </button>
      </section>
    </div>
  );
}
