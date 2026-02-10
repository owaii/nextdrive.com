import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { calendarTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { verify } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function DELETE(req: Request) {
  try {
    // Read the token from cookies
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

    const { id } = await req.json();

    await db
      .delete(calendarTable)
      .where(
        and(
          eq(calendarTable.id, id),
          eq(calendarTable.user_id, payload.id)
        )
      );

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
