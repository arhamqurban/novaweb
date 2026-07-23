// ============================================================
// Nova Webs — Form Submission Service
// Sends data to local API which saves JSON + sends EmailJS
// ============================================================

export interface FormData {
  name?: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
  company?: string;
  timeline?: string;
  preferredContact?: string;
  type?: "contact" | "booking" | "newsletter";
  _honeypot?: string;
}

export interface FormResult {
  success: boolean;
  message: string;
}

/**
 * Detects bot submissions via honeypot field.
 */
function isSpam(data: FormData): boolean {
  return !!data._honeypot;
}

/**
 * Submits form data to the local API route.
 * The API saves JSON + sends EmailJS email (server-side).
 */
async function submitToAPI(data: FormData): Promise<FormResult> {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || `Server error: ${response.status}`);
  }

  return { success: true, message: result.message };
}

/**
 * Main form submission function.
 * Flow: Spam check → Submit to API (saves JSON + sends email)
 */
export async function submitForm(data: FormData): Promise<FormResult> {
  // Spam check
  if (isSpam(data)) {
    return { success: true, message: "Message sent successfully!" };
  }

  // Log submission
  console.log(`📤 Submitting form (${data.type || "contact"}):`, {
    name: data.name,
    email: data.email,
  });

  try {
    const result = await submitToAPI(data);
    console.log(`✅ Form submitted successfully`);
    return result;
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Submission failed";
    console.error("❌ Form submission error:", msg);
    throw new Error(msg);
  }
}
