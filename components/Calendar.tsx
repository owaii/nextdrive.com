"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useState, useEffect } from "react";
import { start } from "repl";

//import "@fullcalendar/common/main.css";
//import "@fullcalendar/daygrid/main.css";
//import "@fullcalendar/timegrid/main.css";
//import "@fullcalendar/list/main.css";

function getDateLimits() {
    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);

    return { today, oneMonthLater };
}

function isDateInRange(date) {
    const { today, oneMonthLater } = getDateLimits();

    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    oneMonthLater.setHours(0, 0, 0, 0);

    return d > today && d <= oneMonthLater;
}


export default function Calendar() {
    const [showModal, setShowModal] = useState(false);
    const [selectedRange, setSelectedRange] = useState(null);
    const slotMinTime = "12:00:00";
    const slotMaxTime = "24:00:00";

    const [events, setEvents] = useState([
        {
            title: "Manual",
            place: "Bródno",
            start: "2025-11-05T14:00:00",
            end: "2025-11-05T16:00:00",
            source: "db"
        },
        {
            title: "Manual",
            place: "Bródno",
            start: "2025-11-08T14:00:00",
            end: "2025-11-08T16:00:00",
            source: "db"
        }
    ])

    return (
        <div id="MainWindow" className="w-full h-full p-4">
            <FullCalendar 
                height="100%"
                firstDay={1}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="timeGridWeek"
                eventOverlap={false}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                slotMinTime={slotMinTime}
                slotMaxTime={slotMaxTime}
                slotLabelInterval={{hours: 1}}
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
                    const formattedDayName = dayName.replace(".","");
                    const dayNum = arg.date.getDate();
                    const isToday = arg.isToday;

                    return (
                        <div className="flex flex-col items-center justify-center">
                            <span className="font-semibold text-base uppercase tracking-wide">
                                {formattedDayName}
                            </span>
                            <span className={`text-sm flex items-center justify-center w-7 h-7 rounded-full ${isToday ? "bg-blue-600 text-white" : ""}`}>{dayNum}</span>
                        </div>
                    )
                }}
                editable={true}
                eventResizableFromStart={true}
                eventDurationEditable={false}
                selectable={false}
                dayCellClassNames={(arg) => isDateInRange(arg.date) ? [] : ["fc-disabled-day"] }
                selectAllow={(selectInfo) => isDateInRange(selectInfo.start)}
                dateClick={(info) => {
                    const start = info.date;
                    if (!isDateInRange(start)) return;

                    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
                    const place = "Bielany";

                    const newEvent = {
                        title: "Manual",
                        place,
                        start: start.toISOString(),
                        end: end.toISOString(),
                        source: "user",
                    };

                    setEvents(prev => [...prev, newEvent]);
                }}
                eventContent={(arg) => {
                    const source = arg.event.extendedProps.source;
                    const place = arg.event.extendedProps.place;
                    const startTime = new Date(arg.event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});
                    const endTime = new Date(arg.event.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                    
                    if (source == "db") {
                        return (
                            <div className="w-full h-full bg-[var(--dbBlockColor)] flex flex-col">
                                <span className="text-lg">{place}</span>
                                <span>{startTime} - {endTime}</span>
                                <span>{arg.event.title}</span>
                            </div>
                        );
                    } else {
                        return (
                            <div className="w-full h-full bg-[var(--userBlockColor)] flex flex-col">
                                <span className="text-lg">{place}</span>
                                <span>{startTime} - {endTime}</span>
                                <span>{arg.event.title}</span>
                            </div>
                        );
                    }
                }}
                events={events}
                eventAllow={(dropInfo, draggedEvent) => {
                    if (draggedEvent.extendedProps.source === "db") {
                        alert("Database events cannot be moved!");
                        return false;
                    }

                    return true;
                }}

            />
            <style jsx global>{`
                .fc-disabled-day {
                    background-color: #f3f4f6 !important;
                    opacity: 0.5 !important;
                    pointer-events: none !important;
                }

                .fc-timegrid-axis:first-child {
                    visibility: hidden !important;
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