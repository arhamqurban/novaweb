"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Search, X } from "lucide-react";
import { toast } from "sonner";

export function ServicesManagerClient() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ slug: "", title: "", description: "", icon: "Palette", features: "", href: "", order: 1 });
  const [isSaving, setIsSaving] = useState(false);

  const fetchItems = async () => {
    try { const r = await fetch("/api/admin/services"); const d = await r.json(); if (d.success) setItems(d.data.services); }
    catch { toast.error("Failed to load"); } finally { setIsLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);

  const filtered = items.filter((i: any) => i.title.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (item: any) => {
    setForm({ slug: item.slug, title: item.title, description: item.description, icon: item.icon, features: item.features.join(", "), href: item.href, order: item.order });
    setEditingId(item.id); setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try { await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" }); toast.success("Deleted"); fetchItems(); }
    catch { toast.error("Delete failed"); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSaving(true);
    try {
      const url = editingId ? `/api/admin/services?id=${editingId}` : "/api/admin/services";
      const method = editingId ? "PUT" : "POST";
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, features: form.features.split(",").map((f) => f.trim()).filter(Boolean) }) });
      const d = await r.json();
      if (d.success) { toast.success(editingId ? "Updated" : "Created"); setShowForm(false); setEditingId(null); setForm({ slug: "", title: "", description: "", icon: "Palette", features: "", href: "", order: 1 }); fetchItems(); }
      else toast.error(d.error || "Save failed");
    } catch { toast.error("Save failed"); } finally { setIsSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search services..." className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#666] focus:border-[#00e5ff]" />
        </div>
        <button onClick={() => { setEditingId(null); setForm({ slug: "", title: "", description: "", icon: "Palette", features: "", href: "", order: 1 }); setShowForm(true); }} className="flex items-center gap-2 rounded-lg bg-[#00e5ff] px-4 py-2 text-sm font-semibold text-[#0a0a0a] hover:bg-[#00b8d4]"><Plus size={16} /> Add Service</button>
      </div>
      {isLoading ? <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-[#00e5ff]" /></div>
      : filtered.length === 0 ? <div className="text-center py-12 rounded-xl border border-[#2a2a2a] bg-[#111]"><p className="text-[#a0a0a0]">No services found</p></div>
      : <div className="rounded-xl border border-[#2a2a2a] bg-[#111] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[#2a2a2a] bg-[#1a1a1a]"><th className="text-left px-4 py-3 text-[#a0a0a0] font-medium">Title</th><th className="text-left px-4 py-3 text-[#a0a0a0] font-medium">Slug</th><th className="text-left px-4 py-3 text-[#a0a0a0] font-medium">Order</th><th className="text-right px-4 py-3 text-[#a0a0a0] font-medium">Actions</th></tr></thead>
              <tbody>{filtered.map((item: any) => (<tr key={item.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]/50"><td className="px-4 py-3"><p className="text-white font-medium">{item.title}</p><p className="text-xs text-[#666]">{item.description.substring(0, 60)}...</p></td><td className="px-4 py-3 text-[#a0a0a0]">{item.slug}</td><td className="px-4 py-3 text-[#a0a0a0]">{item.order}</td><td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-1"><button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg text-[#666] hover:text-[#00e5ff] hover:bg-[#00e5ff]/10"><Pencil size={14} /></button><button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-[#666] hover:text-red-400 hover:bg-red-500/10"><Trash2 size={14} /></button></div></td></tr>))}</tbody>
            </table>
          </div>
        </div>}

      {showForm && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="w-full max-w-xl rounded-xl border border-[#2a2a2a] bg-[#111] max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between p-5 border-b border-[#2a2a2a]"><h2 className="text-lg font-semibold text-white">{editingId ? "Edit" : "Add"} Service</h2><button onClick={() => setShowForm(false)} className="text-[#666] hover:text-white"><X size={18} /></button></div>
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Title</label><input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
              <div className="col-span-2 sm:col-span-1"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Slug</label><input value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} required className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
              <div className="col-span-2"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Description</label><textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} required rows={3} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] resize-none" /></div>
              <div className="col-span-2 sm:col-span-1"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Icon (Lucide name)</label><input value={form.icon} onChange={(e) => setForm({...form, icon: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
              <div className="col-span-2 sm:col-span-1"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Href</label><input value={form.href} onChange={(e) => setForm({...form, href: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
              <div className="col-span-2"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Features (comma-separated)</label><input value={form.features} onChange={(e) => setForm({...form, features: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
              <div className="col-span-2 sm:col-span-1"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Order</label><input type="number" value={form.order} onChange={(e) => setForm({...form, order: parseInt(e.target.value) || 1})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2a2a2a]">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-[#a0a0a0] hover:text-white">Cancel</button>
              <button type="submit" disabled={isSaving} className="flex items-center gap-2 rounded-lg bg-[#00e5ff] px-5 py-2 text-sm font-semibold text-[#0a0a0a] hover:bg-[#00b8d4] disabled:opacity-50">{isSaving && <Loader2 size={14} className="animate-spin" />}{editingId ? "Update" : "Create"}</button>
            </div>
          </form>
        </div>
      </div>)}
    </div>
  );
}
