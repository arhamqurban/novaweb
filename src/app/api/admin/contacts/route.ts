import prisma from "@/lib/db/prisma";
import { apiSuccess, apiError } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all"; // contact | quote | consultation | all
    const isRead = searchParams.get("read"); // true | false | null
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (type !== "all") where.type = type;
    if (isRead === "true") where.isRead = true;
    if (isRead === "false") where.isRead = false;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactMessage.count({ where }),
    ]);

    return apiSuccess({
      messages,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch {
    return apiError("Failed to fetch contacts", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, isRead } = await request.json();
    const message = await prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    });
    return apiSuccess(message);
  } catch {
    return apiError("Failed to update contact", 500);
  }
}
