"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Service data ── */
const SERVICES = [
  {
    id: "cleaning",
    number: "01",
    title: "Teeth Cleaning",
    tagline: "Healthy Gums. Brighter Smile.",
    description:
      "Professional removal of plaque, tartar, and surface stains using gentle ultrasonic scaling and polishing. Ideal for preventing gum disease and maintaining long-term oral health.",
    highlights: ["Approx. 45 Minutes", "Stain Removal", "Preventive Care"],
    gradient: "from-[#171a21] to-[#0f1115]",
    accent: "#4a90d9",
  },
  {
    id: "root-canal",
    number: "02",
    title: "Root Canal Treatment",
    tagline: "Painless Relief. Natural Tooth Saved.",
    description:
      "Comfort-focused root canal procedures to remove infection and preserve your natural tooth structure. Treatment is completed with precision and minimal discomfort.",
    highlights: ["60–90 Minutes", "Pain-Minimized Procedure", "Tooth Preservation"],
    gradient: "from-[#1a2e1a] to-[#0f1a0f]",
    accent: "#5dbd5d",
  },
  {
    id: "implants",
    number: "03",
    title: "Dental Implants",
    tagline: "Permanent. Functional. Natural-Looking.",
    description:
      "Advanced implant planning and placement for missing teeth, designed to restore bite function and smile aesthetics with long-lasting outcomes.",
    highlights: ["2–3 Visits", "Natural Aesthetics", "Long-Term Solution"],
    gradient: "from-[#2b271e] to-[#1c1913]",
    accent: "#c8a96e",
  },
  {
    id: "aligners",
    number: "04",
    title: "Braces & Aligners",
    tagline: "Confident Smile Alignment For All Ages.",
    description:
      "Orthodontic treatment options including traditional braces and clear aligners to correct spacing, crowding, and bite issues with planned, predictable progress.",
    highlights: ["12–18 Months", "Clear Aligners Available", "Adult + Teen Care"],
    gradient: "from-[#1f1b2e] to-[#14121f]",
    accent: "#8b6bd9",
  },
  {
    id: "cosmetic",
    number: "05",
    title: "Cosmetic & General Dentistry",
    tagline: "From Smile Design To Everyday Dental Care.",
    description:
      "Comprehensive care including teeth whitening, veneers, smile makeovers, routine check-ups, tooth extractions, and crowns/bridges — all under one roof.",
    highlights: ["Whitening + Veneers", "Crowns & Bridges", "Routine Check-ups"],
    gradient: "from-[#291717] to-[#1a0f0f]",
    accent: "#d96b6b",
  },
];

export default function PinnedServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(
    () => {
      // Fade in the section
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      // Card scroll triggers to update the active index on the left nav
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        // Setup intersection observer style active state via ScrollTrigger
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveIdx(index);
          }
        });

        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
            /* Stagger the highlight chips with a spring pop after the card arrives */
            onComplete: () => {
              gsap.fromTo(
                card.querySelectorAll('.highlight-chip'),
                { opacity: 0, scale: 0.75, y: 8 },
                { opacity: 1, scale: 1, y: 0, stagger: 0.08, duration: 0.32, ease: 'back.out(1.4)' }
              );
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="services" aria-label="Our dental services" className="bg-pearl relative z-10 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN - Sticky Navigation */}
        <div ref={leftRef} className="lg:sticky lg:top-32 self-start opacity-0">
          <p className="text-gold text-xs font-bold tracking-[0.28em] uppercase mb-5">Our Expertise</p>
          <h2 className="font-serif-heading text-charcoal text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] tracking-tight mb-6">
            Every smile
            <br />
            <span className="text-gold text-opacity-80">deserves precision.</span>
          </h2>
          <p className="text-slate text-base md:text-lg max-w-md mb-10 leading-relaxed font-light">
            Scroll to explore our signature treatments — each crafted for uncompromising, Beverly Hills–grade results.
          </p>

          <nav aria-label="Service navigator" className="hidden lg:block relative pl-1">
            <ol className="flex flex-col gap-5 relative z-10">
              {SERVICES.map(({ id, number, title }, i) => {
                const isActive = i === activeIdx;
                return (
                  <li key={id} className={`flex items-center gap-6 transition-all duration-300 ${isActive ? "opacity-100 translate-x-2" : "opacity-40 hover:opacity-70"}`}>
                    <span className={`font-mono text-xs font-medium tracking-wider ${isActive ? "text-gold" : "text-charcoal"}`}>
                      {number}
                    </span>
                    <a href={`#${id}`} className={`text-[15px] font-semibold tracking-wide ${isActive ? "text-charcoal" : "text-slate"}`}>
                      {title}
                    </a>
                    {isActive && (
                      <span className="h-px flex-1 max-w-[4rem] bg-gold/50 ml-4 hidden xl:block" />
                    )}
                  </li>
                );
              })}
            </ol>
            {/* Nav line indicator */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-smoke/10 -z-10" />
          </nav>
        </div>

        {/* RIGHT COLUMN - Scrolling Cards */}
        <div className="flex flex-col gap-8 md:gap-12">
          {SERVICES.map((service, i) => (
            <article
              id={service.id}
              key={service.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`w-full rounded-[2rem] p-8 md:p-12 lg:p-14 bg-gradient-to-br ${service.gradient} shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-transform duration-500 hover:-translate-y-2`}
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-5xl font-light text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
                  {service.number}
                </span>
                <span className="animate-pulse-glow w-3 h-3 rounded-full" style={{ backgroundColor: service.accent, boxShadow: `0 0 15px ${service.accent}` }} aria-hidden="true" />
              </div>

              <h3 className="font-serif-heading text-snow text-3xl md:text-4xl lg:text-[2.75rem] leading-tight mb-4">
                {service.title}
              </h3>
              
              <p className="font-medium text-[15px] md:text-base tracking-wide mb-6" style={{ color: service.accent }}>
                {service.tagline}
              </p>
              
              <p className="text-pearl/80 text-base md:text-lg leading-relaxed font-light mb-10 max-w-xl">
                {service.description}
              </p>
              
              <ul className="flex flex-wrap gap-3 mb-10" role="list">
                {service.highlights.map((h) => (
                  <li key={h} className="highlight-chip opacity-0 text-[11px] font-bold tracking-wider uppercase px-4 py-2 rounded-full border bg-white/5 backdrop-blur-sm" style={{ color: service.accent, borderColor: `${service.accent}30` }}>
                    {h}
                  </li>
                ))}
              </ul>

              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-snow hover:text-gold transition-colors tracking-wide uppercase group">
                Learn More
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
