// ============================================================
// Nova Webs — Data Store (JSON file-based)
// All data is stored as JSON files in the data/ directory.
// This acts as a simple CMS without needing a database.
// ============================================================

import fs from "fs";
import path from "path";

const DATA_DIR = process.env.VERCEL === "1"
  ? "/tmp/data"
  : path.join(process.cwd(), "data");

// ─── Ensure data directory exists ───────────────────────────
function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// ─── Generic CRUD Operations ───────────────────────────────

export function readCollection<T>(name: string): T[] {
  ensureDir();
  const filePath = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

export function writeCollection<T>(name: string, data: T[]): void {
  ensureDir();
  const filePath = path.join(DATA_DIR, `${name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function addItem<T extends { id: string }>(collection: string, item: T): T {
  const items = readCollection<T>(collection);
  items.push(item);
  writeCollection(collection, items);
  return item;
}

export function updateItem<T extends { id: string }>(collection: string, id: string, updates: Partial<T>): T | null {
  const items = readCollection<T>(collection);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updates } as T;
  writeCollection(collection, items);
  return items[index];
}

export function deleteItem<T extends { id: string }>(collection: string, id: string): boolean {
  const items = readCollection<T>(collection);
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) return false;
  writeCollection(collection, filtered);
  return true;
}

export function getItem<T extends { id: string }>(collection: string, id: string): T | null {
  const items = readCollection<T>(collection);
  return items.find((i) => i.id === id) || null;
}

// ─── Portfolio-specific helpers ────────────────────────────

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  clientName: string;
  completionDate: string;
  featured: boolean;
  order: number;
  status: "draft" | "published";
  thumbnail: string;
  screenshots: string[];
  liveUrl: string;
  githubUrl: string;
  caseStudy: string;
  metrics: string;
  createdAt: string;
  updatedAt: string;
}

export function getPortfolioProjects(): PortfolioProject[] {
  return readCollection<PortfolioProject>("portfolio");
}

export function getPublishedProjects(): PortfolioProject[] {
  let projects = readCollection<PortfolioProject>("portfolio");
  
  // Auto-seed if empty (first run on Vercel)
  if (projects.length === 0) {
    try {
      // Dynamic import to avoid circular dependency
      const { seedPortfolio } = require("./seed-data");
      seedPortfolio();
      projects = readCollection<PortfolioProject>("portfolio");
    } catch (e) {
      console.warn("Auto-seed failed:", e);
    }
  }
  
  return projects
    .filter((p) => p.status === "published")
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): PortfolioProject[] {
  return readCollection<PortfolioProject>("portfolio")
    .filter((p) => p.status === "published" && p.featured)
    .sort((a, b) => a.order - b.order);
}

export function savePortfolioProjects(projects: PortfolioProject[]): void {
  writeCollection("portfolio", projects);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}
