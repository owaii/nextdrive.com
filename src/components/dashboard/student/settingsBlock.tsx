import Image from "next/image";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
      <header className="
        bg-(--student-bg-header)/30 backdrop-blur-lg
        border border-white/10
        shadow-xl
        rounded-t-xl
        p-2
        cursor-pointer
      ">
        <div className="flex items-center gap-3 hover:bg-(--student-bg-hover) transition-colors duration-200 rounded-xl p-2 cursor-pointer">
          <SettingsIcon sx={{ fontSize: 40 }} className="text-white" />
          <span className="text-white font-bold tracking-wide text-2xl">
            Ustawienia
          </span>
        </div>
      </header>
      <div className="
        flex-3 w-full
        bg-(--student-bg-content)/30 backdrop-blur-lg
        border border-white/10
        shadow-xl
        rounded-b-xl
        flex flex-col items-center gap-2 py-1
      ">
        {isSettingsOpen ? (
          <MainSettingsBlock 
            Close={closeSettings}
            FullNameVal={FullNameVal} MailVal={MailVal} PasswordVal={PasswordVal} 
            SetFullNameVal={SetFullNameVal} SetMailVal={SetMailVal} SetPasswordVal={SetPasswordVal}
          />
        ) : (
          <>
            <button onClick={openSettings} className="w-10/11 flex-1 bg-(--student-bg-block) rounded-xl flex flex-col hover:cursor-pointer hover:bg-[#545558] lg:pb-2 lg:p-0 pt-5">
              <div className="w-full flex-1 flex justify-center items-end">
                <AccountCircleIcon sx={{ fontSize: 90 }} className="text-white" />
              </div>
              <div className="w-full flex items-start justify-center">
                <span className="text-white font-bold">Zarządzaj profilem</span>
              </div>
            </button>
            
            <section className="w-10/11 h-14 bg-(--student-bg-block) rounded-3xl flex mb-2 hover:bg-(--student-bg-hover) hover:cursor-pointer">
              <div className="flex-1 h-full relative hover:cursor-pointer"> 
                <DarkModeIcon sx={{ fontSize: 60 }} className="text-(--student-icon-dark)" />
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