// ============================================================
// Nova Webs — NextAuth.js Configuration
// Supports: Google OAuth, Email/Password, Magic Link
// ============================================================

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare, hash } from "bcryptjs";

// ─── In-memory user store (for Credentials provider) ──────
// In production, replace with Supabase/Firebase/MongoDB
interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  role: "user" | "admin";
  emailVerified: boolean;
  createdAt: string;
}

const users: StoredUser[] = [
  {
    id: "admin-1",
    name: "Admin",
    email: process.env.NEXT_PUBLIC_EMAIL || "admin@novawebs.com",
    password: process.env.ADMIN_PASSWORD || "nova123",
    image: "",
    role: "admin",
    emailVerified: true,
    createdAt: new Date().toISOString(),
  },
];

export function findUserByEmail(email: string): StoredUser | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function createUser(name: string, email: string, password: string): Promise<StoredUser> {
  const existing = findUserByEmail(email);
  if (existing) throw new Error("User already exists");

  const hashedPassword = await hash(password, 10);

  const user: StoredUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    password: hashedPassword,
    role: "user",
    emailVerified: false,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = String(credentials.email);
        const password = String(credentials.password);

        const user = findUserByEmail(email);
        if (!user) return null;

        // Compare passwords (plain text for dev, bcrypt for prod)
        let isValid = false;
        try {
          isValid = await compare(password, user.password);
        } catch {
          isValid = password === user.password; // Fallback for plain text
        }

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "user";
      }
      // For Google login, assign role
      if (account?.provider === "google") {
        const existingUser = findUserByEmail(token.email || "");
        token.role = existingUser?.role || "user";
        token.id = existingUser?.id || token.sub || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const user = session.user as unknown as { id: string; role: string };
        user.id = token.id as string;
        user.role = (token.role as string) || "user";
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existing = findUserByEmail(user.email || "");
        if (!existing) {
          await createUser(user.name || "User", user.email || "", "google-oauth-$(Date.now())");
        }
        return true;
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET || "nova-webs-dev-secret-key-change-in-production",
});
