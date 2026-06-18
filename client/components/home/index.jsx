"use client";
import HeroSection from "./HeroSection";
import MandateStrip from "./MandateStrip";
import AboutSection from "./AboutSection";
import StatsSection from "./StatsSection";
import QuickAccessGrid from "./QuickAccessGrid";
import ProgramsPreview from "./ProgramsPreview";
import CoreFocusSection from "./CoreFocusSection";
import News from "./News";
import CTASection from "./CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <MandateStrip />
      <AboutSection />
      <StatsSection />
      <QuickAccessGrid />
      <ProgramsPreview />
      <CoreFocusSection />
      <News />
      <CTASection />
    </div>
  );
}
