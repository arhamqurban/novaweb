import prisma from "@/lib/db/prisma";
import { getCurrentUser, apiSuccess, apiError } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    return apiSuccess({ testimonials });
  } catch { return apiError("Failed to fetch testimonials", 500); }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const body = await request.json();
    const testimonial = await prisma.testimonial.create({
      data: { name: body.name, role: body.role, company: body.company, quote: body.quote, avatar: body.avatar, rating: body.rating || 5, metrics: body.metrics, project: body.project, featured: body.featured || false, isVisible: body.isVisible ?? true, order: body.order || 1 },
    });
    return apiSuccess(testimonial, 201);
  } catch { return apiError("Failed to create testimonial", 500); }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Testimonial ID is required");
    const body = await request.json();
    const testimonial = await prisma.testimonial.update({ where: { id }, data: body });
    return apiSuccess(testimonial);
  } catch { return apiError("Failed to update testimonial", 500); }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Testimonial ID is required");
    await prisma.testimonial.delete({ where: { id } });
    return apiSuccess({ message: "Testimonial deleted" });
  } catch { return apiError("Failed to delete testimonial", 500); }
}
