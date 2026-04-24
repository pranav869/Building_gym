"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TESTIMONIALS = [
  {
    quote:
      "Absolutely painless root canal and surgery experience. The treatment was smooth, and Dr. Basheera explained everything clearly.",
    author: "Akhil Kumar",
    role: "Google Review · Root Canal",
    rating: 5,
    initials: "AK",
    color: "#4a90d9",
  },
  {
    quote:
      "Very kind service during my teeth cleaning session. Every step was explained in detail and I felt comfortable throughout.",
    author: "Sangeetha Manikandan",
    role: "Google Review · Teeth Cleaning",
    rating: 5,
    initials: "SM",
    color: "#5dbd5d",
  },
  {
    quote:
      "Highly recommend Care N Cure for painless root canal treatment. Professional care and great post-treatment guidance.",
    author: "Gopika Venkat",
    role: "Google Review · Root Canal",
    rating: 5,
    initials: "GV",
    color: "#d4b44a",
  },
  {
    quote:
      "From consultation to follow-up, the team was patient-focused, gentle, and professional. Excellent care for families.",
    author: "Verified Patient",
    role: "Google Review · General Dentistry",
    rating: 5,
    initials: "VP",
    color: "#8b6bd9",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#c8a96e" aria-hidden="true">
          <path d="M7 1l1.5 4.5H13L9.3 8.2l1.3 4.5L7 10.2l-3.6 2.5 1.3-4.5L1 5.5h4.5L7 1z" />
        </svg>
      ))}
    </div>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 140, damping: 18 });
  const smoothY = useSpring(y, { stiffness: 140, damping: 18 });

  const rotateX = useTransform(smoothY, [-20, 20], [7, -7]);
  const rotateY = useTransform(smoothX, [-20, 20], [-7, 7]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const sliderStyle = useMemo(
    () => ({
      transform: `translateX(-${activeIndex * 100}%)`,
    }),
    [activeIndex]
  );

  return (
    <section
      ref={sectionRef}
      id="reviews"
      aria-label="Patient testimonials"
      className="bg-pearl py-24 md:py-36 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-gold text-xs font-semibold tracking-[0.28em] uppercase mb-4">
            Patient Reviews
          </p>
          <h2 className="font-serif-heading text-charcoal text-4xl md:text-5xl leading-tight">
            Thousands of smiles.
            <br />
            <span className="text-gold">Zero regrets.</span>
          </h2>
          <div className="mt-6 inline-flex items-center gap-3 bg-white rounded-full px-5 py-2 border border-smoke/20">
            <StarRating count={5} />
            <span className="font-semibold text-sm text-charcoal">5.0 / 5 · Google Reviews</span>
          </div>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
            style={sliderStyle}
          >
            {TESTIMONIALS.map((testimonial, idx) => (
              <article
                key={testimonial.author}
                className="min-w-full md:min-w-[50%] px-0 md:px-4"
                aria-hidden={idx !== activeIndex}
              >
                <TiltCard>
                  <div className="card-hover bg-snow rounded-3xl p-8 md:p-10 border border-smoke/10 flex flex-col gap-6 h-full">
                    <div className="flex items-center justify-between">
                      <StarRating count={testimonial.rating} />
                      <span className="text-mist text-xs uppercase tracking-[0.3em]">Verified Patient</span>
                    </div>
                    <blockquote>
                      <p className="text-charcoal text-lg leading-relaxed font-light">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </blockquote>
                    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-smoke/10">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-snow text-base font-bold"
                        style={{ backgroundColor: testimonial.color }}
                        aria-hidden="true"
                      >
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="text-charcoal font-semibold text-sm">{testimonial.author}</p>
                        <p className="text-mist text-xs">{testimonial.role}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1.5 text-xs text-mist">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <circle cx="7" cy="7" r="6" fill="#c8a96e" opacity="0.15" />
                          <path
                            d="M4.5 7l2 2 3.5-3.5"
                            stroke="#c8a96e"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Verified
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "bg-gold" : "bg-mist/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                }
                className="w-12 h-12 rounded-full border border-smoke/40 text-charcoal hover:border-charcoal transition-colors"
                aria-label="Previous testimonial"
              >
                ‹
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)}
                className="w-12 h-12 rounded-full border border-smoke/40 text-charcoal hover:border-charcoal transition-colors"
                aria-label="Next testimonial"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-mist text-xs uppercase tracking-[0.4em]">
          Patient stories from Google Reviews
        </p>
      </div>
    </section>
  );
}
