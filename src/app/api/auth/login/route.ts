import { db } from "@/db/client";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const SECRET = process.env.JWT_SECRET || "your_secret_key"; 
const TOKEN_EXPIRES_IN = 60 * 60; 

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  if (!user) return Response.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await compare(password, user.password);
  if (!valid) return Response.json({ error: "Invalid credentials" }, { status: 401 });

  // Create JWT
  const token = jwt.sign(
    { id: user.id, role: user.role }, // include role
    SECRET,
    { expiresIn: TOKEN_EXPIRES_IN }
  );

  // Set JWT as cookie
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: TOKEN_EXPIRES_IN,
    path: "/", // cookie is available in all routes
    sameSite: "lax",
  });

  return new Response(
    JSON.stringify({
      success: true,
      user: {
        id: user.id,
        role: user.role,
      },
    }),
    {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    }
  );
}
