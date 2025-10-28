"use client";

import { FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function FloatingButtons() {
  return (
    <>
    <a
  href="https://wa.me/+905343087254"
  target="_blank"
  rel="noopener noreferrer"
  className="
    fixed bottom-6 right-6
    text-[var(--white)]
    p-4 rounded-full shadow-xl
    transition transform
    hover:scale-110 animate-bounce
    z-50
  "
  style={{
    background: 'linear-gradient(135deg, var(--accent), var(--primary-light))',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  }}
>
  <FaWhatsapp className="w-7 h-7" />
</a>


      {/* Email */}
      <a
        href="mailto:loay.creativeworks@gmail.com"
        className="
          fixed bottom-6 left-6
            text-[var(--white)]
    p-4 rounded-full shadow-xl
    transition transform
    hover:scale-110 animate-bounce
    z-50
  "
  style={{
    background: 'linear-gradient(135deg, var(--accent), var(--primary-light))',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  }}
      >
        <Mail className="w-6 h-6" />
      </a>
    </>
  );
}
