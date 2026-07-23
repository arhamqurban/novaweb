import { NextResponse } from "next/server";
import { seedPortfolio } from "@/lib/seed-data";

export async function POST() {
  try {
    seedPortfolio();
    return NextResponse.json({ success: true, message: "Portfolio seeded successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Seed failed" }, { status: 500 });
  }
}
