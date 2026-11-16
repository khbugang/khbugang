/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DoctorSection } from './components/DoctorSection';
import { TreatmentsSection } from './components/TreatmentsSection';
import { FaqSection } from './components/FaqSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    const canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.href = canonicalUrl;
    }
    const ogUrlMeta = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrlMeta) {
      ogUrlMeta.content = canonicalUrl;
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#222222]">
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <DoctorSection />
        <TreatmentsSection />
        <FaqSection />
        <LocationHoursSection />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
