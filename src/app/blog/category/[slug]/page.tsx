import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/blog-card";
import { generatePageMetadata } from "@/lib/seo";
import { getPostsByCategory, getCategories } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

  return generatePageMetadata({
    title: `${category} Articles`,
    description: `Read our latest articles about ${category} — tips, guides, and insights for Lahore businesses.`,
    path: `/blog/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const posts = getPostsByCategory(slug);
  const category = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

  if (posts.length === 0) {
    notFound();
  }

  return (
    <>
      <section className="relative pt-32 pb-16 bg-bg-primary">
        <div className="container-nova text-center">
          <span className="overline text-accent-primary mb-4 block">Category</span>
          <h1 className="display-lg text-white mb-4">{category}</h1>
          <p className="body-lg text-text-secondary max-w-2xl mx-auto">
            {posts.length} article{posts.length !== 1 ? "s" : ""} in this category
          </p>
        </div>
      </section>

      <section className="bg-bg-primary">
        <div className="container-nova section-padding">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:text-accent-hover transition-colors"
            >
              ← Back to All Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
