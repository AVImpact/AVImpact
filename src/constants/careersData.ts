/**
 * constants/careersData.ts
 * -------------------------
 * Static job opening data extracted from Careers.tsx.
 */

export interface JobOpening {
  id: string;
  title: string;
  location: string;
  experience: string;
  type: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  preferredCertifications?: string[];
  preferredSkills?: string[];
  growthOpportunities: string;
}

export const jobOpenings: JobOpening[] = [
  {
    id: "av-design-presales",
    title: "AV Design & Presales Engineer",
    location: "Indore, Madhya Pradesh",
    experience: "2–6 Years",
    type: "Full-time",
    overview:
      "Design complete Audio-Visual solutions, configure DSP architectures, draft CAD schematics, and prepare accurate Bills of Quantities (BOQs) to meet client specifications.",
    responsibilities: [
      "Create detailed line-diagrams, conduit layouts, and structural schematics using AutoCAD",
      "Specify appropriate products (Shure, Q-SYS, Crestron, Logitech) matching user requirements",
      "Conduct precise acoustic assessments and visual line-of-sight checks on-site",
      "Coordinate with major OEM tech engineers to validate complex multi-zone architectures",
      "Support client consultations by presenting functional system mockups and signal flows",
    ],
    requirements: [
      "Diploma or Degree in Electronics, Electrical, Telecommunications, or IT",
      "Hands-on experience in AV schematic design and rack layout configuration",
      "Practical familiarity with Dante networks, DSP routing, and smart control protocols",
      "Proficiency in CAD tools and MS Office Suite",
      "Problem-solving mindset for technical space integration issues",
    ],
    preferredCertifications: [
      "InfoComm CTS or CTS-D, Q-SYS Level 1/2, Crestron/Extron Design certifications",
    ],
    growthOpportunities:
      "Direct growth path to Senior Solutions Architect. Take ownership of our systems engineering standards and collaborate directly with key OEM product teams.",
  },
  {
    id: "project-engineer",
    title: "Project Engineer",
    location: "Indore, Madhya Pradesh",
    experience: "2–5 Years",
    type: "Full-time",
    overview:
      "Manage physical installation tasks, coordinate technician workflows on-site, test network routing, and program control logic to deliver complete AV projects.",
    responsibilities: [
      "Supervise on-site cabling, mounting, and system staging",
      "Configure AV-over-IP network switches and calibrate DSP settings for voice lift",
      "Validate signal flows, loading custom control touch-panel files on-site",
      "Provide step-by-step technical training for client stakeholders during handover",
      "Create accurate hand-off reports and final system line drawings",
    ],
    requirements: [
      "Technical Diploma or Engineering degree in Electronics, Electrical, or IT",
      "Practical experience leading structured low-voltage cabling and rack builds",
      "Basic understanding of IP networking, subnetting, and PoE power routing",
      "Clear coordination skills to lead field technicians and collaborate with site contractors",
    ],
    growthOpportunities:
      "Transition to Project Lead or Operations Manager, managing regional integration portfolios and setting quality execution standards.",
  },
  {
    id: "av-technician",
    title: "AV Technician",
    location: "Indore, Madhya Pradesh",
    experience: "0–3 Years",
    type: "Full-time",
    overview:
      "Perform physical equipment mounting, run and terminate structured cables, and help configure basic AV systems on-site.",
    responsibilities: [
      "Mount interactive displays, projectors, speakers, PTZ cameras, and bracket kits",
      "Pull and route copper and fiber low-voltage cables through conduits",
      "Assemble equipment racks, dressing cables cleanly with proper labels",
      "Perform high-quality RJ45 crimping, XLR soldering, and terminal block wiring",
      "Maintain tooling kits and follow standard electrical safety measures",
    ],
    requirements: [
      "ITI, Diploma, or equivalent vocational training",
      "Basic knowledge of low-voltage cabling and electrical wiring",
      "Strong hands-on drive and willingness to learn complex digital signal routings",
      "Ability to read basic wiring diagrams",
    ],
    preferredSkills: ["Crimp termination", "Rack dressing & labeling", "Basic hardware mounting"],
    growthOpportunities:
      "Get mentored by senior CTS engineers and gain hands-on training to move up to Lead Technician or Commissioning Specialist.",
  },
  {
    id: "senior-av-technician",
    title: "Senior AV Technician",
    location: "Indore, Madhya Pradesh",
    experience: "3–7 Years",
    type: "Full-time",
    overview:
      "Lead cabling setups, supervise rack building, execute final hardware calibration, and troubleshoot signal issues on active sites.",
    responsibilities: [
      "Supervise complex structured cabling installations and rack assemblies on site",
      "Calibrate audio arrays, test video signal paths, and load control panel configurations",
      "Diagnose and resolve cable terminations, PoE issues, or DSP echo issues on site",
      "Guide junior technicians on wiring standards and safety measures",
      "Coordinate directly with the Project Engineer on construction readiness",
    ],
    requirements: [
      "Years of experience in professional AV installations and hardware mounting",
      "Exemplary skills in reading and executing CAD schematics and signal diagrams",
      "Expert knowledge of copper/fiber cable terminations and rack thermal design",
      "Strong troubleshooting ability for analog/digital audio and video flows",
    ],
    growthOpportunities:
      "Prepare for CTS-I (Installation) certification with full company sponsorship, stepping up into a commissioning or project lead role.",
  },
];
