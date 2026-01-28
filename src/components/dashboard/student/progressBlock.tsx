import Image from "next/image";
import SyncIcon from '@mui/icons-material/Sync';

export default function ProgressBlock({
  CurrH,
  TotalH,
}: {
  CurrH: GLfloat;
  TotalH: GLfloat;
}) {
  let PercentageValue = Math.floor((CurrH / TotalH) * 100) || 0;

  return (
    <section className="StudentDashboardBlock h-full flex-2 flex flex-col">
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
            cursor-pointer
          "
        >
          <SyncIcon sx={{ fontSize: 40 }} className="text-(--student-icon)" />
          <span className="text-(--student-txt-prim) font-bold tracking-wide text-2xl">
            Progress jazd
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div
        className="
          flex-3 flex flex-col w-full
          bg-(--student-bg-content)/30
          backdrop-blur-lg
          border border-white/10
          shadow-xl
          rounded-b-xl
          items-center
          h-64
        "
      >
        <section className="w-full flex flex-1 flex-col items-start justify-end gap-2 px-5 lg:px-10 py-2">
          <span className="text-(--student-txt-prim) font-light tracking-wide text-[240%]">
            {String(PercentageValue)}%
          </span>
          <span className="text-(--student-txt-prim) font-bold tracking-wide text-xs">
            Twój progress
          </span>
        </section>

        <section className="w-full flex flex-2 flex-col items-center">
          <section className="w-full flex h-1/2 justify-center items-end px-5 lg:px-10">
            <div
              className="
                w-full h-6
                bg-(--student-bg-header)/40
                backdrop-blur-lg
                border border-white/10
                rounded-2xl
                my-2
                flex
                overflow-hidden
              "
            >
              <div
                className="
                  h-full
                  rounded-l-2xl
                  bg-(--student-btn-green-prim)
                  transition-all
                  duration-3000
                  ease-in-out
                "
                style={{ width: `${PercentageValue}%` }}
              />
            </div>
          </section>

          <section className="flex h-1/2 w-8/9 justify-between text-(--student-txt-prim) text-xs">
            <div className="flex flex-1 justify-start">
              <span className="font-light tracking-wide text-xs">0</span>
            </div>
            <div className="flex flex-1 justify-end">
              <span className="font-light tracking-wide text-xs">{TotalH}</span>
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}
