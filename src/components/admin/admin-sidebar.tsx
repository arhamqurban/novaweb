"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, FolderKanban, MessageSquare, Star, Wrench,
  FileText, MessageCircle, Settings, LogOut, ChevronLeft,
  ChevronRight, Menu, HelpCircle, Newspaper,
} from "lucide-react";
import { toast } from "sonner";

interface SidebarUser {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
}

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Portfolio", href: "/admin/portfolio", icon: FolderKanban },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "Contacts", href: "/admin/contacts", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ user }: { user: SidebarUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  async function handleLogout() {
    try {
      const res = await fetch("/api/admin/auth/logout", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        toast.success("Logged out");
        router.push("/admin/login");
        router.refresh();
      }
    } catch {
      toast.error("Logout failed");
    }
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#111] border border-[#2a2a2a] rounded-lg p-2 text-white"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen
          bg-[#0a0a0a] border-r border-[#1a1a1a]
          transition-all duration-300
          ${isCollapsed ? "w-16" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#1a1a1a]">
          {!isCollapsed && (
            <Link href="/admin" className="font-heading text-lg font-bold tracking-[0.08em] text-white">
              NOVA <span className="text-[#00e5ff]">ADMIN</span>
            </Link>
          )}
          {isCollapsed && (
            <Link href="/admin" className="font-heading text-lg font-bold text-[#00e5ff] mx-auto">N</Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex text-[#666] hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? "bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20"
                    : "text-[#a0a0a0] hover:bg-[#1a1a1a] hover:text-white border border-transparent"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
              >
                <item.icon size={18} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[#1a1a1a]">
          {!isCollapsed && (
            <div className="px-3 py-2 mb-2">
              <p className="text-xs font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-[#666] truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-[#a0a0a0] hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={18} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </>
  );
}
