// ============================================================
// Nova Webs — Public Portfolio API
// Returns published projects for the frontend
// ============================================================

import { NextResponse } from "next/server";
import { getPublishedProjects } from "@/lib/data-store";

export async function GET() {
  const projects = getPublishedProjects();
  // Map to a simpler format for the frontend
  const mapped = projects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    technologies: p.technologies,
    metrics: p.metrics,
    thumbnail: p.thumbnail,
    liveUrl: p.liveUrl,
    caseUrl: `/portfolio/${p.id}`,
    featured: p.featured,
    order: p.order,
  }));
  return NextResponse.json({ projects: mapped });
}
