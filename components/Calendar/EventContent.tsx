// components/Calendar/EventContentRenderer.tsx
import React from "react";
import { EventContentArg } from "@fullcalendar/core";

export function eventContentRenderer(arg: EventContentArg): React.JSX.Element {
  const source = arg.event.extendedProps.source;
  const place = arg.event.extendedProps.place;
  const startTime = new Date(arg.event.start!).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = new Date(arg.event.end!).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isDbEvent = source === "db";
  const bgColor = isDbEvent
    ? "bg-[var(--dbBlockColor)]"
    : "bg-[var(--userBlockColor)]";

  return (
    <div className={`w-full h-full ${bgColor} flex flex-col`}>
      <span className="text-lg">{place}</span>
      <span>
        {startTime} - {endTime}
      </span>
      <span>{arg.event.title}</span>
    </div>
  );
}
