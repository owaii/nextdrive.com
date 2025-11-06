import toast from "react-hot-toast";
import { DateClickArg } from "@fullcalendar/interaction";
import { EventChangeArg, EventApi } from "@fullcalendar/core";
import { EventDropArg } from "@fullcalendar/core/index.js";
import { Dispatch, SetStateAction } from "react";
import { CalendarEvent } from "./CalendarTypes";
import { isSameWeek, isDateInRange, isBlockValidForCreate, isBlockValidForMove } from "./CalendarUtils";
import { slotMaxTime, slotMinTime } from "./CalendarConfig";
import { Logger } from "../utils/logging";

interface EventClickArg {
  el: HTMLElement;
  event: EventApi;
  jsEvent: MouseEvent;
  view: any;
}

export function handleDateClick(info: DateClickArg, events: CalendarEvent[], setEvents: Dispatch<SetStateAction<CalendarEvent[]>>): void {
  const start = info.date;
  if (!isBlockValidForCreate(start, events)) return;

  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const place = "Bielany";

  const newEvent: CalendarEvent = {
    id: Math.floor(Date.now()),
    title: "Manual",
    place,
    start: start.toISOString(),
    end: end.toISOString(),
    source: "user",
  };

  setEvents((prev) => [...prev, newEvent]);
}

export function handleEventChange(changeInfo: EventChangeArg, setEvents: Dispatch<SetStateAction<CalendarEvent[]>>): void {
  const updatedEvent = changeInfo.event;
  const id = Number(updatedEvent.id);

  setEvents((prevEvents) =>
    prevEvents.map((event) =>
      event.id === id
        ? {
            ...event,
            start: updatedEvent.start?.toISOString() ?? event.start,
            end: updatedEvent.end?.toISOString() ?? event.end,
          }
        : event
    )
  );
}

export function handleEventClick(info: EventClickArg, setEvents: Dispatch<SetStateAction<CalendarEvent[]>>): void {
  info.jsEvent.preventDefault();

  if (info.event.extendedProps.source === "db") return;
}

export function handleEventAllow(dropInfo: any, draggedEvent: any): boolean {
  if (draggedEvent.extendedProps.source === "db") return false;

  const start = dropInfo.start;
  const end =
    dropInfo.end ??
    new Date(
      start.getTime() +
        (draggedEvent.duration?._milliseconds ?? 2 * 60 * 60 * 1000)
    );

  const minHour = parseInt(slotMinTime.split(":")[0], 10);
  const rawMaxHour = parseInt(slotMaxTime.split(":")[0], 10);
  const isEndOfDay = rawMaxHour === 24;
  const maxHour = isEndOfDay ? 24 : rawMaxHour;

  const startHour = start.getHours() + start.getMinutes() / 60;
  let endHour = end.getHours() + end.getMinutes() / 60;

  if (end.toDateString() !== start.toDateString()) endHour += 24;

  const calendar =
    dropInfo?.view?.calendar ?? draggedEvent?._context?.calendarApi;
  if (!calendar) return true;

  const events = calendar.getEvents().map((e: any) => ({
    id: e.id,
    title: e.title,
    place: e.extendedProps.place,
    start: e.start?.toISOString() ?? "",
    end: e.end?.toISOString() ?? "",
    source: e.extendedProps.source,
  }));

  Logger.info(`
    MinHour: ${minHour}, MaxHour: ${maxHour}
    StartHour: ${startHour}, EndHour: ${endHour}
  `);

  if (!isBlockValidForMove(start)) return false;

  if (startHour < minHour || endHour > maxHour) {
    toast(
      `Blocks must be fully within ${minHour}:00 and ${
        isEndOfDay ? "24:00" : `${maxHour}:00`
      }!`
    );
    return false;
  }

  return true;
}

export function handleEventDrop(info: EventDropArg, setEvents: Dispatch<SetStateAction<CalendarEvent[]>>): void {
  const movedEvent = info.event;
  const newStart = movedEvent.start;
  const newEnd = movedEvent.end;

  if (!newStart) {
    toast("Invalid event drop.");
    info.revert();
    return;
  }

  setEvents((prev: CalendarEvent[]) =>
    prev.map((e: CalendarEvent) =>
      e.id === movedEvent.id
        ? {
            ...e,
            start: newStart.toISOString(),
            end: newEnd?.toISOString() ?? e.end,
          }
        : e
    )
  );
}

