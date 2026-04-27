/**
 * page.tsx — Home Page (Server Component)
 *
 * The heavy GSAP + ScrollTrigger logic must run client-side only. To keep this
 * file a Server Component (the Next.js default) we delegate to a dedicated
 * `HomeClient` component that is marked with "use client" and handles all
 * dynamic imports.
 */

import LuxuryHomeClient from "../components/LuxuryHomeClient";

export default function HomePage() {
  return <LuxuryHomeClient />;
}
