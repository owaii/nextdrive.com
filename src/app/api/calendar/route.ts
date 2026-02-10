import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { calendarTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verify } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function GET(req: Request) {
  try {
    // Extract token from cookies
    const cookie = req.headers.get("cookie");
    if (!cookie) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify token
    let payload;
    try {
      payload = verify(token, SECRET) as { id: number };
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user-specific calendar items
    const items = await db
      .select()
      .from(calendarTable)
      .where(eq(calendarTable.user_id, payload.id));

    // Format items for the frontend
    const formatted = items.map((item) => ({
      id: item.id,
      startDate: item.start_date,
      endDate: item.end_date,
      carType: item.car_type,
    }));

    return NextResponse.json(formatted);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
