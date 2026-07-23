"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface AnnouncementMessage {
  text: string;
  cta: string;
  href: string;
}

interface AnnouncementBarProps {
  enabled: boolean;
  messages: AnnouncementMessage[];
}

export function AnnouncementBar({ enabled, messages }: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed || !enabled) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isDismissed, messages.length, enabled]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY <= 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDismissed || !isVisible || !enabled || messages.length === 0)
    return null;

  const current = messages[currentIndex];

  return (
    <div className="relative h-10 bg-accent-primary text-text-inverse">
      <div className="container-nova flex h-full items-center justify-center text-sm font-medium">
        <span className="animate-fadeIn">
          ✨ {current.text}{" "}
          <a
            href={current.href}
            className="ml-1 underline underline-offset-2 hover:no-underline font-semibold"
          >
            {current.cta}
          </a>
        </span>
      </div>
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
