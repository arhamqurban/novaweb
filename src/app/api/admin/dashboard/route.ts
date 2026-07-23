import prisma from "@/lib/db/prisma";
import { getCurrentUser, apiSuccess, apiError } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalProjects,
      totalServices,
      totalTestimonials,
      totalMessages,
      totalSubscribers,
      totalBlogPosts,
      unreadMessages,
      recentMessages,
      recentActivity,
      publishedPosts,
    ] = await Promise.all([
      prisma.portfolioProject.count(),
      prisma.service.count(),
      prisma.testimonial.count(),
      prisma.contactMessage.count(),
      prisma.newsletterSubscriber.count(),
      prisma.blogPost.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { user: { select: { name: true, email: true } } },
      }),
      prisma.blogPost.count({ where: { status: "published" } }),
    ]);

    return apiSuccess({
      overview: {
        totalProjects,
        totalServices,
        totalTestimonials,
        totalMessages,
        totalSubscribers,
        totalBlogPosts,
        unreadMessages,
        publishedPosts,
      },
      recentMessages,
      recentActivity,
    });
  } catch {
    return apiError("Failed to fetch dashboard data", 500);
  }
}
