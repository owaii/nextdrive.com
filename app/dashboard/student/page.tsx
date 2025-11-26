"use client";

import Image from "next/image";

export default function UserDashboard() {
  return (
    <div className="bg-[#0A0A0A] h-screen w-screen">
      <header className="fixed top-0 left-0 w-full h-12 bg-[#1A1C1E] z-50"></header>
      <main className="w-screen h-screen flex items-start justify-center pt-25">
        <section className="w-[95%] sm:w-[85%] md:w-[70%] lg:w-[55%] xl:w-[45%] 2xl:w-[40%] h-[75vh] flex flex-col gap-7">
          {/* Row 1 */}
          <section className="w-full flex-1 flex gap-4">
            {/* Block 1 - User Profile */}
            <section className="StudentDashboardBlock h-full flex-1 bg-[#1A1C1E] rounded-xl"/>
            {/* Block 2 - Progress Bar */}
            <section className="StudentDashboardBlock h-full flex-2 flex flex-col">
              <header className="flex-1 w-full bg-[#1A1C1E] rounded-t-xl"></header>
              <div className="flex-3 w-full bg-[#2B2D31] rounded-b-xl"></div>
            </section>
          </section>
          {/* Row 2 */}
          <section className="w-full flex-1 flex gap-4">
            {/* Block 1 - Drive dates list */}
            <section className="StudentDashboardBlock h-full flex-2 flex flex-col">
              <header className="bg-[#1A1C1E] rounded-t-xl p-2 cursor-pointer">
                <div className="flex items-center gap-3 hover:bg-[#545558] transition-colors duration-200 rounded-xl p-2 cursor-pointer">
                  <Image 
                    src="/default-profile-pic.png"
                    alt="Profile Pic"
                    width={50}
                    height={50}
                  />
                  <span className="text-white font-bold tracking-wide text-2xl">
                    Kalendarz
                  </span>
                </div>
              </header>
              <div className="flex-3 w-full bg-[#2B2D31] rounded-b-xl"></div>
            </section>
            {/* Block 2 - Driving proffesor contact */}
            <section className="StudentDashboardBlock h-full flex-1 bg-[#1A1C1E] rounded-xl"/>
          </section>
          {/* Row 3 */}
          <section className="w-full flex-1 flex gap-4">
            {/* Block 1 - Settings  */}
            <section className="StudentDashboardBlock h-full flex-1 bg-[#1A1C1E] rounded-xl"/>
            {/* Block 2 - Next Drive Countdown  */}
            <section className="StudentDashboardBlock h-full flex-2 flex flex-col">
              <header className="flex-1 w-full bg-[#1A1C1E] rounded-t-xl"></header>
              <div className="flex-3 w-full bg-[#2B2D31] rounded-b-xl"></div>
            </section>
          </section>
        </section>
      </main>
    </div>
  )
}
