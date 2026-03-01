import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { calendarTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const result = await db
    .select({
      id: calendarTable.id,
      userId: calendarTable.user_id,
      start: calendarTable.start_date,
      end: calendarTable.end_date,
      title: usersTable.place,
    })
    .from(calendarTable)
    .leftJoin(usersTable, eq(calendarTable.user_id, usersTable.id));

  const formatted = result.map(event => ({
    ...event,
    id: String(event.id),
  }));

  return NextResponse.json(formatted);
}