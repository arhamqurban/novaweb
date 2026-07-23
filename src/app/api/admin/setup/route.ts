import prisma from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { apiSuccess, apiError } from "@/lib/auth";

export async function GET() {
  try {
    let admin = await prisma.user.findUnique({ where: { email: "admin@novawebs.com" } });

    if (!admin) {
      const hashedPassword = await bcrypt.hash("ChangeMe123!", 12);
      admin = await prisma.user.create({
        data: {
          name: "Admin",
          email: "admin@novawebs.com",
          password: hashedPassword,
          role: "admin",
        },
      });
      console.log("✅ Auto-created admin account");
    }

    return apiSuccess({
      message: "Setup complete",
      admin: { email: admin.email, exists: true },
      loginUrl: "/admin/login",
    });
  } catch (error) {
    console.error("Setup error:", error);
    return apiError("Setup failed: " + String(error), 500);
  }
}
