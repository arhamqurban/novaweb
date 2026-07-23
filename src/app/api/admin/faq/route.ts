import prisma from "@/lib/db/prisma";
import { getCurrentUser, apiSuccess, apiError } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const faqs = await prisma.fAQ.findMany({ orderBy: { order: "asc" } });
    return apiSuccess({ faqs });
  } catch { return apiError("Failed to fetch FAQs", 500); }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const body = await request.json();
    const faq = await prisma.fAQ.create({ data: { question: body.question, answer: body.answer, category: body.category || "general", order: body.order || 1 } });
    return apiSuccess(faq, 201);
  } catch { return apiError("Failed to create FAQ", 500); }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return apiError("FAQ ID is required");
    const body = await request.json();
    const faq = await prisma.fAQ.update({ where: { id }, data: body });
    return apiSuccess(faq);
  } catch { return apiError("Failed to update FAQ", 500); }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return apiError("FAQ ID is required");
    await prisma.fAQ.delete({ where: { id } });
    return apiSuccess({ message: "FAQ deleted" });
  } catch { return apiError("Failed to delete FAQ", 500); }
}
