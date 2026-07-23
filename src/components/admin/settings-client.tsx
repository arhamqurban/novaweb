"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function SettingsClient() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Settings saved (demo)");
    setIsSaving(false);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-6">
        <h2 className="text-lg font-semibold text-white mb-1">Site Settings</h2>
        <p className="text-sm text-[#a0a0a0] mb-6">Configure your business information and social links.</p>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Business Info */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Business Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Business Name</label>
                <input defaultValue="Nova Webs" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff] focus:outline-none" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Tagline</label>
                <input defaultValue="Digital Excellence, Crafted." className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Email</label>
                <input defaultValue="hello@novawebs.com" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Phone</label>
                <input defaultValue="+92 300 1234567" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Address</label>
                <input defaultValue="123-Gulberg, Lahore, Pakistan" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">WhatsApp Number</label>
                <input defaultValue="https://wa.me/923001234567" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Google Maps URL</label>
                <input defaultValue="https://maps.google.com/?q=Gulberg+Lahore" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Business Hours</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Weekdays</label>
                <input defaultValue="Mon – Fri: 9:00 AM – 6:00 PM" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Saturday</label>
                <input defaultValue="Sat: 10:00 AM – 4:00 PM" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Social Media Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Instagram</label>
                <input defaultValue="https://instagram.com/novawebs9" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Facebook</label>
                <input defaultValue="https://facebook.com/NovaWebs" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">LinkedIn</label>
                <input defaultValue="https://linkedin.com/company/novawebs" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">YouTube</label>
                <input defaultValue="https://youtube.com/@novawebs" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Analytics & Tracking</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Google Analytics ID</label>
                <input placeholder="G-XXXXXXXXXX" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#a0a0a0] mb-1">Meta Pixel ID</label>
                <input placeholder="1234567890" className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:border-[#00e5ff]" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-[#2a2a2a]">
            <button type="submit" disabled={isSaving} className="flex items-center gap-2 rounded-lg bg-[#00e5ff] px-6 py-2.5 text-sm font-semibold text-[#0a0a0a] hover:bg-[#00b8d4] disabled:opacity-50 transition-all">
              {isSaving && <Loader2 size={14} className="animate-spin" />}
              <Save size={14} />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
