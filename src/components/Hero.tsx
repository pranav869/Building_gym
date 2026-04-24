"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

/* Register GSAP plugins once at module level (idempotent) */
gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Headline copy — each item becomes a masked line reveal ─────────────── */
const HEADLINE_LINES = ["Precision", "Dentistry.", "Perfected."];

export default function Hero() {
  const heroRef           = useRef<HTMLElement>(null);
  const imageWrapRef      = useRef<HTMLDivElement>(null);
  const contentRef        = useRef<HTMLDivElement>(null);
  const eyebrowRef        = useRef<HTMLSpanElement>(null);
  const headlineRef       = useRef<HTMLHeadingElement>(null);
  const subtitleRef       = useRef<HTMLParagraphElement>(null);
  const ctaRef            = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* ── 1. Load Timeline ─────────────────────────────────────────────────
         Each headline line is wrapped in an overflow:hidden mask (.reveal-mask)
         so the text slides UP from below the container edge — the signature
         Apple / award-agency "line reveal" technique.
         ─────────────────────────────────────────────────────────────────── */
      const lines = headlineRef.current?.querySelectorAll<HTMLSpanElement>(".line");

      const loadTl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.15,
      });

      loadTl
        /* Eyebrow label fades in */
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 }
        )
        /* Headline lines slide up from beneath the overflow mask */
        .fromTo(
          Array.from(lines ?? []),
          { yPercent: 112, opacity: 1 },          // Start below mask
          { yPercent: 0, stagger: 0.1, duration: 1.1 },
          "-=0.3"
        )
        /* Subtitle fades + rises */
        .fromTo(
          subtitleRef.current,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.6"
        )
        /* CTA buttons */
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.6"
        )
        /* Scroll indicator */
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3"
        );

      /* ── 2. Hero Image Parallax ────────────────────────────────────────────
         The background image slowly zooms in as the user scrolls the hero
         out of view. `scrub: 1.5` adds a slight lag for a cinematic feel.
         ─────────────────────────────────────────────────────────────────── */
      gsap.to(imageWrapRef.current, {
        scale: 1.12,
        filter: "blur(3px)",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,  // Adjust for more/less lag (0 = instant, 3 = very laggy)
        },
      });

      /* ── 3. Content Fade-out on Scroll ────────────────────────────────────
         Hero text gently floats upward and fades as the user scrolls away.
         start / end percentages control the range of the fade.
         ─────────────────────────────────────────────────────────────────── */
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "22% top",   // ← Adjust to move fade start earlier/later
          end: "68% top",     // ← Adjust to move fade end earlier/later
          scrub: true,
        },
      });

      // Subtle inverse drift so text and image move at different rates (mask-like depth)
      gsap.to(headlineRef.current, {
        y: -36,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero — Smile Elite Dental"
      className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center"
    >
      {/* ── Background image with GSAP zoom target ──────────────────────── */}
      <div
        ref={imageWrapRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}  // Hint for GPU compositing
      >
        {/* Dual overlay: stronger bottom gradient for typography clarity */}
        <div className="absolute inset-0 bg-obsidian/48 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/15 via-obsidian/20 to-obsidian z-[1]" />

        <Image
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80&auto=format&fit=crop"
          alt="Modern dental clinic interior with state-of-the-art equipment"
          fill
          priority              // LCP image — no lazy-load
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* ── Hero Content ─────────────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto w-full"
        style={{ willChange: "opacity, transform" }}
      >
        {/* Eyebrow label */}
        <span
          ref={eyebrowRef}
          className="inline-block text-gold text-xs md:text-sm font-semibold tracking-[0.28em] uppercase mb-6 opacity-0"
        >
          Puzhal, Chennai · Est. 2008
        </span>

        {/* ── Headline: each line has a reveal-mask wrapper ──────────────
            The .reveal-mask parent has overflow:hidden — this clips the
            .line child as GSAP moves it from yPercent:112 → yPercent:0,
            producing the "text rises from beneath" effect.
            ──────────────────────────────────────────────────────────── */}
        <h1
          ref={headlineRef}
          aria-label="Precision Dentistry. Perfected."
          className="font-serif-heading text-[clamp(3.5rem,10vw,9rem)] leading-[0.93] tracking-tight text-snow"
        >
          {HEADLINE_LINES.map((line, i) => (
            <span key={line} className="reveal-mask">
              <span
                className={`line block ${i === HEADLINE_LINES.length - 1 ? "text-gold" : ""}`}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 text-mist text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed opacity-0"
        >
          Compassionate, multi-speciality dental care led by Dr. Basheera BDS.
          Trusted for{" "}
          <strong className="text-pearl font-medium">painless treatment experiences</strong>{" "}
          across Chennai.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0"
        >
          <a
            href="#contact"
            className="btn-gold text-obsidian font-semibold text-sm px-10 py-4 rounded-full inline-flex items-center gap-2"
          >
            Book via Phone / WhatsApp
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="#services"
            className="text-pearl/80 font-medium text-sm px-10 py-4 rounded-full border border-pearl/20 hover:border-pearl/50 hover:text-pearl hover:bg-pearl/5 transition-all duration-300 inline-flex items-center gap-2"
          >
            Explore Services
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-0"
        aria-hidden="true"
      >
        <span className="text-mist text-[10px] font-medium tracking-[0.3em] uppercase">
          Scroll
        </span>
        {/* Animated chevron */}
        <div className="animate-scroll-pulse">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5l5 5 5-5" stroke="#c8a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* ── Star rating pill (social proof above the fold) ───────────────── */}
      <div className="absolute bottom-8 right-6 md:right-10 z-10 hidden sm:flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
        <div className="flex" aria-label="4.9 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#c8a96e" aria-hidden="true">
              <path d="M6 1l1.3 3.9H11L8 7.1l1.1 3.9L6 8.8l-3.1 2.2L4 7.1 1 4.9h3.7L6 1z"/>
            </svg>
          ))}
        </div>
        <span className="text-pearl text-xs font-medium">5.0 · Google Reviews</span>
      </div>
    </section>
  );
}
