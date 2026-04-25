"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BEFORE_SRC = "/smile.png";
const AFTER_SRC  = "/smile.png";

export default function BeforeAfter() {
  const sectionRef    = useRef<HTMLElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const titleRef      = useRef<HTMLDivElement>(null);
  const sliderRef     = useRef<HTMLDivElement>(null);

  /* Slider position as percentage (0 – 100) — default 50% */
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sparkleVisible = position >= 98;

  /* ── Section scroll reveal ──────────────────────────────────────────────── */
  useGSAP(
    () => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  /* ── Drag logic (mouse + touch) ─────────────────────────────────────────── */
  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  }, [isDragging, updatePosition]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /* Keyboard accessibility: left/right arrows move slider */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  setPosition((p) => Math.max(0, p - 2));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="results"
      aria-label="Before and after smile transformations"
      className="scroll-mt-24 bg-obsidian py-24 md:py-36"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div ref={titleRef} className="text-center mb-14 md:mb-20 opacity-0">
          <p className="text-gold text-xs font-semibold tracking-[0.28em] uppercase mb-4">
            Real Transformations
          </p>
          <h2 className="text-snow font-black text-4xl md:text-6xl leading-tight tracking-tight">
            The{" "}
            <span className="text-gold">Smile Elite</span>
            <br />difference.
          </h2>
          <p className="text-mist text-base md:text-lg font-light mt-5 max-w-xl mx-auto">
            Drag the slider to reveal the transformation. Real patient.
            Real results. No filters.
          </p>
        </div>

        {/* ── Curtain Reveal Interaction ───────────────────────────────────
            Architecture:
            1. Container (position: relative, overflow: hidden)
            2. "Before" image — full width, always visible as base layer
            3. "After" image  — full width, clipped from the right by (100 - position)%
               using clip-path: inset(0 X% 0 0) so only the left portion shows.
            4. Draggable divider line + handle, positioned at `left: position%`
            ────────────────────────────────────────────────────────────── */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden select-none cursor-col-resize shadow-2xl opacity-0"
          aria-label="Before and after smile comparison. Use arrow keys to compare."
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Before image — always full width, sits beneath the after layer */}
          <div className="absolute inset-0">
            <Image
              src={BEFORE_SRC}
              alt="Before dental treatment — patient's original smile"
              fill
              className="object-cover sepia-[.40] brightness-90 saturate-[0.6] contrast-[0.85]"
              sizes="(max-width: 768px) 100vw, 80vw"
              quality={85}
              priority
            />
            {/* Label */}
            <span className="absolute bottom-4 left-4 z-10 bg-obsidian/70 backdrop-blur-sm text-pearl text-xs font-semibold px-3 py-1.5 rounded-full tracking-widest uppercase">
              Before
            </span>
          </div>

          {/* After image — clipped from the right, revealing from left to current position */}
          <div
            className="absolute inset-0"
            style={{
              /* inset(top right bottom left) — clip right side by (100 - position)% */
              clipPath: `inset(0 ${100 - position}% 0 0)`,
              transition: isDragging ? "none" : "clip-path 0.05s ease",
            }}
            aria-hidden="true"
          >
            <Image
              src={AFTER_SRC}
              alt="After dental treatment — patient's transformed smile"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              quality={85}
            />
            {/* Label */}
            <span className="absolute bottom-4 right-4 z-10 bg-gold/90 text-obsidian text-xs font-semibold px-3 py-1.5 rounded-full tracking-widest uppercase">
              After
            </span>
          </div>

          {/* Curtain divider line */}
          <div
            className="absolute top-0 bottom-0 z-20 w-px bg-snow/70"
            style={{ left: `${position}%` }}
            aria-hidden="true"
          />

          {/* Soft glow edge to simulate tactile curtain seam */}
          <div
            className="absolute top-0 bottom-0 z-20 w-8 -translate-x-1/2 pointer-events-none"
            style={{
              left: `${position}%`,
              background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.28) 45%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Drag handle — receives all pointer events */}
          <div
            ref={sliderRef}
            role="slider"
            aria-label="Comparison slider"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="
              absolute top-1/2 z-30 -translate-y-1/2 -translate-x-1/2
              w-12 h-12 rounded-full bg-snow/95 border border-white/70 shadow-[0_14px_40px_rgba(0,0,0,0.35)]
              flex items-center justify-center
              focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-obsidian
              touch-none
            "
            style={{ left: `${position}%` }}
          >
            {/* Double-arrow icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7 6l-4 4 4 4M13 6l4 4-4 4" stroke="#1d1d1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {sparkleVisible && (
            <div className="absolute top-8 right-8 z-30 pointer-events-none animate-sparkle-pop" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M13 2l2.3 6.7L22 11l-6.7 2.3L13 20l-2.3-6.7L4 11l6.7-2.3L13 2z" fill="rgba(255,255,255,0.92)"/>
                <circle cx="20.5" cy="5.5" r="1.5" fill="#e8d5a3"/>
              </svg>
            </div>
          )}
        </div>

        {/* ── Caption ────────────────────────────────────────────────────── */}
        <p className="text-center text-mist text-sm mt-6">
          Porcelain veneers + whitening · Treatment time: 2 visits
        </p>
      </div>
    </section>
  );
}
