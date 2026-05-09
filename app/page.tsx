"use client";

import AtmosphericBg from "@/components/AtmosphericBg";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import DemoSection from "@/components/DemoSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeatureGrid from "@/components/FeatureGrid";
import StackSection from "@/components/StackSection";
import UseCasesSection from "@/components/UseCasesSection";
import ComparisonTable from "@/components/ComparisonTable";
import MetricsSection from "@/components/MetricsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-canvas relative">
      <AtmosphericBg />

      <div className="relative z-10">
        <Navbar />
        <ScrollProgress />

        <HeroSection />

        <SectionDivider number="01" label="Live Demo" />
        <DemoSection />

        <SectionDivider number="02" label="Architecture" />
        <HowItWorksSection />

        <SectionDivider number="03" label="Capabilities" />
        <FeatureGrid />

        <SectionDivider number="04" label="Infrastructure" />
        <StackSection />

        <SectionDivider number="05" label="Applications" />
        <UseCasesSection />

        <SectionDivider number="06" label="Comparison" />
        <ComparisonTable />

        <MetricsSection />

        <CTASection />

        <Footer />
      </div>
    </div>
  );
}
