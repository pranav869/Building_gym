import Link from "next/link";

const NAV_COLS = [
  {
    heading: "Services",
    links: [
      { label: "Teeth Cleaning",           href: "#cleaning" },
      { label: "Root Canal Treatment",     href: "#root-canal" },
      { label: "Dental Implants",          href: "#implants" },
      { label: "Braces & Aligners",        href: "#aligners" },
      { label: "Cosmetic Dentistry",       href: "#cosmetic" },
      { label: "Emergency Dentistry",      href: "#contact" },
    ],
  },
  {
    heading: "Clinic",
    links: [
      { label: "Patient Reviews",href: "#reviews" },
      { label: "Before & After", href: "#results" },
      { label: "Book Consultation", href: "#contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy",    href: "/privacy-policy" },
      { label: "Terms of Service",  href: "/terms-of-service" },
    ],
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com/smileelitedental",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/smileelitedental",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"/>
      </svg>
    ),
  },
  {
    label: "Yelp",
    href: "https://yelp.com/biz/smile-elite-dental",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.5 2C8 2 4 5.5 4 10.5c0 2.2.8 4.2 2.1 5.7L4 21.5l5.5-1.8c.9.4 1.9.6 3 .6C17.5 20.3 21 16.8 21 12.5 21 7.3 17.2 2 12.5 2zm0 16.3c-.8 0-1.6-.2-2.3-.5l-2.9.9.9-2.8c-.5-.8-.8-1.7-.8-2.6C7.4 9.1 9.7 6 12.5 6S17.6 9.1 17.6 13.2s-2.3 5.1-5.1 5.1z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="bg-charcoal border-t border-smoke/30"
    >
      {/* ── Main footer grid ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" aria-label="Smile Elite Dental Centre — home">
              <span className="text-snow font-black text-2xl tracking-tight">
                Smile<span className="text-gold">Elite</span>
              </span>
            </Link>
            <p className="text-mist text-sm leading-relaxed mt-4 max-w-[200px]">
              Multi-speciality dental care in Puzhal, Chennai. Compassionate treatment. Trusted results.
            </p>

            {/* Social links */}
            <div className="flex gap-4 mt-6">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-mist hover:text-gold transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="text-snow text-xs font-semibold tracking-[0.25em] uppercase mb-5">
                {heading}
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-mist text-sm hover:text-pearl transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-smoke/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-mist text-xs">
            © {year} Smile Elite Multi-Speciality Dental Centre. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-mist text-xs">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="#c8a96e" aria-hidden="true">
              <path d="M6 1l1.3 3.9H11L8 7.1l1.1 3.9L6 8.8l-3.1 2.2L4 7.1 1 4.9h3.7L6 1z"/>
            </svg>
            <span>5.0 · Google Reviews · Puzhal, Chennai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
