"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Search, X } from "lucide-react";
import { toast } from "sonner";

export function FAQManagerClient() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ question: "", answer: "", category: "general", order: 1 });
  const [isSaving, setIsSaving] = useState(false);

  const fetchItems = async () => {
    try { const r = await fetch("/api/admin/faq"); const d = await r.json(); if (d.success) setItems(d.data.faqs); }
    catch { toast.error("Failed to load"); } finally { setIsLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);

  const filtered = items.filter((i: any) => i.question.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (item: any) => { setForm({ question: item.question, answer: item.answer, category: item.category, order: item.order }); setEditingId(item.id); setShowForm(true); };
  const handleDelete = async (id: string) => { if (!confirm("Delete?")) return; try { await fetch(`/api/admin/faq?id=${id}`, { method: "DELETE" }); toast.success("Deleted"); fetchItems(); } catch { toast.error("Delete failed"); } };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSaving(true);
    try {
      const url = editingId ? `/api/admin/faq?id=${editingId}` : "/api/admin/faq"; const method = editingId ? "PUT" : "POST";
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json(); if (d.success) { toast.success(editingId ? "Updated" : "Created"); setShowForm(false); setEditingId(null); setForm({ question: "", answer: "", category: "general", order: 1 }); fetchItems(); } else toast.error(d.error || "Save failed");
    } catch { toast.error("Save failed"); } finally { setIsSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search FAQs..." className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#666] focus:border-[#00e5ff]" /></div>
        <button onClick={() => { setEditingId(null); setForm({ question: "", answer: "", category: "general", order: 1 }); setShowForm(true); }} className="flex items-center gap-2 rounded-lg bg-[#00e5ff] px-4 py-2 text-sm font-semibold text-[#0a0a0a] hover:bg-[#00b8d4]"><Plus size={16} /> Add FAQ</button>
      </div>
      {isLoading ? <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-[#00e5ff]" /></div>
      : filtered.length === 0 ? <div className="text-center py-12 rounded-xl border border-[#2a2a2a] bg-[#111]"><p className="text-[#a0a0a0]">No FAQs found</p></div>
      : <div className="space-y-3">{filtered.map((item: any) => (<div key={item.id} className="rounded-xl border border-[#2a2a2a] bg-[#111] p-4"><div className="flex items-start justify-between gap-4"><div className="flex-1"><h3 className="text-sm font-semibold text-white mb-1">{item.question}</h3><p className="text-xs text-[#a0a0a0] line-clamp-2">{item.answer}</p><span className="inline-block mt-2 text-[10px] text-[#666] bg-[#1a1a1a] rounded-full px-2 py-0.5">{item.category}</span></div><div className="flex items-center gap-1"><button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg text-[#666] hover:text-[#00e5ff] hover:bg-[#00e5ff]/10"><Pencil size={14} /></button><button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-[#666] hover:text-red-400 hover:bg-red-500/10"><Trash2 size={14} /></button></div></div></div>))}</div>}

      {showForm && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="w-full max-w-xl rounded-xl border border-[#2a2a2a] bg-[#111]"><div className="flex items-center justify-between p-5 border-b border-[#2a2a2a]"><h2 className="text-lg font-semibold text-white">{editingId ? "Edit" : "Add"} FAQ</h2><button onClick={() => setShowForm(false)} className="text-[#666] hover:text-white"><X size={18} /></button></div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Question</label><input value={form.question} onChange={(e) => setForm({...form, question: e.target.value})} required className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
          <div><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Answer</label><textarea value={form.answer} onChange={(e) => setForm({...form, answer: e.target.value})} required rows={4} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] resize-none" /></div>
          <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Category</label><select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]"><option value="general">General</option><option value="pricing">Pricing</option><option value="services">Services</option><option value="process">Process</option></select></div>
          <div><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Order</label><input type="number" value={form.order} onChange={(e) => setForm({...form, order: parseInt(e.target.value) || 1})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div></div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2a2a2a]"><button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-[#a0a0a0] hover:text-white">Cancel</button><button type="submit" disabled={isSaving} className="flex items-center gap-2 rounded-lg bg-[#00e5ff] px-5 py-2 text-sm font-semibold text-[#0a0a0a] hover:bg-[#00b8d4] disabled:opacity-50">{isSaving && <Loader2 size={14} className="animate-spin" />}{editingId ? "Update" : "Create"}</button></div>
        </form></div></div>)}
    </div>
  );
}
