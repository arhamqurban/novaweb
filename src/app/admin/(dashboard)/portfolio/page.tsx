"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { PortfolioProject } from "@/types";
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  EyeOff,
  Star,
  Trash2,
  Copy,
  Edit3,
  X,
  Check,
  AlertTriangle,
  Loader2,
  ImageIcon,
  ChevronDown,
  Briefcase,
  RefreshCw,
  Layers,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────

type SortField = "order" | "title" | "completionDate";
type SortDir = "asc" | "desc";
type ModalMode = "create" | "edit";
type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

// ─── Default empty project ──────────────────────────────────

const EMPTY_PROJECT: Omit<PortfolioProject, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  category: "",
  description: "",
  longDescription: "",
  technologies: [],
  clientName: "",
  completionDate: "",
  featured: false,
  order: 0,
  status: "draft",
  thumbnail: "",
  screenshots: [],
  liveUrl: "",
  githubUrl: "",
  caseStudy: "",
  metrics: "",
};

// ─── Categories ─────────────────────────────────────────────

const CATEGORIES = [
  "Restaurant & Cafe",
  "Health & Fitness",
  "Creative Portfolio",
  "Software & SaaS",
  "Online Retail",
  "Property & Realty",
  "Healthcare & Dental",
  "Digital Agency",
  "Education & E-Learning",
  "Entertainment & Media",
  "Travel & Hospitality",
  "Non-Profit & Community",
  "Other",
];

// ─── Toast Hook ─────────────────────────────────────────────

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now().toString(36);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

// ─── Confirm Dialog ─────────────────────────────────────────

function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-[#2a2a2a] bg-[#111] p-6 shadow-2xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="mb-6 text-sm text-[#a0a0a0]">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-[#2a2a2a] bg-transparent px-4 py-2 text-sm text-[#a0a0a0] transition-colors hover:border-[#444] hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Toast Container ────────────────────────────────────────

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => {
        const colors = {
          success: "border-green-500/30 bg-green-500/10 text-green-400",
          error: "border-red-500/30 bg-red-500/10 text-red-400",
          info: "border-[#00E5FF]/30 bg-[#00E5FF]/10 text-[#00E5FF]",
        };
        const icons = {
          success: Check,
          error: AlertTriangle,
          info: RefreshCw,
        };
        const Icon = icons[toast.type];

        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm ${colors[toast.type]}`}
            style={{ animation: "slideIn 0.3s ease-out" }}
          >
            <Icon size={16} />
            <span className="text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => onRemove(toast.id)}
              className="ml-2 opacity-60 hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

// ─── Project Editor Modal ───────────────────────────────────

function ProjectEditorModal({
  open,
  mode,
  project,
  onSave,
  onClose,
}: {
  open: boolean;
  mode: ModalMode;
  project: Partial<PortfolioProject>;
  onSave: (data: Omit<PortfolioProject, "id" | "createdAt" | "updatedAt">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<PortfolioProject, "id" | "createdAt" | "updatedAt">>(EMPTY_PROJECT);
  const [techInput, setTechInput] = useState("");
  const [screenshotInput, setScreenshotInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      const nextForm = {
        title: project.title || "",
        category: project.category || "",
        description: project.description || "",
        longDescription: project.longDescription || "",
        technologies: project.technologies || [],
        clientName: project.clientName || "",
        completionDate: project.completionDate || "",
        featured: project.featured || false,
        order: project.order ?? 0,
        status: project.status || "draft",
        thumbnail: project.thumbnail || "",
        screenshots: project.screenshots || [],
          liveUrl: project.liveUrl || "",
          githubUrl: project.githubUrl || "",
          caseStudy: project.caseStudy || "",
          metrics: project.metrics || "",
        };
      // Syncing props to form state on modal open — intentional pattern
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setForm(nextForm);
      setTechInput((project.technologies || []).join(", "));
      setScreenshotInput((project.screenshots || []).join("\n"));
    }
  }, [open, project]);

  const handleChange = (field: string, value: string | boolean | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addTechnology = () => {
    const tags = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setForm((prev) => ({ ...prev, technologies: tags }));
  };

  const updateScreenshots = () => {
    const urls = screenshotInput
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    setForm((prev) => ({ ...prev, screenshots: urls }));
  };

  const handleSave = async () => {
    // Parse technologies and screenshots from inputs
    const techs = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const shots = screenshotInput
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const data = { ...form, technologies: techs, screenshots: shots };
    setSaving(true);
    // Small delay so the UI shows saving state
    await new Promise((r) => setTimeout(r, 200));
    onSave(data);
    setSaving(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm py-10">
      <div className="relative w-full max-w-3xl rounded-xl border border-[#2a2a2a] bg-[#111] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2a2a2a] px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            {mode === "create" ? "Add New Project" : "Edit Project"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#666] transition-colors hover:bg-[#1a1a1a] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 px-6 py-6 max-h-[70vh] overflow-y-auto">
          {/* Row: Title + Category */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Project Name *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. Restaurant Website"
                className="w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder-[#555] outline-none transition-colors focus:border-[#00E5FF]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Category *</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#00E5FF]"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Short Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Brief project summary (shown in cards)"
              rows={2}
              className="w-full resize-none rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder-[#555] outline-none transition-colors focus:border-[#00E5FF]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Long Description</label>
            <textarea
              value={form.longDescription}
              onChange={(e) => handleChange("longDescription", e.target.value)}
              placeholder="Detailed project description"
              rows={4}
              className="w-full resize-none rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder-[#555] outline-none transition-colors focus:border-[#00E5FF]"
            />
          </div>

          {/* Row: Client + Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Client Name</label>
              <input
                type="text"
                value={form.clientName}
                onChange={(e) => handleChange("clientName", e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder-[#555] outline-none transition-colors focus:border-[#00E5FF]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Completion Date</label>
              <input
                type="date"
                value={form.completionDate}
                onChange={(e) => handleChange("completionDate", e.target.value)}
                className="w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#00E5FF]"
              />
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Technologies</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => {
                  setTechInput(e.target.value);
                  addTechnology();
                }}
                onBlur={addTechnology}
                placeholder="Next.js, Tailwind CSS, Stripe (comma-separated)"
                className="flex-1 rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder-[#555] outline-none transition-colors focus:border-[#00E5FF]"
              />
            </div>
            {form.technologies.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {form.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/5 px-2.5 py-0.5 text-xs text-[#00E5FF]"
                  >
                    {tech}
                    <button
                      onClick={() => {
                        const updated = form.technologies.filter((_, j) => j !== i);
                        setForm((prev) => ({ ...prev, technologies: updated }));
                        setTechInput(updated.join(", "));
                      }}
                      className="opacity-60 hover:opacity-100"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Row: Featured + Status + Order */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Featured</label>
              <button
                onClick={() => handleChange("featured", !form.featured)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  form.featured
                    ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                    : "border-[#2a2a2a] bg-[#0a0a0a] text-[#666]"
                }`}
              >
                <Star size={14} className={form.featured ? "fill-yellow-400" : ""} />
                {form.featured ? "Featured" : "Not Featured"}
              </button>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Status</label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#00E5FF]"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Display Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => handleChange("order", parseInt(e.target.value) || 0)}
                min={0}
                className="w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#00E5FF]"
              />
            </div>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Thumbnail URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={form.thumbnail}
                onChange={(e) => handleChange("thumbnail", e.target.value)}
                placeholder="https://images.unsplash.com/photo-...?w=800&q=80"
                className="flex-1 rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder-[#555] outline-none transition-colors focus:border-[#00E5FF]"
              />
            </div>
            {form.thumbnail && (
              <div className="mt-2 overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#0a0a0a]">
                <div className="relative aspect-video w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.thumbnail}
                    alt="Thumbnail preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div className="absolute inset-0 hidden flex-col items-center justify-center bg-[#0a0a0a] text-[#555]">
                    <ImageIcon size={24} />
                    <p className="mt-1 text-xs">Invalid image URL</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Screenshots URL List */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Screenshots (URLs, one per line)</label>
            <textarea
              value={screenshotInput}
              onChange={(e) => {
                setScreenshotInput(e.target.value);
                updateScreenshots();
              }}
              onBlur={updateScreenshots}
              placeholder="https://images.unsplash.com/photo-...?w=1200&q=80"
              rows={3}
              className="w-full resize-none rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder-[#555] outline-none transition-colors focus:border-[#00E5FF]"
            />
            {form.screenshots.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {form.screenshots.map((url, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#0a0a0a]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Screenshot ${i + 1}`}
                      className="aspect-video w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <button
                      onClick={() => {
                        const updated = form.screenshots.filter((_, j) => j !== i);
                        setForm((prev) => ({ ...prev, screenshots: updated }));
                        setScreenshotInput(updated.join("\n"));
                      }}
                      className="absolute right-1 top-1 rounded bg-red-500/80 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X size={12} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Row: Live URL + GitHub */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Live Website URL</label>
              <input
                type="url"
                value={form.liveUrl}
                onChange={(e) => handleChange("liveUrl", e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder-[#555] outline-none transition-colors focus:border-[#00E5FF]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">GitHub URL</label>
              <input
                type="url"
                value={form.githubUrl}
                onChange={(e) => handleChange("githubUrl", e.target.value)}
                placeholder="https://github.com/user/repo"
                className="w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder-[#555] outline-none transition-colors focus:border-[#00E5FF]"
              />
            </div>
          </div>

          {/* Case Study */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Case Study Content</label>
            <textarea
              value={form.caseStudy}
              onChange={(e) => handleChange("caseStudy", e.target.value)}
              placeholder="Detailed case study narrative..."
              rows={5}
              className="w-full resize-none rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder-[#555] outline-none transition-colors focus:border-[#00E5FF]"
            />
          </div>

          {/* Metrics */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#a0a0a0]">Key Metrics / Results</label>
            <input
              type="text"
              value={form.metrics}
              onChange={(e) => handleChange("metrics", e.target.value)}
              placeholder="e.g. +120% online reservations"
              className="w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder-[#555] outline-none transition-colors focus:border-[#00E5FF]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#2a2a2a] px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#2a2a2a] bg-transparent px-4 py-2 text-sm text-[#a0a0a0] transition-colors hover:border-[#444] hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.title}
            className="flex items-center gap-2 rounded-lg bg-[#00E5FF] px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#00E5FF]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {mode === "create" ? "Create Project" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────

export default function AdminPortfolioPage() {
  const router = useRouter();
  const { toasts, addToast, removeToast } = useToast();

  // Auth
  const [isAuth, setIsAuth] = useState(false);

  // Data
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter & Sort
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortField, setSortField] = useState<SortField>("order");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [editingProject, setEditingProject] = useState<Partial<PortfolioProject>>(EMPTY_PROJECT);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<PortfolioProject | null>(null);

  // ─── Auth Check ────────────────────────────────────────────

  useEffect(() => {
    if (localStorage.getItem("nova_admin") !== "true") {
      router.replace("/admin/login");
      return;
    }
    // Auth check on mount — intentional pattern
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsAuth(true);
  }, []);

  // ─── Fetch Projects ───────────────────────────────────────

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/portfolio");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch {
      addToast("Failed to load projects", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    // Fetch projects after auth — intentional pattern
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (isAuth) fetchProjects();
  }, [isAuth]);

  // ─── API Call ──────────────────────────────────────────────

  const apiCall = useCallback(
    async (
      action: string,
      payload: Record<string, unknown> = {}
    ): Promise<{ success: boolean; [key: string]: unknown }> => {
      try {
        const res = await fetch("/api/admin/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, ...payload }),
        });
        return await res.json();
      } catch {
        addToast("Network error. Check console.", "error");
        return { success: false };
      }
    },
    [addToast]
  );

  // ─── CRUD Operations ──────────────────────────────────────

  const handleCreate = async (data: Omit<PortfolioProject, "id" | "createdAt" | "updatedAt">) => {
    const result = await apiCall("create", { project: data });
    if (result.success) {
      addToast("Project created successfully!", "success");
      setModalOpen(false);
      fetchProjects();
    } else {
      addToast("Failed to create project", "error");
    }
  };

  const handleUpdate = async (data: Omit<PortfolioProject, "id" | "createdAt" | "updatedAt">) => {
    if (!editingProject.id) return;
    const result = await apiCall("update", { id: editingProject.id, project: data });
    if (result.success) {
      addToast("Project updated successfully!", "success");
      setModalOpen(false);
      fetchProjects();
    } else {
      addToast("Failed to update project", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const result = await apiCall("delete", { id: deleteTarget.id });
    if (result.success) {
      addToast(`"${deleteTarget.title}" deleted`, "success");
      setDeleteTarget(null);
      fetchProjects();
    } else {
      addToast("Failed to delete project", "error");
    }
  };

  const handleDuplicate = async (project: PortfolioProject) => {
    const result = await apiCall("duplicate", { id: project.id });
    if (result.success) {
      addToast(`"${project.title}" duplicated as draft`, "success");
      fetchProjects();
    } else {
      addToast("Failed to duplicate project", "error");
    }
  };

  const handleToggleFeatured = async (project: PortfolioProject) => {
    const result = await apiCall("update", {
      id: project.id,
      project: { featured: !project.featured },
    });
    if (result.success) {
      addToast(project.featured ? "Removed from featured" : "Marked as featured", "success");
      fetchProjects();
    } else {
      addToast("Failed to toggle featured", "error");
    }
  };

  const handleSeedData = async () => {
    // Seed data is server-side, so we import and call it.
    // For this client page, we'll POST a special payload to the API.
    // The API doesn't have a seed action, so let's do it via a direct call.
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        addToast("Sample projects seeded!", "success");
        fetchProjects();
      } else {
        addToast("Failed to seed projects", "error");
      }
    } catch {
      addToast("Failed to seed projects", "error");
    }
  };

  // ─── Open Edit Modal ──────────────────────────────────────

  const openEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setModalMode("edit");
    setModalOpen(true);
  };

  const openCreate = () => {
    setEditingProject(EMPTY_PROJECT);
    setModalMode("create");
    setModalOpen(true);
  };

  // ─── Search / Filter / Sort ───────────────────────────────

  const filtered = projects
    .filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoryFilter && p.category !== categoryFilter) return false;
      return true;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === "order") cmp = a.order - b.order;
      else if (sortField === "title") cmp = a.title.localeCompare(b.title);
      else if (sortField === "completionDate") cmp = a.completionDate.localeCompare(b.completionDate);
      return sortDir === "asc" ? cmp : -cmp;
    });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];

  // ─── Render ───────────────────────────────────────────────

  if (!isAuth) return null;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-3 text-white">Portfolio Management</h1>
          <p className="mt-1 text-sm text-[#a0a0a0]">
            {projects.length} {projects.length === 1 ? "project" : "projects"} total
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSeedData}
            className="flex items-center gap-2 rounded-lg border border-[#2a2a2a] bg-transparent px-4 py-2 text-sm text-[#a0a0a0] transition-colors hover:border-[#444] hover:text-white"
          >
            <RefreshCw size={14} />
            Seed Data
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-lg bg-[#00E5FF] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#00E5FF]/90"
          >
            <Plus size={16} />
            Add New Project
          </button>
        </div>
      </div>

      {/* Search, Filter, Sort Controls */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title..."
            className="w-full rounded-lg border border-[#2a2a2a] bg-[#111] py-2 pl-9 pr-3 text-sm text-white placeholder-[#555] outline-none transition-colors focus:border-[#00E5FF]"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="relative">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="min-w-[160px] appearance-none rounded-lg border border-[#2a2a2a] bg-[#111] py-2 pl-8 pr-8 text-sm text-white outline-none transition-colors focus:border-[#00E5FF]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1.5 text-xs text-[#666]">
          <ArrowUpDown size={12} />
          <span>Sort by:</span>
          {(["order", "title", "completionDate"] as SortField[]).map((field) => (
            <button
              key={field}
              onClick={() => toggleSort(field)}
              className={`rounded-md px-2 py-1 transition-colors ${
                sortField === field
                  ? "bg-[#00E5FF]/10 text-[#00E5FF]"
                  : "hover:text-white"
              }`}
            >
              {field === "order" ? "Order" : field === "title" ? "Title" : "Date"}
              {sortField === field && (sortDir === "asc" ? " ↑" : " ↓")}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        /* Loading State */
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#2a2a2a] bg-[#111] py-20">
          <Loader2 size={32} className="animate-spin text-[#00E5FF]" />
          <p className="mt-3 text-sm text-[#a0a0a0]">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        /* Empty State */
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a1a1a]">
            <Briefcase size={32} className="text-[#555]" />
          </div>
          <h2 className="text-lg font-semibold text-white">No Projects Yet</h2>
          <p className="mt-1 text-sm text-[#a0a0a0]">
            Get started by adding your first portfolio project or seeding demo data.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={openCreate}
              className="flex items-center gap-2 rounded-lg bg-[#00E5FF] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#00E5FF]/90"
            >
              <Plus size={16} />
              Add New Project
            </button>
            <button
              onClick={handleSeedData}
              className="flex items-center gap-2 rounded-lg border border-[#2a2a2a] bg-transparent px-4 py-2 text-sm text-[#a0a0a0] transition-colors hover:border-[#444] hover:text-white"
            >
              <RefreshCw size={14} />
              Seed Sample Data
            </button>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        /* No Results */
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-12 text-center">
          <Search size={32} className="mx-auto mb-3 text-[#555]" />
          <h2 className="text-lg font-semibold text-white">No Matching Projects</h2>
          <p className="mt-1 text-sm text-[#a0a0a0]">
            Try adjusting your search or filter criteria.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategoryFilter("");
            }}
            className="mt-4 text-sm text-[#00E5FF] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        /* Projects Table */
        <div className="overflow-x-auto rounded-xl border border-[#2a2a2a] bg-[#111]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2a2a] text-left text-xs font-medium uppercase tracking-wider text-[#666]">
                <th className="px-4 py-3 w-[60px]">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3 hidden md:table-cell">Category</th>
                <th className="px-4 py-3 hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 text-center">Featured</th>
                <th className="px-4 py-3 text-center w-[70px]">Order</th>
                <th className="px-4 py-3 text-right w-[140px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {filtered.map((project) => (
                <tr
                  key={project.id}
                  className="group transition-colors hover:bg-[#0f0f0f]"
                >
                  {/* Thumbnail */}
                  <td className="px-4 py-3">
                    <div className="h-10 w-14 overflow-hidden rounded-md border border-[#2a2a2a] bg-[#0a0a0a]">
                      {project.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ImageIcon size={14} className="text-[#444]" />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Title */}
                  <td className="px-4 py-3">
                    <div className="max-w-[220px]">
                      <p className="truncate text-sm font-medium text-white">{project.title}</p>
                      <p className="mt-0.5 truncate text-xs text-[#666]">{project.description}</p>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-sm text-[#a0a0a0]">{project.category || "—"}</span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        project.status === "published"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}
                    >
                      {project.status === "published" ? (
                        <Eye size={11} />
                      ) : (
                        <EyeOff size={11} />
                      )}
                      {project.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>

                  {/* Featured Toggle */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggleFeatured(project)}
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors ${
                        project.featured
                          ? "text-yellow-400 hover:bg-yellow-500/10"
                          : "text-[#555] hover:text-yellow-400 hover:bg-yellow-500/5"
                      }`}
                      title={project.featured ? "Remove from featured" : "Mark as featured"}
                    >
                      <Star
                        size={14}
                        className={project.featured ? "fill-yellow-400" : ""}
                      />
                    </button>
                  </td>

                  {/* Order */}
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm text-[#a0a0a0]">{project.order}</span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(project)}
                        className="rounded-md p-1.5 text-[#666] transition-colors hover:bg-[#1a1a1a] hover:text-[#00E5FF]"
                        title="Edit project"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDuplicate(project)}
                        className="rounded-md p-1.5 text-[#666] transition-colors hover:bg-[#1a1a1a] hover:text-blue-400"
                        title="Duplicate project"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(project)}
                        className="rounded-md p-1.5 text-[#666] transition-colors hover:bg-[#1a1a1a] hover:text-red-400"
                        title="Delete project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Table footer with count */}
          <div className="flex items-center justify-between border-t border-[#2a2a2a] px-4 py-3">
            <span className="text-xs text-[#666]">
              Showing {filtered.length} of {projects.length} projects
            </span>
            <div className="flex items-center gap-2 text-xs text-[#666]">
              <Layers size={12} />
              <span>{categories.length} categories</span>
            </div>
          </div>
        </div>
      )}

      {/* Modals & Dialogs */}
      <ProjectEditorModal
        open={modalOpen}
        mode={modalMode}
        project={editingProject}
        onSave={modalMode === "create" ? handleCreate : handleUpdate}
        onClose={() => setModalOpen(false)}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
