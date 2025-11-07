import toast from "react-hot-toast";
import { CalendarEvent } from "./CalendarTypes";
import { start } from "repl";
import { slotMaxTime, slotMinTime } from "./CalendarConfig";

export function getWeekStart(date: Date | string): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

export function isSameWeek(date1: Date | string, date2: Date | string): boolean {
    const start1 = getWeekStart(date1);
    const start2 = getWeekStart(date2);
    return start1.toDateString() === start2.toDateString();
}

export function getDateLimits(): { today: Date, oneMonthLater: Date } {
    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);
    return { today, oneMonthLater };
}

export function isDateInRange(date: Date | string): boolean {
    const {today, oneMonthLater} = getDateLimits();
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    oneMonthLater.setHours(0, 0, 0, 0);
    return d > today && d <= oneMonthLater;
}

export function isBlockValidForCreate(date: Date, events: CalendarEvent[]): boolean {
  const hasUserBlockThatDay = events.some(
    (event) =>
      event.source === "user" &&
      new Date(event.start).toDateString() === date.toDateString()
  );

  if (hasUserBlockThatDay) {
    toast("You already have a user block on this day!");
    return false;
  }

  const userBlocksThisWeek = events.filter(
    (event) =>
      event.source === "user" &&
      isSameWeek(new Date(event.start), date)
  );

  if (userBlocksThisWeek.length >= 2) {
    toast("You already have 2 user blocks this week!");
    return false;
  }

  if (!isDateInRange(date)) {
    toast("You can only place blocks between tomorrow and one month from now.");
    return false;
  }

  return true;
}

export function isBlockValidForMove(date: Date): boolean {
  if (!isDateInRange(date)) {
    toast("That date is outside the allowed range!");
    return false;
  }

  return true;
}
