"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useState } from "react";
import "./CalendarStyles.css";

import { slotMinTime, slotMaxTime, getItems } from "./CalendarConfig";
import { isDateInRange } from "./CalendarUtils";
import { dayHeaderRenderer } from "./DayHeaderContent";
import { eventContentRenderer } from "./EventContent";
import {
  handleDateClick,
  handleEventAllow,
  handleEventChange,
  handleEventClick,
  handleEventDrop,
} from "./EventHandlers";
import { CalendarEvent } from "./CalendarTypes";
import { useEffect } from "react";

export default function Calendar({SetCurrentUserName} : {SetCurrentUserName: (value: string) => void})  {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    async function load() {
      const items = await getItems();
      setEvents(items);
    }

    load();
  }, []);

  console.log("Current calendar events:", events);

  return (
    <div id="MainWindow" className="w-full h-full p-4 select-none bg-white rounded-2xl border border-(--student-txt-prim)">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        height="100%"
        firstDay={1}
        initialView="timeGridWeek"
        editable={true}
        eventResizableFromStart={true}
        eventDurationEditable={false}
        selectable={false}
        eventOverlap={false}
        allDaySlot={false}
        slotLabelFormat={{
          hour: "2-digit",
          hour12: false,
          minute: "2-digit",
          omitZeroMinute: true,
        }}
        slotMinTime={slotMinTime}
        slotMaxTime={slotMaxTime}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        dayHeaderContent={dayHeaderRenderer}
        dayCellClassNames={(arg) =>
          isDateInRange(arg.date) ? [] : ["fc-disabled-day"]
        }
        selectAllow={(selectInfo) => isDateInRange(selectInfo.start)}
        dateClick={(info) => handleDateClick(info, events, setEvents)}
        eventChange={(info) => handleEventChange(info, setEvents)}
        eventClick={(info) => handleEventClick(info, setEvents, SetCurrentUserName)}
        events={events}
        eventContent={eventContentRenderer}
        eventAllow={handleEventAllow}
        eventDrop={(info) => handleEventDrop(info, setEvents)}
      />
    </div>
  );
}
