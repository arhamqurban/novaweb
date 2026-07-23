import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/blog/blog-card";
import { generatePageMetadata } from "@/lib/seo";
import { getBlogPosts, getCategories, getFeaturedPosts } from "@/lib/blog";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog",
  description: "Insights, tips, and guides about web design, development, SEO, and digital strategy for Lahore businesses.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getBlogPosts();
  const categories = getCategories();
  const featuredPosts = getFeaturedPosts();
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-16 bg-bg-primary">
        <div className="container-nova text-center">
          <span className="overline text-accent-primary mb-4 block">Blog</span>
          <h1 className="display-lg text-white mb-4">Insights & Guides</h1>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            Tips, strategies, and insights to help your business succeed online.
          </p>
        </div>
      </section>

      <section className="bg-bg-primary">
        <div className="container-nova section-padding">
          <div className="grid gap-10 lg:grid-cols-4">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-10">
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div>
                  <h2 className="heading-3 text-white mb-6">Featured</h2>
                  <div className="grid gap-6 md:grid-cols-1">
                    {featuredPosts.map((post) => (
                      <BlogCard key={post.slug} post={post} featured />
                    ))}
                  </div>
                </div>
              )}

              {/* All Posts */}
              <div>
                <h2 className="heading-3 text-white mb-6">Latest Articles</h2>
                {regularPosts.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {regularPosts.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                ) : (
                  <p className="body text-text-tertiary">
                    No articles yet. Check back soon for new content.
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <div className="glass rounded-xl p-6">
                <h3 className="caption text-white mb-4">CATEGORIES</h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/blog/category/${cat.slug}`}
                        className="flex items-center justify-between body-sm text-text-secondary transition-colors hover:text-accent-primary"
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs text-text-muted">({cat.count})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter CTA */}
              <div className="glass-cyan rounded-xl p-6 text-center">
                <h3 className="body-sm font-semibold text-white mb-2">Stay Updated</h3>
                <p className="caption text-text-tertiary mb-4">
                  Get the latest insights delivered to your inbox.
                </p>
                <a
                  href="/contact"
                  className="gradient-cyan inline-block rounded-lg px-5 py-2.5 text-sm font-semibold text-text-inverse transition-all hover:shadow-cyan-md"
                >
                  Subscribe
                </a>
              </div>

              {/* Contact CTA */}
              <div className="rounded-xl bg-accent-subtle p-6 text-center">
                <h3 className="body-sm font-semibold text-white mb-2">Need a Website?</h3>
                <p className="caption text-text-tertiary mb-4">
                  Let&apos;s build something extraordinary together.
                </p>
                <a
                  href="/booking"
                  className="inline-block rounded-lg border border-accent-primary px-5 py-2.5 text-sm font-semibold text-accent-primary transition-all hover:bg-accent-primary hover:text-text-inverse"
                >
                  Book a Call
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
