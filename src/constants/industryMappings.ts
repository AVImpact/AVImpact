import { Building2, GraduationCap, Landmark, HeartPulse, BedDouble, Shield, Compass, Sparkles, Home as HomeIcon } from "lucide-react";

export const industryMappings = [
  {
    id: "corporate",
    name: "Corporate",
    icon: Building2,
    categories: ["display", "audio", "video-conf", "collaboration", "control", "smart-building"],
    desc: "Boardrooms, huddle rooms, and reception areas equipped with active Teams/Zoom rooms.",
    brands: ["Cisco", "Logitech", "Barco", "Jabra", "Poly", "Bose Professional"]
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    categories: ["display", "audio", "collaboration", "projection", "streaming", "smart-building"],
    desc: "Interactive lecture theatres, active classrooms, and remote learning studios.",
    brands: ["MAXHUB", "Newline", "Epson", "Panasonic", "AVer", "JBL Professional"]
  },
  {
    id: "government",
    name: "Government",
    icon: Landmark,
    categories: ["display", "audio", "video-conf", "control", "security"],
    desc: "Secure council chambers, video arraignment systems, and civic briefing halls.",
    brands: ["Cisco", "Yealink", "Kramer", "Samsung", "LG"]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    categories: ["display", "video-conf", "smart-building", "collaboration"],
    desc: "Telehealth consult spaces, diagnostic display networks, and smart training labs.",
    brands: ["Barco", "AVer", "Logitech", "MAXHUB", "Samsung"]
  },
  {
    id: "hospitality",
    name: "Hospitality",
    icon: BedDouble,
    categories: ["display", "audio", "control", "signal"],
    desc: "Ballroom distribution, zone audio control, and guest information signage.",
    brands: ["Bose Professional", "JBL Professional", "Optoma", "LG", "Kramer"]
  },
  {
    id: "command",
    name: "Command & Control Centers",
    icon: Shield,
    categories: ["display", "control", "signal", "infra", "security"],
    desc: "Mission-critical 24/7 video walls, console KVM systems, and secure signal routing.",
    brands: ["Samsung", "LG", "Kramer", "Cisco", "Barco"]
  },
  {
    id: "smart-cities",
    name: "Smart Cities",
    icon: Compass,
    categories: ["display", "infra", "security", "smart-building"],
    desc: "Municipal surveillance networks, public display kiosks, and traffic command centers.",
    brands: ["Samsung", "LG", "Cisco", "Kramer"]
  },
  {
    id: "retail",
    name: "Retail",
    icon: Sparkles,
    categories: ["display", "audio", "smart-building", "security"],
    desc: "Immersive commercial video walls, centralized background audio, and customer heat-map tracking.",
    brands: ["Samsung", "LG", "Bose Professional", "JBL Professional"]
  },
  {
    id: "residential",
    name: "Residential",
    icon: HomeIcon,
    categories: ["display", "audio", "control", "smart-building"],
    desc: "Luxury home theaters, unified smart room automation, and high-fidelity multi-room audio.",
    brands: ["Bose Professional", "JBL Professional", "Samsung", "LG"]
  }
];
