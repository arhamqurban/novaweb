import prisma from "@/lib/db/prisma";
import { getCurrentUser, apiSuccess, apiError } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    return apiSuccess({ services });
  } catch {
    return apiError("Failed to fetch services", 500);
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const body = await request.json();
    const service = await prisma.service.create({
      data: { slug: body.slug, title: body.title, description: body.description, icon: body.icon, features: body.features || [], href: body.href, order: body.order || 1 },
    });
    await prisma.auditLog.create({ data: { userId: user.id, action: "create", entity: "Service", entityId: service.id } });
    return apiSuccess(service, 201);
  } catch { return apiError("Failed to create service", 500); }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Service ID is required");
    const body = await request.json();
    const service = await prisma.service.update({ where: { id }, data: body });
    return apiSuccess(service);
  } catch { return apiError("Failed to update service", 500); }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Service ID is required");
    await prisma.service.delete({ where: { id } });
    return apiSuccess({ message: "Service deleted" });
  } catch { return apiError("Failed to delete service", 500); }
}
