import { Laptop, Volume2, GraduationCap, Sparkles, Home as HomeIcon } from "lucide-react";

export const DESIGNER_RECOMMENDATIONS = [
  {
    id: "meeting-room",
    title: "Meeting Room Layouts",
    recommendations: [
      "Keep display at eye-level, roughly 40-48 inches from the floor to bottom of screen.",
      "Use beamforming tabletop microphones for rooms with low ceilings, and ceiling arrays for high ceilings.",
      "Calibrate tracking cameras to focus on the presentation area with a 15-degree safety margin."
    ]
  },
  {
    id: "auditorium",
    title: "Auditorium Acoustics",
    recommendations: [
      "Use directional line-array speakers to focus sound on seating areas and minimize wall reflections.",
      "Ensure speech lift microphones are calibrated with at least 6dB feedback margins.",
      "Position high-brightness projection at least 15 feet above the stage floor to avoid presenter shadows."
    ]
  },
  {
    id: "classroom",
    title: "Educational Tech",
    recommendations: [
      "Position interactive touch screens within student reach range (bottom at 32 inches for primary schools).",
      "Deploy wearable voice-lift systems for lecturers to reduce vocal strain and maintain uniform volume.",
      "Set auto-tracking cameras to follow the primary blackboard/whiteboard region."
    ]
  }
];

export const spacesList = [
  {
    id: "meeting-room",
    title: "Meeting Room",
    icon: Laptop,
    desc: "Collaboration spaces designed for video conferencing, wireless presentations, and seamless hybrid syncs.",
    categories: [
      { name: "Video Conferencing Systems", desc: "PTZ cameras, smart video bars, and table-top speakerphones.", nodeId: "video-conf" },
      { name: "Wireless Presentations", desc: "BYOD sharing hubs for single-tap screensharing.", nodeId: "collaboration" },
      { name: "Interactive Displays", desc: "4K commercial touch screens for digital whiteboarding.", nodeId: "display" }
    ],
    brands: ["Logitech", "Cisco", "Poly", "Jabra", "MAXHUB"]
  },
  {
    id: "auditorium",
    title: "Auditorium",
    icon: Volume2,
    desc: "Large-venue presentation halls optimized for speech intelligibility, high-impact projection, and professional acoustics.",
    categories: [
      { name: "Speech & Sound Reinforcement", desc: "Calibrated line arrays, ceiling speakers, and DSP audio processors.", nodeId: "audio" },
      { name: "High-Brightness Projection", desc: "10,000+ lumens laser projectors and ambient-light rejecting screens.", nodeId: "display" },
      { name: "Matrix Routing", desc: "Switchers and AV-over-IP transceivers for zero-latency video routing.", nodeId: "signal" }
    ],
    brands: ["Bose Professional", "JBL Professional", "Epson", "Panasonic", "Kramer"]
  },
  {
    id: "classroom",
    title: "Classroom",
    icon: GraduationCap,
    desc: "Interactive educational spaces equipped for student engagement, easy content sharing, and lecture recording.",
    categories: [
      { name: "Interactive Touch Panels", desc: "Collaborative screens with writing software.", nodeId: "display" },
      { name: "Voice Lift Systems", desc: "Wearable teacher mics and uniform classroom audio amplification.", nodeId: "audio" },
      { name: "Lecture Capture", desc: "Auto-tracking PTZ cameras and streaming recorders.", nodeId: "collaboration" }
    ],
    brands: ["Newline", "MAXHUB", "Epson", "AVer", "Logitech"]
  },
  {
    id: "event-space",
    title: "Event Space",
    icon: Sparkles,
    desc: "Flexible reception halls, lobbies, and exhibition zones requiring premium digital signage and background music.",
    categories: [
      { name: "Dynamic Signage Screens", desc: "24/7 rated commercial displays and outdoor LED boards.", nodeId: "display" },
      { name: "Multi-Zone Audio", desc: "Distributed background music zones with simple wall-panel control.", nodeId: "audio" },
      { name: "Content Management", desc: "Centralized media players and software scheduling.", nodeId: "collaboration" }
    ],
    brands: ["LG", "Samsung", "Barco", "Bose Professional", "JBL Professional"]
  },
  {
    id: "residential-theater",
    title: "Home Theater",
    icon: HomeIcon,
    desc: "Luxury home cinema environments featuring high-fidelity surround sound, premium 4K laser projection, and unified smart lighting control.",
    categories: [
      { name: "Dolby Atmos Audio", desc: "Immersive 3D surround sound with calibrated ceiling and wall speakers.", nodeId: "audio" },
      { name: "4K Laser Projection", desc: "Ultra-high-definition home theater projectors and ambient light rejecting screens.", nodeId: "display" },
      { name: "Smart Environment Control", desc: "Unified control over projection, sound levels, lighting scenes, and automatic blinds.", nodeId: "control" }
    ],
    brands: ["Bose", "JBL", "Samsung", "Epson", "Crestron"]
  }
];

export const spaceImages: Record<string, string> = {
  "meeting-room": "/assets/boardroom_hero.webp",
  "classroom": "/assets/classroom_interactive.webp",
  "auditorium": "/assets/project_presentation.webp",
  "event-space": "/assets/broadcast_summit.webp",
  "residential-theater": "/assets/residential_cinema.webp"
};

export const spaceHotspots: Record<string, Record<string, { name: string; purpose: string; brands: string; benefit: string; top: string; left: string }>> = {
  "meeting-room": {
    display: { name: "Interactive UHD Display", purpose: "Room-wide content visibility & presentations", brands: "Samsung, LG", benefit: "High visual impact & engagement", top: "30%", left: "50%" },
    camera: { name: "AI Conference Camera", purpose: "Auto-tracking & smart participant framing", brands: "Logitech, Cisco", benefit: "Natural, life-like remote collaboration", top: "45%", left: "50%" },
    mic: { name: "Tabletop Microphone Pods", purpose: "360° voice pickup with noise suppression", brands: "Shure, Jabra", benefit: "Crystal-clear speech intelligibility", top: "62%", left: "45%" },
    audio: { name: "Premium Audio Bar", purpose: "High-fidelity voice & content playback", brands: "Bose, JBL", benefit: "Room-filling, balanced acoustics", top: "20%", left: "20%" },
    control: { name: "One-Touch Control Panel", purpose: "Centralized meeting and environment control", brands: "Crestron, Kramer", benefit: "Zero setup friction for presenters", top: "72%", left: "60%" }
  },
  "classroom": {
    display: { name: "Interactive Touch Panel", purpose: "Collaborative writing & content display", brands: "Newline, MAXHUB", benefit: "Boosts student interaction & attention", top: "32%", left: "50%" },
    camera: { name: "Auto-Tracking Lecture Cam", purpose: "Presenter tracking for hybrid classes", brands: "AVer, Logitech", benefit: "Engaging hybrid & recorded lectures", top: "15%", left: "50%" },
    mic: { name: "Wearable Teacher Microphone", purpose: "Hands-free voice amplification", brands: "Shure, Jabra", benefit: "Reduces vocal strain & improves clarity", top: "70%", left: "40%" },
    audio: { name: "Voice Lift Speakers", purpose: "Distributed audio for uniform classroom sound", brands: "Bose, JBL", benefit: "Equal intelligibility for all students", top: "20%", left: "15%" },
    control: { name: "Smart Pod Control Panel", purpose: "Simple source switching and volume adjustment", brands: "Crestron, Extron", benefit: "Empowers teachers with easy tech control", top: "75%", left: "70%" }
  },
  "auditorium": {
    display: { name: "Laser Projection System", purpose: "Large-venue high-brightness presentation", brands: "Epson, Panasonic", benefit: "Vivid visuals visible from the back row", top: "25%", left: "50%" },
    camera: { name: "Multi-PTZ Camera System", purpose: "Broadcasting stage and audience angles", brands: "AVer, Cisco", benefit: "Studio-quality event live streaming", top: "12%", left: "50%" },
    mic: { name: "Speech Reinforcement Mics", purpose: "Stage & podium speech pickup", brands: "Shure", benefit: "Flawless speech projection & clarity", top: "60%", left: "35%" },
    audio: { name: "Professional Line Arrays", purpose: "High-performance directional audio delivery", brands: "Bose, JBL", benefit: "Immersive sound profile across the hall", top: "18%", left: "15%" },
    control: { name: "Production Console Control", purpose: "Advanced AV matrix routing and presets", brands: "Kramer, Extron", benefit: "Seamless orchestration of complex events", top: "80%", left: "80%" }
  },
  "event-space": {
    display: { name: "Digital Signage Wall", purpose: "Lobby & exhibition video display", brands: "Samsung, LG", benefit: "High customer reach & brand impact", top: "35%", left: "30%" },
    camera: { name: "Ambience Capture Camera", purpose: "Overview monitoring & security", brands: "Logitech, Cisco", benefit: "Enhanced venue safety & crowd tracking", top: "20%", left: "40%" },
    mic: { name: "Wireless Presentation Mics", purpose: "Mobile presenter & Q&A microphone system", brands: "Shure, Poly", benefit: "Dynamic stage hosting & audience engagement", top: "55%", left: "50%" },
    audio: { name: "Distributed Background Audio", purpose: "Multi-zone ambient music & announcements", brands: "Bose, JBL", benefit: "Perfect atmospheric sound staging", top: "15%", left: "75%" },
    control: { name: "Wall-Mount Preset Panels", purpose: "Quick volume and zone preset selection", brands: "Crestron, Kramer", benefit: "Staff-friendly zero-training operations", top: "75%", left: "85%" }
  },
  "residential-theater": {
    display: { name: "4K Laser Projector", purpose: "UHD cinematic video projection", brands: "Epson, Panasonic", benefit: "Ultra-crisp large screen visual experience", top: "25%", left: "50%" },
    audio: { name: "Dolby Atmos Speakers", purpose: "Immersive 3D spatial surround sound", brands: "Bose, JBL", benefit: "Cinema-grade audio realism", top: "45%", left: "20%" },
    mic: { name: "Acoustic Tuning Mics", purpose: "Automated room calibration & audio balancing", brands: "Shure", benefit: "Optimal sound coverage at every seat", top: "68%", left: "45%" },
    control: { name: "Smart Touch Panel", purpose: "One-touch theater mode & lighting automation", brands: "Crestron, Extron", benefit: "Simultaneous control of AV and environment", top: "75%", left: "75%" },
    infra: { name: "AV Equipment Rack", purpose: "Centralized amplification and source player storage", brands: "Kramer, Cisco", benefit: "Clean hidden cabling and cooling management", top: "85%", left: "85%" }
  }
};
