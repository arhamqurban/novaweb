import prisma from "@/lib/db/prisma";
import { getCurrentUser, apiSuccess, apiError } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);

    const projects = await prisma.portfolioProject.findMany({
      orderBy: { order: "asc" },
    });
    return apiSuccess({ projects });
  } catch {
    return apiError("Failed to fetch projects", 500);
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);

    const body = await request.json();
    const project = await prisma.portfolioProject.create({
      data: {
        slug: body.slug,
        title: body.title,
        category: body.category,
        description: body.description,
        image: body.image || "/images/placeholder.jpg",
        metrics: body.metrics,
        technologies: body.technologies || [],
        industry: body.industry,
        liveUrl: body.liveUrl,
        featured: body.featured || false,
        status: body.status || "draft",
        order: body.order || 1,
      },
    });

    await prisma.auditLog.create({
      data: { userId: user.id, action: "create", entity: "PortfolioProject", entityId: project.id },
    });

    return apiSuccess(project, 201);
  } catch (error) {
    console.error("Create project error:", error);
    return apiError("Failed to create project", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Project ID is required");

    const body = await request.json();
    const project = await prisma.portfolioProject.update({
      where: { id },
      data: {
        slug: body.slug,
        title: body.title,
        category: body.category,
        description: body.description,
        image: body.image,
        metrics: body.metrics,
        technologies: body.technologies,
        industry: body.industry,
        liveUrl: body.liveUrl,
        featured: body.featured,
        status: body.status,
        order: body.order,
      },
    });

    await prisma.auditLog.create({
      data: { userId: user.id, action: "update", entity: "PortfolioProject", entityId: id },
    });

    return apiSuccess(project);
  } catch {
    return apiError("Failed to update project", 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Project ID is required");

    await prisma.portfolioProject.delete({ where: { id } });

    await prisma.auditLog.create({
      data: { userId: user.id, action: "delete", entity: "PortfolioProject", entityId: id },
    });

    return apiSuccess({ message: "Project deleted" });
  } catch {
    return apiError("Failed to delete project", 500);
  }
}
