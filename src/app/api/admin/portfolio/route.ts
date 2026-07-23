// ============================================================
// Nova Webs — Admin Portfolio CRUD API
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import {
  getPortfolioProjects,
  savePortfolioProjects,
  generateId,
  type PortfolioProject,
} from "@/lib/data-store";

export async function GET() {
  const projects = getPortfolioProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, project, id } = body;

    switch (action) {
      case "create": {
        const newProject: PortfolioProject = {
          id: generateId(),
          title: project.title || "Untitled",
          category: project.category || "",
          description: project.description || "",
          longDescription: project.longDescription || "",
          technologies: project.technologies || [],
          clientName: project.clientName || "",
          completionDate: project.completionDate || "",
          featured: project.featured || false,
          order: project.order || 0,
          status: project.status || "draft",
          thumbnail: project.thumbnail || "",
          screenshots: project.screenshots || [],
          liveUrl: project.liveUrl || "",
          githubUrl: project.githubUrl || "",
          caseStudy: project.caseStudy || "",
          metrics: project.metrics || "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const projects = getPortfolioProjects();
        projects.push(newProject);
        savePortfolioProjects(projects);
        return NextResponse.json({ success: true, project: newProject });
      }

      case "update": {
        const projects = getPortfolioProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index === -1) {
          return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        }
        projects[index] = {
          ...projects[index],
          ...project,
          updatedAt: new Date().toISOString(),
        };
        savePortfolioProjects(projects);
        return NextResponse.json({ success: true, project: projects[index] });
      }

      case "delete": {
        const existing = getPortfolioProjects();
        const filtered = existing.filter((p) => p.id !== id);
        if (filtered.length === existing.length) {
          return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        }
        savePortfolioProjects(filtered);
        return NextResponse.json({ success: true });
      }

      case "duplicate": {
        const projects = getPortfolioProjects();
        const original = projects.find((p) => p.id === id);
        if (!original) {
          return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        }
        const duplicate: PortfolioProject = {
          ...original,
          id: generateId(),
          title: `${original.title} (Copy)`,
          status: "draft",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        projects.push(duplicate);
        savePortfolioProjects(projects);
        return NextResponse.json({ success: true, project: duplicate });
      }

      case "reorder": {
        const { orderedIds } = body;
        const current = getPortfolioProjects();
        const reordered = orderedIds.map((oid: string, idx: number) => {
          const found = current.find((p) => p.id === oid);
          if (found) return { ...found, order: idx };
          return null;
        }).filter(Boolean) as PortfolioProject[];
        // Add any items not in orderedIds at the end
        const missing = current.filter((p) => !orderedIds.includes(p.id));
        const all = [...reordered, ...missing];
        savePortfolioProjects(all);
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Portfolio API error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
