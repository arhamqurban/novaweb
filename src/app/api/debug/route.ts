import { getCurrentUser, requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json({
        status: "unauthenticated",
        message: "Not logged in. Go to /admin/login first.",
        loginUrl: "/admin/login",
      });
    }

    return Response.json({
      status: "authenticated",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return Response.json({ status: "error", error: String(error) }, { status: 500 });
  }
}
