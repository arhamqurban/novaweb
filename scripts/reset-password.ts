import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Delete old sessions
  await prisma.session.deleteMany();
  console.log("✓ Old sessions deleted");

  // Reset password
  const newHash = await bcrypt.hash("nova123", 12);
  const user = await prisma.user.update({
    where: { email: "novawebs09@gmail.com" },
    data: { password: newHash },
  });

  console.log("✓ Password reset complete");
  console.log("  Email:", user.email);
  console.log("  Password: nova123");
  console.log("  Hash:", newHash.substring(0, 30) + "...");

  // Verify
  const verify = await bcrypt.compare("nova123", newHash);
  console.log("  Verification:", verify ? "PASSED" : "FAILED");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("Error:", e);
  process.exit(1);
});
