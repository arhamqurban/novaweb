"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle } from "lucide-react";

export default function AdminTestimonialsPage() {
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
      <h1 className="heading-3 text-white mb-6">Testimonials</h1>
      <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-8 text-center">
        <HelpCircle size={40} className="mx-auto mb-4 text-[#666]" />
        <p className="text-lg text-white font-medium mb-2">Client Testimonials</p>
        <p className="text-sm text-[#a0a0a0] mb-6">Manage client testimonials here.</p>
        <div className="inline-flex items-center gap-2 text-xs text-[#666]">
          Testimonials can be edited in <code className="bg-[#1a1a1a] px-2 py-1 rounded text-[#00E5FF]">content/data/testimonials.json</code>
        </div>
      </div>
    </div>
  );
}
