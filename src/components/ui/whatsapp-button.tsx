"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
interface WhatsAppButtonProps {
  whatsappUrl: string;
}

export function WhatsAppButton({ whatsappUrl }: WhatsAppButtonProps) {
  const [hasPulsed, setHasPulsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasPulsed(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl md:bottom-8 md:right-8",
        "max-md:bottom-4 max-md:right-4 max-md:px-4 max-md:py-2.5",
        !hasPulsed && "animate-pulse-whatsapp"
      )}
    >
      <MessageCircle size={22} />
      <span className="text-sm font-semibold max-md:hidden">Chat with us</span>
    </a>
  );
}
