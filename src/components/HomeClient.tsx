"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import StickyCTA from "@/components/StickyCTA";
import SmoothScroll from "@/components/SmoothScroll";
import MagneticEffects from "@/components/MagneticEffects";
import Footer from "@/components/Footer";

/* ── Dynamic imports (code-split + client-only) ─────────────────────────────
   { ssr: false } prevents GSAP / window access from running on the server.
   Each component is fetched lazily as the browser parses the JS bundle once the
   client is ready, keeping the Server Component lean. */
const Stats = dynamic(() => import("@/components/Stats"), { ssr: false });
const PinnedServices = dynamic(() => import("@/components/PinnedServices"), {
  ssr: false,
});
const BeforeAfter = dynamic(() => import("@/components/BeforeAfter"), {
  ssr: false,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });

export default function HomeClient() {
  return (
    <>
      <SmoothScroll />
      <MagneticEffects />

      {/* ── Navigation (sticky, fixed) ──────────────────────────────────── */}
      <Navbar />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main id="main-content">
        {/* 1. Hero — full-viewport, GSAP line-reveal + parallax */}
        <Hero />

        {/* 1b. Trust bar ticker  */}
        <TrustBar />

        {/* 2. Stats — animated number counters */}
        <Stats />

        {/* 3. Services — GSAP pinned scroll, 5 service panels */}
        <PinnedServices />

        {/* 4. Before & After — draggable image comparison slider */}
        <BeforeAfter />

        {/* 5. Testimonials — scroll-triggered staggered reveal */}
        <Testimonials />

        {/* 6. Contact — booking form + clinic info */}
        <Contact />
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <Footer />

      <StickyCTA />
    </>
  );
}
