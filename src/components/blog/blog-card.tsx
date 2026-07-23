import Link from "next/link";
import type { BlogMeta } from "@/types/blog";

interface BlogCardProps {
  post: BlogMeta;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`group rounded-xl border border-border-default bg-surface-default overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-border-lighter hover:shadow-lg ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
      }`}
    >
      {/* Image */}
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <div
          className={`bg-gradient-to-br from-bg-tertiary to-bg-hover transition-transform duration-500 group-hover:scale-105 ${
            featured ? "aspect-video h-full" : "aspect-video"
          }`}
        />
      </Link>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col justify-between">
        <div>
          {/* Meta */}
          <div className="flex items-center gap-3 mb-3">
            <span className="caption text-accent-primary">{post.category}</span>
            <span className="text-xs text-text-muted">•</span>
            <span className="caption text-text-muted">{post.readingTime}</span>
          </div>

          {/* Title */}
          <Link href={`/blog/${post.slug}`}>
            <h3 className="heading-4 text-white mb-2 transition-colors group-hover:text-accent-primary">
              {post.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="body-sm text-text-tertiary mb-4 line-clamp-2">
            {post.description}
          </p>
        </div>

        {/* Author & Date */}
        <div className="flex items-center justify-between pt-4 border-t border-border-default">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-primary/30 to-bg-tertiary flex items-center justify-center text-xs font-semibold text-accent-primary">
              {post.author.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="text-xs font-medium text-text-secondary">{post.author}</p>
              <p className="text-xs text-text-muted">{post.date}</p>
            </div>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="text-xs font-medium text-accent-primary hover:text-accent-hover transition-colors"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
