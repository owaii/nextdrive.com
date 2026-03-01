import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, SECRET);

    const { fullName, mail, password } = await req.json();

    const updates: any = {};

    if (fullName) updates.full_name = fullName;
    if (mail) updates.email = mail;
    if (password) {
      updates.password = await hash(password, 10);
    }

    await db
      .update(usersTable)
      .set(updates)
      .where(eq(usersTable.id, decoded.id)); // 🔥 IMPORTANT

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}