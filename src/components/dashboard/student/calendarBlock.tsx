 import DriveItem from "./driveItem";
import CalendarDateItem from "./CalendarDateItem";
import Image from "next/image";
import { useState, useEffect } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

type CalendarItem = {
  id: number;
  carType: string;
  startDate: string;
  endDate: string;
};

type CalendarBlockProps = {
  items: CalendarItem[];
  setItems: React.Dispatch<React.SetStateAction<CalendarItem[]>>;
  CarType: string;
};

type Mode = "list" | "view" | "calendar" | "hourChoice" | "accept";

function formatDateTime(dateTime: string) {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    return { dateOnly: "", timeOnly: "" };
  }
  return {
    dateOnly: date.toISOString().split("T")[0],
    timeOnly: date.toTimeString().slice(0, 5),
  };
}

function toISODate(ddmmyy: string) {
  const [dd, mm, yy] = ddmmyy.split("-");
  return `20${yy}-${mm}-${dd}`;
}

function HourBlock({ startHour, endHour, onClick, setDateStart, setDateEnd }: { startHour: number; endHour: number; onClick: () => void; setDateStart: () => void; setDateEnd: () => void }) {
  return (
    <div onClick={() => { setDateStart(); setDateEnd(); onClick(); }}
         className="w-full flex items-center justify-center bg-(--student-bg-header)/30 backdrop-blur-lg border border-white/10 shadow-xl rounded-xl hover:bg-(--student-bg-hover) cursor-pointer hover:scale-102 duration-300 lg:py-0 lg:px-0 py-3">
      <span className="text-(--student-txt-prim) text-xl font-bold">{startHour}:00 - {endHour}:00</span>
    </div>
  );
}

export default function CalendarBlock({ items, setItems, CarType }: CalendarBlockProps) {
  const [displayItems, setDisplayItems] = useState<CalendarItem[]>([]);
  const IsMoreThanFour = displayItems.length > 3;
  const [mode, setMode] = useState<Mode>("list");

  const [CurrentStartDate, SetCurrentStartDate] = useState("");
  const [CurrentDateTimeStart, SetCurrentDateTimeStart] = useState("");
  const [CurrentEndDate, SetCurrentEndDate] = useState("");
  const [CurrentDateTimeEnd, SetCurrentDateTimeEnd] = useState("");
  const [CurrentCarType, SetCurrentCarType] = useState("");
  const [CurrentDateChosen, setCurrentDateChosen] = useState("");
  const [CurrentHourStart, setCurrentHourStart] = useState(0);
  const [CurrentHourEnd, setCurrentHourEnd] = useState(0);

  const HoursExtremes = { start: 11, end: 23 };

  const SetCurrentDriveItems = (carType: string, startDate: string, startDateTime: string, endDate: string, endDateTime: string) => {
    SetCurrentCarType(carType);
    SetCurrentStartDate(startDate);
    SetCurrentDateTimeStart(startDateTime);
    SetCurrentEndDate(endDate);
    SetCurrentDateTimeEnd(endDateTime);
    setMode("view");
  };

  const DeleteCurrentItem = async (id: number) => {
    try {
      await fetch("/api/calendar/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      setItems((prev) =>
        prev.filter((item) => item.id !== id)
      );

    } catch (err) {
      console.error(err);
    }
  };

  const addToItems = async (Date: string, startHour: number, EndHour: number) => {
  const date = toISODate(Date);

  const startDateVal = `${date}T${startHour.toString().padStart(2, "0")}:00:00`;
    const endDateVal = `${date}T${EndHour.toString().padStart(2, "0")}:00:00`;

    try {
      const res = await fetch("/api/calendar/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate: startDateVal,
          endDate: endDateVal,
        }),
      });

      const newItem = await res.json();

      if (!res.ok) {
        alert(newItem.error);
        return;
      }

      // Map newItem to CalendarItem shape expected by frontend
      const mappedItem: CalendarItem = {
        id: newItem.id, // ensure it's a number
        carType: newItem.car_type || "Unknown",
        startDate: newItem.start_date || startDateVal,
        endDate: newItem.end_date || endDateVal,
      };

      setItems((prev) => [...prev, mappedItem]);

    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    const currentDate = new Date();

    const refreshedItems = (items ?? [])
      .filter(item => new Date(item.startDate) >= currentDate)
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
      .slice(0, 6);

    setDisplayItems(refreshedItems);
  }, [items]);

  useEffect(() => {
    async function fetchCalendar() {
      try {
        const res = await fetch("/api/calendar");
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch calendar", err);
      }
    }

    fetchCalendar();
  }, [setItems]);

  return (
    <section className="h-full flex-2 flex flex-col">
      {/* HEADER */}
      <header className="bg-(--student-bg-header)/30 backdrop-blur-lg border border-white/10 shadow-xl rounded-t-xl p-2 cursor-pointer">
        <div onClick={() => setMode("calendar")}
             className={`${mode !== "calendar" ? "hover:bg-(--student-bg-hover)" : ""} relative flex items-center gap-3 transition-colors duration-200 rounded-xl p-2 cursor-pointer`}>
          <CalendarMonthIcon sx={{ fontSize: 40 }} className="text-(--student-icon)" />
          <span className="text-(--student-txt-prim) font-bold tracking-wide text-2xl">Kalendarz</span>
          <button onClick={(e) => { e.stopPropagation(); setMode("list"); }}
                  className={`${mode !== "calendar" ? "hidden" : "block"} absolute right-0 top-1/2 -translate-y-1/2 text-2xl text-(--student-txt-prim) bg-(--student-bg-hover) rounded-lg py-1 px-3 cursor-pointer`}>
            X
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-3 flex w-full bg-(--student-bg-content)/30 backdrop-blur-lg border border-white/10 shadow-xl rounded-b-xl">
        {mode === "list" && (
          <section className="flex-1 grid grid-cols-1 gap-2 pt-1 pb-1 px-2 place-items-center lg:grid-rows-3 lg:grid-flow-col lg:auto-cols-fr lg:place-items-start">
            {displayItems.map((item) => {
              const start = formatDateTime(item.startDate);
              const end = formatDateTime(item.endDate);
              return <DriveItem key={item.id} IsMoreThanFour={IsMoreThanFour} startDate={start.dateOnly} carType={item.carType} onClick={() => SetCurrentDriveItems(item.carType, start.dateOnly, start.timeOnly, end.dateOnly, end.timeOnly)} onDelete={() => DeleteCurrentItem(item.id)} />;
            })}
          </section>
        )}

        {mode === "view" && (
          <div className="w-full h-full flex items-center justify-center">
            <section className="w-[90%] h-[90%] bg-(--student-bg-header)/30 backdrop-blur-lg border border-white/10 shadow-xl rounded-xl flex lg:flex-row flex-col  max-h-[204px]">
              <div className="flex-1 flex items-center justify-center">
                <Image src={CurrentCarType === "Manual" ? "/images/ManualCarType.png" : "/images/AutomaticCarType.png"} alt="CarTypeImage" width={180} height={180} />
              </div>
              <section className="flex-1 flex flex-col">
                <section className="flex-1 flex flex-col items-center justify-center gap-2">
                  <span className="text-(--student-txt-prim) font-bold text-2xl">{CurrentStartDate}</span>
                  <span className="text-(--student-txt-prim) font-bold text-xl">{CurrentDateTimeStart} - {CurrentDateTimeEnd}</span>
                  <button onClick={() => setMode("list")} className="px-3 py-2 bg-(--student-btn-red-prim) hover:bg-(--student-btn-red-hover) text-(--student-txt-prim) rounded-lg cursor-pointer mt-5">Wyjdź</button>
                </section>
              </section>
            </section>
          </div>
        )}

        {mode === "calendar" && (
          <div className="w-full h-full flex items-center justify-center">
            <section className="w-full h-full grid grid-cols-2 lg:grid lg:grid-cols-3 overflow-y-auto gap-4 p-2 max-h-[204px]">
              {Array.from({ length: 30 }).map((_, i) => {
                const today = new Date();
                today.setDate(today.getDate() + i + 1);
                const day = String(today.getDate()).padStart(2, "0");
                const month = String(today.getMonth() + 1).padStart(2, "0");
                const year = String(today.getFullYear()).slice(-2);
                const formattedDate = `${day}-${month}-${year}`;
                return <CalendarDateItem key={i} date={formattedDate} setCurrentDateChosen={() => setCurrentDateChosen(formattedDate)} enableHourChoice={() => setMode("hourChoice")} />;
              })}
            </section>
          </div>
        )}

        {mode === "hourChoice" && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <section className="w-full h-full grid grid-cols-2 lg:grid lg:grid-cols-3 lg:grid-rows-2 overflow-y-auto lg:gap-4 gap-2 p-2 max-h-[204px]">
              {Array.from({ length: (HoursExtremes.end - HoursExtremes.start) / 2 }, (_, index) => {
                const start = HoursExtremes.start + index * 2;
                return <HourBlock key={start} startHour={start} endHour={start + 2} onClick={() => setMode("accept")} setDateStart={() => setCurrentHourStart(start)} setDateEnd={() => setCurrentHourEnd(start + 2)} />;
              })}
            </section>
            <div className="flex items-center justify-center w-full py-2">
              <button onClick={() => setMode("calendar")} className="px-3 py-2 bg-(--student-btn-red-prim) hover:bg-(--student-btn-red-hover) text-(--student-txt-prim) rounded-lg cursor-pointer mt-5">Wyjdź</button>
            </div>
          </div>
        )}

        {mode === "accept" && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 lg:py-0 py-4">
            <span className="text-(--student-txt-prim) font-bold text-3xl">{CurrentDateChosen}</span>
            <section className="text-(--student-txt-prim) font-light text-xl">{CurrentHourStart}:00 - {CurrentHourEnd}:00</section>
            <section className="flex gap-5">
              <button onClick={() => setMode("hourChoice")} className="px-3 py-2 bg-(--student-btn-red-prim) hover:bg-(--student-btn-red-hover) text-(--student-txt-prim) rounded-lg cursor-pointer mt-5">Wyjdź</button>
              <button onClick={() => { addToItems(CurrentDateChosen, CurrentHourStart, CurrentHourEnd); setMode("list"); }} className="px-3 py-2 bg-(--student-btn-green-prim) hover:bg-(--student-btn-green-hover) text-(--student-txt-prim) rounded-lg cursor-pointer mt-5">Zapisz</button>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}
