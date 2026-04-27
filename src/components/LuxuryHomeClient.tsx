"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

const WHATSAPP_LINK =
  "https://wa.me/918838250227?text=Hi%2C%20I%20would%20like%20to%20book%20a%20free%20fitness%20consultation";

const NAV_LINKS = [
  { label: "Programs", href: "#programs" },
  { label: "Results", href: "#transformation" },
  { label: "Trainers", href: "#trainers" },
  { label: "Contact", href: "#contact" },
];

const TRUST_BADGES = ["1000+ Members", "Certified Trainers", "5★ Rated"];

const PRICING_PLANS = [
  {
    name: "Monthly",
    price: "₹3,500",
    billing: "Billed monthly",
    bestValue: false,
  },
  {
    name: "Quarterly",
    price: "₹9,200",
    billing: "₹3,067 / month",
    bestValue: false,
  },
  {
    name: "Yearly",
    price: "₹29,900",
    billing: "₹2,492 / month",
    bestValue: true,
  },
];

const PLAN_FEATURES = [
  "Personal Training",
  "Diet Guidance",
  "Unlimited Access",
];

const TRAINERS = [
  {
    name: "Arjun Mehta",
    role: "Strength & Performance Coach",
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Nisha Rao",
    role: "Body Recomposition Specialist",
    image:
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Kabir Singh",
    role: "Mobility & Functional Trainer",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Sana Iyer",
    role: "Nutrition & Lifestyle Coach",
    image:
      "https://images.unsplash.com/photo-1609899537878-88d5ba429bdb?q=80&w=1000&auto=format&fit=crop",
  },
];

const WHY_US = [
  {
    title: "Expert-led transformation",
    description:
      "Every plan is calibrated by certified professionals around your goals, schedule, and body type.",
  },
  {
    title: "Luxury training environment",
    description:
      "A calm, premium studio designed for focused workouts with space, cleanliness, and comfort.",
  },
  {
    title: "Progress you can track",
    description:
      "Structured assessments and milestones ensure your effort turns into measurable results.",
  },
];

const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    quote:
      "The coaching quality is exceptional. I finally achieved consistency and visible results without burnout.",
    result: "Lost 11kg in 14 weeks",
  },
  {
    name: "Priya Nair",
    quote:
      "It feels like a private performance studio. The guidance is personal, clear, and genuinely effective.",
    result: "Gained 6kg lean muscle",
  },
  {
    name: "Aditya Menon",
    quote:
      "The nutrition and training strategy changed everything. This is premium coaching done right.",
    result: "Body fat reduced by 9%",
  },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function SectionFade({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

function BeforeAfterSlider() {
  const [position, setPosition] = useState(52);

  return (
    <div className="rounded-3xl border border-[#dce6f0] bg-white/80 p-4 shadow-[0_30px_80px_-50px_rgba(14,42,71,0.55)] backdrop-blur-xl md:p-6">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        <Image
          src="https://images.unsplash.com/photo-1526401485004-2fda9f2a0b24?q=80&w=1800&auto=format&fit=crop"
          alt="Before transformation"
          fill
          sizes="(max-width:768px) 100vw, 70vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src="https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=80&w=1800&auto=format&fit=crop"
            alt="After transformation"
            fill
            sizes="(max-width:768px) 100vw, 70vw"
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-y-0 w-0.5 bg-white/90"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-[#10344f]">
          Before
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-[#10344f]">
          After
        </span>
      </div>
      <div className="mt-4 space-y-2">
        <input
          aria-label="Transformation comparison slider"
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="w-full accent-[#4b9cb8]"
        />
        <p className="text-center text-sm font-medium text-[#5c7188]">Real Results</p>
      </div>
    </div>
  );
}

export default function LuxuryHomeClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[#d8e3ee] bg-white/88 shadow-[0_20px_40px_-35px_rgba(16,52,79,0.55)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="text-sm font-semibold tracking-[0.24em] text-[#12354b] md:text-base">
            AURELIA FIT
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#45627a] transition-colors hover:text-[#12354b]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full border border-[#cdddea] bg-white/80 px-5 py-2.5 text-xs font-semibold tracking-wide text-[#12354b] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:inline-flex"
          >
            Book Free Consultation
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="rounded-xl border border-[#d3e0eb] bg-white/80 px-3 py-2 text-[#12354b] md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[#d8e3ee] bg-white/95 px-5 py-4 backdrop-blur-xl md:hidden"
            >
              <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-[#35546c] transition hover:bg-[#f0f5fa]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="overflow-x-hidden pt-18">
        <section
          ref={heroRef}
          className="relative isolate min-h-[92vh] overflow-hidden px-5 pb-20 pt-18 md:px-8 md:pb-28 md:pt-24"
          aria-label="Premium fitness hero"
        >
          <motion.div
            style={{ y: heroY }}
            className="absolute inset-x-0 top-0 -z-20 h-[78%] bg-[radial-gradient(circle_at_20%_20%,rgba(156,201,220,0.45),transparent_45%),radial-gradient(circle_at_78%_10%,rgba(253,236,208,0.55),transparent_38%),linear-gradient(135deg,#f8fbff_0%,#f2f7fb_52%,#eef4f8_100%)]"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.96)_68%)]" />

          <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <SectionFade>
              <div>
                <p className="mb-6 inline-flex rounded-full border border-[#d5e1eb] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#5b7488]">
                  Premium Fitness Studio
                </p>
                <h1 className="max-w-[14ch] text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#102f44] md:text-6xl">
                  Transform Your Body with Expert Guidance
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#587186] md:text-lg">
                  Premium fitness training designed for real, lasting results
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-[#10344f] px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0d2d44] hover:shadow-[0_24px_50px_-24px_rgba(16,52,79,0.75)]"
                  >
                    Book Free Consultation
                  </a>
                  <a
                    href="#programs"
                    className="inline-flex items-center justify-center rounded-full border border-[#cbdbe8] bg-white/75 px-8 py-4 text-sm font-semibold text-[#12354b] transition hover:-translate-y-0.5 hover:shadow-[0_16px_35px_-25px_rgba(20,58,88,0.7)]"
                  >
                    View Programs
                  </a>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  {TRUST_BADGES.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-[#d2dfea] bg-white/72 px-4 py-2 text-xs font-semibold text-[#48637a] shadow-[0_10px_25px_-20px_rgba(20,58,88,0.7)]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </SectionFade>

            <SectionFade>
              <div className="relative mx-auto w-full max-w-xl">
                <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(146,196,217,0.4),transparent_68%)] blur-2xl" />
                <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/65 p-3 shadow-[0_30px_80px_-45px_rgba(17,54,85,0.65)] backdrop-blur-xl">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src="https://images.unsplash.com/photo-1571019613576-2b22c76fd955?q=80&w=1400&auto=format&fit=crop"
                      alt="Personal coaching in premium fitness studio"
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </SectionFade>
          </div>
        </section>

        <section id="programs" className="px-5 py-20 md:px-8 md:py-28" aria-label="Pricing plans">
          <div className="mx-auto max-w-6xl">
            <SectionFade>
              <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
                <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#102f44] md:text-5xl">Choose a premium plan</h2>
                <p className="mt-4 text-[#5b7488]">Built for consistency, sustainability, and elite outcomes.</p>
              </div>
            </SectionFade>

            <div className="grid gap-5 md:grid-cols-3">
              {PRICING_PLANS.map((plan, idx) => (
                <motion.article
                  key={plan.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  whileHover={{ y: -8 }}
                  className={`rounded-3xl p-7 shadow-[0_25px_70px_-45px_rgba(17,54,85,0.7)] transition ${
                    plan.bestValue
                      ? "border border-[#a6cadb] bg-[linear-gradient(160deg,#ffffff_0%,#f1f8fd_90%)]"
                      : "border border-[#dce7f1] bg-white"
                  }`}
                >
                  {plan.bestValue && (
                    <span className="mb-4 inline-flex rounded-full bg-[#e9f5fb] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#286483]">
                      Best Value
                    </span>
                  )}
                  <h3 className="text-sm font-medium text-[#60798e]">{plan.name}</h3>
                  <p className="mt-1 text-4xl font-semibold tracking-tight text-[#0f2e43]">{plan.price}</p>
                  <p className="mt-1 text-sm text-[#6e8498]">{plan.billing}</p>
                  <ul className="mt-7 space-y-3">
                    {PLAN_FEATURES.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-[#446177]">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#e6f2f8] text-[#2f6f8f]">
                          ✔
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="transformation" className="px-5 py-20 md:px-8 md:py-28" aria-label="Transformation results">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionFade>
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#63839a]">Transformation</p>
                <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#102f44] md:text-5xl">Visible progress, backed by structure</h2>
                <p className="mt-4 max-w-md text-[#5c7388]">
                  Our before/after process combines coaching precision, recovery planning, and smart progression.
                </p>
              </div>
            </SectionFade>
            <SectionFade>
              <BeforeAfterSlider />
            </SectionFade>
          </div>
        </section>

        <section id="trainers" className="bg-[#f5f9fc] px-5 py-20 md:px-8 md:py-28" aria-label="Meet our trainers">
          <div className="mx-auto max-w-6xl">
            <SectionFade>
              <div className="mb-12 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
                <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#102f44] md:text-5xl">Coached by experts</h2>
                <p className="max-w-md text-[#627b90]">A multidisciplinary team focused on real body composition and performance results.</p>
              </div>
            </SectionFade>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {TRAINERS.map((trainer, idx) => (
                <motion.article
                  key={trainer.name}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl border border-[#dce7f1] bg-white p-3 shadow-[0_22px_55px_-42px_rgba(16,52,79,0.7)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      sizes="(max-width:768px) 50vw, 24vw"
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-[#12354b]">{trainer.name}</h3>
                  <p className="mt-1 text-sm text-[#698196]">{trainer.role}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-8 md:py-28" aria-label="Why choose us">
          <div className="mx-auto max-w-6xl">
            <SectionFade>
              <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
                <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#102f44] md:text-5xl">Why choose us</h2>
              </div>
            </SectionFade>

            <div className="grid gap-5 md:grid-cols-3">
              {WHY_US.map((item, idx) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl border border-[#d9e5ef] bg-white/75 p-7 shadow-[0_24px_60px_-45px_rgba(16,52,79,0.75)] backdrop-blur-sm"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e8f2f8] text-[#2f6e8d]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M5 12.5 9.2 16.7 19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-[#12354b]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#61798e]">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-[#f4f8fc] px-5 py-20 md:px-8 md:py-28" aria-label="Client testimonials">
          <div className="mx-auto max-w-5xl">
            <SectionFade>
              <h2 className="text-center text-3xl font-semibold tracking-[-0.02em] text-[#102f44] md:text-5xl">What our clients say</h2>
            </SectionFade>

            <div className="mt-10 overflow-hidden rounded-3xl border border-[#dce7f1] bg-white shadow-[0_30px_80px_-50px_rgba(16,52,79,0.65)]">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {TESTIMONIALS.map((item) => (
                  <article key={item.name} className="min-w-full p-8 md:p-12">
                    <p className="text-sm tracking-[0.24em] text-[#6b8296]">★★★★★</p>
                    <blockquote className="mt-4 text-xl leading-relaxed text-[#24465e] md:text-2xl">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <div className="mt-6 border-t border-[#e8eff6] pt-5">
                      <p className="text-base font-semibold text-[#113247]">{item.name}</p>
                      <p className="text-sm text-[#668096]">{item.result}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to testimonial ${idx + 1}`}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === activeTestimonial ? "w-8 bg-[#2f6e8d]" : "w-2.5 bg-[#c2d5e3]"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-8 md:py-28" aria-label="Gallery">
          <div className="mx-auto max-w-6xl">
            <SectionFade>
              <h2 className="mb-10 text-3xl font-semibold tracking-[-0.02em] text-[#102f44] md:text-5xl">Gallery</h2>
            </SectionFade>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {GALLERY.map((src, idx) => (
                <motion.button
                  key={src}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                  className="group relative overflow-hidden rounded-3xl border border-[#dae7f1]"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={src}
                      alt={`Studio gallery ${idx + 1}`}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(10,35,52,0.25)_100%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-10 pt-16 md:px-8 md:pb-14 md:pt-20" aria-label="Call to action">
          <div className="mx-auto max-w-5xl rounded-[2.2rem] border border-[#d4e2ed] bg-[linear-gradient(145deg,#f3f9fd_0%,#ffffff_62%)] px-6 py-14 text-center shadow-[0_35px_90px_-55px_rgba(16,52,79,0.68)] md:px-12 md:py-16">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#0f2f44] md:text-5xl">Start Your Fitness Journey Today</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#5a7388]">
              Book your free consultation and get a premium plan built around your goals.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex rounded-full bg-[#10344f] px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0d2d44]"
            >
              Book Free Consultation
            </a>
          </div>
        </section>

        <section id="contact" className="px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20" aria-label="Contact section">
          <div className="mx-auto grid max-w-6xl gap-7 md:grid-cols-2 md:gap-8">
            <SectionFade>
              <div className="rounded-3xl border border-[#d9e6f0] bg-white p-7 shadow-[0_24px_60px_-48px_rgba(16,52,79,0.85)]">
                <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#102f44] md:text-4xl">Visit us</h2>
                <p className="mt-3 text-[#607a90]">Speak with our team and schedule your first premium session.</p>

                <div className="mt-6 space-y-4">
                  <a
                    href="tel:+918838250227"
                    className="flex items-center justify-between rounded-2xl border border-[#dbe7f0] bg-[#f8fbff] px-4 py-3 text-sm font-medium text-[#23465f] transition hover:bg-[#eff6fc]"
                  >
                    <span>+91 88382 50227</span>
                    <span>Call</span>
                  </a>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-[#dbe7f0] bg-[#f8fbff] px-4 py-3 text-sm font-medium text-[#23465f] transition hover:bg-[#eff6fc]"
                  >
                    <span>Chat on WhatsApp</span>
                    <span>Open</span>
                  </a>
                </div>
              </div>
            </SectionFade>

            <SectionFade>
              <div className="overflow-hidden rounded-3xl border border-[#d9e6f0] shadow-[0_24px_60px_-48px_rgba(16,52,79,0.85)]">
                <iframe
                  title="Gym location on map"
                  src="https://maps.google.com/maps?q=Chennai%20gym&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="360"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </SectionFade>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d7e4ef] bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 text-sm text-[#6c8295] md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Aurelia Fit. All rights reserved.</p>
          <p>Premium coaching · Real outcomes</p>
        </div>
      </footer>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-[#cde0eb] bg-white/90 px-4 py-3 text-xs font-semibold text-[#10344f] shadow-[0_18px_45px_-35px_rgba(16,52,79,0.82)] backdrop-blur-md transition hover:-translate-y-1"
      >
        WhatsApp
      </a>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[70] grid place-items-center bg-[#0b2538]/70 p-5 backdrop-blur-sm"
            aria-label="Close gallery preview"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative h-[80vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/25 bg-white"
            >
              <Image
                src={GALLERY[lightboxIndex]}
                alt="Gallery preview"
                fill
                sizes="90vw"
                className="object-cover"
              />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
