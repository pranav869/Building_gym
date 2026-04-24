"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PARTNERS = [
  { label: "ADA", color: "#4a90d9" },
  { label: "AACD", color: "#d96b6b" },
  { label: "Forbes Health", color: "#5dbd5d" },
  { label: "Vogue Wellness", color: "#d4b44a" },
  { label: "Beverly Hills Medical", color: "#8b6bd9" },
  { label: "Harper's Bazaar", color: "#c8a96e" },
  { label: "Cedars-Sinai Network", color: "#4aa2a1" },
  { label: "California Dental Board", color: "#e58a45" },
];

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Professional associations and press features"
      className="bg-obsidian border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-10 flex flex-col gap-3">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-mist/70">
          <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
          Trusted by leading associations & publications
        </div>
        <div className="overflow-hidden">
          <div className="trust-marquee gap-6 text-pearl/80 text-sm md:text-base font-medium">
            {[...PARTNERS, ...PARTNERS].map((partner, i) => (
              <div
                key={`${partner.label}-${i}`}
                className="trust-logo-chip whitespace-nowrap rounded-full border border-white/10 px-5 py-2 text-xs md:text-sm tracking-[0.14em] uppercase"
                style={{ ["--logo-color" as string]: partner.color }}
              >
                {partner.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
