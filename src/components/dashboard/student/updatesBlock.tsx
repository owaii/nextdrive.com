import NotificationsIcon from '@mui/icons-material/Notifications';

function UpdateWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="
        bg-(--student-bg-header)/30
        backdrop-blur-lg
        border border-white/10
        shadow-xl
        w-11/12
        rounded-xl
        p-3
        hover:scale-[1.02]
        transition-transform
        duration-150
        cursor-pointer
        flex flex-col
      "
    >
      {children}
    </section>
  );
}

function SimpleUpdate({ text }: { text: string }) {
  return (
    <UpdateWrapper>
      <span className="text-(--student-txt-prim) font-semibold tracking-wide">
        {text}
      </span>
    </UpdateWrapper>
  );
}

function ActionUpdate({ text }: { text: string }) {
  return (
    <UpdateWrapper>
      <span className="text-(--student-txt-prim) font-semibold tracking-wide">
        {text}
      </span>
      <section className="flex justify-end gap-2 mt-2">
        <button
          className="
            flex items-center justify-center
            px-3 py-1
            border border-white/20
            bg-(--student-btn-green-prim)
            hover:bg-(--student-btn-green-hover)
            text-(--student-txt-prim)
            rounded-md
          "
        >
          Akceptuj
        </button>
        <button
          className="
            flex items-center justify-center
            px-3 py-1
            border border-white/20
            bg-(--student-btn-red-prim)
            hover:bg-(--student-btn-red-hover)
            text-(--student-txt-prim)
            rounded-md
          "
        >
          Odrzuć
        </button>
      </section>
    </UpdateWrapper>
  );
}

function InfoUpdate({ text, infoText }: { text: string; infoText: string }) {
  return (
    <UpdateWrapper>
      <span className="text-(--student-txt-prim) font-semibold tracking-wide">
        {text}
      </span>
      <section className="flex justify-end gap-2 mt-2">
        <button
          className="
            flex items-center justify-center
            px-3 py-1
            border border-white/20
            bg-(--student-bg-hover)
            hover:bg-(--student-bg-header)
            text-(--student-txt-prim)
            rounded-md
          "
        >
          {infoText}
        </button>
      </section>
    </UpdateWrapper>
  );
}

export default function UpdatesBlock() {
  const hasUpdates = true; // toggle this boolean

  return (
    <section className="h-full flex-1 flex flex-col">
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
          "
        >
          <NotificationsIcon sx={{ fontSize: 40 }} className="text-(--student-icon)" />
          <span className="text-(--student-txt-prim) font-bold tracking-wide text-2xl">
            Aktualności
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div
        className="
          flex-3 w-full
          bg-(--student-bg-content)/30
          backdrop-blur-lg
          border border-white/10
          shadow-xl
          rounded-b-xl
          flex flex-col
          items-center
          gap-2
          overflow-y-auto
          pt-1
          max-h-[204px]
        "
      >
        {hasUpdates ? (
          <>
            <SimpleUpdate text="Nowa jazda dodana na 15.06.2024 o godzinie 10:00" />
            <ActionUpdate text="Prośba o zmianę terminu jazdy 3" />
            <InfoUpdate
              text="Zmiana dni pracy instruktora"
              infoText="Więcej informacji"
            />
            <ActionUpdate text="Prośba o zmianę terminu jazdy 3" />
          </>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <span className="text-(--student-txt-prim) font-bold tracking-wide text-sm">
              Brak nowych aktualności
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
