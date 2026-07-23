import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getRelatedPosts, getBlogPosts } from "@/lib/blog";
import { generatePageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return generatePageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    keywords: post.tags,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);

  return (
    <>
      <article className="bg-bg-primary pt-32">
        <div className="container-nova">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-text-muted" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-accent-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-accent-primary transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-text-secondary">{post.title}</span>
            </nav>
          </div>

          {/* Header */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Link
                href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="caption text-accent-primary"
              >
                {post.category}
              </Link>
              <span className="text-text-muted">•</span>
              <span className="caption text-text-muted">{post.readingTime}</span>
              <span className="text-text-muted">•</span>
              <span className="caption text-text-muted">{post.date}</span>
            </div>

            <h1 className="display-lg text-white mb-6">{post.title}</h1>
            <p className="body-lg text-text-secondary">{post.description}</p>
          </div>

          {/* Featured Image */}
          <div className="aspect-video rounded-xl bg-gradient-to-br from-bg-tertiary to-bg-hover mb-12 max-w-4xl mx-auto" />

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              {/* Render MDX content — use a markdown renderer like rehype or react-markdown in production */}
              <div className="text-text-secondary space-y-6 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-border-default">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-default bg-bg-tertiary px-3 py-1 text-xs font-medium text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-8 p-6 rounded-xl glass flex items-start gap-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-accent-primary/30 to-bg-tertiary flex items-center justify-center text-lg font-bold text-accent-primary shrink-0">
                {post.author.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="body-sm font-semibold text-white">{post.author}</p>
                <p className="caption text-text-tertiary">{post.authorRole}</p>
                <p className="body-sm text-text-secondary mt-2">
                  Nova Webs team member with expertise in digital design and development.
                </p>
              </div>
            </div>

            {/* Social Share */}
            <div className="mt-8 flex items-center justify-between p-4 rounded-xl bg-bg-secondary">
              <span className="caption text-white">Share this article</span>
              <div className="flex gap-3">
                {/* Social share links would go here */}
                <span className="text-xs text-text-muted">Share on social media</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-bg-secondary">
          <div className="container-nova section-padding">
            <h2 className="heading-2 text-white mb-8">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group rounded-xl border border-border-default bg-surface-default p-6 transition-all hover:-translate-y-1 hover:border-border-lighter hover:shadow-lg"
                >
                  <h3 className="heading-4 text-white mb-2 group-hover:text-accent-primary transition-colors">
                    {related.title}
                  </h3>
                  <p className="body-sm text-text-tertiary line-clamp-2">{related.description}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="caption text-accent-primary">{related.category}</span>
                    <span className="text-text-muted">•</span>
                    <span className="caption text-text-muted">{related.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-bg-primary">
        <div className="container-nova section-padding text-center">
          <div className="mx-auto max-w-lg">
            <h2 className="heading-2 text-white mb-4">Enjoyed This Article?</h2>
            <p className="body-lg text-text-secondary mb-6">
              Subscribe to get the latest insights delivered to your inbox.
            </p>
            <a
              href="/contact"
              className="gradient-cyan inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-text-inverse transition-all hover:shadow-cyan-md"
            >
              Subscribe Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
