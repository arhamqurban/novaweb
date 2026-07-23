import { getCurrentUser, apiSuccess, apiError } from "@/lib/auth";
import prisma from "@/lib/db/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);

    // Get recent activity
    const recentActivity = await prisma.auditLog.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return apiSuccess({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
      },
      recentActivity,
    });
  } catch {
    return apiError("Failed to fetch user", 500);
  }
}
