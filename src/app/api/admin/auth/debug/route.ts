import prisma from "@/lib/db/prisma";
import { getAuthToken, verifyToken, apiSuccess, apiError } from "@/lib/auth";

export async function GET() {
  try {
    const token = await getAuthToken();
    if (!token) return apiError("No auth token cookie found", 401);

    const payload = verifyToken(token);
    if (!payload) return apiError("JWT verification failed", 401);

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: { select: { id: true, email: true, role: true } } },
    });

    if (!session) {
      const totalSessions = await prisma.session.count();
      return apiError(`Session not found. Total sessions in DB: ${totalSessions}. Token prefix: ${token.substring(0, 20)}...`, 401);
    }

    if (session.expiresAt < new Date()) {
      return apiError("Session expired", 401);
    }

    return apiSuccess({
      message: "Auth OK",
      user: session.user,
      expiresAt: session.expiresAt,
    });
  } catch (error) {
    return apiError("Debug error: " + String(error), 500);
  }
}
