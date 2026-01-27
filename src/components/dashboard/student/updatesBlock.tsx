import Image from "next/image";

function UpdateWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[#1A1C1E] w-11/12 rounded-xl p-3 hover:scale-[1.02] transition-transform duration-150 cursor-pointer flex flex-col">
      {children}
    </section>
  );
}

function SimpleUpdate({ text }: { text: string }) {
  return (
    <UpdateWrapper>
      <span className="text-white font-semibold tracking-wide">{text}</span>
    </UpdateWrapper>
  );
}

function ActionUpdate({ text }: { text: string }) {
  return (
    <UpdateWrapper>
      <span className="text-white font-semibold tracking-wide">{text}</span>
      <section className="flex justify-end gap-2 mt-2">
        <button className="flex items-center justify-center px-3 py-1 border border-white hover:bg-green-600 text-white">
          Akceptuj
        </button>
        <button className="flex items-center justify-center px-3 py-1 border border-white hover:bg-red-600 text-white">
          Odrzuć
        </button>
      </section>
    </UpdateWrapper>
  );
}

function InfoUpdate({ text, infoText }: { text: string; infoText: string }) {
  return (
    <UpdateWrapper>
      <span className="text-white font-semibold tracking-wide">{text}</span>
      <section className="flex justify-end gap-2 mt-2">
        <button className="flex items-center justify-center px-3 py-1 border border-white hover:bg-white/80 text-white">
          {infoText}
        </button>
      </section>
    </UpdateWrapper>
  );
}

export default function UpdatesBlock() {
  const hasUpdates = false; // toggle this boolean

  return (
    <section className="h-full flex-1 flex flex-col">
      <header className="bg-[#1A1C1E] rounded-t-xl p-2 cursor-pointer">
        <div className="flex items-center gap-3 hover:bg-[#545558] transition-colors duration-200 rounded-xl p-2">
          <Image 
            src="/images/NotificationIcon.png"
            alt="Notifications"
            width={40}
            height={40}
          />
          <span className="text-white font-bold tracking-wide text-2xl">
            Aktualności
          </span>
        </div>
      </header>

      <div className="flex-3 w-full bg-[#2B2D31] rounded-b-xl flex flex-col items-center gap-2 overflow-y-auto pt-1 max-h-[272px]">
        {hasUpdates ? (
          <>
            <SimpleUpdate text="Nowa jazda dodana na 15.06.2024 o godzinie 10:00" />
            <ActionUpdate text="Prośba o zmianę terminu jazdy 3" />
            <InfoUpdate text="Zmiana dni pracy instruktora" infoText="Więcej informacji" />
            <ActionUpdate text="Prośba o zmianę terminu jazdy 3" />
          </>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <span className="text-white font-bold tracking-wide text-sm">
              Brak nowych aktualności
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
