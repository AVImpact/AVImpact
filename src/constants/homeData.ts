import {
  Laptop, Volume2, GraduationCap, Sparkles, Globe, Award, Users,
  Compass, Cpu, Wrench, CalendarDays
} from "lucide-react";

/**
 * constants/homeData.ts
 * ----------------------
 * Static data for the Home page extracted from Home.tsx.
 * Keeps page components lean and data centralized.
 */

export interface PartnerBrand {
  name: string;
  cat: string;
  fit: string;
}

export const homePartnerBrands: PartnerBrand[] = [
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
  { name: "Optoma", cat: "Smart Laser Projectors", fit: "Best For: Home Cinema & Large Classrooms" },
];

export type VisualType = "product" | "budget" | "pricing" | "delivery" | "install" | "support";

export interface Capability {
  id: number;
  title: string;
  iconName: string;
  shortDesc: string;
  longDesc: string;
  problem: string;
  solution: string;
  outcome: string;
  visualType: VisualType;
}

export const capabilities: Capability[] = [
  {
    id: 0,
    title: "Right Product Selection",
    iconName: "verified",
    shortDesc: "Tailored hardware recommendations based on your specific acoustics and spatial requirements.",
    longDesc: "We perform acoustic mapping and architectural layouts to select components designed specifically for your space's physical demands.",
    problem: "Organizations waste budget on mismatched hardware that doesn't fit room acoustics or physical scale, resulting in low utilization.",
    solution: "Applying computational acoustics modeling, spatial analysis, and CAD drafting to recommend the exact equipment configuration required.",
    outcome: "100% equipment utilization, zero capital waste, and perfect audio/video coverage across all meeting spaces.",
    visualType: "product",
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
    visualType: "budget",
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
    visualType: "pricing",
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
    visualType: "delivery",
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
    visualType: "install",
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
    visualType: "support",
  },
];
