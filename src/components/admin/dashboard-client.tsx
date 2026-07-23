"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderKanban, Star, MessageSquare, Newspaper,
  Users, Eye, Clock, ArrowRight, Loader2,
  Mail, FileText, UserPlus, ExternalLink,
} from "lucide-react";

interface DashboardData {
  overview: {
    totalProjects: number;
    totalServices: number;
    totalTestimonials: number;
    totalMessages: number;
    totalSubscribers: number;
    totalBlogPosts: number;
    unreadMessages: number;
    publishedPosts: number;
  };
  recentMessages: Array<{
    id: string;
    name: string;
    email: string;
    message: string;
    type: string;
    createdAt: string;
    isRead: boolean;
  }>;
  recentActivity: Array<{
    id: string;
    action: string;
    entity: string;
    createdAt: string;
    user: { name: string; email: string };
  }>;
}

const OVERVIEW_CARDS = [
  { key: "totalProjects" as const, label: "Projects", icon: FolderKanban, href: "/admin/portfolio", color: "text-blue-400 bg-blue-500/10" },
  { key: "totalTestimonials" as const, label: "Testimonials", icon: Star, href: "/admin/testimonials", color: "text-yellow-400 bg-yellow-500/10" },
  { key: "totalMessages" as const, label: "Messages", icon: MessageSquare, href: "/admin/contacts", color: "text-green-400 bg-green-500/10" },
  { key: "totalBlogPosts" as const, label: "Blog Posts", icon: Newspaper, href: "/admin/blog", color: "text-purple-400 bg-purple-500/10" },
  { key: "totalServices" as const, label: "Services", icon: FileText, href: "/admin/services", color: "text-cyan-400 bg-cyan-500/10" },
  { key: "unreadMessages" as const, label: "Unread", icon: Mail, href: "/admin/contacts", color: "text-red-400 bg-red-500/10" },
];

export function AdminDashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setData(res.data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-[#00e5ff]" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-[#a0a0a0]">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {OVERVIEW_CARDS.map((card) => {
          const Icon = card.icon;
          const value = data.overview[card.key];
          return (
            <Link
              key={card.key}
              href={card.href}
              className="rounded-xl border border-[#2a2a2a] bg-[#111] p-4 hover:border-[#3d3d3d] transition-all group"
            >
              <div className={`w-9 h-9 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
                <Icon size={16} />
              </div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-[#a0a0a0] mt-0.5">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Messages */}
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Recent Messages</h2>
            <Link href="/admin/contacts" className="text-xs text-[#00e5ff] hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {data.recentMessages.length === 0 && (
              <p className="text-sm text-[#666] text-center py-6">No messages yet</p>
            )}
            {data.recentMessages.slice(0, 5).map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 pb-3 border-b border-[#1a1a1a] last:border-0 last:pb-0">
                <div className="h-8 w-8 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-[#a0a0a0]">{msg.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white truncate">{msg.name}</p>
                    <span className="text-[10px] text-[#666]">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-[#a0a0a0] truncate mt-0.5">{msg.message}</p>
                </div>
                {!msg.isRead && <span className="h-2 w-2 rounded-full bg-[#00e5ff] flex-shrink-0 mt-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {data.recentActivity.length === 0 && (
              <p className="text-sm text-[#666] text-center py-6">No activity yet</p>
            )}
            {data.recentActivity.slice(0, 8).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-2 border-b border-[#1a1a1a] last:border-0 last:pb-0">
                <div className="h-7 w-7 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                  <Clock size={12} className="text-[#666]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#e0e0e0]">
                    <span className="font-medium text-white">{activity.user.name}</span>
                    {" "}{activity.action}d{" "}
                    <span className="text-[#00e5ff]">{activity.entity}</span>
                  </p>
                  <p className="text-[10px] text-[#666] mt-0.5">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-5">
        <h2 className="text-sm font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/admin/portfolio" className="flex items-center gap-2 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-3 text-sm text-[#a0a0a0] hover:border-[#00e5ff]/30 hover:text-white transition-all">
            <FolderKanban size={14} /> Add Project <ArrowRight size={12} className="ml-auto" />
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-2 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-3 text-sm text-[#a0a0a0] hover:border-[#00e5ff]/30 hover:text-white transition-all">
            <Newspaper size={14} /> New Post <ArrowRight size={12} className="ml-auto" />
          </Link>
          <Link href="/admin/testimonials" className="flex items-center gap-2 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-3 text-sm text-[#a0a0a0] hover:border-[#00e5ff]/30 hover:text-white transition-all">
            <Star size={14} /> Add Review <ArrowRight size={12} className="ml-auto" />
          </Link>
          <Link href="/admin/contacts" className="flex items-center gap-2 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-3 text-sm text-[#a0a0a0] hover:border-[#00e5ff]/30 hover:text-white transition-all">
            <MessageSquare size={14} /> View Leads <ArrowRight size={12} className="ml-auto" />
          </Link>
        </div>
      </div>
    </div>
  );
}
