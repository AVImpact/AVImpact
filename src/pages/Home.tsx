import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/layout/Navbar";
import { NetworkBackground } from "../components/visualizers/NetworkBackground";
import { Footer } from "../components/layout/Footer";
import { BrandLogo } from "../components/ui/BrandLogo";
import { CountUpNumber } from "../components/ui/CountUpNumber";
import { ProgressRing } from "../components/ui/ProgressRing";
import { useUI } from "../contexts/UIContext";

const homePartnerBrands = [
  { name: "Jabra", cat: "Intelligent Audio & Video", fit: "Best For: Personal & Huddle Hubs" },
  { name: "Cisco", cat: "Enterprise Conferencing", fit: "Best For: High-Security Executive Spaces" },
  { name: "JBL", cat: "Commercial Audio & Sound", fit: "Best For: Event Halls & Background Audio" },
  { name: "Bose Professional", cat: "Acoustic Audio", fit: "Best For: Auditoriums & Premium Spaces" },
  { name: "Barco", cat: "Wireless Collaboration", fit: "Best For: ClickShare Boardrooms" },
  { name: "Yealink", cat: "Video Conferencing", fit: "Ideal for Meeting Rooms" },
  { name: "Poly", cat: "Collaboration Endpoints", fit: "Best For: Executive Conferencing Suites" },
  { name: "AVer", cat: "Auto-Tracking PTZ Cameras", fit: "Best For: Lecture Halls & Auditoriums" },
  { name: "Kramer", cat: "AV Signal Distribution", fit: "Best For: Centralized Equipment Racks" },
  { name: "Logitech", cat: "Conference Cameras", fit: "Best For: Huddle Rooms & Collaboration" },
  { name: "Maxhub", cat: "Interactive Flat Panels", fit: "Best For: Hybrid Classrooms & Boardrooms" },
  { name: "Newline", cat: "Collaboration Touch Displays", fit: "Best For: Training Rooms & Classrooms" },
  { name: "LG", cat: "Commercial LED & Displays", fit: "Best For: Digital Signage & Lobby Video Walls" },
  { name: "Epson", cat: "Laser Projection Systems", fit: "Best For: Medium & Large Auditoriums" },
  { name: "Panasonic", cat: "Pro Projection & PTZ Systems", fit: "Best For: Broadcast Studios & Venues" },
  { name: "Samsung", cat: "Display Technology", fit: "Best For: Boardrooms & Signage" },
  { name: "Optoma", cat: "Smart Laser Projectors", fit: "Best For: Home Cinema & Large Classrooms" }
];

interface HomeProps {
  navigate: (path: string) => void;
}
interface Capability {
  id: number;
  title: string;
  iconName: string;
  shortDesc: string;
  longDesc: string;
  problem: string;
  solution: string;
  outcome: string;
  visualType: 'product' | 'budget' | 'pricing' | 'delivery' | 'install' | 'support';
}

const capabilities: Capability[] = [
  {
    id: 0,
    title: "Right Product Selection",
    iconName: "verified",
    shortDesc: "Tailored hardware recommendations based on your specific acoustics and spatial requirements.",
    longDesc: "We perform acoustic mapping and architectural layouts to select components designed specifically for your space's physical demands.",
    problem: "Organizations waste budget on mismatched hardware that doesn't fit room acoustics or physical scale, resulting in low utilization.",
    solution: "Applying computational acoustics modeling, spatial analysis, and CAD drafting to recommend the exact equipment configuration required.",
    outcome: "100% equipment utilization, zero capital waste, and perfect audio/video coverage across all meeting spaces.",
    visualType: "product"
  },
  {
    id: 1,
    title: "Budget-Friendly",
    iconName: "savings",
    shortDesc: "Maximized value without compromising on technical standards or component reliability.",
    longDesc: "We balance premium performance with cost-conscious design to offer maximum value within your budget constraints.",
    problem: "Inflexible system designs force companies to choose between over-budget high-end gear or cheap, unreliable consumer equipment.",
    solution: "Designing modular, open-architecture AV systems that invest budget in critical signal pathways while optimizing ancillary costs.",
    outcome: "Enterprise-grade reliability and communication quality achieved at a sustainable, value-optimized price point.",
    visualType: "budget"
  },
  {
    id: 2,
    title: "Competitive Pricing",
    iconName: "sell",
    shortDesc: "Direct manufacturer partnerships ensuring the best market rates for high-end AV gear.",
    longDesc: "Leveraging our industry partnerships to secure hardware directly from top-tier brands, passing the savings to you.",
    problem: "Layered distributor markups and regional dealer premiums inflate AV equipment procurement costs by 20% to 40%.",
    solution: "Maintaining direct manufacturer integration partnerships and bulk procurement channels to bypass intermediate tiers.",
    outcome: "Significant capital expense savings with direct hardware access and official manufacturer warranties.",
    visualType: "pricing"
  },
  {
    id: 3,
    title: "Timely Delivery",
    iconName: "shuffle",
    shortDesc: "Precision logistics to meet your project milestones and grand opening dates.",
    longDesc: "Strict coordination with shipping and construction milestones ensures equipment arrives and is deployed exactly when needed.",
    problem: "Uncoordinated supply chains and shipping delays push back office opening dates, resulting in operational downtime.",
    solution: "Staged warehousing, real-time tracking, and pre-configuration staging of racks before shipment to site.",
    outcome: "Seamless integration with general construction timelines, guaranteeing zero delayed launches.",
    visualType: "delivery"
  },
  {
    id: 4,
    title: "Professional Installation",
    iconName: "engineering",
    shortDesc: "Certified engineers specializing in clean rack management, concealed wiring, and acoustic calibration.",
    longDesc: "Every cable is concealed, racks are neatly dressed, and rooms are calibrated for echo-free, crystal-clear signals.",
    problem: "Messy wiring, loose connections, and uncalibrated DSP audio processors lead to echo, interference, and frequent room failures.",
    solution: "Certified CTS-I and CTS-D engineers performing clean rack wiring dressing, hidden cabling paths, and professional acoustic tuning.",
    outcome: "Aesthetically immaculate meeting environments with reliable hardware connections and pristine, echo-free audio.",
    visualType: "install"
  },
  {
    id: 5,
    title: "Reliable After-Sales Support",
    iconName: "handshake",
    shortDesc: "Long-term partnership approach with 24/7 technical assistance and routine system health checks.",
    longDesc: "Remote diagnostics, scheduled preventative maintenance, and rapid response support ensure maximum system uptime.",
    problem: "Unexpected meeting room crashes leave teams stranded, taking hours of IT support troubleshooting to resolve.",
    solution: "Integrating remote monitoring agents, a 24/7 helpdesk, and monthly proactive preventative system checkups.",
    outcome: "99.9% room uptime with remote diagnostic resolution times under 15 minutes, preventing meeting disruptions.",
    visualType: "support"
  }
];

// Render small animated visuals for each capability card on hover
function renderMiniVisual(type: string) {
  switch (type) {
    case "product":
      return (
        <svg viewBox="0 0 100 40" className="w-24 h-10 text-[#2559bd]">
          <rect x="5" y="5" width="90" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="50" cy="20" r="6" fill="currentColor" opacity="0.1" />
          <circle cx="50" cy="20" r="2" fill="currentColor" />
          <line x1="20" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1" />
          <circle cx="25" cy="20" r="3" fill="#10b981" />
          <circle cx="75" cy="20" r="3" fill="#10b981" />
          <circle cx="50" cy="20" r="12" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.7">
            <animate attributeName="r" values="2;15" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case "budget":
      return (
        <svg viewBox="0 0 100 40" className="w-24 h-10 text-[#10b981]">
          <path d="M 20 30 A 25 25 0 0 1 80 30" stroke="#e2e8f0" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 20 30 A 25 25 0 0 1 70 20" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="50" cy="30" r="4" fill="#0d1b3e" />
          <line x1="50" y1="30" x2="65" y2="15" stroke="#0d1b3e" strokeWidth="2" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" from="-60 50 30" to="30 50 30" dur="1.5s" repeatCount="indefinite" additive="sum" />
          </line>
        </svg>
      );
    case "pricing":
      return (
        <svg viewBox="0 0 100 40" className="w-24 h-10 text-[#2559bd]">
          <circle cx="50" cy="20" r="6" fill="currentColor" />
          <circle cx="15" cy="10" r="4" fill="#64748b" />
          <circle cx="15" cy="30" r="4" fill="#64748b" />
          <circle cx="85" cy="10" r="4" fill="#64748b" />
          <circle cx="85" cy="30" r="4" fill="#64748b" />
          <line x1="15" y1="10" x2="50" y2="20" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="15" y1="30" x2="50" y2="20" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="85" y1="10" x2="50" y2="20" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="85" y1="30" x2="50" y2="20" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="50" cy="20" r="3" fill="#10b981">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case "delivery":
      return (
        <svg viewBox="0 0 100 40" className="w-24 h-10 text-[#2559bd]">
          <line x1="10" y1="20" x2="90" y2="20" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="20" x2="70" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <animate attributeName="x2" values="10;90" dur="2s" repeatCount="indefinite" />
          </line>
          <circle cx="10" cy="20" r="3" fill="currentColor" />
          <circle cx="50" cy="20" r="3" fill="currentColor" />
          <circle cx="90" cy="20" r="3" fill="currentColor" />
        </svg>
      );
    case "install":
      return (
        <svg viewBox="0 0 100 40" className="w-24 h-10 text-[#2559bd]">
          <rect x="25" y="8" width="50" height="24" rx="2" fill="none" stroke="#64748b" strokeWidth="1" />
          <circle cx="35" cy="20" r="2" fill="#10b981" />
          <circle cx="65" cy="20" r="2" fill="#3b82f6" />
          <path d="M 10 20 L 25 20 M 75 20 L 90 20" stroke="currentColor" strokeWidth="1.5">
            <animate attributeName="stroke-dasharray" values="5,5;1,9" dur="1.5s" repeatCount="indefinite" />
          </path>
        </svg>
      );
    case "support":
      return (
        <svg viewBox="0 0 100 40" className="w-24 h-10 text-[#2559bd]">
          <circle cx="50" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="50" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="50" cy="20" r="2" fill="currentColor" />
          <line x1="50" y1="20" x2="63" y2="10" stroke="currentColor" strokeWidth="1">
            <animateTransform attributeName="transform" type="rotate" from="0 50 20" to="360 50 20" dur="2.5s" repeatCount="indefinite" />
          </line>
        </svg>
      );
    default:
      return null;
  }
}



// CenterEcosystem Component
function CenterEcosystem({ activeHoverCard }: { activeHoverCard: number | null }) {
  return (
    <div className="w-[280px] h-[280px] rounded-full border border-[#2559bd]/15 bg-white/95 backdrop-blur-md shadow-2xl relative flex items-center justify-center overflow-hidden z-10 transition-all duration-500 hover:scale-105 group/center select-none">

      {/* 1. IDLE / DEFAULT ECOSYSTEM */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 ease-in-out ${activeHoverCard === null ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 40 140 L 100 90 L 160 140 L 100 180 Z" stroke="#c7d2fe" strokeWidth="1.5" />
          <path d="M 40 140 L 40 120 L 100 70 L 160 120 L 160 140" stroke="#c7d2fe" strokeWidth="1" strokeDasharray="3,3" />
          <path d="M 70 140 L 100 120 L 130 140 L 100 155 Z" fill="#eef2ff" stroke="#2559bd" strokeWidth="1.5" />
          <rect x="80" y="55" width="40" height="24" rx="2" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
          <circle cx="100" cy="67" r="3" fill="#34d399">
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="110" r="4" fill="#6c98ff" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="150" cy="110" r="4" fill="#6c98ff" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <path d="M 50 110 L 80 67 M 150 110 L 120 67" stroke="#6c98ff" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
        </svg>
        <span className="text-[10px] font-black text-secondary tracking-widest uppercase mt-2 animate-pulse">AV Ecosystem</span>
      </div>

      {/* 2. PRODUCT SELECTION Visual */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 ease-in-out ${activeHoverCard === 0 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="20" y1="100" x2="180" y2="100" stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="3,3" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="3,3" />
          <circle cx="100" cy="100" r="60" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="4,4" />

          <path d="M 60 110 L 100 80 L 140 110 L 100 130 Z" stroke="#2559bd" strokeWidth="1.5" strokeDasharray="100">
            <animate attributeName="stroke-dashoffset" values="100;0" dur="1.5s" fill="freeze" />
          </path>

          <circle cx="100" cy="70" r="6" fill="none" stroke="#34d399" strokeWidth="1.5">
            <animate attributeName="r" values="0;6" dur="0.8s" fill="freeze" />
          </circle>
          <path d="M 100 70 L 100 95" stroke="#34d399" strokeWidth="1" strokeDasharray="4,4" />

          <path d="M 80 110 A 30 30 0 0 1 120 110" stroke="#6c98ff" strokeWidth="1.5" fill="none" opacity="0.6">
            <animate attributeName="stroke-width" values="0.5;3;0.5" dur="1.5s" repeatCount="indefinite" />
          </path>
        </svg>
        <span className="text-[10px] font-black text-[#2559bd] tracking-widest uppercase mt-2">System Design</span>
      </div>

      {/* 3. BUDGET FRIENDLY Visual */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 ease-in-out ${activeHoverCard === 1 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 50 140 A 65 65 0 1 1 150 140" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" fill="none" />

          <path
            d="M 50 140 A 65 65 0 1 1 150 140"
            stroke="#10b981"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="300"
            strokeDashoffset="120"
          >
            <animate attributeName="stroke-dashoffset" values="300;120" dur="1.2s" fill="freeze" />
          </path>

          <g transform="translate(100, 110)">
            <circle cx="0" cy="0" r="8" fill="#1f2937" />
            <polygon points="-3,0 3,0 0,-55" fill="#1f2937">
              <animateTransform attributeName="transform" type="rotate" from="-90" to="50" dur="1.2s" fill="freeze" />
            </polygon>
          </g>

          <text x="100" y="160" textAnchor="middle" fill="#10b981" fontSize="16" fontWeight="bold" fontFamily="sans-serif">98% VALUE</text>
        </svg>
        <span className="text-[10px] font-black text-[#10b981] tracking-widest uppercase mt-2">Optimized ROI</span>
      </div>

      {/* 4. COMPETITIVE PRICING Visual */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 ease-in-out ${activeHoverCard === 2 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="18" fill="#2559bd" opacity="0.1" />
          <circle cx="100" cy="100" r="12" fill="#2559bd" />

          <g transform="translate(45, 60)"><circle cx="0" cy="0" r="10" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" /><text x="0" y="3" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="black">BOSE</text></g>
          <g transform="translate(155, 60)"><circle cx="0" cy="0" r="10" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" /><text x="0" y="3" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="black">CISCO</text></g>
          <g transform="translate(45, 140)"><circle cx="0" cy="0" r="10" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" /><text x="0" y="3" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="black">JBL</text></g>
          <g transform="translate(155, 140)"><circle cx="0" cy="0" r="10" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" /><text x="0" y="3" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="black">LG</text></g>

          <path d="M 45 60 L 88 92" stroke="#6c98ff" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
          <path d="M 155 60 L 112 92" stroke="#6c98ff" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
          <path d="M 45 140 L 88 108" stroke="#6c98ff" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
          <path d="M 155 140 L 112 108" stroke="#6c98ff" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />

          <circle r="3" fill="#3b82f6"><animateMotion path="M 45 60 L 100 100" dur="2s" repeatCount="indefinite" /></circle>
          <circle r="3" fill="#3b82f6"><animateMotion path="M 155 60 L 100 100" dur="1.7s" repeatCount="indefinite" /></circle>
          <circle r="3" fill="#3b82f6"><animateMotion path="M 45 140 L 100 100" dur="2.3s" repeatCount="indefinite" /></circle>
          <circle r="3" fill="#3b82f6"><animateMotion path="M 155 140 L 100 100" dur="1.9s" repeatCount="indefinite" /></circle>
        </svg>
        <span className="text-[10px] font-black text-[#475569] tracking-widest uppercase mt-2">Direct Channel</span>
      </div>

      {/* 5. TIMELY DELIVERY Visual */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 ease-in-out ${activeHoverCard === 3 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="30" y="60" fill="#94a3b8" fontSize="8" fontWeight="bold">Staged</text>
          <rect x="70" y="52" width="0" height="10" rx="3" fill="#cbd5e1">
            <animate attributeName="width" values="0;40" dur="0.5s" fill="freeze" />
          </rect>
          <circle cx="110" cy="57" r="4" fill="#10b981" opacity="0">
            <animate attributeName="opacity" values="0;1" begin="0.5s" fill="freeze" />
          </circle>

          <text x="30" y="95" fill="#94a3b8" fontSize="8" fontWeight="bold">Transit</text>
          <rect x="70" y="87" width="0" height="10" rx="3" fill="#6c98ff">
            <animate attributeName="width" values="0;60" begin="0.5s" dur="0.5s" fill="freeze" />
          </rect>
          <circle cx="130" cy="92" r="4" fill="#10b981" opacity="0">
            <animate attributeName="opacity" values="0;1" begin="1s" fill="freeze" />
          </circle>

          <text x="30" y="130" fill="#94a3b8" fontSize="8" fontWeight="bold">Install</text>
          <rect x="70" y="122" width="0" height="10" rx="3" fill="#2559bd">
            <animate attributeName="width" values="0;50" begin="1s" dur="0.5s" fill="freeze" />
          </rect>
          <circle cx="120" cy="127" r="4" fill="#10b981" opacity="0">
            <animate attributeName="opacity" values="0;1" begin="1.5s" fill="freeze" />
          </circle>

          <path d="M 110 57 L 110 92 L 120 127" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
        </svg>
        <span className="text-[10px] font-black text-[#2559bd] tracking-widest uppercase mt-2">Deploy Schedule</span>
      </div>

      {/* 6. PROFESSIONAL INSTALLATION Visual */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 ease-in-out ${activeHoverCard === 4 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="65" y="30" width="70" height="140" rx="6" stroke="#475569" strokeWidth="2.5" />

          <line x1="65" y1="65" x2="135" y2="65" stroke="#475569" strokeWidth="1.5" />
          <line x1="65" y1="100" x2="135" y2="100" stroke="#475569" strokeWidth="1.5" />
          <line x1="65" y1="135" x2="135" y2="135" stroke="#475569" strokeWidth="1.5" />

          <circle cx="80" cy="48" r="2.5" fill="#3b82f6" />
          <circle cx="120" cy="118" r="2.5" fill="#3b82f6" />

          <path d="M 80 48 Q 100 80 120 118" stroke="#2559bd" strokeWidth="1.8" fill="none" strokeDasharray="150" strokeDashoffset="150">
            <animate attributeName="stroke-dashoffset" values="150;0" dur="1.5s" fill="freeze" />
          </path>

          <circle cx="85" cy="82" r="2" fill="#34d399">
            <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="95" cy="82" r="2" fill="#34d399">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="105" cy="118" r="2" fill="#34d399">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
          </circle>
        </svg>
        <span className="text-[10px] font-black text-[#2559bd] tracking-widest uppercase mt-2">Rack Dressing</span>
      </div>

      {/* 7. RELIABLE AFTER-SALES Visual */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 ease-in-out ${activeHoverCard === 5 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="60" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
          <circle cx="100" cy="100" r="40" stroke="#cbd5e1" strokeWidth="1" opacity="0.6" />
          <circle cx="100" cy="100" r="20" stroke="#cbd5e1" strokeWidth="1" opacity="0.8" />

          <path d="M 100 40 A 60 60 0 0 1 160 100" stroke="#2559bd" strokeWidth="2.5" opacity="0.4" fill="none">
            <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="4s" repeatCount="indefinite" />
          </path>

          <g transform="translate(88, 88)">
            <path d="M 12 2 L 2 6 L 2 12 C 2 18, 12 22, 12 22 C 12 22, 22 18, 22 12 L 22 6 L 12 2 Z" fill="#2559bd" opacity="0.1" />
            <path d="M 12 2 L 2 6 L 2 12 C 2 18, 12 22, 12 22 C 12 22, 22 18, 22 12 L 22 6 L 12 2 Z" stroke="#2559bd" strokeWidth="2" fill="none" />
            <path d="M 9 12 L 11 14 L 15 10" stroke="#34d399" strokeWidth="2" fill="none" />
          </g>

          <circle cx="70" cy="70" r="3" fill="#34d399"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" /></circle>
          <circle cx="140" cy="130" r="3" fill="#34d399"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" /></circle>
        </svg>
        <span className="text-[10px] font-black text-secondary tracking-widest uppercase mt-2">Active Telemetry</span>
      </div>
    </div>
  );
}

export default function Home({ navigate }: HomeProps) {
  const { openLeadModal } = useUI();
  // Navigation States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  // Hero Before/After Slider state
  const heroSliderRef = useRef<HTMLDivElement>(null);
  const [heroSliderPercent, setHeroSliderPercent] = useState(50);
  const isDraggingHeroSlider = useRef(false);

  // Why AV Impact Interactive Section States
  const [activeHoverCard, setActiveHoverCard] = useState<number | null>(null);
  const [activeClickCard, setActiveClickCard] = useState<number | null>(null);

  // Lead popup states
  const [scrollPercent, setScrollPercent] = useState(0);
  const popupShown = useRef(false);

  // Timeline filling state
  const [timelineProgress, setTimelineProgress] = useState(0);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Scroll to section on hash change / mount
  useEffect(() => {
    // -------------------------------------------------------------
    // SEO & METADATA ARCHITECTURE FOR HOME PAGE
    // -------------------------------------------------------------
    document.title = "Audio Visual Solutions & Collaboration Technology | AV Impact";

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", window.location.origin + "/");

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", "AV Impact designs and integrates advanced boardroom solutions, video conferencing systems, and collaboration technologies to help teams connect and make smarter decisions.");

    // Open Graph Tags
    const ogTags = [
      { property: "og:title", content: "Audio Visual Solutions & Collaboration Technology | AV Impact" },
      { property: "og:description", content: "AV Impact designs and integrates advanced boardroom solutions, video conferencing systems, and collaboration technologies." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: window.location.origin + "/" },
      { property: "og:image", content: window.location.origin + "/assets/boardroom_after.webp" },
      { name: "twitter:card", content: "summary_large_image" }
    ];
    ogTags.forEach((tag) => {
      const selector = tag.property ? `meta[property="${tag.property}"]` : `meta[name="${tag.name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (tag.property) el.setAttribute("property", tag.property);
        if (tag.name) el.setAttribute("name", tag.name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", tag.content);
    });

    // JSON-LD Organization, Local Business, and FAQ Schemas
    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.id = "home-structured-schema";
    schemaScript.innerHTML = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "AV Impact",
        "url": window.location.origin,
        "logo": window.location.origin + "/assets/logo.webp",
        "sameAs": ["https://www.linkedin.com/company/av-impact"]
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "AV Impact Indore Office",
        "image": window.location.origin + "/assets/boardroom_after.webp",
        "telephone": "+91-96854-53058",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "101, Balaji Heights, Geeta Bhawan",
          "addressLocality": "Indore",
          "addressRegion": "M.P.",
          "postalCode": "452001",
          "addressCountry": "IN"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What audio visual integration services do you offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer smart meeting room design, video conferencing installations, HyFlex classroom solutions, auditorium presentation setups, and digital signage matrices."
            }
          },
          {
            "@type": "Question",
            "name": "Which brands do you partner with?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AV Impact is a certified partner of global leading brands including Crestron, Q-SYS, Bose Professional, Jabra, Cisco, Logitech, and Kramer."
            }
          }
        ]
      }
    ]);
    document.head.appendChild(schemaScript);

    const handleHashScroll = () => {
      if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        setTimeout(() => {
          scrollToSection(hash);
        }, 400);
      }
    };
    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
      const script = document.getElementById("home-structured-schema");
      if (script) script.remove();
    };
  }, []);

  // Scroll listeners and reveal animations
  useEffect(() => {
    let scrollRafId: number | null = null;
    let pendingPopup = false;

    const handleScroll = () => {
      // Throttle all scroll state updates via rAF to avoid blocking the main thread
      if (scrollRafId !== null) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = null;

        // Fullscreen background slider scroll sync
        const heroHeight = window.innerHeight || 800;
        const scrollPercentage = Math.max(0, Math.min(100, (window.scrollY / heroHeight) * 100));
        if (window.scrollY > 0) {
          setHeroSliderPercent(100 - scrollPercentage);
        }

        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) return;
        const currentScrollPercent = (window.scrollY / scrollHeight) * 100;
        setScrollPercent(currentScrollPercent);

        // Popup trigger: defer to avoid state update during scroll
        if (currentScrollPercent > 30 && !popupShown.current && !pendingPopup) {
          pendingPopup = true;
          setTimeout(() => {
            if (!popupShown.current) {
              openLeadModal("scroll-email");
              popupShown.current = true;
            }
            pendingPopup = false;
          }, 0);
        }

        const sections = ["home", "why-us", "solutions", "industries", "process"];
        const headerOffset = 100;
        let currentSection = "home";
        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= headerOffset + 50) {
              currentSection = sectionId;
            }
          }
        }
        setActiveNav(currentSection);

        // Process Timeline progress fill
        const track = document.getElementById("timeline-track");
        if (track) {
          const rect = track.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const relativeTop = rect.top - viewportHeight * 0.5;
          const progress = Math.max(0, Math.min(100, ((-relativeTop) / rect.height) * 100));
          setTimelineProgress(progress);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Reveal observer for generic sections
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((r) => revealObserver.observe(r));

    // Industries scroll entrance observer
    const industriesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const boxes = entry.target.querySelectorAll(".reveal-box");
            boxes.forEach((box, index) => {
              setTimeout(() => {
                box.classList.add("active");
              }, index * 100);
            });
            industriesObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const industriesGrid = document.getElementById("industries-grid");
    if (industriesGrid) {
      industriesObserver.observe(industriesGrid);
    }

    // Process vertical timeline observer
    const processObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            processObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const processSteps = document.querySelectorAll(".process-step");
    processSteps.forEach((step, index) => {
      (step as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
      processObserver.observe(step);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
      revealObserver.disconnect();
      industriesObserver.disconnect();
      processObserver.disconnect();
    };
  }, []);

  // 3D Card Hover Tilt logic
  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>, maxRotation = 8) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateY = ((x - xc) / xc) * maxRotation;
    const rotateX = -((y - yc) / yc) * maxRotation;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };



  // Hero Slider vertical cursor position translation handlers
  const handleHeroSliderMove = (clientY: number) => {
    if (!heroSliderRef.current) return;
    const rect = heroSliderRef.current.getBoundingClientRect();
    const y = clientY - rect.top;
    const percentage = Math.max(0, Math.min(100, 100 - (y / rect.height) * 100));
    setHeroSliderPercent(percentage);
  };

  const handleHeroSliderMouseMove = (e: React.MouseEvent) => {
    handleHeroSliderMove(e.clientY);
  };

  const handleHeroSliderMouseDown = (e: React.MouseEvent) => {
    isDraggingHeroSlider.current = true;
    handleHeroSliderMove(e.clientY);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDraggingHeroSlider.current = false;
    };
    const handleGlobalTouchEnd = () => {
      isDraggingHeroSlider.current = false;
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalTouchEnd);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, []);

  // Continuous auto-sliding animation for hero slider
  // Uses CSS interval instead of rAF to avoid 60fps React re-renders.
  // We only update state every 100ms to keep it smooth but not perf-heavy.
  useEffect(() => {
    let lastPercent = 50;
    const duration = 8000; // 8 seconds per full cycle
    const startTime = performance.now();

    const intervalId = setInterval(() => {
      // Only animate if the user is not dragging and is near the top of the page
      if (!isDraggingHeroSlider.current && window.scrollY < 200) {
        const elapsed = performance.now() - startTime;
        const phase = (elapsed / duration) * Math.PI * 2;
        const wave = Math.sin(phase);
        const percent = Math.round((50 + wave * 30) * 10) / 10; // round to 1 decimal
        // Only update state if the value meaningfully changed (avoid micro re-renders)
        if (Math.abs(percent - lastPercent) > 0.5) {
          lastPercent = percent;
          setHeroSliderPercent(percent);
        }
      }
    }, 100); // 10fps is smooth enough for this slow wave animation

    return () => {
      clearInterval(intervalId);
    };
  }, []);



  return (
    <div className="bg-background text-on-background font-body-md text-body-md overflow-x-hidden selection:bg-secondary/20 selection:text-secondary antialiased relative">

      {/* Dynamic Background glowing ambient light orbs */}
      <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] glow-radial-soft pointer-events-none rounded-full z-0 opacity-80" />
      <div className="absolute top-[35%] right-[-10%] w-[700px] h-[700px] glow-radial-tertiary pointer-events-none rounded-full z-0 opacity-60" />
      <div className="absolute top-[60%] left-[-8%] w-[650px] h-[650px] glow-radial-vibrant pointer-events-none rounded-full z-0 opacity-50" />
      <div className="absolute top-[80%] right-[-5%] w-[800px] h-[800px] glow-radial-soft pointer-events-none rounded-full z-0 opacity-70" />

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-secondary z-[60] w-full origin-left transition-transform duration-300 will-change-transform"
        style={{ transform: `scaleX(${scrollPercent / 100})` }}
      />
      {/* Shared Navigation Bar */}
      <Navbar currentPath="/" navigate={navigate} activeSection={activeNav} />

      {/* Hero Section */}
      <section
        id="home"
        ref={heroSliderRef}
        onMouseMove={handleHeroSliderMouseMove}
        className="relative h-screen min-h-[600px] flex items-center justify-start overflow-hidden cursor-default group/hero select-none z-10"
      >
        {/* BEFORE (Left Side) Fullscreen Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img 
            src="/assets/boardroom_before.webp" 
            alt="Standard boardroom setup" 
            className="w-full h-full object-cover brightness-[0.85]" 
          />
          {/* Subtle gradient overlay to darken it slightly on the left for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
        </div>

        {/* AFTER (Right Side) Fullscreen Background Image */}
        <div 
          className="absolute inset-0 z-10 w-full h-full overflow-hidden select-none pointer-events-none" 
          style={{ 
            clipPath: `inset(0 0 0 ${heroSliderPercent}%)`,
            willChange: "clip-path",
            transition: "clip-path 400ms cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          <img 
            src="/assets/boardroom_after.webp" 
            alt="Optimized AV Impact boardroom" 
            className="absolute top-0 left-0 w-screen h-full object-cover" 
            style={{
              maxWidth: 'none',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Fullscreen Slider Divider Line + Wide Hit Area */}
        <div 
          className="absolute top-0 bottom-0 z-20 flex items-center justify-center cursor-col-resize"
          style={{ 
            left: `calc(${heroSliderPercent}% - 16px)`,
            width: "32px",
            transition: "left 400ms cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          onMouseMove={handleHeroSliderMouseMove}
          onMouseDown={handleHeroSliderMouseDown}
          onTouchStart={(e) => {
            isDraggingHeroSlider.current = true;
            if (e.touches && e.touches[0]) {
              handleHeroSliderMove(e.touches[0].clientY);
            }
          }}
          onTouchMove={(e) => {
            if (e.touches && e.touches[0]) {
              handleHeroSliderMove(e.touches[0].clientY);
            }
          }}
        >
          {/* Visual line */}
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none" />
          {/* Draggable Handle Button in the center */}
          <div className="relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 border border-secondary/25">
            <svg className="w-6 h-6 text-[#2559bd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3m0 0l3 3m-3-3h14m-3-3l3 3m0 0l-3 3" />
            </svg>
          </div>
        </div>

        {/* Floating Labels following the slider */}
        <div 
          className="absolute top-28 z-20 pointer-events-none"
          style={{ 
            left: `${heroSliderPercent}%`,
            transform: 'translateX(-110%)',
            opacity: heroSliderPercent > 20 ? 1 : 0,
            transition: "left 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease"
          }}
        >
          <div className="bg-[#0f172a]/95 text-white text-[9px] font-black tracking-wider uppercase px-4 py-2 rounded-full border border-amber-500/30 shadow-2xl whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            BEFORE: STANDARD SETUP
          </div>
        </div>

        <div 
          className="absolute top-28 z-20 pointer-events-none"
          style={{ 
            left: `${heroSliderPercent}%`,
            transform: 'translateX(10%)',
            opacity: heroSliderPercent < 80 ? 1 : 0,
            transition: "left 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease"
          }}
        >
          <div className="bg-[#2559bd]/95 text-white text-[9px] font-black tracking-wider uppercase px-4 py-2 rounded-full border border-cyan-400/30 shadow-2xl whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
            AFTER: AV IMPACT SOLUTION
          </div>
        </div>

        {/* Hero Content Card Overlay (Left aligned) */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-16 flex justify-start items-center h-full pointer-events-none">
          <div 
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="max-w-md bg-white/85 backdrop-blur-xl border border-white/40 p-8 rounded-[28px] shadow-[0_20px_50px_rgba(0,9,36,0.12)] animate-fade-in pointer-events-auto flex flex-col gap-5"
          >
            <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-[34px] text-[#000924] leading-[1.12] tracking-tight">
              Better Connections.<br/>
              <span className="text-[#2559bd]">Better Decisions.</span><br/>
              Better Results.
            </h1>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
              AV Impact designs intelligent communication and collaboration environments that help organizations connect teams, accelerate decision-making, and achieve better business outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-1">
              <button 
                onClick={() => openLeadModal("quotation")}
                className="px-5 py-3 bg-[#2559bd] text-white rounded-xl text-xs font-bold hover:bg-[#1f4a9e] transition-all transform hover:-translate-y-0.5 shadow-lg active:scale-95 whitespace-nowrap"
              >
                Book a Free AV Consultation
              </button>
              <button 
                onClick={() => navigate("/solutions")}
                className="px-5 py-3 bg-white text-[#2559bd] border border-[#2559bd]/25 rounded-xl text-xs font-bold hover:bg-[#f5f7ff] transition-all transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
              >
                Explore Solutions
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Bounce Arrow */}
        <div
          onClick={() => scrollToSection("why-us")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-30 animate-fade-in"
        >
          <span className="material-symbols-outlined text-[#2559bd] text-4xl">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* Why AV Impact Section (Interactive Redesign) */}
      <section className="py-stack-lg bg-surface px-margin-mobile md:px-margin-desktop relative overflow-hidden" id="why-us">
        {/* Ambient background animations */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
          {/* Sound-wave patterns */}
          <svg className="absolute bottom-0 left-0 w-full h-48 text-secondary/5" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="d"
                values="M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100;
                               M0,100 C240,50 480,150 720,100 C960,50 1200,150 1440,100;
                               M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100"
                dur="12s" repeatCount="indefinite" />
            </path>
            <path d="M0,120 C200,80 400,160 600,120 C800,80 1000,160 1200,120 C1300,100 1380,130 1440,120" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
              <animate attributeName="d"
                values="M0,120 C200,80 400,160 600,120 C800,80 1000,160 1200,120 C1300,100 1380,130 1440,120;
                               M0,120 C200,160 400,80 600,120 C800,160 1000,80 1200,120 C1300,140 1380,100 1440,120;
                               M0,120 C200,80 400,160 600,120 C800,80 1000,160 1200,120"
                dur="18s" repeatCount="indefinite" />
            </path>
          </svg>

          {/* Flowing data lines */}
          <svg className="absolute inset-0 w-full h-full text-secondary/10" xmlns="http://www.w3.org/2000/svg">
            <line x1="10%" y1="0" x2="10%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="5,15" className="data-flow-line" />
            <line x1="30%" y1="0" x2="30%" y2="100%" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4,12" className="data-flow-line" style={{ animationDuration: "1.5s" }} />
            <line x1="70%" y1="0" x2="70%" y2="100%" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6,18" className="data-flow-line" style={{ animationDuration: "2.5s" }} />
            <line x1="90%" y1="0" x2="90%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="8,16" className="data-flow-line" style={{ animationDuration: "1.8s" }} />

            {/* Interactive light particles / nodes */}
            <circle cx="10%" cy="20%" r="3" fill="#2559bd" className="data-flow-pulse" style={{ animationDelay: "0.2s" }} />
            <circle cx="30%" cy="65%" r="2" fill="#2559bd" className="data-flow-pulse" style={{ animationDelay: "0.8s" }} />
            <circle cx="70%" cy="40%" r="2.5" fill="#2559bd" className="data-flow-pulse" style={{ animationDelay: "1.1s" }} />
            <circle cx="90%" cy="15%" r="3" fill="#2559bd" className="data-flow-pulse" style={{ animationDelay: "0.5s" }} />
            <circle cx="90%" cy="80%" r="2" fill="#2559bd" className="data-flow-pulse" style={{ animationDelay: "1.4s" }} />
          </svg>
        </div>

        <div className="max-w-container-max mx-auto relative z-10 px-4 md:px-0">
          <div className="text-center mb-16 reveal">
            <h2 className="font-sans text-3xl md:text-5xl font-black text-primary mb-4 tracking-tight">Why AV Impact?</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-base sm:text-lg">Engineering excellence into every signal, pixel, and connection for your workspace.</p>
          </div>

          {/* Grid Layout matching Image 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto reveal">
            {capabilities.slice(0, 4).map((cap, idx) => (
              <div
                key={cap.id}
                onClick={() => setActiveClickCard(cap.id)}
                className="group relative p-6 sm:p-8 bg-white border border-slate-200/60 rounded-[20px] cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-slate-300 hover:-translate-y-1 select-none flex flex-col gap-6"
                style={{
                  transitionDelay: `${idx * 100}ms`
                }}
              >
                <div className="w-12 h-12 bg-[#2559bd]/10 text-[#2559bd] rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <span className="material-symbols-outlined text-2xl">{cap.iconName}</span>
                </div>
                <div>
                  <h3 className="font-sans font-black text-lg text-[#0d1b3e] tracking-tight mb-2 leading-snug">{cap.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {cap.shortDesc}
                  </p>
                </div>
              </div>
            ))}
            {capabilities.slice(4, 6).map((cap, idx) => (
              <div
                key={cap.id}
                onClick={() => setActiveClickCard(cap.id)}
                className="group relative p-6 sm:p-8 bg-white border border-slate-200/60 rounded-[20px] cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-slate-300 hover:-translate-y-1 select-none flex flex-col gap-6 col-span-1 lg:col-span-2"
                style={{
                  transitionDelay: `${(idx + 4) * 100}ms`
                }}
              >
                <div className="w-12 h-12 bg-[#2559bd]/10 text-[#2559bd] rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <span className="material-symbols-outlined text-2xl">{cap.iconName}</span>
                </div>
                <div>
                  <h3 className="font-sans font-black text-lg text-[#0d1b3e] tracking-tight mb-2 leading-snug">{cap.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {cap.shortDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>



        </div>

        {/* Click Immersive Micro-Panel Modal Overlay */}
        {activeClickCard !== null && (
          <div
            onClick={() => setActiveClickCard(null)}
            className="fixed inset-0 bg-[#000924]/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 border border-slate-200/80 rounded-[32px] max-w-xl w-full p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col gap-6 transform transition-transform duration-500 scale-100 animate-fade-in"
            >
              {/* Decorative colored glow inside the modal */}
              <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-[#2559bd]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={() => setActiveClickCard(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full border border-slate-100 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-700 hover:scale-105 transition-all duration-200"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>

              {/* Modal Header */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-black text-[#2559bd] tracking-widest uppercase">Business Case Analysis</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2559bd] animate-pulse" />
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-black text-[#0d1b3e] leading-tight">
                  {capabilities[activeClickCard].title}
                </h3>
              </div>

              {/* Immersive Flowchart: Problem -> Solution -> Outcome */}
              <div className="flex flex-col gap-6 relative py-2">
                {/* Flowchart connecting line */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-100" />

                {/* 1. Problem */}
                <div className="flex gap-5 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 shadow-sm text-red-500 font-bold text-sm">
                    01
                  </div>
                  <div>
                    <span className="inline-block bg-red-50 text-red-700 text-[9px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full mb-1 border border-red-100">
                      The Problem
                    </span>
                    <p className="text-[#0d1b3e] text-xs md:text-sm leading-relaxed mt-1 font-semibold">
                      {capabilities[activeClickCard].problem}
                    </p>
                  </div>
                </div>

                {/* 2. Solution */}
                <div className="flex gap-5 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#2559bd]/5 border border-[#2559bd]/15 flex items-center justify-center shrink-0 shadow-sm text-[#2559bd] font-bold text-sm">
                    02
                  </div>
                  <div>
                    <span className="inline-block bg-[#2559bd]/5 text-[#2559bd] text-[9px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full mb-1 border border-[#2559bd]/10">
                      Our Solution
                    </span>
                    <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed mt-1">
                      {capabilities[activeClickCard].solution}
                    </p>
                  </div>
                </div>

                {/* 3. Outcome */}
                <div className="flex gap-5 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 shadow-sm text-emerald-500 font-bold text-sm">
                    03
                  </div>
                  <div>
                    <span className="inline-block bg-emerald-50 text-emerald-700 text-[9px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full mb-1 border border-emerald-100">
                      Business Outcome
                    </span>
                    <p className="text-emerald-950 text-xs md:text-sm leading-relaxed mt-1 font-bold">
                      {capabilities[activeClickCard].outcome}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 mt-1">
                <button
                  onClick={() => setActiveClickCard(null)}
                  className="px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  Close Panel
                </button>
                <button
                  onClick={() => {
                    setActiveClickCard(null);
                    openLeadModal("quotation");
                  }}
                  className="px-5 py-2.5 bg-[#2559bd] text-white rounded-xl text-xs font-bold hover:bg-[#1f4a9e] shadow-md transition-colors"
                >
                  Discuss Your Workspace
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Solutions Section */}
      <section className="py-stack-lg bg-surface-container-low px-margin-mobile md:px-margin-desktop relative overflow-hidden" id="solutions">
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-stack-lg gap-4 reveal">
            <div>
              <h2 className="font-sans text-3xl md:text-5xl font-black text-primary mb-2 tracking-tight">Tailored AV Solutions</h2>
              <p className="text-on-surface-variant text-base sm:text-lg">Immersive experiences for every environment.</p>
            </div>
            <button
              onClick={() => navigate("/solutions")}
              className="text-[#2559bd] font-bold flex items-center gap-2 group hover:text-[#1f4a9e] transition-colors"
            >
              View All Services
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
            {/* Solution 1 */}
            <div
              onMouseMove={(e) => handleTiltMove(e, 5)}
              onMouseLeave={handleTiltLeave}
              className="relative group overflow-hidden rounded-3xl h-[400px] reveal tilt-card-inner shadow-md hover:shadow-2xl border border-white/10"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="A modern corporate smart meeting room with a large integrated touch screen display, conference table"
                src="/assets/boardroom_curved.webp"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-stack-md flex flex-col justify-end">
                <h3 className="font-sans font-bold text-2xl text-white mb-2">Smart Meeting Rooms</h3>
                <p className="text-white/80 text-sm mb-6 max-w-md leading-relaxed">One-touch video conferencing, wireless sharing, and automated environment control.</p>
                <button
                  onClick={() => navigate("/solutions")}
                  className="px-6 py-2.5 bg-[#2559bd] text-white w-fit rounded-lg font-semibold hover:bg-[#1f4a9e] transition-all hover-scale-sm active-scale-down"
                >
                  Learn More
                </button>
              </div>
            </div>
            {/* Solution 2 */}
            <div
              onMouseMove={(e) => handleTiltMove(e, 5)}
              onMouseLeave={handleTiltLeave}
              className="relative group overflow-hidden rounded-3xl h-[400px] reveal tilt-card-inner shadow-md hover:shadow-2xl border border-white/10"
            >
              <img
                alt="Ultra-high-definition classroom learning hall"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="/assets/classroom_interactive.webp"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-stack-md flex flex-col justify-end">
                <h3 className="font-sans font-bold text-2xl text-white mb-2">Advanced Learning Environments</h3>
                <p className="text-white/80 text-sm mb-6 max-w-md leading-relaxed">Interactive touch panels, remote learning cameras, and high-fidelity audio for modern classrooms.</p>
                <button
                  onClick={() => navigate("/solutions")}
                  className="px-6 py-2.5 bg-[#2559bd] text-white w-fit rounded-lg font-semibold hover:bg-[#1f4a9e] transition-all hover-scale-sm active-scale-down"
                >
                  Learn More
                </button>
              </div>
            </div>
            {/* Solution 3 */}
            <div
              onMouseMove={(e) => handleTiltMove(e, 5)}
              onMouseLeave={handleTiltLeave}
              className="relative group overflow-hidden rounded-3xl h-[400px] reveal tilt-card-inner shadow-md hover:shadow-2xl border border-white/10"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Auditorium visual presentation system"
                src="/assets/project_presentation.webp"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-stack-md flex flex-col justify-end">
                <h3 className="font-sans font-bold text-2xl text-white mb-2">Powerful Presentations</h3>
                <p className="text-white/80 text-sm mb-6 max-w-md leading-relaxed">Crystal clear projections and surround sound designed for high-stakes presentation venues.</p>
                <button
                  onClick={() => navigate("/solutions")}
                  className="px-6 py-2.5 bg-[#2559bd] text-white w-fit rounded-lg font-semibold hover:bg-[#1f4a9e] transition-all hover-scale-sm active-scale-down"
                >
                  Learn More
                </button>
              </div>
            </div>
            {/* Solution 4 */}
            <div
              onMouseMove={(e) => handleTiltMove(e, 5)}
              onMouseLeave={handleTiltLeave}
              className="relative group overflow-hidden rounded-3xl h-[400px] reveal tilt-card-inner shadow-md hover:shadow-2xl border border-white/10"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Digital signage in corporate lobby"
                src="/assets/project_lobby.webp"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-stack-md flex flex-col justify-end">
                <h3 className="font-sans font-bold text-2xl text-white mb-2">Large Scale AV Spaces</h3>
                <p className="text-white/80 text-sm mb-6 max-w-md leading-relaxed">Campus-wide digital signage, background music, and centralized management systems.</p>
                <button
                  onClick={() => navigate("/solutions")}
                  className="px-6 py-2.5 bg-[#2559bd] text-white w-fit rounded-lg font-semibold hover:bg-[#1f4a9e] transition-all hover-scale-sm active-scale-down"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Industries Served (Animated Tiles) */}
      <section id="industries" className="py-stack-lg bg-inverse-surface text-surface overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(37,89,189,0.3)_0,transparent_75%)] pointer-events-none" />

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <h2 className="font-sans text-3xl md:text-5xl font-black text-center mb-stack-lg reveal tracking-tight">Industries We Serve</h2>
          <div className="flex flex-wrap lg:flex-nowrap justify-center gap-3 xl:gap-4" id="industries-grid">
            <div
              onClick={() => navigate("/industries#corporate")}
              className="reveal-box cursor-pointer group relative w-[130px] sm:w-[150px] lg:w-[120px] xl:w-[150px] aspect-square bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-primary/30 transition-all duration-500 hover:border-secondary/50"
            >
              <span className="material-symbols-outlined text-4xl mb-3 text-inverse-primary group-hover:scale-115 transition-transform text-secondary">business</span>
              <h3 className="font-bold text-xs tracking-wide">Corporate</h3>
            </div>
            <div
              onClick={() => navigate("/industries#education")}
              className="reveal-box cursor-pointer group relative w-[130px] sm:w-[150px] lg:w-[120px] xl:w-[150px] aspect-square bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-primary/30 transition-all duration-500 hover:border-secondary/50"
            >
              <span className="material-symbols-outlined text-4xl mb-3 text-inverse-primary group-hover:scale-115 transition-transform text-secondary">school</span>
              <h3 className="font-bold text-xs tracking-wide">Education</h3>
            </div>
            <div
              onClick={() => navigate("/industries#government")}
              className="reveal-box cursor-pointer group relative w-[130px] sm:w-[150px] lg:w-[120px] xl:w-[150px] aspect-square bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-primary/30 transition-all duration-500 hover:border-secondary/50"
            >
              <span className="material-symbols-outlined text-4xl mb-3 text-inverse-primary group-hover:scale-115 transition-transform text-secondary">account_balance</span>
              <h3 className="font-bold text-xs tracking-wide">Govt</h3>
            </div>
            <div
              onClick={() => navigate("/industries#healthcare")}
              className="reveal-box cursor-pointer group relative w-[130px] sm:w-[150px] lg:w-[120px] xl:w-[150px] aspect-square bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-primary/30 transition-all duration-500 hover:border-secondary/50"
            >
              <span className="material-symbols-outlined text-4xl mb-3 text-inverse-primary group-hover:scale-115 transition-transform text-secondary">medical_services</span>
              <h3 className="font-bold text-xs tracking-wide">Healthcare</h3>
            </div>
            <div
              onClick={() => navigate("/industries#defense")}
              className="reveal-box cursor-pointer group relative w-[130px] sm:w-[150px] lg:w-[120px] xl:w-[150px] aspect-square bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-primary/30 transition-all duration-500 hover:border-secondary/50"
            >
              <span className="material-symbols-outlined text-4xl mb-3 text-inverse-primary group-hover:scale-115 transition-transform text-secondary">shield</span>
              <h3 className="font-bold text-xs tracking-wide">Defense</h3>
            </div>
            <div
              onClick={() => navigate("/industries#retail")}
              className="reveal-box cursor-pointer group relative w-[130px] sm:w-[150px] lg:w-[120px] xl:w-[150px] aspect-square bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-primary/30 transition-all duration-500 hover:border-secondary/50"
            >
              <span className="material-symbols-outlined text-4xl mb-3 text-inverse-primary group-hover:scale-115 transition-transform text-secondary">storefront</span>
              <h3 className="font-bold text-xs tracking-wide">Retail</h3>
            </div>
            <div
              onClick={() => navigate("/industries#residential")}
              className="reveal-box cursor-pointer group relative w-[130px] sm:w-[150px] lg:w-[120px] xl:w-[150px] aspect-square bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-primary/30 transition-all duration-500 hover:border-secondary/50"
            >
              <span className="material-symbols-outlined text-4xl mb-3 text-inverse-primary group-hover:scale-115 transition-transform text-secondary">home</span>
              <h3 className="font-bold text-xs tracking-wide">Residential</h3>
            </div>
          </div>

          {/* Brands We Work With */}
          <div className="mt-20 border-t border-white/5 pt-16 reveal">
            <h3 className="font-sans text-3xl md:text-5xl font-black text-center mb-stack-lg tracking-tight">
              Brands We Work With
            </h3>

            <div className="relative w-full overflow-hidden py-12">
              {/* Fade gradients at edges for a premium focus feel */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#2e3038] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#2e3038] to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee flex gap-6 items-center">
                {[...homePartnerBrands, ...homePartnerBrands].map((brand, idx) => (
                  <div
                    key={idx}
                    data-cursor="brand"
                    data-brand-name={brand.name}
                    data-brand-cat={brand.cat}
                    data-brand-fit={brand.fit}
                    className="brand-wave-node group flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 border border-white/10 shadow-lg hover:bg-white/15 hover:border-blue-400/40 hover:shadow-[0_0_18px_rgba(59,130,246,0.25)] transition-all hover:scale-125 duration-300"
                    style={{ animationDelay: `${-(idx * 0.35)}s` }}
                  >
                    <div className="w-full flex items-center justify-center transition-all duration-300 max-w-[65%] max-h-[50%] pointer-events-none">
                      <BrandLogo name={brand.name} className="max-w-full max-h-full w-auto h-auto" isDark={true} />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Process Section (Vertical Timeline) */}
      <section className="py-stack-lg bg-surface px-margin-mobile md:px-margin-desktop relative overflow-hidden" id="process">
        {/* Soft background nodes grid */}
        <NetworkBackground />

        <div className="max-w-container-max mx-auto relative z-10">
          <div className="text-center mb-stack-lg reveal">
            <h2 className="font-sans text-3xl md:text-5xl font-black text-primary mb-4 tracking-tight">Our Seamless Process</h2>
            <p className="text-on-surface-variant text-base sm:text-lg">From concept to operational excellence.</p>
          </div>
          <div className="relative timeline-track space-y-12" id="timeline-track">
            {/* Active timeline filling bar based on scroll */}
            <div
              className="timeline-active-fill"
              style={{ height: `${timelineProgress}%` }}
            />

            {/* Step 1 */}
            <div className="relative flex items-center process-step">
              <div className="hidden md:flex flex-1 justify-end pr-12 text-right">
                <span className="text-primary-container font-sans font-black text-4xl opacity-10">01</span>
              </div>
              <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-[#2559bd] rounded-full flex items-center justify-center text-white font-bold ring-8 ring-[#dae2ff]">1</div>
              <div className="flex-1 pl-12">
                <h3 className="font-sans font-extrabold text-xl text-primary mb-1">Requirements</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Deep dive into your spatial needs and functional goals.</p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="relative flex items-center process-step">
              <div className="hidden md:flex flex-1 justify-end pr-12 text-right">
                <span className="text-primary-container font-sans font-black text-4xl opacity-10">02</span>
              </div>
              <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-[#2559bd] rounded-full flex items-center justify-center text-white font-bold ring-8 ring-[#dae2ff]">2</div>
              <div className="flex-1 pl-12">
                <h3 className="font-sans font-extrabold text-xl text-primary mb-1">Solution</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Custom system architecture and technical layout design.</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="relative flex items-center process-step">
              <div className="hidden md:flex flex-1 justify-end pr-12 text-right">
                <span className="text-primary-container font-sans font-black text-4xl opacity-10">03</span>
              </div>
              <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-[#2559bd] rounded-full flex items-center justify-center text-white font-bold ring-8 ring-[#dae2ff]">3</div>
              <div className="flex-1 pl-12">
                <h3 className="font-sans font-extrabold text-xl text-primary mb-1">Equipment</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Procuring industry-leading hardware from top-tier brands.</p>
              </div>
            </div>
            {/* Step 4 */}
            <div className="relative flex items-center process-step">
              <div className="hidden md:flex flex-1 justify-end pr-12 text-right">
                <span className="text-primary-container font-sans font-black text-4xl opacity-10">04</span>
              </div>
              <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-[#2559bd] rounded-full flex items-center justify-center text-white font-bold ring-8 ring-[#dae2ff]">4</div>
              <div className="flex-1 pl-12">
                <h3 className="font-sans font-extrabold text-xl text-primary mb-1">Installation</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Expert on-site setup and professional cabling.</p>
              </div>
            </div>
            {/* Step 5 */}
            <div className="relative flex items-center process-step">
              <div className="hidden md:flex flex-1 justify-end pr-12 text-right">
                <span className="text-primary-container font-sans font-black text-4xl opacity-10">05</span>
              </div>
              <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-[#2559bd] rounded-full flex items-center justify-center text-white font-bold ring-8 ring-[#dae2ff]">5</div>
              <div className="flex-1 pl-12">
                <h3 className="font-sans font-extrabold text-xl text-primary mb-1">Testing</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Rigorous quality checks and acoustic calibration.</p>
              </div>
            </div>
            {/* Step 6 */}
            <div className="relative flex items-center process-step">
              <div className="hidden md:flex flex-1 justify-end pr-12 text-right">
                <span className="text-primary-container font-sans font-black text-4xl opacity-10">06</span>
              </div>
              <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-[#2559bd] rounded-full flex items-center justify-center text-white font-bold ring-8 ring-[#dae2ff]">6</div>
              <div className="flex-1 pl-12">
                <h3 className="font-sans font-extrabold text-xl text-primary mb-1">Support</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Ongoing maintenance and technical assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reusable Premium Footer */}
      <Footer navigate={navigate} />


    </div>
  );
}
