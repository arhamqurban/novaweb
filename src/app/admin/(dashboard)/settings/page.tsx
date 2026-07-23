"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
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
      <h1 className="heading-3 text-white mb-6">Settings</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-6">
          <h2 className="font-semibold text-white mb-4">Site Information</h2>
          <div className="space-y-3 text-sm">
            <div><span className="text-[#666]">Name:</span> <span className="text-[#e0e0e0]">Nova Webs</span></div>
            <div><span className="text-[#666]">Email:</span> <span className="text-[#e0e0e0]">novawebs09@gmail.com</span></div>
            <div><span className="text-[#666]">Phone:</span> <span className="text-[#e0e0e0]">+92 302 6684097</span></div>
            <div><span className="text-[#666]">Address:</span> <span className="text-[#e0e0e0]">Lahore, Pakistan</span></div>
          </div>
        </div>
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-6">
          <h2 className="font-semibold text-white mb-4">Admin Account</h2>
          <div className="space-y-3 text-sm">
            <div><span className="text-[#666]">Password:</span> <span className="text-[#e0e0e0]">nova123</span></div>
            <div><span className="text-[#666]">Change in:</span> <code className="bg-[#1a1a1a] px-2 py-0.5 rounded text-[#00E5FF]">.env.local</code></div>
          </div>
        </div>
      </div>
    </div>
  );
}
