"use client";

import { useState, useEffect } from "react";
import { Loader2, Search, Mail, Check, Trash2, Download, X } from "lucide-react";
import { toast } from "sonner";

export function ContactsManagerClient() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<any>(null);

  const fetchMessages = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.set("type", filter);
      if (search) params.set("search", search);
      const r = await fetch(`/api/admin/contacts?${params}`);
      const d = await r.json();
      if (d.success) setMessages(d.data.messages);
    } catch { toast.error("Failed to load"); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, [filter]);

  const handleSearch = () => { setIsLoading(true); fetchMessages(); };

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/admin/contacts", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, isRead: true }) });
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, isRead: true } : m));
    } catch { toast.error("Failed to update"); }
  };

  const exportCSV = () => {
    const headers = "Name,Email,Phone,Service,Budget,Message,Type,Date\n";
    const rows = messages.map((m) => `"${m.name}","${m.email}","${m.phone || ""}","${m.service || ""}","${m.budget || ""}","${m.message.replace(/"/g, '""')}","${m.type}","${new Date(m.createdAt).toLocaleDateString()}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "contacts.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} placeholder="Search messages..." className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#666] focus:border-[#00e5ff] focus:outline-none" />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]">
            <option value="all">All ({messages.length})</option>
            <option value="contact">Contact</option>
            <option value="quote">Quote</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && <span className="text-xs text-[#00e5ff] bg-[#00e5ff]/10 rounded-full px-3 py-1">{unreadCount} unread</span>}
          <button onClick={exportCSV} className="flex items-center gap-2 rounded-lg border border-[#333] px-3 py-2 text-sm text-[#a0a0a0] hover:text-white hover:border-[#00e5ff]/30 transition-all"><Download size={14} /> Export CSV</button>
        </div>
      </div>

      {isLoading ? <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-[#00e5ff]" /></div>
      : messages.length === 0 ? <div className="text-center py-12 rounded-xl border border-[#2a2a2a] bg-[#111]"><Mail size={24} className="mx-auto text-[#333] mb-3" /><p className="text-[#a0a0a0]">No messages found</p></div>
      : <div className="grid gap-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`rounded-xl border ${msg.isRead ? "border-[#2a2a2a] bg-[#111]" : "border-[#00e5ff]/20 bg-[#151515]"} p-4 cursor-pointer hover:border-[#3d3d3d] transition-all`} onClick={() => { setSelected(msg); if (!msg.isRead) markAsRead(msg.id); }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${msg.isRead ? "bg-[#1a1a1a]" : "bg-[#00e5ff]/20"}`}>
                    <span className={`text-xs font-semibold ${msg.isRead ? "text-[#666]" : "text-[#00e5ff]"}`}>{msg.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">{msg.name}</h3>
                      <span className="text-[10px] text-[#666]">• {msg.email}</span>
                      {!msg.isRead && <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff]" />}
                    </div>
                    <p className="text-xs text-[#a0a0a0] mt-0.5 line-clamp-1">{msg.message}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] uppercase tracking-wider text-[#666] bg-[#1a1a1a] rounded-full px-2 py-0.5">{msg.type}</span>
                      {msg.service && <span className="text-[10px] text-[#666]">{msg.service}</span>}
                      <span className="text-[10px] text-[#666]">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                {msg.isRead && <Check size={14} className="text-[#333] flex-shrink-0 mt-1" />}
              </div>
            </div>
          ))}
        </div>}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg rounded-xl border border-[#2a2a2a] bg-[#111] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-white">Message Details</h2><button onClick={() => setSelected(null)} className="text-[#666] hover:text-white"><X size={18} /></button></div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-xs text-[#666]">Name</p><p className="text-sm text-white">{selected.name}</p></div>
                <div><p className="text-xs text-[#666]">Email</p><p className="text-sm text-[#00e5ff]">{selected.email}</p></div>
                {selected.phone && <div><p className="text-xs text-[#666]">Phone</p><p className="text-sm text-white">{selected.phone}</p></div>}
                {selected.service && <div><p className="text-xs text-[#666]">Service</p><p className="text-sm text-white">{selected.service}</p></div>}
                {selected.budget && <div><p className="text-xs text-[#666]">Budget</p><p className="text-sm text-white">{selected.budget}</p></div>}
                <div><p className="text-xs text-[#666]">Type</p><p className="text-sm text-white capitalize">{selected.type}</p></div>
                <div><p className="text-xs text-[#666]">Date</p><p className="text-sm text-white">{new Date(selected.createdAt).toLocaleString()}</p></div>
              </div>
              <div><p className="text-xs text-[#666] mb-1">Message</p><p className="text-sm text-[#e0e0e0] bg-[#1a1a1a] rounded-lg p-3">{selected.message}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
