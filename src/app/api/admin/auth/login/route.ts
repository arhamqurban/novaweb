import { generateToken, createSession, setAuthCookie, apiSuccess, apiError } from "@/lib/auth";
import prisma from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return apiError("Email and password are required");
    }

    const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    if (!user) {
      return apiError("Invalid email or password", 401);
    }

    if (!user.isActive) {
      return apiError("Account is disabled. Contact support.", 403);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return apiError("Invalid email or password", 401);
    }

    // Delete old sessions for this user
    await prisma.session.deleteMany({ where: { userId: user.id } });

    const token = generateToken(user.id, user.role);
    await createSession(user.id, token);
    await setAuthCookie(token);

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return apiSuccess({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return apiError("Authentication failed. Please try again.", 500);
  }
}
