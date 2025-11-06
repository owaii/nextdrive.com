import React from "react";
import { DayHeaderContentArg } from "@fullcalendar/core";

export function dayHeaderRenderer(arg: DayHeaderContentArg): React.JSX.Element {
  const dayName = arg.date.toLocaleDateString("pl-PL", { weekday: "short" });
  const formattedDayName = dayName.replace(".", "");
  const dayNum = arg.date.getDate();
  const isToday = arg.isToday;

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="font-semibold text-base uppercase tracking-wide">
        {formattedDayName}
      </span>
      <span
        className={`text-sm flex items-center justify-center w-7 h-7 rounded-full ${
          isToday
            ? "bg-(--defaultAccentColor) text-(--antiAccentColor)"
            : ""
        }`}
      >
        {dayNum}
      </span>
    </div>
  );
}
