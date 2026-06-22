/**
 * constants/index.ts
 * ------------------
 * Centralized static data used across multiple components.
 * Import from here rather than redefining inline in each component.
 */

import {
  Building2, GraduationCap, Activity, ShieldCheck, Hotel, Factory,
  Laptop, Video, Presentation, Monitor, Volume2, Shield, ShoppingBag,
  Home as HomeIcon, School, Building, Landmark, HeartPulse,
  Lightbulb, Wrench, Headphones, Handshake, Sparkles,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Navigation — Industries dropdown (used by Navbar)
// ---------------------------------------------------------------------------

export const NAV_INDUSTRIES = [
  { name: "Corporate",     desc: "Workspaces that connect teams globally.",               path: "/industries#corporate",     icon: Building },
  { name: "Education",     desc: "Scalable lecture halls built for active study.",        path: "/industries#education",     icon: School },
  { name: "Govt",          desc: "Secure briefings and legislative chambers.",            path: "/industries#government",    icon: Landmark },
  { name: "Healthcare",    desc: "Telemedicine consults and patient routing systems.",    path: "/industries#healthcare",    icon: HeartPulse },
  { name: "Defense",       desc: "Secure tactical briefings and command displays.",       path: "/industries#defense",       icon: Shield },
  { name: "Retail",        desc: "Interactive displays and dynamic signage walls.",       path: "/industries#retail",        icon: ShoppingBag },
  { name: "Residential",   desc: "Luxury home theaters and smart living setups.",         path: "/industries#residential",   icon: HomeIcon },
] as const;

// ---------------------------------------------------------------------------
// Footer — Solutions list
// ---------------------------------------------------------------------------

export const FOOTER_SOLUTIONS = [
  { title: "Meeting Room Solutions",      icon: Laptop },
  { title: "Video Conferencing",          icon: Video },
  { title: "Interactive Panels",          icon: Presentation },
  { title: "Auditorium Solutions",        icon: Volume2 },
  { title: "Digital Signage",             icon: Monitor },
  { title: "Professional Audio Systems",  icon: Volume2 },
  { title: "Event AV Solutions",          icon: Sparkles },
  { title: "Command & Control Centers",   icon: Shield },
] as const;

// ---------------------------------------------------------------------------
// Footer — Industries list
// ---------------------------------------------------------------------------

export const FOOTER_INDUSTRIES = [
  { title: "Corporate",    icon: Building },
  { title: "Education",    icon: School },
  { title: "Government",   icon: Landmark },
  { title: "Healthcare",   icon: HeartPulse },
  { title: "Defense",      icon: ShieldCheck },
  { title: "Retail",       icon: ShoppingBag },
  { title: "Residential",  icon: HomeIcon },
] as const;

// ---------------------------------------------------------------------------
// Footer — Trust indicators strip
// ---------------------------------------------------------------------------

export const FOOTER_TRUST_INDICATORS = [
  { label: "Expert Consultation",       icon: Lightbulb,  color: "text-amber-400 bg-amber-400/10 border border-amber-400/10" },
  { label: "Professional Installation", icon: Wrench,     color: "text-blue-400 bg-blue-400/10 border border-blue-400/10" },
  { label: "Reliable Support",          icon: Headphones, color: "text-emerald-400 bg-emerald-400/10 border border-emerald-400/10" },
  { label: "Competitive Pricing",       icon: Sparkles,   color: "text-violet-400 bg-violet-400/10 border border-violet-400/10" },
  { label: "Long-Term Partnership",     icon: Handshake,  color: "text-rose-400 bg-rose-400/10 border border-rose-400/10" },
] as const;
