"use client";

import { FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function FloatingButtons() {
  return (
    <>
      {/* WhatsApp */}
      <a
        href="https://wa.me/+905343087254"
        target="_blank"
        rel="noopener noreferrer"
        className="
          fixed bottom-6 right-6
          bg-[var(--primary)] text-[var(--white)]
          p-4 rounded-full shadow-xl
          hover:bg-[var(--primary-dark)]
          transition transform
          hover:scale-110 animate-bounce
          z-50
        "
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>

      {/* Email */}
      <a
        href="mailto:info@domain.com"
        className="
          fixed bottom-6 left-6
          bg-[var(--primary)] text-[var(--white)]
          p-4 rounded-full shadow-xl
          hover:bg-[var(--primary-dark)]
          transition transform
          hover:scale-110 animate-bounce
          z-50
        "
      >
        <Mail className="w-6 h-6" />
      </a>
    </>
  );
}
