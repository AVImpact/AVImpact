import React, { useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { NetworkBackground } from "../../components/visualizers/NetworkBackground";
import { Footer } from "../../components/layout/Footer";
import { Navbar } from "../../components/layout/Navbar";
import { useUI } from "../../contexts/UIContext";
import { useRoomDesigner } from "./hooks/useRoomDesigner";
import { useSEO } from "../../hooks/useSEO";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useRevealObserver } from "../../hooks/useRevealObserver";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { captureError } from "../../lib/sentry";

// Subcomponents
import { RoomVisualizer } from "./components/RoomVisualizer";
import { SolutionAdvisor } from "./components/SolutionAdvisor";
import { RoomConfigurator } from "./components/RoomConfigurator";
import { BrandExplorer } from "./components/BrandExplorer";

export function BrandsProducts({ navigate }: { navigate: (path: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openLeadModal } = useUI();
  const { selectedSpaceId, setSelectedSpaceId } = useRoomDesigner(containerRef);
  const scrollPercent = useScrollProgress();
  useSEO("/brands-products");
  useRevealObserver();

  // Helper to trigger context-based lead modal opening
  const openModal = (requirementType?: string) => {
    const typeLower = requirementType?.toLowerCase() || "";
    const isSales =
      typeLower.includes("contact") ||
      typeLower.includes("sales") ||
      typeLower.includes("specialist") ||
      typeLower.includes("talk");
    openLeadModal(isSales ? "sales" : "quotation", requirementType);
  };

  const onSectionError = (error: Error) =>
    captureError(error, { page: "brands-products" });

  return (
    <div className="bg-background text-on-background min-h-screen font-sans selection:bg-secondary/20 selection:text-secondary antialiased tech-grid-dots relative overflow-x-hidden">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-[5%] left-[-10%] w-[800px] h-[800px] glow-radial-soft pointer-events-none rounded-full z-0 opacity-80" />
      <div className="absolute top-[30%] right-[-15%] w-[900px] h-[900px] glow-radial-tertiary pointer-events-none rounded-full z-0 opacity-70" />
      <div className="absolute top-[60%] left-[-20%] w-[850px] h-[850px] glow-radial-vibrant pointer-events-none rounded-full z-0 opacity-60" />
      <div className="absolute bottom-[5%] right-[-5%] w-[800px] h-[800px] glow-radial-soft pointer-events-none rounded-full z-0 opacity-70" />

      {/* Network Background lines */}
      <NetworkBackground />

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-secondary z-[99] w-full origin-left transition-transform duration-300 will-change-transform"
        style={{ transform: `scaleX(${scrollPercent / 100})` }}
      />

      {/* Shared Sticky Navigation */}
      <Navbar currentPath="/brands-products" navigate={navigate} />

      {/* Main Content */}
      <main className="pt-24">
        {/* Page Hero Section */}
        <section className="relative bg-[#faf8ff] text-primary py-24 md:py-32 px-6 md:px-16 border-b border-gray-150 overflow-hidden select-none">
          {/* Subtle grid background & Ambient lights */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 text-secondary text-xs uppercase font-bold tracking-widest px-4 py-1.5 rounded-full mb-2 reveal">
              <ShieldCheck size={14} className="text-secondary" aria-hidden="true" />
              Global Technology Integration
            </div>
            <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-7xl text-primary tracking-tight leading-none reveal">
              Brands &amp; Technologies
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed font-medium reveal">
              Showcase AV Impact's ecosystem of global technology partners and enterprise-grade products that power modern workplaces, smart classrooms, command centers, healthcare, retail, and residential environments.
            </p>
            <div className="pt-4 reveal">
              <button
                type="button"
                onClick={() => openModal("Contact Us")}
                className="px-8 py-4 bg-[#2559bd] hover:bg-[#1f4a9e] text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Talk To An AV Specialist
              </button>
            </div>
          </div>
        </section>

        {/* Section 1 — Solution Advisor */}
        <section className="py-20 md:py-24 bg-white border-b border-gray-150 relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-16 text-center mb-16 reveal">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2559bd] bg-secondary/5 px-3 py-1 rounded">
              Solution Advisor
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-primary mt-3 mb-4">
              What Are You Building?
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto">
              Select the space you are planning. Our advisory tool matches it to recommended technologies and supported brand hardware.
            </p>
          </div>

          <ErrorBoundary
            componentName="Solution Advisor"
            onError={onSectionError}
          >
            <SolutionAdvisor
              selectedSpaceId={selectedSpaceId}
              setSelectedSpaceId={setSelectedSpaceId}
              openModal={openModal}
            />
          </ErrorBoundary>

          <div className="max-w-6xl mx-auto px-6 md:px-16 mt-8">
            <ErrorBoundary
              componentName="Room Visualizer"
              onError={onSectionError}
            >
              <RoomVisualizer selectedSpaceId={selectedSpaceId} />
            </ErrorBoundary>
          </div>
        </section>

        {/* Section 2 — Practical Room Configurations */}
        <ErrorBoundary
          componentName="Room Configurator"
          onError={onSectionError}
        >
          <RoomConfigurator />
        </ErrorBoundary>

        {/* Section 3 — Supported Brand Ecosystem */}
        <ErrorBoundary
          componentName="Brand Explorer"
          onError={onSectionError}
        >
          <BrandExplorer />
        </ErrorBoundary>
      </main>

      {/* Reusable Premium Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}

export default BrandsProducts;
