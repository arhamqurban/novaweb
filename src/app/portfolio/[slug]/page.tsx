import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Globe, Calendar, BarChart3 } from "lucide-react";
import { getSiteConfig, getPortfolio, getPortfolioProject } from "@/lib/content";
import { generatePageMetadata } from "@/lib/seo";
import { FinalCTASection } from "@/sections/final-cta-section";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const portfolio = getPortfolio();
  return portfolio.projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) return {};

  return generatePageMetadata({
    title: project.title,
    description: project.description,
    path: `/portfolio/${slug}`,
    keywords: [
      project.title,
      project.category,
      project.industry,
      "web design portfolio",
      "Nova Webs project",
    ],
    ogImage: project.image,
  });
}

export default async function PortfolioProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();

  const portfolio = getPortfolio();
  const otherProjects = portfolio.projects
    .filter((p) => p.id !== slug)
    .slice(0, 3);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 bg-bg-primary overflow-hidden">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-accent-primary/5 blur-[120px]" />
        </div>

        <div className="container-nova relative z-10">
          {/* Back link */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-accent-primary transition-colors mb-8 group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>

          <div className="grid gap-12 lg:grid-cols-5">
            {/* Project Info */}
            <div className="lg:col-span-3">
              <span className="overline text-accent-primary mb-4 block">
                {project.category}
              </span>
              <h1 className="display-lg text-white mb-4">{project.title}</h1>
              <p className="body-lg text-text-secondary max-w-xl mb-8">
                {project.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <BarChart3 size={16} className="text-accent-primary" />
                  <span className="text-sm font-semibold text-white">{project.metrics}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-accent-primary" />
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent-primary hover:text-accent-hover transition-colors underline underline-offset-2"
                  >
                    Visit Live Site
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-accent-primary" />
                  <span className="text-sm text-text-secondary">{project.industry}</span>
                </div>
              </div>
            </div>

            {/* Preview Image */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-bg-tertiary border border-border-default">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-bg-tertiary" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-accent-primary px-5 py-3 text-sm font-semibold text-text-inverse transition-all hover:shadow-cyan-md hover:-translate-y-0.5"
                  >
                    <ExternalLink size={16} />
                    Visit Live Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="bg-bg-secondary">
        <div className="container-nova section-padding">
          <div className="max-w-3xl">
            <span className="overline text-accent-primary mb-4 block">Tech Stack</span>
            <h2 className="heading-2 text-white mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full border border-border-light bg-bg-tertiary px-4 py-2 text-sm font-medium text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Other Projects ── */}
      {otherProjects.length > 0 && (
        <section className="bg-bg-primary">
          <div className="container-nova section-padding">
            <span className="overline text-accent-primary mb-4 block">More Work</span>
            <h2 className="heading-2 text-white mb-8">Other Projects</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {otherProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/portfolio/${p.id}`}
                  className="group rounded-xl border border-border-default bg-bg-secondary p-6 transition-all hover:-translate-y-1 hover:border-accent-primary/30 hover:shadow-cyan-sm"
                >
                  <span className="caption text-accent-primary mb-2 block">{p.category}</span>
                  <h3 className="heading-4 text-white mb-2 group-hover:text-accent-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="body-sm text-text-tertiary line-clamp-2">{p.description}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-xs font-semibold text-accent-primary">{p.metrics}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTASection contact={getSiteConfig().contact} />
    </>
  );
}
