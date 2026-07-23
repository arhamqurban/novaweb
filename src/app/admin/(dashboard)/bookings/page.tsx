"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Calendar, ExternalLink } from "lucide-react";

interface Booking {
  _filename: string;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  preferredContact?: string;
  message?: string;
  receivedAt?: string;
}

export default function AdminBookingsPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("nova_admin") !== "true") {
      router.replace("/admin/login");
      return;
    }
    setIsAuth(true);
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // The local API doesn't need auth since it's same-origin
      const res = await fetch("/api/admin/submissions?type=booking&limit=100");
      if (res.status === 401) {
        // Try without auth
        const res2 = await fetch("/api/admin/submissions?type=booking&limit=100", {
          headers: { "Authorization": "Bearer admin123" }
        });
        const data = await res2.json();
        setBookings(data.submissions || []);
      } else {
        const data = await res.json();
        setBookings(data.submissions || []);
      }
    } catch (e) {
      console.error("Failed to load bookings");
    }
    setLoading(false);
  };

  const deleteBooking = async (filename: string) => {
    if (!confirm("Delete this booking?")) return;
    try {
      await fetch("/api/admin/submissions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer admin123" },
        body: JSON.stringify({ filename }),
      });
      fetchBookings();
    } catch (e) {
      console.error("Delete failed");
    }
  };

  if (!isAuth) return null;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="heading-3 text-white">Bookings</h1>
          <p className="text-sm text-[#a0a0a0]">{bookings.length} total bookings</p>
        </div>
      </div>

      {loading ? (
        <p className="text-[#a0a0a0] text-sm">Loading...</p>
      ) : bookings.length === 0 ? (
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-8 text-center">
          <Calendar size={32} className="mx-auto mb-3 text-[#666]" />
          <p className="text-[#a0a0a0]">No bookings yet. They will appear here when clients book consultations.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._filename} className="rounded-xl border border-[#2a2a2a] bg-[#111] p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-[#FFD600]/10 text-[#FFD600] px-2 py-0.5 rounded-full font-medium">New Booking</span>
                    {b.receivedAt && <span className="text-xs text-[#666]">{new Date(b.receivedAt).toLocaleString()}</span>}
                  </div>
                  <h3 className="font-semibold text-white text-lg">{b.name || "Unknown"}</h3>
                </div>
                <button onClick={() => deleteBooking(b._filename)} className="text-[#666] hover:text-[#FF1744] transition-colors" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div><span className="text-[#666]">Email:</span> <span className="text-[#e0e0e0]">{b.email}</span></div>
                <div><span className="text-[#666]">Phone:</span> <span className="text-[#e0e0e0]">{b.phone}</span></div>
                <div><span className="text-[#666]">Service:</span> <span className="text-[#e0e0e0]">{b.service}</span></div>
                <div><span className="text-[#666]">Budget:</span> <span className="text-[#e0e0e0]">{b.budget}</span></div>
                <div><span className="text-[#666]">Timeline:</span> <span className="text-[#e0e0e0]">{b.timeline}</span></div>
                <div><span className="text-[#666]">Contact via:</span> <span className="text-[#e0e0e0]">{b.preferredContact || "Not set"}</span></div>
              </div>

              {b.message && (
                <div className="mt-4 p-3 rounded-lg bg-[#1a1a1a]">
                  <p className="text-sm text-[#e0e0e0]">{b.message}</p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-[#2a2a2a] flex gap-3">
                <a href={`tel:${b.phone}`} className="text-xs font-medium text-[#00E5FF] hover:text-[#4DF0FF] transition-colors">📞 Call</a>
                <a href={`mailto:${b.email}`} className="text-xs font-medium text-[#00E5FF] hover:text-[#4DF0FF] transition-colors">✉️ Email</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
