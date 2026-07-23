import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log("Users found:", users.length);

  if (users.length > 0) {
    const user = users[0];
    console.log("Email:", user.email);
    console.log("Hash preview:", user.password.substring(0, 30) + "...");

    const match1 = await bcrypt.compare("nova123", user.password);
    console.log("Match with 'nova123':", match1);

    const match2 = await bcrypt.compare("avouch.org", user.password);
    console.log("Match with 'avouch.org':", match2);

    // Try to find the issue - maybe there's a whitespace issue
    console.log("Password length in DB:", user.password.length);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("Error:", e);
  process.exit(1);
});
