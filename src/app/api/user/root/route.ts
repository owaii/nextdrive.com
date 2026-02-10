import { db } from "@/db/client";
import { usersTable, calendarTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const token = cookie
      .split(";")
      .find(c => c.trim().startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, SECRET);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    const userId = decoded.id;

    // Get user info
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, userId),
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Get calendar events
    const calendar = await db.query.calendarTable.findMany({
      where: eq(calendarTable.user_id, userId),
    });

    // Return user + calendar
    return new Response(
      JSON.stringify({
        id: user.id,
        fullName: user.full_name,
        mail: user.email,
        password: user.password,
        carType: user.car_type,
        profilePic:  "",
        currH: user.current_hours,
        totalH: user.total_hours,
        calendar: calendar.map((c: any, index: number) => ({
          id: index,
          startDate: c.start_date,
          endDate: c.end_date,
          carType: c.car_type,
        })),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Fetch user error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
