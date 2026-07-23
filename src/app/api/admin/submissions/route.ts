// ============================================================
// Nova Webs — Admin: Submissions API
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBMISSIONS_DIR = process.env.VERCEL
  ? path.join("/tmp", "submissions")
  : path.join(process.cwd(), "src", "submissions");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    if (!fs.existsSync(SUBMISSIONS_DIR)) {
      return NextResponse.json({ submissions: [], total: 0, page, limit });
    }

    let files = fs.readdirSync(SUBMISSIONS_DIR).filter(f => f.endsWith(".json"));

    // Filter by type
    if (type !== "all") {
      files = files.filter(f => f.startsWith(`${type}-`));
    }

    // Sort by date (newest first)
    files.sort().reverse();

    const total = files.length;
    const start = (page - 1) * limit;
    const paginatedFiles = files.slice(start, start + limit);

    const submissions = paginatedFiles.map(filename => {
      const filePath = path.join(SUBMISSIONS_DIR, filename);
      const content = fs.readFileSync(filePath, "utf-8");
      try {
        return { ...JSON.parse(content), _filename: filename };
      } catch {
        return { _filename: filename, error: "Invalid JSON" };
      }
    });

    // Stats
    const stats = {
      total: files.length,
      contact: files.filter(f => f.startsWith("contact-")).length,
      booking: files.filter(f => f.startsWith("booking-")).length,
      newsletter: files.filter(f => f.startsWith("newsletter-")).length,
    };

    return NextResponse.json({ submissions, stats, total, page, limit });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read submissions" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { filename } = await request.json();
    const filePath = path.join(SUBMISSIONS_DIR, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "File not found" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
