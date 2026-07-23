"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Search, X, Star } from "lucide-react";
import { toast } from "sonner";

interface Testimonial {
  id: string; name: string; role: string | null; company: string | null;
  quote: string; avatar: string; rating: number; metrics: string | null;
  project: string | null; featured: boolean; isVisible: boolean; order: number;
}

export function TestimonialsManagerClient() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", company: "", quote: "", avatar: "", rating: 5, metrics: "", project: "", featured: false, isVisible: true, order: 1 });
  const [isSaving, setIsSaving] = useState(false);

  const fetchItems = async () => {
    try { const r = await fetch("/api/admin/testimonials"); const d = await r.json(); if (d.success) setItems(d.data.testimonials); }
    catch { toast.error("Failed to load"); } finally { setIsLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (item: Testimonial) => {
    setForm({ name: item.name, role: item.role || "", company: item.company || "", quote: item.quote, avatar: item.avatar, rating: item.rating, metrics: item.metrics || "", project: item.project || "", featured: item.featured, isVisible: item.isVisible, order: item.order });
    setEditingId(item.id); setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try { await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" }); toast.success("Deleted"); fetchItems(); }
    catch { toast.error("Delete failed"); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSaving(true);
    try {
      const url = editingId ? `/api/admin/testimonials?id=${editingId}` : "/api/admin/testimonials";
      const method = editingId ? "PUT" : "POST";
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json();
      if (d.success) { toast.success(editingId ? "Updated" : "Created"); setShowForm(false); setEditingId(null); setForm({ name: "", role: "", company: "", quote: "", avatar: "", rating: 5, metrics: "", project: "", featured: false, isVisible: true, order: 1 }); fetchItems(); }
      else toast.error(d.error || "Save failed");
    } catch { toast.error("Save failed"); } finally { setIsSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search testimonials..." className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#666] focus:border-[#00e5ff] focus:outline-none" />
        </div>
        <button onClick={() => { setEditingId(null); setForm({ name: "", role: "", company: "", quote: "", avatar: "", rating: 5, metrics: "", project: "", featured: false, isVisible: true, order: 1 }); setShowForm(true); }} className="flex items-center gap-2 rounded-lg bg-[#00e5ff] px-4 py-2 text-sm font-semibold text-[#0a0a0a] hover:bg-[#00b8d4]"><Plus size={16} /> Add</button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-[#00e5ff]" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 rounded-xl border border-[#2a2a2a] bg-[#111]"><p className="text-[#a0a0a0]">No testimonials found</p></div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="rounded-xl border border-[#2a2a2a] bg-[#111] p-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                  <span className="text-xs text-[#666]">{item.role}{item.company ? `, ${item.company}` : ""}</span>
                  {item.featured && <span className="text-[10px] text-yellow-400 bg-yellow-500/10 rounded-full px-2 py-0.5">Featured</span>}
                </div>
                <p className="text-sm text-[#a0a0a0] line-clamp-2">{item.quote}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={12} className={i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-[#333]"} />))}</div>
                  {item.metrics && <span className="text-[10px] text-[#00e5ff]">• {item.metrics}</span>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg text-[#666] hover:text-[#00e5ff] hover:bg-[#00e5ff]/10"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-[#666] hover:text-red-400 hover:bg-red-500/10"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl rounded-xl border border-[#2a2a2a] bg-[#111] max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-[#2a2a2a]">
              <h2 className="text-lg font-semibold text-white">{editingId ? "Edit" : "Add"} Testimonial</h2>
              <button onClick={() => setShowForm(false)} className="text-[#666] hover:text-white"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Name</label>
                  <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] focus:outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Role</label>
                  <input value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Company</label>
                  <input value={form.company} onChange={(e) => setForm({...form, company: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Rating (1-5)</label>
                  <input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({...form, rating: parseInt(e.target.value) || 5})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Quote</label>
                  <textarea value={form.quote} onChange={(e) => setForm({...form, quote: e.target.value})} required rows={3} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] resize-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Avatar URL</label>
                  <input value={form.avatar} onChange={(e) => setForm({...form, avatar: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Metrics</label>
                  <input value={form.metrics} onChange={(e) => setForm({...form, metrics: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({...form, featured: e.target.checked})} className="rounded border-[#333] bg-[#1a1a1a] text-[#00e5ff]" /><span className="text-sm text-[#a0a0a0]">Featured</span></label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={form.isVisible} onChange={(e) => setForm({...form, isVisible: e.target.checked})} className="rounded border-[#333] bg-[#1a1a1a] text-[#00e5ff]" /><span className="text-sm text-[#a0a0a0]">Visible</span></label>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2a2a2a]">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-[#a0a0a0] hover:text-white">Cancel</button>
                <button type="submit" disabled={isSaving} className="flex items-center gap-2 rounded-lg bg-[#00e5ff] px-5 py-2 text-sm font-semibold text-[#0a0a0a] hover:bg-[#00b8d4] disabled:opacity-50">{isSaving && <Loader2 size={14} className="animate-spin" />}{editingId ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
