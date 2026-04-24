"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Stat data ── update these values to reflect real clinic numbers ──────── */
const STATS = [
  { value: 3000, suffix: "+", label: "Patients Transformed", decimals: 0 },
  { value: 15,   suffix: "+", label: "Years of Excellence",  decimals: 0 },
  { value: 4.9,  suffix: "★", label: "Average Rating",       decimals: 1 },
  { value: 98,   suffix: "%", label: "Would Recommend Us",   decimals: 0 },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* ── Section reveal: numbers count up when scrolled into view ─────── */
      const counters = sectionRef.current!.querySelectorAll<HTMLSpanElement>(".stat-number");
      const labels   = sectionRef.current!.querySelectorAll<HTMLDivElement>(".stat-card");

      /* Staggered card slide-up */
      gsap.fromTo(
        labels,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      /* Counting number animation (GSAP object tween) */
      counters.forEach((el) => {
        const target   = parseFloat(el.dataset.target ?? "0");
        const decimals = parseInt(el.dataset.decimals ?? "0");
        const obj      = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = obj.val.toFixed(decimals);
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="stats"
      aria-label="Clinic statistics"
      className="bg-charcoal py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section label */}
        <p className="text-gold text-xs font-semibold tracking-[0.28em] uppercase mb-16 text-center">
          By The Numbers
        </p>

        {/* Stats grid */}
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {STATS.map(({ value, suffix, label, decimals }) => (
            <div
              key={label}
              className="stat-card text-center opacity-0"
            >
              {/* Number */}
              <dt className="text-5xl md:text-6xl font-black text-snow leading-none tracking-tight mb-1">
                <span
                  className="stat-number"
                  data-target={value}
                  data-decimals={decimals}
                >
                  0
                </span>
                <span className="text-gold">{suffix}</span>
              </dt>
              {/* Label */}
              <dd className="text-mist text-sm font-medium mt-3">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
