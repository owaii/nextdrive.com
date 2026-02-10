import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MailIcon from '@mui/icons-material/Mail';

type SettingsBlockProps = {
  Close: () => void,
  FullNameVal?: string,
  MailVal?: string,
  PasswordVal?: string,
  SetFullNameVal: Dispatch<SetStateAction<string>>,
  SetMailVal: Dispatch<SetStateAction<string>>,
  SetPasswordVal: Dispatch<SetStateAction<string>>,
}

function EditVariableBlock({ Vars, SetVar, Close, fieldName }: { Vars?: string, SetVar: Dispatch<SetStateAction<string>>, Close: () => void, fieldName: "fullName" | "mail" | "password"}) {
  const [InputValue, setInputValue] = useState<string>(Vars ?? "");

  const handleSave = async () => {
    try {
      const body: any = { [fieldName]: InputValue };

      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        SetVar(InputValue);
        Close();
      } else {
        alert(data.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

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
        <button onClick={Close} className="px-3 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg cursor-pointer">
          Wyjdź
        </button>
        <button onClick={handleSave} className="px-3 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg cursor-pointer">
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
      
      {iconSrc == "NameIcon" && (
        <AccountCircleIcon sx={{ fontSize: 50 }} className="text-(--student-icon)" />
      )}

      {iconSrc == "MailIcon" && (
        <MailIcon sx={{ fontSize: 50 }} className="text-(--student-icon)" />
      )}

      {iconSrc == "PasswordIcon" && (
        <LockIcon sx={{ fontSize: 50 }} className="text-(--student-icon)" />
      )}

      {iconSrc == "ExitIcon" && (
        <ExitToAppIcon sx={{ fontSize: 50 }} className="text-(--student-icon)" />
      )}
      
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
      <EditVariableBlock
        Vars={MailVal}
        SetVar={SetMailVal}
        Close={() => setIsEditingMail(false)}
        fieldName="mail"
      />
    )}

    {isEditingFullName && (
      <EditVariableBlock
        Vars={FullNameVal}
        SetVar={SetFullNameVal}
        Close={() => setIsEditingFullName(false)}
        fieldName="fullName"
      />
    )}

    {isEditingPassword && (
      <EditVariableBlock
        Vars={""}
        SetVar={SetPasswordVal}
        Close={() => setIsEditingPassword(false)}
        fieldName="password"
      />
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