// ============================================================
// Nova Webs — Admin: Submissions API
// Reads from /tmp on Vercel, local disk in dev, falls back to empty
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBMISSIONS_DIR = process.env.VERCEL === "1"
  ? "/tmp/submissions"
  : path.join(process.cwd(), "src", "submissions");

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    const entries: Array<Record<string, unknown>> = [];

    if (fs.existsSync(SUBMISSIONS_DIR)) {
      let files = fs.readdirSync(SUBMISSIONS_DIR).filter(f => f.endsWith(".json"));

      if (type !== "all") {
        files = files.filter(f => f.startsWith(`${type}-`));
      }

      files.sort().reverse();

      const start = (page - 1) * limit;
      const paginatedFiles = files.slice(start, start + limit);

      for (const filename of paginatedFiles) {
        try {
          const content = fs.readFileSync(path.join(SUBMISSIONS_DIR, filename), "utf-8");
          entries.push({ ...JSON.parse(content), _filename: filename });
        } catch {
          entries.push({ _filename: filename, error: "Could not parse" });
        }
      }
    }

    return NextResponse.json({
      submissions: entries,
      stats: {
        total: entries.length,
        contact: entries.filter(e => String(e.type || "") === "contact" || !e.type).length,
        booking: entries.filter(e => String(e.type || "") === "booking").length,
        newsletter: entries.filter(e => String(e.type || "") === "newsletter").length,
      },
      total: entries.length,
      page,
      limit,
    });
  } catch (error) {
    console.error("Failed to read submissions:", error);
    return NextResponse.json({ submissions: [], stats: { total: 0, contact: 0, booking: 0, newsletter: 0 }, total: 0, page, limit });
  }
}

export async function DELETE(request: NextRequest) {
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
