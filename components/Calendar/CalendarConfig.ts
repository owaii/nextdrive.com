import { CalendarEvent } from "./CalendarTypes";

export const slotMinTime = "12:00:00";
export const slotMaxTime = "24:00:00";

export const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Manual",
    place: "Bródno",
    start: "2025-11-05T14:00:00",
    end: "2025-11-05T16:00:00",
    source: "db",
  },
  {
    id: 2,
    title: "Manual",
    place: "Bródno",
    start: "2025-11-08T14:00:00",
    end: "2025-11-08T16:00:00",
    source: "db",
  },
];
