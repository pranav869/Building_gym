"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERVICES = [
  "Teeth Cleaning",
  "Root Canal Treatment",
  "Dental Implants",
  "Braces & Aligners",
  "Cosmetic Dentistry",
  "Routine Check-up",
  "Dental Crowns / Bridges",
  "Emergency Dentistry",
  "Other",
];

const CLINIC_INFO = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 11a3 3 0 100-6 3 3 0 000 6z" stroke="#c8a96e" strokeWidth="1.5"/>
        <path d="M17 10c0 5-7 9-7 9s-7-4-7-9a7 7 0 0114 0z" stroke="#c8a96e" strokeWidth="1.5"/>
      </svg>
    ),
    label: "Address",
    value: "1st Floor, 31F, GNT Road, Anna Memorial Nagar,\nPuzhal, Chennai, Kadirvedu, Tamil Nadu 600066",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 5a2 2 0 012-2h1.5a1 1 0 01.95.684l1 3a1 1 0 01-.27 1.04L7 9a11 11 0 005 5l1.276-1.18a1 1 0 011.04-.27l3 1a1 1 0 01.684.95V15a2 2 0 01-2 2C7.163 17 3 12.837 3 7V5z" stroke="#c8a96e" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Phone",
    value: "080563 90607",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 8l7 5 7-5M3 6a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" stroke="#c8a96e" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Lead Dentist",
    value: "Dr. Basheera BDS\nMulti-Speciality Dental Surgeon",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7" stroke="#c8a96e" strokeWidth="1.5"/>
        <path d="M10 6v4l3 2" stroke="#c8a96e" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Hours",
    value: "Mon – Sat: 10:00 AM – 2:30 PM\nMon – Sat: 4:30 PM – 9:00 PM\nSunday: 10:00 AM – 2:00 PM",
  },
];

const PATIENT_EXPECTATIONS = [
  {
    title: "Before Visit",
    text: "Note medications/allergies and have a light meal before your appointment.",
  },
  {
    title: "During Treatment",
    text: "Each step is explained clearly. Pain-free anesthesia and minimal-radiation X-rays are used.",
  },
  {
    title: "After Visit",
    text: "You receive written post-care guidance and follow-up scheduling support.",
  },
];

const SAFETY_PROTOCOLS = [
  "WHO & IDA-compliant sterilization standards",
  "Autoclave-sterilized instruments",
  "Treatment room disinfection after every appointment",
  "ISO 9001 certified practice",
];

const RESOURCES = [
  "Daily oral hygiene habits",
  "Benefits of dental implants",
  "What to expect during root canal treatment",
];

const MAPS_DIRECTIONS_URL = "https://maps.app.goo.gl/YibhYVXo6TSuW3oaA";
const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Smile%20Elite%20Dental%20Clinic%20Puzhal%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-left",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".contact-right",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    /* Replace with your real form handler / API endpoint */
    setSubmitted(true);
  }

  const inputClass =
    "w-full bg-charcoal border border-smoke/60 text-pearl placeholder-mist/50 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200";

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Book a consultation"
      className="bg-obsidian py-24 md:py-36 relative overflow-hidden"
    >
      {/* Subtle radial glow behind form */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-gold text-xs font-semibold tracking-[0.28em] uppercase mb-4">
            Get Started
          </p>
          <h2 className="text-snow font-black text-4xl md:text-6xl leading-tight tracking-tight">
            Your smile journey
            <br />
            <span className="text-gold">starts here.</span>
          </h2>
          <p className="text-mist text-base md:text-lg font-light mt-5 max-w-lg mx-auto">
            Free consultations available 6 days a week. No pressure, no obligation.
          </p>
        </div>

        {/* ── Two-column layout ───────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* LEFT — Clinic info */}
          <div className="contact-left opacity-0">
            <h3 className="text-pearl font-semibold text-xl mb-8">Visit Us</h3>
            <dl className="flex flex-col gap-8">
              {CLINIC_INFO.map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <dt className="mt-0.5 shrink-0" aria-label={label}>{icon}</dt>
                  <dd className="text-mist text-sm leading-relaxed whitespace-pre-line">
                    <span className="block text-pearl font-medium text-xs tracking-widest uppercase mb-1">
                      {label}
                    </span>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 rounded-2xl overflow-hidden border border-white/10 bg-charcoal/45 backdrop-blur-xl">
              <div className="px-5 pt-5 pb-3 flex items-center justify-between gap-3">
                <p className="text-pearl text-sm font-semibold">Find Us on Google Maps</p>
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold inline-flex items-center gap-2 text-obsidian font-bold text-[11px] px-4 py-2 rounded-full uppercase tracking-wide"
                >
                  Get Directions
                </a>
              </div>

              <div className="relative w-full h-[260px] border-t border-white/10">
                <iframe
                  title="Smile Elite Dental Clinic location on Google Maps"
                  src={MAPS_EMBED_URL}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="mt-10 p-6 rounded-2xl border border-gold/20 bg-gold/5">
              <p className="text-gold text-sm font-semibold mb-2">⚡ Dental Emergency?</p>
              <p className="text-mist text-sm mb-4">
                Same-day emergency slots available for urgent dental care.
              </p>
              <a href="tel:08056390607" className="btn-gold inline-flex items-center gap-2 text-obsidian font-bold text-sm px-6 py-2.5 rounded-full transition-transform hover:scale-105">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Click to Call 080563 90607
              </a>
            </div>

            <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-charcoal/45 backdrop-blur-xl">
              <p className="text-pearl text-sm font-semibold mb-3">What To Expect</p>
              <ul className="space-y-3" role="list">
                {PATIENT_EXPECTATIONS.map((item) => (
                  <li key={item.title}>
                    <p className="text-gold text-xs uppercase tracking-[0.2em] mb-1">{item.title}</p>
                    <p className="text-mist text-sm leading-relaxed">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-charcoal/45 backdrop-blur-xl">
              <p className="text-pearl text-sm font-semibold mb-3">Sterilization & Safety</p>
              <ul className="space-y-2" role="list">
                {SAFETY_PROTOCOLS.map((item) => (
                  <li key={item} className="text-mist text-sm flex items-start gap-2">
                    <span className="text-gold mt-[2px]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-charcoal/45 backdrop-blur-xl">
              <p className="text-pearl text-sm font-semibold mb-3">Patient Resources</p>
              <ul className="space-y-2" role="list">
                {RESOURCES.map((item) => (
                  <li key={item} className="text-mist text-sm">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="contact-right opacity-0">
            {submitted ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mb-2">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M6 14l6 6 10-10" stroke="#c8a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-snow font-bold text-2xl">Request received!</h3>
                <p className="text-mist text-sm max-w-xs">
                  We&apos;ll reach out within 1 business hour to confirm your free consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                {/* Name + Phone row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-pearl text-xs font-medium tracking-wide uppercase mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Anjali Sharma"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-pearl text-xs font-medium tracking-wide uppercase mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-pearl text-xs font-medium tracking-wide uppercase mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="anjali@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-pearl text-xs font-medium tracking-wide uppercase mb-2">
                    I&apos;m interested in
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>Select a service…</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-pearl text-xs font-medium tracking-wide uppercase mb-2">
                    Anything else?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your smile goals or any concerns…"
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-gold text-obsidian font-bold text-sm py-4 rounded-full mt-2 tracking-wide transition-transform"
                >
                  Request Free Consultation →
                </button>

                <p className="text-mist text-xs text-center">
                  By submitting, you agree to our Privacy Policy. We never share your data.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
