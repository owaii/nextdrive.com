import clsx from "clsx";
import DeleteIcon from "@mui/icons-material/Delete";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

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
        "w-full flex h-13 bg-(--student-bg-block) rounded-xl hover:scale-[1.02] transition-transform duration-150 cursor-pointer",
        IsMoreThanFour ? "2xl:w-full" : "2xl:w-1/2"
      )}
    >
      <div className="flex-1 h-full aspect-16/15 relative flex items-center justify-center">
        <DirectionsCarIcon sx={{ fontSize: 45 }} className="text-(--student-icon)" />
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
          <DeleteIcon fontSize="large" className="hover:text-(--student-btn-red-hover) text-(--student-icon) cursor-pointer"/>
        </button>
      </section>
    </div>
  );
}
