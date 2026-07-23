import { getAuthToken, deleteSession, clearAuthCookie, apiSuccess, apiError } from "@/lib/auth";

export async function POST() {
  try {
    const token = await getAuthToken();
    if (token) {
      await deleteSession(token);
    }
    await clearAuthCookie();
    return apiSuccess({ message: "Logged out successfully" });
  } catch {
    return apiError("Logout failed", 500);
  }
}
