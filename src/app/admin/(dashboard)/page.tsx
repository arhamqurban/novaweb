"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageSquare, Calendar, Mail, TrendingUp, ArrowRight } from "lucide-react";

interface Stats {
  total: number;
  contact: number;
  booking: number;
  newsletter: number;
}

export default function AdminDashboardPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ total: 0, contact: 0, booking: 0, newsletter: 0 });
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("nova_admin") !== "true") {
      router.replace("/admin/login");
      return;
    }
    setIsAuth(true);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/submissions?limit=5");
      const data = await res.json();
      if (data.stats) setStats(data.stats);
    } catch (e) {
      console.error("Failed to load dashboard data");
    }
    setLoading(false);
  };

  if (!isAuth) return null;

  const cards = [
    { label: "Total Submissions", value: stats.total, icon: MessageSquare, color: "text-[#00E5FF]", href: "/admin/contacts" },
    { label: "Contact Forms", value: stats.contact, icon: Mail, color: "text-[#00E676]", href: "/admin/contacts" },
    { label: "Bookings", value: stats.booking, icon: Calendar, color: "text-[#FFD600]", href: "/admin/bookings" },
    { label: "Newsletter", value: stats.newsletter, icon: TrendingUp, color: "text-[#448AFF]", href: "/admin/newsletter" },
  ];

  return (
    <div className="p-6">
      <h1 className="heading-2 text-white mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-xl border border-[#2a2a2a] bg-[#111] p-5 transition-all hover:border-[#00E5FF]/30 hover:shadow-sm">
            <card.icon size={20} className={card.color} />
            <p className="font-mono text-3xl font-medium text-white mt-3">{loading ? "—" : card.value}</p>
            <p className="text-xs text-[#a0a0a0] mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Link href="/admin/contacts" className="group rounded-xl border border-[#2a2a2a] bg-[#111] p-5 transition-all hover:border-[#00E5FF]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-white mb-1">Contact Forms</p>
              <p className="text-xs text-[#a0a0a0]">{stats.contact} submissions</p>
            </div>
            <ArrowRight size={18} className="text-[#666] group-hover:text-[#00E5FF] transition-colors" />
          </div>
        </Link>
        <Link href="/admin/bookings" className="group rounded-xl border border-[#2a2a2a] bg-[#111] p-5 transition-all hover:border-[#00E5FF]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-white mb-1">Bookings</p>
              <p className="text-xs text-[#a0a0a0]">{stats.booking} bookings</p>
            </div>
            <ArrowRight size={18} className="text-[#666] group-hover:text-[#00E5FF] transition-colors" />
          </div>
        </Link>
        <Link href="/admin/newsletter" className="group rounded-xl border border-[#2a2a2a] bg-[#111] p-5 transition-all hover:border-[#00E5FF]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-white mb-1">Newsletter</p>
              <p className="text-xs text-[#a0a0a0]">{stats.newsletter} subscribers</p>
            </div>
            <ArrowRight size={18} className="text-[#666] group-hover:text-[#00E5FF] transition-colors" />
          </div>
        </Link>
      </div>

      {/* Info */}
      <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-6">
        <h2 className="font-semibold text-white mb-2">📋 How it works</h2>
        <p className="text-sm text-[#a0a0a0] leading-relaxed">
          When clients submit forms on the website, their data is saved as JSON files and appears here automatically.
          You can view, call, email, or delete submissions from this dashboard.
        </p>
        <p className="text-xs text-[#666] mt-3">
          Password: <code className="bg-[#1a1a1a] px-1.5 py-0.5 rounded text-[#00E5FF]">nova123</code>
          {" "}— Change it in <code className="bg-[#1a1a1a] px-1.5 py-0.5 rounded text-[#00E5FF]">.env.local</code>
        </p>
      </div>
    </div>
  );
}
