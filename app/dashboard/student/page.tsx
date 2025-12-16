"use client";

import { ClassNames } from "@emotion/react";
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
            <section className="StudentDashboardBlock h-full flex-1 box-border bg-[#1A1C1E] rounded-xl flex flex-col gap-7">
              <div className="w-full h-2/3 flex justify-start items-end">
                <div className="pl-5">
                  <Image 
                      src="/default-profile-pic.png"
                      alt="Profile Pic"
                      width={140}
                      height={140}
                    />
                  </div>
              </div>
              <section className="w-full h-1/3 flex flex-col gap-2 pl-7">
                <span className="text-white font-bold tracking-wide text-2xl">Jan Kowalski</span>
                <span className="text-white font-semibold tracking-wide text-xs">jan.kowalski@gmail.com</span>
              </section>
            </section>
            {/* Block 2 - Progress Bar */}
            <section className="StudentDashboardBlock h-full flex-2 flex flex-col">
              <header className="bg-[#1A1C1E] rounded-t-xl p-2 cursor-pointer">
                <div className="flex items-center gap-3 hover:bg-[#545558] transition-colors duration-200 rounded-xl p-2 cursor-pointer">
                  <Image 
                    src="/loading.png"
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
                <section className="w-full flex flex-1 flex-col items-start justify-end gap-2 px-10 py-2">
                  <span className="text-white font-light tracking-wide text-[240%]">40%</span>
                  <span className="text-white font-bold tracking-wide text-xs">Twój progress</span>
                </section>

                <section className="w-full flex flex-2 flex-col items-center">
                  <section className="w-full flex h-1/2 justify-center items-end px-10">
                    <div className="w-full h-6 bg-gray-300 rounded-2xl my-2 flex">
                      <div className="w-[40%] h-full rounded-l-2xl bg-green-600 transition-all duration-3000 ease-in-out"></div>
                    </div>
                  </section>
                  <section className="flex h-1/2 w-8/9 justify-between text-white text-xs">
                    <div className="flex flex-1 justify-start">
                      <span className="text-white font-light tracking-wide text-xs">0</span>
                    </div>
                    <div className="flex flex-1 justify-end">
                      <span className="text-white font-light tracking-wide text-xs">30</span>
                    </div>
                  </section>
                  
                </section>
            </div>
            </section>
          </section>

          {/* Row 2 */}
          <section className="w-full flex-1 flex gap-4">  

            {/* Block 1 - Drive dates list */}
            <section className="StudentDashboardBlock h-full flex-2 flex flex-col">
              <header className="bg-[#1A1C1E] rounded-t-xl p-2 cursor-pointer">
                <div className="flex items-center gap-3 hover:bg-[#545558] transition-colors duration-200 rounded-xl p-2 cursor-pointer">
                  <Image 
                    src="/calendar.png"
                    alt="Profile Pic"
                    width={40}
                    height={40}
                  />
                  <span className="text-white font-bold tracking-wide text-2xl">
                    Kalendarz
                  </span>
                </div>
              </header>
              <div className="flex-3 flex w-full bg-[#2B2D31] rounded-b-xl">
                <section className="flex-1 flex flex-col items-center gap-2 pt-1 px-2">
                  {/* Drives list */}
                  <section className="flex w-full h-13 bg-[#1A1C1E] rounded-xl hover:scale-[1.02] transition-transform duration-150 cursor-pointer">
                    <div className="flex-1 h-full aspect-16/15 relative">
                      <Image 
                        src="/car.png"
                        alt="Car Icon"
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    <section className="flex flex-3 flex-col justify-center">
                      <span className="text-white font-bold tracking-wide">Jazda 1</span>
                      <span className="text-white font-semibold tracking-wide text-xs">12.06.2024</span>
                    </section>

                    <section className="flex-1 flex items-center justify-around">
                      <div className="h-full aspect-square relative hover:cursor-pointer">
                        <Image
                          src="/editing.png"
                          alt="Edit Icon"
                          fill
                          className="object-contain py-2 pl-4"
                        />  
                      </div>
                      <div className="h-full aspect-square relative hover:cursor-pointer">
                        <Image
                          src="/del.png"
                          alt="Add Icon"
                          fill
                          className="object-contain py-2"
                        /> 
                      </div>
                    </section>
                  </section>
                  <section className="flex w-full h-13 bg-[#1A1C1E] rounded-xl hover:scale-[1.02] transition-transform duration-150 cursor-pointer">
                    <div className="flex-1 h-full aspect-16/15 relative">
                      <Image 
                        src="/car.png"
                        alt="Car Icon"
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    <section className="flex flex-3 flex-col justify-center">
                      <span className="text-white font-bold tracking-wide">Jazda 1</span>
                      <span className="text-white font-semibold tracking-wide text-xs">12.06.2024</span>
                    </section>

                    <section className="flex-1 flex items-center justify-around">
                      <div className="h-full aspect-square relative hover:cursor-pointer">
                        <Image
                          src="/editing.png"
                          alt="Edit Icon"
                          fill
                          className="object-contain py-2 pl-4"
                        />  
                      </div>
                      <div className="h-full aspect-square relative hover:cursor-pointer">
                        <Image
                          src="/del.png"
                          alt="Add Icon"
                          fill
                          className="object-contain py-2"
                        /> 
                      </div>
                    </section>
                  </section>
                  <section className="flex w-full h-13 bg-[#1A1C1E] rounded-xl hover:scale-[1.02] transition-transform duration-150 cursor-pointer">
                    <div className="flex-1 h-full aspect-16/15 relative">
                      <Image 
                        src="/car.png"
                        alt="Car Icon"
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    <section className="flex flex-3 flex-col justify-center">
                      <span className="text-white font-bold tracking-wide">Jazda 1</span>
                      <span className="text-white font-semibold tracking-wide text-xs">12.06.2024</span>
                    </section>

                    <section className="flex-1 flex items-center justify-around">
                      <div className="h-full aspect-square relative hover:cursor-pointer">
                        <Image
                          src="/editing.png"
                          alt="Edit Icon"
                          fill
                          className="object-contain py-2 pl-4"
                        />  
                      </div>
                      <div className="h-full aspect-square relative hover:cursor-pointer">
                        <Image
                          src="/del.png"
                          alt="Add Icon"
                          fill
                          className="object-contain py-2"
                        /> 
                      </div>
                    </section>
                  </section>
                </section>
                <div className="w-1 my-5 bg-[#545558] rounded-xl"></div>
                <section className="flex-1"></section>
              </div>
            </section>

            {/* Block 2 - Updates */}
            <section className="StudentDashboardBlock h-full flex-1 flex flex-col">
              <header className="bg-[#1A1C1E] rounded-t-xl p-2 cursor-pointer">
                <div className="flex items-center gap-3 hover:bg-[#545558] transition-colors duration-200 rounded-xl p-2 cursor-pointer">
                  <Image 
                    src="/notification.png"
                    alt="Profile Pic"
                    width={40}
                    height={40}
                  />
                  <span className="text-white font-bold tracking-wide text-2xl">
                    Aktualności
                  </span>
                </div>
              </header>
              <div className="flex-3 w-full bg-[#2B2D31] rounded-b-xl flex flex-col items-center gap-2 overflow-y-auto pt-1 max-h-[272px]">
                <div className="relative w-full h-full flex items-center justify-center hidden">
                  <span className="text-white font-semibold tracking-wide text-sm">Brak nowych aktualności</span>
                </div>
                
                <section className="bg-[#1A1C1E] w-11/12 rounded-xl p-3 hover:scale-[1.02] transition-transform duration-150 cursor-pointer">
                  <span className="text-white font-semibold tracking-wide">
                    Nowa jazda dodana na 15.06.2024 o godzinie 10:00
                  </span>
                </section>

                <section className="bg-[#1A1C1E] w-11/12 rounded-xl p-3 hover:scale-[1.02] transition-transform duration-150 cursor-pointer flex flex-col">
                  <span className="flex-1 text-white font-semibold tracking-wide">
                    Prośba o zmianę terminu jazdy 3
                  </span>
                  <section className="flex-1 flex justify-end gap-2 mt-2">
                    <div className="flex items-center justify-center px-3 py-1 border-1 border-white hover:cursor-pointer hover:bg-green-600">
                      <span className="text-white">Akceptuj</span>
                    </div>
                    <div className="flex items-center justify-center px-3 py-1 border-1 border-white hover:cursor-pointer hover:bg-red-600">
                      <span className="text-white">Odrzuć</span>
                    </div>
                  </section>
                </section>

                <section className="bg-[#1A1C1E] w-11/12 rounded-xl p-3 hover:scale-[1.02] transition-transform duration-150 cursor-pointer flex flex-col">
                  <span className="flex-1 text-white font-semibold tracking-wide">
                    Zmiana dni pracy instruktora
                  </span>
                  <section className="flex-1 flex justify-end gap-2 mt-2">
                    <div className="flex items-center justify-center px-3 py-1 border-1 border-white hover:cursor-pointer hover:bg-white/80">
                      <span className="text-white">Więcej informacji</span>
                    </div>
                  </section>
                </section>

                <section className="bg-[#1A1C1E] w-11/12 rounded-xl p-3 hover:scale-[1.02] transition-transform duration-150 cursor-pointer flex flex-col">
                  <span className="flex-1 text-white font-semibold tracking-wide">
                    Prośba o zmianę terminu jazdy 3
                  </span>
                  <section className="flex-1 flex justify-end gap-2 mt-2">
                    <div className="flex items-center justify-center px-3 py-1 border-1 border-white hover:cursor-pointer hover:bg-green-600">
                      <span className="text-white">Akceptuj</span>
                    </div>
                    <div className="flex items-center justify-center px-3 py-1 border-1 border-white hover:cursor-pointer hover:bg-red-600">
                      <span className="text-white">Odrzuć</span>
                    </div>
                  </section>
                </section>
              </div>
            </section>
          </section>

          {/* Row 3 */}
          <section className="w-full flex-1 flex gap-4">

            {/* Block 1 - Settings  */}
            <section className="StudentDashboardBlock h-full flex-1 flex flex-col">
              <header className="bg-[#1A1C1E] rounded-t-xl p-2 cursor-pointer">
                <div className="flex items-center gap-3 hover:bg-[#545558] transition-colors duration-200 rounded-xl p-2 cursor-pointer">
                  <Image 
                    src="/setting.png"
                    alt="Profile Pic"
                    width={40}
                    height={40}
                  />
                  <span className="text-white font-bold tracking-wide text-2xl">
                    Ustawienia
                  </span>
                </div>
              </header>
              <div className="flex-3 w-full bg-[#2B2D31] rounded-b-xl flex flex-col items-center gap-2 pt-1">
                <section className="w-10/11 flex-1 bg-[#1A1C1E] rounded-3xl flex flex-col hover:cursor-pointer hover:bg-[#545558]">
                  <div className="w-full h-2/3 flex justify-center items-end">
                    <div className="w-24 h-24 relative">
                      <Image
                        src="/user.png"
                        alt="Profile Icon"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  </div>
                  <div className="w-full h-1/3 flex items-start justify-center">
                      <span className="text-white font-bold">Zarządzaj profilem</span>
                    </div>
                </section>
                
                <section className="w-10/11 h-14 bg-[#1A1C1E] rounded-3xl flex mb-2 hover:bg-[#545558] hover:cursor-pointer">
                  <div className="flex-1 h-full relative hover:cursor-pointer"> 
                    <Image
                      src="/night-mode.png"
                      alt="Night Mode Icon"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-3 h-full flex items-center justify-center">
                    <span className="text-white font-bold tracking-wide pl-5">Tryb nocny</span> 
                  </div>
                </section>
              </div>
            </section>
            
            {/* Block 2 - Next Drive Countdown  */}
            <section className="StudentDashboardBlock h-full flex-2 flex flex-col">
              <header className="bg-[#1A1C1E] rounded-t-xl p-2 cursor-pointer">
                <div className="flex items-center gap-3 hover:bg-[#545558] transition-colors duration-200 rounded-xl p-2 cursor-pointer">
                  <Image 
                    src="/stopwatch.png"
                    alt="Profile Pic"
                    width={40}
                    height={40}
                  />
                  <span className="text-white font-bold tracking-wide text-2xl">
                    Czas do nastęnej jazdy
                  </span>
                </div>
              </header>
              <div className="flex-3 flex items-center justify-center w-full bg-[#2B2D31] rounded-b-xl">
                <section className="flex h-20">
                  <section className="flex flex-col">
                    <div className="bg-[#1A1C1E] h-full aspect-8/7 rounded-sm flex items-center justify-center">
                      <span className="text-white font-bold text-6xl">24</span>
                    </div>
                    <span className="text-white text-center w-full text-sm py-1">Dni</span>
                  </section>
                  <div className="flex items-center justify-center mx-2">
                    <span className="text-white text-3xl">:</span>
                  </div>
                  <section className="flex flex-col">
                    <div className="bg-[#1A1C1E] h-full aspect-8/7 rounded-sm flex items-center justify-center">
                      <span className="text-white font-bold text-6xl">02</span>
                    </div>
                    <span className="text-white text-center w-full text-sm py-1">Godziny</span>
                  </section>
                  <div className="flex items-center justify-center mx-2">
                    <span className="text-white text-3xl">:</span>
                  </div>
                  <section className="flex flex-col">
                    <div className="bg-[#1A1C1E] h-full aspect-8/7 rounded-sm flex items-center justify-center">
                      <span className="text-white font-bold text-6xl">08</span>
                    </div>
                    <span className="text-white text-center w-full text-sm py-1">Minuty</span>
                  </section>
                  <div className="flex items-center justify-center mx-2">
                    <span className="text-white text-3xl">:</span>
                  </div>
                  <section className="flex flex-col">
                    <div className="bg-[#1A1C1E] h-full aspect-8/7 rounded-sm flex items-center justify-center">
                      <span className="text-white font-bold text-6xl">10</span>
                    </div>
                    <span className="text-white text-center w-full text-sm py-1">Sekundy</span>
                  </section>
                </section>
              </div>
            </section>
          </section>
        </section>
      </main>
    </div>
  )
}
