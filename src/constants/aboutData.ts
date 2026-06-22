import {
  Compass, CheckCircle2, Cpu, Settings, Wrench, GraduationCap, ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * constants/aboutData.ts
 * -----------------------
 * Static data for the About page extracted from About.tsx.
 */

export interface ProcessStep {
  num: string;
  step: string;
  desc: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    step: "Consultation",
    desc: "Collaborate to align system design parameters with workflow requirements.",
    icon: Compass,
  },
  {
    num: "02",
    step: "Assessment",
    desc: "Analyze acoustic echoes, structural pathways, and illumination angles.",
    icon: CheckCircle2,
  },
  {
    num: "03",
    step: "Design",
    desc: "Draft engineering schematics, wiring flows, and custom BOQs.",
    icon: Cpu,
  },
  {
    num: "04",
    step: "Procurement",
    desc: "Source certified hardware direct from OEM channels with warranties.",
    icon: Settings,
  },
  {
    num: "05",
    step: "Installation",
    desc: "Conducted by certified CTS engineers with clean cabling and neat rack dressings.",
    icon: Wrench,
  },
  {
    num: "06",
    step: "Training",
    desc: "Interactive handoff support sessions to ensure user adoption.",
    icon: GraduationCap,
  },
  {
    num: "07",
    step: "Ongoing Support",
    desc: "Fast SLA responses, preventative maintenance, and active loop monitoring.",
    icon: ShieldCheck,
  },
];
