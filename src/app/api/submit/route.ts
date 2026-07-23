// ============================================================
// Nova Webs — Form Submission API Route
// Stores submissions locally + sends email via EmailJS
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface FormPayload {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
  company?: string;
  timeline?: string;
  preferredContact?: string;
  type?: string;
  _honeypot?: string;
}

const SUBMISSIONS_DIR = path.join(process.cwd(), "src", "submissions");

function ensureDir() {
  if (!fs.existsSync(SUBMISSIONS_DIR)) {
    fs.mkdirSync(SUBMISSIONS_DIR, { recursive: true });
  }
}

function generateFilename(type: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const id = Math.random().toString(36).substring(2, 8);
  return `${type}-${timestamp}-${id}.json`;
}

function validatePayload(data: FormPayload): string[] {
  const errors: string[] = [];
  if (data.type !== "newsletter") {
    if (!data.name || data.name.length < 2) errors.push("Name is required");
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("Valid email is required");
    if (!data.phone || data.phone.length < 6) errors.push("Phone number is required");
  } else {
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("Valid email is required");
  }
  return errors;
}

/**
 * Sends email via EmailJS (server-side — no CORS issues)
 */
async function sendEmailJS(data: FormPayload) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.NEXT_PUBLIC_EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    console.log("⚠️ EmailJS not fully configured, skipping email");
    return;
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          name: data.name || "Website Visitor",
          user_email: process.env.NEXT_PUBLIC_EMAIL || "novawebs09@gmail.com",
          email: data.email || "",
          phone: data.phone || "",
          company: data.company || "",
          service: data.service || "",
          budget: data.budget || "",
          timeline: data.timeline || "",
          message: data.message || "Newsletter signup",
          type: data.type || "contact",
        },
      }),
    });

    if (response.ok) {
      console.log("✅ Email sent via EmailJS");
    } else {
      const text = await response.text();
      console.warn(`⚠️ EmailJS send failed (${response.status}): ${text}`);
    }
  } catch (error) {
    console.warn("⚠️ EmailJS error (non-fatal):", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: FormPayload = await request.json();
    const errors = validatePayload(data);

    if (errors.length > 0) {
      return NextResponse.json({ success: false, message: errors.join(". ") }, { status: 400 });
    }

    // 1. Save to JSON
    ensureDir();
    const filename = generateFilename(data.type || "contact");
    const filePath = path.join(SUBMISSIONS_DIR, filename);
    const submission = {
      ...data,
      _honeypot: undefined,
      receivedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || "",
      ip: request.headers.get("x-forwarded-for") || "local",
    };
    fs.writeFileSync(filePath, JSON.stringify(submission, null, 2));
    console.log(`✅ Form saved: ${filename}`);

    // 2. Send email (server-side — no CORS)
    await sendEmailJS(data);

    return NextResponse.json(
      {
        success: true,
        message:
          data.type === "newsletter"
            ? "Successfully subscribed!"
            : "Message sent successfully! We'll get back to you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Form submission error:", error);
    return NextResponse.json({ success: false, message: "Server error. Please try again." }, { status: 500 });
  }
}
