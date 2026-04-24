"use client";

import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsVisible(window.scrollY > 320);
    };
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Desktop floating pill */}
      <div
        className={`hidden lg:block cta-floating transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-charcoal/95 border border-white/10 backdrop-blur-xl rounded-full shadow-2xl flex items-center gap-3 pl-4 pr-2 py-1.5">
          <div className="text-xs uppercase tracking-[0.3em] text-mist/80">Ready?</div>
          <a href="#contact" className="magnetic btn-gold text-xs font-semibold px-6 py-2 rounded-full">
            Book Consultation
          </a>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <div
        className={`lg:hidden cta-mobile-sheet bg-charcoal/95 backdrop-blur-xl border-t border-white/10 transition-transform duration-500 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="px-5 py-4 flex items-center gap-3">
          <div>
            <p className="text-pearl text-sm font-semibold">Need a same-day consult?</p>
            <p className="text-mist text-xs">Tap below to call or reserve a visit.</p>
          </div>
          <div className="ml-auto flex gap-2">
            <a
              href="tel:08056390607"
              className="magnetic rounded-full border border-pearl/20 text-pearl text-xs font-semibold px-4 py-2"
            >
              Call
            </a>
            <a href="#contact" className="magnetic btn-gold text-obsidian text-xs font-bold px-4 py-2 rounded-full">
              Book
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
