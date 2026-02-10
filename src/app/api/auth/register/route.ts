import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { usersTable } from "@/db/schema";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const SECRET = process.env.JWT_SECRET || "your_secret_key";
const TOKEN_EXPIRES_IN = 60 * 60; // 1 hour

export async function POST(req: Request) {
  try {
    const { name, surname, email, phone_number, password } = await req.json();
    const full_name = `${name} ${surname}`;

    if (!name || !surname || !email || !phone_number || !password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 409 });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Insert user into DB
    await db.insert(usersTable).values({
      full_name,
      phone_number,
      email,
      password: hashedPassword,
      car_type: "Manual"
    });

    // Fetch the user after insert
    const newUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (!newUser) throw new Error("User creation failed");

    // Create JWT
    const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: TOKEN_EXPIRES_IN });

    // Set JWT as cookie
    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: TOKEN_EXPIRES_IN,
      path: "/",
      sameSite: "lax",
    });

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: newUser.id,
        },
      }),
      {
        status: 201,
        headers: {
          "Set-Cookie": cookie,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
