import prisma from "@/lib/db/prisma";
import { getCurrentUser, apiSuccess, apiError } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
    return apiSuccess({ posts });
  } catch { return apiError("Failed to fetch posts", 500); }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const body = await request.json();
    const post = await prisma.blogPost.create({
      data: { slug: body.slug, title: body.title, description: body.description, content: body.content, category: body.category || "General", tags: body.tags || [], image: body.image || "/images/placeholder.jpg", author: body.author || "Nova Webs", authorRole: body.authorRole || "Team", readingTime: body.readingTime || "3 min read", featured: body.featured || false, status: body.status || "draft", seoTitle: body.seoTitle, seoDescription: body.seoDescription, seoKeywords: body.seoKeywords, publishedAt: body.status === "published" ? new Date() : null },
    });
    return apiSuccess(post, 201);
  } catch (error) { console.error(error); return apiError("Failed to create post", 500); }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Post ID is required");
    const body = await request.json();
    const data: Record<string, unknown> = { ...body };
    if (body.status === "published") data.publishedAt = new Date();
    const post = await prisma.blogPost.update({ where: { id }, data });
    return apiSuccess(post);
  } catch { return apiError("Failed to update post", 500); }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return apiError("Post ID is required");
    await prisma.blogPost.delete({ where: { id } });
    return apiSuccess({ message: "Post deleted" });
  } catch { return apiError("Failed to delete post", 500); }
}
