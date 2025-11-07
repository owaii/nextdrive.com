"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useState } from "react";
import "./CalendarStyles.css";

import { slotMinTime, slotMaxTime, initialEvents } from "./CalendarConfig";
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

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  return (
    <div id="MainWindow" className="w-full h-full p-4 select-none">
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
        eventClick={(info) => handleEventClick(info, setEvents)}
        events={events as any}
        eventContent={eventContentRenderer}
        eventAllow={handleEventAllow}
        eventDrop={(info) => handleEventDrop(info, setEvents)}
      />
    </div>
  );
}
