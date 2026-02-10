import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { calendarTable } from "@/db/schema";
import { verify } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function POST(req: Request) {
  try {
    // Read cookie
    const cookie = req.headers.get("cookie");
    if (!cookie) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify JWT
    let payload;
    try {
      payload = verify(token, SECRET) as { id: number };
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { startDate, endDate } = await req.json();

    const newItem = await db
      .insert(calendarTable)
      .values({
        user_id: payload.id,
        start_date: startDate,
        end_date: endDate,
        car_type: "Manual", // or fetch from DB if needed
      })
      .returning();

    return NextResponse.json(newItem[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
