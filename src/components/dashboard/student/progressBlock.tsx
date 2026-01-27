import Image from "next/image";

export default function ProgressBlock({ CurrH, TotalH } : { CurrH: GLfloat, TotalH: GLfloat}) {
  let PercentageValue = Math.floor((CurrH / TotalH) * 100) || 0;
  
  return (
    <section className="StudentDashboardBlock h-full flex-2 flex flex-col">
      <header className="bg-[#1A1C1E] rounded-t-xl p-2 cursor-pointer">
        <div className="flex items-center gap-3 hover:bg-[#545558] transition-colors duration-200 rounded-xl p-2 cursor-pointer">
          <Image 
            src="/icons/ProgressIcon.png"
            alt="Profile Pic"
            width={40}
            height={40}
          />
          <span className="text-white font-bold tracking-wide text-2xl">
            Progress jazd
          </span>
        </div>
      </header>
      <div className="flex-3 flex flex-col w-full bg-[#2B2D31] rounded-b-xl items-center h-64">
        <section className="w-full flex flex-1 flex-col items-start justify-end gap-2 px-5 lg:px-10 py-2">
          <span className="text-white font-light tracking-wide text-[240%]">{ String(PercentageValue) }%</span>
          <span className="text-white font-bold tracking-wide text-xs">Twój progress</span>
        </section>
  
        <section className="w-full flex flex-2 flex-col items-center">
          <section className="w-full flex h-1/2 justify-center items-end px-5 lg:px-10">
            <div className="w-full h-6 bg-gray-300 rounded-2xl my-2 flex">
              <div
                className="h-full rounded-l-2xl bg-green-600 transition-all duration-3000 ease-in-out"
                style={{ width: `${PercentageValue}%` }}
              ></div>
            </div>
          </section>
          <section className="flex h-1/2 w-8/9 justify-between text-white text-xs">
            <div className="flex flex-1 justify-start">
              <span className="text-white font-light tracking-wide text-xs">0</span>
            </div>
            <div className="flex flex-1 justify-end">
              <span className="text-white font-light tracking-wide text-xs">{ TotalH }</span>
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}
