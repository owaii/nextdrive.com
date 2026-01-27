import Image from "next/image";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

import MainSettingsBlock from "./SettingsChoiceBlock";

type SettingsBlockProps = {
  FullNameVal?: string,
  MailVal?: string,
  PasswordVal?: string,
  SetFullNameVal: Dispatch<SetStateAction<string>>,
  SetMailVal: Dispatch<SetStateAction<string>>,
  SetPasswordVal: Dispatch<SetStateAction<string>>,
}

export default function SettingsBlock({ FullNameVal, MailVal, PasswordVal, SetFullNameVal, SetMailVal, SetPasswordVal } : SettingsBlockProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const openSettings = () => { setIsSettingsOpen(true); };
  const closeSettings = () => { setIsSettingsOpen(false); };

  return (
    <section className="h-full flex-1 flex flex-col">
      <header className="bg-[#1A1C1E] rounded-t-xl p-2 cursor-pointer">
        <div className="flex items-center gap-3 hover:bg-[#545558] transition-colors duration-200 rounded-xl p-2 cursor-pointer">
          <Image 
            src="/icons/SettingIcon.png"
            alt="Profile Pic"
            width={40}
            height={40}
          />
          <span className="text-white font-bold tracking-wide text-2xl">
            Ustawienia
          </span>
        </div>
      </header>
      <div className="flex-3 w-full bg-[#2B2D31] rounded-b-xl flex flex-col items-center gap-2 py-1">
        {isSettingsOpen ? (
          <MainSettingsBlock 
            Close={closeSettings}
            FullNameVal={FullNameVal} MailVal={MailVal} PasswordVal={PasswordVal} 
            SetFullNameVal={SetFullNameVal} SetMailVal={SetMailVal} SetPasswordVal={SetPasswordVal}
          />
        ) : (
          <>
            <button onClick={openSettings} className="w-10/11 flex-1 bg-[#1A1C1E] rounded-xl flex flex-col hover:cursor-pointer hover:bg-[#545558] lg:p-0 pt-5">
              <div className="w-full h-2/3 flex justify-center items-end">
                <div className="w-24 h-24 relative">
                  <Image
                    src="/icons/UserIcon.png"
                    alt="Profile Icon"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
              <div className="w-full h-1/3 flex items-start justify-center">
                <span className="text-white font-bold">Zarządzaj profilem</span>
              </div>
            </button>
            
            <section className="w-10/11 h-14 bg-[#1A1C1E] rounded-3xl flex mb-2 hover:bg-[#545558] hover:cursor-pointer">
              <div className="flex-1 h-full relative hover:cursor-pointer"> 
                <Image
                  src="/icons/MoonIcon.png"
                  alt="Night Mode Icon"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-3 h-full flex items-center justify-center">
                <span className="text-white font-bold tracking-wide pl-5">Tryb nocny</span> 
              </div>
            </section>
          </>
        )}
      </div>
    </section>
  );
}