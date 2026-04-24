"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Service data ── add / remove services here ───────────────────────────── */
const SERVICES = [
  {
    id: "cleaning",
    number: "01",
    title: "Teeth Cleaning",
    tagline: "Healthy Gums. Brighter Smile.",
    description:
      "Professional removal of plaque, tartar, and surface stains using gentle ultrasonic scaling and polishing. Ideal for preventing gum disease and maintaining long-term oral health.",
    highlights: ["Approx. 45 Minutes", "Stain Removal", "Preventive Care"],
    image:
      "https://images.unsplash.com/photo-1588776814546-ec7e4f9b6f4e?w=1600&q=80&auto=format&fit=crop",
    gradient: "from-[#1a1a2e] to-[#16213e]",
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
    image:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1600&q=80&auto=format&fit=crop",
    gradient: "from-[#1a2e1a] to-[#162116]",
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
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1600&q=80&auto=format&fit=crop",
    gradient: "from-[#2e2a1a] to-[#211e16]",
    accent: "#d4b44a",
  },
  {
    id: "aligners",
    number: "04",
    title: "Braces & Aligners",
    tagline: "Confident Smile Alignment For All Ages.",
    description:
      "Orthodontic treatment options including traditional braces and clear aligners to correct spacing, crowding, and bite issues with planned, predictable progress.",
    highlights: ["12–18 Months", "Clear Aligners Available", "Adult + Teen Care"],
    image:
      "https://images.unsplash.com/photo-1627914304129-94f4f2e0d95a?w=1600&q=80&auto=format&fit=crop",
    gradient: "from-[#1e1a2e] to-[#18162e]",
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
    image:
      "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=1600&q=80&auto=format&fit=crop",
    gradient: "from-[#2e1a1a] to-[#211616]",
    accent: "#d96b6b",
  },
];

type Service = (typeof SERVICES)[number];

function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      className={`
        card-hover
        w-full rounded-3xl p-8 md:p-12
        bg-gradient-to-br ${service.gradient}
        border border-white/5 shadow-2xl
      `}
    >
      <div className="flex items-start justify-between mb-6">
        <span
          className="font-mono text-4xl font-thin text-transparent"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.22)" }}
        >
          {service.number}
        </span>
        <span
          className="w-2.5 h-2.5 rounded-full mt-2"
          style={{ backgroundColor: service.accent }}
          aria-hidden="true"
        />
      </div>
      <h3 className="font-serif-heading text-snow text-3xl md:text-4xl leading-tight mb-2">
        {service.title}
      </h3>
      <p className="font-medium mb-5" style={{ color: service.accent }}>
        {service.tagline}
      </p>
      <p className="text-pearl/70 text-sm md:text-base leading-relaxed mb-8">
        {service.description}
      </p>
      <ul className="flex flex-wrap gap-3 mb-8" role="list">
        {service.highlights.map((h) => (
          <li
            key={h}
            className="text-xs font-medium px-3 py-1.5 rounded-full border"
            style={{ color: service.accent, borderColor: `${service.accent}40` }}
          >
            {h}
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="inline-flex items-center gap-2 text-sm font-semibold text-snow hover:opacity-80 transition-opacity"
      >
        Learn More
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

export default function PinnedServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);
  const activeIdxRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);
  const visualImagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
      if (!isDesktop) return;

      // Respect reduced motion: keep everything static
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      panelsRef.current.forEach((panel) => {
        if (!panel) return;
        gsap.set(panel, { opacity: 0, y: 40 });
        gsap.fromTo(
          panel,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 75%",
              toggleActions: "play none none none",
              onEnter: () => {
                const idx = panelsRef.current.indexOf(panel);
                activeIdxRef.current = idx;
                setActiveIdx(idx);

                visualImagesRef.current.forEach((img, imageIdx) => {
                  if (!img) return;
                  gsap.to(img, {
                    opacity: imageIdx === idx ? 1 : 0,
                    y: imageIdx === idx ? 0 : 20,
                    scale: imageIdx === idx ? 1 : 1.04,
                    duration: 0.5,
                    ease: "power2.out",
                  });
                });
              },
              onEnterBack: () => {
                const idx = panelsRef.current.indexOf(panel);
                activeIdxRef.current = idx;
                setActiveIdx(idx);

                visualImagesRef.current.forEach((img, imageIdx) => {
                  if (!img) return;
                  gsap.to(img, {
                    opacity: imageIdx === idx ? 1 : 0,
                    y: imageIdx === idx ? 0 : 20,
                    scale: imageIdx === idx ? 1 : 1.04,
                    duration: 0.5,
                    ease: "power2.out",
                  });
                });
              },
            },
          }
        );
      });

      visualImagesRef.current.forEach((img, i) => {
        if (!img) return;
        gsap.set(img, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 20,
          scale: i === 0 ? 1 : 1.04,
        });
      });

      gsap.fromTo(
        visualRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [isDesktop] }
  );

  if (!isDesktop) {
    return (
      <section ref={sectionRef} id="services" aria-label="Our dental services" className="bg-pearl py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gold text-xs font-semibold tracking-[0.28em] uppercase mb-4">
            Our Expertise
          </p>
          <h2 className="font-serif-heading text-charcoal text-4xl leading-tight">
            Every smile <span className="text-gold">deserves precision.</span>
          </h2>
          <p className="text-mist text-sm mt-4">
            Swipe through our signature treatments — each designed for uncompromising results.
          </p>
          <div
            className="mt-10 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6"
            style={{ scrollbarWidth: "none" }}
          >
            {SERVICES.map((service) => (
              <div key={service.id} className="snap-center min-w-[85%]">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="services" aria-label="Our dental services" className="bg-pearl">
      <div
        ref={wrapperRef}
        className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-16"
      >
        <div ref={leftRef} className="md:sticky md:top-24 self-start opacity-0">
          <p className="text-gold text-xs font-semibold tracking-[0.28em] uppercase mb-4">Our Expertise</p>
          <h2 className="font-serif-heading text-charcoal text-4xl md:text-5xl leading-tight mb-6">
            Every smile
            <br />
            <span className="text-gold">deserves precision.</span>
          </h2>
          <p className="text-mist text-sm md:text-base max-w-md mb-8">
            Scroll to explore our signature treatments — each crafted for uncompromising, Beverly Hills–grade results.
          </p>
          <nav aria-label="Service navigator">
            <ol className="flex flex-col gap-3">
              {SERVICES.map(({ id, number, title }, i) => (
                <li key={id} className="flex items-center gap-4">
                  <span
                    className={`font-mono text-xs transition-colors duration-300 ${
                      i === activeIdx ? "text-gold" : "text-mist"
                    }`}
                  >
                    {number}
                  </span>
                  <a
                    href={`#${id}`}
                    className={`text-sm font-medium transition-all duration-300 ${
                      i === activeIdx ? "text-charcoal" : "text-mist/60"
                    }`}
                  >
                    {title}
                  </a>
                  <span
                    className={`h-px flex-1 max-w-[3rem] transition-all duration-500 ${
                      i === activeIdx ? "bg-gold" : "bg-smoke/30"
                    }`}
                  />
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="flex flex-col gap-10 md:gap-12">
          <aside
            ref={visualRef}
            className="hidden md:block md:sticky top-24 h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl opacity-0"
            aria-label="Service visual gallery"
          >
            {SERVICES.map((service, i) => (
              <div
                key={`${service.id}-image`}
                ref={(el) => {
                  visualImagesRef.current[i] = el;
                }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.62)), url(${service.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}
          </aside>

          {SERVICES.map((service, i) => (
            <article
              id={service.id}
              key={service.id}
              ref={(el) => {
                panelsRef.current[i] = el;
              }}
              aria-label={`Service: ${service.title}`}
            >
              <ServiceCard service={service} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
