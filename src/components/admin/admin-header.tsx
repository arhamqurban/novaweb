"use client";

import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/portfolio": "Portfolio Manager",
  "/admin/services": "Services Manager",
  "/admin/testimonials": "Testimonials",
  "/admin/blog": "Blog Manager",
  "/admin/contacts": "Contact Messages",
  "/admin/faq": "FAQ Manager",
  "/admin/settings": "Settings",
};

export function AdminHeader({ user }: { user: { name: string; role: string } }) {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "Admin";

  return (
    <header className="h-16 border-b border-[#1a1a1a] bg-[#0a0a0a] flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold text-white">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-[#00e5ff]/20 flex items-center justify-center">
            <span className="text-xs font-semibold text-[#00e5ff]">
              {user.name.charAt(0)}
            </span>
          </div>
          <span className="text-sm text-[#a0a0a0] hidden sm:block">{user.name}</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-[#666] bg-[#1a1a1a] rounded-full px-2.5 py-0.5">
          {user.role}
        </span>
      </div>
    </header>
  );
}
