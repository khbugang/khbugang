/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DoctorSection } from './components/DoctorSection';
import { TreatmentsSection } from './components/TreatmentsSection';
import { FaqSection } from './components/FaqSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
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
