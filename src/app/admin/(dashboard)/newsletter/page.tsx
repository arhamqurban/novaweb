"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Trash2, Download } from "lucide-react";

interface Subscriber {
  _filename: string;
  email?: string;
  receivedAt?: string;
}

export default function AdminNewsletterPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("nova_admin") !== "true") {
      router.replace("/admin/login");
      return;
    }
    setIsAuth(true);
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/admin/submissions?type=newsletter&limit=200");
      const data = await res.json();
      setSubscribers(data.submissions || []);
    } catch (e) {
      console.error("Failed to load");
    }
    setLoading(false);
  };

  const deleteSubscriber = async (filename: string) => {
    if (!confirm("Delete this subscriber?")) return;
    try {
      await fetch("/api/admin/submissions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });
      fetchSubscribers();
    } catch (e) {
      console.error("Delete failed");
    }
  };

  const exportCSV = () => {
    const csv = "Email,Date\n" + subscribers.map(s => `${s.email || ""},${s.receivedAt || ""}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
  };

  if (!isAuth) return null;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="heading-3 text-white">Newsletter</h1>
          <p className="text-sm text-[#a0a0a0]">{subscribers.length} subscribers</p>
        </div>
        {subscribers.length > 0 && (
          <button onClick={exportCSV} className="flex items-center gap-1 text-xs text-[#00E5FF] hover:text-[#4DF0FF] transition-colors">
            <Download size={14} /> Export CSV
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-[#a0a0a0] text-sm">Loading...</p>
      ) : subscribers.length === 0 ? (
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-8 text-center">
          <Mail size={32} className="mx-auto mb-3 text-[#666]" />
          <p className="text-[#a0a0a0]">No newsletter subscribers yet.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-[#2a2a2a] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
                <th className="text-left p-4 text-[#666] font-medium">Email</th>
                <th className="text-left p-4 text-[#666] font-medium">Date</th>
                <th className="text-right p-4 text-[#666] font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub._filename} className="border-b border-[#2a2a2a] last:border-0 hover:bg-[#1a1a1a]/50">
                  <td className="p-4 text-white">{sub.email}</td>
                  <td className="p-4 text-[#666]">
                    {sub.receivedAt ? new Date(sub.receivedAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => deleteSubscriber(sub._filename)} className="text-[#666] hover:text-[#FF1744] transition-colors" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
