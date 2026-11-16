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

const PATH_TO_SECTION: Record<string, string> = {
  '/hero': 'hero',
  '/doctor': 'doctor',
  '/treatments': 'treatments',
  '/faq': 'faq',
  '/location': 'location',
};

export default function App() {
  useEffect(() => {
    const targetId = PATH_TO_SECTION[window.location.pathname.replace(/\/+$/, '')];
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto' });
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
