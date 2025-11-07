"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useState, useEffect } from "react";

//import "@fullcalendar/common/main.css";
//import "@fullcalendar/daygrid/main.css";
//import "@fullcalendar/timegrid/main.css";
//import "@fullcalendar/list/main.css";

export default function Calendar() {
  const slotMinTime = "12:00:00";
  const slotMaxTime = "23:00:00";

  return (
    <div id="MainWindow" className="w-full h-full p-4">
      <FullCalendar
        height="100%"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        slotMinTime={slotMinTime}
        slotMaxTime={slotMaxTime}
        slotLabelInterval={{ hours: 1 }}
        slotLabelFormat={{
          hour: "2-digit",
          hour12: false,
          minute: "2-digit",
          omitZeroMinute: true,
        }}
        allDaySlot={false}
        dayHeaderContent={(arg) => {
          const dayName = arg.date.toLocaleDateString("pl-PL", {
            weekday: "short",
          });
          const formattedDayName = dayName.replace(".", "");
          const dayNum = arg.date.getDate();
          const isToday = arg.isToday;

          return (
            <div className="flex flex-col items-center justify-center">
              <span className="font-semibold text-base uppercase tracking-wide">
                {formattedDayName}
              </span>
              <span
                className={`text-sm flex items-center justify-center w-7 h-7 rounded-full ${isToday ? "bg-blue-600 text-white" : ""}`}
              >
                {dayNum}
              </span>
            </div>
          );
        }}
      />
      <style jsx global>{`
        .fc-timegrid-slot-label:first-child {
        }

        .fc-timegrid-axis {
          width: 60px !important;
          min-width: 60px !important;
          text-align: right !important;
          padding-right: 0.5rem !important;
          background: white !important;
          border-right: 1px solid #e5e7eb !important;
        }

        .fc-scrollgrid {
          border: none !important;
        }

        .fc-timegrid-slot-label {
          font-size: 0.875rem;
          color: #4b5563;
        }

        .fc-toolbar-chunk {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fc-toolbar-title {
          font-size: 1.125rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .fc-button {
          border-radius: 0.5rem !important;
          background-color: #2563eb !important;
          border: none !important;
        }

        .fc-button:hover {
          background-color: #1d4ed8 !important;
        }
      `}</style>
    </div>
  );
}
