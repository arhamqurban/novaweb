import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/auth-config";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ success: false, error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const existing = findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ success: false, error: "Email already registered" }, { status: 400 });
    }

    await createUser(name, email, password);

    return NextResponse.json({ success: true, message: "Account created" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Registration failed" }, { status: 500 });
  }
}
