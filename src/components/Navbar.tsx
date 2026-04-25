"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (y < 40) {
        setExpanded(true);
      } else if (y < lastY) {
        setExpanded(true); // scrolling up → expand
      } else {
        setExpanded(false); // scrolling down → compact
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power3.out", delay: 0.15 }
      );
    },
    { scope: navRef }
  );

  return (
    <nav ref={navRef} role="navigation" aria-label="Main navigation" className="fixed inset-x-0 top-4 z-50">
      <div
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`
          mx-auto transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]
          ${expanded ? "max-w-5xl" : "max-w-3xl"}
        `}
      >
        <div
          className={`
            rounded-full border border-white/10 backdrop-blur-2xl
            bg-charcoal/70 shadow-[0_12px_50px_rgba(0,0,0,0.45)]
            transition-all duration-500
            ${expanded ? "px-5 md:px-8 py-3.5" : "px-4 md:px-6 py-3"}
          `}
        >
          <div className="flex items-center justify-between gap-4">
            <Link href="/" aria-label="Smile Elite Dental — home" className="shrink-0">
              <span className="text-snow font-black text-lg tracking-tight">
                Smile<span className="text-gold">Elite</span>
              </span>
            </Link>

            <ul className="hidden md:flex items-center gap-6" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="text-mist text-sm font-medium hover:text-pearl transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center gap-2 shrink-0">
              <a
                href="tel:08056390607"
                className="magnetic text-mist text-[11px] font-semibold tracking-[0.24em] uppercase hover:text-pearl transition-colors"
              >
                Call
              </a>
              <a
                href="#contact"
                className="magnetic btn-gold nav-cta-shimmer text-obsidian text-[11px] font-bold uppercase tracking-wide px-5 py-2 rounded-full"
              >
                Book
              </a>
            </div>

            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <span className={`block w-6 h-0.5 bg-pearl transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-pearl transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-pearl transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-3 mx-2 rounded-3xl bg-obsidian/95 backdrop-blur-xl border border-white/10 px-6 pb-8 pt-5 shadow-2xl md:hidden">
            <ul className="flex flex-col gap-5" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} onClick={() => setIsOpen(false)} className="text-pearl text-lg font-medium">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <a href="tel:08056390607" className="magnetic w-full text-center text-pearl text-sm font-semibold border border-pearl/30 rounded-full py-3">
                Tap to Call 080563 90607
              </a>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="magnetic inline-flex justify-center btn-gold text-obsidian font-semibold text-sm px-6 py-3 rounded-full"
              >
                Book Free Consultation
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
