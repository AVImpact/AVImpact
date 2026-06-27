import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { LeadModal } from "./components/forms/LeadModal";
import { UIProvider } from "./contexts/UIContext";
import { LeadProvider } from "./contexts/LeadContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { captureError } from "./lib/sentry";
import { trackEvent } from "./utils/analyticsEvents";

import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import Projects from "./pages/Projects";
import BrandsProducts from "./pages/BrandsProducts";
import Industries from "./pages/Industries";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CompanyProfile from "./pages/CompanyProfile";

function AppRoutes() {
  const navigate = useNavigate();

  // Custom navigate wrapper to handle anchor links smoothly
  const handleNavigate = (path: string) => {
    const hasHash = path.includes("#");
    navigate(path);
    if (!hasHash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home navigate={handleNavigate} />} />
      <Route path="/solutions" element={<Solutions navigate={handleNavigate} />} />
      <Route path="/projects" element={<Projects navigate={handleNavigate} />} />
      <Route path="/brands-products" element={<BrandsProducts navigate={handleNavigate} />} />
      <Route path="/industries" element={<Industries navigate={handleNavigate} />} />
      <Route path="/careers" element={<Careers navigate={handleNavigate} />} />
      <Route path="/contact" element={<Contact navigate={handleNavigate} />} />
      <Route path="/about" element={<About navigate={handleNavigate} />} />
      <Route path="/company-profile" element={<CompanyProfile navigate={handleNavigate} />} />
      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <UIProvider>
      <LeadProvider>
        <BrowserRouter>
          {/* App-level error boundary — catches any uncaught error from any page */}
          <ErrorBoundary
            componentName="Page"
            onError={(error, info) => captureError(error, { componentStack: String(info.componentStack) })}
          >
            {/* Global modal singleton */}
            <LeadModal />
            <AppRoutes />

            {/* Vercel Analytics — tracks page views automatically */}
            <Analytics />

            {/* Sleek, persistent floating Company Profile download circle in the bottom-right corner */}
            <a
              href="/AVIMPACT_Company_Profile.pdf"
              download="AVIMPACT_Company_Profile.pdf"
              onClick={() => trackEvent.companyProfileDownload()}
              className="no-print fixed right-6 bottom-6 z-50 h-11 w-11 hover:w-36 bg-[#2559bd] text-[#ffffff] flex items-center justify-start px-3 rounded-full shadow-[0_8px_30px_rgba(37,89,189,0.35)] border border-white/20 hover:bg-[#1f4a9e] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group overflow-hidden select-none"
              title="Download Company Profile"
              aria-label="Download Company Profile PDF"
            >
              <div className="flex items-center gap-2.5 min-w-max">
                <svg className="w-5 h-5 text-white shrink-0 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans font-bold text-[9px] uppercase tracking-wider">Company Profile</span>
              </div>
            </a>
          </ErrorBoundary>
        </BrowserRouter>
      </LeadProvider>
    </UIProvider>
  );
}
