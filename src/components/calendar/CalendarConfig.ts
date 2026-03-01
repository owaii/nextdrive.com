import { CalendarEvent } from "./CalendarTypes";

export const slotMinTime = "11:00:00";
export const slotMaxTime = "23:00:00";

export async function getItems(): Promise<CalendarEvent[]> {
  const res = await fetch("/api/admin/calendar/get");

  if (!res.ok) {
    throw new Error("Failed to fetch calendar events");
  }

  console.log("Fetched calendar events:", await res.clone().json());

  return res.json();
}