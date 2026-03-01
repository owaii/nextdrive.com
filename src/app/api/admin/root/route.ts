import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { usersTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const users = await db
      .select({
        id: usersTable.id,
        full_name: usersTable.full_name,
        email: usersTable.email,
        phone_number: usersTable.phone_number,
        total_hours: usersTable.total_hours,
        current_hours: usersTable.current_hours,
        car_type: usersTable.car_type,
      })
      .from(usersTable)
      .orderBy(desc(usersTable.id));

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}