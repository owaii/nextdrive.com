import Image from "next/image";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

type SettingsBlockProps = {
  Close: () => void,
  FullNameVal?: string,
  MailVal?: string,
  PasswordVal?: string,
  SetFullNameVal: Dispatch<SetStateAction<string>>,
  SetMailVal: Dispatch<SetStateAction<string>>,
  SetPasswordVal: Dispatch<SetStateAction<string>>,
}

function EditVariableBlock({ Vars, SetVar, Close }: { Vars?: string,  SetVar: Dispatch<SetStateAction<string>>, Close: () => void }) {
  const [InputValue, setInputValue] = useState(Vars);

  return (
    <section className="w-full h-full flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center gap-7">
        <span className="text-white text-2xl font-bold">Zmień Wartość</span>
        <input
          value={InputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Wpisz wartość"
          className="py-2 px-4 bg-[#1A1C1E] text-white rounded-lg w-60"
        />
      </section>
      <section className="w-full flex justify-center gap-5 py-5">
        <button 
          onClick={Close}
          className="px-3 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg cursor-pointer"
        >
          Wyjdź
        </button>

        <button 
          onClick={() => {
            SetVar(InputValue)
            Close();
          }}
          className="px-3 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg cursor-pointer"
        >
          Zapisz
        </button>
      </section>
    </section>
  );
}

function SettingsChoiceBlock({ onClickFunction, text, iconSrc }: { onClickFunction: () => void, text: string, iconSrc: string }) {
  return (
    <button 
      onClick={onClickFunction}
      className="w-full h-full px-3 py-1 bg-[#1A1C1E] rounded-xl cursor-pointer hover:bg-[#545558] flex flex-col items-center justify-center"  
    >
      <Image
        src={`/icons/${iconSrc}.png`}
        alt={`${text} Icon`}
        width={50}
        height={50}
      />
      <span className="text-white font-semibold mt-2">{text}</span>
    </button>    
  );
}

export default function MainSettingsBlock({ Close, FullNameVal, MailVal, PasswordVal, SetFullNameVal, SetMailVal, SetPasswordVal }: SettingsBlockProps) {
  const [isEditingMail, setIsEditingMail] = useState(false);
  const [isEditingFullName, setIsEditingFullName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  return (
    <>
    {isEditingMail && (
      <EditVariableBlock Vars={MailVal} SetVar={SetMailVal} Close={() => setIsEditingMail(false)}/>
    )}

    {isEditingFullName && (
      <EditVariableBlock Vars={FullNameVal} SetVar={SetFullNameVal} Close={() => setIsEditingFullName(false)}/>
    )}

    {isEditingPassword && (
      <EditVariableBlock Vars={PasswordVal} SetVar={SetPasswordVal} Close={() => setIsEditingPassword(false)}/>
    )}

    {!isEditingMail && !isEditingFullName && !isEditingPassword && (
      <>
      <section className="h-full flex-1 grid grid-cols-2 grid-rows-2 gap-4">
        <SettingsChoiceBlock iconSrc="MailIcon" text="Mail" onClickFunction={() => setIsEditingMail(true)}  />
        <SettingsChoiceBlock iconSrc="NameIcon" text="Imie i Nazwisko" onClickFunction={() => setIsEditingFullName(true)}  />
        <SettingsChoiceBlock iconSrc="PasswordIcon" text="Hasło" onClickFunction={() => setIsEditingPassword(true)}  />
        <SettingsChoiceBlock iconSrc="ExitIcon" text="Wyjdź" onClickFunction={Close}/>
      </section>
      </>
    )}
    </>
  );
}