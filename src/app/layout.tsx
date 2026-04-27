import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/* ── Font ────────────────────────────────────────────────────────────────────
   Inter is the closest open-source equivalent to Apple's SF Pro.
   Loaded via next/font for zero-CLS, self-hosted, no external network round-trip.
   ─────────────────────────────────────────────────────────────────────────── */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

/* ── SEO Metadata ────────────────────────────────────────────────────────────
   Targeting: premium gym + local fitness discovery intent.
   Replace metadataBase URL with the real production domain before launch.
   ─────────────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://elitefitgym.in"),

  title: {
    default: "EliteFit Gym | Premium Fitness Training",
    template: "%s | EliteFit Gym",
  },

  description:
    "Transform your body with premium fitness training, certified coaches, personalized diet plans, and modern equipment at EliteFit Gym.",

  keywords: [
    "gym near me",
    "premium gym",
    "fitness training",
    "personal trainer",
    "strength training",
    "cardio programs",
    "diet plans",
    "gym membership",
  ],

  authors: [{ name: "EliteFit Gym" }],

  openGraph: {
    title: "EliteFit Gym | Premium Fitness Training",
    description:
      "Premium fitness training with expert coaches, stylish facilities, and high-performance programs.",
    url: "https://elitefitgym.in",
    siteName: "EliteFit Gym",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EliteFit Gym — Premium fitness training",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EliteFit Gym | Join Today",
    description:
      "Transform your body with premium coaching, modern equipment, and personalized plans.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://elitefitgym.in",
  },
};

/* ── JSON-LD Structured Data ──────────────────────────────────────────────────
   Schema.org "HealthClub" structured data for rich local search results.
   Customize this with your exact address, geo coordinates, and hours.
   ─────────────────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: "EliteFit Gym",
  description:
    "Premium gym with certified trainers, modern equipment, personalized diet plans, and strength + cardio programs.",
  image: "https://elitefitgym.in/og-image.jpg",
  logo: "https://elitefitgym.in/logo.png",
  url: "https://elitefitgym.in",
  telephone: "+91-80563-90607",
  priceRange: "₹₹",

  address: {
    "@type": "PostalAddress",
    streetAddress: "Chennai, Tamil Nadu",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600001",
    addressCountry: "IN",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.172,
    longitude: 80.201,
  },

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "05:30",
      closes: "22:00",
    },
  ],

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Gym Membership Plans",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "1 Month Membership",
          description: "Access to all training zones and standard coaching support.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "6 Months Membership",
          description: "Long-term progress plan with coach check-ins and diet guidance.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "1 Year Membership",
          description: "Best value annual plan with personalized strength + cardio programming.",
        },
      },
    ],
  },

  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "84",
    bestRating: "5",
    worstRating: "1",
  },
};

/* ── Root Layout ─────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head suppressHydrationWarning>
        <script
          id="ld-json"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
