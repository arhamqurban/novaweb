import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin Dashboard", template: "%s | Nova Webs Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
