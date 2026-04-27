"use client";

import { useEffect, useState } from "react";

const PHONE_HREF = "tel:+918838250227";

export default function PhonePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /* Show after WhatsApp icon so they don't appear at once */
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 9000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed z-[89] right-5 bottom-40 md:bottom-22 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-3 scale-95 pointer-events-none"
      }`}
    >
      <a
        href={PHONE_HREF}
        aria-label="Call clinic"
        className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-snow text-charcoal shadow-[0_14px_35px_rgba(0,0,0,0.22)] ring-1 ring-black/10 hover:scale-105 transition-transform"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </a>
    </div>
  );
}
