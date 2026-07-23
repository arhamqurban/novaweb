import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogMeta, BlogCategory } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Reads all blog post slugs from the content directory.
 */
export function getBlogSlugs(): string[] {
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Reads a single blog post by slug, returning full content and metadata.
 */
export function getBlogPost(slug: string): BlogPost | null {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
      authorRole: data.authorRole,
      authorImage: data.authorImage,
      category: data.category,
      tags: data.tags || [],
      image: data.image,
      readingTime: data.readingTime,
      featured: data.featured || false,
      content,
    };
  } catch {
    return null;
  }
}

/**
 * Gets metadata for all blog posts (without content body).
 * Sorted by date descending.
 */
export function getBlogPosts(): BlogMeta[] {
  const slugs = getBlogSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getBlogPost(slug);
      if (!post) return null;
      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        author: post.author,
        authorRole: post.authorRole,
        authorImage: post.authorImage,
        category: post.category,
        tags: post.tags,
        image: post.image,
        readingTime: post.readingTime,
        featured: post.featured,
      };
    })
    .filter((p): p is BlogMeta => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Gets only featured blog posts.
 */
export function getFeaturedPosts(): BlogMeta[] {
  return getBlogPosts().filter((p) => p.featured);
}

/**
 * Gets posts by category.
 */
export function getPostsByCategory(category: string): BlogMeta[] {
  return getBlogPosts().filter(
    (p) => p.category.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase()
  );
}

/**
 * Gets all categories with post counts.
 */
export function getCategories(): BlogCategory[] {
  const posts = getBlogPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const slug = post.category.toLowerCase().replace(/\s+/g, "-");
    categoryMap.set(slug, (categoryMap.get(slug) || 0) + 1);
  });

  return Array.from(categoryMap.entries()).map(([slug, count]) => ({
    name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
    slug,
    count,
  }));
}

/**
 * Gets related posts (same category, excluding current post).
 */
export function getRelatedPosts(currentSlug: string, limit = 3): BlogMeta[] {
  const current = getBlogPost(currentSlug);
  if (!current) return [];

  return getBlogPosts()
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit);
}

/**
 * Searches blog posts by title, description, or tags.
 */
export function searchPosts(query: string): BlogMeta[] {
  const lower = query.toLowerCase();
  return getBlogPosts().filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.tags.some((t) => t.toLowerCase().includes(lower))
  );
}
