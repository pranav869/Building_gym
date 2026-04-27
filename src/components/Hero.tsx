"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HEADLINE_LINES = ["Precision", "Dentistry.", "Perfected."];

const STATS = [
  { num: "3,000+", label: "Happy Patients" },
  { num: "15 yrs",  label: "Experience" },
  { num: "10+",     label: "Specialities" },
];

export default function Hero() {
  const heroRef        = useRef<HTMLElement>(null);
  const eyebrowRef     = useRef<HTMLSpanElement>(null);
  const headlineRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef         = useRef<HTMLDivElement>(null);
  const statsRef       = useRef<HTMLDivElement>(null);
  const cardRef        = useRef<HTMLDivElement>(null);
  const spotlightRef   = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!spotlightRef.current || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    spotlightRef.current.style.background =
      `radial-gradient(500px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px,
        rgba(10,122,142,0.08) 0%, transparent 65%)`;
  };

  useGSAP(
    () => {
      const lines = headlineRef.current?.querySelectorAll<HTMLSpanElement>(".line");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      tl
        .fromTo(eyebrowRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(Array.from(lines ?? []),
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
          "-=0.2")
        .fromTo(subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3")
        .fromTo(ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3")
        .fromTo(statsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3")
        .fromTo(cardRef.current,
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" },
          0.2)
        /* Badges pop in with a spring bounce after the card arrives */
        .fromTo('[data-badge]',
          { opacity: 0, scale: 0.4, y: 14 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.22, duration: 0.5, ease: 'back.out(1.8)' },
          1.0)
        /* Start a gentle float loop on the inner card element */
        .add(() => {
          const inner = heroRef.current?.querySelector<HTMLElement>('.card-float-inner');
          if (inner) gsap.to(inner, { y: -10, duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true });
        });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero — Smile Elite Dental"
      className="relative w-full pt-32 pb-24 md:pt-40 md:pb-32 bg-snow overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor spotlight — direct DOM mutation, zero React re-renders */}
      <div ref={spotlightRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* LEFT COMPONENT */}
        <div className="flex flex-col z-10">
          <span ref={eyebrowRef} className="inline-flex items-center gap-3 text-teal text-[11px] font-bold tracking-[0.22em] uppercase mb-6 opacity-0">
            <span className="w-8 h-px bg-teal/40" />
            Puzhal, Chennai · Est. 2008
          </span>

          <h1 ref={headlineRef} className="font-serif-heading text-[clamp(3.5rem,6vw,5.5rem)] leading-[1.05] tracking-tight text-charcoal mb-6">
            {HEADLINE_LINES.map((line, i) => (
              <span key={line} className="reveal-mask block overflow-hidden pb-1">
                <span className={`line block ${i === 2 ? "text-gold" : ""}`}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p ref={subtitleRef} className="text-slate text-lg leading-relaxed max-w-lg mb-10 opacity-0">
            Compassionate, multi-speciality dental care led by{" "}
            <strong className="text-charcoal font-semibold">Dr. Basheera BDS</strong>.
            Trusted for{" "}
            <strong className="text-teal font-medium">painless treatment</strong>{" "}
            across Chennai.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-12 opacity-0">
            <a href="#contact" className="btn-gold text-obsidian font-bold text-sm px-8 py-4 rounded-full inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5 hover:shadow-xl">
              Book Consultation
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M3 7.5h9M8 3.5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#services" className="text-teal font-bold text-sm px-8 py-4 rounded-full border border-teal/20 hover:bg-teal/5 transition-colors duration-200">
              Explore Services
            </a>
          </div>

          <div ref={statsRef} className="flex flex-wrap gap-6 md:gap-10 pt-8 border-t border-smoke/10 opacity-0">
            {STATS.map(({ num, label }) => (
              <div key={label}>
                <div className="text-3xl font-black text-teal leading-none mb-2">{num}</div>
                <div className="text-[11px] text-slate font-medium tracking-wider uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COMPONENT - Static High-End Image */}
        <div ref={cardRef} className="relative z-10 w-full opacity-0">
          <div className="card-float-inner relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] bg-teal-lt group">
            {/* Glossy Photo */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1600&auto=format&fit=crop')" }} 
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/20 to-transparent" />
          </div>

          {/* Floating Detail Badges */}
          <div data-badge className="absolute -bottom-6 -left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white px-5 py-4 flex items-center gap-4 opacity-0">
            <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a7a8e" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2C8 2 5 5 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-4-3-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <div>
              <div className="text-xs font-black text-charcoal tracking-wide">
                Advanced Technology
              </div>
              <div className="text-[10px] font-medium text-slate mt-0.5">
                Digital X-Ray · Laser Dentistry
              </div>
            </div>
          </div>

          <div data-badge className="absolute top-8 -right-4 z-20 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2 opacity-0">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#c8a96e">
                  <path d="M6 1l1.3 3.9H11L8 7.1l1.1 3.9L6 8.8l-3.1 2.2L4 7.1 1 4.9h3.7L6 1z"/>
                </svg>
              ))}
            </div>
            <span className="text-xs font-bold text-charcoal ml-1">5.0</span>
          </div>
        </div>
      </div>
    </section>
  );
}
