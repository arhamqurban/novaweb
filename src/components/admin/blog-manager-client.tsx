"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Search, X, Eye, Star } from "lucide-react";
import { toast } from "sonner";

export function BlogManagerClient() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ slug: "", title: "", description: "", content: "", category: "General", tags: "", image: "", author: "Nova Webs", authorRole: "Team", readingTime: "3 min read", featured: false, status: "draft", seoTitle: "", seoDescription: "", seoKeywords: "" });
  const [isSaving, setIsSaving] = useState(false);

  const fetchPosts = async () => {
    try { const r = await fetch("/api/admin/blog"); const d = await r.json(); if (d.success) setPosts(d.data.posts); }
    catch { toast.error("Failed to load"); } finally { setIsLoading(false); }
  };
  useEffect(() => { fetchPosts(); }, []);

  const filtered = posts.filter((p: any) => p.title.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (post: any) => {
    setForm({ slug: post.slug, title: post.title, description: post.description, content: post.content, category: post.category, tags: post.tags.join(", "), image: post.image, author: post.author, authorRole: post.authorRole, readingTime: post.readingTime, featured: post.featured, status: post.status, seoTitle: post.seoTitle || "", seoDescription: post.seoDescription || "", seoKeywords: post.seoKeywords || "" });
    setEditingId(post.id); setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    try { await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" }); toast.success("Deleted"); fetchPosts(); }
    catch { toast.error("Delete failed"); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSaving(true);
    try {
      const url = editingId ? `/api/admin/blog?id=${editingId}` : "/api/admin/blog";
      const method = editingId ? "PUT" : "POST";
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) }) });
      const d = await r.json();
      if (d.success) { toast.success(editingId ? "Updated" : "Created"); setShowForm(false); setEditingId(null); setForm({ slug: "", title: "", description: "", content: "", category: "General", tags: "", image: "", author: "Nova Webs", authorRole: "Team", readingTime: "3 min read", featured: false, status: "draft", seoTitle: "", seoDescription: "", seoKeywords: "" }); fetchPosts(); }
      else toast.error(d.error || "Save failed");
    } catch { toast.error("Save failed"); } finally { setIsSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#666] focus:border-[#00e5ff]" /></div>
        <button onClick={() => { setEditingId(null); setForm({ slug: "", title: "", description: "", content: "", category: "General", tags: "", image: "", author: "Nova Webs", authorRole: "Team", readingTime: "3 min read", featured: false, status: "draft", seoTitle: "", seoDescription: "", seoKeywords: "" }); setShowForm(true); }} className="flex items-center gap-2 rounded-lg bg-[#00e5ff] px-4 py-2 text-sm font-semibold text-[#0a0a0a] hover:bg-[#00b8d4]"><Plus size={16} /> New Post</button>
      </div>
      {isLoading ? <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-[#00e5ff]" /></div>
      : filtered.length === 0 ? <div className="text-center py-12 rounded-xl border border-[#2a2a2a] bg-[#111]"><p className="text-[#a0a0a0]">No posts found</p></div>
      : <div className="rounded-xl border border-[#2a2a2a] bg-[#111] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[#2a2a2a] bg-[#1a1a1a]"><th className="text-left px-4 py-3 text-[#a0a0a0] font-medium">Title</th><th className="text-left px-4 py-3 text-[#a0a0a0] font-medium">Category</th><th className="text-left px-4 py-3 text-[#a0a0a0] font-medium">Status</th><th className="text-center px-4 py-3 text-[#a0a0a0] font-medium">Featured</th><th className="text-left px-4 py-3 text-[#a0a0a0] font-medium">Date</th><th className="text-right px-4 py-3 text-[#a0a0a0] font-medium">Actions</th></tr></thead>
              <tbody>{filtered.map((post: any) => (<tr key={post.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]/50"><td className="px-4 py-3"><p className="text-white font-medium">{post.title}</p><p className="text-xs text-[#666]">{post.slug}</p></td><td className="px-4 py-3 text-[#a0a0a0]">{post.category}</td><td className="px-4 py-3"><span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${post.status === "published" ? "bg-green-500/10 text-green-400" : post.status === "draft" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"}`}>{post.status}</span></td><td className="px-4 py-3 text-center">{post.featured ? <Star size={14} className="text-yellow-400 fill-yellow-400 inline" /> : "—"}</td><td className="px-4 py-3 text-[#a0a0a0] text-xs">{new Date(post.createdAt).toLocaleDateString()}</td><td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-1">
                <button onClick={() => handleEdit(post)} className="p-1.5 rounded-lg text-[#666] hover:text-[#00e5ff] hover:bg-[#00e5ff]/10"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(post.id)} className="p-1.5 rounded-lg text-[#666] hover:text-red-400 hover:bg-red-500/10"><Trash2 size={14} /></button>
                <a href={`/blog/${post.slug}`} target="_blank" className="p-1.5 rounded-lg text-[#666] hover:text-[#00e5ff] hover:bg-[#00e5ff]/10"><Eye size={14} /></a>
              </div></td></tr>))}</tbody>
            </table>
          </div>
        </div>}

      {showForm && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="w-full max-w-3xl rounded-xl border border-[#2a2a2a] bg-[#111] max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between p-5 border-b border-[#2a2a2a]"><h2 className="text-lg font-semibold text-white">{editingId ? "Edit" : "New"} Post</h2><button onClick={() => setShowForm(false)} className="text-[#666] hover:text-white"><X size={18} /></button></div>
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Title</label><input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
              <div className="col-span-2 sm:col-span-1"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Slug</label><input value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} required className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
              <div className="col-span-2"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Description (meta)</label><input value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} required className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
              <div className="col-span-2"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Content (Markdown/HTML)</label><textarea value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} required rows={10} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white font-mono focus:border-[#00e5ff] resize-none" /></div>
              <div className="col-span-2 sm:col-span-1"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Category</label><input value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
              <div className="col-span-2 sm:col-span-1"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Tags (comma-separated)</label><input value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
              <div className="col-span-2 sm:col-span-1"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Featured Image URL</label><input value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
              <div className="col-span-2 sm:col-span-1"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Author</label><input value={form.author} onChange={(e) => setForm({...form, author: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
              <div className="col-span-2 sm:col-span-1"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Status</label><select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></div>
              <div className="col-span-2 sm:col-span-1"><label className="block text-xs font-medium text-[#a0a0a0] mb-1">Reading Time</label><input value={form.readingTime} onChange={(e) => setForm({...form, readingTime: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
              <div className="col-span-2 flex items-center gap-2"><input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({...form, featured: e.target.checked})} className="rounded border-[#333] bg-[#1a1a1a] text-[#00e5ff]" /><label htmlFor="featured" className="text-sm text-[#a0a0a0]">Featured post</label></div>
              <div className="col-span-2 border-t border-[#2a2a2a] pt-4">
                <p className="text-xs font-medium text-[#a0a0a0] mb-3">SEO Metadata</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-medium text-[#666] mb-1">SEO Title</label><input value={form.seoTitle} onChange={(e) => setForm({...form, seoTitle: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
                  <div><label className="block text-xs font-medium text-[#666] mb-1">SEO Keywords</label><input value={form.seoKeywords} onChange={(e) => setForm({...form, seoKeywords: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
                  <div className="col-span-2"><label className="block text-xs font-medium text-[#666] mb-1">SEO Description</label><input value={form.seoDescription} onChange={(e) => setForm({...form, seoDescription: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" /></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2a2a2a]">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-[#a0a0a0] hover:text-white">Cancel</button>
              <button type="submit" disabled={isSaving} className="flex items-center gap-2 rounded-lg bg-[#00e5ff] px-5 py-2 text-sm font-semibold text-[#0a0a0a] hover:bg-[#00b8d4] disabled:opacity-50">{isSaving && <Loader2 size={14} className="animate-spin" />}{editingId ? "Update" : "Publish"}</button>
            </div>
          </form>
        </div>
      </div>)}
    </div>
  );
}
