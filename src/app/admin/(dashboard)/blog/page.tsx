"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

export default function AdminBlogPage() {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("nova_admin") !== "true") {
      router.replace("/admin/login");
      return;
    }
    setIsAuth(true);
  }, []);

  if (!isAuth) return null;

  return (
    <div className="p-6">
      <h1 className="heading-3 text-white mb-6">Blog Management</h1>
      <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-8 text-center">
        <FileText size={40} className="mx-auto mb-4 text-[#666]" />
        <p className="text-lg text-white font-medium mb-2">Blog Posts</p>
        <p className="text-sm text-[#a0a0a0] mb-6">Manage your blog posts here.</p>
        <div className="inline-flex items-center gap-2 text-xs text-[#666]">
          Blog posts can be edited in <code className="bg-[#1a1a1a] px-2 py-1 rounded text-[#00E5FF]">content/blog/</code>
        </div>
      </div>
    </div>
  );
}
