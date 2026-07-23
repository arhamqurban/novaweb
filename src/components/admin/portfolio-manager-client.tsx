"use client";

import { useState, useEffect } from "react";
import {
  Plus, Pencil, Trash2, Loader2, Search, X,
  Check, ExternalLink, Star,
} from "lucide-react";
import { toast } from "sonner";

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  metrics: string | null;
  technologies: string[];
  industry: string | null;
  liveUrl: string | null;
  featured: boolean;
  status: string;
  order: number;
  createdAt: string;
}

interface FormData {
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  metrics: string;
  technologies: string;
  industry: string;
  liveUrl: string;
  featured: boolean;
  status: string;
  order: number;
}

const EMPTY_FORM: FormData = {
  title: "", slug: "", category: "", description: "", image: "",
  metrics: "", technologies: "", industry: "", liveUrl: "",
  featured: false, status: "published", order: 1,
};

export function PortfolioManagerClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/portfolio");
      const data = await res.json();
      if (data.success) setProjects(data.data.projects);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (project: Project) => {
    setForm({
      title: project.title,
      slug: project.slug,
      category: project.category,
      description: project.description,
      image: project.image,
      metrics: project.metrics || "",
      technologies: project.technologies.join(", "),
      industry: project.industry || "",
      liveUrl: project.liveUrl || "",
      featured: project.featured,
      status: project.status,
      order: project.order,
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/portfolio?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Project deleted");
        fetchProjects();
      } else {
        toast.error(data.error || "Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const body = {
        ...form,
        technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
        metrics: form.metrics || undefined,
        industry: form.industry || undefined,
        liveUrl: form.liveUrl || undefined,
      };

      const url = editingId
        ? `/api/admin/portfolio?id=${editingId}`
        : "/api/admin/portfolio";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "Project updated" : "Project created");
        setShowForm(false);
        setEditingId(null);
        setForm(EMPTY_FORM);
        fetchProjects();
      } else {
        toast.error(data.error || "Save failed");
      }
    } catch {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#666] focus:border-[#00e5ff] focus:outline-none"
          />
        </div>
        <button
          onClick={() => { setForm(EMPTY_FORM); setEditingId(null); setShowForm(true); }}
          className="flex items-center gap-2 rounded-lg bg-[#00e5ff] px-4 py-2 text-sm font-semibold text-[#0a0a0a] hover:bg-[#00b8d4] transition-all"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 size={24} className="animate-spin text-[#00e5ff]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 rounded-xl border border-[#2a2a2a] bg-[#111]">
          <p className="text-[#a0a0a0]">No projects found</p>
        </div>
      ) : (
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a2a2a] bg-[#1a1a1a]">
                  <th className="text-left px-4 py-3 text-[#a0a0a0] font-medium">Title</th>
                  <th className="text-left px-4 py-3 text-[#a0a0a0] font-medium">Category</th>
                  <th className="text-left px-4 py-3 text-[#a0a0a0] font-medium">Industry</th>
                  <th className="text-left px-4 py-3 text-[#a0a0a0] font-medium">Status</th>
                  <th className="text-center px-4 py-3 text-[#a0a0a0] font-medium">Featured</th>
                  <th className="text-right px-4 py-3 text-[#a0a0a0] font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => (
                  <tr key={project.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-white font-medium">{project.title}</p>
                      <p className="text-xs text-[#666]">{project.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-[#a0a0a0]">{project.category}</td>
                    <td className="px-4 py-3 text-[#a0a0a0]">{project.industry || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                        project.status === "published" ? "bg-green-500/10 text-green-400" :
                        project.status === "draft" ? "bg-yellow-500/10 text-yellow-400" :
                        "bg-red-500/10 text-red-400"
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {project.featured ? <Star size={14} className="text-yellow-400 fill-yellow-400 inline" /> : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleEdit(project)} className="p-1.5 rounded-lg text-[#666] hover:text-[#00e5ff] hover:bg-[#00e5ff]/10 transition-all">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="p-1.5 rounded-lg text-[#666] hover:text-red-400 hover:bg-red-500/10 transition-all">
                          <Trash2 size={14} />
                        </button>
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener" className="p-1.5 rounded-lg text-[#666] hover:text-[#00e5ff] hover:bg-[#00e5ff]/10 transition-all">
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-xl border border-[#2a2a2a] bg-[#111] max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-[#2a2a2a]">
              <h2 className="text-lg font-semibold text-white">{editingId ? "Edit Project" : "Add Project"}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#666] hover:text-white"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Title</label>
                  <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] focus:outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Slug</label>
                  <input value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} required className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] focus:outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Category</label>
                  <input value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} required className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] focus:outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Industry</label>
                  <input value={form.industry} onChange={(e) => setForm({...form, industry: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] focus:outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} required rows={3} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] focus:outline-none resize-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Image URL</label>
                  <input value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} required className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] focus:outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Metrics</label>
                  <input value={form.metrics} onChange={(e) => setForm({...form, metrics: e.target.value})} placeholder="+40% conversion rate" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] focus:outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Technologies (comma-separated)</label>
                  <input value={form.technologies} onChange={(e) => setForm({...form, technologies: e.target.value})} placeholder="React, Next.js, Node.js" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] focus:outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Live URL</label>
                  <input value={form.liveUrl} onChange={(e) => setForm({...form, liveUrl: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] focus:outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] focus:outline-none">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({...form, order: parseInt(e.target.value) || 1})} className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] focus:outline-none" />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({...form, featured: e.target.checked})} className="rounded border-[#333] bg-[#1a1a1a] text-[#00e5ff] focus:ring-[#00e5ff]" />
                  <label htmlFor="featured" className="text-sm text-[#a0a0a0]">Featured project</label>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2a2a2a]">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-[#a0a0a0] hover:text-white transition-colors">Cancel</button>
                <button type="submit" disabled={isSaving} className="flex items-center gap-2 rounded-lg bg-[#00e5ff] px-5 py-2 text-sm font-semibold text-[#0a0a0a] hover:bg-[#00b8d4] disabled:opacity-50 transition-all">
                  {isSaving && <Loader2 size={14} className="animate-spin" />}
                  {editingId ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
