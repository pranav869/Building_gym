"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";

/* ─── CONSTANTS ──────────────────────────────────────────────────────────────*/

const WHATSAPP_LINK =
  "https://wa.me/918838250227?text=Hi%2C%20I%20want%20to%20join%20EliteFit%20Gym";

const NAV_LINKS = [
  { label: "Plans",     href: "#pricing"      },
  { label: "Features",  href: "#features"     },
  { label: "Gallery",   href: "#gallery"      },
  { label: "Contact",   href: "#contact"      },
];

const STATS = [
  { value: 1000, suffix: "+", label: "Members Transformed", decimals: 0 },
  { value: 5,    suffix: "+", label: "Years of Excellence",  decimals: 0 },
  { value: 4.9,  suffix: "★", label: "Average Rating",       decimals: 1 },
  { value: 98,   suffix: "%", label: "Satisfaction Rate",    decimals: 0 },
];

const PLANS = [
  {
    label: "1 Month",
    price: "₹3,000",
    billing: "billed monthly",
    badge: null as string | null,
    highlight: false,
    features: [
      "Full equipment access",
      "Group fitness classes",
      "Locker room access",
      "Basic trainer guidance",
    ],
  },
  {
    label: "6 Months",
    price: "₹6,000",
    billing: "₹1,000 / month",
    badge: "Popular" as string | null,
    highlight: false,
    features: [
      "Full equipment access",
      "Unlimited group classes",
      "Locker room access",
      "Weekly trainer sessions",
      "Nutrition consultation",
    ],
  },
  {
    label: "1 Year",
    price: "₹10,400",
    billing: "₹867 / month — best rate",
    badge: "Best Value" as string | null,
    highlight: true,
    features: [
      "Full equipment access",
      "Unlimited classes",
      "Locker + towel service",
      "Bi-weekly trainer sessions",
      "Personalized diet plan",
      "Body composition tracking",
    ],
  },
];

const FEATURES = [
  {
    title: "Elite Equipment",
    description:
      "Hammer Strength, Life Fitness & Technogym machines — maintained daily so you train without limits.",
    accent: "#f97316",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 10v4M21 10v4M7 8v8M17 8v8M7 12h10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Certified Coaches",
    description:
      "NSCA & ACE-certified trainers who engineer custom protocols for your exact physique goals.",
    accent: "#fbbf24",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 1 1 14 0" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Precision Nutrition",
    description:
      "Macro-calibrated diet plans by sports nutritionists — zero generic templates, pure results.",
    accent: "#f97316",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M9 3v8m6-8v8M7 21h10a2 2 0 0 0 2-2v-6H5v6a2 2 0 0 0 2 2Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Hybrid Programming",
    description:
      "Science-backed strength + cardio periodisation. Visible, measurable results in 8 weeks.",
    accent: "#fbbf24",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", label: "Main Floor"         },
  { src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop", label: "Strength Zone"      },
  { src: "https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=800&auto=format&fit=crop", label: "Cardio Deck"         },
  { src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800&auto=format&fit=crop", label: "Free Weights"       },
];

const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    result: "Lost 14 kg in 4 months",
    text: "The accountability and coaching here are unmatched. I went from 88 kg to 74 kg and have never felt more confident or energetic.",
    initials: "RS",
    accent: "#f97316",
  },
  {
    name: "Priya Nair",
    result: "Gained 6 kg lean muscle",
    text: "As someone intimidated by gyms, EliteFit changed everything. Trainers are professional, the space is premium, and the results are real.",
    initials: "PN",
    accent: "#fbbf24",
  },
  {
    name: "Arjun Menon",
    result: "Squat 80 kg → 160 kg",
    text: "Best investment I've made for myself. The programming is genuinely elite — exactly what the name promises. Six months, completely transformed.",
    initials: "AM",
    accent: "#f97316",
  },
  {
    name: "Sneha Iyer",
    result: "Completed first marathon",
    text: "The hybrid cardio programme prepared me for a full marathon in 16 weeks. Couldn't have done it without the coaches' structure and support.",
    initials: "SI",
    accent: "#fbbf24",
  },
];

/* ─── ANIMATION VARIANTS ─────────────────────────────────────────────────────*/

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: EASE_OUT },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

/* ─── CURSOR GLOW ────────────────────────────────────────────────────────────*/

function CursorGlow() {
  const [pos, setPos] = useState({ x: -600, y: -600 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[200] hidden lg:block"
      style={{
        left: pos.x - 320,
        top: pos.y - 320,
        width: 640,
        height: 640,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)",
        transition: "left 0.09s linear, top 0.09s linear",
      }}
    />
  );
}

/* ─── COUNT-UP ───────────────────────────────────────────────────────────────*/

function CountUp({ target, suffix, decimals = 0 }: { target: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 2000;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, decimals]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────────*/

export default function HomeClient() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [activeSlide, setActiveSlide]   = useState(0);
  const [lightbox, setLightbox]         = useState<{ src: string; label: string } | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY   = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setActiveSlide((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <CursorGlow />

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/55 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <Link href="/" aria-label="EliteFit home" className="text-lg font-extrabold tracking-[0.12em] text-white">
            ELITE<span className="text-orange-400">FIT</span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-[13px] font-medium text-white/60 transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="tel:+918838250227" className="text-[11px] font-semibold uppercase tracking-widest text-white/55 transition-colors hover:text-white">
              Call
            </a>
            <a href="#contact" className="rounded-full bg-orange-500 px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-black transition hover:bg-orange-400 hover:shadow-[0_0_22px_rgba(249,115,22,0.5)]">
              Book Trial
            </a>
          </div>

          <button type="button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg border border-white/10 bg-white/[0.05] px-2 py-1.5 text-white backdrop-blur-sm md:hidden">
            ☰
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.26 }}
              className="overflow-hidden border-t border-white/[0.06] bg-black/90 backdrop-blur-2xl md:hidden">
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-5 py-5">
                {NAV_LINKS.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                    className="rounded-xl border border-white/[0.07] px-4 py-3 text-sm text-white/80 transition hover:text-white">
                    {l.label}
                  </a>
                ))}
                <a href="#contact" onClick={() => setMenuOpen(false)}
                  className="mt-2 rounded-full bg-orange-500 py-3 text-center text-sm font-bold text-black">
                  Book Free Trial
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" className="overflow-x-hidden">

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section ref={heroRef} id="hero" aria-label="Hero — EliteFit Premium Gym"
          className="relative isolate flex min-h-[88svh] items-center overflow-hidden pt-16 md:min-h-[92vh]">

          <motion.div style={{ y: heroImgY }} className="absolute inset-0 -z-10 scale-110">
            <Image
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop"
              alt="EliteFit premium gym floor"
              fill priority sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 -z-[5] bg-gradient-to-r from-black/92 via-black/60 to-black/25" />
          <div className="absolute inset-0 -z-[4] bg-gradient-to-t from-black via-transparent to-transparent" />
          <div aria-hidden="true" className="absolute right-0 top-1/3 -z-[3] h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-orange-500/12 blur-[110px]" />

          <motion.div style={{ opacity: heroOpacity }} className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-32">
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-300 sm:text-[11px] sm:tracking-[0.28em]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
              Premium Fitness Studio
            </motion.p>

            <h1 className="mb-6 text-[clamp(2rem,10vw,5.5rem)] font-extrabold leading-[1.08] tracking-tight text-white sm:mb-7 sm:leading-[1.06]">
              {["Transform Your Body.", "Elevate Your Life."].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span className="block" initial={{ y: "110%" }} animate={{ y: "0%" }}
                    transition={{ delay: 0.28 + i * 0.2, duration: 0.76, ease: [0.22, 1, 0.36, 1] }}>
                    {i === 1
                      ? <><span className="text-orange-400">Elevate</span>{" Your Life."}</>
                      : line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }}
              className="mb-8 max-w-md text-base leading-relaxed text-white/70 sm:mb-9 sm:max-w-lg sm:text-[1.05rem]">
              Premium fitness training with certified expert coaches, elite equipment, and programs
              engineered to deliver real, lasting results.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.6 }}
              className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a href="#pricing"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-sm font-bold text-black transition hover:bg-orange-400 hover:shadow-[0_0_32px_rgba(249,115,22,0.55)] sm:w-auto">
                Join Now
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#pricing"
                className="inline-flex w-full justify-center rounded-full border border-white/20 bg-white/[0.07] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/[0.12] sm:w-auto">
                View Plans
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.6 }}
              className="flex flex-wrap gap-3">
              {[{ icon: "◉", text: "500+ Members" }, { icon: "◈", text: "Certified Trainers" }, { icon: "★", text: "Top Rated Gym" }].map((b) => (
                <div key={b.text} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-sm">
                  <span className="text-xs text-orange-400">{b.icon}</span>
                  <span className="text-xs font-semibold text-white/85">{b.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── STATS ───────────────────────────────────────────────────────── */}
        <section aria-label="Key statistics" className="border-y border-white/[0.05] bg-[#080808]">
          <dl className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-y divide-white/[0.05] md:grid-cols-4 md:divide-y-0">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5 px-6 py-10 text-center">
                <dt className="text-[2.6rem] font-black tracking-tight text-white">
                  <CountUp target={s.value} suffix={s.suffix} decimals={s.decimals} />
                </dt>
                <dd className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">{s.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── PRICING ─────────────────────────────────────────────────────── */}
        <section id="pricing" aria-label="Membership plans" className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="mb-12 max-w-xl md:mb-14">
              <motion.p variants={fadeUp} className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-orange-400">Membership Plans</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-white md:text-5xl">Start your journey today.</motion.h2>
              <motion.p variants={fadeUp} className="mt-3 text-white/55">Flexible plans for every commitment level. All include full facility access.</motion.p>
              <motion.p variants={fadeUp} className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-orange-300">
                <span className="h-1 w-1 animate-pulse rounded-full bg-orange-400" />
                Limited offer for new members — join before spots fill.
              </motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}
              className="grid gap-5 md:grid-cols-3">
              {PLANS.map((plan) => (
                <motion.article key={plan.label} variants={fadeUp}
                  className={`pricing-card relative rounded-3xl border p-7 ${
                    plan.highlight
                      ? "border-orange-400/40 bg-gradient-to-br from-orange-500/15 via-orange-500/5 to-transparent"
                      : "border-white/[0.07] bg-white/[0.03]"
                  }`}>
                  {plan.highlight && (
                    <div className="pointer-events-none absolute -inset-px rounded-3xl"
                      style={{ boxShadow: "0 0 40px rgba(249,115,22,0.16) inset, 0 0 60px rgba(249,115,22,0.08)" }} />
                  )}
                  {plan.badge && (
                    <span className={`mb-5 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${plan.highlight ? "bg-orange-500 text-black" : "bg-white/10 text-white/75"}`}>
                      {plan.badge}
                    </span>
                  )}
                  <p className="mb-1 text-sm text-white/50">{plan.label}</p>
                  <p className="text-3xl font-black text-white md:text-4xl">{plan.price}</p>
                  <p className="mb-7 mt-1 text-xs text-white/35">{plan.billing}</p>
                  <ul className="mb-8 space-y-3" role="list">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <circle cx="8" cy="8" r="7" fill={plan.highlight ? "rgba(249,115,22,0.18)" : "rgba(255,255,255,0.06)"} />
                          <path d="M5 8l2 2 4-4" stroke={plan.highlight ? "#f97316" : "#ffffff"} strokeOpacity={plan.highlight ? 1 : 0.5}
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact"
                    className={`inline-flex w-full items-center justify-center rounded-full py-3 text-sm font-bold transition ${
                      plan.highlight
                        ? "bg-orange-500 text-black hover:bg-orange-400 hover:shadow-[0_0_28px_rgba(249,115,22,0.5)]"
                        : "border border-white/12 text-white hover:border-orange-400/40 hover:text-orange-300"
                    }`}>
                    Get Started
                  </a>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────────────────────── */}
        <section id="features" aria-label="Why choose EliteFit" className="bg-[#080808] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="mb-14 max-w-xl">
              <motion.p variants={fadeUp} className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-orange-400">Why EliteFit</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-white md:text-5xl">
                Built for results.{" "}<span className="text-white/30">No excuses.</span>
              </motion.h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}
              className="grid gap-4 md:grid-cols-2">
              {FEATURES.map((f) => (
                <motion.article key={f.title} variants={fadeUp} whileHover={{ y: -8, transition: { duration: 0.28 } }}
                  className="group rounded-3xl border border-white/[0.06] bg-white/[0.03] p-7 backdrop-blur-sm transition-shadow hover:shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-all group-hover:scale-110"
                    style={{
                      background: `radial-gradient(circle, ${f.accent}22 0%, ${f.accent}08 100%)`,
                      border: `1px solid ${f.accent}28`,
                      color: f.accent,
                      boxShadow: `0 0 28px ${f.accent}18`,
                    }}>
                    {f.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{f.description}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── TRANSFORMATION ──────────────────────────────────────────────── */}
        <section id="transformation" aria-label="Real member results" className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="mb-14 text-center">
              <motion.p variants={fadeUp} className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-orange-400">Real Results</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-white md:text-5xl">
                Members who transformed<br />
                <span className="text-orange-400">their lives here.</span>
              </motion.h2>
            </motion.div>

            <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2 md:gap-5">
              {[
                { name: "Vikram, 28",  result: "−12 kg in 90 days",    stat: "−12 kg",     image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop" },
                { name: "Ananya, 24",  result: "+8 kg lean muscle",     stat: "+8 kg",      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop" },
              ].map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.1, duration: 0.65 }}
                  className="group relative aspect-[4/5] overflow-hidden rounded-3xl md:aspect-[5/6]">
                  <Image src={item.image} alt={item.result} fill sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="mb-2 inline-block rounded-full bg-orange-500 px-3 py-1 text-sm font-black text-black">{item.stat}</div>
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-sm text-white/60">{item.result}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ─────────────────────────────────────────────────────── */}
        <section id="gallery" aria-label="Gym gallery" className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="mb-14 max-w-xl">
              <motion.p variants={fadeUp} className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-orange-400">The Facility</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-white md:text-5xl">
                World-class space.<br /><span className="text-white/30">Built for performance.</span>
              </motion.h2>
            </motion.div>

            <div className="gym-masonry">
              {GALLERY.map((item, i) => (
                <motion.div key={item.src} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 3) * 0.08, duration: 0.55 }} viewport={{ once: true, amount: 0.1 }}
                  className="gym-masonry-item group relative cursor-zoom-in overflow-hidden rounded-2xl"
                  onClick={() => setLightbox(item)}>
                  <Image src={item.src} alt={item.label} width={800} height={600}
                    sizes="(max-width:768px) 50vw, 33vw"
                    className="w-full transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="absolute inset-x-0 bottom-0 translate-y-3 p-4 text-sm font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
        <section id="testimonials" aria-label="Client testimonials" className="bg-[#080808] py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="mb-14 text-center">
              <motion.p variants={fadeUp} className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-orange-400">Testimonials</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-white md:text-5xl">
                Thousands of wins.<br /><span className="text-orange-400">Zero shortcuts.</span>
              </motion.h2>
            </motion.div>

            <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
              <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                {TESTIMONIALS.map((t) => (
                  <article key={t.name} className="min-w-full p-8 md:p-12 lg:p-14">
                    <div className="mb-6 flex flex-wrap items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-black text-white"
                        style={{ background: `radial-gradient(circle, ${t.accent}, ${t.accent}88)` }}>
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-bold text-white">{t.name}</p>
                        <p className="text-sm font-semibold text-orange-400">{t.result}</p>
                      </div>
                      <div className="ml-auto text-sm text-orange-400">★★★★★</div>
                    </div>
                    <blockquote className="text-xl leading-relaxed text-white/80 md:text-2xl">
                      &ldquo;{t.text}&rdquo;
                    </blockquote>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} type="button" aria-label={`Testimonial ${i + 1}`} onClick={() => setActiveSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === activeSlide ? "w-8 bg-orange-400" : "w-2 bg-white/20"}`} />
                ))}
              </div>
              <div className="flex gap-2">
                <button type="button" aria-label="Previous testimonial"
                  onClick={() => setActiveSlide((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/65 transition hover:border-orange-400/40 hover:text-orange-300">
                  ‹
                </button>
                <button type="button" aria-label="Next testimonial"
                  onClick={() => setActiveSlide((p) => (p + 1) % TESTIMONIALS.length)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/65 transition hover:border-orange-400/40 hover:text-orange-300">
                  ›
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section aria-label="Call to action" className="relative isolate overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 -z-10"
            style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(249,115,22,0.16) 0%, rgba(0,0,0,0) 68%), #060606" }} />
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-[5] h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.07] blur-[100px]" />

          <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={stagger}>
              <motion.p variants={fadeUp} className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-orange-400">The next step is yours</motion.p>
              <motion.h2 variants={fadeUp} className="mb-5 text-4xl font-extrabold text-white md:text-6xl">Ready to Transform?</motion.h2>
              <motion.p variants={fadeUp} className="mb-10 text-lg text-white/50">
                Every elite physique starts with a single decision. Yours starts today.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a href="#contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-10 py-4 text-sm font-bold text-black transition hover:bg-orange-400 hover:shadow-[0_0_44px_rgba(249,115,22,0.6)] sm:w-auto">
                  Start Your Fitness Journey Today
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
                  className="inline-flex w-full justify-center rounded-full border border-white/15 px-10 py-4 text-sm font-semibold text-white transition hover:border-orange-400/35 sm:w-auto">
                  Message on WhatsApp
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── CONTACT ─────────────────────────────────────────────────────── */}
        <section id="contact" aria-label="Contact EliteFit" className="bg-[#080808] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="mb-12 max-w-xl">
              <motion.p variants={fadeUp} className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-orange-400">Get in Touch</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-white md:text-5xl">Visit EliteFit.</motion.h2>
              <motion.p variants={fadeUp} className="mt-3 text-white/55">Claim your free trial session — just call or drop us a message on WhatsApp.</motion.p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="space-y-4">
                <a href="tel:+918838250227"
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 transition hover:border-orange-400/25 sm:p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M3 5a2 2 0 012-2h1.5a1 1 0 01.95.684l1 3a1 1 0 01-.27 1.04L7 9a11 11 0 005 5l1.276-1.18a1 1 0 011.04-.27l3 1a1 1 0 01.684.95V15a2 2 0 01-2 2C7.163 17 3 12.837 3 7V5z"
                        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">Call Us</p>
                    <p className="font-bold text-white">+91 88382 50227</p>
                  </div>
                </a>

                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-orange-500/20 bg-orange-500/[0.05] p-4 transition hover:border-orange-400/35 hover:bg-orange-500/[0.09] sm:p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/20 text-sm font-black text-orange-400">WA</div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">WhatsApp</p>
                    <p className="font-bold text-white">Hi, I want to join EliteFit Gym</p>
                  </div>
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}
                className="overflow-hidden rounded-3xl border border-white/[0.07]">
                <iframe
                  title="EliteFit Gym Location"
                  src="https://maps.google.com/maps?q=Chennai%20gym&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%" height="340" loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Google Maps showing EliteFit Gym location"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] bg-black py-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 text-sm text-white/55 md:grid-cols-3 md:px-8">
          <div>
            <p className="mb-3 text-xl font-extrabold tracking-[0.1em] text-white">ELITE<span className="text-orange-400">FIT</span></p>
            <p className="max-w-[22ch]">Premium training environment built for real transformation.</p>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">Quick Links</p>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="transition hover:text-orange-300">{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">Follow Us</p>
            <div className="flex gap-4">
              {["Instagram", "Facebook", "YouTube"].map((s) => (
                <a key={s} href="#" target="_blank" rel="noreferrer" className="transition hover:text-orange-300">{s}</a>
              ))}
            </div>
            <p className="mt-5">+91 88382 50227</p>
            <p className="mt-1 text-[11px] text-white/25">© 2025 EliteFit Gym. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ── LIGHTBOX ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/92 backdrop-blur-md"
            onClick={() => setLightbox(null)}>
            <motion.div initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[90vh] max-w-[92vw] overflow-hidden rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}>
              <Image src={lightbox.src} alt={lightbox.label} width={1200} height={800}
                className="max-h-[90vh] w-auto object-contain" />
              <button type="button" aria-label="Close lightbox" onClick={() => setLightbox(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80">
                ✕
              </button>
              <p className="absolute inset-x-0 bottom-0 bg-black/55 p-4 text-sm font-semibold text-white backdrop-blur-sm">
                {lightbox.label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FLOATING ACTIONS ────────────────────────────────────────────────── */}
      <div className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-4 z-[60] md:right-5">
        <div
          className="ef-float-pulse"
          style={{ background: "rgba(37, 211, 102, 0.4)" }}
          aria-hidden="true"
        />
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
          aria-label="Chat on WhatsApp — Hi, I want to join EliteFit Gym"
          className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#25D366]/30 bg-white text-[#25D366] shadow-[0_8px_32px_rgba(37,211,102,0.35)] transition hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,211,102,0.45)]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.4 0 0 5.4 0 12.06c0 2.13.56 4.22 1.62 6.06L0 24l6.04-1.58a12.05 12.05 0 0 0 6.02 1.55h.01C18.72 23.97 24 18.57 24 11.91c0-3.22-1.26-6.25-3.48-8.43ZM12.07 21.95h-.01a9.98 9.98 0 0 1-5.08-1.39l-.36-.21-3.58.94.95-3.49-.23-.36a9.92 9.92 0 0 1-1.53-5.35C2.23 6.57 6.57 2.23 12.07 2.23c2.65 0 5.15 1.03 7.02 2.9a9.84 9.84 0 0 1 2.9 6.98c0 5.5-4.42 9.84-9.92 9.84Zm5.44-7.46c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.43-1.5-.9-.8-1.5-1.8-1.68-2.1-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.66-1.6-.91-2.2-.24-.57-.48-.5-.66-.51h-.56c-.2 0-.52.08-.8.38-.27.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.25 5.14 4.55.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>

      <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-4 z-[60] md:right-5">
        <div className="ef-float-pulse" aria-hidden="true" />
        <a href="tel:+918838250227" aria-label="Call EliteFit Gym now"
          className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-orange-600 text-[10px] font-black uppercase tracking-wide text-black shadow-[0_8px_32px_rgba(249,115,22,0.35)] transition hover:-translate-y-1">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.78 19.78 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.78 19.78 0 0 1 2.1 4.18 2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.62a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6.27 6.27l1.28-1.28a2 2 0 0 1 2.11-.45c.84.31 1.72.53 2.62.65A2 2 0 0 1 22 16.92Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </>
  );
}
