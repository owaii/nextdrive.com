import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;
const SALT_ROUNDS = 10;

interface JwtPayload {
  id: number;
  role: string;
}

export async function PATCH(req: NextRequest) {
  try {
    // 1️⃣ Check admin auth token
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, SECRET) as JwtPayload;
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin only" }, { status: 403 });
    }

    // 2️⃣ Parse request body
    const body = await req.json();
    const { userId, newPassword } = body;

    if (!userId || !newPassword) {
      return NextResponse.json(
        { error: "userId and newPassword required" },
        { status: 400 }
      );
    }

    // 3️⃣ Hash the new password
    const hashedPassword = await hash(newPassword, SALT_ROUNDS);

    // 4️⃣ Update only the specified user's password
    const updatedUser = await db
      .update(usersTable)
      .set({ password: hashedPassword })
      .where(eq(usersTable.id, userId))
      .returning();

    if (!updatedUser.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 5️⃣ Success response
    return NextResponse.json({
      success: true,
      message: `Password for user ID ${userId} updated successfully`,
    });
  } catch (err) {
    console.error("Admin password change error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}