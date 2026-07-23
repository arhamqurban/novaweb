import prisma from "@/lib/db/prisma";
import { apiSuccess, apiError } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (search) {
      where.email = { contains: search, mode: "insensitive" };
    }

    const [subscribers, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.newsletterSubscriber.count({ where }),
    ]);

    return apiSuccess({
      subscribers,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch {
    return apiError("Failed to fetch subscribers", 500);
  }
}
