// components/Calendar/CalendarTypes.ts
export interface CalendarEvent {
  id: number | string;
  title: string;
  place: string;
  start: string;
  end: string;
  source: "db" | "user";
}
