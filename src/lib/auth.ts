// ============================================================
// Nova Webs — Auth Utilities
// JWT-based authentication with bcryptjs
// ============================================================

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "nova-webs-jwt-secret-change-in-production";
const JWT_EXPIRES_IN = "7d";

// ─── Password Hashing ──────────────────────────────────────
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// ─── JWT Token Management ─────────────────────────────────
export function generateToken(userId: string, role: string): string {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): { userId: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
  } catch {
    return null;
  }
}

// ─── Session Management ───────────────────────────────────
export async function createSession(userId: string, token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await prisma.session.create({
    data: { userId, token, expiresAt },
  });
}

export async function deleteSession(token: string) {
  await prisma.session.deleteMany({ where: { token } });
}

// ─── Cookie Management ────────────────────────────────────
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("nova-auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("nova-auth-token");
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("nova-auth-token")?.value || null;
}

// ─── Get Current User ─────────────────────────────────────
export async function getCurrentUser() {
  const token = await getAuthToken();
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    await deleteSession(token);
    return null;
  }

  return session.user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !["admin", "editor", "manager"].includes(user.role)) {
    throw new Error("Unauthorized");
  }
  return user;
}

// ─── API Response Helpers ─────────────────────────────────
// IMPORTANT: Use NextResponse.json() instead of Response.json()
// to ensure cookies set via cookies() API are included
export function apiSuccess(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}
