"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Mail,
  FileText,
  Briefcase,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Contacts", href: "/admin/contacts", icon: MessageSquare },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
  { label: "Services", href: "/admin/services", icon: Settings },
  { label: "Testimonials", href: "/admin/testimonials", icon: HelpCircle },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = localStorage.getItem("nova_admin");
    if (auth !== "true") {
      router.replace("/admin/login");
    } else {
      setIsAuth(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("nova_admin");
    router.push("/admin/login");
  };

  if (isAuth === null) {
    return <div className="min-h-screen bg-[#0a0a0a]" />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 bg-[#111] border-r border-[#2a2a2a] flex flex-col shrink-0 overflow-hidden`}>
        <div className="p-5 border-b border-[#2a2a2a]">
          <Link href="/admin" className="font-heading text-lg font-bold text-white">
            NOVA <span className="text-[#00E5FF]">WEBS</span>
            <span className="ml-2 text-xs bg-[#00E5FF]/20 text-[#00E5FF] px-2 py-0.5 rounded-full">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-[#00E5FF]/10 text-[#00E5FF]"
                    : "text-[#a0a0a0] hover:text-white hover:bg-[#1a1a1a]"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-[#2a2a2a]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#a0a0a0] hover:text-[#FF1744] hover:bg-[#1a1a1a] w-full transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 border-b border-[#2a2a2a] bg-[#111] flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#a0a0a0] hover:text-white transition-colors">
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-xs text-[#a0a0a0] hover:text-[#00E5FF] transition-colors">View Site</a>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
