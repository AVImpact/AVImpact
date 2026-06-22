export const roomConfigurations = [
  {
    title: "Small Room",
    capacity: "Capacity: 2–6 People",
    image: "/assets/boardroom_before.webp",
    desc: "Ideal for huddle spaces, focus rooms, where quick staging and seamless plug-and-play connections are priority.",
    features: [
      { name: "65\" Commercial Screen", desc: "Professional UHD screen designed for continuous hybrid workspace runtime." },
      { name: "Integrated Video Bar", desc: "All-in-one smart camera with beamforming microphones and sound system." },
      { name: "BYOD Presentation Hub", desc: "Allows instant content sharing from user laptops without cable management clutter." }
    ],
    recommendation: "Logitech MeetUp or Jabra PanaCast plug-and-play layouts."
  },
  {
    title: "Medium Room",
    capacity: "Capacity: 6–12 People",
    image: "/assets/boardroom_after.webp",
    desc: "Best for standard team conferencing. Calibrated for uniform audio coverage and symmetry.",
    features: [
      { name: "75\" Commercial Screen", desc: "High-brightness screen visible from all seating positions in the room." },
      { name: "Conferencing PTZ Camera", desc: "Pan-tilt-zoom camera with active participant framing and smart tracking." },
      { name: "DSP Audio & Table Mics", desc: "Digital signal processor with tabletop expansion pods for echo cancellation." }
    ],
    recommendation: "Logitech Rally systems with Poly Studio Room Kits."
  },
  {
    title: "Large Room",
    capacity: "Capacity: 12–20 People",
    image: "/assets/boardroom_curved.webp",
    desc: "Tailored for larger corporate spaces, active presenter tracking, and multi-microphone systems.",
    features: [
      { name: "86\" UHD High-Brightness Display", desc: "Extra-wide commercial panel designed for long viewing ranges." },
      { name: "Intelligent Tracking Camera", desc: "Dual camera array tracking active speakers in large presentation rooms." },
      { name: "Ceiling Microphone Arrays", desc: "Distributed ceiling microphones daisy-chained for full room capture." }
    ],
    recommendation: "Poly Studio Large Room layouts & Sennheiser ceiling microphones."
  },
  {
    title: "Boardroom",
    capacity: "Executive Boardroom",
    image: "/assets/project_boardroom.webp",
    desc: "Tailored for premium executive presentations, boardroom calls, and automated environmental integration.",
    features: [
      { name: "Dual 86\" Screens or LED Wall", desc: "Multiple display matrices for simultaneous content and call views." },
      { name: "Beamforming Ceiling Mics", desc: "Smart mic array mounted flat, tracking and isolating voices automatically." },
      { name: "Centralized Automation Panel", desc: "One-touch tablet control over audio, display route, lighting, and blinds." }
    ],
    recommendation: "Crestron controls, Shure Microflex mics, and Q-SYS sound arrays."
  }
];
export default roomConfigurations;
