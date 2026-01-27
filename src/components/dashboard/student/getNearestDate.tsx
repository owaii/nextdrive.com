type CalendarItem = {
  startDate?: string | Date | null;
};

function parseToDate(value: unknown): Date | null {
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  }
  return null;
}

export default function getNearestStartDate(items: CalendarItem[]): Date | null {
  const now = new Date();

  const dates = items
    .map(item => parseToDate(item.startDate))
    .filter((date): date is Date => date !== null && date > now);

  if (dates.length === 0) return null;

  dates.sort((a, b) => a.getTime() - b.getTime());
  return dates[0];
}