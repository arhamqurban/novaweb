"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface Contact {
  _filename: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  receivedAt?: string;
}

export default function AdminContactsPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [submissions, setSubmissions] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("nova_admin") !== "true") {
      router.replace("/admin/login");
      return;
    }
    setIsAuth(true);
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/admin/submissions?type=contact&limit=100");
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch (e) {
      console.error("Failed to load");
    }
    setLoading(false);
  };

  const deleteSubmission = async (filename: string) => {
    if (!confirm("Delete this submission?")) return;
    try {
      await fetch("/api/admin/submissions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });
      fetchContacts();
    } catch (e) {
      console.error("Delete failed");
    }
  };

  if (!isAuth) return null;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="heading-3 text-white">Contact Messages</h1>
          <p className="text-sm text-[#a0a0a0]">{submissions.length} messages</p>
        </div>
      </div>

      {loading ? (
        <p className="text-[#a0a0a0] text-sm">Loading...</p>
      ) : submissions.length === 0 ? (
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-8 text-center">
          <p className="text-[#a0a0a0]">No contact form submissions yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub._filename} className="rounded-xl border border-[#2a2a2a] bg-[#111] p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{sub.name || "Unknown"}</h3>
                  <p className="text-xs text-[#666]">
                    {sub.receivedAt ? new Date(sub.receivedAt).toLocaleString() : ""}
                  </p>
                </div>
                <button onClick={() => deleteSubmission(sub._filename)} className="text-[#666] hover:text-[#FF1744] transition-colors" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-[#666]">Email:</span> <span className="text-[#e0e0e0]">{sub.email}</span></div>
                <div><span className="text-[#666]">Phone:</span> <span className="text-[#e0e0e0]">{sub.phone}</span></div>
                {sub.company && <div><span className="text-[#666]">Company:</span> <span className="text-[#e0e0e0]">{sub.company}</span></div>}
                {sub.service && <div><span className="text-[#666]">Service:</span> <span className="text-[#e0e0e0]">{sub.service}</span></div>}
                {sub.budget && <div><span className="text-[#666]">Budget:</span> <span className="text-[#e0e0e0]">{sub.budget}</span></div>}
              </div>
              {sub.message && (
                <div className="mt-4 p-3 rounded-lg bg-[#1a1a1a]">
                  <p className="text-sm text-[#e0e0e0]">{sub.message}</p>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-[#2a2a2a] flex gap-3">
                <a href={`tel:${sub.phone}`} className="text-xs font-medium text-[#00E5FF] hover:text-[#4DF0FF] transition-colors">📞 Call</a>
                <a href={`mailto:${sub.email}`} className="text-xs font-medium text-[#00E5FF] hover:text-[#4DF0FF] transition-colors">✉️ Email</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
