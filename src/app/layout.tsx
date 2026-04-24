import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

/* ── Font ────────────────────────────────────────────────────────────────────
   Inter is the closest open-source equivalent to Apple's SF Pro.
   Loaded via next/font for zero-CLS, self-hosted, no external network round-trip.
   ─────────────────────────────────────────────────────────────────────────── */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  // Include all weights needed for the design: light body → ultra-black headlines
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* ── SEO Metadata ────────────────────────────────────────────────────────────
   Targeting: "Top-Rated Dental Clinic", "Cosmetic Dentistry", local intents.
   Replace metadataBase URL with the real production domain before launch.
   ─────────────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://carencuredentalcentre.com"),

  title: {
    default: "Care N Cure Multi-Speciality Dental Centre | Puzhal, Chennai",
    template: "%s | Care N Cure Dental Centre",
  },

  description:
    "Care N Cure Multi-Speciality Dental Centre in Puzhal, Chennai offers painless root canal treatment, dental implants, braces and aligners, cosmetic dentistry, teeth cleaning, and general dental care.",

  keywords: [
    "Dentist in Puzhal",
    "Dental Clinic in Chennai",
    "Root Canal Treatment Chennai",
    "Dental Implants",
    "Porcelain Veneers",
    "Braces and Aligners",
    "Teeth Whitening",
    "Teeth Cleaning",
    "Cosmetic Dentistry",
    "Emergency Dentist Chennai",
    "Dr Basheera BDS",
  ],

  authors: [{ name: "Care N Cure Multi-Speciality Dental Centre" }],

  openGraph: {
    title: "Care N Cure Multi-Speciality Dental Centre | Puzhal, Chennai",
    description:
      "Painless root canal, dental implants, braces and aligners, cosmetic dentistry, and preventive dental care in Chennai.",
    url: "https://carencuredentalcentre.com",
    siteName: "Care N Cure Dental Centre",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Care N Cure Multi-Speciality Dental Centre — Chennai",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Care N Cure Dental Centre | Chennai",
    description:
      "Multi-speciality dental care in Puzhal, Chennai. Root canal, implants, braces, aligners and cosmetic dentistry.",
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
    canonical: "https://carencuredentalcentre.com",
  },

  verification: {
    // Replace with your real Google Search Console verification token
    google: "replace-with-your-google-verification-token",
  },
};

/* ── JSON-LD Structured Data ──────────────────────────────────────────────────
   Schema.org "Dentist" type (extends LocalBusiness + MedicalOrganization).
   This is the #1 secret weapon for dominating "dentist near me" map packs —
   Google's crawler reads this and populates the Knowledge Panel directly.

   ✏️  To customize: update name, address, telephone, geo coords, and hours.
   ─────────────────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Care N Cure Multi-Speciality Dental Centre",
  description:
    "Multi-speciality dental centre in Puzhal, Chennai led by Dr. Basheera BDS offering teeth cleaning, painless root canal treatment, implants, braces and aligners, cosmetic dentistry, and general dental care.",
  image: "https://carencuredentalcentre.com/clinic-exterior.jpg",
  logo: "https://carencuredentalcentre.com/logo.png",
  url: "https://carencuredentalcentre.com",
  telephone: "+91-80563-90607",
  priceRange: "₹₹",

  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, 31F, GNT Road, Anna Memorial Nagar, Puzhal",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600066",
    addressCountry: "IN",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.172,
    longitude: 80.201,
  },

  // Opening hours — used by Google Maps & search rich results
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "14:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "16:30",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "14:00",
    },
  ],

  // Services offered — feeds Google's service carousel in search results
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dental Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "Teeth Cleaning",
          description: "Professional removal of plaque, tartar, and stains.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "Root Canal Treatment",
          description:
            "Painless procedures to save natural teeth with minimal discomfort.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "Dental Implants",
          description: "Permanent, natural-looking replacement for missing teeth.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "Braces & Aligners",
          description: "Traditional braces and clear aligners for all age groups.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "Cosmetic Dentistry",
          description: "Teeth whitening, veneers and smile makeover treatments.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "General Dentistry",
          description: "Routine check-ups, extractions, crowns and bridges.",
        },
      },
    ],
  },

  // Aggregate rating — boosts CTR in search results by showing stars
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "1",
  },
};

/* ── Root Layout ─────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head suppressHydrationWarning>
        {/*
         * JSON-LD injected directly into <head> — Google's preferred placement.
         * dangerouslySetInnerHTML is safe here since the data is static / trusted.
         */}
        <Script id="ld-json" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
      </head>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
