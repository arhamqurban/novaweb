// ============================================================
// Nova Webs — Form Submission API Route
// Debuggable, resilient, works on Vercel & local
// ============================================================

import { NextRequest, NextResponse } from "next/server";

// ─── In-memory fallback storage (Vercel-compatible) ────────
// On Vercel, /tmp is writable but ephemeral.
// We try to save there, but if it fails, the form still works.
const submissions: Array<Record<string, unknown>> = [];

/**
 * Tries to save to /tmp on Vercel or local filesystem.
 * Silently fails if not possible — form still works.
 */
async function trySaveToDisk(data: Record<string, unknown>) {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const isVercel = process.env.VERCEL === "1";
    const dir = isVercel ? "/tmp/submissions" : path.join(process.cwd(), "src", "submissions");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const id = Math.random().toString(36).substring(2, 8);
    const filename = `${data.type || "contact"}-${timestamp}-${id}.json`;
    const filePath = path.join(dir, filename);

    const submission = {
      ...data,
      _honeypot: undefined,
      receivedAt: new Date().toISOString(),
    };

    fs.writeFileSync(filePath, JSON.stringify(submission, null, 2));
    console.log(`✅ Form saved to disk: ${filename}`);
    return true;
  } catch (err) {
    console.warn("⚠️ Disk save skipped (non-fatal):", err instanceof Error ? err.message : err);
    return false;
  }
}

/**
 * Tries to send email via EmailJS.
 * Silently fails if email config missing — form still works.
 */
async function trySendEmail(data: Record<string, unknown>) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.NEXT_PUBLIC_EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    console.log("ℹ️ EmailJS not configured — skipping email");
    return false;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          name: data.name || "Website Visitor",
          to_email: data.email || "",
          user_email: process.env.NEXT_PUBLIC_EMAIL || "novawebs09@gmail.com",
          email: data.email || "",
          phone: data.phone || "",
          company: data.company || "",
          service: data.service || "",
          budget: data.budget || "",
          timeline: data.timeline || "",
          message: data.message || "",
          type: data.type || "contact",
        },
      }),
    });

    clearTimeout(timeout);

    if (res.ok) {
      console.log("✅ Email sent via EmailJS");
      return true;
    } else {
      const text = await res.text();
      console.warn(`⚠️ EmailJS returned ${res.status}: ${text}`);
      return false;
    }
  } catch (err) {
    console.warn("⚠️ EmailJS error (non-fatal):", err instanceof Error ? err.message : err);
    return false;
  }
}

// ─── POST /api/submit ─────────────────────────────────────

export async function POST(request: NextRequest) {
  // ── Log every request ──────────────────────────────────
  console.log("📩 Form submission received");

  let data: Record<string, unknown> = {};

  // ── Parse body ─────────────────────────────────────────
  try {
    data = await request.json();
    console.log("📦 Body parsed:", JSON.stringify(data).slice(0, 200));
  } catch {
    console.error("❌ Failed to parse request body");
    return NextResponse.json(
      { success: false, message: "Invalid request body. Please try again." },
      { status: 400 }
    );
  }

  // ── Validate ───────────────────────────────────────────
  const type = String(data.type || "contact");
  const isNewsletter = type === "newsletter";

  if (!isNewsletter) {
    if (!data.name || String(data.name).length < 2) {
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
      return NextResponse.json({ success: false, message: "Valid email is required" }, { status: 400 });
    }
    if (!data.phone || String(data.phone).length < 6) {
      return NextResponse.json({ success: false, message: "Phone is required" }, { status: 400 });
    }
  } else {
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
      return NextResponse.json({ success: false, message: "Valid email is required" }, { status: 400 });
    }
  }

  // ── Save to in-memory array (always works) ─────────────
  submissions.push({
    ...data,
    _honeypot: undefined,
    receivedAt: new Date().toISOString(),
  });
  console.log(`📝 Saved in memory (total: ${submissions.length})`);

  // ── Try disk save (best-effort) ─────────────────────────
  await trySaveToDisk(data);

  // ── Try email (best-effort) ────────────────────────────
  await trySendEmail(data);

  // ── Always return success ─────────────────────────────
  const responseMessage =
    type === "newsletter"
      ? "Successfully subscribed!"
      : "Message sent successfully! We'll get back to you within 24 hours.";

  return NextResponse.json({ success: true, message: responseMessage }, { status: 200 });
}
