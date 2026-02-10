import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let decoded: any;
    try {
      decoded = jwt.verify(token, SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    const { fullName, mail, password } = await req.json();

    const updates: any = {};
    if (fullName) updates.full_name = fullName;
    if (mail) updates.email = mail;
    if (password) updates.password = await hash(password, 10);

    const updatedUser = await db
      .update(usersTable)
      .set(updates)
      .where(eq(usersTable.id, userId))
      .returning();

    return NextResponse.json({ success: true, user: updatedUser[0] });
  } catch (err) {
    console.error("Update user error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
